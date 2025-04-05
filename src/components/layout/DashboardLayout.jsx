import { Outlet } from 'react-router-dom';
import { Box, CssBaseline } from '@mui/material';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import { useAuth } from '../../context/AuthContext';

const DashboardLayout = ({ children }) => {
    const { user, logout, isAdmin } = useAuth();

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <Navbar user={user} onLogout={logout} />
            <Sidebar isAdmin={isAdmin()} />
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    p: 3,
                    marginTop: '64px',
                    width: 'calc(100% - 240px)',
                }}
            >
                {children || <Outlet />}
            </Box>
        </Box>
    );
};

export default DashboardLayout;