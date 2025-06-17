import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  image: string;
  category: string;
  content: string;
  tags: string[];
  status: 'published' | 'draft';
  author: string;
  createdAt: string;
}

interface BlogState {
  posts: BlogPost[];
  loading: boolean;
  searchTerm: string;
  categoryFilter: string;
}

const initialState: BlogState = {
  posts: [
    {
      id: '1',
      title: 'Getting Started with Next.js',
      slug: 'getting-started-with-nextjs',
      image: 'https://images.pexels.com/photos/11035471/pexels-photo-11035471.jpeg?auto=compress&cs=tinysrgb&w=300',
      category: 'Technology',
      content: 'Learn how to build modern web applications with Next.js...',
      tags: ['nextjs', 'react', 'javascript'],
      status: 'published',
      author: 'Admin User',
      createdAt: '2024-01-20T10:30:00Z',
    },
    {
      id: '2',
      title: 'UI/UX Design Principles',
      slug: 'ui-ux-design-principles',
      image: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=300',
      category: 'Design',
      content: 'Understanding the fundamentals of good UI/UX design...',
      tags: ['design', 'ui', 'ux'],
      status: 'published',
      author: 'Editor Smith',
      createdAt: '2024-01-19T14:20:00Z',
    },
    {
      id: '3',
      title: 'Modern Web Development Trends',
      slug: 'modern-web-development-trends',
      image: 'https://images.pexels.com/photos/270348/pexels-photo-270348.jpeg?auto=compress&cs=tinysrgb&w=300',
      category: 'Technology',
      content: 'Exploring the latest trends in web development...',
      tags: ['web development', 'trends', 'javascript'],
      status: 'draft',
      author: 'Admin User',
      createdAt: '2024-01-18T09:15:00Z',
    },
  ],
  loading: false,
  searchTerm: '',
  categoryFilter: 'all',
};

const blogSlice = createSlice({
  name: 'blog',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    addPost: (state, action: PayloadAction<BlogPost>) => {
      state.posts.unshift(action.payload);
    },
    updatePost: (state, action: PayloadAction<BlogPost>) => {
      const index = state.posts.findIndex(p => p.id === action.payload.id);
      if (index !== -1) {
        state.posts[index] = action.payload;
      }
    },
    deletePost: (state, action: PayloadAction<string>) => {
      state.posts = state.posts.filter(p => p.id !== action.payload);
    },
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
    },
    setCategoryFilter: (state, action: PayloadAction<string>) => {
      state.categoryFilter = action.payload;
    },
  },
});

export const {
  setLoading,
  addPost,
  updatePost,
  deletePost,
  setSearchTerm,
  setCategoryFilter,
} = blogSlice.actions;

export default blogSlice.reducer;