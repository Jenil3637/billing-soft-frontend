import React from 'react';
import { DollarSign, ShoppingBag, Users, TrendingUp } from 'lucide-react';

const Dashboard = () => {
  return (
    <div className="p-8 space-y-8">
      <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>

      {/* Cards Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <DashboardCard
          icon={<DollarSign className="text-green-600" />}
          title="Today's Revenue"
          value="$1,234.56"
          trend="+12.3%"
        />
        <DashboardCard
          icon={<ShoppingBag className="text-blue-600" />}
          title="Total Orders"
          value="48"
          trend="+8.1%"
        />
        <DashboardCard
          icon={<Users className="text-purple-600" />}
          title="New Customers"
          value="12"
          trend="+5.4%"
        />
        <DashboardCard
          icon={<TrendingUp className="text-orange-600" />}
          title="Avg. Order Value"
          value="$25.70"
          trend="+3.2%"
        />
      </div>

      {/* Details Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentOrders />
        <PopularItems />
      </div>
    </div>
  );
};

const DashboardCard = ({ icon, title, value, trend }) => (
  <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transform hover:scale-105 transition-all duration-300">
    <div className="flex items-center justify-between mb-4">
      <div className="p-2 bg-gray-50 rounded-lg">{icon}</div>
      <span className={`text-sm font-medium ${trend.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
        {trend}
      </span>
    </div>
    <h3 className="text-gray-600 text-sm mb-1">{title}</h3>
    <p className="text-2xl font-bold text-gray-800">{value}</p>
  </div>
);

const RecentOrders = () => (
  <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300">
    <h2 className="text-lg font-semibold text-gray-800 mb-4">Recent Orders</h2>
    <div className="space-y-4">
      {[1, 2, 3, 4].map((i) => (
        <div
          key={i}
          className="flex items-center justify-between py-2 border-b hover:bg-gray-50 transition-colors"
        >
          <div>
            <p className="font-medium">Order #{1000 + i}</p>
            <p className="text-sm text-gray-500">2 items • $45.80</p>
          </div>
          <span className="px-3 py-1 text-sm rounded-full bg-green-50 text-green-600">
            Completed
          </span>
        </div>
      ))}
    </div>
  </div>
);

const PopularItems = () => (
  <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300">
    <h2 className="text-lg font-semibold text-gray-800 mb-4">Popular Items</h2>
    <div className="space-y-4">
      {[
        { name: 'Chicken Biryani', orders: 124, revenue: '$1,240' },
        { name: 'Butter Naan', orders: 96, revenue: '$384' },
        { name: 'Paneer Tikka', orders: 86, revenue: '$688' },
        { name: 'Mango Lassi', orders: 72, revenue: '$216' },
      ].map((item, i) => (
        <div
          key={i}
          className="flex items-center justify-between py-2 border-b hover:bg-gray-50 transition-colors"
        >
          <div>
            <p className="font-medium">{item.name}</p>
            <p className="text-sm text-gray-500">{item.orders} orders</p>
          </div>
          <span className="font-semibold text-gray-700">{item.revenue}</span>
        </div>
      ))}
    </div>
  </div>
);

export default Dashboard;
