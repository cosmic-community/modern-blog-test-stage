import Link from 'next/link'
import { Author } from '@/types'

interface AuthorCardProps {
  author: Author
  className?: string
  showBio?: boolean
}

export default function AuthorCard({ author, className = '', showBio = false }: AuthorCardProps) {
  if (!author) {
    return null
  }

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Profile Photo */}
      {author.metadata?.profile_photo && (
        <Link href={`/authors/${author.slug}`}>
          <img
            src={`${author.metadata.profile_photo.imgix_url}?w=80&h=80&fit=crop&auto=format,compress`}
            alt={author.title}
            className="w-10 h-10 rounded-full object-cover hover:ring-2 hover:ring-primary-500 transition-all"
          />
        </Link>
      )}

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <Link 
            href={`/authors/${author.slug}`}
            className="font-medium text-gray-900 hover:text-primary-600 transition-colors"
          >
            {author.metadata?.name || author.title}
          </Link>
        </div>

        {showBio && author.metadata?.bio && (
          <p className="text-sm text-gray-600 mt-1 line-clamp-2">
            {author.metadata.bio}
          </p>
        )}

        {/* Social Links */}
        <div className="flex items-center gap-3 mt-1">
          {author.metadata?.twitter_handle && (
            <a 
              href={`https://twitter.com/${author.metadata.twitter_handle}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-primary-600 text-sm"
            >
              Twitter
            </a>
          )}
          
          {author.metadata?.linkedin_url && (
            <a 
              href={author.metadata.linkedin_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-primary-600 text-sm"
            >
              LinkedIn
            </a>
          )}
          
          {author.metadata?.website_url && (
            <a 
              href={author.metadata.website_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-primary-600 text-sm"
            >
              Website
            </a>
          )}
        </div>
      </div>
    </div>
  )
}