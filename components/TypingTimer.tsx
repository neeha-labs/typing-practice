import React, { useState, useEffect, useRef } from 'react';

interface TypingTimerProps {
  duration: number;
  isActive: boolean;
  onComplete: () => void;
  resetKey?: number;
}

const TypingTimer: React.FC<TypingTimerProps> = ({ duration, isActive, onComplete, resetKey }) => {
  const [timeLeft, setTimeLeft] = useState(duration);
  const onCompleteRef = useRef(onComplete);

  // Keep ref up to date
  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  // Reset timer when duration changes, when it becomes inactive, or when resetKey changes
  useEffect(() => {
    setTimeLeft(duration);
  }, [duration, resetKey]);

  useEffect(() => {
    if (!isActive) {
      setTimeLeft(duration);
    }
  }, [isActive, duration]);

  // Separate interval logic from completion logic
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isActive) {
      interval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 0) return 0;
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isActive]);

  // Handle completion
  useEffect(() => {
    if (timeLeft === 0 && isActive) {
      onCompleteRef.current();
    }
  }, [timeLeft, isActive]);

  const isWarning = timeLeft <= 10 && timeLeft > 0;

  return (
    <div className={`flex items-center justify-center px-6 py-3 rounded-full border shadow-sm transition-colors duration-300 ${
      isWarning ? 'bg-red-50 border-red-200' : 'bg-blue-50 border-blue-100'
    }`}>
      <span className={`text-2xl font-bold font-mono tracking-wider transition-colors duration-300 ${
        isWarning ? 'text-red-600 animate-pulse' : 'text-blue-700'
      }`}>
        Time Left: {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}s
      </span>
    </div>
  );
};

export default TypingTimer;
