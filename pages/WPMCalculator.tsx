
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import SEO, { SITE_URL } from '../components/SEO';
import TypingLinksSection from '../components/TypingLinksSection';

const WPMCalculator: React.FC = () => {
  const [words, setWords] = useState<string>('');
  const [minutes, setMinutes] = useState<string>('');
  const [seconds, setSeconds] = useState<string>('');
  const [result, setResult] = useState<number | null>(null);
  
  const location = useLocation();
  const path = location.pathname;

  const getSEOData = () => {
    if (path.includes('words-per-minute-calculator')) return {
      title: "Words Per Minute Calculator | Check Your Typing Speed",
      description: "Quickly check your typing speed with our words per minute calculator. Find out exactly how fast you type and track your WPM progress accurately over time.",
      keywords: "words per minute calculator, WPM calculator, check typing speed, typing speed calculator online, calculate words per minute"
    };
    if (path.includes('accuracy')) return {
      title: "Typing Accuracy Calculator | Check Error Percentage",
      description: "Measure your precision using our free typing accuracy calculator. Calculate your exact error percentage to improve keystroke accuracy and overall speed.",
      keywords: "typing accuracy calculator, calculate typing accuracy, error percentage calculator, typing precision test, improve typing accuracy"
    };
    return {
      title: "WPM Calculator | Fast & Free Typing Speed Calculator",
      description: "Our WPM calculator helps you instantly calculate your typing speed. Just enter your words and time to get an accurate words per minute score for free.",
      keywords: "WPM calculator, calculate typing speed, typing speed calculator, fast WPM check, words per minute test"
    };
  };

  const seo = getSEOData();

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

  const calculatorSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "HowTo",
        "name": "How to Calculate Words Per Minute (WPM)",
        "description": "Learn how to manually calculate your typing speed using our words per minute calculator.",
        "step": [
          {
            "@type": "HowToStep",
            "name": "Count the words",
            "text": "Count the total number of words you typed. Remember that in typing tests, a 'word' is standardized as 5 characters."
          },
          {
            "@type": "HowToStep",
            "name": "Measure the time",
            "text": "Note down the exact time it took you to type those words in minutes and seconds."
          },
          {
            "@type": "HowToStep",
            "name": "Use the WPM Calculator",
            "text": "Enter the number of words and the time into our free typing speed calculator to get your exact WPM."
          }
        ]
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "What is a WPM calculator?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "A WPM calculator is a tool that determines your typing speed in Words Per Minute. It takes the total number of words typed and divides it by the total time taken in minutes."
            }
          },
          {
            "@type": "Question",
            "name": "How do I use a typing speed calculator?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "To use our typing speed calculator, simply enter the total number of words you typed and the time it took (in minutes and seconds). The calculator will instantly display your WPM."
            }
          }
        ]
      }
    ]
  };

  return (
    <div className="py-12 px-4 max-w-7xl mx-auto">
      <SEO 
        title={seo.title} 
        description={seo.description} 
        keywords={(seo as any).keywords}
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
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Understanding Your Typing Metrics: How WPM is Calculated</h2>
          <p className="text-slate-600 leading-relaxed mb-4">
            The standard mathematical formula for calculating typing speed is universally straightforward. It involves taking the total number of words typed and dividing it by the exact total time taken in minutes. Our <strong>typing speed calculator online</strong> automates this process, performing the calculation instantly and accurately so you can focus entirely on your practice schedule.
          </p>
          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 mb-8">
            <p className="font-mono text-sm text-slate-700">
              Gross WPM = Total Characters Typed / 5 / Total Time (in minutes)
            </p>
          </div>
          <h3 className="text-xl font-bold text-slate-900 mb-4">What Exactly Counts as a "Word"?</h3>
          <p className="text-slate-600 leading-relaxed mb-4">
            If you've ever felt that a test with complicated vocabulary slowed you down unfairly, you'll be pleased to know that in professional typing tests and government examinations, a "word" is strictly standardized. One word is defined as exactly 5 keystrokes (characters), inclusive of spaces, numbers, and punctuation marks. This standard ensures that the linguistic difficulty or word length of the text doesn't skew your final WPM score.
          </p>
          <p className="text-slate-600 leading-relaxed mb-6">
            For example, if you manage to type 250 characters within exactly one minute, your officially registered speed is 50 WPM (250 divided by 5 equals 50). This allows typists to measure themselves against a fixed global standard.
          </p>
          
          <h3 className="text-xl font-bold text-slate-900 mb-4">Gross WPM vs. Net WPM</h3>
          <p className="text-slate-600 leading-relaxed mb-4">
            It's vital to differentiate between Gross WPM and Net WPM. The formula above represents <strong>Gross WPM</strong>, which is your raw, unadjusted speed. However, professional environments and competitive typing examinations deeply care about accuracy. <strong>Net WPM</strong> takes your Gross WPM and subtracts a penalty for every uncorrected error left in the final text. If you type extremely fast but leave dozens of spelling mistakes, your Net WPM will drop significantly.
          </p>

          <h3 className="text-xl font-bold text-slate-900 mb-4">Why Use a Manual WPM Calculator?</h3>
          <p className="text-slate-600 leading-relaxed mb-4">
            While most modern online typing environments calculate your speed automatically behind the scenes, you might often find yourself needing a manual <strong>words per minute calculator</strong>. For instance, if you are transcribing a raw audio file for freelance work, copying text from a physical paperback book, or taking a specialized offline legacy test, automated tracking isn't possible. In these scenarios, simply count the total words you produced, note your stopwatch time, and plug the variables into our robust tool above to get immediate results.
          </p>
        </div>
      </div>

      <section className="bg-slate-900 rounded-3xl p-12 text-center text-white shadow-xl mb-16">
        <h2 className="text-3xl font-bold mb-6">Ready for a real test?</h2>
        <p className="text-slate-400 mb-10 max-w-2xl mx-auto">Instead of manual calculation, let our automated engine measure your speed and accuracy in real-time. Try our industry-standard 60 second typing test.</p>
        <Link to="/typing-test/60-second-typing-test" className="inline-block bg-blue-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-blue-500 transition-all">
          Take a 60 Second Typing Test
        </Link>
      </section>

      <TypingLinksSection />
    </div>
  );
};

export default WPMCalculator;
