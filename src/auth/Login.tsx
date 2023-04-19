import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import { getAuth, sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth";


const Login: React.FC = () => {
  const auth = getAuth();

  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [invalidEmail, setInvalidEmail] = useState<boolean>(false);
  const [invalidPassword, setInvalidPassword] = useState<boolean>(false);
  const [user, setUser] = useState<any>();

  const navigate = useNavigate();

  const handleUserSignIn = () => {
    if (user) {
      navigate(`/suitcase/`);
    }
  }

  // useEffect(() => {
  //   navigate('/suitcase');
  // }, [user])

  const handleEmailChange = (e: any) => {
    const input = e.target.value;

    const emailRegex = new RegExp("^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$");
    const valid = input.match(emailRegex);

    if (valid) {
      setEmail(input);
      setInvalidEmail(false);
    } else {
      setInvalidEmail(true);
    }
  }


  const handlePasswordChange = (e: any) => {
    const input = e.target.value;

    const passwordRegex = new RegExp("^(?=.*?[A-Za-z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$")
    const valid = input.match(passwordRegex);

    if(valid)
    {
      setPassword(input);
      setInvalidPassword(false)
    } else {
      setInvalidPassword(true);
    }
  }

  const resetPassword = (e:any) => {
    if (email) {
      sendPasswordResetEmail(auth, email)
      .then(() => {
        alert("Password reset email sent!");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
    }
  }

  const handleSubmit = (e: any) => {
    e.preventDefault();

    if (email && password) {
      signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        const uid = user.uid;
        setUser(user);
        console.log("LOSER", user);
        return uid;
      })
      .then((uid) => {
        handleUserSignIn();
      })
      .catch((error) => {
        const message = error.message
        if (message.includes("user-not-found).")) {
          setInvalidEmail(true);
          alert("This email is not in use. Please sign up.");
        }
        if (message.includes("wrong-password")) {
          setInvalidPassword(true);
          alert("You have entered the wrong password. Click 'forgot password' to reset.");
        }
      });
    }
  }

  return (
    <div id="login">
      <Form onSubmit={handleSubmit}>

        <Form.Group className="mb-3" controlId="LoginForm.Email">
          <Form.Control 
          type="email" 
          placeholder="Enter email" 
          onChange={handleEmailChange}
          isInvalid={invalidEmail}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="LoginForm.Password">
          <Form.Control 
          type="password" 
          placeholder="Enter password" 
          onChange={handlePasswordChange}
          isInvalid={invalidPassword}
          />
        </Form.Group>

        <a onClick={resetPassword}>Forgot Password?</a>
        <br />

        <Button variant="primary" type="submit">
          Submit
        </Button>

      </Form>
      {/* {user ?
       <Navigate to="/suitcase" replace={true}></Navigate>
       : null
      } */}
    </div>
  );
}

export default Login;

