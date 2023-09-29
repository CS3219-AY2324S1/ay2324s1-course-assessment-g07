'use client'
import React from "react";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
const MatchmakingWaiting = () => {
    // const router = useRouter();
    // useEffect(() => {
    //     const isAuthenticated = localStorage.getItem('role');

    //     if (!isAuthenticated || isAuthenticated !== 'maintainer') {
    //     router.push('/');
    //     }
    // }, []);

    
    // const maxWaitingTime = 10;
    // const redirectToWorkspace = 5;
  
    // const [message, setMessage] = useState('');
    // const [ws, setWs] = useState<WebSocket | null>(null);
    // const [searching, setSearching] = useState(false);
    // const [searchTimeout, setSearchTimeout] = useState(false);
    // const [timeoutId, setTimeoutId] = useState<number | null>();
    // const [searchComplexity, setSearchComplexity] = useState('Any');
    // const [averageWaitingTime, setAverageWaitingTime] = useState(0);
  
    // const [isMatched, setIsMatched] = useState(false);
  
    // // This useEffect runs whenever the 'message' prop changes
    // useEffect(() => {
    //   try {
    //     const parsedMessage = JSON.parse(message);
      
    //     if (parsedMessage.type === 'sessionId') {
    //     //   handleRedirectToWorkspace(parsedMessage.data);
    //     } else if (parsedMessage.type === 'averageWaitingTime') {
    //       setAverageWaitingTime(parsedMessage.data);
    //     }
    //   } catch (error) {
    //     console.log(error);
    //   }
    //   console.log(message);
    // }, [message]);
  
  
    // useEffect(() => {
    //   const socket = new WebSocket('ws://localhost:8002/matchmaking');
  
    //   socket.addEventListener('open', () => {
    //     console.log('WebSocket connection established');
    //   });
  
    //   socket.addEventListener('message', (event) => {
    //     const msg = event.data;
    //     setMessage(msg);
    //   });
  
    //   socket.addEventListener('close', () => {
    //     console.log('WebSocket connection closed');
    //   });
  
    //   setWs(socket);

    //   setSearchComplexity(complexity);
    //   handleSearch(complexity);
  
    //   // Cleanup the WebSocket connection when the component unmounts
    //   return () => {
    //     if (socket.readyState === WebSocket.OPEN) {
    //       socket.close();
    //     }
    //   };


    // }, []);
  
    // const handleSearch = async (searchComplexity : string) => {
    //   console.log(ws)
    //   if (!searching && !isMatched && ws && ws.readyState === WebSocket.OPEN) {
    //     setSearching(true);
    //     setSearchTimeout(false);
    //     const requestForSearch = {
    //       type: 'searchForTeam',
    //       complexity: searchComplexity,
    //     };
  
       
    
    //     const searchPromise = new Promise((resolve) => {
    //       ws.send(JSON.stringify(requestForSearch));
  
    //       console.log('Started searching');
    //       ws.addEventListener('message', (event) => {
    //         const msg = event.data;
    //         if (msg === 'matched') {
    //           setIsMatched(true);
    //           resolve('matched');
    //         }
    //       });
    //     });
    
    //     const timeoutPromise = new Promise((resolve) => {
    //     //   const timeoutId = setTimeout(() => {
    //     //     resolve('timeout');
    //     //   }, maxWaitingTime * 1000);
    //     //   setTimeoutId(timeoutId);
    //     });
  
    
    //     const result = await Promise.race([searchPromise, timeoutPromise]);
    
    //     if (result === 'timeout') {
    //       handleRemove(searchComplexity);
    //       setSearching(false);
    //       setSearchTimeout(true);
    //       console.log('Removed from the queue due to timeout');
    //       setTimeoutId(null);
    //     }
    //   }
    // };
  
    // const handleRemove = (complexity : string) => {
    //   if (ws && ws.readyState === WebSocket.OPEN) {
    //     const request = {
    //       type: 'removeMeFromQueue',
    //       complexity: complexity,
    //     };
    
    //     ws.send(JSON.stringify(request));
    //     console.log('Sent request to remove from the queue');
    //   }
    // };
  
    // const handleCancelSearch = () => {
    //   handleRemove(searchComplexity);
    //   setIsMatched(false);
    //   setSearching(false);
    // //   setSearchTimeout(false);
    // //   clearTimeout(timeoutId);
    // }
  
    // const handleRedirectToWorkspace = ( sessionId ) => {
    //   setTimeout(() => {
    //     console.log("redirecting to ", sessionId);
    //     window.location.href = `/workspace/${sessionId}`;
    //   }, redirectToWorkspace * 1000); 
    // }
  


    return (
        <div className="matchmaking-panel">
           
            <div>Searching...</div>
            {/* <TimeCounter waitingTime={maxWaitingTime}/> */}
            {/* <div className='matchmaking-average-waiting-time'>Average waiting time: 
                <span>{averageWaitingTime == null ? 0 : averageWaitingTime.toFixed(1)}</span> s</div>
            <div className='matchmaking-cancel-search'>
                <button onClick={handleCancelSearch}>Cancel</button>
            </div>           */}
           
        </div>
        );
}

export default MatchmakingWaiting;
