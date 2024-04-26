import React from "react";
import "./App.css";
import styled from "styled-components";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
//import { Route, Routes } from "react-router-dom";
import Login  from "./components/login/login";
import Register  from "./components/login/register";
import Home  from "./components/home/home";
//import { RequireAuth } from "react-auth-kit";


/*const ProtectedRoute = withAuth(({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    rest.isAuthenticated() ? <Component {...props} /> : <redirect to="/" />
  )} />
));*/

import './App.css'
import { useEffect, useState } from 'react'

const AppContainer = styled.div`
  width: 100%;
  height: 100%;
`;

function PrivateRoute({ element: Component, loggedIn, ...rest }) {
  return (
    <Route
      {...rest}
      element={loggedIn ? <Component /> : <Navigate to="/login" />}
    />
  );
}

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState('');

  useEffect(() => {
    // Check if the user is logged in by retrieving the value from localStorage
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (isLoggedIn === 'true') {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  }, []); 
  
  return (
    <AppContainer>
      <Router>
        <Routes>
          <Route
            path="/"
            element={loggedIn ? <Home email={email} loggedIn={loggedIn} setLoggedIn={setLoggedIn} /> : <Navigate to="/login" />}
          />
          <Route path="/login" element={<Login setLoggedIn={setLoggedIn} setEmail={setEmail} />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Router>
    </AppContainer>
  );
}

export default App;