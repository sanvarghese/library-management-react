import { useState } from 'react';
import { Button, Snackbar, Alert } from '@mui/material';
import { returnBook } from '../../api/borrow'; 

const ReturnButton = ({ bookId,onSuccess}) => {

    const [loading, setLoading] = useState(false);
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: '',
        severity: 'success',
    });

    const handleReturn = async () => {
        try {
            setLoading(true);
            await returnBook(bookId); // You'll need to implement this API call
            setSnackbar({
                open: true,
                message: 'Book returned successfully!',
                severity: 'success',
            });
            onSuccess(); // Call the success callback

        } catch (error) {
            setSnackbar({
                open: true,
                message: error.response?.data?.message || 'Failed to return book',
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
                color="secondary" // Different color to distinguish from borrow
                size="small"
                onClick={handleReturn}
                disabled={loading}
            >
                Return
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

export default ReturnButton;