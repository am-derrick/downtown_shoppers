import { api } from './config';

export const paymentAPI = {
    initializePayment: async (listId, paymentData) => {
        try {
            const response = await api.post(
                `/payments/initiate/${listId}/`, 
                paymentData,
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );
            return response.data;
        } catch (error) {
            console.error('Payment initialization error:', error);
            throw error.response?.data || { message: 'Error initializing payment' };
        }
    },

    verifyPayment: async (orderTrackingId) => {
        try {
            const response = await api.get(`/payments/verify/${orderTrackingId}/`);
            return response.data;
        } catch (error) {
            console.error('Payment verification error:', error);
            throw error.response?.data || { message: 'Error verifying payment' };
        }
    }
};