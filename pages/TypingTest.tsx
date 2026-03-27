
import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams, useParams, Link, useNavigate, useLocation } from 'react-router-dom';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db, auth } from '../firebase';
import SEO from '../components/SEO';
import TypingBox from '../components/TypingBox';
import TypingTimer from '../components/TypingTimer';
import TypingStats from '../components/TypingStats';
import TypingTestSEO from '../components/TypingTestSEO';
import { loadParagraphs } from '../utils/ParagraphLoader';

enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId: string | undefined;
    email: string | null | undefined;
    emailVerified: boolean | undefined;
    isAnonymous: boolean | undefined;
    tenantId: string | null | undefined;
    providerInfo: {
      providerId: string;
      displayName: string | null;
      email: string | null;
      photoUrl: string | null;
    }[];
  }
}

const handleFirestoreError = (error: unknown, operationType: OperationType, path: string | null) => {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo: auth.currentUser?.providerData.map(provider => ({
        providerId: provider.providerId,
        displayName: provider.displayName,
        email: provider.email,
        photoUrl: provider.photoURL
      })) || []
    },
    operationType,
    path
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
};

const TypingTest: React.FC = () => {
  const { duration: durationParam } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [duration, setDuration] = useState<number | null>(null);
  const [testMode, setTestMode] = useState<'beginner' | 'intermediate' | 'advanced' | 'test' | 'easy' | 'hard' | 'beginners' | 'numbers' | 'paragraph'>('test');
  const [testStarted, setTestStarted] = useState(false);
  const [targetText, setTargetText] = useState('');
  const [stats, setStats] = useState<{ wpm: number; accuracy: number; totalChars: number; errors: number } | null>(null);
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [liveStats, setLiveStats] = useState<{ wpm: number; accuracy: number; errors: number }>({ wpm: 0, accuracy: 100, errors: 0 });

  // Map duration slug to seconds
  useEffect(() => {
    const path = location.pathname;
    if (path.includes('30-second')) {
      setDuration(30);
      setTestMode('test');
    } else if (path.includes('45-second')) {
      setDuration(45);
      setTestMode('test');
    } else if (path.includes('60-second')) {
      setDuration(60);
      setTestMode('test');
    } else if (path.includes('90-second')) {
      setDuration(90);
      setTestMode('test');
    } else if (path.includes('120-second')) {
      setDuration(120);
      setTestMode('test');
    } else if (path.includes('easy-typing-test')) {
      setDuration(60);
      setTestMode('easy');
    } else if (path.includes('hard-typing-test')) {
      setDuration(60);
      setTestMode('hard');
    } else if (path.includes('typing-test-for-beginners')) {
      setDuration(60);
      setTestMode('beginners');
    } else if (path.includes('typing-test-with-numbers')) {
      setDuration(60);
      setTestMode('numbers');
    } else if (path.includes('paragraph-typing-test')) {
      setDuration(120);
      setTestMode('paragraph');
    } else if (durationParam) {
      const d = parseInt(durationParam);
      if (!isNaN(d)) setDuration(d);
      else setDuration(60);
      setTestMode('test');
    } else {
      const dParam = searchParams.get('duration');
      if (dParam) {
        const dValue = parseInt(dParam);
        if (!isNaN(dValue)) setDuration(dValue);
      } else {
        setDuration(null);
      }
      setTestMode('test');
    }
    setTestStarted(false);
    setStats(null);
    setIsTimerActive(false);
  }, [durationParam, searchParams, location.pathname]);

  const getSEOData = () => {
    const path = location.pathname;
    if (path.includes('easy-typing-test')) return {
      title: "Easy Typing Test – Beginner Friendly Words Online",
      description: "Take an easy typing test with simple words. Perfect for beginners looking to build confidence and accuracy."
    };
    if (path.includes('hard-typing-test')) return {
      title: "Hard Typing Test – Complex Words & Sentences",
      description: "Challenge yourself with a hard typing test featuring complex vocabulary and technical terms."
    };
    if (path.includes('typing-test-for-beginners')) return {
      title: "Typing Test for Beginners – Learn to Type Fast",
      description: "A learning-focused typing test designed specifically for beginners to master the home row and common words."
    };
    if (path.includes('typing-test-with-numbers')) return {
      title: "Typing Test with Numbers and Symbols",
      description: "Improve your data entry skills with our numbers and symbols typing test. Practice the top row and special characters."
    };
    if (path.includes('paragraph-typing-test')) return {
      title: "Paragraph Typing Test – Long Text Practice",
      description: "Focus on endurance and consistency with our paragraph typing test. Practice with longer, meaningful texts."
    };
    if (path.includes('45-second')) return {
      title: "45 Second Typing Test – Quick Speed Check",
      description: "Test your typing speed in just 45 seconds. A perfect middle ground for a quick yet accurate assessment."
    };
    if (path.includes('90-second')) return {
      title: "90 Second Typing Test – Accuracy & Speed Benchmark",
      description: "Take a 90-second typing test to measure your sustained typing performance and accuracy."
    };

    if (!duration) return {
      title: "Free Typing Speed Test | Measure Your WPM Online",
      description: "Take a free typing speed test to measure your WPM and accuracy. Choose from 30, 60, or 120-second durations."
    };
    
    return {
      title: `${duration} Second Typing Test – Free Typing Speed Test`,
      description: `Take a ${duration}-second typing test to improve your speed and accuracy.`
    };
  };

  const seo = getSEOData();

  const handleSelectDuration = (d: number) => {
    const slug = d === 30 ? '30-second-typing-test' : d === 45 ? '45-second-typing-test' : d === 60 ? '60-second-typing-test' : d === 90 ? '90-second-typing-test' : d === 120 ? '120-second-typing-test' : `${d}-second-typing-test`;
    navigate(`/typing-test/${slug}`);
  };

  const startTest = () => {
    if (duration) {
      setTargetText(loadParagraphs(testMode, duration));
      setTestStarted(true);
      setStats(null);
      setIsTimerActive(false);
      setLiveStats({ wpm: 0, accuracy: 100, errors: 0 });
    }
  };

  const handleTypingStart = () => {
    setIsTimerActive(true);
  };

  const handleTypingEnd = async (finalStats: { wpm: number; accuracy: number; totalChars: number; errors: number }) => {
    setIsTimerActive(false);
    setStats(finalStats);

    if (auth.currentUser) {
      try {
        const testTypeMap: Record<number, string> = {
          30: '30s',
          60: '60s',
          120: '120s'
        };
        const testType = testTypeMap[duration] || `${duration}s`;

        const resultData = {
          userId: auth.currentUser.uid,
          wpm: finalStats.wpm,
          accuracy: finalStats.accuracy,
          duration: duration,
          testType: testType,
          timestamp: serverTimestamp(),
          displayName: auth.currentUser.displayName || 'Anonymous',
          username: auth.currentUser.displayName || 'Anonymous',
          photoURL: auth.currentUser.photoURL || ''
        };

        try {
          await addDoc(collection(db, 'typing_results'), resultData);
        } catch (error: any) {
          if (error.code === 'permission-denied') {
            handleFirestoreError(error, OperationType.CREATE, 'typing_results');
          }
          throw error;
        }
        
        // Also save to leaderboard collection for easy querying
        try {
          await addDoc(collection(db, 'leaderboard'), resultData);
        } catch (error: any) {
          if (error.code === 'permission-denied') {
            handleFirestoreError(error, OperationType.CREATE, 'leaderboard');
          }
          throw error;
        }
      } catch (error) {
        console.error("Error saving result:", error);
      }
    }
  };

  if (!duration) {
    return (
      <div className="py-12 px-4 max-w-7xl mx-auto">
        <SEO title={seo.title} description={seo.description} />

        <Link to="/" className="text-blue-600 hover:underline text-sm font-bold mb-6 inline-flex items-center gap-1">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Home
        </Link>

        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4 tracking-tight">Free Typing Speed Test</h1>
          <p className="text-blue-600 font-bold mb-4">Free typing test – no login required</p>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto">Measure your typing speed and accuracy with our professional-grade testing engine. Choose a duration to begin.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-16">
          {[
            { d: 30, label: '30 Seconds', icon: '⚡', desc: 'A quick burst to test your raw speed.' },
            { d: 60, label: '60 Seconds', icon: '⏱️', desc: 'The standard 1-minute typing test.' },
            { d: 120, label: '120 Seconds', icon: '🏆', desc: 'Test your endurance over 2 minutes.' }
          ].map((item) => (
            <button
              key={item.d}
              onClick={() => handleSelectDuration(item.d)}
              className="bg-white border-2 border-slate-100 p-8 rounded-3xl hover:border-blue-500 hover:shadow-xl transition-all group text-center"
            >
              <div className="text-5xl mb-6 group-hover:scale-110 transition-transform">{item.icon}</div>
              <h2 className="text-2xl font-bold text-slate-900 mb-2">{item.label}</h2>
              <p className="text-slate-500 mb-6">{item.desc}</p>
              <div className="bg-blue-50 text-blue-700 py-3 rounded-xl font-bold group-hover:bg-blue-600 group-hover:text-white transition-all">
                Select Duration
              </div>
            </button>
          ))}
        </div>

        {/* Internal SEO Linking */}
        <section className="bg-slate-900 text-center py-12 px-4 rounded-3xl shadow-xl mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Need more practice first?</h2>
          <p className="text-slate-400 mb-8 max-w-xl mx-auto">Build your muscle memory and improve your accuracy without the pressure of a timer.</p>
          <Link 
            to="/typing-practice" 
            className="inline-block bg-blue-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-blue-500 transition-all shadow-lg shadow-blue-900/50"
          >
            Start typing practice
          </Link>
        </section>

        <div className="mt-24 grid md:grid-cols-2 gap-12 bg-white rounded-3xl p-8 md:p-12 border border-slate-100">
          <div>
            <h2 className="text-2xl font-bold mb-6">How Typing Speed Is Calculated</h2>
            <ul className="space-y-4">
              <li className="flex gap-3">
                <span className="text-blue-600 font-bold">✓</span>
                <p className="text-slate-600"><strong>Gross WPM:</strong> Calculated as <code>(Total Characters typed / 5) / Time Spent in Minutes</code>. One word is standardized as 5 characters including spaces.</p>
              </li>
              <li className="flex gap-3">
                <span className="text-blue-600 font-bold">✓</span>
                <p className="text-slate-600"><strong>Net WPM:</strong> Calculated as <code>Gross WPM - (Errors / Time Spent)</code>. This is the true measure of your typing speed.</p>
              </li>
              <li className="flex gap-3">
                <span className="text-blue-600 font-bold">✓</span>
                <p className="text-slate-600"><strong>Accuracy:</strong> The percentage of correct characters typed out of the total characters typed.</p>
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
        
        <TypingTestSEO duration={duration || 60} mode={testMode} />
      </div>
    );
  }

  return (
    <div className="py-12 px-4 max-w-7xl mx-auto">
      <SEO title={seo.title} description={seo.description} />

      <div className="mb-6 flex justify-between items-center">
        <Link to="/" className="text-blue-600 hover:underline text-sm font-bold inline-flex items-center gap-1">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Home
        </Link>
        <Link to="/typing-test" className="text-slate-500 hover:underline text-sm font-bold inline-flex items-center gap-1">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to All Tests
        </Link>
      </div>

      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
          {duration} Second Typing Test
        </h1>
        <p className="text-blue-600 font-bold">Free typing test – no login required</p>
      </div>

      {!testStarted ? (
        <div className="space-y-10">
          <div className="flex justify-center">
            <button 
              onClick={startTest}
              className="bg-blue-600 text-white px-12 py-4 rounded-xl font-bold text-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-200 animate-bounce-short"
            >
              Start Test
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-8 bg-white rounded-3xl p-8 lg:p-12 border border-slate-100 shadow-sm">
          {!stats && (
            <div className="flex justify-between items-center mb-8">
              <TypingTimer 
                duration={duration} 
                isActive={isTimerActive} 
                onComplete={() => {
                  // The TypingBox will handle the completion if we pass duration
                }} 
              />
              <button 
                onClick={startTest}
                className="flex items-center gap-2 text-slate-500 hover:text-blue-600 font-medium transition-colors"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Restart
              </button>
            </div>
          )}

          {!stats ? (
            <div className="space-y-6">
              <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 text-center">
                  <div className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-1">WPM</div>
                  <div className="text-2xl font-black text-blue-600">{liveStats.wpm}</div>
                </div>
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 text-center">
                  <div className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-1">Accuracy</div>
                  <div className="text-2xl font-black text-emerald-500">{liveStats.accuracy}%</div>
                </div>
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 text-center">
                  <div className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-1">Errors</div>
                  <div className="text-2xl font-black text-rose-500">{liveStats.errors}</div>
                </div>
              </div>
              <TypingBox 
                targetText={targetText} 
                onTypingStart={handleTypingStart} 
                onTypingEnd={handleTypingEnd} 
                onStatsUpdate={setLiveStats}
                isTestMode={true}
                duration={duration}
              />
            </div>
          ) : (
            <div className="text-center">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Test Completed!</h2>
              <TypingStats {...stats} />
              <div className="flex justify-center gap-4">
                <button 
                  onClick={startTest}
                  className="bg-blue-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-700 transition-all shadow-md"
                >
                  Try Again
                </button>
                <Link 
                  to={`/leaderboard?category=${duration}s`}
                  className="bg-white text-blue-600 border border-blue-200 px-8 py-3 rounded-xl font-bold hover:bg-blue-50 transition-all shadow-sm"
                >
                  View Leaderboard
                </Link>
              </div>
            </div>
          )}
        </div>
      )}

      <TypingTestSEO duration={duration || 60} mode={testMode} />
    </div>
  );
};

export default TypingTest;
