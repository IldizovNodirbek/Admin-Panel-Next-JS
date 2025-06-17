import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Order {
  id: string;
  productName: string;
  customer: string;
  customerEmail: string;
  amount: number;
  paymentStatus: 'paid' | 'pending' | 'failed';
  deliveryStatus: 'delivered' | 'shipped' | 'processing' | 'cancelled';
  createdAt: string;
}

interface OrdersState {
  orders: Order[];
  loading: boolean;
  searchTerm: string;
  statusFilter: string;
}

const initialState: OrdersState = {
  orders: [
    {
      id: '1',
      productName: 'Wireless Headphones',
      customer: 'John Doe',
      customerEmail: 'john@example.com',
      amount: 199.99,
      paymentStatus: 'paid',
      deliveryStatus: 'delivered',
      createdAt: '2024-01-20T10:30:00Z',
    },
    {
      id: '2',
      productName: 'Smart Watch',
      customer: 'Jane Smith',
      customerEmail: 'jane@example.com',
      amount: 299.99,
      paymentStatus: 'paid',
      deliveryStatus: 'shipped',
      createdAt: '2024-01-19T14:20:00Z',
    },
    {
      id: '3',
      productName: 'Leather Backpack',
      customer: 'Mike Johnson',
      customerEmail: 'mike@example.com',
      amount: 149.99,
      paymentStatus: 'pending',
      deliveryStatus: 'processing',
      createdAt: '2024-01-18T09:15:00Z',
    },
  ],
  loading: false,
  searchTerm: '',
  statusFilter: 'all',
};

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    addOrder: (state, action: PayloadAction<Order>) => {
      state.orders.unshift(action.payload);
    },
    updateOrder: (state, action: PayloadAction<Order>) => {
      const index = state.orders.findIndex(o => o.id === action.payload.id);
      if (index !== -1) {
        state.orders[index] = action.payload;
      }
    },
    deleteOrder: (state, action: PayloadAction<string>) => {
      state.orders = state.orders.filter(o => o.id !== action.payload);
    },
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
    },
    setStatusFilter: (state, action: PayloadAction<string>) => {
      state.statusFilter = action.payload;
    },
  },
});

export const {
  setLoading,
  addOrder,
  updateOrder,
  deleteOrder,
  setSearchTerm,
  setStatusFilter,
} = ordersSlice.actions;

export default ordersSlice.reducer;