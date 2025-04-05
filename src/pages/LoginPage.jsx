import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Container, Typography, TextField, Button, Box, Link } from '@mui/material';
import Login from '../components/auth/Login';

const LoginPage = () => {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [error, setError] = useState('');

    const handleSubmit = async (email, password) => {
        try {
            await login(email, password);
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed');
        }
    };

    return (
        <Container maxWidth="sm">
            <Box sx={{ mt: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Library Login
                </Typography>
                <Login onSubmit={handleSubmit} error={error} />
                <Box sx={{ mt: 2 }}>
                    <Typography variant="body2">
                        Don't have an account?{' '}
                        <Link href="/register" underline="hover">
                            Register here
                        </Link>
                    </Typography>
                </Box>
            </Box>
        </Container>
    );
};

export default LoginPage;