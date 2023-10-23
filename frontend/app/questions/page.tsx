'use client';
import React from 'react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import LandingPageNavBar from '../components/NavigationBar/NavigationBar';

const QuestionsPage = () => {
  const router = useRouter();
  useEffect(() => {
    const isAuthenticated = localStorage.getItem('role');

    if (!isAuthenticated || isAuthenticated !== 'maintainer') {
      router.push('/');
    }
  }, []);

  return (
    <section className="text-white">
      <div className="container mx-auto flex md:flex-row flex-col">
        <LandingPageNavBar isAuthenticated={true} />
      </div>
    </section>
  );
};

export default QuestionsPage;
