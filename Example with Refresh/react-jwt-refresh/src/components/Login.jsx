import React, { useState } from 'react';
import { Alert, Button, Form } from 'react-bootstrap';
import AuthService from '../services/AuthService';

function Login(props) {
  const [username, setUsername] = useState('');
  const [password, setPassaword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const validation = true;

  const handleLogin = (event) => {
    event.preventDefault();
    console.log('Hangle Login');

    setLoading(true);
    setMessage('');

    if (validation) {
      AuthService.login(username, password).then(
        () => {
          props.history.push('/profile');
          window.location.reload();
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          setLoading(false);
          setMessage(resMessage);
        }
      );
    } else {
      setLoading(false);
    }
  };

  return (
    <div className='container'>
      <Form className='col-md-6' onSubmit={(event) => handleLogin(event)}>
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
          <Form.Label htmlFor='password'>Password</Form.Label>
          <Form.Control
            type='password'
            name='password'
            value={password}
            onChange={(event) => {
              setPassaword(event.target.value);
            }}
          />
        </Form.Group>

        <Form.Group>
          <Button variant='primary' type='submit' disabled={loading}>
            {loading && <span className='spinner-border spinner-border-sm' />}
            <span>Login</span>
          </Button>
        </Form.Group>

        {message && (
          <Form.Group>
            <Alert variant='danger'>{message}</Alert>
          </Form.Group>
        )}
      </Form>
    </div>
  );
}

export default Login;
