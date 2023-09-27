import React, { useState } from 'react';
import './Login.css';
import { Link, useNavigate } from 'react-router-dom';
import { useHttpClient } from '../../hooks/http-hooks';
import { toast } from 'react-toastify';

const Login = ({ setAuth }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const { sendRequest } = useHttpClient();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { email, password } = formData;
    if (email && password) {
      console.log('email and password');
      console.log(email);
      console.log(password);
      const response = await sendRequest(
        'http://localhost:5000/users/login',
        'POST',
        JSON.stringify({ email, password }),
        {
          'Content-Type': 'application/json',
        }
      );

      if (response.status === 200) {
        const responseData = await response.json();
        console.log(responseData);
        console.log(responseData.token);
        console.log('Authentication successful');
        toast.success('Authentication successful');
        localStorage.setItem('token', responseData.token);
        localStorage.setItem('username', responseData.user.user_id);
        localStorage.setItem('username', responseData.user.username);
        localStorage.setItem('email', responseData.user.email);
        localStorage.setItem('role', responseData.user.role);
        setAuth(true);
        navigate('/questions');
      } else {
        toast.error('Invalid username or password. Please try again.');
      }
    } else {
      toast.error('Invalid username or password. Please try again.');
    }
  };

  return (
    <React.Fragment>
      <div className="login-container">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit">Login</button>
        </form>
        <p>
          Don't have an account? <Link to="/register">Register here</Link>
        </p>
      </div>
    </React.Fragment>
  );
};

export default Login;
