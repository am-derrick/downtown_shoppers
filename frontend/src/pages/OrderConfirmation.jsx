import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Calendar, Check } from 'lucide-react';
import { shoppingListAPI } from '../services/api';

const OrderConfirmation = () => {
    const { listId } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const customerDetails = location.state?.customerDetails;
    
    const [orderData, setOrderData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchOrderStatus = async () => {
            try {
                const response = await shoppingListAPI.checkStatus(listId);
                console.log('Order status response:', response);

                if (response.status !== 'accepted') {
                    setError('Order not found or not confirmed');
                    return;
                }

                setOrderData({
                    orderNumber: listId,
                    status: response.status,
                    customer: customerDetails || {
                        email: 'Contact support for details',
                        phone: 'Contact support for details',
                        address: 'Contact support for details'
                    },
                    items: response.quote.items || [],
                    subtotal: response.quote.subtotal,
                    delivery_fee: response.quote.delivery_fee,
                    service_fee: response.quote.service_fee,
                    total: response.quote.total,
                    created_at: response.quote.created_at
                });
            } catch (err) {
                console.error('Error fetching order:', err);
                setError('Failed to load order details');
            } finally {
                setLoading(false);
            }
        };

        fetchOrderStatus();
    }, [listId, customerDetails]);


    // ... loading and error states remain the same ...

    if (!orderData) return null;

    return (
        <div className="max-w-3xl mx-auto px-4 py-12">
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-white rounded-xl shadow-sm p-6"
            >
                <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Check className="w-8 h-8 text-green-500" />
                    </div>
                    <h1 className="text-2xl font-semibold mb-2">Order Confirmed!</h1>
                    <p className="text-gray-600">Thank you for your order</p>
                    <p className="text-gray-600">Order #{orderData.orderNumber}</p>
                </div>

                {/* Order Date */}
                <div className="flex items-center space-x-3 mb-6">
                    <Calendar className="w-5 h-5 text-gray-400" />
                    <div>
                        <p className="text-sm text-gray-500">Order Date</p>
                        <p className="font-medium">{new Date(orderData.created_at).toLocaleString()}</p>
                    </div>
                </div>

                {/* Delivery Information */}
                <div className="bg-gray-50 rounded-lg p-4 space-y-4 mb-6">
                    <h2 className="font-medium text-gray-900">Delivery Information</h2>
                    <div className="space-y-3">
                        <div className="flex items-start space-x-3">
                            <MapPin className="w-5 h-5 text-gray-400 mt-0.5" />
                            <div>
                                <p className="text-sm text-gray-500">Delivery Address</p>
                                <p className="text-gray-900">{orderData.customer.address || 'No address provided'}</p>
                            </div>
                        </div>
                        <div className="flex items-start space-x-3">
                            <Phone className="w-5 h-5 text-gray-400 mt-0.5" />
                            <div>
                                <p className="text-sm text-gray-500">Phone Number</p>
                                <p className="text-gray-900">{orderData.customer.phone || 'No phone number provided'}</p>
                            </div>
                        </div>
                        <div className="flex items-start space-x-3">
                            <Mail className="w-5 h-5 text-gray-400 mt-0.5" />
                            <div>
                                <p className="text-sm text-gray-500">Email</p>
                                <p className="text-gray-900">{orderData.customer.email || 'No email provided'}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Order Summary */}
                <div className="border rounded-lg p-4">
                    <h2 className="font-medium text-gray-900 mb-4">Order Summary</h2>
                    <div className="space-y-2">
                        {orderData.items.map((item, index) => (
                            <div key={index} className="flex justify-between py-2 border-b last:border-b-0">
                                <div>
                                    <p className="text-gray-900">{item.name}</p>
                                    <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                                </div>
                                <p className="text-gray-900">UGX {item.price}</p>
                            </div>
                        ))}
                    </div>
                    <div className="mt-4 pt-4 border-t space-y-2">
                        <div className="flex justify-between text-gray-600">
                            <span>Subtotal</span>
                            <span>UGX {orderData.subtotal}</span>
                        </div>
                        <div className="flex justify-between text-gray-600">
                            <span>Delivery Fee</span>
                            <span>UGX {orderData.delivery_fee}</span>
                        </div>
                        <div className="flex justify-between text-gray-600">
                            <span>Service Fee</span>
                            <span>UGX {orderData.service_fee}</span>
                        </div>
                        <div className="flex justify-between font-medium text-lg pt-2 border-t">
                            <span>Total</span>
                            <span>UGX {orderData.total}</span>
                        </div>
                    </div>
                </div>

                <div className="mt-8">
                <button
                    onClick={() => {
                        console.log('List ID:', listId);
                        console.log('Order Data:', {
                            total: orderData.total,
                            subtotal: orderData.subtotal,
                            delivery_fee: orderData.delivery_fee,
                            service_fee: orderData.service_fee,
                            items: orderData.items,
                            customer: orderData.customer,
                            status: orderData.status
                        });
                        
                        navigate(`/order/payment/${listId}`, {
                            state: {
                                orderData: {
                                    total: orderData.total,
                                    subtotal: orderData.subtotal,
                                    delivery_fee: orderData.delivery_fee,
                                    service_fee: orderData.service_fee,
                                    items: orderData.items,
                                    customer: orderData.customer,
                                    status: orderData.status
                                }
                            }
                        });
                    }}
                    className="w-full bg-gradient-to-r from-yellow-400 to-green-400 text-white py-3 rounded-lg hover:shadow-lg transition-shadow"
                >
                    Proceed to Choose Payment Method
                </button>
                </div>
            </motion.div>
        </div>
    );
};

export default OrderConfirmation;