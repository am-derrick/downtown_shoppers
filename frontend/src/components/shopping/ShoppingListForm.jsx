// src/components/shopping/ShoppingListForm.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Image as ImageIcon, X } from 'lucide-react';
import { useShoppingListValidation } from '../../hooks/useShoppingListValidation';
import ImagePreview from './ImagePreview';
import SubmissionProgress from './SubmissionProgress';

const ShoppingListForm = () => {
    // Initialize state for list items
    const [items, setItems] = useState([
        { id: 1, name: '', description: '', quantity: '', image: null }
    ]);
    
    // State for managing form submission
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submissionStep, setSubmissionStep] = useState(0);

    // Use our custom validation hook
    const { errors, isValid, validateForm } = useShoppingListValidation(items);

    // Define steps for the submission progress indicator
    const submissionSteps = [
        'Validating your list',
        'Processing images',
        'Submitting list',
        'Finalizing submission'
    ];

    // Add a new item to the shopping list
    const addItem = () => {
        setItems(prevItems => [
            ...prevItems,
            {
                // Generate a unique ID based on timestamp and random number for safety
                id: Date.now() + Math.random(),
                name: '',
                description: '',
                quantity: '',
                image: null
            }
        ]);
    };

    // Remove an item from the list
    const removeItem = (id) => {
        // Only allow removal if more than one item exists
        if (items.length > 1) {
            setItems(prevItems => prevItems.filter(item => item.id !== id));
        }
    };

    // Handle changes to text inputs (name, quantity, description)
    const handleInputChange = (id, field, value) => {
        setItems(prevItems => prevItems.map(item =>
            item.id === id ? { ...item, [field]: value } : item
        ));
    };

    // Handle image upload with validation
    const handleImageUpload = (id, file) => {
        // Validate file type
        if (!file.type.startsWith('image/')) {
            alert('Please upload only image files');
            return;
        }

        // Validate file size (5MB limit)
        if (file.size > 5000000) {
            alert('Image size should be less than 5MB');
            return;
        }

        // Update item with new image
        setItems(prevItems => prevItems.map(item =>
            item.id === id ? { ...item, image: file } : item
        ));
    };

    // Remove image from an item
    const handleRemoveImage = (id) => {
        setItems(prevItems => prevItems.map(item =>
            item.id === id ? { ...item, image: null } : item
        ));
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (!validateForm()) {
            return;
        }
    
        setIsSubmitting(true);
    
        try {
            // Simulate API call to submit shopping list
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            // In a real application, you would get the listId from the API response
            const listId = '123'; // Example ID
            
            // Navigate to quote review
            navigate(`/quote/${listId}`);
            
        } catch (error) {
            console.error('Submission error:', error);
            alert('An error occurred while submitting your list. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-white rounded-xl shadow-sm p-6"
            >
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Render list items */}
                    {items.map((item, index) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="p-4 border border-gray-100 rounded-lg"
                        >
                            {/* Item header with remove button */}
                            <div className="flex justify-between items-start mb-4">
                                <span className="text-sm text-gray-500">Item {index + 1}</span>
                                {items.length > 1 && (
                                    <button
                                        type="button"
                                        onClick={() => removeItem(item.id)}
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
                                        onChange={(e) => handleInputChange(item.id, 'name', e.target.value)}
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
                                        onChange={(e) => handleInputChange(item.id, 'quantity', e.target.value)}
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

                            {/* Description textarea */}
                            <div className="mt-4">
                                <label className="block text-sm text-gray-600 mb-1">
                                    Additional Details
                                </label>
                                <textarea
                                    value={item.description}
                                    onChange={(e) => handleInputChange(item.id, 'description', e.target.value)}
                                    rows="2"
                                    className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-yellow-400/50"
                                    placeholder="Any specific brands, preferences, or instructions..."
                                />
                            </div>

                            {/* Image upload section */}
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
                                        <ImagePreview
                                            file={item.image}
                                            onRemove={() => handleRemoveImage(item.id)}
                                        />
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    ))}

                    {/* Add item button */}
                    <button
                        type="button"
                        onClick={addItem}
                        className="mt-6 flex items-center space-x-2 text-gray-600 hover:text-gray-900"
                    >
                        <Plus className="w-5 h-5" />
                        <span>Add Another Item</span>
                    </button>

                    {/* Submit button */}
                    <div className="mt-8">
                        <button
                            type="submit"
                            disabled={!isValid || isSubmitting}
                            className={`w-full py-3 rounded-lg transition-all ${
                                isValid && !isSubmitting
                                    ? 'bg-gradient-to-r from-yellow-400 to-green-400 text-white hover:shadow-lg'
                                    : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                            }`}
                        >
                            {isSubmitting ? 'Submitting...' : 'Submit Shopping List'}
                        </button>
                    </div>
                </form>
            </motion.div>

            {/* Submission progress modal */}
            {isSubmitting && (
                <SubmissionProgress
                    status={submissionStep}
                    steps={submissionSteps}
                />
            )}
        </>
    );
};

export default ShoppingListForm;