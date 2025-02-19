import axios from 'axios';

export const registerUser = async (email: string, password: string) => {
    try {
        const response = await axios.post('/api/register', { email, password }, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    } catch (error) {
        throw new Error('Failed to register');
    }
};

export const loginUser = async (email: string, password: string) => {
    try {
        const response = await axios.post('/api/login', { email, password }, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    } catch (error) {
        throw new Error('Failed to login');
    }
};
