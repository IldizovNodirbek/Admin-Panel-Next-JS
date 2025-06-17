import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'editor' | 'user';
  avatar?: string;
  status: 'active' | 'inactive';
  createdAt: string;
}

interface UsersState {
  users: User[];
  loading: boolean;
  searchTerm: string;
  roleFilter: string;
}

const initialState: UsersState = {
  users: [
    {
      id: '1',
      name: 'Admin User',
      email: 'admin@example.com',
      role: 'admin',
      status: 'active',
      createdAt: '2024-01-01T00:00:00Z',
    },
    {
      id: '2',
      name: 'Editor Smith',
      email: 'editor@example.com',
      role: 'editor',
      status: 'active',
      createdAt: '2024-01-15T10:30:00Z',
    },
    {
      id: '3',
      name: 'John Doe',
      email: 'john@example.com',
      role: 'user',
      status: 'active',
      createdAt: '2024-01-20T14:20:00Z',
    },
  ],
  loading: false,
  searchTerm: '',
  roleFilter: 'all',
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    addUser: (state, action: PayloadAction<User>) => {
      state.users.unshift(action.payload);
    },
    updateUser: (state, action: PayloadAction<User>) => {
      const index = state.users.findIndex(u => u.id === action.payload.id);
      if (index !== -1) {
        state.users[index] = action.payload;
      }
    },
    deleteUser: (state, action: PayloadAction<string>) => {
      state.users = state.users.filter(u => u.id !== action.payload);
    },
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
    },
    setRoleFilter: (state, action: PayloadAction<string>) => {
      state.roleFilter = action.payload;
    },
  },
});

export const {
  setLoading,
  addUser,
  updateUser,
  deleteUser,
  setSearchTerm,
  setRoleFilter,
} = usersSlice.actions;

export default usersSlice.reducer;