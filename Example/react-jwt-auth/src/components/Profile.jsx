import React from 'react';
import { Jumbotron } from 'react-bootstrap';
import AuthService from '../services/AuthService';

function Profile() {
  const currentUser = AuthService.getCurrentUser();

  return (
    <div className='container'>
      <Jumbotron>
        <h3>
          <strong>{currentUser.username}</strong> Profile
        </h3>
        <p>
          <strong>Token: </strong> {currentUser.accessToken.substring(0, 20)}...
          {currentUser.accessToken.substring(
            currentUser.accessToken.length - 20
          )}
        </p>
        <p>
          <strong>Id: </strong>
          {currentUser.email}
        </p>
        <p>
          <strong>Authorities: </strong>
          <ul>
            {currentUser.roles &&
              currentUser.roles.map((role, index) => (
                <li key={index}>{role}</li>
              ))}
          </ul>
        </p>
      </Jumbotron>
    </div>
  );
}

export default Profile;
