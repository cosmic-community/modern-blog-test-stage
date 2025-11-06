import { getPageBySlug } from '@/lib/cosmic'
import { notFound } from 'next/navigation'
import { Metadata } from 'next'

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPageBySlug('about')
  
  if (!page) {
    return {
      title: 'About Us',
      description: 'Learn more about our blog'
    }
  }

  return {
    title: page.metadata?.page_title || page.title,
    description: page.metadata?.meta_description || 'Learn more about our blog'
  }
}

export default async function AboutPage() {
  const page = await getPageBySlug('about')

  if (!page) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        {page.metadata?.hero_image && (
          <div className="mb-8 rounded-lg overflow-hidden shadow-lg">
            <img
              src={`${page.metadata.hero_image.imgix_url}?w=1600&h=600&fit=crop&auto=format,compress`}
              alt={page.metadata?.page_title || page.title}
              className="w-full h-64 md:h-96 object-cover"
            />
          </div>
        )}

        {/* Page Header */}
        <header className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {page.metadata?.page_title || page.title}
          </h1>
        </header>

        {/* Page Content */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <div 
            className="prose max-w-none"
            dangerouslySetInnerHTML={{ __html: page.metadata?.content || '' }}
          />
        </div>
      </article>
    </div>
  )
}