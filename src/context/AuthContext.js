import { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import jwtDecode from 'jwt-decode';/

import { jwtDecode } from 'jwt-decode';
import api from '../api/auth';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        if (token) {
            // Set the token in axios headers
            api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

            // Decode token to get user info
            const decoded = jwtDecode(token);

            // Get additional user data from localStorage if available
            const storedUser = localStorage.getItem('user');
            const userData = storedUser ? JSON.parse(storedUser) : decoded;

            setUser(userData);
        }
        setLoading(false);
    }, [token]);

    const login = async (email, password) => {
        try {
            const response = await api.post('/users/login', { email, password });
            const { token, name, email: userEmail, userRole } = response.data;

            // Store token and user data
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify({
                name,
                email: userEmail,
                role: userRole
            }));

            // Update state
            setToken(token);
            setUser({
                name,
                email: userEmail,
                role: userRole
            });

            navigate('/dashboard');
        } catch (error) {
            throw error;
        }
    };

    const register = async (name, email, password) => {
        try {
            const response = await api.post('/users/register', { name, email, password });
            const { token, name: userName, email: userEmail, userRole } = response.data;

            // Store token and user data
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify({
                name: userName,
                email: userEmail,
                role: userRole
            }));

            // Update state
            setToken(token);
            setUser({
                name: userName,
                email: userEmail,
                role: userRole
            });

            navigate('/dashboard');
        } catch (error) {
            console.log(error, 'error');
            throw error;
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setToken(null);
        setUser(null);
        delete api.defaults.headers.common['Authorization'];
        navigate('/login');
    };

    const isAdmin = () => {
        return user?.role === 'admin';
    };

    return (
        <AuthContext.Provider value={{
            user,
            token,
            login,
            register,
            logout,
            isAdmin,
            loading
        }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};


export const useAuth = () => useContext(AuthContext);