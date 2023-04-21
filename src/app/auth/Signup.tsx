import React, {useState} from 'react';
import {Navigate} from 'react-router-dom';

import { auth, db } from '../../index'
import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { ref, set } from 'firebase/database';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const Signup: React.FC = () => {

  const [name, setName] = useState<string>();
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [invalidEmail, setInvalidEmail] = useState<boolean>(false);
  const [invalidPassword, setInvalidPassword] = useState<boolean>(false);
  const [user, setUser] = useState<any>();

  const handleNameChange = (e: any) => {
    const input = e.target.value;
    setName(input);
    console.log(name);
  }

  const handleEmailChange = (e: any) => {
    const input = e.target.value;

    const emailRegex = new RegExp("^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$");
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

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (email && password) {
      try {      
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // user created
          const user = userCredential.user;
          console.log(user)
          if (user) {
            sendEmailVerification(user)
            .then(() =>{
              alert("Email verification sent.");
              setUser(user);
              const uid = user.uid;
              set(ref(db, `users/${uid}`), {
                name: name,
                email: user.email
              })
          });          
          } else {
            alert('Failed to create');
          }
        })
        .catch((error) => {
          const message = error.message
          if (message.includes("invalid-email")) {
            setInvalidEmail(true);
          }
          if (message.includes("email-already-in-use")) {
            alert("This email is already in use, please use login.")
            // TODO: make a popup requesting user sign in rather than sign up
          }
        });
      } catch {
        console.log("post error")
      }
    }
  }

  return (
    <div>
      {!user ? 
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="SignupForm.Name" onChange={handleNameChange}>
          <Form.Control 
          required 
          type="name" 
          placeholder="Enter your preferred name"
          />
          <Form.Text className="text-muted">
            Be yourself
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="SignupForm.Email" onChange={handleEmailChange}>
          <Form.Control 
          required 
          type="email" 
          placeholder="Enter email"
          isInvalid={invalidEmail}
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else
          </Form.Text>
          <Form.Control.Feedback type="invalid">
                Please enter a valid email
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="SignupForm.Password" onChange={handlePasswordChange}>
          <Form.Control 
          required 
          type="password" 
          placeholder="Enter password" 
          isInvalid={invalidPassword}
          />
          <Form.Text className="text-muted">
            Minimum 8 characters including 1 number
          </Form.Text>
        </Form.Group>
        <Button variant="primary" type="submit" >
          Submit
        </Button>
      </Form>
      : <Navigate to="/suitcase" replace={true}></Navigate>
      }
    </div>
  );
}

export default Signup;


