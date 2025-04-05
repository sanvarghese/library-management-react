import { useState, useEffect } from 'react';
import { Container, Typography, Grid, CircularProgress } from '@mui/material';
// import BookList from '../components/books/BookList';
// import BookSearch from '../components/books/BookSearch';
import { getBooks } from '../api/books';
import BookSearch from '../components/books/BookSearch';
import BookList from '../components/books/BookList';

const BooksPage = () => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [refreshFlag, setRefreshFlag] = useState(false); // Add refresh flag

    const [pagination, setPagination] = useState({
        page: 1,
        limit: 10,
        total: 0,
    });
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                setLoading(true);
                const data = await getBooks(pagination.page, pagination.limit, searchQuery);
                setBooks(data.data.books);
                setPagination(prev => ({
                    ...prev,
                    total: data.data.totalCount
                }));
            } catch (error) {
                console.error('Error fetching books:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchBooks();
    }, [pagination.page, pagination.limit, searchQuery, refreshFlag]);

    const handlePageChange = (event, newPage) => {
        setPagination(prev => ({
            ...prev,
            page: newPage + 1,
        }));
    };

    const handleSearch = (query) => {
        setSearchQuery(query);
        setPagination(prev => ({
            ...prev,
            page: 1,
        }));
    };

    // Function to trigger refresh
    const triggerRefresh = () => {
        setRefreshFlag(prev => !prev);
    };

    return (
        <Container maxWidth="lg">
            <Typography variant="h4" component="h1" gutterBottom>
                Book Catalog
            </Typography>
            {/* <Grid container spacing={12}> */}
                
                <Grid item xs={12}>
                    <Grid item xs={4} sx={{ maxWidth: '200px',margin:'12px 0' }}>
                        <BookSearch onSearch={handleSearch} />
                    </Grid>
                    {loading ? (
                        <CircularProgress />
                    ) : (

                        // <></>
                        <BookList
                            books={books}
                            page={pagination.page - 1}
                            count={Math.ceil(pagination.total / pagination.limit)}
                            onPageChange={handlePageChange}
                            onRefresh={triggerRefresh} // Pass refresh function

                        />
                    )}
                </Grid>
            {/* </Grid> */}
        </Container>
    );
};

export default BooksPage;