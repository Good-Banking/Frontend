import bankingClient from '../../remote/banking-api/bankingClient';
import { SyntheticEvent, useState, useRef, useEffect, } from 'react';
import {useNavigate} from 'react-router-dom';
import { TextField, Button } from '@mui/material';

function SecurityQuestion(props: any){
    //const {email: email, password: password, securityAnswer: securityAnswer} = props;
    // const [submission, setSubmission] = useState({
    //   email: props.email,
    //   password: props.password,
    //   securityAnswer: props.securityAnswer
    // })
    const [secQuestion, setSecQuestion] = useState<any>('');
    const [confirm, setConfirm] = useState(false);
    const handleSecurityGet = useRef(()=>{});
    const navigate = useNavigate();

    const navAfterTime = () => { 
      //@DOCS: used for the timeout, below, so our confirm message is displayed.
      navigate('/login');
  }

    handleSecurityGet.current = () => {
        //@DOCS: I SEND A POST REQUEST, but the function is called get because it "gets" the 
        //security question from the server ie.
        bankingClient.post('user/reset-password', props)
          .then(res=>{
            console.log(res);
            //if res.status === 400, setError('No account with that email address exists, please try again.') else, setSecQuestion
            setSecQuestion(res.data.secQuestion);
          }).catch(err=>{
            console.log(err + '___->handle this error somehow!')
          })
      }
  
      //on pageload, get the security question.
      //pass user info (email, new password) BE SURE TO GET PROPS IN HERE!
      useEffect(()=>{
        handleSecurityGet.current();
        console.log(props);
      }, [])

      const handleChange = (e: SyntheticEvent) => {
        setSecQuestion((e.target as HTMLInputElement).value);
      }

      const handleSubmit=()=>{
        bankingClient.patch('/user/reset-password', props)
          .then(res=>{
              setConfirm(true);
              setTimeout(navAfterTime, 750);
          })
          .catch(err=>{
              // setError(true);
          })
      }
      
    return(

        <div>
        <h2>Please enter your Good security answer.</h2>
        <p>{secQuestion}</p>
        <p>{props.email}</p>
        <TextField
            margin="normal"
            required
            fullWidth
            name="securityAnswer"
            label="Type answer here."
            type="password"
            id="securityPassword"
            value={props.securityAnswer}
            onChange={handleChange}
          />
          {confirm ? 
          <p>Your password has been RESET. Please wait to be redirected to login.</p>
           :  
          <Button
          type="submit"
          color="warning"
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          onClick={handleSubmit}
          >Verify your identity & reset password.
          </Button>
        }
        </div>
    )
}

export default SecurityQuestion;