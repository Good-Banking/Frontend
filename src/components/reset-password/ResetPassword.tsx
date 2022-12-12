import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

import bankingClient from '../../remote/banking-api/bankingClient';
import { SyntheticEvent, useState, useRef, useEffect, } from 'react';
import {useNavigate} from 'react-router-dom';

function ResetPassword(){
    const [submission, setSubmission] = useState<any>({
      email: '', 
      password: '', 
      securityAnswer: '',
    }); //TODO: PASS _ME_ THRU PROPS TO SEC QUESTION MODAL
        //THEN HANDLE SUBMITTING THERE.
    const [newPassword, setNewPassword] = useState(''); //used for password CONFIRMATION
    const [error, setError] = useState(false);
    const [confirmation, setConfirmation] = useState(false);
    const navigate: any = useNavigate(); //Dear typescript, stop it. Get some help.

    const [secQuestion, setSecQuestion] = useState<any>('');
    const handleSecurityGet = useRef(()=>{});

    const navAfterTime = () => { 
        //@DOCS: used for the timeout, below, so our confirm message is displayed.
        navigate('/login');
    }

    const validate=(value: string, value2: string)=>{
        // ADD MIN LENGTH REQS HERE AND IN REGISTRATION
        if(value !== value2){
            setError(true);
            return true;
            //NOTE: must both set the error, and return a boolean
            //so that our check in submit handler works, below.
        } else {
            setError(false);
            return false;
        }
    }



    const handleChange = (e: SyntheticEvent) => {
      setSubmission({
        ...submission,
        [(e.target as HTMLInputElement).name]: (e.target as HTMLInputElement)
          .value,
      });
    }
    const handleNewPassChange = (e: SyntheticEvent) => { 
        //used for confirmation that passwords are the same!
        setNewPassword((e.target as HTMLInputElement).value);
    }
    const handleSubmit = () => {
        if(validate(submission.password, newPassword) === true){
            return null;
        } else {
            bankingClient.patch('/user/reset-password', submission)
            .then(res=>{
                setConfirmation(true);
                setTimeout(navAfterTime, 1500);
            })
            .catch(err=>{
                setError(true);
            })
        }
}
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
            id="securityPassword"
            autoComplete="current-password"
            value={submission.securityAnswer}
            onChange={handleNewPassChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="securityAnswer"
            label="Enter your security answer to verify that you are the account holder."
            type="password"
            id="password"
            autoComplete="current-password"
            value={newPassword}
            onChange={handleNewPassChange}
          />
          </Box>
          {error ? <p>"Passwords MUST match, AND you must provide a valid EMAIL!"</p> : <></>}
          {confirmation ? <p>Your password has been RESET.</p> : 
              <Button
              type="submit"
              color="secondary"
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleSubmit}
              >Submit</Button>
          }
            </Box>
    </div>
    )
}

export default ResetPassword;
