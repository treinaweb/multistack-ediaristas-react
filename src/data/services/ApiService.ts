import axios from 'axios';

const url = 'http://localhost:8000';

export const ApiService = axios.create({
    baseURL: url,
    headers: {
        'Content-Type': 'application/json',
    },
});
