import React from 'react';
import { motion } from 'framer-motion';
import { Plus, Image as ImageIcon, X } from 'lucide-react';
import ImagePreview from '../ImagePreview';

export const ShoppingItems = ({ 
    items, 
    onAddItem, 
    onRemoveItem, 
    onInputChange, 
    onImageUpload, 
    onImageRemove, 
    errors 
}) => {
    return (
        <>
            {items.map((item, index) => (
                <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 border border-gray-100 rounded-lg"
                >
                    {/* Item header */}
                    <div className="flex justify-between items-start mb-4">
                        <span className="text-sm text-gray-500">Item {index + 1}</span>
                        {items.length > 1 && (
                            <button
                                type="button"
                                onClick={() => onRemoveItem(item.id)}
                                className="text-gray-400 hover:text-red-500 transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        )}
                    </div>

                    {/* Name and quantity inputs */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm text-gray-600 mb-1">
                                Item Name*
                            </label>
                            <input
                                type="text"
                                value={item.name}
                                onChange={(e) => onInputChange(item.id, 'name', e.target.value)}
                                className={`w-full px-4 py-2 rounded-lg border ${
                                    errors[index]?.name ? 'border-red-300' : 'border-gray-200'
                                } focus:outline-none focus:ring-2 focus:ring-yellow-400/50`}
                                placeholder="e.g., Milk, Bread, etc."
                            />
                            {errors[index]?.name && (
                                <p className="mt-1 text-sm text-red-500">{errors[index].name}</p>
                            )}
                        </div>
                        <div>
                            <label className="block text-sm text-gray-600 mb-1">
                                Quantity*
                            </label>
                            <input
                                type="text"
                                value={item.quantity}
                                onChange={(e) => onInputChange(item.id, 'quantity', e.target.value)}
                                className={`w-full px-4 py-2 rounded-lg border ${
                                    errors[index]?.quantity ? 'border-red-300' : 'border-gray-200'
                                } focus:outline-none focus:ring-2 focus:ring-yellow-400/50`}
                                placeholder="e.g., 2 liters, 1 loaf"
                            />
                            {errors[index]?.quantity && (
                                <p className="mt-1 text-sm text-red-500">{errors[index].quantity}</p>
                            )}
                        </div>
                    </div>

                    {/* Description */}
                    <div className="mt-4">
                        <label className="block text-sm text-gray-600 mb-1">
                            Additional Details
                        </label>
                        <textarea
                            value={item.description}
                            onChange={(e) => onInputChange(item.id, 'description', e.target.value)}
                            rows="2"
                            className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-yellow-400/50"
                            placeholder="Any specific brands, preferences, or instructions..."
                        />
                    </div>

                    {/* Image upload */}
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
                                    onChange={(e) => onImageUpload(item.id, e.target.files[0])}
                                />
                                <div className="flex items-center space-x-2 px-4 py-2 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50">
                                    <ImageIcon className="w-5 h-5" />
                                    <span className="text-sm">Upload Image</span>
                                </div>
                            </label>
                            {item.image && (
                                <ImagePreview
                                    file={item.image}
                                    onRemove={() => onImageRemove(item.id)}
                                />
                            )}
                        </div>
                    </div>

                    {/* Notes */}
                    <div className="mt-4">
                        <label className="block text-sm text-gray-600 mb-1">
                            Notes (Optional)
                        </label>
                        <textarea
                            value={item.notes}
                            onChange={(e) => onInputChange(item.id, 'notes', e.target.value)}
                            rows="2"
                            className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-yellow-400/50"
                            placeholder="Any additional notes about this item..."
                        />
                    </div>
                </motion.div>
            ))}

            {/* Add item button */}
            <button
                type="button"
                onClick={onAddItem}
                className="mt-6 flex items-center space-x-2 text-gray-600 hover:text-gray-900"
            >
                <Plus className="w-5 h-5" />
                <span>Add Another Item</span>
            </button>
        </>
    );
};