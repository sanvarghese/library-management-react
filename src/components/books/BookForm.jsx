import { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, Grid } from '@mui/material';

const BookForm = ({ open, onClose, onSubmit, book }) => {
    const [formData, setFormData] = useState({
        title: '',
        author: '',
        isbn: '',
        publishedYear: '',
        totalCopies: 1,
        availableCopies: 1,
    });

    const [errors, setErrors] = useState({
        title: false,
        author: false,
        isbn: false,
        publishedYear: false,
        totalCopies: false,
        availableCopies: false,
    });

    useEffect(() => {
        if (book) {
            setFormData({
                title: book.title,
                author: book.author,
                isbn: book.isbn,
                publishedYear: book.publishedYear,
                totalCopies: book.totalCopies,
                availableCopies: book.availableCopies,
            });
        } else {
            setFormData({
                title: '',
                author: '',
                isbn: '',
                publishedYear: '',
                totalCopies: 1,
                availableCopies: 1,
            });
        }
        // Clear errors when form opens
        setErrors({
            title: false,
            author: false,
            isbn: false,
            publishedYear: false,
            totalCopies: false,
            availableCopies: false,
        });
    }, [book, open]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    const validateForm = () => {
        const newErrors = {
            title: !formData.title,
            author: !formData.author,
            isbn: !formData.isbn,
            publishedYear: !formData.publishedYear,
            totalCopies: formData.totalCopies <= 0,
            availableCopies: formData.availableCopies < 0 || formData.availableCopies > formData.totalCopies,
        };
        setErrors(newErrors);
        return !Object.values(newErrors).some(error => error);
    };

    const handleSubmit = () => {
        if (validateForm()) {
            onSubmit({
                ...formData,
                publishedYear: parseInt(formData.publishedYear),
                totalCopies: parseInt(formData.totalCopies),
                availableCopies: parseInt(formData.availableCopies),
            });
        }
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle>{book ? 'Edit Book' : 'Add New Book'}</DialogTitle>
            <DialogContent>
                {/* <Grid container spacing={2} sx={{ mt: 1 }}>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Title"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            required
                            error={errors.title}
                            helperText={errors.title && 'Title is required'}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Author"
                            name="author"
                            value={formData.author}
                            onChange={handleChange}
                            required
                            error={errors.author}
                            helperText={errors.author && 'Author is required'}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="ISBN"
                            name="isbn"
                            value={formData.isbn}
                            onChange={handleChange}
                            required
                            error={errors.isbn}
                            helperText={errors.isbn && 'ISBN is required'}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Published Year"
                            name="publishedYear"
                            type="number"
                            value={formData.publishedYear}
                            onChange={handleChange}
                            required
                            error={errors.publishedYear}
                            helperText={errors.publishedYear && 'Published year is required'}
                            inputProps={{ min: 1000, max: new Date().getFullYear() }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Total Copies"
                            name="totalCopies"
                            type="number"
                            value={formData.totalCopies}
                            onChange={handleChange}
                            required
                            error={errors.totalCopies}
                            helperText={errors.totalCopies && 'Must be at least 1'}
                            inputProps={{ min: 1 }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Available Copies"
                            name="availableCopies"
                            type="number"
                            value={formData.availableCopies}
                            onChange={handleChange}
                            required
                            error={errors.availableCopies}
                            helperText={
                                errors.availableCopies
                                    ? formData.availableCopies < 0
                                        ? 'Cannot be negative'
                                        : 'Cannot exceed total copies'
                                    : ''
                            }
                            inputProps={{
                                min: 0,
                                max: formData.totalCopies
                            }}
                        />
                    </Grid>
                </Grid> */}

                <Grid container spacing={2} sx={{ mt: 1 }}>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Title"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            required
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Author"
                            name="author"
                            value={formData.author}
                            onChange={handleChange}
                            required
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="ISBN"
                            name="isbn"
                            value={formData.isbn}
                            onChange={handleChange}
                            required
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Published Year"
                            name="publishedYear"
                            type="number"
                            value={formData.publishedYear}
                            onChange={handleChange}
                            required
                        />
                    </Grid>
                    {/* <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Total Copies"
                            name="totalCopies"
                            type="number"
                            value={formData.totalCopies}
                            onChange={handleChange}
                            required
                        />
                    </Grid> */}
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Available Copies"
                            name="availableCopies"
                            type="number"
                            value={formData.availableCopies}
                            onChange={handleChange}
                            required
                        />
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button onClick={handleSubmit} variant="contained" color="primary">
                    {book ? 'Update' : 'Add'}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default BookForm;