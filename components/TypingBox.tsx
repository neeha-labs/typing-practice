import React, { useState, useEffect, useRef } from 'react';

interface TypingBoxProps {
  targetText: string;
  onTypingStart: () => void;
  onTypingEnd: (stats: { wpm: number; accuracy: number; totalChars: number; errors: number }) => void;
  isTestMode: boolean;
  duration?: number;
}

const TypingBox: React.FC<TypingBoxProps> = ({ targetText, onTypingStart, onTypingEnd, isTestMode, duration }) => {
  const [input, setInput] = useState('');
  const [startTime, setStartTime] = useState<number | null>(null);
  const [errors, setErrors] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  useEffect(() => {
    if (isTestMode && duration && startTime && !isFinished) {
      const timer = setInterval(() => {
        const timeElapsed = (Date.now() - startTime) / 1000;
        if (timeElapsed >= duration) {
          finishTyping();
        }
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [isTestMode, duration, startTime, isFinished]);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (isFinished) return;

    const val = e.target.value;
    if (!startTime && val.length > 0) {
      setStartTime(Date.now());
      onTypingStart();
    }

    setInput(val);

    // Calculate errors
    let currentErrors = 0;
    for (let i = 0; i < val.length; i++) {
      if (val[i] !== targetText[i]) {
        currentErrors++;
      }
    }
    setErrors(currentErrors);

    // Finish condition for practice mode
    if (!isTestMode && val.length === targetText.length) {
      finishTyping(val, currentErrors);
    }
  };

  const finishTyping = (finalInput = input, finalErrors = errors) => {
    setIsFinished(true);
    const timeElapsed = (Date.now() - (startTime || Date.now())) / 1000 / 60; // in minutes
    const totalChars = finalInput.length;
    const grossWpm = (totalChars / 5) / (timeElapsed || 1);
    const netWpm = Math.max(0, grossWpm - (finalErrors / (timeElapsed || 1)));
    const accuracy = totalChars > 0 ? ((totalChars - finalErrors) / totalChars) * 100 : 100;

    onTypingEnd({
      wpm: Math.round(netWpm),
      accuracy: Math.round(accuracy),
      totalChars,
      errors: finalErrors
    });
  };

  const renderText = () => {
    return targetText.split('').map((char, index) => {
      let color = 'text-slate-400';
      if (index < input.length) {
        color = input[index] === char ? 'text-green-500' : 'text-red-500 bg-red-100';
      } else if (index === input.length) {
        color = 'text-slate-900 bg-blue-100 border-b-2 border-blue-500';
      }
      return (
        <span key={index} className={`${color} font-mono text-2xl md:text-xl`}>
          {char}
        </span>
      );
    });
  };

  return (
    <div className="w-full relative">
      <div 
        className="mb-6 p-4 md:p-6 bg-slate-50 rounded-xl border border-slate-200 leading-relaxed tracking-wide shadow-inner select-none min-h-[150px]"
        onClick={() => inputRef.current?.focus()}
      >
        {renderText()}
      </div>
      <textarea
        ref={inputRef}
        value={input}
        onChange={handleInputChange}
        disabled={isFinished}
        className="absolute opacity-0 w-full h-full top-0 left-0 cursor-default resize-none"
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        spellCheck="false"
      />
    </div>
  );
};

export default TypingBox;
