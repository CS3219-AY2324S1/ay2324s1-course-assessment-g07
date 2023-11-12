'use client';
import React, { useEffect, useState } from 'react';

interface TimerProps {
  // duration: number;
  // onTimeUp: (timeIsUp: boolean) => void;
}

const Timer: React.FC<TimerProps> = () => {
  const [timeWaited, setTimeWaited] = useState<number>(0);

  useEffect(() => {
    const currentTime = new Date().getTime();

    const timerInterval = setInterval(() => {
      setTimeWaited((prev) => prev + 1000);
    }, 1000);

    return () => {
      clearInterval(timerInterval);
    };
  }, []);


  return (

    <div>
      <div className="flex gap-5">
        <div className="ml-auto ">
          <span className="countdown font-mono text-4xl">
            <span style={{ '--value': Math.floor(Math.round(timeWaited/1000)/60) } as any}></span>
          </span>
          min
        </div>
        <div>
          <span className="countdown font-mono text-4xl">
            <span style={{ '--value': Math.floor(timeWaited / 1000) % 60 } as any}></span>
          </span>
          sec
        </div>
      </div>
    </div>
  );
};

export default Timer;
