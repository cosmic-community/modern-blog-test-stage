// Base Cosmic object interface
interface CosmicObject {
  id: string;
  slug: string;
  title: string;
  content?: string;
  metadata: Record<string, any>;
  type: string;
  created_at: string;
  modified_at: string;
  status: string;
  thumbnail?: string;
  published_at: string;
}

// Author interface
export interface Author extends CosmicObject {
  type: 'authors';
  metadata: {
    name?: string;
    bio?: string;
    profile_photo?: {
      url: string;
      imgix_url: string;
    };
    email?: string;
    twitter_handle?: string;
    linkedin_url?: string;
    website_url?: string;
  };
}

// Category interface
export interface Category extends CosmicObject {
  type: 'categories';
  metadata: {
    name?: string;
    description?: string;
    color?: string;
    icon?: string;
  };
}

// Post interface
export interface Post extends CosmicObject {
  type: 'posts';
  metadata: {
    title?: string;
    content?: string;
    excerpt?: string;
    featured_image?: {
      url: string;
      imgix_url: string;
    };
    author?: Author;
    category?: Category;
    tags?: string;
    publication_date?: string;
    featured_post?: boolean;
  };
}

// API response types
export interface CosmicResponse<T> {
  objects: T[];
  total: number;
}

export interface CosmicSingleResponse<T> {
  object: T;
}

// Component prop types
export interface PostCardProps {
  post: Post;
  featured?: boolean;
  className?: string;
}

export interface CategoryFilterProps {
  categories: Category[];
  selectedCategory: string | null;
  onCategoryChange: (categoryId: string | null) => void;
}

export interface AuthorCardProps {
  author: Author;
  className?: string;
}

// Page props
export interface HomePageProps {
  posts: Post[];
  categories: Category[];
  featuredPost?: Post;
}

export interface CategoryPageProps {
  posts: Post[];
  category: Category;
  categories: Category[];
}

export interface PostPageProps {
  post: Post;
  relatedPosts: Post[];
}

export interface AuthorPageProps {
  author: Author;
  posts: Post[];
}

// Error types
export interface CosmicError extends Error {
  status?: number;
  code?: string;
}

// Type guards
export function isPost(obj: CosmicObject): obj is Post {
  return obj.type === 'posts';
}

export function isAuthor(obj: CosmicObject): obj is Author {
  return obj.type === 'authors';
}

export function isCategory(obj: CosmicObject): obj is Category {
  return obj.type === 'categories';
}

export function hasStatus(error: unknown): error is { status: number } {
  return typeof error === 'object' && error !== null && 'status' in error;
}