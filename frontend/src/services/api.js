import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000/api',
    headers: {}
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

            // Debug logging
            console.log('FormData contents:');
            for (let [key, value] of formData.entries()) {
                console.log(`${key}: ${value instanceof File ? 'File object' : value}`);
            }

            const response = await api.post('/shopping-lists/', formData);
            return response.data;
            
        } catch (error) {
            console.error('API Error Response:', error.response?.data);
            
            if (error.response?.data) {
                const errorData = error.response.data;
                
                // Error handling for nested serializer errors
                if (Array.isArray(errorData.items)) {
                    const itemErrors = errorData.items
                        .map((item, index) => {
                            if (typeof item === 'object') {
                                return Object.entries(item)
                                    .map(([field, errors]) => 
                                        `Item ${index + 1} ${field}: ${errors.join(', ')}`
                                    )
                                    .join('\n');
                            }
                            return `Item ${index + 1}: ${item}`;
                        })
                        .filter(Boolean)
                        .join('\n');
                    
                    throw new Error(itemErrors);
                }
                
                // Other types of errors
                const formattedError = Object.entries(errorData)
                    .map(([key, value]) => {
                        if (Array.isArray(value)) {
                            return `${key}: ${value.join(', ')}`;
                        }
                        return `${key}: ${value}`;
                    })
                    .join('\n');
                
                throw new Error(formattedError);
            }
            throw error;
        }
    },

    checkStatus: async (listId) => {
        try {
            const response = await api.get(`/shopping-lists/${listId}/status/`);
            return response.data;
        } catch (error) {
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
    }
};