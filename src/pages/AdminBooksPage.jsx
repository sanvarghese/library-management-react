import { useState, useEffect } from 'react';
import { Container, Typography, Button, Box, CircularProgress, Snackbar, Alert } from '@mui/material';
import BookList from '../components/books/BookList';
import BookForm from '../components/books/BookForm';
import { getBooks, createBook, updateBook, deleteBook } from '../api/books';

const AdminBooksPage = () => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [openForm, setOpenForm] = useState(false);
    const [editingBook, setEditingBook] = useState(null);
    const [pagination, setPagination] = useState({
        page: 1,
        limit: 10,
        total: 0,
    });
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: '',
        severity: 'success',
    });

    const fetchBooks = async () => {
        try {
            setLoading(true);
            const data = await getBooks(pagination.page, pagination.limit);
            setBooks(data.data.books);
            setPagination(prev => ({
                ...prev,
                total: data.total,
            }));
        } catch (error) {
            console.error('Error fetching books:', error);
            showSnackbar('Failed to fetch books', 'error');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBooks();
    }, [pagination.page, pagination.limit]);

    const showSnackbar = (message, severity = 'success') => {
        setSnackbar({
            open: true,
            message,
            severity,
        });
    };

    const handleCloseSnackbar = () => {
        setSnackbar(prev => ({ ...prev, open: false }));
    };

    const handlePageChange = (event, newPage) => {
        setPagination(prev => ({
            ...prev,
            page: newPage + 1,
        }));
    };

    const handleEdit = (book) => {
        setEditingBook(book);
        setOpenForm(true);
    };

    const handleDelete = async (id) => {
        try {
            await deleteBook(id);
            setBooks(books.filter(book => book._id !== id));
            showSnackbar('Book deleted successfully');
            fetchBooks(); // Refresh the list after delete

        } catch (error) {
            console.error('Error deleting book:', error);
            showSnackbar('Failed to delete book', 'error');
        }
    };

    const handleFormClose = () => {
        setOpenForm(false);
        setEditingBook(null);
    };

    const handleFormSubmit = async (bookData) => {
        try {
            if (editingBook) {
                // Update existing book
                const updatedBook = await updateBook(editingBook._id, bookData);
                setBooks(books.map(book =>
                    book._id === editingBook._id ? updatedBook : book
                ));
                showSnackbar('Book updated successfully');
                fetchBooks(); // Refresh the list after add/edit

            } else {
                // Add new book
                const newBook = await createBook(bookData);
                setBooks([newBook, ...books]);
                showSnackbar('Book added successfully');
                fetchBooks(); // Refresh the list after add/edit
            }
            handleFormClose();
        } catch (error) {
            console.error('Error saving book:', error);
            showSnackbar(error.response?.data?.message || 'Failed to save book', 'error');
        }
    };

    return (
        <Container maxWidth="lg">
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h4" component="h1">
                    Manage Books
                </Typography>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => setOpenForm(true)}
                >
                    Add New Book
                </Button>
            </Box>
            {loading ? (
                <CircularProgress />
            ) : (
                <>
                    <BookList
                        books={books}
                        page={pagination.page - 1}
                        count={Math.ceil(pagination.total / pagination.limit)}
                        onPageChange={handlePageChange}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                        isAdmin
                    />
                    <BookForm
                        open={openForm}
                        onClose={handleFormClose}
                        onSubmit={handleFormSubmit}
                        book={editingBook}
                    />
                    <Snackbar
                        open={snackbar.open}
                        autoHideDuration={6000}
                        onClose={handleCloseSnackbar}
                    >
                        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity}>
                            {snackbar.message}
                        </Alert>
                    </Snackbar>
                </>
            )}
        </Container>
    );
};

export default AdminBooksPage;