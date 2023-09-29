'use client'
import React from "react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import TimeCounter from "../components/Matchmaking/TimeCounter";
const Matchmaking = () => {
    const router = useRouter();
    useEffect(() => {
        const isAuthenticated = localStorage.getItem('role');
        console.log(isAuthenticated);
        if (!isAuthenticated || isAuthenticated !== 'maintainer') {
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
      console.log(message);
    }, [message]);
  
  
    useEffect(() => {
      const socket = new WebSocket('ws://localhost:8002/matchmaking');
  
      socket.addEventListener('open', () => {
        console.log('WebSocket connection established');
      });
  
      socket.addEventListener('message', (event) => {
        const msg = event.data;
        setMessage(msg);
      });
  
      socket.addEventListener('close', () => {
        console.log('WebSocket connection closed');
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
          setSearching(false);
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
        console.log("redirecting to ", sessionId);
        router.push('matchmaking/success');
    }
  
    return (
        <div className="mr-4 lg:flex-grow md:w-1/3 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
            <div className="matchmaking-select-panel">
                <h1 className="title-font sm:text-lg mb-2 font-bold">Race</h1>
                <p className="mb-1 leading-relaxed text-sm">
                Select a difficulty level!
                </p>
                <button
                className={`btn btn-outline btn-success btn-block mb-2 ${
                    searchComplexity === 'Any' ? 'btn-active' : ''
                }`}
                onClick={() => setSearchComplexity('Any')}
                >
                Any
                </button>
                <button
                className={`btn btn-outline btn-success btn-block mb-2 ${
                    searchComplexity === 'Easy' ? 'btn-active' : ''
                }`}
                onClick={() => setSearchComplexity('Easy')}
                >
                Easy
                </button>
                <button
                className={`btn btn-outline btn-warning btn-block mb-2 ${
                    searchComplexity === 'Medium' ? 'btn-active' : ''
                }`}
                onClick={() => setSearchComplexity('Medium')}
                >
                Medium
                </button>
                <button
                className={`btn btn-outline btn-error btn-block mb-2 ${
                    searchComplexity === 'Hard' ? 'btn-active' : ''
                }`}
                onClick={() => setSearchComplexity('Hard')}
                >
                Hard
                </button>
                <p className="mb-1 leading-relaxed text-sm">
                Click on "Search for an opponent" and we will match you up against
                an opponent!
                </p>
                <button className="btn btn-outline btn-primary btn-block" onClick={ () => handleSearch(searchComplexity) } >
                Search for an opponent
                </button>
            </div>

            { searching && !isMatched && 
                <div>
                    Searching....
                    <TimeCounter waitingTime={ maxWaitingTime }></TimeCounter>
                    <button
                    className={`btn btn-outline btn-error btn-block mb-2`}
                    onClick={ handleCancelSearch }
                    >
                    Cancel
                    </button>
                </div>
            }
            
        </div>
        );
}

export default Matchmaking;


