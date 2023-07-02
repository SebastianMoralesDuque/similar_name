import React, { createContext, useState, useEffect } from 'react';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [authenticatedUser, setAuthenticatedUser] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem('authenticatedUser');
    if (storedUser) {
      setAuthenticatedUser(JSON.parse(storedUser));
      setLoggedIn(true);
    }
  }, []);

  const handleAuthenticated = (user) => {
    setAuthenticatedUser(user);
    setLoggedIn(true);
    localStorage.setItem('authenticatedUser', JSON.stringify(user));
  };

  const handleLogout = () => {
    setAuthenticatedUser(null);
    setLoggedIn(false);
    localStorage.removeItem('authenticatedUser');
  };

  return (
    <AuthContext.Provider value={{ authenticatedUser, loggedIn, handleAuthenticated, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
