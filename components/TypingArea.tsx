
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { TypingStats, CharacterStatus } from '../types';

interface TypingAreaProps {
  targetText: string;
  duration: number;
  onFinish: (stats: TypingStats) => void;
  showHighlight?: boolean;
  allowBackspace?: boolean;
}

const TypingArea: React.FC<TypingAreaProps> = ({
  targetText,
  duration,
  onFinish,
  showHighlight = true,
  allowBackspace = true
}) => {
  const navigate = useNavigate();
  const [userInput, setUserInput] = useState('');
  const [timeLeft, setTimeLeft] = useState(duration);
  const [isActive, setIsActive] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [startTime, setStartTime] = useState<number | null>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem('tp_user'));
  }, []);

  const calculateStats = useCallback((): TypingStats => {
    const timeSpent = startTime ? (Date.now() - startTime) / 1000 : 0;
    const minutes = timeSpent / 60;
    
    let errors = 0;
    let correctChars = 0;

    for (let i = 0; i < userInput.length; i++) {
      if (userInput[i] === targetText[i]) {
        correctChars++;
      } else {
        errors++;
      }
    }

    const grossWpm = (userInput.length / 5) / (minutes || 1);
    const netWpm = Math.max(0, grossWpm - (errors / (minutes || 1)));
    const accuracy = userInput.length > 0 ? (correctChars / userInput.length) * 100 : 100;

    return {
      wpm: Math.round(netWpm),
      accuracy: Math.round(accuracy),
      totalChars: userInput.length,
      correctChars,
      errors,
      timeSpent
    };
  }, [userInput, targetText, startTime]);

  useEffect(() => {
    let interval: any;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && isActive) {
      setIsActive(false);
      setIsFinished(true);
      onFinish(calculateStats());
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft, onFinish, calculateStats]);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (isFinished) return;
    const value = e.target.value;
    if (!isActive && value.length > 0) {
      setIsActive(true);
      setStartTime(Date.now());
    }
    setUserInput(value);
    if (value.length >= targetText.length) {
      setIsActive(false);
      setIsFinished(true);
      onFinish(calculateStats());
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (!allowBackspace && e.key === 'Backspace') {
      e.preventDefault();
    }
  };

  const resetTest = () => {
    setUserInput('');
    setTimeLeft(duration);
    setIsActive(false);
    setIsFinished(false);
    setStartTime(null);
    setTimeout(() => inputRef.current?.focus(), 0);
  };

  const currentStats = calculateStats();

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
        <StatCard label="WPM" value={currentStats.wpm} color="text-blue-600" />
        <StatCard label="Accuracy" value={`${currentStats.accuracy}%`} color="text-emerald-600" />
        <StatCard label="Time Left" value={`${timeLeft}s`} color="text-amber-600" />
        <StatCard label="Errors" value={currentStats.errors} color="text-rose-600" />
      </div>

      <div className="relative group">
        <div 
          ref={containerRef}
          className="bg-white border-2 border-slate-200 rounded-xl p-4 md:p-8 min-h-[250px] md:min-h-[300px] leading-relaxed text-lg md:text-2xl mono tracking-tight select-none cursor-text shadow-sm group-hover:border-blue-200 transition-colors overflow-y-auto max-h-[50vh]"
          onClick={() => inputRef.current?.focus()}
        >
          {targetText.split('').map((char, index) => {
            let statusClass = 'text-slate-400';
            if (index < userInput.length) {
              statusClass = userInput[index] === char ? 'text-slate-900 bg-emerald-100' : 'text-white bg-rose-500 rounded-sm';
            } else if (index === userInput.length) {
              statusClass = 'text-blue-600 underline decoration-2 underline-offset-4';
            }
            return <span key={index} className={`${statusClass} transition-colors`}>{char}</span>;
          })}
        </div>

        <textarea
          ref={inputRef}
          value={userInput}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          className="absolute inset-0 opacity-0 w-full h-full cursor-default pointer-events-none"
          autoFocus
          spellCheck={false}
          disabled={isFinished}
        />

        {isFinished && (
          <div className="absolute inset-0 bg-white/90 backdrop-blur-sm rounded-xl flex items-center justify-center z-10 animate-in fade-in duration-300 px-4">
            <div className="text-center p-8 bg-white shadow-2xl rounded-3xl border border-slate-100 max-w-md w-full">
              <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">🏆</div>
              <h3 className="text-2xl font-bold mb-1 text-slate-900">Great Job!</h3>
              <p className="text-slate-500 mb-6 font-medium">
                Speed: <span className="text-blue-600">{currentStats.wpm} WPM</span> • Accuracy: <span className="text-emerald-600">{currentStats.accuracy}%</span>
              </p>
              
              <div className="flex flex-col gap-3">
                <button 
                  onClick={resetTest}
                  className="w-full bg-blue-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-blue-700 transition-all flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  Restart Test
                </button>
                
                <div className="mt-4 pt-4 border-t border-slate-100">
                  {isLoggedIn ? (
                    <>
                      <p className="text-sm text-slate-700 mb-4 font-semibold italic">"Great job! Save this result to your progress history."</p>
                      <button 
                        onClick={() => alert('Result saved to your profile!')}
                        className="w-full bg-slate-900 text-white px-6 py-3 rounded-xl font-bold hover:bg-slate-800 transition-all"
                      >
                        Save Progress
                      </button>
                    </>
                  ) : (
                    <>
                      <p className="text-sm text-slate-500 mb-4 px-2 italic">"Create an account to save your progress and track your typing improvement."</p>
                      <div className="grid grid-cols-2 gap-3">
                        <button 
                          onClick={() => navigate('/signin?mode=signup')}
                          className="bg-blue-600 text-white px-4 py-3 rounded-xl font-bold hover:bg-blue-700 transition-all text-sm"
                        >
                          Sign Up
                        </button>
                        <button 
                          onClick={() => navigate('/signin')}
                          className="bg-white text-slate-700 border border-slate-200 px-4 py-3 rounded-xl font-bold hover:bg-slate-50 transition-all text-sm"
                        >
                          Sign In
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="flex justify-between items-center text-sm text-slate-400">
        <p>Tip: Focus on accuracy first, speed will follow.</p>
        <div className="flex gap-4">
           <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-emerald-400"></span> Correct</span>
           <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-rose-400"></span> Error</span>
        </div>
      </div>
    </div>
  );
};

const StatCard = React.memo(({ label, value, color }: { label: string, value: string | number, color: string }) => (
  <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
    <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">{label}</span>
    <div className={`text-2xl font-bold ${color} mt-1`}>{value}</div>
  </div>
));

export default TypingArea;
