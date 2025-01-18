import React, { useState } from "react";
import { Plus, Edit2, Trash2 } from "lucide-react";

const MenuEditor = () => {
  const [items, setItems] = useState([
    {
      id: 1,
      name: "Chicken Biryani",
      price: 12.99,
      category: "Main Course",
      image:
        "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=500",
    },
    {
      id: 2,
      name: "Butter Naan",
      price: 2.99,
      category: "Breads",
      image:
        "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=500",
    },
    {
      id: 3,
      name: "Paneer Tikka",
      price: 10.99,
      category: "Starters",
      image:
        "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=500",
    },
  ]);

  const [editItem, setEditItem] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const categories = ["Starters", "Main Course", "Breads", "Desserts", "Beverages"];

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newItem = {
      id: editItem ? editItem.id : Date.now(),
      name: formData.get("name"),
      category: formData.get("category"),
      price: parseFloat(formData.get("price")),
      image: formData.get("image"),
    };

    if (editItem) {
      setItems(items.map((item) => (item.id === editItem.id ? newItem : item)));
    } else {
      setItems([...items, newItem]);
    }

    setEditItem(null);
    setShowForm(false);
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
          <div key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <img
              src={item.image}
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
                    onClick={() =>
                      setItems(items.filter((i) => i.id !== item.id))
                    }
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
            <form onSubmit={handleFormSubmit} className="space-y-4">
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
                  Image URL
                </label>
                <input
                  type="url"
                  name="image"
                  defaultValue={editItem?.image || ""}
                  className="w-full p-2 border rounded-lg"
                  required
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
