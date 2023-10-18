'use client'
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import CollabEditor from '@/app/components/Collaboration/CollabEditor';
import Timer from '@/app/components/Collaboration/Timer';
import LanguageSelector from '@/app/components/Collaboration/LanguageSelect';
import QuestionDropdown from '@/app/components/Collaboration/QuestionDropdown';
import {LeftPanel, RightPanel} from '@/app/components/Collaboration/Panels';


const CollaborationSession = () => {
  const { sessionId } = useParams();
  const [ws, setWs] = useState<WebSocket | null>(null);
  const [allowed, setAllowed] = useState(false);
  const [userId, setUserId] = useState('');
  const [sideJoined, setSideJoined] = useState<"left" | "right" | null>(null);

  const [leftEditorValue, setLeftEditorValue] = useState<string>('');
  const [rightEditorValue, setRightEditorValue] = useState<string>('');

  const [buttonsState, setButtonsState] = useState({ left: true, right: true });
  const [timeLeft, setTimeLeft] = useState<number>(100000);

  useEffect(() => {
    const storedLeftEditorValue = localStorage.getItem('leftEditorValue') || '';
    const storedRightEditorValue = localStorage.getItem('rightEditorValue') || '';
    setLeftEditorValue(storedLeftEditorValue);
    setRightEditorValue(storedRightEditorValue);
    const present = localStorage.getItem('side');
    if (present) {
      setSideJoined(localStorage.getItem('side'));
    }
  }, []);


  useEffect(() => {
    const websocket = new WebSocket(`ws://localhost:8004/${sessionId}`);

    websocket.onopen = () => {
      const storedUserId = localStorage.getItem('userid');

      if (storedUserId) {
        setUserId(storedUserId);
      }

      websocket.send(JSON.stringify({ userId: storedUserId }));
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

  const handleJoin = (side: "left" | "right") => {
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
  const [language, setLanguage] = useState('javascript');

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', height: '700px' }}>
      <LeftPanel
        sideJoined={sideJoined}
        language={language}
        setLanguage={setLanguage}
        leftEditorValue={leftEditorValue}
        setLeftEditorValue={setLeftEditorValue}
        handleJoin={handleJoin}
        buttonsState={buttonsState}
        allowed={allowed}
        sessionId={sessionId}
      />
      <Timer duration={timeLeft} onTimeUp={handleTimeUp} />
      <RightPanel
        sideJoined={sideJoined}
        language={language}
        setLanguage={setLanguage}
        rightEditorValue={rightEditorValue}
        setRightEditorValue={setRightEditorValue}
        handleJoin={handleJoin}
        buttonsState={buttonsState}
        allowed={allowed}
        sessionId={sessionId}
      />
    </div>
  );
};

export default CollaborationSession;