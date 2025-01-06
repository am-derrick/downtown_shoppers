import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useShoppingListValidation } from '../../hooks/useShoppingListValidation';
import { shoppingListAPI } from '../../services/api';
import { ShoppingItems } from './steps/ShoppingItems';
import { DeliveryDetails } from './steps/DeliveryDetails';
import { ReviewOrder } from './steps/ReviewOrder';
import { ProgressSteps } from './steps/ProgressSteps';
import SubmissionProgress from './SubmissionProgress';
import { isValidUgandanPhone } from '../../utils/validation';

const ShoppingListForm = () => {
    // Form data state
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
    });
    
    // UI state
    const [currentStep, setCurrentStep] = useState(1);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submissionStep, setSubmissionStep] = useState(0);
    const [error, setError] = useState(null);

    // Validation
    const { errors, isValid, validateForm } = useShoppingListValidation(formData.items);

    // Progress steps configuration
    const steps = [
        { number: 1, title: 'Shopping Items' },
        { number: 2, title: 'Delivery Details' },
        { number: 3, title: 'Review' }
    ];

    const submissionSteps = [
        'Validating your list',
        'Processing images',
        'Submitting list',
        'Finalizing submission'
    ];

    // Item handlers
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

    const removeItem = (id) => {
        if (formData.items.length > 1) {
            setFormData(prev => ({
                ...prev,
                items: prev.items.filter(item => item.id !== id)
            }));
        }
    };

    // Input handlers
    const handleCustomerInput = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleInputChange = (id, field, value) => {
        setFormData(prev => ({
            ...prev,
            items: prev.items.map(item =>
                item.id === id ? { ...item, [field]: value } : item
            )
        }));
    };

    // Image handlers
    const handleImageUpload = (id, file) => {
        const MAX_SIZE = 5 * 1024 * 1024; // 5MB in bytes
    
        if (!file.type.startsWith('image/')) {
            setError('Please upload only image files (JPEG, PNG, etc.)');
            return;
        }

        if (file.size > MAX_SIZE) {
            setError('Image size should be less than 5MB');
            return;
        }

        // Add file type validation
        const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
        if (!allowedTypes.includes(file.type)) {
            setError('Please upload only JPEG, PNG, or GIF images');
            return;
        }

        setFormData(prev => ({
            ...prev,
            items: prev.items.map(item =>
                item.id === id ? { ...item, image: file } : item
            )
        }));

        // Clear any existing error
        setError(null);
    };

    const handleRemoveImage = (id) => {
        setFormData(prev => ({
            ...prev,
            items: prev.items.map(item =>
                item.id === id ? { ...item, image: null } : item
            )
        }));
    };

    // Form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (currentStep !== 3) {
            return
        };

        // Validate phone number format
        if (!isValidUgandanPhone(formData.customer_phone)) {
            setError('Please enter a valid Ugandan phone number (e.g., +256700000000 or 0700000000)');
            return;
        }
        
        // Validation before submission
        const invalidItems = formData.items.filter(item => 
            !item.name?.trim() || !item.quantity?.trim()
        );
    
        if (invalidItems.length > 0) {
            setError(`Please provide both name and quantity for all items. Check item(s) ${
                invalidItems.map((_, idx) => idx + 1).join(', ')
            }`);
            return;
        }
        
        setIsSubmitting(true);
        setError(null);
        
        try {
            console.log('Current form data:', formData);

            // Format items array to match API requirements
            const submitData = {
                customer_email: formData.customer_email.trim(),
                customer_phone: formData.customer_phone.trim(),
                delivery_address: formData.delivery_address.trim(),
                special_instructions: formData.special_instructions?.trim() || '',
                items: formData.items.map(item => ({
                    name: item.name.trim(),
                    quantity: item.quantity.trim(),
                    description: item.description?.trim() || '',
                    notes: item.notes?.trim() || '',
                    image: item.image
                }))
            };

            console.log('Submitting cleaned data:', submitData);

            const response = await shoppingListAPI.createList(submitData);
            console.log('Submission successful', response);
            
            // Reset form
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
            
        } catch (error) {
            let errorMessage = 'Failed to submit shopping list';
        
            if (error.response?.data) {
                // Format error messages from the server
                errorMessage = Object.entries(error.response.data)
                    .map(([field, errors]) => `${field}: ${errors.join(', ')}`)
                    .join('\n');
            }   
            
            setError(errorMessage);
            console.error('Submission error:', error);
        } finally {
            setIsSubmitting(false);
            setSubmissionStep(0);
        }
    };

    // Validate delivery details
    const validateDeliveryDetails = () => {
        const requireFields = ['customer_email', 'customer_phone', 'delivery_address'];
        return requireFields.every(field => formData[field].trim() != '');
    }

    const handleNavigation = (e, step) => {
        e.preventDefault();
        e.stopPropagation();

        if (currentStep === 2 && step === 3) {
            if (!validateDeliveryDetails()) {
                setError('Please fill in all the required delivery details');
                return;
            }
        }

        setCurrentStep(step);
    }

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
                            onClick={(e) => handleNavigation(e, 1)}
                            className="px-6 py-2 border border-gray-200 rounded-full hover:bg-gray-50 text-sm"
                        >
                            Back to Items
                        </button>
                        <button
                            type="button"
                            onClick={(e) => handleNavigation(e, 3)}
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