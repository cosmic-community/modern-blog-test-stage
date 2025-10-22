// app/categories/[slug]/page.tsx
import { getCategoryBySlug, getPostsByCategory, getAllCategories } from '@/lib/cosmic'
import { Category } from '@/types'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import PostCard from '@/components/PostCard'
import CategoryFilter from '@/components/CategoryFilter'

interface CategoryPageProps {
  params: Promise<{ slug: string }>
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params
  const [category, posts, allCategories] = await Promise.all([
    getCategoryBySlug(slug),
    getCategoryBySlug(slug).then(cat => cat ? getPostsByCategory(cat.id) : []),
    getAllCategories()
  ])

  if (!category) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <div className="inline-flex items-center gap-3 mb-4">
              {category.metadata?.icon && (
                <span className="text-4xl">{category.metadata.icon}</span>
              )}
              <h1 className="text-4xl font-bold text-gray-900">
                {category.title}
              </h1>
            </div>
            {category.metadata?.description && (
              <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-600">
                {category.metadata.description}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Posts */}
          <div className="lg:w-3/4">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-gray-900">
                Posts in {category.title}
              </h2>
              <span className="text-sm text-gray-500">
                {posts.length} {posts.length === 1 ? 'post' : 'posts'}
              </span>
            </div>

            {posts.length > 0 ? (
              <div className="grid gap-8 md:grid-cols-2">
                {posts.map((post) => (
                  <PostCard key={post.id} post={post} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-600 text-lg">No posts in this category yet.</p>
                <Link 
                  href="/"
                  className="mt-4 inline-flex items-center text-primary-600 hover:text-primary-700"
                >
                  ← Back to all posts
                </Link>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:w-1/4">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">All Categories</h3>
              <CategoryFilter 
                categories={allCategories}
                selectedCategory={category.id}
                onCategoryChange={() => {}}
                showAll={true}
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}