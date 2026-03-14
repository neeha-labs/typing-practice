import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import TypingBox from '../components/TypingBox';
import TypingStats from '../components/TypingStats';
import { loadParagraphs } from '../utils/ParagraphLoader';

type PracticeMode = 'beginner' | 'intermediate' | 'advanced';

const TypingPractice: React.FC = () => {
  const [mode, setMode] = useState<PracticeMode>('beginner');
  const [targetText, setTargetText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [stats, setStats] = useState<{ wpm: number; accuracy: number; totalChars: number; errors: number } | null>(null);

  useEffect(() => {
    startNewPractice();
  }, [mode]);

  const startNewPractice = () => {
    setTargetText(loadParagraphs(mode));
    setIsTyping(false);
    setStats(null);
  };

  const handleTypingStart = () => {
    setIsTyping(true);
  };

  const handleTypingEnd = (finalStats: { wpm: number; accuracy: number; totalChars: number; errors: number }) => {
    setIsTyping(false);
    setStats(finalStats);
  };

  return (
    <div className="py-12 px-4 max-w-7xl mx-auto">
      <SEO 
        title="Free Typing Practice Online | Improve Your Typing Speed" 
        description="Practice typing online for free. Improve your speed and accuracy with guided typing exercises for beginners and advanced typists." 
      />

      <Link to="/" className="text-blue-600 hover:underline text-sm font-bold mb-6 inline-flex items-center gap-1">
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back to Home
      </Link>

      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4 tracking-tight">Free Typing Practice Online</h1>
        <p className="text-lg text-slate-500 max-w-2xl mx-auto">Improve your typing speed with guided practice. No pressure, just progress.</p>
      </div>

      {/* Practice Area */}
      <div className="bg-white rounded-3xl p-8 md:p-12 border border-slate-100 shadow-sm mb-16">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <div className="flex bg-slate-100 p-1 rounded-xl">
            {(['beginner', 'intermediate', 'advanced'] as PracticeMode[]).map((m) => (
              <button
                key={m}
                onClick={() => setMode(m)}
                className={`px-6 py-2 rounded-lg text-sm font-semibold capitalize transition-all ${
                  mode === m ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                {m}
              </button>
            ))}
          </div>
          <button 
            onClick={startNewPractice}
            className="flex items-center gap-2 text-slate-500 hover:text-blue-600 font-medium transition-colors"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Restart
          </button>
        </div>

        {!stats ? (
          <TypingBox 
            targetText={targetText} 
            onTypingStart={handleTypingStart} 
            onTypingEnd={handleTypingEnd} 
            isTestMode={false} 
          />
        ) : (
          <div className="text-center">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Practice Completed!</h2>
            <TypingStats {...stats} />
            <button 
              onClick={startNewPractice}
              className="bg-blue-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-700 transition-all shadow-md"
            >
              Practice Again
            </button>
          </div>
        )}
      </div>

      {/* Helpful Tips Section */}
      <section className="grid md:grid-cols-3 gap-8 mb-16">
        <div className="bg-blue-50 p-8 rounded-2xl border border-blue-100">
          <div className="text-3xl mb-4">🖐️</div>
          <h3 className="text-xl font-bold text-blue-900 mb-2">Finger Placement</h3>
          <p className="text-blue-800 text-sm leading-relaxed">Always return your fingers to the home row (ASDF JKL;). Let your fingers memorize the distance to each key.</p>
        </div>
        <div className="bg-emerald-50 p-8 rounded-2xl border border-emerald-100">
          <div className="text-3xl mb-4">🪑</div>
          <h3 className="text-xl font-bold text-emerald-900 mb-2">Posture Matters</h3>
          <p className="text-emerald-800 text-sm leading-relaxed">Sit up straight, keep your wrists elevated (not resting on the keyboard), and position your screen at eye level.</p>
        </div>
        <div className="bg-purple-50 p-8 rounded-2xl border border-purple-100">
          <div className="text-3xl mb-4">📅</div>
          <h3 className="text-xl font-bold text-purple-900 mb-2">Consistency is Key</h3>
          <p className="text-purple-800 text-sm leading-relaxed">Practice for 15 minutes every day rather than 2 hours once a week. Muscle memory builds through regular repetition.</p>
        </div>
      </section>

      {/* Internal SEO Linking */}
      <section className="bg-slate-900 text-center py-12 px-4 rounded-3xl shadow-xl">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Want to test your speed?</h2>
        <p className="text-slate-400 mb-8 max-w-xl mx-auto">Ready to see how fast you can type under pressure? Take our official typing speed test and see where you rank.</p>
        <Link 
          to="/typing-test" 
          className="inline-block bg-blue-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-blue-500 transition-all shadow-lg shadow-blue-900/50"
        >
          Take our typing speed test
        </Link>
      </section>

      {/* Structured Content for SEO */}
      <section className="mt-24 prose prose-slate max-w-none">
        <h2 className="text-3xl font-bold text-slate-900 mb-6">Benefits of Daily Typing Practice</h2>
        <p className="text-slate-600 mb-8 leading-relaxed text-lg">
          Regular typing practice is essential for anyone looking to improve their productivity in the digital age. Whether you are a student, a professional, or preparing for government exams, mastering touch typing can save you hundreds of hours every year. By practicing daily, you develop muscle memory, which allows you to type without looking at the keyboard, significantly reducing errors and increasing your overall speed.
        </p>

        <h2 className="text-3xl font-bold text-slate-900 mb-6">How to Improve Typing Speed</h2>
        <ul className="space-y-4 text-slate-600 text-lg">
          <li><strong>Focus on Accuracy First:</strong> Speed will naturally follow once you stop making mistakes. Aim for 98%+ accuracy.</li>
          <li><strong>Use the Correct Fingers:</strong> Learn the home row method and stick to it, even if it feels slower at first.</li>
          <li><strong>Look at the Screen:</strong> Resist the temptation to look down at your hands. Trust your muscle memory.</li>
          <li><strong>Take Breaks:</strong> Typing fatigue leads to errors. Take short breaks to rest your hands and eyes.</li>
        </ul>
      </section>
    </div>
  );
};

export default TypingPractice;
