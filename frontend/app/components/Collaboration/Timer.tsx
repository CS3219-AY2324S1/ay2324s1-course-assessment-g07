import React, { useEffect, useState } from 'react';

interface TimerProps {
  duration: number;
  onTimeUp: (timeIsUp: boolean) => void;
}

const Timer: React.FC<TimerProps> = ({ duration, onTimeUp }) => {
  const [timeLeft, setTimeLeft] = useState<number>(duration);

  useEffect(() => {
    // Calculate the end time when the component mounts
    const storedEndTime = localStorage.getItem('endTime');
    const currentTime = new Date().getTime();
    let endTime: number;

    const timerExpired = localStorage.getItem('timerExpired');

    if (storedEndTime && parseInt(storedEndTime, 10) > currentTime) {
      // Use stored end time if available and not expired
      endTime = parseInt(storedEndTime, 10);
      setTimeLeft(endTime - currentTime);
    } else if (timerExpired) {
      setTimeLeft(0);
    } else {
      // Otherwise, set a new end time
      endTime = currentTime + duration;
      localStorage.setItem('endTime', endTime.toString());
      setTimeLeft(endTime - currentTime);
    }


    // Setup interval to update time left
    const timerInterval = setInterval(() => {
      setTimeLeft((prev) => prev - 1000);
    }, 1000);

    return () => {
      clearInterval(timerInterval);
    };
  }, [duration]);

  useEffect(() => {
    if (timeLeft <= 0) {
      setTimeLeft(0);
      localStorage.removeItem('endTime'); // Clear stored end time
      localStorage.setItem('timerExpired', 'true'); // Indicate timer has expired
      onTimeUp(true);
    }
  }, [timeLeft, onTimeUp]);

  return (
    <div className="radial-progress m-2 w-16 h-16 text-blue-600"
      style={
        { '--value': (timeLeft) / 1000 } as any
      } >
      <p>{Math.round(timeLeft / 1000)} </p>
    </div>
  );
};

export default Timer;
