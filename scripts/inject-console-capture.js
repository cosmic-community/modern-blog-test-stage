const fs = require('fs');
const path = require('path');

// Build-time script injection for console capture
function injectConsoleScript() {
  const outDir = path.join(process.cwd(), 'out');
  const scriptTag = '<script src="/dashboard-console-capture.js"></script>';
  
  if (!fs.existsSync(outDir)) {
    console.log('No out directory found - skipping console script injection');
    return;
  }
  
  function injectIntoHtmlFiles(dir) {
    const files = fs.readdirSync(dir, { withFileTypes: true });
    
    files.forEach(file => {
      const filePath = path.join(dir, file.name);
      
      if (file.isDirectory()) {
        injectIntoHtmlFiles(filePath);
      } else if (file.name.endsWith('.html')) {
        let content = fs.readFileSync(filePath, 'utf8');
        
        // Only inject if not already present
        if (!content.includes('dashboard-console-capture.js')) {
          // Inject before closing head tag or at the beginning of head
          if (content.includes('</head>')) {
            content = content.replace('</head>', `  ${scriptTag}\n</head>`);
          } else if (content.includes('<head>')) {
            content = content.replace('<head>', `<head>\n  ${scriptTag}`);
          } else {
            // Fallback: inject after opening body tag
            content = content.replace('<body>', `<body>\n  ${scriptTag}`);
          }
          
          fs.writeFileSync(filePath, content);
          console.log(`Injected console capture script into: ${filePath}`);
        }
      }
    });
  }
  
  injectIntoHtmlFiles(outDir);
  console.log('Console capture script injection completed');
}

// Run injection if called directly
if (require.main === module) {
  injectConsoleScript();
}

module.exports = injectConsoleScript;