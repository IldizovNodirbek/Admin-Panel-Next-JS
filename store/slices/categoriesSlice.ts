import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  postCount: number;
  createdAt: string;
}

interface CategoriesState {
  categories: Category[];
  loading: boolean;
  searchTerm: string;
}

const initialState: CategoriesState = {
  categories: [
    {
      id: '1',
      name: 'Technology',
      slug: 'technology',
      description: 'Latest technology trends and tutorials',
      postCount: 5,
      createdAt: '2024-01-01T00:00:00Z',
    },
    {
      id: '2',
      name: 'Design',
      slug: 'design',
      description: 'UI/UX design principles and inspiration',
      postCount: 3,
      createdAt: '2024-01-05T10:30:00Z',
    },
    {
      id: '3',
      name: 'Business',
      slug: 'business',
      description: 'Business strategies and insights',
      postCount: 2,
      createdAt: '2024-01-10T14:20:00Z',
    },
  ],
  loading: false,
  searchTerm: '',
};

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    addCategory: (state, action: PayloadAction<Category>) => {
      state.categories.unshift(action.payload);
    },
    updateCategory: (state, action: PayloadAction<Category>) => {
      const index = state.categories.findIndex(c => c.id === action.payload.id);
      if (index !== -1) {
        state.categories[index] = action.payload;
      }
    },
    deleteCategory: (state, action: PayloadAction<string>) => {
      state.categories = state.categories.filter(c => c.id !== action.payload);
    },
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
    },
  },
});

export const {
  setLoading,
  addCategory,
  updateCategory,
  deleteCategory,
  setSearchTerm,
} = categoriesSlice.actions;

export default categoriesSlice.reducer;