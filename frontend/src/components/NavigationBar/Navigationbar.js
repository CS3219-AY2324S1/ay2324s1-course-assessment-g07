import React from 'react';
import { Link } from 'react-router-dom'; 
import './Navigationbar.css';
import { toast } from 'react-toastify';

const Navbar = ({ setAuth, isAuthenticated }) => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">Assignment</div>
      {isAuthenticated ? (
        <ul className="navbar-links">
          <li className="navbar-link">
            <Link to="/questions">Questions</Link>
          </li>
          <li className="navbar-link">
            <Link to="/profile">Profile</Link>
          </li>
        </ul>
      ) : (
        <ul className="navbar-links">
          <li className="navbar-link">
            <Link to="/profile"> </Link>
          </li>
        </ul>
      )}

      <div className="nav-profile">
        <button className="nav-profile-button">
          {isAuthenticated ? (
            <Link
              to="/login"
              onClick={(e) => {
                e.preventDefault();
                localStorage.removeItem('token');
                localStorage.removeItem('username');
                localStorage.removeItem('email');
                localStorage.removeItem('role');
                setAuth(false);
                toast.success('Logout successful');
              }}
            >
              Logout
            </Link>
          ) : (
            <Link to="/login">Login</Link>
          )}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
