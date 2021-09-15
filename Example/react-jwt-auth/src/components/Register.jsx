import React, { useState } from 'react';
import { Alert, Button, Form } from 'react-bootstrap';
import AuthService from '../services/AuthService';

function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState('');

  const validation = true;

  const handleRegister = (event) => {
    event.preventDefault();
    console.log('Hangle Login');

    setSuccessful(false);
    setMessage('');

    if (validation) {
      AuthService.register(username, email, password).then(
        (response) => {
          setMessage(response.data.message);
          setSuccessful(true);
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          setSuccessful(false);
          setMessage(resMessage);
        }
      );
    }
  };

  return (
    <div className='container'>
      <Form className='col-md-12' onSubmit={(event) => handleRegister(event)}>
        {!successful && (
          <div>
            <Form.Group>
              <Form.Label htmlFor='username'>Username</Form.Label>
              <Form.Control
                type='text'
                name='username'
                value={username}
                onChange={(event) => {
                  setUsername(event.target.value);
                }}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label htmlFor='email'>Email</Form.Label>
              <Form.Control
                type='email'
                name='email'
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value);
                }}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label htmlFor='password'>Password</Form.Label>
              <Form.Control
                type='password'
                name='password'
                value={password}
                onChange={(event) => {
                  setPassword(event.target.value);
                }}
              />
            </Form.Group>

            <Form.Group>
              <Button variant='primary' type='submit'>
                Sign Up
              </Button>
            </Form.Group>
          </div>
        )}

        {message && (
          <Form.Group>
            <Alert variant={successful ? 'sucess' : 'danger'}>{message}</Alert>
          </Form.Group>
        )}
      </Form>
    </div>
  );
}

export default Register;
