import React, { useState } from 'react';
import Navbar from './Navbar';
import LoginModal from './LoginModal';
import RegisterModal from './RegisterModal';
import { register, login } from '../api/auth';
import { AuthProvider } from './AuthContext';
import Formulario from './Form';

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
  
  const handleAuthenticated = (user, accessToken, refreshToken) => {
    setLoggedIn(true);
    setUsername(user);
    setAccessToken(accessToken);
    setRefreshToken(refreshToken);
  };

  const handleLoginSubmit = async (event) => {
    event.preventDefault();
    const { email, password } = event.target.elements;
  
    try {
      const { user, accessToken, refreshToken } = await login(email.value, password.value);
      handleAuthenticated(user, accessToken, refreshToken);
      handleModalClose();
    } catch (error) {
      // Aquí puedes manejar el caso de error en el inicio de sesión
      console.error('Error en el inicio de sesión:', error.message);
      console.log(error); // Agrega un console.log para mostrar el objeto de error completo
    }
  };
  

  return (
    <div>
      <AuthProvider>
        <Navbar
          loggedIn={loggedIn}
          username={username}
          handleLogout={handleLogout} // Asegúrate de pasar la función handleLogout como prop
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
