import api from './auth';

export const getBooks = async (page = 1, limit = 10, search = '') => {
    try {
        const response = await api.get('/books', {
            params: { page, limit, search },
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getBookById = async (id) => {
    try {
        const response = await api.get(`/books/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const createBook = async (bookData) => {
    try {
        const response = await api.post('/books', bookData);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const updateBook = async (id, bookData) => {
    try {
        const response = await api.put(`/books/${id}`, bookData);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const deleteBook = async (id) => {
    try {
        const response = await api.delete(`/books/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const searchBooks = async (query) => {
    try {
        const response = await api.get('/books/search', { params: { query } });
        return response.data;
    } catch (error) {
        throw error;
    }
};