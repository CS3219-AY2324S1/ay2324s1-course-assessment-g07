import React from 'react';
import LandingPageNavBar from '../../components/NavigationBar/NavigationBar';

const LoginPage = () => {
  return (
    <section className="text-gray-600 body-font">
      <div className="container mx-auto flex md:flex-row flex-col">
        <LandingPageNavBar />
      </div>
      <div className="container px-5 py-12 mx-auto flex flex-wrap items-center">
        <div className="lg:w-2/6 md:w-1/2 bg-gray-100 rounded-lg p-8 flex flex-col md:mx-auto w-full mt-10 md:mt-0">
          <h2 className="text-gray-900 text-lg font-medium title-font mb-5">
            Login
          </h2>
          <div className="relative mb-4">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
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
              className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
          <button className="btn btn-primary rounded text-lg mt-2">
            Login
          </button>
          <a className="link link-primary mt-2" href="/users/register">
            I have not created an account!
          </a>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
