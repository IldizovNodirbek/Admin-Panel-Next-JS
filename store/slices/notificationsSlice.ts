import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Notification {
  id: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  status: 'read' | 'unread';
  date: string;
}

interface NotificationsState {
  notifications: Notification[];
  loading: boolean;
  unreadCount: number;
}

const initialState: NotificationsState = {
  notifications: [
    {
      id: '1',
      message: 'New order received from John Doe',
      type: 'info',
      status: 'unread',
      date: '2024-01-20T10:30:00Z',
    },
    {
      id: '2',
      message: 'Product stock is running low',
      type: 'warning',
      status: 'unread',
      date: '2024-01-19T14:20:00Z',
    },
    {
      id: '3',
      message: 'Payment processed successfully',
      type: 'success',
      status: 'read',
      date: '2024-01-18T09:15:00Z',
    },
  ],
  loading: false,
  unreadCount: 2,
};

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    addNotification: (state, action: PayloadAction<Notification>) => {
      state.notifications.unshift(action.payload);
      if (action.payload.status === 'unread') {
        state.unreadCount += 1;
      }
    },
    markAsRead: (state, action: PayloadAction<string>) => {
      const notification = state.notifications.find(n => n.id === action.payload);
      if (notification && notification.status === 'unread') {
        notification.status = 'read';
        state.unreadCount -= 1;
      }
    },
    markAllAsRead: (state) => {
      state.notifications.forEach(n => n.status = 'read');
      state.unreadCount = 0;
    },
    deleteNotification: (state, action: PayloadAction<string>) => {
      const notification = state.notifications.find(n => n.id === action.payload);
      if (notification?.status === 'unread') {
        state.unreadCount -= 1;
      }
      state.notifications = state.notifications.filter(n => n.id !== action.payload);
    },
  },
});

export const {
  setLoading,
  addNotification,
  markAsRead,
  markAllAsRead,
  deleteNotification,
} = notificationsSlice.actions;

export default notificationsSlice.reducer;