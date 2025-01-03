import React, { useState } from "react";
import { motion } from 'framer-motion';
import { Plus, Image as ImageIcon, X } from 'lucide-react';

const ShoppingListForm = () => {
    const [items, setItems] = useState([
        { id: 1, name: '', description: '', quantity: '', image: null }
    ]);

    // Add items to the list
    const addItem = () => {
        setItems([
            ...items,
            {
                id: items.length + 1,
                name: '',
                description: '',
                quantity: '',
                image: null
            }
        ]);
    };

    // Remove an item from the list
    const removeItem = (id) => {
        setItems(items.filter(item => item.id != id));
    };

    // Handle file upload for an item
    const handleImageUpload = (id, file) => {
        setItems(items.map(item =>
            item.id === id ? { ...item, image: file } : item
        ));
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white rounded-xl shadow-sm p-6"
        >
            <form onSubmit={(e) => e.preventDefault()}>
                {/* List Items */}
                <div className="space-y-6">
                    {items.map((item, index) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="p-4 border border-gray-100 rounded-lg"
                        >
                            <div className="flex justify-between items-start mb-4">
                                <span className="text-sm text-gray-500">Item {index + 1}</span>
                                {items.length > 1 && (
                                    <button
                                        onClick={() => removeItem(item.id)}
                                        className="text-gray-400 hover:text-red-500 transition-colors"
                                    >
                                        <X className="w-5 h-5" />
                                    </button>
                                )}
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm text-gray-600 mb-1">
                                        Item Name
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="e.g., Milk, Bread, etc."
                                        className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-yellow-400/50"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm text-gray-600 mb-1">
                                        Quantity
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="e.g., 2 liters, 1 loaf"
                                        className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-yellow-400/50"
                                    />
                                </div>
                            </div>

                            <div className="mt-4">
                                <label className="block text-sm text-gray-600 mb-1">
                                    Additional Details
                                </label>
                                <textarea
                                    placeholder="Any specific brands, preferences, or instructions..."
                                    rows="2"
                                    className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-yellow-400/50"
                                />
                            </div>

                            {/* Image Upload */}
                            <div className="mt-4">
                                <label className="block text-sm text-gray-600 mb-1">
                                    Add Image (Optional)
                                </label>
                                <div className="flex items-center space-x-4">
                                    <label className="cursor-pointer">
                                        <input
                                            type="file"
                                            accept="image/*"
                                            className="hidden"
                                            onChange={(e) => handleImageUpload(item.id, e.target.files[0])}
                                        />
                                        <div className="flex items-center space-x-2 px-4 py-2 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50">
                                            <ImageIcon className="w-5 h-5" />
                                            <span className="text-sm">Upload Image</span>
                                        </div>
                                    </label>
                                    {item.image && (
                                        <span className="text-sm text-green-500">
                                            Image uploaded
                                        </span>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Add Item Button */}
                <button
                    onClick={addItem}
                    className="mt-6 flex items-center space-x-2 text-gray-600 hover:text-gray-900"
                >
                    <Plus className="w-5 h-5" />
                    <span>Add Another Item</span>
                </button>

                {/* Submit Button */}
                <div className="mt-8">
                    <button className="w-full bg-gradient-to-r from-yellow-400 to-green-400 text-white py-3 rounded-lg hover:shadow-lg transition-shadow">
                        Submit Shopping List
                    </button>
                </div> 
            </form>
        </motion.div>
    )
};

export default ShoppingListForm;