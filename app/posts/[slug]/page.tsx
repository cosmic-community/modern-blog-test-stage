// app/posts/[slug]/page.tsx
import { getPostBySlug, getAllPosts } from '@/lib/cosmic'
import { Post } from '@/types'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import PostCard from '@/components/PostCard'
import AuthorCard from '@/components/AuthorCard'

interface PostPageProps {
  params: Promise<{ slug: string }>
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  if (!post) {
    notFound()
  }

  // Get related posts (same category, excluding current post)
  const allPosts = await getAllPosts()
  const relatedPosts = allPosts
    .filter(p => 
      p.id !== post.id && 
      p.metadata?.category?.id === post.metadata?.category?.id
    )
    .slice(0, 3)

  const publishDate = post.metadata?.publication_date 
    ? new Date(post.metadata.publication_date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    : new Date(post.created_at).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })

  return (
    <div className="min-h-screen bg-gray-50">
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <header className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden mb-8">
          {post.metadata?.featured_image && (
            <div className="aspect-video w-full">
              <img
                src={`${post.metadata.featured_image.imgix_url}?w=1200&h=600&fit=crop&auto=format,compress`}
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}
          
          <div className="p-8">
            <div className="flex items-center gap-4 mb-4">
              {post.metadata?.category && (
                <Link 
                  href={`/categories/${post.metadata.category.slug}`}
                  className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium text-white"
                  style={{ backgroundColor: post.metadata.category.metadata?.color || '#6b7280' }}
                >
                  {post.metadata.category.metadata?.icon && (
                    <span>{post.metadata.category.metadata.icon}</span>
                  )}
                  {post.metadata.category.title}
                </Link>
              )}
              <time className="text-sm text-gray-500">
                {publishDate}
              </time>
            </div>
            
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {post.title}
            </h1>
            
            {post.metadata?.excerpt && (
              <p className="text-xl text-gray-600 mb-6">
                {post.metadata.excerpt}
              </p>
            )}
            
            {post.metadata?.author && (
              <AuthorCard author={post.metadata.author} />
            )}
          </div>
        </header>

        {/* Content */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-8">
          <div 
            className="prose max-w-none"
            dangerouslySetInnerHTML={{ __html: post.metadata?.content || '' }}
          />
          
          {post.metadata?.tags && (
            <div className="mt-8 pt-8 border-t border-gray-200">
              <h3 className="text-sm font-medium text-gray-900 mb-2">Tags:</h3>
              <div className="flex flex-wrap gap-2">
                {post.metadata.tags.split(',').map((tag, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-gray-100 text-gray-700 text-sm rounded"
                  >
                    {tag.trim()}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <section className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Posts</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {relatedPosts.map((relatedPost) => (
                <PostCard key={relatedPost.id} post={relatedPost} />
              ))}
            </div>
          </section>
        )}
      </article>
    </div>
  )
}