import React from 'react';

const Navbar = ({ loggedIn, username, handleLoginModalOpen, handleRegisterModalOpen, handleLogout }) => {
  const handleHomeClick = (event) => {
    event.preventDefault();
  };

  const handleLogoutClick = () => {
    handleLogout();
    window.location.reload();
  };

  return (
    <nav className="flex items-center justify-between bg-gray-800 p-6 shadow">
      <div className="flex items-center">
        <a href="/" className="text-white font-semibold hover:text-gray-200" onClick={handleHomeClick}>
          Home
        </a>
      </div>
      <div className="flex items-center">
        {loggedIn ? (
          <>
            <span className="text-white mr-2">Hola, {username}</span>
            <button
              className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded"
              onClick={handleLogoutClick}
            >
              Cerrar sesión
            </button>
          </>
        ) : (
          <>
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded mr-2"
              onClick={handleLoginModalOpen}
            >
              Login
            </button>
            <button
              className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded"
              onClick={handleRegisterModalOpen}
            >
              Register
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
