import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Box,
  Paper,
} from '@mui/material';

const drawerWidth = 240;

const Home = () => {
  return (
    <Box sx={{ display: 'flex'  }}>
      {/* Top App Bar */}
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar>
          <Typography
            variant="h4"
            align="center"
            fontWeight="bold"
            gutterBottom
          >
            School BPS
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Main Content */}
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 1, marginLeft: `${drawerWidth}px`}}
      >
        <Container maxWidth="md">
          {/* Welcome Section */}
          <Paper elevation={3} sx={{ p: 2, textAlign: 'center', backgroundColor: '#f5f5f5' }}>
            <Typography variant="h3" gutterBottom>
              Welcome to School BPS
            </Typography>
            <Typography variant="h6" paragraph>
              Empowering students with seamless learning and school communication tools.
            </Typography>
          </Paper>
        </Container>
      </Box>
    </Box>
  );
};

export default Home;
