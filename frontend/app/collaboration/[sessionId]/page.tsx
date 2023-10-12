'use client'
import { useRouter, useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import CollabEditor from '@/app/components/Collaboration/CollabEditor';


const CollaborationSession = () => {
  const router = useRouter();
  const { sessionId } = useParams(); 
  const [ws, setWs] = useState<WebSocket | null>(null);
  const [allowed, setAllowed] = useState(false);
  const [userId, setUserId] = useState('');
  const [sideJoined, setSideJoined] = useState<string | null>(null);

  const [leftEditorValue, setLeftEditorValue] = useState<string>('');
  const [rightEditorValue, setRightEditorValue] = useState<string>('');
  
  const initialButtonStateRaw = localStorage.getItem('buttonsState');
  const initialButtonState = initialButtonStateRaw ? JSON.parse(initialButtonStateRaw) : { left: true, right: true };
  const [buttonsState, setButtonsState] = useState(initialButtonState);


  useEffect(() => {
    const buttonsStateString = JSON.stringify(buttonsState);
    console.log(initialButtonState);
    localStorage.setItem('buttonsState', buttonsStateString);
  }, [buttonsState]);


  useEffect(() => {
    const storedLeftEditorValue = localStorage.getItem('leftEditorValue') || '';
    const storedRightEditorValue = localStorage.getItem('rightEditorValue') || '';
    setLeftEditorValue(storedLeftEditorValue);
    setRightEditorValue(storedRightEditorValue);

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

      setSideJoined(side);
      ws.send(message);
    } else {
      console.log('WebSocket is not open');
    }
  };

  return (
      <div>
        <h1>Collaboration Session: {sessionId}</h1>
        <div>
          <h2>Button States:</h2>
          <p>Left: {buttonsState.left ? "Enabled" : "Disabled"}</p>
          <p>Right: {buttonsState.right ? "Enabled" : "Disabled"}</p>
          </div>
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