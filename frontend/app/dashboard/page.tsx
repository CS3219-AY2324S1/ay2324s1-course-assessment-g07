'use client';
import React from 'react';
import NavigationBar from '../components/Server/NavigationBar/NavigationBar';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Matchmaking from '../components/Matchmaking/Matchmaking';
import HistoryTable from '../components/History/HistoryTable';
import Leaderboard from '../components/Leaderboard/Leaderboard';
const Dashboard = () => {
  const router = useRouter();

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('token');

    if (!isAuthenticated) {
      router.push('/');
    }
  }, []);

  return (
    <section className="text-white">
      <NavigationBar isAuthenticated={true} />
      <div className="container mx-auto flex md:flex-row flex-col items-center pt-10 max-w-5xl ">
        <Leaderboard key="leaderboard"/>  
        <Matchmaking key="matchmaking"/>
      </div>
      <div className="container mx-auto flex md:flex-row flex-col items-center pt-10 max-w-5xl ">
        <div className="mr-4 lg:flex-grow md:w-5/6 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
          <div className="ml-6 w-full">
            <HistoryTable></HistoryTable>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
