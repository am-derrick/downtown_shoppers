import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8000/api',
    headers: {
        'Content-Type': 'application/json',
    }
});

export const shoppingListAPI = {
    createList: async (listData) => {
        try {
            const response = await api.post('/shopping-lists/', listData);
            return response.data;
        } catch (error) {
            throw error.response?.data || { message: 'An error occured' };
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