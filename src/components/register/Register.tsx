import LockOutlined from '@mui/icons-material/LockOutlined';
import { Alert } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { apiRegister } from '../../remote/banking-api/auth.api';

export default function Register() {
  const navigate = useNavigate();
  const [error, setError] = React.useState('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const response = await apiRegister(
      `${data.get('email')}`,
      `${data.get('password')}`,
      `${data.get('firstName')}`,
      `${data.get('lastName')}`,
      `${data.get('securityQuestion')}`,
      `${data.get('securityAnswer')}`
    );
    const passLength = String(data.get('password')).length;
    if (response.status >= 200 && response.status < 300) {
      navigate('/login');
    } else if (
      data.get('email') === '' ||
      data.get('password') === '' ||
      data.get('firstName') === null ||
      data.get('lastName') === null ||
      data.get('securityQuestion') === null ||
      data.get('securityAnswer') === null
    ) {
      setError('Please check missing fields');
    } else if (passLength <= 3) {
      setError('Password must be greater than 3 characters');
    } else {
      setError('Username already in use');
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'primary.light' }}>
          <LockOutlined />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="new-password"
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="firstName"
            label="First Name"
            type="text"
            id="firstName"
            autoComplete="first name"
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="lastName"
            label="Last Name"
            type="text"
            id="lastName"
            autoComplete="last Name"
          />
          <h2>Security question</h2>
          <p>Please pick a Good&#8482; security question.
            <br></br>
            A Good security question is one that only you know the answer to, and is not a yes or no question.
          </p>
          <TextField
            margin="normal"
            required
            fullWidth
            name="securityQuestion"
            label="Security question"
            type="text"
            id="securityQuestion"
          />
            <TextField
            margin="normal"
            required
            fullWidth
            name="securityAnswer"
            label="Security answer"
            type="text"
            id="securityAnswer"
          />
          <p>Be sure to write down your answer in a Good&#8482; place, like a desk drawer or other private location.
          </p>
          <Button
            type="submit"
            color="secondary"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
          {error === '' ? '' : <Alert severity="error">{error}</Alert>}
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="login" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
