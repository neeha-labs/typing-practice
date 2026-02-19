
import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams, useParams, Link, useNavigate } from 'react-router-dom';
import SEO from '../components/SEO';
import TypingArea from '../components/TypingArea';
import { DURATION_TEXTS } from '../constants';
import { TypingStats } from '../types';

const TypingTest: React.FC = () => {
  const { duration: durationParam } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const [duration, setDuration] = useState<number | null>(null);
  const [testStarted, setTestStarted] = useState(false);
  const [targetText, setTargetText] = useState('');
  const lastTextIndex = useRef<number>(-1);

  // Map duration slug to seconds
  useEffect(() => {
    if (durationParam) {
      if (durationParam === '1-minute') setDuration(60);
      else if (durationParam === '5-minute') setDuration(300);
      else if (durationParam === '10-minute') setDuration(600);
      else {
        const d = parseInt(durationParam);
        if (!isNaN(d)) setDuration(d);
        else setDuration(60);
      }
      setTestStarted(false);
    } else {
      const dParam = searchParams.get('duration');
      if (dParam) {
        const dValue = parseInt(dParam);
        if (!isNaN(dValue)) setDuration(dValue);
      } else {
        setDuration(null);
      }
    }
  }, [durationParam, searchParams]);

  // Dynamic SEO based on duration
  const getSEOData = () => {
    if (!duration) return {
      title: "Online Typing Speed Test - Measure Your WPM",
      description: "Take a free typing speed test to measure your WPM and accuracy. Choose from 1, 5, or 10-minute durations. Standard formulas used for SSC and Banking exams."
    };
    const min = duration / 60;
    if (min === 1) return {
      title: "1 Minute Typing Test – Check Speed & Accuracy",
      description: "Quickly measure your typing speed with our free 1-minute test. Get instant WPM and accuracy results for your daily typing practice."
    };
    if (min === 5) return {
      title: "5 Minute Typing Test – Official Mock Test Format",
      description: "Take a 5-minute typing test to prepare for clerk and data entry roles. Realistic interface with standard WPM calculation for government exams."
    };
    if (min === 10) return {
      title: "10 Minute Typing Test – Professional Endurance Check",
      description: "Challenge yourself with a full 10-minute typing test. Strict mode ensures high accuracy tracking for SSC, Banking, and Clerk examinations."
    };
    return {
      title: `${min} Minute Typing Test – Typing-Practice.online`,
      description: `Take a ${min}-minute typing test to improve your speed and accuracy.`
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

  const handleSelectDuration = (d: number) => {
    const slug = d === 60 ? '1-minute' : d === 300 ? '5-minute' : d === 600 ? '10-minute' : d.toString();
    navigate(`/typing-test/${slug}`);
  };

  const startTest = () => {
    if (duration) {
      const text = getRandomTextForDuration(duration);
      setTargetText(text);
      setTestStarted(true);
    }
  };

  if (!duration) {
    return (
      <div className="py-12 px-4 max-w-7xl mx-auto">
        <SEO title={seo.title} description={seo.description} />
        <div className="text-center mb-16">
          <h1 className="text-4xl font-extrabold text-slate-900 mb-4">Typing Test Hub</h1>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto">Measure your typing speed and accuracy with our professional-grade testing engine. Choose a duration to begin.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {[
            { d: 60, label: '1 Minute', icon: '⚡', desc: 'Perfect for a quick daily check.' },
            { d: 300, label: '5 Minute', icon: '⏱️', desc: 'The standard for most job exams.' },
            { d: 600, label: '10 Minute', icon: '🏆', desc: 'Test your endurance and focus.' }
          ].map((item) => (
            <button
              key={item.d}
              onClick={() => handleSelectDuration(item.d)}
              className="bg-white border-2 border-slate-100 p-8 rounded-3xl hover:border-blue-500 hover:shadow-xl transition-all group text-center"
            >
              <div className="text-5xl mb-6 group-hover:scale-110 transition-transform">{item.icon}</div>
              <h2 className="text-2xl font-bold text-slate-900 mb-2">{item.label} Test</h2>
              <p className="text-slate-500 mb-6">{item.desc}</p>
              <div className="bg-blue-50 text-blue-700 py-3 rounded-xl font-bold group-hover:bg-blue-600 group-hover:text-white transition-all">
                Select Duration
              </div>
            </button>
          ))}
        </div>

        <div className="mt-24 grid md:grid-cols-2 gap-12 bg-white rounded-3xl p-8 md:p-12 border border-slate-100">
          <div>
            <h2 className="text-2xl font-bold mb-6">Why Take a Typing Test?</h2>
            <ul className="space-y-4">
              <li className="flex gap-3">
                <span className="text-blue-600 font-bold">✓</span>
                <p className="text-slate-600"><strong>Benchmark Your Skills:</strong> Know exactly where you stand with net WPM and accuracy tracking.</p>
              </li>
              <li className="flex gap-3">
                <span className="text-blue-600 font-bold">✓</span>
                <p className="text-slate-600"><strong>Exam Readiness:</strong> Practice with the same time constraints and rules as official government tests.</p>
              </li>
              <li className="flex gap-3">
                <span className="text-blue-600 font-bold">✓</span>
                <p className="text-slate-600"><strong>Track Improvement:</strong> Regular testing helps you visualize your progress over weeks and months.</p>
              </li>
            </ul>
          </div>
          <div className="bg-slate-50 p-8 rounded-2xl">
            <h3 className="font-bold text-slate-900 mb-4">Pro Tip: Accuracy Over Speed</h3>
            <p className="text-slate-600 leading-relaxed">
              In most professional environments and exams, accuracy is more important than raw speed. 
              A typist at 60 WPM with 100% accuracy is often more valuable than one at 80 WPM with 90% accuracy. 
              Focus on hitting the right keys first!
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-12 px-4 max-w-7xl mx-auto">
      <SEO title={seo.title} description={seo.description} />

      <div className="text-center mb-12">
        <Link to="/typing-test" className="text-blue-600 hover:underline text-sm font-bold mb-2 block">← All Tests</Link>
        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
          {duration/60} Minute Typing Test
        </h1>
        <p className="text-slate-500 max-w-xl mx-auto">Choose your duration and start typing. Our engine tracks net WPM and accuracy using standard SSC/Banking formulas.</p>
      </div>

      {!testStarted ? (
        <div className="space-y-10">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
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

          <div className="mt-16 grid md:grid-cols-2 gap-8">
            <Link to="/lessons" className="bg-blue-50 p-6 rounded-2xl border border-blue-100 hover:bg-blue-100 transition-colors">
              <h3 className="font-bold text-blue-900 mb-2">Need to learn first?</h3>
              <p className="text-blue-700 text-sm">Check out our structured typing lessons for all levels.</p>
            </Link>
            <Link to="/exam-mode" className="bg-emerald-50 p-6 rounded-2xl border border-emerald-100 hover:bg-emerald-100 transition-colors">
              <h3 className="font-bold text-emerald-900 mb-2">Government Exam Aspirant?</h3>
              <p className="text-emerald-700 text-sm">Try our realistic exam mock tests for SSC, Banking, and more.</p>
            </Link>
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
