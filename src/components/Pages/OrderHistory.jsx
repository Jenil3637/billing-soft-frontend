

import { Download, Search, Filter } from "lucide-react";

import React, { useState } from "react";

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

  const [searchTerm, setSearchTerm] = useState("");

  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "text-indigo-600";
      case "pending":
        return "text-yellow-600";
      case "cancelled":
        return "text-red-600";
      default:
        return "text-gray-600";
    }
  };

  const filteredOrders = orders.filter(
    (order) =>
      order.id.includes(searchTerm) ||
      order.customer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <div className="flex flex-col sm:flex-row justify-between items-center p-4">
        <h1 className="text-2xl font-bold text-black mb-4 sm:mb-0">Order History</h1>
        <button className="flex items-center space-x-2 px-4 py-2 border rounded-lg hover:bg-gray-50">
          <Download size={20} />
          <span className="text-black">Export</span>
        </button>
      </div>

      <div className="flex-1 bg-white rounded-lg shadow-sm ">
        <div className="p-4 border-b">
          <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0">
            <div className="relative flex-1">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                type="text"
                placeholder="Search orders..."
                className="w-full pl-10 pr-4 py-2 border rounded-lg"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button className="flex items-center space-x-2 px-4 py-2 border rounded-lg hover:bg-gray-50">
              <Filter size={20} />
              <span className="text-black">Filter</span>
            </button>
          </div>
        </div>

        <div className="space-y-4 md:space-y-6 p-4 max-h-[50vh]">
          {filteredOrders.map((order) => (
            <div key={order.id} className="border p-4 rounded-lg shadow-md">
              <div className="flex flex-col sm:flex-row justify-between mb-4">
                <div className="text-lg font-semibold">{order.id}</div>
                <div
                  className={`px-3 py-1 text-sm rounded-full capitalize ${getStatusColor(order.status)}`}
                >
                  {order.status}
                </div>
              </div>
              <div className="mb-2">
                <strong>Customer: </strong>
                <span>{order.customer}</span>
              </div>
              <div className="mb-2">
                <strong>Date: </strong>
                <span>{order.date}</span>
              </div>
              <div className="mb-2">
                <strong>Items: </strong>
                <span>{order.items.join(", ")}</span>
              </div>
              <div className="mb-2">
                <strong>Total: </strong>
                <span>${order.total.toFixed(2)}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrderHistory;


