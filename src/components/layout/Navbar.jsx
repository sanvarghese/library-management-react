import { AppBar, Toolbar, Typography, Button, Avatar, Menu, MenuItem, IconButton } from '@mui/material';
import { Menu as MenuIcon, AccountCircle } from '@mui/icons-material';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ user, onLogout }) => {
    const [anchorEl, setAnchorEl] = useState(null);

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
            <Toolbar>
                <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    sx={{ mr: 2 }}
                >
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Library Management
                </Typography>
                {user && (
                    <div>
                        <Button
                            color="inherit"
                            startIcon={<AccountCircle />}
                            onClick={handleMenu}
                        >
                            {user.name}
                        </Button>
                        <Menu
                            anchorEl={anchorEl}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                        >
                            <MenuItem component={Link} to="/profile" onClick={handleClose}>
                                Profile
                            </MenuItem>
                            <MenuItem onClick={() => {
                                handleClose();
                                onLogout();
                            }}>
                                Logout
                            </MenuItem>
                        </Menu>
                    </div>
                )}
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;