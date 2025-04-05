import { useState, useEffect } from 'react';
import { Container, Typography, Box, CircularProgress, Card } from '@mui/material';
import { useAuth } from '../context/AuthContext';
import Profile from '../components/user/Profile';
import { getBorrowHistory } from '../api/borrow';

const ProfilePage = () => {
    const { user } = useAuth();  // Change from userDetail to user
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const fetchHistory = async () => {
            try {
                setLoading(true);
                const response = await getBorrowHistory();
                setHistory(response.data);  // Only keep the array part

            } catch (error) {
            } finally {
                setLoading(false);
            }
        };

        fetchHistory();
    }, []);

    return (
      

        <Container maxWidth="lg">
            <Typography variant="h4" component="h1" gutterBottom>
                My Profile
            </Typography>
            {loading ? (
                <CircularProgress />
            ) : (
                <Profile user={user} history={history} />
            )}
        </Container>
      
    );
};

export default ProfilePage;