'use client'
import { useParams } from 'next/navigation';
import { useEffect, useState, useRef } from 'react';
import Timer from '@/app/components/Collaboration/Timer';
import LanguageSelector from '@/app/components/Collaboration/LanguageSelect';
import QuestionDropdown from '@/app/components/Collaboration/QuestionDropdown';
import { LeftPanel, RightPanel } from '@/app/components/Collaboration/Panels';
import ChatComponent from '@/app/components/ChatService/ChatComponent';

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
  const [isTimeUp, setTimeIsUp] = useState<boolean>(false);

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
        setTimeLeft(data.timeLeft);
      }
      if (data.hasOwnProperty('sideJoined')) {
        setSideJoined(data.sideJoined);
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
      setSideJoined(side);
      ws.send(message);
    } else {
      console.log('WebSocket is not open');
    }
  };

  const handleTimeUp = (timeIsUp: boolean) => {
    if (timeIsUp) {
      console.log('Time is up!');
      setTimeIsUp(true);
    }
  };
  const [language, setLanguage] = useState('javascript');

  const leftPanelProps = {
    sideJoined,
    language,
    setLanguage,
    leftEditorValue,
    setLeftEditorValue,
    handleJoin,
    buttonsState,
    allowed,
    sessionId,
  };

  const rightPanelProps = {
    sideJoined,
    language,
    setLanguage,
    rightEditorValue,
    setRightEditorValue,
    handleJoin,
    buttonsState,
    allowed,
    sessionId,
  };

  return (
    <div className='min-h-screen flex flex-col'>
      <div className='flex justify-between'>
        <LeftPanel {...leftPanelProps} />
        <Timer duration={timeLeft} onTimeUp={handleTimeUp} />
        <RightPanel {...rightPanelProps} />
      </div>
      <div className="border-dashed border">
        {(isTimeUp) && <ChatComponent sessionId={sessionId} />}
      </div>
    </div>
  );
};

export default CollaborationSession;