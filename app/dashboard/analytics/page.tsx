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
  AreaChart,
  Area,
} from 'recharts';
import {
  TrendingUp,
  TrendingDown,
  Users,
  ShoppingCart,
  Package,
  DollarSign,
  Eye,
  MousePointer,
  Calendar,
  Target,
} from 'lucide-react';

// Mock analytics data
const salesData = [
  { name: 'Jan', sales: 4000, orders: 240, revenue: 12000 },
  { name: 'Feb', sales: 3000, orders: 180, revenue: 9000 },
  { name: 'Mar', sales: 5000, orders: 320, revenue: 15000 },
  { name: 'Apr', sales: 4500, orders: 280, revenue: 13500 },
  { name: 'May', sales: 6000, orders: 380, revenue: 18000 },
  { name: 'Jun', sales: 5500, orders: 350, revenue: 16500 },
];

const categoryData = [
  { name: 'Electronics', value: 45, color: '#0088FE', sales: 25000 },
  { name: 'Fashion', value: 30, color: '#00C49F', sales: 18000 },
  { name: 'Books', value: 15, color: '#FFBB28', sales: 8000 },
  { name: 'Sports', value: 10, color: '#FF8042', sales: 5000 },
];

const trafficData = [
  { name: 'Mon', visitors: 1200, pageViews: 3400 },
  { name: 'Tue', visitors: 1100, pageViews: 3100 },
  { name: 'Wed', visitors: 1400, pageViews: 3800 },
  { name: 'Thu', visitors: 1300, pageViews: 3600 },
  { name: 'Fri', visitors: 1600, pageViews: 4200 },
  { name: 'Sat', visitors: 1800, pageViews: 4800 },
  { name: 'Sun', visitors: 1500, pageViews: 4000 },
];

const conversionData = [
  { name: 'Landing Page', visitors: 10000, conversions: 850 },
  { name: 'Product Page', visitors: 8500, conversions: 680 },
  { name: 'Cart Page', visitors: 6800, conversions: 544 },
  { name: 'Checkout', visitors: 5440, conversions: 435 },
  { name: 'Purchase', visitors: 4350, conversions: 435 },
];

export default function AnalyticsPage() {
  const { products } = useSelector((state: RootState) => state.products);
  const { orders } = useSelector((state: RootState) => state.orders);
  const { users } = useSelector((state: RootState) => state.users);
  const { posts } = useSelector((state: RootState) => state.blog);

  const totalRevenue = orders.reduce((sum, order) => sum + order.amount, 0);
  const totalOrders = orders.length;
  const totalProducts = products.length;
  const totalUsers = users.length;

  const metrics = [
    {
      title: 'Total Revenue',
      value: `$${totalRevenue.toLocaleString()}`,
      change: '+12.5%',
      trend: 'up',
      icon: DollarSign,
      color: 'text-green-600',
    },
    {
      title: 'Total Orders',
      value: totalOrders.toString(),
      change: '+8.2%',
      trend: 'up',
      icon: ShoppingCart,
      color: 'text-blue-600',
    },
    {
      title: 'Active Users',
      value: totalUsers.toString(),
      change: '+15.3%',
      trend: 'up',
      icon: Users,
      color: 'text-purple-600',
    },
    {
      title: 'Products',
      value: totalProducts.toString(),
      change: '+5.1%',
      trend: 'up',
      icon: Package,
      color: 'text-orange-600',
    },
  ];

  const kpiCards = [
    {
      title: 'Page Views',
      value: '24,567',
      change: '+18.2%',
      trend: 'up',
      icon: Eye,
    },
    {
      title: 'Click Rate',
      value: '3.24%',
      change: '+0.5%',
      trend: 'up',
      icon: MousePointer,
    },
    {
      title: 'Conversion Rate',
      value: '4.35%',
      change: '-0.2%',
      trend: 'down',
      icon: Target,
    },
    {
      title: 'Avg. Session',
      value: '4m 32s',
      change: '+12s',
      trend: 'up',
      icon: Calendar,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Analytics</h2>
          <p className="text-muted-foreground">
            Comprehensive insights into your business performance
          </p>
        </div>
        <Badge variant="secondary">Last 30 days</Badge>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {metrics.map((metric) => (
          <Card key={metric.title} className="transition-all hover:shadow-md">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {metric.title}
              </CardTitle>
              <metric.icon className={`h-4 w-4 ${metric.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metric.value}</div>
              <p className="text-xs text-muted-foreground flex items-center">
                {metric.trend === 'up' ? (
                  <TrendingUp className="h-3 w-3 mr-1 text-green-500" />
                ) : (
                  <TrendingDown className="h-3 w-3 mr-1 text-red-500" />
                )}
                {metric.change} from last month
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        {/* Revenue Chart */}
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Revenue Overview</CardTitle>
            <CardDescription>Monthly revenue and order trends</CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <ResponsiveContainer width="100%" height={350}>
              <AreaChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stackId="1"
                  stroke="#8884d8"
                  fill="#8884d8"
                  fillOpacity={0.6}
                />
                <Area
                  type="monotone"
                  dataKey="sales"
                  stackId="1"
                  stroke="#82ca9d"
                  fill="#82ca9d"
                  fillOpacity={0.6}
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Category Distribution */}
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Sales by Category</CardTitle>
            <CardDescription>Revenue distribution across categories</CardDescription>
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
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
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

      {/* Traffic and Conversion */}
      <div className="grid gap-4 md:grid-cols-2">
        {/* Website Traffic */}
        <Card>
          <CardHeader>
            <CardTitle>Website Traffic</CardTitle>
            <CardDescription>Daily visitors and page views</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={trafficData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="visitors"
                  stroke="#8884d8"
                  strokeWidth={2}
                />
                <Line
                  type="monotone"
                  dataKey="pageViews"
                  stroke="#82ca9d"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Conversion Funnel */}
        <Card>
          <CardHeader>
            <CardTitle>Conversion Funnel</CardTitle>
            <CardDescription>User journey through the sales process</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {conversionData.map((step, index) => {
                const conversionRate = (step.conversions / step.visitors) * 100;
                return (
                  <div key={step.name} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium">{step.name}</span>
                      <span className="text-muted-foreground">
                        {step.conversions.toLocaleString()} / {step.visitors.toLocaleString()} ({conversionRate.toFixed(1)}%)
                      </span>
                    </div>
                    <Progress value={conversionRate} className="h-2" />
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {kpiCards.map((kpi) => (
          <Card key={kpi.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {kpi.title}
              </CardTitle>
              <kpi.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{kpi.value}</div>
              <p className="text-xs text-muted-foreground flex items-center">
                {kpi.trend === 'up' ? (
                  <TrendingUp className="h-3 w-3 mr-1 text-green-500" />
                ) : (
                  <TrendingDown className="h-3 w-3 mr-1 text-red-500" />
                )}
                {kpi.change} from last week
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Performance Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Performance Summary</CardTitle>
          <CardDescription>Key performance indicators at a glance</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>Revenue Growth</span>
                <span className="font-medium">+12.5%</span>
              </div>
              <Progress value={75} />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>Customer Satisfaction</span>
                <span className="font-medium">94%</span>
              </div>
              <Progress value={94} />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>Market Share</span>
                <span className="font-medium">23%</span>
              </div>
              <Progress value={23} />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}