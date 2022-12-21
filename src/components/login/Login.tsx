import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import { Alert, Card, CardContent } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import { useState } from 'react';
import { Link as Rlink, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { signIn } from '../../features/user/userSlice';
import { apiLogin } from '../../remote/banking-api/auth.api';
import CardActions from '@mui/material/CardActions';

import hero from '../../images/laughing2.jpg';
import './Login.css';

import LoginCards from './Login-Cards';
import LoginAd from './Login-Ad';
import Footer from './footer/Footer';

export default function Login() {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user.user);
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get('email');
    const password = data.get('password');

    const response = await apiLogin(`${email}`, `${password}`);
    if (response.status === 200) {
      let token = response.headers['authorization'];
      if (token) {
        sessionStorage.setItem('token', token);
      }
      dispatch(signIn(response.payload));
    } else {
      setError('Invalid credentials!');
    }
  };

  React.useEffect(() => {
    if (user) {
      navigate('/');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <>
      <Container maxWidth="xl">
        <CssBaseline />

        <div className="f-page">
          <img className="hero" src={hero} alt="laughs" />

          <Card className="overlay" sx={{ maxWidth: 345 }}>
            <CardContent
              sx={{
                marginTop: 3,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: 'primary.light' }}>
                <MonetizationOnIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign in
              </Typography>
              <Box
                component="form"
                onSubmit={handleSubmit}
                noValidate
                sx={{ mt: 1 }}
              >
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
                  autoComplete="current-password"
                />
                {error === '' ? '' : <Alert severity="error">{error}</Alert>}
                {/* <Rlink className="loginlinks" to={'reset-password'}>
                  Forgot password?
                </Rlink> */}
                <Button
                  type="submit"
                  color="secondary"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Sign In
                </Button>
              </Box>
            </CardContent>
            <CardActions>
              <Grid container>
                <Grid item>
                  <Rlink className="loginlinks" to={'../register'}>
                    {"Don't have an account? Sign Up"}
                  </Rlink>
                </Grid>
              </Grid>
            </CardActions>
          </Card>
        </div>
        <LoginCards />
        <LoginAd />
        <Footer />
      </Container>
    </>
  );
}
