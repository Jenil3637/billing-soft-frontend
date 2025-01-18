import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './components/Siderbar'; // Import Sidebar component
import Dashboard from '../src/components/Pages/Dashboard'; // Import Dashboard page
import Customers from '../src/components/Pages/Customers'; // Import Customers page
import MenuEditor from '../src/components/Pages/MenuEditor'; // Import MenuEditor page
import OrderHistory from '../src/components/Pages/OrderHistory'; // Import OrderHistory page
import Orders from '../src/components/Pages/Orders'; // Import Orders page

function App() {
  return (
    <Router>
      <div className="flex">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content Area */}
        <div className="flex-1 p-6">
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} /> 
            <Route path="/customers" element={<Customers />} />
            <Route path="/menu-editor" element={<MenuEditor />} />
            <Route path="/order-history" element={<OrderHistory />} />
            <Route path="/orders" element={<Orders />} />
            {/* Add a default route for home page or a fallback */}
            <Route path="/" element={<Dashboard />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
