import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import LoginModal from './LoginModal';
import RegisterModal from './RegisterModal';
import { register, login } from '../api/auth';
import { AuthProvider } from './AuthContext';
import Formulario from './Form';
import TokenRefresher from './TokenRefresher';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [accessToken, setAccessToken] = useState('');
  const [refreshToken, setRefreshToken] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);

  const handleLogout = () => {
    setLoggedIn(false);
    setUsername('');
    setAccessToken('');
    setRefreshToken('');
  };

  const handleModalClose = () => {
    setShowModal(false);
    setShowLoginModal(false);
    setShowRegisterModal(false);
  };

  const handleLoginModalOpen = () => {
    setShowModal(true);
    setShowLoginModal(true);
  };

  const handleRegisterModalOpen = () => {
    setShowModal(true);
    setShowRegisterModal(true);
  };

  const handleRegister = async (event) => {
    event.preventDefault();
    const { email, username, password } = event.target.elements;

    try {
      await register(email.value, username.value, password.value);
      handleModalClose();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleLoginSubmit = async (event) => {
    event.preventDefault();
    const { email, password } = event.target.elements;
    try {
      const { user, accessToken, refreshToken } = await login(email.value, password.value);
      setLoggedIn(true);
      setUsername(user);
      setAccessToken(accessToken);
      setRefreshToken(refreshToken);
      localStorage.setItem('accessTokenExpiration', decodeAccessToken(accessToken).exp * 1000);
      handleModalClose();
    } catch (error) {
      console.error('Error en el inicio de sesión:', error.message);
      console.log(error); 
    }
  };

  const decodeAccessToken = (token) => {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  };

  useEffect(() => {
    let intervalId;

    const checkTokenExpiration = () => {
      const expirationTime = localStorage.getItem('accessTokenExpiration');
      const timeToExpiration = expirationTime - new Date().getTime();
      const refreshThreshold = 60000;

      if (timeToExpiration <= refreshThreshold) {
        TokenRefresher(refreshToken, setAccessToken, handleLogout);
      }
    };

    const startTokenExpirationCheck = () => {
      intervalId = setInterval(checkTokenExpiration, 5000);
    };

    if (loggedIn) {
      startTokenExpirationCheck();
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [loggedIn, refreshToken, handleLogout]);

  return (
    <div>
      <AuthProvider>
        <Navbar
          loggedIn={loggedIn}
          username={username}
          handleLogout={handleLogout}
          handleLoginModalOpen={handleLoginModalOpen}
          handleRegisterModalOpen={handleRegisterModalOpen}
        />

        {showModal && (
          <div className="modal">
            {showLoginModal && (
              <LoginModal handleLoginSubmit={handleLoginSubmit} handleModalClose={handleModalClose} />
            )}
            {showRegisterModal && (
              <RegisterModal handleRegister={handleRegister} handleModalClose={handleModalClose} />
            )}
          </div>
        )}
        <Formulario token={accessToken} />
      </AuthProvider>
    </div>
  );
}

export default App;
