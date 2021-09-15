import React, { useState, useEffect } from 'react';
import { Jumbotron } from 'react-bootstrap';
import UserService from '../services/UserService';

function BoardAdmin() {
  const [content, setContent] = useState('');

  useEffect(() => {
    UserService.getAdminBoard().then(
      (response) => {
        setContent(response.data);
      },
      (error) => {
        setContent(
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
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

export default BoardAdmin;
