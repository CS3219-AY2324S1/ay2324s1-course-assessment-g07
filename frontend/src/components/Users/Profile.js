import React, { useEffect, useState } from 'react';
import './Profile.css';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Profile = ({ setAuth }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: 'Not set',
    email: 'Not set',
  });

  useEffect(() => {
    setFormData({
      username: localStorage.getItem('username'),
      email: localStorage.getItem('email'),
    });
  }, []);

  const { username, email } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    try {
      const oldUsername = localStorage.getItem('username');
      const oldEmail = localStorage.getItem('email');
      const body = { username, email, oldUsername, oldEmail };

      const response = await fetch('http://localhost:5000/users/update', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          token: localStorage.token,
        },
        body: JSON.stringify(body),
      });

      if (response.ok) {
        const responseData = await response.json();
        localStorage.setItem(
          'username',
          responseData.updatedUserDetail.username
        );
        localStorage.setItem('email', responseData.updatedUserDetail.email);
        toast.success('Profile updated successfully!');
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  const onDeleteAccount = async (e) => {
    e.preventDefault();
    try {
      const oldUsername = localStorage.getItem('username');
      const oldEmail = localStorage.getItem('email');
      const body = { oldUsername, oldEmail };
      const response = await fetch('http://localhost:5000/users/delete', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          token: localStorage.token,
        },
        body: JSON.stringify(body),
      });

      if (response.ok) {
        toast.success('Account deleted successfully!');
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        localStorage.removeItem('email');
        setAuth(false);
        navigate('/login');
      } else {
        toast.error('Account deletion failed!');
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div className="profile">
      <h2>Profile</h2>
      <form onSubmit={handleUpdateProfile}>
        <div className="form-row">
          <div className="form-col">
            <label htmlFor="username">Username</label>
            <input
              type="username"
              id="username"
              name="username"
              value={username}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-col">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              id="email"
              name="email"
              value={email}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-col">
            <button type="submit">Update Profile</button>
          </div>
        </div>
      </form>
      <div className="form-row">
        <div className="form-col">
          <button className="delete-button" onClick={onDeleteAccount}>
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
