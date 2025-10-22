import { getAllPosts, getAllCategories, getFeaturedPosts } from '@/lib/cosmic'
import { Post, Category } from '@/types'
import PostCard from '@/components/PostCard'
import CategoryFilter from '@/components/CategoryFilter'
import FeaturedPost from '@/components/FeaturedPost'

export default async function HomePage() {
  const [posts, categories, featuredPosts] = await Promise.all([
    getAllPosts(),
    getAllCategories(),
    getFeaturedPosts()
  ])

  const featuredPost = featuredPosts[0] || null
  const regularPosts = posts.filter(post => !post.metadata?.featured_post)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl md:text-6xl">
              Welcome to Our Blog
            </h1>
            <p className="mt-6 max-w-2xl mx-auto text-xl text-gray-600">
              Discover insights on technology, lifestyle, and travel from our expert contributors.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Post */}
      {featuredPost && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <FeaturedPost post={featuredPost} />
        </section>
      )}

      {/* Main Content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Posts */}
          <div className="lg:w-3/4">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Latest Posts</h2>
            
            {regularPosts.length > 0 ? (
              <div className="grid gap-8 md:grid-cols-2">
                {regularPosts.map((post) => (
                  <PostCard key={post.id} post={post} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-600 text-lg">No posts available at the moment.</p>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:w-1/4">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Categories</h3>
              <CategoryFilter 
                categories={categories}
                selectedCategory={null}
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