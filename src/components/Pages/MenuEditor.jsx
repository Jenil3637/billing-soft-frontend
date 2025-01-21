
import React, { useState, useEffect } from "react";
import { Plus, Edit2, Trash2 } from "lucide-react";
import axios from 'axios';

const MenuEditor = () => {
  const [items, setItems] = useState([]);
  const [editItem, setEditItem] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [image, setImage] = useState(null);

  const categories = ["favorites", "Drinks", "Lunch", "Combo", "Sweet"];

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/v1/customer/menuItems');
        setItems(response.data); // Assuming the response contains the array of items
      } catch (error) {
        console.error("Error fetching menu items:", error);
      }
    };

    fetchMenuItems();
  }, []);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
  
    // Append the image file if selected
    if (image) {
      formData.append("image", image);
    }
  
    formData.append("name", e.target.name.value);
    formData.append("category", e.target.category.value);
    formData.append("price", parseFloat(e.target.price.value));
  
    try {
      const newItem = {
        id: editItem ? editItem.id : Date.now(),
        name: e.target.name.value,
        category: e.target.category.value,
        price: parseFloat(e.target.price.value),
        imageUrl: formData.get("imageUrl"), // Ensure the image URL is correctly handled by the server
      };
  
      const response = await axios.post('http://localhost:5000/api/v1/customer/menu', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      });
  
      const savedItem = response.data;
      if (editItem) {
        setItems(items.map((item) => (item.id === editItem.id ? savedItem : item)));
      } else {
        setItems([...items, savedItem]);
      }
  
      setEditItem(null);
      setShowForm(false);
    } catch (error) {
      console.error("Error saving item:", error.response || error.message);
      alert('Failed to save item! Please check the data.');
    }
  };
  
  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:5000/api/v1/customer/menu/delete/${id}`);
      // Filter out the deleted item from the list
      setItems(items.filter((item) => item.id !== id));
      console.log('Item deleted successfully:', response.data);
    } catch (error) {
      console.error('Error deleting item:', error);
      alert('Failed to delete item!');
    }
  };
  

  return (
    <div className="p-6 sm:p-8 bg-gray-50 overflow-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Menu Editor</h1>
        <button
          onClick={() => {
            setEditItem(null);
            setShowForm(true);
          }}
          className="flex items-center space-x-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-blue-700"
        >
          <Plus size={20} />
          <span>Add Item</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item) => (
          <div key={item._id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <img
              src={item.imageUrl} // Corrected image field to match the model
              alt={item.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium text-gray-800">{item.name}</h3>
                  <p className="text-sm text-gray-500">{item.category}</p>
                  <p className="text-lg font-semibold text-indigo-600 mt-1">
                    ${item.price.toFixed(2)}
                  </p>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => {
                      setEditItem(item);
                      setShowForm(true);
                    }}
                    className="p-2 text-gray-600 hover:bg-gray-100 rounded-full"
                  >
                    <Edit2 size={16} />
                  </button>
                  <button
                    onClick={() => handleDelete(item._id)} // Call handleDelete when deleting
                    className="p-2 text-red-600 hover:bg-red-50 rounded-full"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">
              {editItem ? "Edit Item" : "Add New Item"}
            </h2>
            <form onSubmit={handleFormSubmit} className="space-y-4" encType="multipart/form-data">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  defaultValue={editItem?.name || ""}
                  className="w-full p-2 border rounded-lg"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <select
                  name="category"
                  defaultValue={editItem?.category || categories[0]}
                  className="w-full p-2 border rounded-lg"
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Price
                </label>
                <input
                  type="number"
                  step="0.01"
                  name="price"
                  defaultValue={editItem?.price || ""}
                  className="w-full p-2 border rounded-lg"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Image Upload
                </label>
                <input
                  type="file"
                  name="image"
                  onChange={handleImageChange}
                  className="w-full p-2 border rounded-lg"
                />
              </div>
              <div className="flex space-x-4 pt-4">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="flex-1 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  {editItem ? "Save Changes" : "Add Item"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MenuEditor;
