import React from 'react';
import { AppBar, Toolbar, Typography, Container, Box, Button, Grid, Card, CardContent } from '@mui/material';

const Home = () => {
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            School BPS
          </Typography>
        </Toolbar>
      </AppBar>

      <Box sx={{ py: 8, textAlign: 'center', backgroundColor: '#f5f5f5' }}>
        <Container maxWidth="md">
          <Typography variant="h3" gutterBottom>
            Welcome to School BPS
          </Typography>
          <Typography variant="h6" paragraph>
            Empowering students with seamless learning and school communication tools.
          </Typography>
        </Container>
      </Box>
    </>
  );
};

export default Home;


