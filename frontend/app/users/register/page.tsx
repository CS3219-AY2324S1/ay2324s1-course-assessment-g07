'use client';

import React from 'react';
import LandingPageNavBar from '../../components/NavigationBar/NavigationBar';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

const RegisterPage = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleRegister = async (e: any) => {
    console.log('register button clicked');
    e.preventDefault();

    const { username, email, password, confirmPassword } = formData;

    if (!username || !email || !password || !confirmPassword) {
      toast.error('Please fill in all the fields.');
      return;
    }

    if (email) {
      console.log('Email verification done.');
    }

    if (password !== confirmPassword) {
      toast.error('Passwords do not match. Please try again.');
      return;
    }

    if (username) {
      const response = await fetch('http://localhost:8000/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
      });

      const responseData = await response.json();
      if (response.status === 200) {
        toast.success('Registration successful!');
        router.push('/users/login');
      } else {
        toast.error(responseData.message);
      }
    } else {
      toast.error('Invalid username or password. Please try again.');
    }
  };

  return (
    <section className="text-white body-font">
      <div className="container mx-auto flex md:flex-row flex-col">
        <LandingPageNavBar />
      </div>
      <div className="container px-5 pb-12 mx-auto flex flex-wrap items-center">
        <div className="lg:w-2/6 md:w-1/2 bg-transparent rounded-lg p-8 flex flex-col md:mx-auto w-full mt-10 md:mt-0">
          <h2 className="text-white text-lg font-medium title-font mb-5">
            Sign Up
          </h2>
          <div className="relative mb-4">
            <label className="label">
              <span className="label-text">Username</span>
            </label>
            <input
              type="string"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="input input-bordered h-10 w-full max-w-sm  focus:border-indigo-500 text-white transition-colors duration-200 ease-in-out hover:border-indigo-300"
            />
          </div>
          <div className="relative mb-4">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="string"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="input input-bordered h-10 w-full max-w-sm  focus:border-indigo-500 text-white transition-colors duration-200 ease-in-out hover:border-indigo-300"
            />
          </div>
          <div className="relative mb-4">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="input input-bordered h-10 w-full max-w-sm  focus:border-indigo-500 text-white transition-colors duration-200 ease-in-out hover:border-indigo-300"
            />
          </div>
          <div className="relative mb-4">
            <label className="label">
              <span className="label-text">Confirm Password</span>
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="input input-bordered h-10 w-full max-w-sm  focus:border-indigo-500 text-white transition-colors duration-200 ease-in-out hover:border-indigo-300"
            />
          </div>
          <button
            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            onClick={handleRegister}
          >
            Register
          </button>
          <a
            className="link link-primary mt-2 text-blue-200 hover:text-blue-400"
            href="/users/login"
          >
            I have already created an account!
          </a>
        </div>
      </div>
    </section>
  );
};

export default RegisterPage;
