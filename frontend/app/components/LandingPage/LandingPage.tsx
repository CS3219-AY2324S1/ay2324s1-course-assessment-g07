import React from 'react';
import Image from 'next/image';
import LandingPageImage from '../../images/LandingPage.png';
import GetStartedButton from './GetStartedButton';
import LandingPageNavBar from '../NavigationBar/NavigationBar';

const LandingPage = () => {
  return (
    <section className="text-white  body-font">
      <div className="container mx-auto flex md:flex-row flex-col">
        <LandingPageNavBar />
      </div>
      <div className="container mx-auto flex md:flex-row flex-col items-center pt-36 max-w-5xl ">
        <div className="ml-6 lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
          <h1 className="title-font sm:text-4xl mb-4 font-bold">
            Coding Interviews
            <br className="hidden lg:inline-block" />
            Made Fun
          </h1>
          <p className="mb-8 leading-relaxed text-xl">
            Excel in your technical interviews today!
          </p>
          <div className="flex justify-center">
            <GetStartedButton />
          </div>
        </div>
        <div className="mr-4 lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
          <Image
            src={LandingPageImage}
            alt="hero"
            className="object-cover object-center rounded"
            width={720}
            height={600}
          ></Image>
        </div>
      </div>
    </section>
  );
};

export default LandingPage;
