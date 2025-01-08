import React from 'react';

export const ReviewOrder = ({ formData }) => {
    if (!formData.items.length) {
        return <div>No items to review</div>;
    }

    return (
        <div className="space-y-8">
            <h2 className="text-2xl font-light mb-6">Review Your Order</h2>
            
            {/* Items Summary */}
            <div className="space-y-4">
                <h3 className="text-lg font-medium">Shopping Items</h3>
                {formData.items.map((item, index) => (
                    <div key={index} className="bg-gray-50 p-4 rounded-lg">
                        <div className="flex justify-between">
                            <div>
                                <p className="font-medium">{item.name}</p>
                                <p className="text-sm text-gray-600">{item.quantity}</p>
                                {item.description && (
                                    <p className="text-sm text-gray-500 mt-1">{item.description}</p>
                                )}
                            </div>
                            {item.image && (
                                <div className="w-16 h-16">
                                    <img 
                                        src={URL.createObjectURL(item.image)} 
                                        alt={item.name}
                                        className="w-full h-full object-cover rounded-lg"
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {/* Delivery Details Summary */}
            <div className="space-y-4">
                <h3 className="text-lg font-medium">Delivery Details</h3>
                <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                    <p><span className="font-medium">Email:</span> {formData.customer_email}</p>
                    <p><span className="font-medium">Phone:</span> {formData.customer_phone}</p>
                    <p><span className="font-medium">Address:</span> {formData.delivery_address}</p>
                    {formData.special_instructions && (
                        <p><span className="font-medium">Special Instructions:</span> {formData.special_instructions}</p>
                    )}
                </div>
            </div>

            {/* Next Steps Information */}
            <div className="bg-yellow-50 p-4 rounded-lg">
                <h3 className="text-lg font-medium mb-2">What happens next?</h3>
                <ol className="list-decimal list-inside space-y-2 text-sm">
                    <li>Our team will review your shopping list</li>
                    <li>We'll prepare a detailed quote for all items</li>
                    <li>You'll receive the quote via email within 2 hours</li>
                    <li>Once you approve the quote, we'll process your order</li>
                </ol>
            </div>
        </div>
    );
};