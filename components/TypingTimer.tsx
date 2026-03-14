import React, { useState, useEffect } from 'react';

interface TypingTimerProps {
  duration: number;
  isActive: boolean;
  onComplete: () => void;
}

const TypingTimer: React.FC<TypingTimerProps> = ({ duration, isActive, onComplete }) => {
  const [timeLeft, setTimeLeft] = useState(duration);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      onComplete();
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft, onComplete]);

  return (
    <div className="flex items-center justify-center bg-blue-50 px-6 py-3 rounded-full border border-blue-100 shadow-sm">
      <span className="text-2xl font-bold text-blue-700 font-mono tracking-wider">
        {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
      </span>
    </div>
  );
};

export default TypingTimer;
