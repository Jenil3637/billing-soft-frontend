// import React, { useState } from 'react';

// const RealTimeOrders = () => {
//   const [orders, setOrders] = useState([
//     {
//       id: 1,
//       personName: 'Jenil',
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
//       items: [
//         { name: 'Burger', quantity: 1, price: 8.99 },
//         { name: 'Fries', quantity: 3, price: 3.49 },
//       ],
//       status: 'Pending',
//       timestamp: Date.now() - 100000, // Simulate older order
//     },
//   ]);
//   const [pendingOrders, setPendingOrders] = useState([]);

//   // Function to handle 'Accept' button click
//   const handleAcceptClick = (order) => {
//     setOrders(orders.filter((o) => o.id !== order.id)); // Remove the order from the current list
//     setPendingOrders([...pendingOrders, { ...order, status: 'Accepted' }]); // Add it to pending list
//   };

//   // Function to handle 'Decline' button click
//   const handleDeclineClick = (order) => {
//     setOrders(orders.filter((o) => o.id !== order.id)); // Remove the order from the current list
//   };

//   // Function to handle 'Done' button click in pending orders
//   const handleDoneClick = (order) => {
//     setPendingOrders(pendingOrders.filter((o) => o.id !== order.id)); // Remove the order from the pending list
//   };

//   // Function to handle 'Resend' button click (move order back to real-time orders)
//   const handleResendClick = (order) => {
//     setPendingOrders(pendingOrders.filter((o) => o.id !== order.id)); // Remove the order from pending list
//     setOrders([...orders, { ...order, status: 'Pending' }]); // Add it back to real-time orders
//   };

//   // Function to calculate the total cost of the order
//   const calculateTotalPrice = (items) => {
//     return items.reduce((total, item) => total + item.quantity * item.price, 0).toFixed(2);
//   };

//   // Function to calculate total quantity of food
//   const calculateTotalQuantity = (items) => {
//     return items.reduce((total, item) => total + item.quantity, 0);
//   };

//   return (
//     <div className="min-h-screen p-4 md:p-6 flex flex-wrap justify-between gap-6">
//       {/* Real-Time Orders Section */}
//       <div className="w-full sm:w-2/5 mb-6 sm:mb-0">
//         <h1 className="text-xl md:text-2xl font-bold text-black mb-4">Real-Time Orders</h1>
//         <div className="space-y-4">
//           {orders.map((order) => (
//             <div
//               key={order.id}
//               className="flex flex-col bg-white p-3 rounded-lg shadow-md border border-gray-300"
//             >
//               <h2 className="text-sm font-bold">#Order {order.id}</h2>
//               <p className="text-xs font-semibold">Name: {order.personName}</p>
//               {order.items.map((item, index) => (
//                 <p key={index} className="text-xs text-gray-500">
//                   {item.name}: {item.quantity}
//                 </p>
//               ))}
//               <p className="text-xs font-semibold mt-2">
//                 Total Quantity: {calculateTotalQuantity(order.items)}
//               </p>
//               <p className="text-xs font-semibold">Total Price: ${calculateTotalPrice(order.items)}</p>

//               <div className="flex space-x-3 mt-4">
//                 <button
//                   onClick={() => handleAcceptClick(order)}
//                   className="px-3 py-1 bg-blue-600 hover:bg-blue-700 rounded-lg text-white text-[10px] sm:text-xs"
//                 >
//                   <span className="hidden sm:block">Accept</span>
//                   <span className="sm:hidden">✔</span> {/* Icon for mobile */}
//                 </button>
//                 <button
//                   onClick={() => handleDeclineClick(order)}
//                   className="px-3 py-1 bg-gray-600 hover:bg-gray-700 rounded-lg text-white text-xs"
//                 >
//                   <span className="hidden sm:block">Decline</span>
//                   <span className="sm:hidden">❌</span> {/* Icon for mobile */}
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Pending Orders Section */}
//       <div className="w-full sm:w-2/5">
//         <h2 className="text-xl md:text-2xl font-bold text-black mb-4">Pending Orders</h2>
//         <div className="space-y-4">
//           {pendingOrders.map((order) => (
//             <div
//               key={order.id}
//               className="flex flex-col bg-white p-3 rounded-lg shadow-md border border-gray-300"
//             >
//               <h2 className="text-sm font-bold">#Order {order.id}</h2>
//               <p className="text-xs font-semibold">Name: {order.personName}</p>
//               {order.items.map((item, index) => (
//                 <p key={index} className="text-xs text-gray-500">
//                   {item.name}: {item.quantity}
//                 </p>
//               ))}
//               <p className="text-xs font-semibold mt-2">
//                 Total Quantity: {calculateTotalQuantity(order.items)}
//               </p>
//               <p className="text-xs font-semibold">Total Price: ${calculateTotalPrice(order.items)}</p>

//               <div className="flex space-x-3 mt-4">
//                 <button
//                   onClick={() => handleDoneClick(order)}
//                   className="px-3 py-1 bg-green-600 hover:bg-green-700 rounded-lg text-white text-xs"
//                 >
//                   <span className="hidden sm:block">Done</span>
//                   <span className="sm:hidden">✅</span> {/* Icon for mobile */}
//                 </button>
//                 <button
//                   onClick={() => handleResendClick(order)}
//                   className="px-3 py-1 bg-yellow-600 hover:bg-yellow-700 rounded-lg text-white text-xs"
//                 >
//                   <span className="hidden sm:block">Resend</span>
//                   <span className="sm:hidden">🔄</span> {/* Icon for mobile */}
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default RealTimeOrders;

import React, { useState } from 'react';

const RealTimeOrders = () => {
  const [orders, setOrders] = useState([
    {
      id: 1,
      personName: 'Jenil',
      phoneNumber: '+91 98765 43210',
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
      phoneNumber: '+91 98765 43211',
      items: [
        { name: 'Burger', quantity: 1, price: 8.99 },
        { name: 'Fries', quantity: 3, price: 3.49 },
      ],
      status: 'Pending',
      timestamp: Date.now() - 100000,
    },
  ]);
  const [pendingOrders, setPendingOrders] = useState([]);

  const handleAcceptClick = (order) => {
    setOrders(orders.filter((o) => o.id !== order.id));
    setPendingOrders([...pendingOrders, { ...order, status: 'Accepted' }]);
  };

  const handleDeclineClick = (order) => {
    setOrders(orders.filter((o) => o.id !== order.id));
  };

  const handleDoneClick = (order) => {
    setPendingOrders(pendingOrders.filter((o) => o.id !== order.id));
  };

  const handleResendClick = (order) => {
    setPendingOrders(pendingOrders.filter((o) => o.id !== order.id));
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
          <h2 className="text-sm font-bold">#{order.id}</h2>
          <p className="text-xs font-semibold">Name: {order.personName}</p>
          <p className="text-xs text-blue-600 font-medium">{order.phoneNumber}</p>
        </div>
      </div>

      {order.items.map((item, index) => (
        <p key={index} className="text-xs text-gray-500">
          {item.name}: {item.quantity}
        </p>
      ))}
      
      <p className="text-xs font-semibold mt-2">
        Total Quantity: {calculateTotalQuantity(order.items)}
      </p>
      <p className="text-xs font-semibold">
        Total Price: ${calculateTotalPrice(order.items)}
      </p>

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
      {/* Real-Time Orders Section */}
      <div className="w-full sm:w-2/5 mb-6 sm:mb-0">
        <h1 className="text-xl md:text-2xl font-bold text-black mb-4">Real-Time Orders</h1>
        <div className="space-y-4">
          {orders.map((order) => (
            <OrderCard
              key={order.id}
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
                  onClick: handleDeclineClick,
                  className: 'bg-gray-600 hover:bg-gray-700'
                }
              ]}
            />
          ))}
        </div>
      </div>

      {/* Pending Orders Section */}
      <div className="w-full sm:w-2/5">
        <h2 className="text-xl md:text-2xl font-bold text-black mb-4">Pending Orders</h2>
        <div className="space-y-4">
          {pendingOrders.map((order) => (
            <OrderCard
              key={order.id}
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