import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import AuthService from './services/AuthService';

import { Container, Nav, Navbar } from 'react-bootstrap';
import { Switch, Link, Route } from 'react-router-dom';
import Login from './components/Login';
import Home from './components/Home';
import Profile from './components/Profile';
import Register from './components/Register';
import BoardAdmin from './components/BoardAdmin';
import BoardModerator from './components/BoardModerator';
import BoardUser from './components/BoardUser';

function App() {
  const [showModeratorBoard, setShowModeratorBoard] = useState(false);
  const [showAdminBoard, setShowAdminBoard] = useState(false);
  const [currentUser, setCurrentUser] = useState();

  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
      setShowModeratorBoard(user.roles.includes('ROLE_MODERATOR'));
      setShowAdminBoard(user.roles.includes('ROLE_ADMIN'));
    }
  }, []);

  function logOut() {
    AuthService.logout();
    setShowModeratorBoard(false);
    setShowAdminBoard(false);
    setCurrentUser();
  }

  return (
    <div>
      <Navbar variant='dark' bg='dark'>
        <Container>
          <Navbar.Brand>
            <Link to={'/'} className='navbar-brand'>
              vTenorio
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls='navbar-nav' />
          <Navbar.Collapse id='navbar-nav'>
            <Nav className='me-auto'>
              <Nav.Item>
                <Link to={'/home'} className='nav-link'>
                  Home
                </Link>
              </Nav.Item>

              {showModeratorBoard && (
                <Nav.Item>
                  <Link to={'/mod'} className='nav-link'>
                    Moderator Board
                  </Link>
                </Nav.Item>
              )}

              {showAdminBoard && (
                <Nav.Item>
                  <Link to={'/admin'} className='nav-link'>
                    Admin Board
                  </Link>
                </Nav.Item>
              )}

              {currentUser && (
                <Nav.Item>
                  <Link to={'/user'} className='nav-link'>
                    User
                  </Link>
                </Nav.Item>
              )}
            </Nav>

            {currentUser ? (
              <Nav>
                <Nav.Item>
                  <Link to={'/profile'} className='nav-link'>
                    {currentUser.username}
                  </Link>
                </Nav.Item>
                <Nav.Link href='/login' onClick={() => AuthService.logout()}>
                  LogOut
                </Nav.Link>
              </Nav>
            ) : (
              <Nav>
                <Nav.Item>
                  <Link to={'/login'} className='nav-link'>
                    Login
                  </Link>
                </Nav.Item>
                <Nav.Item>
                  <Link to={'/register'} className='nav-link'>
                    Sign Up
                  </Link>
                </Nav.Item>
              </Nav>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <div className='container mt-3'>
        <Switch>
          <Route exact path={['/', '/home']} component={Home} />
          <Route exact path='/login' component={Login} />
          <Route exact path='/register' component={Register} />
          <Route exact path='/profile' component={Profile} />
          <Route path='/user' component={BoardUser} />
          <Route path='/mod' component={BoardModerator} />
          <Route path='/admin' component={BoardAdmin} />
        </Switch>
      </div>
    </div>
  );
}

export default App;
