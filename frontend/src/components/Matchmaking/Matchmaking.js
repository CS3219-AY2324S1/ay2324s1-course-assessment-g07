import React, { useState, useEffect } from 'react';
import './Matchmaking.css'
import TimeCounter from './TimeCounter.js';

const Matchmaking = ({ setAuth, isAuthenticated }) => {
  const maxWaitingTime = 10;
  const redirectToWorkspace = 5;

  const [message, setMessage] = useState('');
  const [ws, setWs] = useState(null);
  const [searching, setSearching] = useState(false);
  const [searchTimeout, setSearchTimeout] = useState(false);
  const [timeoutId, setTimeoutId] = useState();
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
    const socket = new WebSocket('ws://localhost:4000/matchmaking');

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

  const handleSearch = async (searchComplexity) => {
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
      }
    }
  };

  const handleRemove = (complexity) => {
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

  const handleRedirectToWorkspace = ( sessionId) => {
    setTimeout(() => {
      console.log("redirecting to ", sessionId);
      window.location.href = `/workspace/${sessionId}`;
    }, redirectToWorkspace * 1000); 
  }

  return (
    <div className="matchmaking-panel">
      <div className="matchmaking-title">Find your teammate here</div>
      {!searching && !isMatched && <div>
          <div className='matchmaking-search-category'>
          <div className='matchmaking-text'>Choose the complexity of the problem:</div>
          <select
            id="complexity"
            value={searchComplexity}
            onChange={(e) => setSearchComplexity(e.target.value)}
            required
            >
            <option value="Any">Any Complexity</option>
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>
        </div>
        <div className="matchmaking-search-button">
          <button onClick={() => handleSearch(searchComplexity)}>Search</button>
        </div>
      </div>
      }
      
      {searching && !isMatched && <div className='matchmaking-search-in-progress'>
        <div>Searching...</div>
        <TimeCounter waitingTime={maxWaitingTime}/>
        <div className='matchmaking-average-waiting-time'>Average waiting time: 
          <span>{averageWaitingTime == null ? 0 : averageWaitingTime.toFixed(1)}</span> s</div>
        <div className='matchmaking-cancel-search'>
          <button onClick={handleCancelSearch}>Cancel</button>
        </div>
      </div>}
      {searchTimeout && !isMatched && <div className='matchmaking-search-failed'>
        No teammate found. try again later.
      </div>}
      {isMatched && <div className='matchmaking-search-success'>
        <div>Teammate found!</div>
        <div>Redirecting to common workspace in</div>
        <TimeCounter waitingTime={redirectToWorkspace}/>
      </div>}
    </div>
  );
};

export default Matchmaking;
