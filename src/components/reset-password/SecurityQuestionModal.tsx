import bankingClient from '../../remote/banking-api/bankingClient';
import { SyntheticEvent, useState, useRef, useEffect, } from 'react';
import {useNavigate} from 'react-router-dom';
import { TextField } from '@mui/material';

function SecurityQuestion(props: any){
    const {email, password, securityAnswer} = props;
    const [secQuestion, setSecQuestion] = useState<any>('');
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
            setSecQuestion(res.data.secQuestion);
          }).catch(err=>{
            console.log(err + '___->handle this error somehow!')
          })
      }
  
      //on pageload, get the security question.
      //pass user info (email, new password) BE SURE TO GET PROPS IN HERE!
      useEffect(()=>{
        handleSecurityGet.current();
      }, [])
      //TODO: SUBMIT

      const handleChange = (e: SyntheticEvent) => {
        setSecQuestion((e.target as HTMLInputElement).value);
      }

      const handleSubmit=()=>{
        bankingClient.patch('/user/reset-password', props)
          .then(res=>{
              // setConfirmation(true);
          setTimeout(navAfterTime, 750);
          })
          .catch(err=>{
              // setError(true);
          })
      }
      

    return(
        <div>
        <h2>I am the SECURITY QUESTION MODAL! Good job, you found me!</h2>
        <p>{secQuestion}</p>
        <TextField
            margin="normal"
            required
            fullWidth
            name="securityAnswer"
            label="Type answer here."
            type="password"
            id="securityPassword"
            value={securityAnswer}
            onChange={handleChange}
          />
        </div>
    )
}

export default SecurityQuestion;