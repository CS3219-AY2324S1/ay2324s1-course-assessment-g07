import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';

import Matchmaking from './components/Matchmaking/Matchmaking';
import QuestionDashboard from './components/Dashboard/QuestionDashboard';
import Login from './components/Users/Login';
import Register from './components/Users/Register';
import Profile from './components/Users/Profile';
import Workspace from './components/Workspace/Workspace';

import Navbar from './components/NavigationBar/Navigationbar';
import './App.css';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


// toast.configure(); // Configure react-toastify

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const setAuth = (boolean) => {
    setIsAuthenticated(boolean);
  };

  async function isAuth() {
    try {
      const response = await fetch('http://localhost:5000/users/is-verify', {
        method: 'GET',
        headers: { token: localStorage.token },
      });

      const parseRes = await response.json();
      console.log(parseRes);
      parseRes === true ? setIsAuthenticated(true) : setIsAuthenticated(false);
    } catch (err) {
      console.error(err.message);
    }
  }

  useEffect(() => {
    isAuth();
  });

  return (
    <Router>
      <ToastContainer autoClose={3000} />

      <Navbar setAuth={setAuth} isAuthenticated={isAuthenticated} />
      <Routes>
        <Route
          path="/login"
          element={
            isAuthenticated ? (
              <Navigate to="/questions" replace />
            ) : (
              <Login setAuth={setAuth} />
            )
          }
        />
        <Route path="/register" element={<Register setAuth={setAuth} />} />
        <Route
          path="/questions"
          element={
            isAuthenticated ? (
              <QuestionDashboard setAuth={setAuth} />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route
          path="/profile"
          element={
            isAuthenticated ? (
              <Profile setAuth={setAuth} />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route
          path="/matchmaking"
          element={
            isAuthenticated ? (
              <Matchmaking setAuth={setAuth} />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route
          path="/workspace/:sessionId"
          element={ <Workspace/> }
        />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
