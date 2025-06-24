import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Box,
  Paper,
  Stack,
  Button,
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
        sx={{ flexGrow: 1, p: 1, marginLeft: `${drawerWidth}px`, paddingTop: '64px' }}
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

          {/* Features Section */}
          <Paper elevation={3} sx={{ p: 4, mt: 5 }}>
            <Typography variant="h5" gutterBottom>
              Our Features
            </Typography>
            <Stack spacing={2}>
              <Typography>- Digital Classrooms with Interactive Content</Typography>
              <Typography>- Real-time Communication with Parents</Typography>
              <Typography>- Attendance & Grade Monitoring</Typography>
              <Typography>- Extracurricular Activities and Clubs</Typography>
            </Stack>
          </Paper>

          {/* Announcements Section */}
          <Paper elevation={3} sx={{ p: 4, mt: 5 }}>
            <Typography variant="h5" gutterBottom>
              Announcements
            </Typography>
            <Typography>📢 Summer vacation starts from April 20th</Typography>
            <Typography>📝 Mid-term exams begin July 5th</Typography>
          </Paper>

          {/* Testimonials Section */}
          <Paper elevation={3} sx={{ p: 4, mt: 5 }}>
            <Typography variant="h5" gutterBottom>
              What Parents Say
            </Typography>
            <Typography>"This school has transformed how my child learns. The communication is top-notch!"</Typography>
          </Paper>

          {/* Call to Action */}
          <Box mt={4} textAlign="center">
            <Button variant="outlined" color="primary" size="large">
              Contact Us
            </Button>
          </Box>

          {/* Navigation Buttons */}
          <Box mt={5} display="flex" justifyContent="space-between">
            <Button variant="contained" color="primary" disabled>
              Previous
            </Button>
            <Button variant="contained" color="primary">
              Next
            </Button>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default Home;
