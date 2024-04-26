import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

const AuthContextProvider = (props) => {
  const [isAuthenticated, setAuthenticated] = useState(false);
  const [user, setUser] = useState('');

  const login = (username, token) => {
    localStorage.setItem('token', token);
    localStorage.setItem('username', username);
    setAuthenticated(true);
    setUser(username);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    setAuthenticated(false);
    setUser('');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
