// src/components/shopping/ShoppingListForm.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useShoppingListValidation } from '../../hooks/useShoppingListValidation';
import SubmissionProgress from './SubmissionProgress';
import { shoppingListAPI } from '../../services/api';
import { ShoppingItems } from './steps/ShoppingItems';
import { DeliveryDetails } from './steps/DeliveryDetails';
import { ReviewOrder } from './steps/ReviewOrder';
import { ProgressSteps } from './steps/ProgressSteps';

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
    const steps = [
        { number: 1, title: 'Shopping Items' },
        { number: 2, title: 'Delivery Details' },
        { number: 3, title: 'Review' }
    ];

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

    // Navigation buttons
    const renderNavigationButtons = () => {
        switch (currentStep) {
            case 1:
                return (
                    <div className="mt-8 flex justify-end">
                        <button
                            type="button"
                            onClick={() => setCurrentStep(2)}
                            disabled={formData.items.some(item => !item.name || !item.quantity)}
                            className="px-6 py-2 bg-black text-white rounded-full hover:bg-gray-900 disabled:bg-gray-200 disabled:cursor-not-allowed text-sm"
                        >
                            Continue to Delivery Details
                        </button>
                    </div>
                );
            case 2:
                return (
                    <div className="mt-8 flex justify-between">
                        <button
                            type="button"
                            onClick={() => setCurrentStep(1)}
                            className="px-6 py-2 border border-gray-200 rounded-full hover:bg-gray-50 text-sm"
                        >
                            Back to Items
                        </button>
                        <button
                            type="button"
                            onClick={() => setCurrentStep(3)}
                            className="px-6 py-2 bg-black text-white rounded-full hover:bg-gray-900 text-sm"
                        >
                            Review Order
                        </button>
                    </div>
                );
            case 3:
                return (
                    <div className="mt-8 flex justify-between">
                        <button
                            type="button"
                            onClick={() => setCurrentStep(2)}
                            className="px-6 py-2 border border-gray-200 rounded-full hover:bg-gray-50 text-sm"
                        >
                            Back to Details
                        </button>
                        <button
                            type="submit"
                            disabled={!isValid || isSubmitting}
                            className={`px-6 py-2 rounded-full text-sm ${
                                isValid && !isSubmitting
                                    ? 'bg-gradient-to-r from-yellow-400 to-green-400 text-white hover:shadow-lg'
                                    : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                            }`}
                        >
                            {isSubmitting ? 'Submitting...' : 'Submit Shopping List'}
                        </button>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <>
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-white rounded-xl shadow-sm p-6"
            >
                {error && (
                    <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-lg">
                        {error}
                    </div>
                )}

                <ProgressSteps steps={steps} currentStep={currentStep} />
                
                <form onSubmit={handleSubmit} className="space-y-6">
                    {currentStep === 1 && (
                        <ShoppingItems 
                            items={formData.items}
                            onAddItem={addItem}
                            onRemoveItem={removeItem}
                            onInputChange={handleInputChange}
                            onImageUpload={handleImageUpload}
                            onImageRemove={handleRemoveImage}
                            errors={errors}
                        />
                    )}
                    
                    {currentStep === 2 && (
                        <DeliveryDetails 
                            formData={formData}
                            onInputChange={handleCustomerInput}
                        />
                    )}
                    
                    {currentStep === 3 && (
                        <ReviewOrder formData={formData} />
                    )}

                    {renderNavigationButtons()}
                </form>
            </motion.div>

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