
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useSearchParams, useParams, Link, useNavigate, useLocation } from 'react-router-dom';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db, auth } from '../firebase';
import SEO from '../components/SEO';
import TypingBox from '../components/TypingBox';
import TypingTimer from '../components/TypingTimer';
import TypingStats from '../components/TypingStats';
import TypingTestSEO from '../components/TypingTestSEO';
import { loadParagraphs } from '../utils/ParagraphLoader';

import PageSEOContent from '../components/PageSEOContent';
import Breadcrumbs from '../components/Breadcrumbs';

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
  const [resetKey, setResetKey] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

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
    } else if (path.includes('300-second')) {
      setDuration(300);
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
    setIsFinished(false);
    setResetKey(prev => prev + 1);
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
    if (path.includes('30-second')) return {
      title: "30 Second Typing Test | Quick WPM Speed Check",
      description: "Take our 30 second typing test for a quick speed check. Perfect for daily warm-ups, this short typing practice helps you measure your WPM in under a minute.",
      keywords: "30 second typing test, quick typing test, short typing test, WPM check, daily typing practice"
    };
    if (path.includes('45-second')) return {
      title: "45 Second Typing Test | Boost Your Typing Speed",
      description: "Challenge yourself with our 45 second typing test. Boost your typing speed, improve your accuracy, and focus on fast, error-free keyboarding techniques.",
      keywords: "45 second typing test, typing speed test, improve typing speed, keyboarding test, accurate typing"
    };
    if (path.includes('60-second')) return {
      title: "Free 60 Second Typing Test | Check WPM Speed",
      description: "Take the classic 60 second typing test to find your true words per minute. This one minute WPM check is the standard for professional typing assessment.",
      keywords: "60 second typing test, 1 minute typing test, one minute typing test, WPM assessment, standard typing test"
    };
    if (path.includes('90-second')) return {
      title: "90 Second Typing Test | Build Typing Endurance",
      description: "Build your typing endurance with our 90 second typing test. Perfect for intermediate typists looking to maintain focus and accuracy over a longer period.",
      keywords: "90 second typing test, typing endurance practice, 1.5 minute typing test, intermediate typing test"
    };
    if (path.includes('120-second')) return {
      title: "120 Second Typing Test | 2 Minute Typing Assessment",
      description: "Pace yourself with the 120 second typing test. This intensive 2 minute typing assessment ensures you maintain high speed and accuracy without fatigue.",
      keywords: "120 second typing test, 2 minute typing test, advanced typing test, typing stamina, WPM certification test"
    };
    if (path.includes('300-second')) return {
      title: "5 Minute Typing Test – 300 Second Endurance Challenge",
      description: "Test your typing endurance with a 5-minute (300 seconds) typing test. Perfect for measuring sustained speed and accuracy over longer periods."
    };

    if (path.includes('typing-speed-test')) return {
      title: "Typing Speed Test — Measure WPM Instantly",
      description: "Measure your typing speed in words per minute. Get instant WPM results and track your improvement.",
      canonicalPath: "/typing-test"
    };

    if (!duration || path === '/typing-test' || path === '/typing-test/') return {
      title: "Online Typing Test — Check Your WPM Speed",
      description: "Take a free typing test and check your WPM score instantly. Measure typing accuracy in real time.",
      canonicalPath: "/typing-test"
    };
    
    return {
      title: `${duration} Second Typing Test – Free Typing Speed Test`,
      description: `Take a ${duration}-second typing test to improve your speed and accuracy.`
    };
  };

  const seo = getSEOData();

  const handleSelectDuration = (d: number) => {
    const slug = d === 30 ? '30-second-typing-test' : d === 45 ? '45-second-typing-test' : d === 60 ? '60-second-typing-test' : d === 90 ? '90-second-typing-test' : d === 120 ? '120-second-typing-test' : d === 300 ? '300-second-typing-test' : `${d}-second-typing-test`;
    navigate(`/typing-test/${slug}`);
  };

  const startTest = () => {
    if (duration) {
      setTargetText(loadParagraphs(testMode, duration));
      setTestStarted(true);
      setStats(null);
      setIsTimerActive(true);
      setIsFinished(false);
      setLiveStats({ wpm: 0, accuracy: 100, errors: 0 });
      setResetKey(prev => prev + 1);
    }
  };

  const handleTypingStart = () => {
    // Timer started by startTest
  };

  const handleTypingEnd = useCallback(async (finalStats: { wpm: number; accuracy: number; totalChars: number; errors: number }) => {
    setIsTimerActive(false);
    setIsFinished(true);
    setStats(finalStats);

    if (auth.currentUser) {
      try {
        const testTypeMap: Record<number, string> = {
          30: '30s',
          60: '60s',
          120: '120s'
        };
        const testType = testTypeMap[duration || 60] || `${duration}s`;

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
  }, [duration]);

  const handleTimerComplete = useCallback(() => {
    setIsFinished(true);
  }, []);

  const getDisplayTitle = () => {
    if (testMode === 'easy') return "Start Your Typing Journey with Our Easy Test";
    if (testMode === 'hard') return "Challenge Your Typing Speed with Hard Mode";
    if (testMode === 'beginners') return "Build Core Skills with Typing Test for Beginners";
    if (testMode === 'numbers') return "Master the Top Row with Numbers Typing Test";
    if (testMode === 'paragraph') return "Improve Endurance with Paragraph Typing Practice";
    if (duration === 60) return "Free 60 Second Typing Test — Check Your Typing Speed in 60 Seconds";
    if (duration) return `Challenge Yourself with the ${duration} Second Speed Run`;
    return "Test Your Raw Typing Speed and Accuracy Online";
  };

  const getDisplayContent = () => {
    if (location.pathname.includes('typing-speed-test')) {
      return {
        h1: "Test Your Raw Typing Speed and Accuracy Online",
        p: "Check how fast you type with our instant WPM speed test. Get your words per minute score in under 60 seconds with no sign-up needed."
      };
    }
    return {
      h1: getDisplayTitle(),
      p: "Measure your typing speed and accuracy with our professional-grade testing engine. Choose a duration to begin."
    };
  };

  const displayContent = getDisplayContent();

  if (!duration) {
    return (
      <div className="py-12 px-4 max-w-7xl mx-auto">
        <SEO title={seo.title} description={seo.description} keywords={(seo as any).keywords} canonicalPath={(seo as any).canonicalPath || location.pathname} />

        <Breadcrumbs />

        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4 tracking-tight">{displayContent.h1}</h1>
          <p className="text-blue-600 font-bold mb-4">Free typing test – no login required</p>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto">{displayContent.p}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto mb-16">
          {[
            { d: 30, label: '30 Seconds', icon: '⚡', desc: 'A quick burst to test your raw speed.' },
            { d: 60, label: '60 Seconds', icon: '⏱️', desc: 'The standard 1-minute typing test.' },
            { d: 120, label: '120 Seconds', icon: '🏆', desc: 'Test your endurance over 2 minutes.' },
            { d: 300, label: '5 Minutes', icon: '🔥', desc: 'The ultimate 5-minute endurance test.' }
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

        <div className="text-center text-sm text-slate-500 mb-16">
           Looking for other durations? Try our <Link to="/typing-test/45-second-typing-test" className="text-blue-600 hover:underline font-medium">45 Second Typing Test</Link> or the <Link to="/typing-test/90-second-typing-test" className="text-blue-600 hover:underline font-medium">90 Second Typing Test</Link>. Calculate your accurate speed manually using our <Link to="/wpm-calculator" className="text-blue-600 hover:underline font-medium">WPM Calculator</Link>.
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
        
        <PageSEOContent 
          topic="Online Typing Test"
          offers="Test your actual typing speed with 100% accuracy using professional test formats."
          steps={[
            "Select a test duration from the options above.",
            "Start typing the highlighted words as quickly as you can.",
            "Check your final WPM and accuracy metrics when time runs out."
          ]}
          benefits={[
            "Track your WPM progress accurately over time.",
            "Identify frequent errors for targeted practice.",
            "Prepare for rigorous typing exams."
          ]}
          relatedPath="/lessons"
          relatedName="Free Typing Lessons"
        />

        {testMode === 'easy' && (
          <section className="bg-white rounded-3xl p-8 md:p-12 border border-slate-100 shadow-sm mt-16 text-left">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">About Our Easy Typing Test</h2>
            <p className="text-slate-600 mb-4">
              Our easy typing test is designed specifically for beginners who are just starting their typing journey. With simple common words and a relaxed pace, this test helps build your confidence before moving to harder challenges.
            </p>
            <p className="text-slate-600 mb-4">
              The easy mode uses the most frequently used English words, making it perfect for students, seniors, or anyone new to touch typing. Practice daily for just 10 minutes and watch your WPM score improve week by week.
            </p>
            <h3 className="text-xl font-bold text-slate-900 mb-3">How to Use the Easy Typing Test</h3>
            <p className="text-slate-600 mb-4">
              Simply click Start Test, type the words shown on screen, and get your instant WPM and accuracy score. No sign-up needed. Take the test as many times as you want completely free. Accurate and slow is always better than fast and error-prone when you first begin.
            </p>
            <p className="text-slate-600">
              When you feel comfortable scoring over 30 words per minute on this easy version without looking at the keyboard, consider trying our standard 60-second test or exploring typing tests with uppercase letters and punctuation.
            </p>
          </section>
        )}

        {testMode === 'hard' && (
          <section className="bg-white rounded-3xl p-8 md:p-12 border border-slate-100 shadow-sm mt-16 text-left">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">About Our Hard Typing Test</h2>
            <p className="text-slate-600 mb-4">
              Step up to our hard typing test to push your limits. Designed for advanced typists aiming for 80+ WPM, this test includes complex vocabulary, mixed punctuation, and technical terms to simulate the most demanding professional environments.
            </p>
            <p className="text-slate-600 mb-4">
              If you have already mastered the home row and basic words, this is where you build true proficiency. It forces you to maintain your rhythm while dealing with unusual letter combinations, numbers, and capital letters that often slow down average typists.
            </p>
            <h3 className="text-xl font-bold text-slate-900 mb-3">Maximizing Speed on Hard Mode</h3>
            <p className="text-slate-600 mb-4">
              Focus on keeping your eyes on the screen, reading one to two words ahead of what you are currently typing. This advanced technique minimizes the hesitation gap between difficult words and complex string inputs.
            </p>
            <p className="text-slate-600">
              Do not be discouraged if your WPM drops on this test compared to easy modes. The goal here is strict accuracy while handling advanced keyboard maneuvers. Master this, and standard text typing will feel effortless.
            </p>
          </section>
        )}

        {testMode === 'beginners' && (
          <section className="bg-white rounded-3xl p-8 md:p-12 border border-slate-100 shadow-sm mt-16 text-left">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Typing Test for Beginners Overview</h2>
            <p className="text-slate-600 mb-4">
              Welcome to the specially crafted typing test for beginners. If you are learning touch typing, jumping straight into high-speed tests can be frustrating. This test uses simple sentence structures and repetitive word patterns.
            </p>
            <p className="text-slate-600 mb-4">
              By using foundational vocabulary, you can train your muscle memory without the stress of complicated grammar. We highly recommend matching this test with our free typing lessons to ensure your finger placement is correct.
            </p>
            <h3 className="text-xl font-bold text-slate-900 mb-3">Why Start Here?</h3>
            <p className="text-slate-600 mb-4">
              Many new typists develop bad habits like the "hunt and peck" method. Our beginner test encourages you to trust your finger mapping. Remember, at this stage, scoring perfectly without looking down is much more valuable than hitting 40 words per minute.
            </p>
            <p className="text-slate-600">
              Make it a habit to take this test once a day. You will notice significant improvements in just a few weeks. Focus entirely on hitting the correct keys utilizing the correct fingers. Your speed will naturally scale.
            </p>
          </section>
        )}

        {testMode === 'numbers' && (
          <section className="bg-white rounded-3xl p-8 md:p-12 border border-slate-100 shadow-sm mt-16 text-left">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Typing Test With Numbers And Symbols</h2>
            <p className="text-slate-600 mb-4">
              Data entry, programming, and accounting require exact precision on the top row of your keyboard. Our typing test with numbers and symbols forces you to practice the numerical keys and shift-modifiers that most typists actively avoid.
            </p>
            <p className="text-slate-600 mb-4">
              It is very common for fast typists to drop by 20 WPM or more when numbers are introduced. By practicing in this specific test mode, you can close that gap and make your typing flow completely uninterrupted regardless of the content.
            </p>
            <h3 className="text-xl font-bold text-slate-900 mb-3">Tips for Number Keys</h3>
            <p className="text-slate-600 mb-4">
              Do not use a number pad for this test. Practice using the standard top row numbers, utilizing the correct finger reach. Relying on muscle memory for top row symbols like standard letters translates to huge productivity gains for developers and data entry clerks.
            </p>
            <p className="text-slate-600">
              If your accuracy is low, slow down significantly. A single missed number in a professional setting can cause massive issues. Accuracy is the absolute highest priority in this test mode.
            </p>
          </section>
        )}

        {testMode === 'paragraph' && (
          <section className="bg-white rounded-3xl p-8 md:p-12 border border-slate-100 shadow-sm mt-16 text-left">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Why Take a Paragraph Typing Test?</h2>
            <p className="text-slate-600 mb-4">
              Many people can type fast for 10 or 20 seconds, but struggle to maintain that speed over a full page. Our paragraph typing test simulates real-world writing. It requires stamina, concentration, and a consistent, steady rhythm.
            </p>
            <p className="text-slate-600 mb-4">
              These extended typing tests are critical for those preparing for transcription roles, professional writing positions, or official government skill tests where multiple paragraphs must be typed flawlessly over ten to fifteen minutes.
            </p>
            <h3 className="text-xl font-bold text-slate-900 mb-3">Sustaining High WPM</h3>
            <p className="text-slate-600 mb-4">
              The secret to high scores across longer paragraphs is a smooth, continuous flow rather than rapid bursts. Do not pause between sentences. Train yourself to hit the spacebar and immediately begin the next word without breaking concentration.
            </p>
            <p className="text-slate-600">
              In paragraph typing, correcting errors immediately is often more time-efficient than leaving them, as a high penalty rate will tank your net WPM. Practice this format daily to build professional-grade keyboard endurance.
            </p>
          </section>
        )}

        <TypingTestSEO duration={duration || 60} mode={testMode} />
      </div>
    );
  }

  return (
    <div className="py-12 px-4 max-w-7xl mx-auto">
      <SEO title={seo.title} description={seo.description} keywords={(seo as any).keywords} canonicalPath={(seo as any).canonicalPath || location.pathname} />

      <Breadcrumbs />

      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
          {getDisplayTitle()}
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
                resetKey={resetKey}
                onComplete={handleTimerComplete} 
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
                isActive={isTimerActive}
                forceFinish={isFinished}
                duration={duration}
                resetKey={resetKey}
              />
            </div>
          ) : (
            <div className="text-center py-6">
              <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center text-4xl mx-auto mb-6">🏆</div>
              <h2 className="text-3xl font-black text-slate-900 mb-8 tracking-tight">Your Performance Report</h2>
              <div className="mb-12">
                <TypingStats {...stats} />
              </div>
              
              <div className="grid md:grid-cols-2 gap-8 mb-12 max-w-4xl mx-auto text-left">
                 <div className="bg-slate-50 p-10 rounded-[2.5rem] border border-slate-100 shadow-sm">
                    <h4 className="font-bold text-slate-900 text-xl mb-3">AI Breakdown</h4>
                    <p className="text-slate-500 text-base leading-relaxed">
                      {stats.wpm > 60 ? `Exceptional! You've crossed the professional threshold. Your speed sitting at ${stats.wpm} WPM puts you ahead of 85% of global typists. To reach 100+, minimize lingering on capital letters.` : 
                       stats.wpm > 40 ? `Great job! You have a solid foundational speed. You are faster than the average office worker. Focus on your accuracy (currently ${stats.accuracy}%) to gain more fluidity.` :
                       `A strong start. You have a ${stats.accuracy}% accuracy rate. We recommend moving back to our touch typing lessons to fix core finger placement before chasing higher speeds.`
                      }
                    </p>
                 </div>
                 <div className="bg-blue-600 p-10 rounded-[2.5rem] text-white shadow-xl shadow-blue-100">
                    <h4 className="font-bold text-white text-xl mb-3 uppercase tracking-widest text-sm">Recommended Path</h4>
                    <p className="text-blue-100 mb-8 leading-relaxed">Based on your score, we've unlocked a specific practice module just for you.</p>
                    <Link to={stats.wpm < 40 ? "/lessons" : "/typing-practice"} className="inline-block bg-white text-blue-600 px-8 py-3 rounded-xl font-black hover:bg-blue-50 transition-all">
                      {stats.wpm < 40 ? "RESUME LESSONS" : "START ADVANCED DRILLS"}
                    </Link>
                 </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button 
                  onClick={startTest}
                  className="bg-slate-900 text-white px-12 py-5 rounded-2xl font-black text-xl hover:bg-blue-600 transition-all shadow-xl shadow-slate-200"
                >
                  RETAKE TEST
                </button>
                <Link 
                  to={`/leaderboard?category=${duration}s`}
                  className="bg-white text-slate-900 border-2 border-slate-200 px-12 py-5 rounded-2xl font-black text-xl hover:border-blue-600 hover:text-blue-600 transition-all"
                >
                  VIEW RANKING
                </Link>
              </div>
            </div>
          )}
        </div>
      )}

      {duration === 60 && !location.pathname.includes('easy') && !location.pathname.includes('hard') && !location.pathname.includes('beginners') && !location.pathname.includes('numbers') && !location.pathname.includes('paragraph') && (
        <div className="mt-16 space-y-12 text-left max-w-4xl mx-auto">
          <section className="bg-white rounded-3xl p-8 md:p-12 border border-slate-100 shadow-sm">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Improve Your Typing Skills</h2>
            <p className="text-slate-600 mb-4 leading-relaxed">
              Our free typing test 60 seconds format is the most popular way to measure typing speed worldwide. When you take this typing test 60 seconds challenge, you get accurate WPM test results that reflect your real typing ability. The 60 second typing assessment is used by employers, educators, and government exam boards as the standard benchmark to verify you can type fast.
            </p>
            <p className="text-slate-600 leading-relaxed">
              If you want to improve your typing speed, taking online typing tests daily is essential. This typing speed test 60 seconds gives you enough time to showcase your typing speed and accuracy. By regularly typing in 60 seconds, you will naturally build the muscle memory required for typing faster and improving your overall word per minute score on this minute typing test.
            </p>
          </section>

          <section className="bg-white rounded-3xl p-8 md:p-12 border border-slate-100 shadow-sm">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">What is the 60 Second Typing Test?</h2>
            <p className="text-slate-600 mb-8 leading-relaxed">
              The 60 second typing test is a timed assessment that measures how many words per minute (WPM) you can type accurately in exactly one minute. It is the industry standard typing speed test used by employers, educational institutions and government exam boards worldwide.
            </p>

            <h2 className="text-2xl font-bold text-slate-900 mb-4">How Does the 60 Second Typing Test Work?</h2>
            <p className="text-slate-600 mb-8 leading-relaxed">
              Start typing the words displayed on screen. The timer begins automatically with your first keystroke. Type as fast and accurately as possible for 60 seconds. When time ends, your WPM score and speed and accuracy percentage are displayed instantly. No signup required.
            </p>

            <h2 className="text-2xl font-bold text-slate-900 mb-4">What is a Good Score on the 60 Second Test?</h2>
            <p className="text-slate-600 mb-8 leading-relaxed">
              A good typing speed on the 60 second typing test depends on your goal. The global average is 40 WPM. For office work, 50-60 WPM is considered good. Government exam requirements typically require 30-35 WPM. Professional typists achieve 80-100 WPM consistently.
            </p>

            <h2 className="text-2xl font-bold text-slate-900 mb-4">Is This 60 Second Typing Test Free?</h2>
            <p className="text-slate-600 leading-relaxed">
              Yes. Our 60 second typing test is a completely free typing test with no signup, registration or payment required. Take the test unlimited times to track your improvement over time.
            </p>
          </section>

          <section className="bg-white rounded-3xl p-8 md:p-12 border border-slate-100 shadow-sm">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Why Take a 60 Second Typing Test?</h2>
            <p className="text-slate-600 mb-8 leading-relaxed">
              The free typing test 60 seconds format strikes the perfect balance between accuracy and real performance measurement. Unlike shorter tests that only measure burst speed, the typing test 60 seconds gives enough time to reveal your true sustained typing skills. It is long enough to settle into a rhythm but short enough to maintain full concentration throughout.
            </p>

            <h2 className="text-2xl font-bold text-slate-900 mb-4">How to Improve Your 60 Second Typing Score</h2>
            <p className="text-slate-600 mb-8 leading-relaxed">
              To improve your score on the typing speed test 60 seconds, practice daily for at least 15 minutes. Focus on accuracy before speed. Type without looking at the keyboard. Keep your fingers on the home row keys ASDF and JKL at all times. Review your error analysis after each test to identify which keys slow you down most.
            </p>

            <h2 className="text-2xl font-bold text-slate-900 mb-4">60 Second Typing Test for Government Exams</h2>
            <p className="text-slate-600 leading-relaxed">
              The typing in 60 seconds format is directly relevant to SSC CGL, SSC CHSL, RRB NTPC, IBPS Clerk and SBI Clerk typing tests. All these government exams require sustained typing speed and accuracy. Regular practice with our free typing test 60 seconds tool will prepare you effectively for the actual exam conditions.
            </p>
          </section>
        </div>
      )}

      <section className="mt-8 mb-8 p-6 bg-slate-50 rounded-2xl border border-slate-200">
        <h2 className="text-xl font-bold text-slate-900 mb-4">
          Try Different Test Modes
        </h2>
        <div className="flex flex-wrap gap-3">
          <Link to="/easy-typing-test" className="px-4 py-2 bg-green-50 border border-green-200 rounded-xl text-green-700 font-medium text-sm hover:bg-green-100 transition-colors">
            🟢 Easy Mode
          </Link>
          <Link to="/hard-typing-test" className="px-4 py-2 bg-red-50 border border-red-200 rounded-xl text-red-700 font-medium text-sm hover:bg-red-100 transition-colors">
            🔴 Hard Mode
          </Link>
          <Link to="/paragraph-typing-test" className="px-4 py-2 bg-blue-50 border border-blue-200 rounded-xl text-blue-700 font-medium text-sm hover:bg-blue-100 transition-colors">
            📝 Paragraph Mode
          </Link>
          <Link to="/typing-test-with-numbers" className="px-4 py-2 bg-purple-50 border border-purple-200 rounded-xl text-purple-700 font-medium text-sm hover:bg-purple-100 transition-colors">
            🔢 Numbers Mode
          </Link>
        </div>
      </section>

      <TypingTestSEO duration={duration || 60} mode={testMode} />
    </div>
  );
};

export default TypingTest;
