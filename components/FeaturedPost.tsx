import Link from 'next/link'
import { Post } from '@/types'

interface FeaturedPostProps {
  post: Post
}

export default function FeaturedPost({ post }: FeaturedPostProps) {
  if (!post) {
    return null
  }

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
    <div className="bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden">
      <div className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary-50 to-secondary-50 border-b border-gray-200">
        <svg className="w-5 h-5 text-primary-600" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
        <span className="font-semibold text-primary-700">Featured Post</span>
      </div>

      <div className="grid md:grid-cols-2 gap-0">
        {/* Image */}
        {post.metadata?.featured_image && (
          <Link href={`/posts/${post.slug}`}>
            <div className="aspect-video md:aspect-square w-full overflow-hidden">
              <img
                src={`${post.metadata.featured_image.imgix_url}?w=600&h=600&fit=crop&auto=format,compress`}
                alt={post.title}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
          </Link>
        )}

        {/* Content */}
        <div className="p-8 flex flex-col justify-center">
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

          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            <Link 
              href={`/posts/${post.slug}`}
              className="hover:text-primary-600 transition-colors"
            >
              {post.title}
            </Link>
          </h2>

          {post.metadata?.excerpt && (
            <p className="text-gray-600 mb-6 text-lg leading-relaxed">
              {post.metadata.excerpt}
            </p>
          )}

          <div className="flex items-center justify-between">
            {post.metadata?.author && (
              <Link 
                href={`/authors/${post.metadata.author.slug}`}
                className="flex items-center gap-3 hover:text-primary-600 transition-colors"
              >
                {post.metadata.author.metadata?.profile_photo && (
                  <img
                    src={`${post.metadata.author.metadata.profile_photo.imgix_url}?w=40&h=40&fit=crop&auto=format,compress`}
                    alt={post.metadata.author.title}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                )}
                <span className="font-medium text-gray-700">
                  {post.metadata.author.metadata?.name || post.metadata.author.title}
                </span>
              </Link>
            )}

            <Link 
              href={`/posts/${post.slug}`}
              className="inline-flex items-center gap-2 bg-primary-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-700 transition-colors"
            >
              Read Full Article
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}