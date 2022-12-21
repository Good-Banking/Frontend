import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

import { SyntheticEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import bankingClient from '../../remote/banking-api/bankingClient';
// Unfinished component
function ResetPassword() {
  const [submission, setSubmission] = useState<any>({
    email: '',
    password: '',
  });
  const [newPassword, setNewPassword] = useState(''); //used for password CONFIRMATION
  const [error, setError] = useState(false);
  const [confirmation, setConfirmation] = useState(false);
  const navigate: any = useNavigate(); //Dear typescript, stop it. Get some help.

  const navAfterTime = () => {
    //@DOCS: used for the timeout, below, so our confirm message is displayed.
    navigate('/login');
  };

  const validate = (value: string, value2: string) => {
    // ADD MIN LENGTH REQS HERE AND IN REGISTRATION
    if (value !== value2) {
      setError(true);
      return true;
      //NOTE: must both set the error, and return a boolean
      //so that our check in submit handler works, below.
    } else if (value.length <= 3) {
      setError(true);
      return true
    } else {
      setError(false);
      return false;
    }
  };

  const handleChange = (e: SyntheticEvent) => {
    setSubmission({
      ...submission,
      [(e.target as HTMLInputElement).name]: (e.target as HTMLInputElement)
        .value,
    });
  };
  const handleNewPassChange = (e: SyntheticEvent) => {
    //used for confirmation that passwords are the same!
    setNewPassword((e.target as HTMLInputElement).value);
  };
  const handleSubmit = () => {
    console.log(submission);
    if (validate(submission.password, newPassword) === true) {
      console.log('do they match?');
      return null;
    } else {
      bankingClient
        .patch('/user/reset-password', {
          email: submission.email,
          password: submission.password,
          confirmPassword: newPassword,
        })
        .then((res) => {
          setConfirmation(true);
          setTimeout(navAfterTime, 1500);
        })
        .catch((err) => {
          setError(true);
        });
    }
  };
  return (
    <div>
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <h2>Please fill me out to submit a password reset request.</h2>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={submission.email}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="New password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={submission.password}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Confirm new password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={newPassword}
            onChange={handleNewPassChange}
          />
        </Box>
        {error ? (
          <p>"Passwords MUST match, AND you must provide a valid EMAIL!"</p>
        ) : (
          <></>
        )}
        {confirmation ? (
          <p>Your password has been RESET.</p>
        ) : (
          <Button
            type="submit"
            color="secondary"
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={handleSubmit}
          >
            Submit
          </Button>
        )}
      </Box>
    </div>
  );
}

export default ResetPassword;
