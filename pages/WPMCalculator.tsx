
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

const WPMCalculator: React.FC = () => {
  const [words, setWords] = useState<string>('');
  const [minutes, setMinutes] = useState<string>('');
  const [seconds, setSeconds] = useState<string>('');
  const [result, setResult] = useState<number | null>(null);

  const calculateWPM = (e: React.FormEvent) => {
    e.preventDefault();
    const w = parseFloat(words);
    const m = parseFloat(minutes) || 0;
    const s = parseFloat(seconds) || 0;
    
    const totalMinutes = m + (s / 60);
    
    if (w > 0 && totalMinutes > 0) {
      setResult(Math.round(w / totalMinutes));
    } else {
      setResult(null);
    }
  };

  return (
    <div className="py-12 px-4 max-w-7xl mx-auto">
      <SEO 
        title="Words Per Minute (WPM) Calculator | Calculate Typing Speed" 
        description="Calculate your typing speed in Words Per Minute (WPM) with our free online calculator. Learn how WPM is calculated and how to improve your speed." 
      />

      <Link to="/tools" className="text-blue-600 hover:underline text-sm font-bold mb-6 inline-flex items-center gap-1">
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back to Tools
      </Link>

      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4 tracking-tight">Words Per Minute (WPM) Calculator</h1>
        <p className="text-lg text-slate-500 max-w-2xl mx-auto">A simple tool to manually calculate your typing speed based on the number of words and time taken.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-24">
        <div className="bg-white rounded-3xl p-8 md:p-12 border border-slate-100 shadow-xl">
          <form onSubmit={calculateWPM} className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Number of Words Typed</label>
              <input 
                type="number" 
                value={words}
                onChange={(e) => setWords(e.target.value)}
                placeholder="e.g. 250"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Minutes</label>
                <input 
                  type="number" 
                  value={minutes}
                  onChange={(e) => setMinutes(e.target.value)}
                  placeholder="e.g. 5"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Seconds</label>
                <input 
                  type="number" 
                  value={seconds}
                  onChange={(e) => setSeconds(e.target.value)}
                  placeholder="e.g. 30"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                />
              </div>
            </div>
            <button 
              type="submit"
              className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-blue-700 transition-all shadow-lg shadow-blue-200"
            >
              Calculate WPM
            </button>
          </form>

          {result !== null && (
            <div className="mt-12 p-8 bg-blue-50 rounded-2xl border border-blue-100 text-center animate-fade-in">
              <span className="block text-sm font-bold text-blue-600 uppercase tracking-widest mb-2">Your Typing Speed</span>
              <span className="text-6xl font-black text-blue-900">{result}</span>
              <span className="block text-xl font-bold text-blue-700 mt-2">Words Per Minute</span>
            </div>
          )}
        </div>

        <div className="prose prose-slate max-w-none">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">How WPM is Calculated</h2>
          <p className="text-slate-600 leading-relaxed mb-4">
            The standard formula for calculating typing speed is quite simple. It involves taking the total number of words typed and dividing it by the total time taken in minutes.
          </p>
          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 mb-8">
            <p className="font-mono text-sm text-slate-700">
              WPM = Total Words / Total Time (in minutes)
            </p>
          </div>
          <h3 className="text-xl font-bold text-slate-900 mb-4">What counts as a "Word"?</h3>
          <p className="text-slate-600 leading-relaxed mb-4">
            In professional typing tests, a "word" is standardized as 5 characters, including spaces and punctuation. This ensures that the difficulty of the text doesn't unfairly affect the WPM score.
          </p>
          <p className="text-slate-600 leading-relaxed">
            For example, if you type 250 characters in one minute, your speed is 50 WPM (250 / 5 = 50).
          </p>
        </div>
      </div>

      <section className="bg-slate-900 rounded-3xl p-12 text-center text-white shadow-xl">
        <h2 className="text-3xl font-bold mb-6">Ready for a real test?</h2>
        <p className="text-slate-400 mb-10 max-w-2xl mx-auto">Instead of manual calculation, let our automated engine measure your speed and accuracy in real-time.</p>
        <Link to="/typing-test" className="inline-block bg-blue-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-blue-500 transition-all">
          Take a Typing Test
        </Link>
      </section>
    </div>
  );
};

export default WPMCalculator;
