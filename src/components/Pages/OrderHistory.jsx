

import React, { useState } from 'react';

const OrderHistory = () => {
  const [orders] = useState([
    {
      id: "#1001",
      customer: "John Doe",
      date: "2024-02-20 14:30",
      items: ["Chicken Biryani", "Butter Naan"],
      total: 45.8,
      status: "completed",
    },
    {
      id: "#1002",
      customer: "Jane Smith",
      date: "2024-02-20 15:15",
      items: ["Paneer Tikka", "Mango Lassi"],
      total: 28.5,
      status: "completed",
    },
    // Add more order data as needed
  ]);

  const [searchQuery, setSearchQuery] = useState('');

  const filteredOrders = orders.filter((order) =>
    order.customer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleExport = () => {
    // Placeholder for export functionality
    console.log('Exporting orders...');
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4">Order History</h2>

      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <input
            type="text"
            placeholder="Search by customer"
            className="p-2 border border-gray-300 rounded w-64"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button
            onClick={handleExport}
            className="bg-indigo-600 text-white p-2 rounded hover:bg-indigo-900"
          >
            Export
          </button>
        </div>
      </div>

      <div className="order-list grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredOrders.map((order) => (
          <div
            key={order.id}
            className="order-card border p-4 rounded shadow-md bg-white"
          >
            <h3 className="text-lg font-semibold mb-2">Order {order.id}</h3>
            <p><strong>Customer:</strong> {order.customer}</p>
            <p><strong>Date:</strong> {order.date}</p>
            <p><strong>Items:</strong> {order.items.join(', ')}</p>
            <p><strong>Total:</strong> ${order.total.toFixed(2)}</p>
            <p><strong>Status:</strong> <span className={`status-${order.status}`}>{order.status}</span></p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderHistory;
