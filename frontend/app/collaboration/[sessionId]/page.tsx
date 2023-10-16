'use client'
import { useRouter, useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import CollabEditor from '@/app/components/Collaboration/CollabEditor';
import Timer from '@/app/components/Collaboration/Timer';

const CollaborationSession = () => {
  const { sessionId } = useParams(); 
  const [ws, setWs] = useState<WebSocket | null>(null);
  const [allowed, setAllowed] = useState(false);
  const [userId, setUserId] = useState('');
  const [sideJoined, setSideJoined] = useState<string | null>(null);

  const [leftEditorValue, setLeftEditorValue] = useState<string>('');
  const [rightEditorValue, setRightEditorValue] = useState<string>('');
  
  const [buttonsState, setButtonsState] = useState( { left: true, right: true });
  const [timeLeft, setTimeLeft] = useState<number>(10000);

  useEffect(() => {
    const storedLeftEditorValue = localStorage.getItem('leftEditorValue') || '';
    const storedRightEditorValue = localStorage.getItem('rightEditorValue') || '';
    setLeftEditorValue(storedLeftEditorValue);
    setRightEditorValue(storedRightEditorValue);
    const present = localStorage.getItem('side');
    if(present){
      setSideJoined(localStorage.getItem('side'));
    }  

  }, []);


  useEffect(() => {
    const websocket = new WebSocket(`ws://localhost:8004/${sessionId}`);

    websocket.onopen = () => {
      const storedUserId = localStorage.getItem('userid');

      if(storedUserId)  {
        setUserId(storedUserId);
      } 
      
      websocket.send(JSON.stringify({ userId: storedUserId  }));
    };

    websocket.onmessage = (message) => {
      const data = JSON.parse(message.data);
      console.log('Received message:', data);

        if (data.hasOwnProperty('allowed')) {
          setAllowed(data.allowed);
        } 
        if (data.hasOwnProperty('buttonsState')) { 
          setButtonsState(data.buttonsState);
        } 
        if (data.hasOwnProperty('timeLeft')) {
          // Update the timer in your state/UI
          setTimeLeft(data.timeLeft);
        }
    };
  
    websocket.onclose = () => {
      console.log('WebSocket is closed');
    };

    setWs(websocket);
  }, [sessionId]);

  const handleJoin = (side: string) => {
    if (ws && ws.readyState === WebSocket.OPEN) {
      const message = JSON.stringify({
        type: 'JOIN',
        side,
        userId
      });
      localStorage.setItem('side', side);
      setSideJoined(side);
      ws.send(message);
    } else {
      console.log('WebSocket is not open');
    }
  };

  const handleTimeUp = (timeIsUp: boolean) => {
    if (timeIsUp) {
      console.log('Time is up!');
      //set flag
    }
  };

  return (
      <div>
        <Timer duration={timeLeft} onTimeUp={handleTimeUp} />
      <div style={{ display: 'flex', justifyContent: 'space-between', height: '400px' }}>
      <div style={{ flex: '1', marginRight: '8px' }}>
        <CollabEditor 
          side="left" 
          sideJoined={sideJoined} 
          editorValue={leftEditorValue} 
          setEditorValue={setLeftEditorValue}
          onJoin={handleJoin}
          disabled={!buttonsState.left || !allowed || sideJoined === 'right'}
          buttonState={buttonsState.left}
        />
        </div>
        <div style={{ flex: '1', marginLeft: '8px' }}>
        <CollabEditor 
          side="right" 
          sideJoined={sideJoined} 
          editorValue={rightEditorValue} 
          setEditorValue={setRightEditorValue}
          onJoin={handleJoin}
          disabled={!buttonsState.right || !allowed || sideJoined === 'left'}
          buttonState={buttonsState.right}
        />
      </div>
      </div>
      </div>
    );
};

export default CollaborationSession;