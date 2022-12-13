import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Typography } from '@mui/material';
import Button from '@mui/material/Button';
import FilledInput from '@mui/material/FilledInput';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import * as React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../app/hooks';
import { apiCreateLoan } from '../../remote/banking-api/loan.api';
import AdminLoan from './adminLoan';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

interface State {
  reason: string;
  amount: string;
  password: string;
  showPassword: boolean;
}

const Loan = () => {
  const now = new Date();
  const user = useAppSelector((state) => state.user.user);
  const navigate = useNavigate();
  const [errors, setError]= useState('');
  const [amountError, setAmountError]= useState('');

  const [values, setValues] = React.useState<State>({
    reason: '',
    amount: '',
    password: '',
    showPassword: false
  });

  // this is where we stopped, we have the values of the fields we just have to send the to the backend

  const handleSubmit = async () => {
    console.log('amount', values.amount, 'reason', values.reason, 'password', values.password);
    setError('');
    setAmountError('');

    if((!values.amount || !values.reason || !values.password)){
      setError('Fields cannot be empty!')
    }else if(Number(values.amount) <= 0){
      setAmountError('Amount must be greater than 0!')
    }else if(values.amount.search(/\D/) !== -1){
      setAmountError('Amount must be a number!')
    }else{

      if (user) {
      const response = await apiCreateLoan(
        user.id,
        values.reason,
        Number(values.amount),
        values.password
      );
      if(response.status === 400){
        setError(response.payload);
      }
      else {
      navigate('/');
    }
    }
  }
  };

  const handleChange =
    (prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setValues({ ...values, [prop]: event.target.value });
    };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  // const handlePasswordInput = (event:)
  return (
    <div
      style={{ width: '80%', margin: '12% auto', maxWidth:'800px' }}
    >
      {user?.type === 'CLIENT' ? (
        <>
          <Paper elevation={5}>
            <Grid
              container
              rowSpacing={3}
              columnSpacing={{ xs: 1, sm: 2, md: 3 }}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Grid item xs={6}>
                <Item style={{ width: '50%', margin: 'auto' }}>
                  {!user ? '' : `Hello ${user.firstName}, looking for a loan?`}
                </Item>
              </Grid>
              <Grid item xs={12}>
                <Item style={{ boxShadow: 'none' }}>
                  <Typography style={{ fontWeight: 'bold' }} color="primary">
                    {errors}
                  </Typography>
                  <Typography style={{ fontWeight: 'bold' }} color="primary">
                    {amountError}
                  </Typography>
                  <div>
                    <TextField
                      label="Current Date"
                      disabled
                      id="filled-start-adornment"
                      sx={{ m: 1, width: '25ch' }}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            {now.toLocaleDateString()}
                          </InputAdornment>
                        ),
                      }}
                      variant="filled"
                    />
                    <FormControl sx={{ m: 1, width: '25ch' }} variant="filled">
                      <InputLabel htmlFor="filled-adornment-amount">
                        Amount*
                      </InputLabel>
                      <FilledInput
                        id="filled-adornment-amount"
                        value={values.amount}
                        onChange={handleChange('amount')}
                        startAdornment={
                          <InputAdornment position="start">$</InputAdornment>
                        }
                        aria-describedby="filled-amount-helper-text"
                        inputProps={{
                          'aria-label': 'amount',
                        }}
                      />
                      <FormHelperText id="filled-amount-helper-text"></FormHelperText>
                    </FormControl>
                    <FormControl sx={{ m: 1, width: '25ch' }} variant="filled">
                      <InputLabel htmlFor="filled-adornment-password">
                        Password*
                      </InputLabel>
                      <FilledInput
                        id="filled-adornment-password"
                        type={values.showPassword ? 'text' : 'password'}
                        value={values.password}
                        onChange={handleChange('password')}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPassword}
                              onMouseDown={handleMouseDownPassword}
                              edge="end"
                            >
                              {values.showPassword ? (
                                <VisibilityOff />
                              ) : (
                                <Visibility />
                              )}
                            </IconButton>
                          </InputAdornment>
                        }
                      />
                    </FormControl>
                    <FormControl
                      fullWidth
                      sx={{
                        m: -1,
                        marginTop: '5px',
                        marginBottom: '5px',
                        width: '76%',
                      }}
                      variant="filled"
                    >
                      <InputLabel htmlFor="filled-adornment-reason">
                        Reason*
                      </InputLabel>
                      <FilledInput
                        id="filled-adornment-reason"
                        value={values.reason}
                        onChange={handleChange('reason')}
                        startAdornment={
                          <InputAdornment position="start"></InputAdornment>
                        }
                      />
                      <FormHelperText id="filled-reason-helper-text">
                        Please give a brief explanation for this loan request.
                      </FormHelperText>
                    </FormControl>
                  </div>
                </Item>
              </Grid>
              <Grid item xs={12}>
                <Item>
                  <Button
                    variant="contained"
                    onClick={() => handleSubmit()}
                    sx={{ marginRight: '90px' }}
                  >
                    Submit
                  </Button>
                  <Button variant="contained" onClick={() => navigate('/')}>
                    Cancel
                  </Button>
                </Item>
              </Grid>
            </Grid>
          </Paper>
          <Paper />
          <Paper elevation={0} />
        </>
      ) : (
        <AdminLoan />
      )}
    </div>
  );
};

export default Loan;
