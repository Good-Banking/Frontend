import bankingClient from '../../remote/banking-api/bankingClient';
import { SyntheticEvent, useState, useRef, useEffect, } from 'react';
import {useNavigate} from 'react-router-dom';

function SecurityQuestion(props: any){
    const [secQuestion, setSecQuestion] = useState<any>('');
    const handleSecurityGet = useRef(()=>{});

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
      //TODO: ALLAT, ALLAT
    return(
        <div>
        <h2>I am the SECURITY QUESTION MODAL! Good job, you found me!</h2>
        <p>{secQuestion}</p>
        </div>
    )
}

export default SecurityQuestion;