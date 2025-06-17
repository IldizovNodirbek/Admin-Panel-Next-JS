'use client';

import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import {
  Package,
  ShoppingCart,
  Users,
  FileText,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Activity,
} from 'lucide-react';

const monthlyData = [
  { name: 'Jan', sales: 4000, orders: 240 },
  { name: 'Feb', sales: 3000, orders: 180 },
  { name: 'Mar', sales: 5000, orders: 320 },
  { name: 'Apr', sales: 4500, orders: 280 },
  { name: 'May', sales: 6000, orders: 380 },
  { name: 'Jun', sales: 5500, orders: 350 },
];

const categoryData = [
  { name: 'Electronics', value: 45, color: '#0088FE' },
  { name: 'Fashion', value: 30, color: '#00C49F' },
  { name: 'Books', value: 15, color: '#FFBB28' },
  { name: 'Sports', value: 10, color: '#FF8042' },
];

export default function DashboardPage() {
  const { products } = useSelector((state: RootState) => state.products);
  const { orders } = useSelector((state: RootState) => state.orders);
  const { users } = useSelector((state: RootState) => state.users);
  const { posts } = useSelector((state: RootState) => state.blog);

  const totalRevenue = orders.reduce((sum, order) => sum + order.amount, 0);
  const pendingOrders = orders.filter(order => order.paymentStatus === 'pending').length;
  const activeProducts = products.filter(product => product.status === 'active').length;
  const totalStock = products.reduce((sum, product) => sum + product.stock, 0);

  const stats = [
    {
      title: 'Total Revenue',
      value: `$${totalRevenue.toLocaleString()}`,
      description: '+20.1% from last month',
      icon: DollarSign,
      trend: 'up',
    },
    {
      title: 'Orders',
      value: orders.length.toString(),
      description: `${pendingOrders} pending`,
      icon: ShoppingCart,
      trend: 'up',
    },
    {
      title: 'Products',
      value: products.length.toString(),
      description: `${activeProducts} active`,
      icon: Package,
      trend: 'up',
    },
    {
      title: 'Users',
      value: users.length.toString(),
      description: '+5 new this week',
      icon: Users,
      trend: 'up',
    },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <Badge variant="secondary">Admin View</Badge>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title} className="transition-all hover:shadow-md">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground flex items-center">
                {stat.trend === 'up' ? (
                  <TrendingUp className="h-3 w-3 mr-1 text-green-500" />
                ) : (
                  <TrendingDown className="h-3 w-3 mr-1 text-red-500" />
                )}
                {stat.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Sales & Orders Overview</CardTitle>
            <CardDescription>Monthly sales and order trends</CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="sales" fill="#8884d8" />
                <Bar dataKey="orders" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Product Categories</CardTitle>
            <CardDescription>Distribution by category</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={350}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
            <CardDescription>Latest customer orders</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {orders.slice(0, 5).map((order) => (
                <div key={order.id} className="flex items-center space-x-4 rounded-lg border p-3">
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {order.productName}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {order.customer} • ${order.amount}
                    </p>
                  </div>
                  <Badge variant={order.paymentStatus === 'paid' ? 'success' : 'secondary'}>
                    {order.paymentStatus}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Quick Stats</CardTitle>
            <CardDescription>Key performance indicators</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>Total Stock</span>
                <span>{totalStock} items</span>
              </div>
              <Progress value={75} />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>Blog Posts</span>
                <span>{posts.length} published</span>
              </div>
              <Progress value={60} />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>Active Users</span>
                <span>{users.filter(u => u.status === 'active').length}</span>
              </div>
              <Progress value={90} />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}