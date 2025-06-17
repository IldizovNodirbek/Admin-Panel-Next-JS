import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Product {
  id: string;
  title: string;
  image: string;
  price: number;
  description: string;
  category: string;
  stock: number;
  status: 'active' | 'inactive';
  createdAt: string;
}

interface ProductsState {
  products: Product[];
  loading: boolean;
  searchTerm: string;
  categoryFilter: string;
}

const initialState: ProductsState = {
  products: [
    {
      id: '1',
      title: 'Wireless Headphones',
      image: 'https://images.pexels.com/photos/3945667/pexels-photo-3945667.jpeg?auto=compress&cs=tinysrgb&w=300',
      price: 199.99,
      description: 'High-quality wireless headphones with noise cancellation',
      category: 'Electronics',
      stock: 25,
      status: 'active',
      createdAt: '2024-01-15T10:30:00Z',
    },
    {
      id: '2',
      title: 'Smart Watch',
      image: 'https://images.pexels.com/photos/267394/pexels-photo-267394.jpeg?auto=compress&cs=tinysrgb&w=300',
      price: 299.99,
      description: 'Feature-rich smartwatch with health monitoring',
      category: 'Electronics',
      stock: 15,
      status: 'active',
      createdAt: '2024-01-14T14:20:00Z',
    },
    {
      id: '3',
      title: 'Leather Backpack',
      image: 'https://images.pexels.com/photos/2905238/pexels-photo-2905238.jpeg?auto=compress&cs=tinysrgb&w=300',
      price: 149.99,
      description: 'Premium leather backpack for professionals',
      category: 'Fashion',
      stock: 8,
      status: 'active',
      createdAt: '2024-01-13T09:15:00Z',
    },
  ],
  loading: false,
  searchTerm: '',
  categoryFilter: 'all',
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    addProduct: (state, action: PayloadAction<Product>) => {
      state.products.unshift(action.payload);
    },
    updateProduct: (state, action: PayloadAction<Product>) => {
      const index = state.products.findIndex(p => p.id === action.payload.id);
      if (index !== -1) {
        state.products[index] = action.payload;
      }
    },
    deleteProduct: (state, action: PayloadAction<string>) => {
      state.products = state.products.filter(p => p.id !== action.payload);
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
  addProduct,
  updateProduct,
  deleteProduct,
  setSearchTerm,
  setCategoryFilter,
} = productsSlice.actions;

export default productsSlice.reducer;