import { Drawer, List, ListItem, ListItemIcon, ListItemText, Divider,Box, Toolbar } from '@mui/material';
import { Book, Dashboard, People, ExitToApp } from '@mui/icons-material';
import { Link } from 'react-router-dom';

const Sidebar = ({ isAdmin }) => {

    console.log(isAdmin,'isAdmin')
    return (
        <Drawer
            variant="permanent"
            sx={{
                width: 240,
                flexShrink: 0,
                [`& .MuiDrawer-paper`]: { width: 240, boxSizing: 'border-box' },
            }}
        >
            <Toolbar />
            <Box sx={{ overflow: 'auto' }}>
                <List>
                    <ListItem button component={Link} to="/dashboard">
                        <ListItemIcon>
                            <Dashboard />
                        </ListItemIcon>
                        <ListItemText primary="Dashboard" />
                    </ListItem>
                    <ListItem button component={Link} to="/profile">
                        <ListItemIcon>
                            <People />
                        </ListItemIcon>
                        <ListItemText primary="My Profile" />
                    </ListItem>
                    {isAdmin && (
                        <ListItem button component={Link} to="/admin/books">
                            <ListItemIcon>
                                <Book />
                            </ListItemIcon>
                            <ListItemText primary="Manage Books" />
                        </ListItem>
                    )}
                </List>
                <Divider />
                <List>
                    <ListItem button>
                        <ListItemIcon>
                            <ExitToApp />
                        </ListItemIcon>
                        <ListItemText primary="Logout" />
                    </ListItem>
                </List>
            </Box>
        </Drawer>
    );
};

export default Sidebar;