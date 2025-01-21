import axios from 'axios';

export const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'https://3177-41-90-172-173.ngrok-free.app/api',
    withCredentials: false
});