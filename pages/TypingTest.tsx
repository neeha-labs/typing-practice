
import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import SEO from '../components/SEO';
import TypingArea from '../components/TypingArea';
import { DURATION_TEXTS } from '../constants';
import { TypingStats } from '../types';

const TypingTest: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [duration, setDuration] = useState(60);
  const [testStarted, setTestStarted] = useState(false);
  const [targetText, setTargetText] = useState('');
  const lastTextIndex = useRef<number>(-1);

  // Dynamic SEO based on duration
  const getSEOData = () => {
    const min = duration / 60;
    if (min === 1) return {
      title: "1 Minute Typing Test - Fast WPM & Accuracy Check",
      description: "Quickly measure your typing speed with our free 1-minute test. Get instant WPM and accuracy results for your daily typing practice."
    };
    if (min === 5) return {
      title: "5 Minute Typing Practice - Official Mock Test Format",
      description: "Take a 5-minute typing test to prepare for clerk and data entry roles. Realistic interface with standard WPM calculation for government exams."
    };
    return {
      title: `${min} Minute Professional Typing Test - Strict Accuracy`,
      description: `Challenge yourself with a full ${min}-minute typing test. Strict mode ensures high accuracy tracking for SSC, Banking, and Clerk examinations.`
    };
  };

  const seo = getSEOData();

  // Function to get appropriate text based on duration, avoiding repetition
  const getRandomTextForDuration = (d: number) => {
    let pool: string[] = [];
    if (d <= 60) pool = DURATION_TEXTS.one_minute;
    else if (d <= 300) pool = DURATION_TEXTS.five_minute;
    else pool = DURATION_TEXTS.ten_minute;
    
    let nextIndex = Math.floor(Math.random() * pool.length);
    if (pool.length > 1 && nextIndex === lastTextIndex.current) {
      nextIndex = (nextIndex + 1) % pool.length;
    }
    lastTextIndex.current = nextIndex;
    return pool[nextIndex];
  };

  useEffect(() => {
    const dParam = searchParams.get('duration');
    if (dParam) {
      const dValue = parseInt(dParam);
      if (!isNaN(dValue)) {
        setDuration(dValue);
        setTestStarted(false);
      }
    }
  }, [searchParams]);

  const handleSelectDuration = (d: number) => {
    setDuration(d);
    setSearchParams({ duration: d.toString() });
  };

  const startTest = () => {
    const text = getRandomTextForDuration(duration);
    setTargetText(text);
    setTestStarted(true);
  };

  return (
    <div className="py-12 px-4 max-w-7xl mx-auto">
      <SEO title={seo.title} description={seo.description} />

      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Standard Typing Test</h1>
        <p className="text-slate-500 max-w-xl mx-auto">Choose your duration and start typing. Our engine tracks net WPM and accuracy using standard SSC/Banking formulas.</p>
      </div>

      {!testStarted ? (
        <div className="space-y-10">
          <div className="grid sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
            {[60, 300, 600].map((d) => (
              <button
                key={d}
                onClick={() => handleSelectDuration(d)}
                className={`bg-white border-2 p-8 rounded-2xl transition-all text-center group ${
                  duration === d 
                    ? 'border-blue-600 ring-4 ring-blue-50 shadow-md' 
                    : 'border-slate-200 hover:border-blue-300 hover:shadow-lg'
                }`}
              >
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">
                  {d === 60 ? '⚡' : d === 300 ? '⏱️' : '🏆'}
                </div>
                <div className="text-2xl font-bold text-slate-900 mb-1">{d/60} Minute</div>
                <div className="text-sm text-slate-500">{duration === d ? 'Selected' : 'Test Speed'}</div>
              </button>
            ))}
          </div>
          
          <div className="flex justify-center">
            <button 
              onClick={startTest}
              className="bg-blue-600 text-white px-12 py-4 rounded-xl font-bold text-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-200 animate-bounce-short"
            >
              Start {duration/60} Minute Test
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-8">
          <TypingArea 
            key={`${duration}-${testStarted}`}
            targetText={targetText} 
            duration={duration}
            onFinish={() => {}}
          />
          
          <div className="flex justify-center">
            <button 
              onClick={() => {
                setTestStarted(false);
              }}
              className="text-slate-500 hover:text-slate-900 flex items-center gap-2 font-medium"
            >
              ← Change Duration
            </button>
          </div>
        </div>
      )}

      <section className="mt-24 bg-white rounded-3xl p-8 md:p-12 border border-slate-100">
        <h2 className="text-2xl font-bold mb-6">How WPM is calculated?</h2>
        <div className="grid md:grid-cols-2 gap-12 text-slate-600 leading-relaxed">
          <div>
            <h3 className="text-slate-900 font-semibold mb-3">Gross WPM</h3>
            <p>Calculated as <code>(Total Characters typed / 5) / Time Spent in Minutes</code>. One word is standardized as 5 characters including spaces.</p>
          </div>
          <div>
            <h3 className="text-slate-900 font-semibold mb-3">Net WPM (Most Important)</h3>
            <p>Calculated as <code>Gross WPM - (Errors / Time Spent)</code>. This is the speed used for selection in almost all government exams like SSC CHSL and CGL.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TypingTest;
