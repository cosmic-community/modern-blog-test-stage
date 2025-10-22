# Modern Blog Platform

![App Preview](https://imgix.cosmicjs.com/33c60f40-af83-11f0-8dcc-651091f6a7c0-photo-1677442136019-21780ecad995-1761163846354.jpg?w=1200&h=300&fit=crop&auto=format,compress)

A modern, responsive blog platform built with Next.js that beautifully showcases your blog content. Features clean design, intuitive navigation, and seamless content management through Cosmic CMS.

## ✨ Features

- **Responsive Design** - Optimized for all device sizes
- **Dynamic Content** - Automatically pulls from your Cosmic CMS
- **Category Filtering** - Browse posts by Technology, Lifestyle, and Travel
- **Author Profiles** - Detailed author pages with social links
- **Featured Posts** - Highlight important content on homepage
- **SEO Optimized** - Proper meta tags and structured content
- **Fast Performance** - Server-side rendering and optimized images
- **Modern UI** - Clean typography and intuitive navigation

## Clone this Project

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Project](https://img.shields.io/badge/Clone%20this%20Project-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](https://app.cosmic-staging.com/projects/new?clone_bucket=68f939f84a780083bd018f47&clone_repository=68f93b784a780083bd018f65)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> "Create a content model for a blog with posts, authors, and categories"

### Code Generation Prompt

> "Based on the content model I created for "Create a content model for a blog with posts, authors, and categories", now build a complete web application that showcases this content. Include a modern, responsive design with proper navigation, content display, and user-friendly interface."

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## 🚀 Technologies Used

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Cosmic CMS** - Headless content management
- **React** - UI library
- **PostCSS & Autoprefixer** - CSS processing

## 🏁 Getting Started

### Prerequisites

- Node.js 18+ or Bun
- A Cosmic account with your blog content

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd modern-blog-platform
   ```

2. **Install dependencies**
   ```bash
   bun install
   ```

3. **Environment Variables**
   The application will automatically configure your Cosmic credentials.

4. **Start development server**
   ```bash
   bun dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:3000`

## 🛠 Cosmic SDK Examples

### Fetching All Posts
```typescript
import { cosmic } from '@/lib/cosmic'

const { objects: posts } = await cosmic.objects
  .find({ type: 'posts' })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1)
```

### Getting Posts by Category
```typescript
const { objects: posts } = await cosmic.objects
  .find({ 
    type: 'posts',
    'metadata.category': categoryId 
  })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1)
```

### Single Post Lookup
```typescript
const { object: post } = await cosmic.objects
  .findOne({
    type: 'posts',
    slug: postSlug
  })
  .depth(1)
```

## 🎨 Cosmic CMS Integration

This application integrates with your Cosmic CMS to:

- **Dynamic Content Loading** - All posts, authors, and categories are loaded from your Cosmic bucket
- **Real-time Updates** - Content changes in Cosmic automatically appear on your site
- **Image Optimization** - Uses Cosmic's imgix integration for responsive images
- **SEO Enhancement** - Pulls meta descriptions and featured images from your content
- **Content Relationships** - Properly handles author and category relationships

Your content model includes:
- **Posts** - With title, content, excerpt, featured images, and publication dates
- **Authors** - With names, bios, profile photos, and social links  
- **Categories** - With names, descriptions, colors, and emoji icons

## 🚀 Deployment Options

### Vercel (Recommended)
```bash
bun build
```
Deploy to Vercel for optimal Next.js performance with automatic deployments.

### Netlify
```bash
bun build
bun export
```
Deploy the `out/` folder to Netlify for static hosting.

### Other Platforms
The built application in the `out/` directory can be deployed to any static hosting service.

Set your environment variables in your hosting platform:
- `COSMIC_BUCKET_SLUG`
- `COSMIC_READ_KEY`
- `COSMIC_WRITE_KEY`

<!-- README_END -->