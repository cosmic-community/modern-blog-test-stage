import Link from 'next/link'
import { Post } from '@/types'

interface PostCardProps {
  post: Post
  featured?: boolean
  className?: string
}

export default function PostCard({ post, featured = false, className = '' }: PostCardProps) {
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
    <article className={`bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow ${className}`}>
      {/* Featured Image */}
      {post.metadata?.featured_image && (
        <Link href={`/posts/${post.slug}`}>
          <div className={`${featured ? 'aspect-video' : 'aspect-[4/3]'} w-full overflow-hidden`}>
            <img
              src={`${post.metadata.featured_image.imgix_url}?w=${featured ? '800' : '600'}&h=${featured ? '400' : '300'}&fit=crop&auto=format,compress`}
              alt={post.title}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>
        </Link>
      )}

      <div className="p-6">
        {/* Category & Date */}
        <div className="flex items-center gap-4 mb-3">
          {post.metadata?.category && (
            <Link 
              href={`/categories/${post.metadata.category.slug}`}
              className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium text-white"
              style={{ backgroundColor: post.metadata.category.metadata?.color || '#6b7280' }}
            >
              {post.metadata.category.metadata?.icon && (
                <span>{post.metadata.category.metadata.icon}</span>
              )}
              {post.metadata.category.title}
            </Link>
          )}
          <time className="text-xs text-gray-500">
            {publishDate}
          </time>
        </div>

        {/* Title */}
        <h2 className={`font-bold text-gray-900 mb-3 ${featured ? 'text-2xl' : 'text-lg'}`}>
          <Link 
            href={`/posts/${post.slug}`}
            className="hover:text-primary-600 transition-colors"
          >
            {post.title}
          </Link>
        </h2>

        {/* Excerpt */}
        {post.metadata?.excerpt && (
          <p className="text-gray-600 mb-4 text-sm leading-relaxed">
            {post.metadata.excerpt}
          </p>
        )}

        {/* Author & Read More */}
        <div className="flex items-center justify-between">
          {post.metadata?.author && (
            <Link 
              href={`/authors/${post.metadata.author.slug}`}
              className="flex items-center gap-2 hover:text-primary-600 transition-colors"
            >
              {post.metadata.author.metadata?.profile_photo && (
                <img
                  src={`${post.metadata.author.metadata.profile_photo.imgix_url}?w=32&h=32&fit=crop&auto=format,compress`}
                  alt={post.metadata.author.title}
                  className="w-6 h-6 rounded-full object-cover"
                />
              )}
              <span className="text-sm text-gray-700">
                {post.metadata.author.metadata?.name || post.metadata.author.title}
              </span>
            </Link>
          )}

          <Link 
            href={`/posts/${post.slug}`}
            className="text-primary-600 hover:text-primary-700 font-medium text-sm transition-colors"
          >
            Read more →
          </Link>
        </div>
      </div>
    </article>
  )
}