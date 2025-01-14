import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000/api',
    headers: {
        'Content-Type': 'multipart/form-data',
    },
    withCredentials: false
});

export const shoppingListAPI = {
    createList: async (listData) => {
        try {
            // Create FormData to handle file uploads
            const formData = new FormData();
            
            // Add basic fields
            formData.append('customer_email', listData.customer_email);
            formData.append('customer_phone', listData.customer_phone);
            formData.append('delivery_address', listData.delivery_address);
            formData.append('special_instructions', listData.special_instructions || '');

            // Handling items as JSON string for the main data to match DRF serializers
            listData.items.forEach((item, index) => {
                // For each item, we need to structure the data differently
                formData.append(`items[${index}]name`, item.name);
                formData.append(`items[${index}]quantity`, item.quantity);
                
                if (item.description) {
                    formData.append(`items[${index}]description`, item.description);
                }
                if (item.notes) {
                    formData.append(`items[${index}]notes`, item.notes);
                }
                // Handle image separately
                if (item.image instanceof File) {
                    formData.append(`items[${index}]image`, item.image);
                }
            });

            const response = await api.post('/shopping-lists/', formData);
            return response.data;
            
        } catch (error) {
            console.error('Detailed Error:', error.response?.data || error.message);
            throw error.response?.data || error;
        }
    },

    checkStatus: async (listId) => {
        try {
            console.log('Making API call to:', `${api.defaults.baseURL}/shopping-lists/${listId}/status/`);
            const response = await api.get(`/shopping-lists/${listId}/status/`);
            return response.data;
        } catch (error) {
            console.error('API Error:', error);
            console.error('Error Response:', error.response);
            throw error.response?.data || { message: 'Error checking status' };
        }
    },

    acceptQuote: async (listId) => {
        try {
            const response = await api.post(`shopping-lists/${listId}/accept_quote/`);
            return response.data;
        } catch (error) {
            throw error.response?.data || { message: 'Error accepting quote' };
        }
    },

    declineQuote: async (listId) => {
        try {
            const response = await api.post(`shopping-lists/${listId}/decline_quote/`);
            return response.data;
        } catch (error) {
            throw error.response?.data || { message: 'Error declining quote' };
        }
    },

    sendConfirmationEmail: async (listId) => {
        try {
            const response = await api.post(`shopping-lists/${listId}/send_confirmation/`);
            return response.data;
        } catch (error) {
            console.error('Error sending confirmation email:', error);
            throw error.response?.data || {
                message: 'Failed to send confirmation email. Please contact support.'
            }
        }
    }
};
