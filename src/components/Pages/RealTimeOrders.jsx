
// import React, { useState } from 'react';

// const RealTimeOrders = () => {
//   const [orders, setOrders] = useState([
//     {
//       id: 1,
//       personName: 'Jenil',
//       phoneNumber: '+91 98765 43210',
//       items: [
//         { name: 'Pizza', quantity: 2, price: 15.99 },
//         { name: 'Pancake', quantity: 4, price: 5.99 },
//       ],
//       status: 'Pending',
//       timestamp: Date.now(),
//     },
//     {
//       id: 2,
//       personName: 'Sam',
//       phoneNumber: '+91 98765 43211',
//       items: [
//         { name: 'Burger', quantity: 1, price: 8.99 },
//         { name: 'Fries', quantity: 3, price: 3.49 },
//       ],
//       status: 'Pending',
//       timestamp: Date.now() - 100000,
//     },
//   ]);
//   const [pendingOrders, setPendingOrders] = useState([]);

//   const handleAcceptClick = (order) => {
//     setOrders(orders.filter((o) => o.id !== order.id));
//     setPendingOrders([...pendingOrders, { ...order, status: 'Accepted' }]);
//   };

//   const handleDeclineClick = (order) => {
//     setOrders(orders.filter((o) => o.id !== order.id));
//   };

//   const handleDoneClick = (order) => {
//     setPendingOrders(pendingOrders.filter((o) => o.id !== order.id));
//   };

//   const handleResendClick = (order) => {
//     setPendingOrders(pendingOrders.filter((o) => o.id !== order.id));
//     setOrders([...orders, { ...order, status: 'Pending' }]);
//   };

//   const calculateTotalPrice = (items) => {
//     return items.reduce((total, item) => total + item.quantity * item.price, 0).toFixed(2);
//   };

//   const calculateTotalQuantity = (items) => {
//     return items.reduce((total, item) => total + item.quantity, 0);
//   };

//   const OrderCard = ({ order, actions }) => (
//     <div className="flex flex-col bg-white p-3 rounded-lg shadow-md border border-gray-300">
//       <div className="flex justify-between items-start mb-2">
//         <div>
//           <h2 className="text-sm font-bold">#{order.id}</h2>
//           <p className="text-xs font-semibold">Name: {order.personName}</p>
//           <p className="text-xs text-blue-600 font-medium">{order.phoneNumber}</p>
//         </div>
//       </div>

//       {order.items.map((item, index) => (
//         <p key={index} className="text-xs text-gray-500">
//           {item.name}: {item.quantity}
//         </p>
//       ))}
      
//       <p className="text-xs font-semibold mt-2">
//         Total Quantity: {calculateTotalQuantity(order.items)}
//       </p>
//       <p className="text-xs font-semibold">
//         Total Price: ${calculateTotalPrice(order.items)}
//       </p>

//       <div className="flex space-x-3 mt-4">
//         {actions.map((action, index) => (
//           <button
//             key={index}
//             onClick={() => action.onClick(order)}
//             className={`px-3 py-1 rounded-lg text-white text-[10px] sm:text-xs ${action.className}`}
//           >
//             <span className="hidden sm:block">{action.label}</span>
//             <span className="sm:hidden">{action.icon}</span>
//           </button>
//         ))}
//       </div>
//     </div>
//   );

//   return (
//     <div className="min-h-screen p-4 md:p-6 flex flex-wrap justify-between gap-6">
//       {/* Real-Time Orders Section */}
//       <div className="w-full sm:w-2/5 mb-6 sm:mb-0">
//         <h1 className="text-xl md:text-2xl font-bold text-black mb-4">Real-Time Orders</h1>
//         <div className="space-y-4">
//           {orders.map((order) => (
//             <OrderCard
//               key={order.id}
//               order={order}
//               actions={[
//                 {
//                   label: 'Accept',
//                   icon: '✔',
//                   onClick: handleAcceptClick,
//                   className: 'bg-blue-600 hover:bg-blue-700'
//                 },
//                 {
//                   label: 'Decline',
//                   icon: '❌',
//                   onClick: handleDeclineClick,
//                   className: 'bg-gray-600 hover:bg-gray-700'
//                 }
//               ]}
//             />
//           ))}
//         </div>
//       </div>

//       {/* Pending Orders Section */}
//       <div className="w-full sm:w-2/5">
//         <h2 className="text-xl md:text-2xl font-bold text-black mb-4">Pending Orders</h2>
//         <div className="space-y-4">
//           {pendingOrders.map((order) => (
//             <OrderCard
//               key={order.id}
//               order={order}
//               actions={[
//                 {
//                   label: 'Done',
//                   icon: '✅',
//                   onClick: handleDoneClick,
//                   className: 'bg-green-600 hover:bg-green-700'
//                 },
//                 {
//                   label: 'Resend',
//                   icon: '🔄',
//                   onClick: handleResendClick,
//                   className: 'bg-yellow-600 hover:bg-yellow-700'
//                 }
//               ]}
//             />
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default RealTimeOrders;


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const RealTimeOrders = () => {
  const [orders, setOrders] = useState([]);
  const [pendingOrders, setPendingOrders] = useState([]);

  // Function to fetch cart data
  const fetchCartData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/v1/customer/carts');
      const cartData = response.data.carts;
      if (Array.isArray(cartData)) {
        setOrders(cartData);
      } else {
        console.error('API response does not contain an array of carts:', cartData);
      }
    } catch (error) {
      console.error('Error fetching cart data:', error);
    }
  };

  // Fetch data on mount
  useEffect(() => {
    fetchCartData(); // Fetch data once on mount

    // Set polling interval (e.g., every 5 seconds)
    const interval = setInterval(fetchCartData, 5000);

    // Clean up the interval when the component unmounts
    return () => clearInterval(interval);
  }, []); // Empty dependency array means this runs only once on mount

  const handleAcceptClick = (order) => {
    setOrders(orders.filter((o) => o._id !== order._id));
    setPendingOrders([...pendingOrders, { ...order, status: 'Accepted' }]);
  };

  const handleDeclineClick = async (order) => {
    try {
      await axios.delete(`http://localhost:5000/api/v1/customer/carts/${order._id}`);
      setOrders(orders.filter((o) => o._id !== order._id));
    } catch (error) {
      console.error('Error deleting order:', error);
    }
  };

  const handleDoneClick = async (order) => {
    try {
      const response = await axios.delete(`http://localhost:5000/api/v1/customer/carts/move-to-history/${order._id}`);
      if (response.status === 200) {
        setPendingOrders(pendingOrders.filter((o) => o._id !== order._id));
      } else {
        console.error('Failed to move order to history:', response.data);
      }
    } catch (error) {
      console.error('Error moving order to order history:', error);
    }
  };

  const handleResendClick = (order) => {
    setPendingOrders(pendingOrders.filter((o) => o._id !== order._id));
    setOrders([...orders, { ...order, status: 'Pending' }]);
  };

  const calculateTotalPrice = (items) => {
    return items.reduce((total, item) => total + item.quantity * item.price, 0).toFixed(2);
  };

  const calculateTotalQuantity = (items) => {
    return items.reduce((total, item) => total + item.quantity, 0);
  };

  const OrderCard = ({ order, actions }) => (
    <div className="flex flex-col bg-white p-3 rounded-lg shadow-md border border-gray-300">
      <div className="flex justify-between items-start mb-2">
        <div>
          <h2 className="text-lg font-semibold">{order.user}</h2>
          <p className="text-sm text-gray-600">Phone: {order.phoneNumber}</p>
        </div>
      </div>
      {order.items.map((item, index) => (
        <p key={index} className="text-xs text-gray-500">
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
            <span className="hidden sm:block">{action.label}</span>
            <span className="sm:hidden">{action.icon}</span>
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen p-4 md:p-6 flex flex-wrap justify-between gap-6">
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
                    icon: '✔',
                    onClick: handleAcceptClick,
                    className: 'bg-blue-600 hover:bg-blue-700'
                  },
                  {
                    label: 'Decline',
                    icon: '❌',
                    onClick: handleDeclineClick,  // Decline now deletes the order
                    className: 'bg-gray-600 hover:bg-gray-700'
                  }
                ]}
              />
            ))
          ) : (
            <p>No orders available.</p>
          )}
        </div>
      </div>

      <div className="w-full sm:w-2/5">
        <h2 className="text-xl md:text-2xl font-bold text-black mb-4">Pending Orders</h2>
        <div className="space-y-4">
          {pendingOrders.map((order) => (
            <OrderCard
              key={order._id}
              order={order}
              actions={[
                {
                  label: 'Done',
                  icon: '✅',
                  onClick: handleDoneClick,
                  className: 'bg-green-600 hover:bg-green-700'
                },
                {
                  label: 'Resend',
                  icon: '🔄',
                  onClick: handleResendClick,
                  className: 'bg-yellow-600 hover:bg-yellow-700'
                }
              ]}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default RealTimeOrders;
