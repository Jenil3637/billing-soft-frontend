// import React, { useState } from 'react';
// import { Plus, Minus, Trash2 } from 'react-feather';

// const Orders = () => {
//   const [cart, setCart] = useState([]);
//   const [customerInfo, setCustomerInfo] = useState({
//     name: '',
//     phone: '',
//     table: '',
//   });

//   const menuItems = [
//     { id: 1, name: 'Chicken Biryani', price: 12.99, category: 'Main Course' },
//     { id: 2, name: 'Butter Naan', price: 2.99, category: 'Breads' },
//     { id: 3, name: 'Paneer Tikka', price: 10.99, category: 'Starters' },
//     { id: 4, name: 'Mango Lassi', price: 3.99, category: 'Beverages' },
//   ];

//   const addToCart = (item) => {
//     const existingItem = cart.find((i) => i.id === item.id);
//     if (existingItem) {
//       setCart(
//         cart.map((i) =>
//           i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
//         )
//       );
//     } else {
//       setCart([...cart, { ...item, quantity: 1 }]);
//     }
//   };

//   const updateQuantity = (itemId, delta) => {
//     setCart(
//       cart
//         .map((item) =>
//           item.id === itemId
//             ? { ...item, quantity: Math.max(0, item.quantity + delta) }
//             : item
//         )
//         .filter((item) => item.quantity > 0)
//     );
//   };

//   const total = cart.reduce(
//     (sum, item) => sum + item.price * item.quantity,
//     0
//   );

//   return (
//     <div className="flex h-full">
//       <div className="flex-1 p-8 bg-gray-50 overflow-auto">
//         <h1 className="text-2xl font-bold text-gray-800 mb-6">New Order</h1>
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
//           {menuItems.map((item) => (
//             <button
//               key={item.id}
//               onClick={() => addToCart(item)}
//               className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow"
//             >
//               <h3 className="font-medium text-gray-800">{item.name}</h3>
//               <p className="text-sm text-gray-500">{item.category}</p>
//               <p className="text-lg font-semibold text-orange-600 mt-2">
//                 ${item.price.toFixed(2)}
//               </p>
//             </button>
//           ))}
//         </div>
//       </div>

//       <div className="w-96 bg-white border-l border-gray-200 p-6">
//         <h2 className="text-lg font-semibold mb-4">Order Details</h2>
//         <div className="space-y-4 mb-6">
//           <input
//             type="text"
//             placeholder="Customer Name"
//             value={customerInfo.name}
//             onChange={(e) =>
//               setCustomerInfo({ ...customerInfo, name: e.target.value })
//             }
//             className="w-full p-2 border rounded-lg"
//           />
//           <input
//             type="tel"
//             placeholder="Phone Number"
//             value={customerInfo.phone}
//             onChange={(e) =>
//               setCustomerInfo({ ...customerInfo, phone: e.target.value })
//             }
//             className="w-full p-2 border rounded-lg"
//           />
//           <input
//             type="text"
//             placeholder="Table Number"
//             value={customerInfo.table}
//             onChange={(e) =>
//               setCustomerInfo({ ...customerInfo, table: e.target.value })
//             }
//             className="w-full p-2 border rounded-lg"
//           />
//         </div>

//         <div className="divide-y">
//           {cart.map((item) => (
//             <div key={item.id} className="py-3 flex justify-between items-center">
//               <div>
//                 <p className="font-medium">{item.name}</p>
//                 <p className="text-sm text-gray-500">
//                   ${item.price.toFixed(2)} × {item.quantity}
//                 </p>
//               </div>
//               <div className="flex items-center space-x-2">
//                 <button
//                   onClick={() => updateQuantity(item.id, -1)}
//                   className="p-1 rounded-full hover:bg-gray-100"
//                 >
//                   <Minus size={16} />
//                 </button>
//                 <span className="w-8 text-center">{item.quantity}</span>
//                 <button
//                   onClick={() => updateQuantity(item.id, 1)}
//                   className="p-1 rounded-full hover:bg-gray-100"
//                 >
//                   <Plus size={16} />
//                 </button>
//                 <button
//                   onClick={() => updateQuantity(item.id, -item.quantity)}
//                   className="p-1 rounded-full hover:bg-gray-100 text-red-500"
//                 >
//                   <Trash2 size={16} />
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>

//         <div className="mt-6 pt-6 border-t">
//           <div className="flex justify-between mb-4">
//             <span className="font-medium">Total</span>
//             <span className="text-xl font-bold">${total.toFixed(2)}</span>
//           </div>
//           <button
//             className="w-full py-3 bg-orange-600 text-white rounded-lg font-medium hover:bg-orange-700"
//             onClick={() => {
//               // Handle order submission
//               console.log('Order placed:', customerInfo, cart);
//             }}
//           >
//             Place Order
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Orders;
import React, { useState } from 'react';
import { Plus, Minus, Trash2 } from 'react-feather';

const Orders = () => {
  const [cart, setCart] = useState([]);
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    phone: '',
    table: '',
  });

  const menuItems = [
    { id: 1, name: 'Chicken Biryani', price: 12.99, category: 'Main Course' },
    { id: 2, name: 'Butter Naan', price: 2.99, category: 'Breads' },
    { id: 3, name: 'Paneer Tikka', price: 10.99, category: 'Starters' },
    { id: 4, name: 'Mango Lassi', price: 3.99, category: 'Beverages' },
  ];

  const addToCart = (item) => {
    const existingItem = cart.find((i) => i.id === item.id);
    if (existingItem) {
      setCart(
        cart.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        )
      );
    } else {
      setCart([...cart, { ...item, quantity: 1 }]);
    }
  };

  const updateQuantity = (itemId, delta) => {
    setCart(
      cart
        .map((item) =>
          item.id === itemId
            ? { ...item, quantity: Math.max(0, item.quantity + delta) }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="flex flex-col md:flex-row h-full">
      <div className="flex-1 p-8 bg-blue-50 overflow-auto">
        <h1 className="text-2xl font-bold text-blue-900 mb-6">New Order</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => addToCart(item)}
              className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <h3 className="font-medium text-blue-900">{item.name}</h3>
              <p className="text-sm text-gray-500">{item.category}</p>
              <p className="text-lg font-semibold text-blue-600 mt-2">
                ${item.price.toFixed(2)}
              </p>
            </button>
          ))}
        </div>
      </div>

      <div className="w-full md:w-96 bg-white border-t md:border-l border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-blue-900 mb-4">Order Details</h2>
        <div className="space-y-4 mb-6">
          <input
            type="text"
            placeholder="Customer Name"
            value={customerInfo.name}
            onChange={(e) =>
              setCustomerInfo({ ...customerInfo, name: e.target.value })
            }
            className="w-full p-2 border rounded-lg"
          />
          <input
            type="tel"
            placeholder="Phone Number"
            value={customerInfo.phone}
            onChange={(e) =>
              setCustomerInfo({ ...customerInfo, phone: e.target.value })
            }
            className="w-full p-2 border rounded-lg"
          />
          <input
            type="text"
            placeholder="Table Number"
            value={customerInfo.table}
            onChange={(e) =>
              setCustomerInfo({ ...customerInfo, table: e.target.value })
            }
            className="w-full p-2 border rounded-lg"
          />
        </div>

        <div className="divide-y">
          {cart.map((item) => (
            <div key={item.id} className="py-3 flex justify-between items-center">
              <div>
                <p className="font-medium text-indigo-600">{item.name}</p>
                <p className="text-sm text-gray-500">
                  ${item.price.toFixed(2)} × {item.quantity}
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => updateQuantity(item.id, -1)}
                  className="p-1 rounded-full hover:bg-blue-100"
                >
                  <Minus size={16} />
                </button>
                <span className="w-8 text-center">{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.id, 1)}
                  className="p-1 rounded-full hover:bg-blue-100"
                >
                  <Plus size={16} />
                </button>
                <button
                  onClick={() => updateQuantity(item.id, -item.quantity)}
                  className="p-1 rounded-full hover:bg-blue-100 text-red-500"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 pt-6 border-t">
          <div className="flex justify-between mb-4">
            <span className="font-medium text-indigo-600">Total</span>
            <span className="text-xl font-bold text-indigo-600">
              ${total.toFixed(2)}
            </span>
          </div>
          <button
            className="w-full py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-blue-700"
            onClick={() => {
              // Handle order submission
              console.log('Order placed:', customerInfo, cart);
            }}
          >
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default Orders;
