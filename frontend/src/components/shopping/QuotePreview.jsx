import React from 'react';
import { motion } from 'framer-motion';
import { Check, AlertCircle } from 'lucide-react';

const QuotePreview = ({
    items,
    estimatedTotal,
    deliveryFee,
    serviceFee,
    onAccept,
    onDecline,
    loading,
}) => {
    // Calculate totals including all fees
    const calculateTotal = () => {
        return estimatedTotal + deliveryFee + serviceFee;
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white rounded-xl shadow-sm p-6"
        >
            <h2 className="text-2xl font-light mb-6">Quote Summary</h2>

            {/* Items List */}
            <div className="space-y-4 mb-8">
                {items.map((item, index) => (
                    <div key={index} className="flex justify-between items-start">
                        <div className="flex-1">
                            <p className="text-gray-900">{item.name}</p>
                            <p className="text-sm text-gray-500">{item.quantity}</p>
                            {item.notes && (
                                <p className="text-sm text-gray-400 italic">{item.notes}</p>
                            )}
                        </div>
                        <p className="text-gray-600">UGX{item.estimatedPrice}</p>
                    </div>
                ))}
            </div>

            {/* Cost Breakdown */}
            <div className="space-y-3 border-t border-gray-100 pt-4">
                <div className="flex justify-between text-gray-600">
                    <span>Estimated Items Total</span>
                    <span>UGX {estimatedTotal}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                    <span>Delivery Fee</span>
                    <span>UGX {deliveryFee}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                    <span>Service Fee</span>
                    <span>UGX {serviceFee}</span>
                </div>
                <div className="flex justify-between font-medium text-lg pt-3 border-t border-gray-100">
                    <span>Total</span>
                    <span>UGX {calculateTotal()}</span>
                </div>
            </div>

            {/* Important Notes */}
            <div className="mt-8 bg-yellow-50 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                    <AlertCircle className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                    <div className="text-sm text-gray-700">
                        <p className="mb-2">This is an estimated quote. Final prices may vary based on:</p>
                        <ul className="list-disc pl-4 space-y-1">
                            <li>Product availability</li>
                            <li>Market price fluctuations</li>
                            <li>Specific brand selections</li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-8 space-y-3">
                <button
                    onClick={onAccept}
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-yellow-400 to-green-400 text-white py-3 rounded-lg hover:shadow-lg transition-shadow"
                >
                    {loading ? 'Processing..': 'Accept Quote'}
                </button>
                <button
                    onClick={onDecline}
                    disabled={loading}
                    className="w-full border border-gray-200 text-gray-600 py-3 rounded-lg hover:bg-gray-50 transition-colors"
                >
                    Decline Quote
                </button>
            </div>
        </motion.div>
    );
};

export default QuotePreview;