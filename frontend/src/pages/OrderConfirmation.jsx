import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import OrderConfirmation from '../components/orders/OrderConfirmation';

const OrderConfirmationPage = () => {
    const { orderId } = useParams();
    const [orderData, setOrderData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch order details here
        setTimeout(() => {
            setOrderData({
                orderNumber: orderId,
                deliveryInfo: {
                    date: "2024-01-05",
                    timeSlot: "2:00 PM - 4:00 PM",
                    address: "123 Main St, City"
                },
                timeline: [
                    { title: "Order Received", time: "10:00 AM" },
                    { title: "Processing", time: "10:05 AM" }
                ]
            });
            setLoading(false);
        }, 1000);
    }, [orderId]);

    if (loading) {
        return <div>Loading order details...</div>;
    }

    return (
        <div className="max-w-3xl mx-auto px-4 py-12">
            <OrderConfirmation {...orderData} />
        </div>
    );
};

export default OrderConfirmationPage;