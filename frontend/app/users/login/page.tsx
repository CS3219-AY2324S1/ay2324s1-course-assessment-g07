'use client';
import React from 'react';
import Link from 'next/link';
import NavigationBar from '@/app/components/Server/NavigationBar/NavigationBar';
import { useHttpClient } from '../../hooks/http-hooks';
import { toast } from 'react-toastify';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Input, Button } from '@nextui-org/react';
import { MailIcon } from './MailIcon.jsx';
import { LockIcon } from './LockIcon.jsx';

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
        localStorage.setItem('userid', responseData.user.user_id);
        localStorage.setItem('username', responseData.user.username);
        localStorage.setItem('email', responseData.user.email);
        localStorage.setItem('role', responseData.user.role);
        // setAuth(true);
        // params.setIsAuthenticated(true);
        router.push('/dashboard');
      } else {
        toast.error('Invalid username or password. Please try again.');
      }
    } else {
      toast.error('Invalid username or password. Please try again.');
    }
  };

  return (
    <section className="text-white body-font p-4">
      <NavigationBar isAuthenticated={false} />
      <div className="container px-5 pb-12 mx-auto flex flex-wrap items-center">
        <div className="lg:w-2/6 md:w-1/2 bg-transparent rounded-lg p-8 flex flex-col md:mx-auto w-full mt-10 md:mt-0">
          {/* <div className="flex flex-col w-full border-opacity-50"> */}
          <h2 className="text-white text-lg font-medium title-font mb-8">
            Login
          </h2>
          <div className="relative mb-6">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <Input
              type="email"
              id="email"
              endContent={
                <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
              }
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              // className="input input-bordered h-10 w-full max-w-sm  focus:border-indigo-500 text-white transition-colors duration-200 ease-in-out hover:border-indigo-300"
            />
          </div>
          <div className="relative mb-6">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <Input
              type="password"
              id="password"
              name="password"
              endContent={
                <LockIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
              }
              value={formData.password}
              onChange={handleChange}
              required
              // className="input input-bordered h-10 w-full max-w-sm  focus:border-indigo-500 text-white transition-colors duration-200 ease-in-out hover:border-indigo-300"
            />
          </div>
          <Button
            color="primary"
            variant="ghost"
            // className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            onClick={handleLogin}
          >
            Login
          </Button>
          <Link
            className="link link-primary mt-2 text-blue-200 hover:text-blue-400"
            href="/users/register"
          >
            I have not created an account!
          </Link>
          {/* <div className="divider">OR</div>
            <div className="grid h-20 card bg-base-300 rounded-box place-items-center">
              content
            </div>
          </div> */}
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
