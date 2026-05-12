import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import TypingBox from '../components/TypingBox';
import TypingStats from '../components/TypingStats';
import TypingLinksSection from '../components/TypingLinksSection';
import { loadParagraphs } from '../utils/ParagraphLoader';

type PracticeMode = 'beginner' | 'intermediate' | 'advanced';

const TypingPractice: React.FC = () => {
  const [mode, setMode] = useState<PracticeMode>('beginner');
  const [targetText, setTargetText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [stats, setStats] = useState<{ wpm: number; accuracy: number; totalChars: number; errors: number } | null>(null);
  const [resetKey, setResetKey] = useState(0);

  useEffect(() => {
    startNewPractice();
  }, [mode]);

  const startNewPractice = () => {
    setTargetText(loadParagraphs(mode));
    setIsTyping(false);
    setStats(null);
    setResetKey(prev => prev + 1);
  };

  const handleTypingStart = () => {
    setIsTyping(true);
  };

  const handleTypingEnd = (finalStats: { wpm: number; accuracy: number; totalChars: number; errors: number }) => {
    setIsTyping(false);
    setStats(finalStats);
  };

  return (
    <div className="pb-24 bg-white">
      <SEO 
        title="Free Typing Practice Online | Paragraphs for Speed Test" 
        description="Access our free typing practice tool online with engaging paragraphs. Step up your WPM and test your keystroke accuracy using professional typing pages for practice." 
        keywords="typing practice, free typing practice online, paragraph for typing practice, typing pages for practice, improve typing accuracy"
      />

      <section className="bg-slate-900 pt-16 pb-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <Link to="/" className="text-blue-400 hover:text-white text-sm font-bold mb-8 inline-flex items-center gap-2 transition-colors">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Dashboard
          </Link>
          <h1 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight">Level Up Your Typing Skills with Daily Practice</h1>
          <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Boost your productivity with a high-quality <strong>paragraph for typing practice</strong>. 
            Our tool helps you master precision using dedicated <strong>typing pages for practice</strong>.
          </p>
        </div>
      </section>

      {/* Practice Area - Tool First */}
      <div className="max-w-5xl mx-auto px-4 -mt-12 relative z-10 mb-20">
        <div className="bg-white rounded-[3.5rem] p-8 md:p-12 border-4 border-slate-900 shadow-2xl">
          <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-6">
            <div className="flex bg-slate-100 p-1.5 rounded-2xl">
              {(['beginner', 'intermediate', 'advanced'] as PracticeMode[]).map((m) => (
                <button
                  key={m}
                  onClick={() => setMode(m)}
                  className={`px-8 py-3 rounded-xl text-sm font-bold capitalize transition-all ${
                    mode === m ? 'bg-white text-blue-600 shadow-lg scale-105' : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  {m}
                </button>
              ))}
            </div>
            <button 
              onClick={startNewPractice}
              className="group flex items-center gap-3 text-slate-400 hover:text-blue-600 font-bold transition-all uppercase tracking-widest text-xs"
            >
              <svg className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              New Paragraph
            </button>
          </div>

          {!stats ? (
            <div className="min-h-[300px]">
              <TypingBox 
                targetText={targetText} 
                onTypingStart={handleTypingStart} 
                onTypingEnd={handleTypingEnd} 
                isTestMode={false} 
                resetKey={resetKey}
              />
            </div>
          ) : (
            <div className="text-center py-10">
              <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center text-4xl mx-auto mb-6">✨</div>
              <h2 className="text-3xl font-black text-slate-900 mb-8">Practice Session Complete!</h2>
              <div className="mb-12">
                <TypingStats {...stats} />
              </div>
              <button 
                onClick={startNewPractice}
                className="bg-slate-900 text-white px-12 py-5 rounded-2xl font-black text-xl hover:bg-blue-600 transition-all shadow-xl hover:scale-105 active:scale-95"
              >
                LEVEL UP AGAIN
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Helpful Tips Section */}
      <section className="max-w-7xl mx-auto px-4 grid md:grid-cols-3 gap-8 mb-24">
        <div className="group bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all h-full flex flex-col">
          <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center text-4xl mb-6 group-hover:bg-blue-600 group-hover:text-white transition-all">🖐️</div>
          <h3 className="text-2xl font-bold text-slate-900 mb-4 tracking-tight">Home Row Mastery</h3>
          <p className="text-slate-500 leading-relaxed font-medium">Your fingers must live on <strong>ASDF</strong> and <strong>JKL;</strong>. Every other key is just a temporary excursion. Muscle memory starts here.</p>
        </div>
        <div className="group bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all h-full flex flex-col">
          <div className="w-16 h-16 bg-emerald-50 rounded-2xl flex items-center justify-center text-4xl mb-6 group-hover:bg-emerald-600 group-hover:text-white transition-all">🪑</div>
          <h3 className="text-2xl font-bold text-slate-900 mb-4 tracking-tight">Ergonomic Stability</h3>
          <p className="text-slate-500 leading-relaxed font-medium">Keep your wrists floating above the keyboard, not resting on it. This allows for a wider reach and much higher typing speeds without fatigue.</p>
        </div>
        <div className="group bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all h-full flex flex-col">
          <div className="w-16 h-16 bg-purple-50 rounded-2xl flex items-center justify-center text-4xl mb-6 group-hover:bg-purple-600 group-hover:text-white transition-all">📅</div>
          <h3 className="text-2xl font-bold text-slate-900 mb-4 tracking-tight">The 15-Minute Rule</h3>
          <p className="text-slate-500 leading-relaxed font-medium">One 15-minute daily typing practice online is 10x more effective than a single weekly 2-hour session. Consistency builds permanent memory.</p>
        </div>
      </section>

      {/* Structured Content for SEO */}
      <section className="max-w-5xl mx-auto px-4 py-24 border-t border-slate-100">
        <div className="prose prose-slate max-w-none">
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-10 tracking-tight">Best Way to Use Typing Pages for Practice</h2>
          <p className="text-xl text-slate-600 leading-relaxed mb-6">
            In the modern digital workplace, your typing speed is essentially your bandwidth. Whether you are coding, writing reports, or communicating in Slack, slower typing creates a bottleneck for your ideas. Structured <strong>online typing paragraph practice</strong> allows you to widen that bandwidth and type at the speed of thought.
          </p>
          <p className="text-lg text-slate-600 leading-relaxed mb-12">
            Searching for a specific <strong>paragraph for typing practice</strong>? Our platform provides a curated list of text samples that vary in difficulty, ensuring you are always challenged. By using these specialized <strong>typing pages for practice</strong>, you can track your accuracy and speed across different technical domains.
          </p>

          <div className="grid md:grid-cols-2 gap-12 mb-20 not-prose">
             <div className="bg-slate-50 p-10 rounded-[3rem]">
                <h4 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                  <span className="w-10 h-10 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center text-sm italic font-black">SSC</span>
                  SSC CGL Typing Practice
                </h4>
                <p className="text-slate-600 leading-relaxed">
                   If you are preparing for government exams, focus on our "Advanced" mode. This section provides an <Link to="/exam-mode" className="text-blue-600 font-bold hover:underline">ssc cgl typing test practice</Link> environment with high-density paragraphs and strict accuracy requirements. 
                </p>
             </div>
             <div className="bg-blue-50 p-10 rounded-[3rem]">
                <h4 className="text-2xl font-bold text-slate-900 mb-6 font-black capitalize">Paragraphs vs. Sentences</h4>
                <p className="text-slate-600 leading-relaxed">
                   While <Link to="/lessons" className="text-blue-600 font-bold hover:underline">typing practice sentences</Link> are great for beginners, professional typists should always use long-form paragraphs. Paragraph practice forces you to maintain posture and handle punctuation naturally.
                </p>
             </div>
          </div>

          <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-8">Steps to Professional Level (80+ WPM)</h2>
          <p className="text-slate-600 leading-relaxed mb-10 text-lg font-medium italic">
             "To type at the speed of thought, one must stop thinking about the fingers."
          </p>
          <div className="space-y-8 mb-20">
            <div className="flex gap-8">
               <div className="font-black text-slate-200 text-6xl leading-none">01</div>
               <div>
                  <h4 className="text-2xl font-bold text-slate-900 mb-2">Home Row Discipline</h4>
                  <p className="text-slate-600 leading-relaxed">Never cheat. Even if it feels slower at first, use the correct finger for every key. Every time you use the wrong finger, you reset your muscle memory progress.</p>
               </div>
            </div>
            <div className="flex gap-8">
               <div className="font-black text-slate-200 text-6xl leading-none">02</div>
               <div>
                  <h4 className="text-2xl font-bold text-slate-900 mb-2">Eliminate the Gaze</h4>
                  <p className="text-slate-600 leading-relaxed">Looking at the keyboard is like using training wheels that secretly puncture your tires. Remove the crutch. If you get stuck, use your index fingers to find the FJ bumps and reset.</p>
               </div>
            </div>
            <div className="flex gap-8">
               <div className="font-black text-slate-200 text-6xl leading-none">03</div>
               <div>
                  <h4 className="text-2xl font-bold text-slate-900 mb-2">Endurance Training</h4>
                  <p className="text-slate-600 leading-relaxed">Start with 30-second bursts, then move to our 2-minute and 5-minute <Link to="/typing-test" className="text-blue-600 font-bold hover:underline">typing speed tests</Link>. Endurance is what separates office workers from professional typists.</p>
               </div>
            </div>
          </div>

          <div className="bg-slate-900 rounded-[3rem] p-16 text-center shadow-2xl not-prose mt-16">
             <h2 className="text-3xl font-bold text-white mb-6 text-center">Practice FAQ</h2>
             <div className="grid gap-6 max-w-4xl mx-auto text-left mt-10">
                <div className="bg-white/5 p-8 rounded-[2rem] border border-white/10">
                   <h4 className="font-bold text-white text-lg mb-3">How to practice typing paragraphs online?</h4>
                   <p className="text-slate-400">The most effective way to practice typing paragraphs online is to use a structured tool like ours that provides real-time feedback. Start with easy paragraphs and move to more complex ones as your accuracy reaches 98%.</p>
                </div>
                <div className="bg-white/5 p-8 rounded-[2rem] border border-white/10">
                   <h4 className="font-bold text-white text-lg mb-3">What is the best way to improve typing speed for SSC CGL?</h4>
                   <p className="text-slate-400">For SSC CGL, you should practice with administrative-style paragraphs for 15 minutes a day. Our <Link to="/exam-mode" className="text-blue-400 hover:underline">ssc cgl typing test practice</Link> mode uses official word-count logic to help you pass the skill test.</p>
                </div>
             </div>
          </div>
        </div>
      </section>

      <section className="bg-white rounded-3xl p-8 md:p-12 border border-slate-100 shadow-sm mt-16 max-w-5xl mx-auto mb-16 text-left">
        <h2 className="text-2xl font-bold text-slate-900 mb-4">About Our Typing Practice Online</h2>
        <p className="text-slate-600 mb-4">
          Consistent typing practice online is the single most effective way to improve your keyboarding skills. Unlike standardized tests that stress you with a ticking timer, this practice environment is designed to help you focus entirely on your form, your rhythm, and your accuracy.
        </p>
        <p className="text-slate-600 mb-4">
          Whether you are a beginner looking to solidify your home-row technique or an advanced user aiming to break the 100 WPM ceiling, untimed practice sessions are mandatory. The paragraphs served here are specifically curated to balance common vocabulary with challenging letter transitions.
        </p>
        <h3 className="text-xl font-bold text-slate-900 mb-3">How to Maximize Your Practice Sessions</h3>
        <p className="text-slate-600 mb-4">
          We recommend dedicating at least 15 minutes a day to focused typing practice online. Turn off distractions and do not look at your keyboard. If you make a mistake, gently press the backspace key without moving your entire hand from the home-row position. Slow down initially to ensure 100% accuracy; raw speed will naturally follow as your muscle memory strengthens.
        </p>
        <p className="text-slate-600">
          Once you feel comfortable typing paragraphs with over 95% accuracy in this practice environment, challenge yourself by heading over to our timed tests. Consistent toggle between relaxed practice and timed sprints is the proven method for rapid typing improvement.
        </p>
      </section>

      <TypingLinksSection />
    </div>
  );
};

export default TypingPractice;
