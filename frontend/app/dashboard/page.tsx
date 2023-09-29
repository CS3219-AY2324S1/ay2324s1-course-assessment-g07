'use client';
import React from 'react';
import LandingPageNavBar from '../components/NavigationBar/NavigationBar';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';


const Dashboard = () => {
  const router = useRouter();

  const [activeButton, setActiveButton] = useState(null);

  const setActive = (button: any) => {
    setActiveButton(button);
  };

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
        <div className="mr-4 lg:flex-grow md:w-1/3 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
          <h1 className="title-font sm:text-lg mb-2 font-bold">Race</h1>
          <p className="mb-1 leading-relaxed text-sm">
            Click on "Search for an opponent" and we will match you up against
            an opponent!
          </p>
          <button className="btn btn-outline btn-primary btn-block" onClick={ () => {router.push('/matchmaking') }}>
            Search for an opponent
          </button>
        </div>

      </div>
      <div className="ontainer mx-auto flex md:flex-row flex-col items-center pt-10 max-w-5xl ">
        <h1 className="ml-6 title-font sm:text-lg mb-4 font-bold">History</h1>
        <div className="ml-6"></div>
      </div>
    </section>
  );
};

export default Dashboard;
