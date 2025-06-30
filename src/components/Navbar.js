import React from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  CssBaseline,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Box,
  Button,
} from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import PeopleIcon from '@mui/icons-material/People';
import SchoolIcon from '@mui/icons-material/School';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import WorkIcon from '@mui/icons-material/Work';
import ProductIcon from '@mui/icons-material/ShoppingCart';

const drawerWidth = 240;

export default function DashboardLayout({ onLogout, children }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate('/');
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />

      {/* AppBar */}
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <img
            src="/BPS_logo.gif"
            alt="School Logo"
            style={{ height: '40px' }} // adjust size as needed
          />
          <Button color="inherit" variant="outlined" onClick={handleLogout}>
            Log out
          </Button>
        </Toolbar>
      </AppBar>

      {/* Sidebar Drawer */}
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
        }}
      >
        <Toolbar />
        <List>
          <ListItem button component={RouterLink} to="/Home">
            <ListItemIcon><HomeIcon /></ListItemIcon>
            <ListItemText primary="Home" />
          </ListItem>
          <ListItem button component={RouterLink} to="/Users">
            <ListItemIcon><PeopleIcon /></ListItemIcon>
            <ListItemText primary="Users" />
          </ListItem>
          <ListItem button component={RouterLink} to="/Roles">
            <ListItemIcon><AssignmentIndIcon /></ListItemIcon>
            <ListItemText primary="Roles" />
          </ListItem>
          <ListItem button component={RouterLink} to="/Schools">
            <ListItemIcon><SchoolIcon /></ListItemIcon>
            <ListItemText primary="Schools" />
          </ListItem>
          <ListItem button component={RouterLink} to="/Employees">
            <ListItemIcon><WorkIcon /></ListItemIcon>
            <ListItemText primary="Employees" />
          </ListItem>       
          <ListItem button component={RouterLink} to="/Products">
            <ListItemIcon><ProductIcon /></ListItemIcon>
            <ListItemText primary="Products" />
          </ListItem>      
        </List>
      </Drawer>

      {/* Content Area */}
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
}
