// QuoteReview.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { shoppingListAPI } from '../services/api';
import QuotePreview from '../components/shopping/QuotePreview';
import QuoteLoading from '../components/shopping/QuoteLoading';

const QuoteReview = () => {
    const { listId } = useParams();
    const navigate = useNavigate();
    const [quoteData, setQuoteData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [actionLoading, setActionLoading] = useState(false);

    useEffect(() => {
        const checkQuoteStatus = async () => {
            try {
                const response = await shoppingListAPI.checkStatus(listId);
                console.log('Quote Response:', JSON.stringify(response, null, 2));

                if (!response) {
                    throw new Error('No response received from server');
                }

                if (response.status === 'quoted') {
                    // Store all necessary data including customer details
                    const transformedData = {
                        ...response,  // Keep all original data
                        items: response.quote.items || [],
                        estimatedTotal: parseFloat(response.quote.subtotal) || 0,
                        deliveryFee: parseFloat(response.quote.delivery_fee) || 0,
                        serviceFee: parseFloat(response.quote.service_fee) || 0
                    };
                    console.log('Transformed Data:', JSON.stringify(transformedData, null, 2));
                    setQuoteData(transformedData);
                    setLoading(false);
                } else if (['accepted', 'declined', 'completed'].includes(response.status)) {
                    navigate('/shopping', {
                        state: { message: `This quote has already been ${response.status}.` }
                    });
                }
            } catch (err) {
                console.error('Error fetching quote:', err);
                setError(`Failed to load quote. ${err.message}`);
                setLoading(false);
            }
        };

        checkQuoteStatus();
    }, [listId, navigate]);

    const handleAcceptQuote = async () => {
        setActionLoading(true);
        try {
            await shoppingListAPI.acceptQuote(listId);
            console.log('Quote data before navigation:', quoteData);
            
            // Pass all necessary data to order confirmation
            navigate(`/order/confirm/${listId}`, { 
                state: {
                    customerDetails: {
                        email: quoteData.customer_email,
                        phone: quoteData.customer_phone,
                        address: quoteData.delivery_address
                    }
                }
            });
        } catch (err) {
            setError('Failed to accept quote. Please try again.');
            console.error('Error accepting quote:', err);
        } finally {
            setActionLoading(false);
        }
    };

    const handleDeclineQuote = async () => {
        setActionLoading(true);
        try {
            await shoppingListAPI.declineQuote(listId);
            navigate('/shopping', { 
                state: { message: 'Quote declined. You can create a new shopping list.' }
            });
        } catch (err) {
            setError('Failed to decline quote. Please try again.');
            console.error('Error declining quote:', err);
        } finally {
            setActionLoading(false);
        }
    };

    if (error) {
        return (
            <div className="max-w-3xl mx-auto px-4 py-12">
                <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
                    <div className="flex">
                        <div className="flex-shrink-0">
                            <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <div className="ml-3">
                            <h3 className="text-sm font-medium text-red-800">Error</h3>
                            <div className="mt-2 text-sm text-red-700">
                                {error}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (loading) {
        return <QuoteLoading />;
    }

    return (
        <div className="max-w-3xl mx-auto px-4 py-12">
            <QuotePreview
                {...quoteData}
                onAccept={handleAcceptQuote}
                onDecline={handleDeclineQuote}
                loading={actionLoading}
            />
        </div>
    );
};

export default QuoteReview;