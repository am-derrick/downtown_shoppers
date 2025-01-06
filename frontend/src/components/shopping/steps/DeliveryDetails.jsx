import React from "react";

export const DeliveryDetails = ({ formData, onInputChange }) => {
    return (
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
}