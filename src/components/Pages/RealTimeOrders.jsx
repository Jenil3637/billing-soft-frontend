import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

const RealTimeOrders = () => {
  const [orders, setOrders] = useState([]); // Real-time orders
  const [pendingOrders, setPendingOrders] = useState([]); // Pending orders
  const processedCartIds = useRef(new Set()); // To track processed cart IDs

  // Fetch cart data from the API
  const fetchCartData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/v1/customer/carts');
      const cartData = response.data.carts;

      if (Array.isArray(cartData)) {
        // Filter out duplicate orders
        const newOrders = cartData.filter(
          (cart) => !processedCartIds.current.has(cart._id)
        );

        if (newOrders.length > 0) {
          // Update state with new orders
          setOrders((prevOrders) => [...prevOrders, ...newOrders]);
          
          // Mark these cart IDs as processed
          newOrders.forEach((order) => processedCartIds.current.add(order._id));
        }
      } else {
        console.error('API response does not contain an array of carts:', cartData);
      }
    } catch (error) {
      console.error('Error fetching cart data:', error.message);
    }
  };

  useEffect(() => {
    fetchCartData(); // Fetch data initially
    const interval = setInterval(fetchCartData, 5000); // Poll every 5 seconds
    return () => clearInterval(interval); // Cleanup interval on unmount
  }, []);

  // Handle Accept action
  const handleAcceptClick = (order) => {
    setOrders((prevOrders) => prevOrders.filter((o) => o._id !== order._id));
    setPendingOrders((prevPendingOrders) => [
      ...prevPendingOrders,
      { ...order, status: 'Pending' },
    ]);
  };

  // Handle Decline action
  const handleDeclineClick = async (order) => {
    try {
      const response = await axios.delete(`http://localhost:5000/api/v1/customer/carts/${order._id}`);
      if (response.status === 200) {
        setOrders((prevOrders) => prevOrders.filter((o) => o._id !== order._id));
      }
    } catch (error) {
      console.error('Error deleting order:', error.message);
    }
  };

  // Handle Done action
  const handleDoneClick = async (order) => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/v1/customer/carts/move-to-history/${order._id}`
      );

      if (response.status === 200) {
        setPendingOrders((prevPendingOrders) =>
          prevPendingOrders.filter((o) => o._id !== order._id)
        );
      }
    } catch (error) {
      console.error('Error moving order to history:', error.message);
    }
  };

  // Handle Resend action
  const handleResendClick = (order) => {
    setPendingOrders((prevPendingOrders) =>
      prevPendingOrders.filter((o) => o._id !== order._id)
    );
    setOrders((prevOrders) => [...prevOrders, { ...order, status: 'Real-Time' }]);
  };

  // Helper functions to calculate totals
  const calculateTotalPrice = (items) => {
    return items.reduce((total, item) => total + item.quantity * item.price, 0).toFixed(2);
  };

  const calculateTotalQuantity = (items) => {
    return items.reduce((total, item) => total + item.quantity, 0);
  };

  // Order card component
  const OrderCard = ({ order, actions }) => (
    <div className="flex flex-col bg-white p-3 rounded-lg shadow-md border border-gray-300">
      <div>
        <h2 className="text-lg font-semibold">{order.user}</h2>
        <p className="text-sm text-gray-600">Phone: {order.phoneNumber}</p>
      </div>
      {order.items.map((item, index) => (
        <p key={`${order._id}-${index}`} className="text-xs text-gray-500">
          {item.name}: {item.quantity}
        </p>
      ))}
      <p className="text-xs font-semibold mt-2">Total Quantity: {calculateTotalQuantity(order.items)}</p>
      <p className="text-xs font-semibold">Total Price: ₹{calculateTotalPrice(order.items)}</p>
      <div className="flex space-x-3 mt-4">
        {actions.map((action, index) => (
          <button
            key={index}
            onClick={() => action.onClick(order)}
            className={`px-3 py-1 rounded-lg text-white text-[10px] sm:text-xs ${action.className}`}
          >
            {action.label}
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen p-4 md:p-6 flex flex-wrap justify-between gap-6">
      {/* Real-Time Orders Section */}
      <div className="w-full sm:w-2/5 mb-6 sm:mb-0">
        <h1 className="text-xl md:text-2xl font-bold text-black mb-4">Real-Time Orders</h1>
        <div className="space-y-4">
          {orders.length > 0 ? (
            orders.map((order) => (
              <OrderCard
                key={order._id}
                order={order}
                actions={[
                  {
                    label: 'Accept',
                    onClick: handleAcceptClick,
                    className: 'bg-blue-600 hover:bg-blue-700',
                  },
                  {
                    label: 'Decline',
                    onClick: handleDeclineClick,
                    className: 'bg-gray-600 hover:bg-gray-700',
                  },
                ]}
              />
            ))
          ) : (
            <p>No orders available.</p>
          )}
        </div>
      </div>

      {/* Pending Orders Section */}
      <div className="w-full sm:w-2/5">
        <h2 className="text-xl md:text-2xl font-bold text-black mb-4">Pending Orders</h2>
        <div className="space-y-4">
          {pendingOrders.length > 0 ? (
            pendingOrders.map((order) => (
              <OrderCard
                key={order._id}
                order={order}
                actions={[
                  {
                    label: 'Done',
                    onClick: handleDoneClick,
                    className: 'bg-green-600 hover:bg-green-700',
                  },
                  {
                    label: 'Resend',
                    onClick: handleResendClick,
                    className: 'bg-yellow-600 hover:bg-yellow-700',
                  },
                ]}
              />
            ))
          ) : (
            <p>No pending orders.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default RealTimeOrders;
