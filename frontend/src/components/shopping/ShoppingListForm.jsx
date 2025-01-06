// src/components/shopping/ShoppingListForm.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Image as ImageIcon, X } from 'lucide-react';
import { useShoppingListValidation } from '../../hooks/useShoppingListValidation';
import ImagePreview from './ImagePreview';
import SubmissionProgress from './SubmissionProgress';
import { shoppingListAPI } from '../../services/api';

const ShoppingListForm = () => {
    // Initialize state for data with list items
    const [formData, setFormData] = useState({
        customer_email: '',
        customer_phone: '',
        delivery_address: '',
        special_instructions: '',
        items: [
            {
                id: Date.now(),
                name: '',
                description: '',
                quantity: '',
                image: null,
                notes: ''
            }
        ]
    })
    
    // State for managing form submission and errors on form
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submissionStep, setSubmissionStep] = useState(0);
    const [error, setError] = useState(null);

    // State for form step
    const [currentStep, setCurrentStep] = useState(1);

    // Custom validation hook
    const { errors, isValid, validateForm } = useShoppingListValidation(formData.items);

    // Define steps for the submission progress indicator
    const submissionSteps = [
        'Validating your list',
        'Processing images',
        'Submitting list',
        'Finalizing submission'
    ];

    // Add a new item to the shopping list
    const addItem = () => {
        setFormData(prev => ({
            ...prev,
            items: [
                ...prev.items,
                {
                    id: Date.now() + Math.random(),
                    name: '',
                    description: '',
                    quantity: '',
                    image: null,
                    notes: ''
                }
            ]
        }));
    };

    // Remove an item from the list
    const removeItem = (id) => {
        // Only remove if more than one item exists
        if (formData.items.length > 1) {
            setFormData(prev => ({
                ...prev,
                items: prev.items.filter(item => item.id !== id)
            }));
        }
    };

    // Handler for customer details
    const handleCustomerInput = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }))
    }

    // Handle changes to text inputs (name, quantity, description, notes)
    const handleInputChange = (id, field, value) => {
        setFormData(prev => ({
            ...prev,
            items: prev.items.map(item =>
                item.id === id ? { ...item, [field]: value } : item
            )
        }))
    };

    // Handle image upload with validation
    const handleImageUpload = (id, file) => {
        // Validate file type
        if (!file.type.startsWith('image/')) {
            setError('Please upload only image files');
            return;
        }

        // Validate file size (5MB limit)
        if (file.size > 5000000) {
            alert('Image size should be less than 5MB');
            return;
        }

        // Update item with new image
        setFormData(prev => ({
            ...prev,
            items: prev.items.map(item =>
                items.id === id ? { ...item, image: file } : item
            )
        }));
    };

    // Remove image from an item
    const handleRemoveImage = (id) => {
        setFormData(prev => ({
            ...prev,
            items: prev.items.map(item =>
                item.id === id ? { ...item, image: null } : item
            )
        }));
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (!validateForm()) {
            return;
        }
    
        setIsSubmitting(true);
        setError(null);
    
        try {
            // Forma data for the API
            const submitData = {
                ...formData,
                items: formData.items.map(({ id, ...item }) => item) // Remove local IDs
            };

            const response = await shoppingListAPI.createList(submitData);

            // On success, reset form
            setFormData({
                customer_email: '',
                customer_phone: '',
                delivery_address: '',
                special_instructions: '',
                items: [
                    {
                        id: Date.now(),
                        name: '',
                        description: '',
                        quantity: '',
                        image: null,
                        notes: ''
                    }
                ]
            });

            // Navigate to success page later on
            console.log('List submitted:', response);
            
        } catch (error) {
            setError(error.message || 'Failed to submit shopping list');
        } finally {
            setIsSubmitting(false);
            setSubmissionStep(0);
        }
    };

    // Customer details form section
    const renderCustomerDetails = () => (
        <div className="space-y-6">
            <h2 className="text-2xl font-light mb-6">Delivery Details</h2>
            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email Address
                    </label>
                    <input
                        type="email"
                        value={formData.customer_email}
                        onChange={(e) => handleCustomerInput('customer_email', e.target.value)}
                        className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-yellow-400/50"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Phone Number
                    </label>
                    <input
                        type="tel"
                        placeholder="e.g., 0700000000"
                        value={formData.customer_phone}
                        onChange={(e) => handleCustomerInput('customer_phone', e.target.value)}
                        className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-yellow-400/50"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Delivery Address
                    </label>
                    <textarea
                        value={formData.delivery_address}
                        onChange={(e) => handleCustomerInput('delivery_address', e.target.value)}
                        className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-yellow-400/50"
                        required
                        rows="2"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Special Instructions (Optional)
                    </label>
                    <textarea
                        value={formData.special_instructions}
                        onChange={(e) => handleCustomerInput('special_instructions', e.target.value)}
                        className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-yellow-400/50"
                        rows="2"
                        placeholder="Any specific delivery instructions..."
                    />
                </div>
            </div>
        </div>
    );


    return (
        <>
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-white rounded-xl shadow-sm p-6"
            >
                {/* Progress Steps */}
                <div className="mb-8">
                    <div className="flex justify-between items-center">
                        <div className={`flex-1 ${currentStep === 1 ? 'text-black' : 'text-gray-400'}`}>
                            <div className="flex items-center">
                                <span className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
                                    currentStep === 1 ? 'border-yellow-400 bg-yellow-50' : 'border-gray-200'
                                }`}>
                                    1
                                </span>
                                <span className="ml-2">Shopping Items</span>
                            </div>
                        </div>
                        <div className="flex-1 border-t-2 mx-4 border-gray-200" />
                        <div className={`flex-1 ${currentStep === 2 ? 'text-black' : 'text-gray-400'}`}>
                            <div className="flex items-center">
                                <span className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
                                    currentStep === 2 ? 'border-yellow-400 bg-yellow-50' : 'border-gray-200'
                                }`}>
                                    2
                                </span>
                                <span className="ml-2">Delivery Details</span>
                            </div>
                        </div>
                    </div>
                </div>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Step 1: Shopping Items */}
                    {currentStep == 1 && (
                        <>
                            {/* Render list items */}
                            {formData.items.map((item, index) => (
                                <motion.div
                                    key={item.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="p-4 border border-gray-100 rounded-lg"
                                >
                                    {/* Item header with remove button */}
                                    <div className="flex justify-between items-start mb-4">
                                        <span className="text-sm text-gray-500">Item {index + 1}</span>
                                        {item.length > 1 && (
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

                                    {/* Notes textarea */}
                                    <div className="mt-4">
                                        <label className="block text-sm text-gray-600 mb-1">
                                            Notes (Optional)
                                        </label>
                                        <textarea
                                            value={item.notes}
                                            onChange={(e) => handleInputChange(item.id, 'notes', e.target.value)}
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
                                onClick={addItem}
                                className="mt-6 flex items-center space-x-2 text-gray-600 hover:text-gray-900"
                            >
                                <Plus className="w-5 h-5" />
                                <span>Add Another Item</span>
                            </button>
                            {/* Navigation buttons */}
                            <div className="mt-8 flex justify-end">
                                <button
                                    type="button"
                                    onClick={() => setCurrentStep(2)}
                                    disabled={formData.items.some(item => !item.name || !item.quantity)}
                                    className="px-8 py-3 bg-black text-white rounded-full hover:bg-gray-900 disabled:bg-gray-200 disabled:cursor-not-allowed"
                                >
                                    Continue to Delivery Details
                                </button>
                            </div>
                        </>
                    )}

                    {/* Step 2: Customer Details */}
                    {currentStep === 2 && (
                        <>
                            {/* Render customer details section */}
                            {renderCustomerDetails()}
                            {/* Navigation buttons */}
                            <div className="mt-8 flex justify-between">
                                <button
                                    type="button"
                                    onClick={() => setCurrentStep(1)}
                                    className="px-8 py-3 border border-gray-200 rounded-full hover:bg-gray-50"
                                >
                                    Back to Items
                                </button>
                                <button
                                    type="submit"
                                    disabled={!isValid || isSubmitting}
                                    className={`px-8 py-3 rounded-full ${
                                        isValid && !isSubmitting
                                            ? 'bg-gradient-to-r from-yellow-400 to-green-400 text-white hover:shadow-lg'
                                            : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                    }`}
                                >
                                    {isSubmitting ? 'Submitting...' : 'Submit Shopping List'}
                                </button>
                            </div>
                        </>
                    )}
                </form>
            </motion.div>

            {/* Submission progress */}
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