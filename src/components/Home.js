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
    <Box sx={{ display: 'flex' }}>
      {/* Adjust for sidebar spacing */}
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

      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, marginLeft: `${drawerWidth}px`, paddingTop: '64px' }}
      >
        <Container maxWidth="md">
          <Paper elevation={3} sx={{ p: 5, textAlign: 'center', backgroundColor: '#f5f5f5' }}>
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
