import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import QuotePreview from '../components/shopping/QuotePreview';

const QuoteReview = () => {
    const { listId } = useParams();
    const navigate = useNavigate();
    const [quoteData, setQuoteData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // We'll fetch data from her after constructing our backend
        setTimeout(() => {
            setQuoteData({
                items: [
                    // Your shopping list items with estimated prices
                ],
                estimatedTotal: 150.00,
                deliveryFee: 10.00,
                serviceFee: 5.00
            });
            setLoading(false);
        }, 1000);
    }, [listId]);

    const handleProceedToCheckout = () => {
        // Handle the checkout process
        navigate('/order/confirm/123'); // Replace with actual order ID
    };

    const handleModifyList = () => {
        // Go back to shopping list
        navigate('/shopping');
    };

    if (loading) {
        return <div>Loading quote...</div>;
    }

    return (
        <div className="max-w-3xl mx-auto px-4 py-12">
            <QuotePreview 
                {...quoteData}
                onProceed={handleProceedToCheckout}
                onModify={handleModifyList}
            />
        </div>
    );
};

export default QuoteReview;