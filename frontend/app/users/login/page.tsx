'use client';
import React from 'react';
import LandingPageNavBar from '../../components/NavigationBar/NavigationBar';
import { useHttpClient } from '../../hooks/http-hooks';
import { toast } from 'react-toastify';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const LoginPage = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const { sendRequest } = useHttpClient();

  const handleLogin = async (e: any) => {
    console.log('Login button clicked');
    e.preventDefault();

    const { email, password } = formData;
    if (email && password) {
      console.log('Sending Request');
      const response = await sendRequest(
        'http://localhost:8000/users/login',
        'POST',
        JSON.stringify({ email, password }),
        {
          'Content-Type': 'application/json',
        }
      );

      if (response && response.status === 200) {
        const responseData = await response.json();
        console.log('Authentication successful');
        toast.success('Authentication successful');
        localStorage.setItem('token', responseData.token);
        localStorage.setItem('username', responseData.user.user_id);
        localStorage.setItem('username', responseData.user.username);
        localStorage.setItem('email', responseData.user.email);
        localStorage.setItem('role', responseData.user.role);
        // setAuth(true);
        router.push('/dashboard');
      } else {
        toast.error('Invalid username or password. Please try again.');
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
            Login
          </h2>
          <div className="relative mb-4">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="text"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
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
              required
              className="input input-bordered h-10 w-full max-w-sm  focus:border-indigo-500 text-white transition-colors duration-200 ease-in-out hover:border-indigo-300"
            />
          </div>
          <button
            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            onClick={handleLogin}
          >
            Login
          </button>
          <a
            className="link link-primary mt-2 text-blue-200 hover:text-blue-400"
            href="/users/register"
          >
            I have not created an account!
          </a>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
