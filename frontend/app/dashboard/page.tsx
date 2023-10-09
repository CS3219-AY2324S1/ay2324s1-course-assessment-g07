'use client';
import React from 'react';
import LandingPageNavBar from '../components/NavigationBar/NavigationBar';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Matchmaking from '../components/Matchmaking/Matchmaking';
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
      <div className="container mx-auto flex md:flex-row flex-col">
        <LandingPageNavBar isAuthenticated={true} />
      </div>
      <div className="container mx-auto flex md:flex-row flex-col items-center pt-10 max-w-5xl ">
        <div className="ml-6 mr-4 lg:flex-grow md:w-5/6 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
          <h1 className="title-font sm:text-lg mb-4 font-bold">Leaderboards</h1>
          <div className="tabs">
            <a className="tab tab-bordered">Today</a>
            <a className="tab tab-bordered tab-active">This Week</a>
            <a className="tab tab-bordered">This Month</a>
            <a className="tab tab-bordered">All Time</a>
          </div>
          <div className="overflow-x-auto">
            <table className="table">
              {/* head */}
              <thead>
                <tr>
                  <th></th>
                  <th>Name</th>
                  <th>Hard</th>
                  <th>Medium</th>
                  <th>Easy</th>
                </tr>
              </thead>
              <tbody>
                {/* row 1 */}
                <tr>
                  <th>1</th>
                  <td>Cy Ganderton</td>
                  <td>0</td>
                  <td>0</td>
                  <td>0</td>
                </tr>
                {/* row 2 */}
                <tr>
                  <th>2</th>
                  <td>Hart Hagerty</td>
                  <td>0</td>
                  <td>0</td>
                  <td>0</td>
                </tr>
                {/* row 3 */}
                <tr>
                  <th>3</th>
                  <td>Brice Swyre</td>
                  <td>0</td>
                  <td>0</td>
                  <td>0</td>
                </tr>
                {/* row 4 */}
                <tr>
                  <th>4</th>
                  <td>Margarette Pol</td>
                  <td>0</td>
                  <td>0</td>
                  <td>0</td>
                </tr>
                {/* row 5 */}
                <tr>
                  <th>5</th>
                  <td>Lucy Douglas</td>
                  <td>0</td>
                  <td>0</td>
                  <td>0</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <Matchmaking />
      </div>
      <div className="ontainer mx-auto flex md:flex-row flex-col items-center pt-10 max-w-5xl ">
        <h1 className="ml-6 title-font sm:text-lg mb-4 font-bold">History</h1>
        <div className="ml-6"></div>
      </div>
    </section>
  );
};

export default Dashboard;
