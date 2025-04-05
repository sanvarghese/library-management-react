import api from './auth';

export const borrowBook = async (bookId) => {
    try {
        const response = await api.post(`/borrow/${bookId}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const returnBook = async (bookId) => {
    try {
        const response = await api.post(`/return/${bookId}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getBorrowHistory = async () => {
    try {
        const response = await api.get('/borrow/history');
        return response.data;
    } catch (error) {
        throw error;
    }
};