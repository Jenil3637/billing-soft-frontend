import React, { useState } from 'react';

const RealTimeOrders = () => {
  const [orders, setOrders] = useState([
    {
      id: 1,
      personName: 'Jenil',
      items: [
        { name: 'Pizza', quantity: 2, price: 15.99 },
        { name: 'Pancake', quantity: 4, price: 5.99 },
      ],
      status: 'Pending',
      timestamp: Date.now(),
    },
    {
      id: 2,
      personName: 'Sam',
      items: [
        { name: 'Burger', quantity: 1, price: 8.99 },
        { name: 'Fries', quantity: 3, price: 3.49 },
      ],
      status: 'Pending',
      timestamp: Date.now() - 100000, // Simulate older order
    },
  ]);
  const [pendingOrders, setPendingOrders] = useState([]);

  // Function to handle 'Accept' button click
  const handleAcceptClick = (order) => {
    setOrders(orders.filter((o) => o.id !== order.id)); // Remove the order from the current list
    setPendingOrders([...pendingOrders, { ...order, status: 'Accepted' }]); // Add it to pending list
  };

  // Function to handle 'Decline' button click
  const handleDeclineClick = (order) => {
    setOrders(orders.filter((o) => o.id !== order.id)); // Remove the order from the current list
  };

  // Function to handle 'Done' button click in pending orders
  const handleDoneClick = (order) => {
    setPendingOrders(pendingOrders.filter((o) => o.id !== order.id)); // Remove the order from the pending list
  };

  // Function to handle 'Resend' button click (move order back to real-time orders)
  const handleResendClick = (order) => {
    setPendingOrders(pendingOrders.filter((o) => o.id !== order.id)); // Remove the order from pending list
    setOrders([...orders, { ...order, status: 'Pending' }]); // Add it back to real-time orders
  };

  // Function to calculate the total cost of the order
  const calculateTotalPrice = (items) => {
    return items.reduce((total, item) => total + item.quantity * item.price, 0).toFixed(2);
  };

  // Function to calculate total quantity of food
  const calculateTotalQuantity = (items) => {
    return items.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <div className="min-h-screen p-4 md:p-6 flex space-x-6">
      {/* Real-Time Orders Section */}
      <div className="w-full lg:w-1/2">
        <h1 className="text-2xl md:text-3xl font-bold text-black mb-4">Real-Time Orders</h1>

        <div className="space-y-4">
          {orders.map((order) => (
            <div
              key={order.id}
              className="flex flex-col bg-white p-4 rounded-lg shadow-lg border-2 border-gray-300"
            >
              <h2 className="text-lg font-bold">#Order {order.id}</h2>
              <p className="text-sm font-semibold">Name: {order.personName}</p>
              {order.items.map((item, index) => (
                <p key={index} className="text-sm text-gray-500">
                  {item.name}: {item.quantity}
                </p>
              ))}
              <p className="text-sm font-semibold mt-2">
                Total Quantity: {calculateTotalQuantity(order.items)}
              </p>
              <p className="text-sm font-semibold">Total Price: ${calculateTotalPrice(order.items)}</p>

              <div className="flex space-x-4 mt-4">
                <button
                  onClick={() => handleAcceptClick(order)}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white text-sm"
                >
                  Accept
                </button>
                <button
                  onClick={() => handleDeclineClick(order)}
                  className="px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded-lg text-white text-sm"
                >
                  Decline
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pending Orders Section */}
      <div className="w-full lg:w-1/2 ml-4">
        <h2 className="text-2xl md:text-3xl font-bold text-black mb-4">Pending Orders</h2>
        <div className="space-y-4">
          {pendingOrders.map((order) => (
            <div
              key={order.id}
              className="flex flex-col bg-white p-4 rounded-lg shadow-lg border-2 border-gray-300"
            >
              <h2 className="text-lg font-bold">#Order {order.id}</h2>
              <p className="text-sm font-semibold">Name: {order.personName}</p>
              {order.items.map((item, index) => (
                <p key={index} className="text-sm text-gray-500">
                  {item.name}: {item.quantity}
                </p>
              ))}
              <p className="text-sm font-semibold mt-2">
                Total Quantity: {calculateTotalQuantity(order.items)}
              </p>
              <p className="text-sm font-semibold">Total Price: ${calculateTotalPrice(order.items)}</p>

              <div className="flex space-x-4 mt-4">
                <button
                  onClick={() => handleDoneClick(order)}
                  className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg text-white text-sm"
                >
                  Done
                </button>
                <button
                  onClick={() => handleResendClick(order)}
                  className="px-4 py-2 bg-yellow-600 hover:bg-yellow-700 rounded-lg text-white text-sm"
                >
                  Resend
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RealTimeOrders;
