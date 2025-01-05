import React from 'react';
import { motion } from 'framer-motion';
import { Truck, Calendar, MapPin, Clock } from 'lucide-react';

const OrderConfirmation = ({ orderDetails, deliveryInfo }) => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white rounded-xl shadow-sm p-6"
        >
            <div className="text-center mb-8">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Check className="w-8 h-8 text-green-500" />
                </div>
                <h2 className="text-2xl font-light mb-2">Order Confirmed!</h2>
                <p className="text-gray-600">Order #{orderDetails.orderNumber}</p>
            </div>

            {/* Delivery Information */}
            <div className="space-y-6">
                <div className="flex items-start space-x-3">
                    <Calendar className="w-5 h-5 text-gray-400 flex-shrink-0 mt-1" />
                    <div>
                        <p className="font-medium">Delivery Date</p>
                        <p className="text-gray-600">{deliveryInfo.date}</p>
                    </div>
                </div>

                <div className="flex items-start space-x-3">
                    <Clock className="w-5 h-5 text-gray-400 flex-shrink-0 mt-1" />
                    <div>
                        <p className="font-medium">Time Slot</p>
                        <p className="text-gray-600">{deliveryInfo.timeSlot}</p>
                    </div>
                </div>

                <div className="flex items-start space-x-3">
                    <MapPin className="w-5 h-5 text-gray-400 flex-shrink-0 mt-1" />
                    <div>
                        <p className="font-medium">Delivery Address</p>
                        <p className="text-gray-600">{deliveryInfo.address}</p>
                    </div>
                </div>
            </div>

            {/* Order Timeline */}
            <div className="mt-8 border-t border-gray-100 pt-8">
                <h3 className="font-medium mb-4">Order Progress</h3>
                <div className="space-y-4">
                    {orderDetails.timeline.map((step, index) => (
                        <div key={index} className="flex items-center space-x-3">
                            <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                                <Check className="w-4 h-4 text-green-500" />
                            </div>
                            <div>
                                <p className="font-medium">{step.title}</p>
                                <p className="text-sm text-gray-500">{step.time}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Actions */}
            <div className="mt-8 space-y-3">
                <button className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-900 transition-colors">
                    Track Order
                </button>
                <button className="w-full border border-gray-200 text-gray-600 py-3 rounded-lg hover:bg-gray-50 transition-colors">
                    View Order Details
                </button>
            </div>
        </motion.div>
    );
};

export default OrderConfirmation;