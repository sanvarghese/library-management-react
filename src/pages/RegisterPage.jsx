import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Container, Typography, TextField, Button, Box, Link } from '@mui/material';
import Register from '../components/auth/Register';

const RegisterPage = () => {
    const { register } = useAuth();
    const navigate = useNavigate();
    const [error, setError] = useState('');

    const handleSubmit = async (name, email, password) => {
        try {
            await register(name, email, password);
        } catch (err) {
            setError(err.response?.data?.message || 'Registration failed');
        }
    };

    return (
        <Container maxWidth="sm">
            <Box sx={{ mt: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Register
                </Typography>
                <Register onSubmit={handleSubmit} error={error} />
                <Box sx={{ mt: 2 }}>
                    <Typography variant="body2">
                        Already have an account?{' '}
                        <Link href="/login" underline="hover">
                            Login here
                        </Link>
                    </Typography>
                </Box>
            </Box>
        </Container>
    );
};

export default RegisterPage;