import { useState } from 'react';
import { Button, Snackbar, Alert } from '@mui/material';
import { borrowBook } from '../../api/borrow';

const BorrowButton = ({ bookId }) => {
    const [loading, setLoading] = useState(false);
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: '',
        severity: 'success',
    });

    const handleBorrow = async () => {
        try {
            setLoading(true);
            await borrowBook(bookId);
            setSnackbar({
                open: true,
                message: 'Book borrowed successfully!',
                severity: 'success',
            });
        } catch (error) {
            setSnackbar({
                open: true,
                message: error.response?.data?.message || 'Failed to borrow book',
                severity: 'error',
            });
        } finally {
            setLoading(false);
        }
    };

    const handleCloseSnackbar = () => {
        setSnackbar(prev => ({ ...prev, open: false }));
    };

    return (
        <>
            <Button
                variant="contained"
                color="primary"
                size="small"
                onClick={handleBorrow}
                disabled={loading}
                style={{margin:"0 12px"}}
            >
                Borrow
            </Button>
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
    );
};

export default BorrowButton;