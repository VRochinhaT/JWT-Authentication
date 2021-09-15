import React, { useEffect, useState } from 'react';
import { Jumbotron } from 'react-bootstrap';
import UserService from '../services/UserService';

function Home() {
  const [content, setContent] = useState('');

  useEffect(() => {
    UserService.getPublicContent().then(
      (response) => {
        setContent(response.data);
      },
      (error) => {
        setContent(
          (error.response && error.response.data) ||
            error.message ||
            error.toString()
        );
      }
    );
  }, []);

  return (
    <div className='container'>
      <Jumbotron>
        <h3>{content}</h3>
      </Jumbotron>
    </div>
  );
}

export default Home;
