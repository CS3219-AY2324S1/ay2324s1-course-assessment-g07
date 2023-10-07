'use client'
import React from "react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import TimeCounter from "../components/Matchmaking/TimeCounter";
import LandingPageNavBar from "../components/NavigationBar/NavigationBar";
import "./page.css";
const Matchmaking = () => {
    const router = useRouter();
    useEffect(() => {
        const isAuthenticated = localStorage.getItem('role');
        console.log(isAuthenticated);
        if (!(isAuthenticated || isAuthenticated !== 'maintainer')) {
          router.push('/');
        }
    }, []);

    // const [searchComplexity, setSearchComplexity] = useState(null);

    // const setActive = (button: any) => {
    //   setSearchComplexity(button);
    // };

    const maxWaitingTime = 10;
    const redirectToWorkspace = 5;
  
    const [message, setMessage] = useState('');
    const [ws, setWs] = useState<WebSocket | null>(null);
    const [searching, setSearching] = useState(false);
    const [searchTimeout, setSearchTimeout] = useState(false);
    const [timeoutId, setTimeoutId] = useState<any | null>();
    const [searchComplexity, setSearchComplexity] = useState('Any');
    const [averageWaitingTime, setAverageWaitingTime] = useState(0);
  
    const [isMatched, setIsMatched] = useState(false);
  
    // This useEffect runs whenever the 'message' prop changes
    useEffect(() => {
      if (message != "") {
        console.log(message);
        try {
          const parsedMessage = JSON.parse(message);
        
          if (parsedMessage.type === 'sessionId') {
            handleRedirectToWorkspace(parsedMessage.data);
          } else if (parsedMessage.type === 'averageWaitingTime') {
            setAverageWaitingTime(parsedMessage.data);
          }
        } catch (error) {
          console.log(error);
        }
      }

    }, [message]);
  
  
    useEffect(() => {
      const socket = new WebSocket('ws://localhost:8002');
  
      socket.addEventListener('open', () => {
        console.log('WebSocket connection established by user.');
        const username = localStorage.username;
        const userId = localStorage.userid;
        const request = {
          type: 'setUserInfo',
          data: {
            userId: userId,
            username: username
          }
      };
  
        socket.send(JSON.stringify(request));
      });
  
      socket.addEventListener('message', (event) => {
        const msg = event.data;
        setMessage(msg);
      });
  
      socket.addEventListener('close', () => {
        console.log('WebSocket connection closed');
        const request = {
          type: 'disconnect'
        };
        socket.send(JSON.stringify(request));
        handleCancelSearch();
      });
  
      setWs(socket);
  
      // Cleanup the WebSocket connection when the component unmounts
      return () => {
        if (socket.readyState === WebSocket.OPEN) {
          socket.close();
        }
      };


    }, []);
  
    const handleSearch = async (searchComplexity : string) => {
      console.log(ws)
      if (!searching && !isMatched && ws && ws.readyState === WebSocket.OPEN) {
        setSearching(true);
        setSearchTimeout(false);
        const requestForSearch = {
          type: 'searchForTeam',
          complexity: searchComplexity,
          questionType: 'placeholder-type'
        };
    
        const searchPromise = new Promise((resolve) => {
          ws.send(JSON.stringify(requestForSearch));
  
          console.log('Started searching');
          ws.addEventListener('message', (event) => {
            const msg = event.data;
            if (msg === 'matched') {
              setIsMatched(true);
              resolve('matched');
            }
          });
        });
    
        const timeoutPromise = new Promise((resolve) => {
          const timeoutId = setTimeout(() => {
            resolve('timeout');
          }, maxWaitingTime * 1000);
          setTimeoutId(timeoutId);
        });
  
    
        const result = await Promise.race([searchPromise, timeoutPromise]);
    
        if (result === 'timeout') {
          handleRemove(searchComplexity);
          setSearchTimeout(true);
          console.log('Removed from the queue due to timeout');
          setTimeoutId(null);
          router.push('/matchmaking/failure');
        }
      }
    };
  
    const handleRemove = (complexity : string) => {
      if (ws && ws.readyState === WebSocket.OPEN) {
        const request = {
          type: 'removeMeFromQueue',
          complexity: complexity,
        };
    
        ws.send(JSON.stringify(request));
        console.log('Sent request to remove from the queue');
      }
    };
  
    const handleCancelSearch = () => {
      handleRemove(searchComplexity);
      setIsMatched(false);
      setSearching(false);
      setSearchTimeout(false);
      clearTimeout(timeoutId);
    }

    const handleRedirectToWorkspace = ( sessionId:any ) => {
        router.push(`matchmaking/success?sessionId=${sessionId}`);
    }
  
    return (
      <section>
        { !searching && <div className="container mx-auto flex md:flex-row flex-col">
          <LandingPageNavBar isAuthenticated={true} />
        </div>}
        <div className="matchmaking-container">
            {!searching &&
              <div className="matchmaking-select-panel">
                <h1 className="matchmaking-select-title">Race</h1>
                <p className="matchmaking-select-notification">
                Select a difficulty level!
                </p>
                <div className="matchmaking-select-button">
                  <button className={`btn btn-outline btn-info btn-block mb-2 ${ searchComplexity === 'Any' ? 'btn-active' : '' }`}
                  onClick={() => setSearchComplexity('Any')}
                  >
                  Any
                  </button>
                </div>
                <div className="matchmaking-select-button">
                  <button className={`btn btn-outline btn-success btn-block mb-2 ${ searchComplexity === 'Easy' ? 'btn-active' : '' }`}
                  onClick={() => setSearchComplexity('Easy')}
                  >
                  Easy
                  </button>
                </div>
                <div className="matchmaking-select-button">
                  <button className={`btn btn-outline btn-warning btn-block mb-2 ${ searchComplexity === 'Medium' ? 'btn-active' : '' }`}
                  onClick={() => setSearchComplexity('Medium')}
                  >
                  Medium
                  </button>
                </div>
                <div className="matchmaking-select-button">
                  <button className={`btn btn-outline btn-error btn-block mb-2 ${ searchComplexity === 'Hard' ? 'btn-active' : '' }`}
                  onClick={() => setSearchComplexity('Hard')}
                  >
                  Hard
                  </button>
                </div>
                <p className="matchmaking-select-notification">
                Click on "Search for an opponent" and we will match you up against
                an opponent!
                </p>
                <button className="btn btn-outline btn-info btn-block" onClick={ () => handleSearch(searchComplexity) } >
                Search for an opponent
                </button>
            </div>
            }
            { searching && !isMatched && 
                <div className="matchmaking-countdown">
                    <div className="matchmaking-countdown-text">Searching for teammates...</div>
                    <div className="matchmaking-timecounter" >
                      <TimeCounter waitingTime={ maxWaitingTime }></TimeCounter>
                    </div>
                    <div className="matchmaking-select-notification">
                      Average waiting time: {averageWaitingTime == null ? 0 : averageWaitingTime.toFixed(1)}s
                    </div>
                    <div className="matchmaking-cancel-button">
                      <button
                      className={`btn btn-outline btn-error btn-block mb-2`}
                      onClick={ handleCancelSearch }
                      >
                      Cancel
                      </button>
                    </div>
                    
                </div>
            }
            
        </div>
      </section>
      );
}

export default Matchmaking;


