import Link from 'next/link'
import { Category } from '@/types'

interface CategoryFilterProps {
  categories: Category[]
  selectedCategory: string | null
  onCategoryChange: (categoryId: string | null) => void
  showAll?: boolean
}

export default function CategoryFilter({ 
  categories, 
  selectedCategory, 
  onCategoryChange,
  showAll = false 
}: CategoryFilterProps) {
  if (!categories || categories.length === 0) {
    return (
      <div className="text-gray-500 text-sm">
        No categories available
      </div>
    )
  }

  return (
    <div className="space-y-2">
      {showAll && (
        <Link
          href="/"
          className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
            selectedCategory === null
              ? 'bg-primary-100 text-primary-700'
              : 'text-gray-700 hover:bg-gray-100'
          }`}
        >
          <span className="w-2 h-2 rounded-full bg-gray-400"></span>
          All Posts
        </Link>
      )}

      {categories.map((category) => (
        <Link
          key={category.id}
          href={`/categories/${category.slug}`}
          className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
            selectedCategory === category.id
              ? 'text-white'
              : 'text-gray-700 hover:bg-gray-100'
          }`}
          style={{
            backgroundColor: selectedCategory === category.id 
              ? category.metadata?.color || '#6b7280'
              : undefined
          }}
        >
          {category.metadata?.icon && (
            <span className="text-sm">{category.metadata.icon}</span>
          )}
          {category.title}
        </Link>
      ))}
    </div>
  )
}