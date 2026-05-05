
import React, { useState } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import SEO from '../components/SEO';
import PageSEOContent from '../components/PageSEOContent';
import TypingLinksSection from '../components/TypingLinksSection';

const Tools: React.FC = () => {
  const { toolId } = useParams();
  const location = useLocation();
  const path = location.pathname;

  if (toolId === 'wpm-calculator' || path.includes('/wpm-calculator')) return <WPMCalculator />;
  if (toolId === 'typing-accuracy-calculator' || path.includes('/typing-accuracy-calculator')) return <AccuracyCalculator />;

  return (
    <div className="py-12 px-4 max-w-7xl mx-auto">
      <SEO 
        title="Typing Tools & Calculators" 
        description="Free tools to calculate your typing speed (WPM) and accuracy. Professional calculators for government exam preparation."
      />
      <Link to="/" className="text-blue-600 hover:underline text-sm font-bold mb-6 inline-flex items-center gap-1">
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back to Home
      </Link>
      <div className="text-center mb-16">
        <h1 className="text-4xl font-extrabold text-slate-900 mb-4">Professional Typing Tools</h1>
        <p className="text-lg text-slate-500 max-w-2xl mx-auto">Free utility tools designed for serious typists and exam aspirants.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        <Link to="/tools/wpm-calculator" className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl transition-all group">
          <div className="text-4xl mb-4">🧮</div>
          <h2 className="text-2xl font-bold mb-3 text-slate-900 group-hover:text-blue-600 transition-colors">WPM Calculator</h2>
          <p className="text-slate-500 leading-relaxed">Calculate your Words Per Minute (WPM) based on characters and time. Uses standard SSC/Banking formulas.</p>
        </Link>

        <Link to="/tools/typing-accuracy-calculator" className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl transition-all group">
          <div className="text-4xl mb-4">🎯</div>
          <h2 className="text-2xl font-bold mb-3 text-slate-900 group-hover:text-blue-600 transition-colors">Accuracy Calculator</h2>
          <p className="text-slate-500 leading-relaxed">Determine your typing accuracy percentage by comparing total characters and errors.</p>
        </Link>
      </div>

      <PageSEOContent 
        topic="Typing Speed Calculators"
        offers="Calculate your gross WPM, net WPM, and detailed accuracy percentages instantly."
        steps={[
          "Choose the WPM Calculator or Accuracy Calculator based on your needs.",
          "Enter your test metrics such as total characters typed, minutes passed, and error count.",
          "Instantly view your calculated results to benchmark your progress.",
          "Review the standard formulas used by professional examinations like SSC."
        ]}
        benefits={[
          "Takes the guesswork out of judging your typing test performance.",
          "Uses official formulas authorized by typing certifications.",
          "Helps you understand whether you need to fix accuracy or push raw speed."
        ]}
        relatedPath="/typing-test/300-second-typing-test"
        relatedName="5-Minute Typing Challenge"
      />

      <TypingLinksSection />
    </div>
  );
};

const WPMCalculator = () => {
  const [chars, setChars] = useState<string>('');
  const [minutes, setMinutes] = useState<string>('1');
  const [errors, setErrors] = useState<string>('0');

  const grossWpm = (Number(chars) / 5) / (Number(minutes) || 1);
  const netWpm = Math.max(0, grossWpm - (Number(errors) / (Number(minutes) || 1)));

  return (
    <div className="py-12 px-4 max-w-3xl mx-auto">
      <SEO 
        title="Words Per Minute Calculator Typing | How Typing Speed is Calculated" 
        description="Calculate your typing speed in Words Per Minute (WPM) with our free online calculator. Learn how typing speed is calculated and how to improve your WPM." 
      />
      <Link to="/tools" className="text-blue-600 hover:underline text-sm font-bold mb-4 block">← Back to Tools</Link>
      <h1 className="text-3xl font-bold mb-8">Calculate Your Exact Words Per Minute Score</h1>
      
      <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
        <div className="grid md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Total Characters</label>
            <input 
              type="number" 
              value={chars} 
              onChange={(e) => setChars(e.target.value)}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="e.g. 1500"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Time (Minutes)</label>
            <input 
              type="number" 
              value={minutes} 
              onChange={(e) => setMinutes(e.target.value)}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="e.g. 5"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Errors (Optional)</label>
            <input 
              type="number" 
              value={errors} 
              onChange={(e) => setErrors(e.target.value)}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="e.g. 5"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 pt-6">
          <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100 text-center">
            <span className="text-xs font-bold text-blue-600 uppercase tracking-widest">Gross WPM</span>
            <div className="text-4xl font-extrabold text-blue-900 mt-2">{Math.round(grossWpm)}</div>
          </div>
          <div className="bg-emerald-50 p-6 rounded-2xl border border-emerald-100 text-center">
            <span className="text-xs font-bold text-emerald-600 uppercase tracking-widest">Net WPM</span>
            <div className="text-4xl font-extrabold text-emerald-900 mt-2">{Math.round(netWpm)}</div>
          </div>
        </div>

        <div className="prose prose-slate prose-sm max-w-none pt-8 border-t border-slate-100">
          <h3>How is WPM calculated?</h3>
          <p>The standard formula for WPM used in most professional typing tests is:</p>
          <p><code>WPM = (Total Characters / 5) / Time in Minutes</code></p>
          <p>Net WPM accounts for errors by subtracting them from the gross speed. This is the metric most government exams (like SSC) use for qualification.</p>
        </div>
      </div>

      <section className="bg-white rounded-3xl p-8 md:p-12 border border-slate-100 shadow-sm mt-12 mb-12 text-left">
        <h2 className="text-2xl font-bold text-slate-900 mb-4">About Our Free WPM Calculator</h2>
        <p className="text-slate-600 mb-4">
          Understanding how fast you type requires more than simply guessing your speed. Our words per minute calculator uses the standardized formula adopted by typing schools, government examination boards, and professional certifications worldwide. It measures exactly how efficiently you are hitting the keyboard based on characters typed over your chosen duration.
        </p>
        <p className="text-slate-600 mb-4">
          Most users are surprised to learn that a "word" in typing metrics is exactly five characters long, regardless of the actual English words you typed. This ensures that typing a heavy technical paragraph is graded on the same scale as typing a simple children's story, providing a truly objective baseline score.
        </p>
        <h3 className="text-xl font-bold text-slate-900 mb-3">Gross WPM vs Net WPM Breakdown</h3>
        <p className="text-slate-600 mb-4">
          Simply input your total characters and the time elapsed. The calculator will immediately output your Gross WPM, which is your raw speed. If you also input your total errors, you will see your Net WPM. The Net WPM is your true, penalized score that determines whether you pass or fail in professional banking or government typing skill tests.
        </p>
        <p className="text-slate-600">
          Use this WPM calculator regularly after your un-guided typing drills to map your progress. By keeping a log of your Net WPM over several weeks, you will see exactly how your accuracy and speed metrics correspond and improve.
        </p>
      </section>

      <TypingLinksSection />
    </div>
  );
};

const AccuracyCalculator = () => {
  const [total, setTotal] = useState<string>('');
  const [errors, setErrors] = useState<string>('');

  const accuracy = Number(total) > 0 ? ((Number(total) - Number(errors)) / Number(total)) * 100 : 100;

  return (
    <div className="py-12 px-4 max-w-3xl mx-auto">
      <SEO 
        title="Typing Accuracy Calculator | Check Error Percentage" 
        description="Measure your precision using our free typing accuracy calculator. Calculate your exact error percentage to improve keystroke accuracy and overall speed."
        keywords="typing accuracy calculator, calculate typing accuracy, error percentage calculator, typing precision test, improve typing accuracy"
      />
      <Link to="/tools" className="text-blue-600 hover:underline text-sm font-bold mb-4 block">← Back to Tools</Link>
      <h1 className="text-3xl font-bold mb-8">Calculate Your Exact Typing Accuracy Percentage</h1>
      
      <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Total Characters Typed</label>
            <input 
              type="number" 
              value={total} 
              onChange={(e) => setTotal(e.target.value)}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="e.g. 2000"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Number of Errors</label>
            <input 
              type="number" 
              value={errors} 
              onChange={(e) => setErrors(e.target.value)}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="e.g. 10"
            />
          </div>
        </div>

        <div className="bg-emerald-50 p-8 rounded-3xl border border-emerald-100 text-center">
          <span className="text-sm font-bold text-emerald-600 uppercase tracking-widest">Accuracy Percentage</span>
          <div className="text-6xl font-extrabold text-emerald-900 mt-2">{accuracy.toFixed(2)}%</div>
        </div>

        <div className="prose prose-slate prose-sm max-w-none pt-8 border-t border-slate-100">
          <h3>Why Accuracy Matters</h3>
          <p>In high-stakes environments like government exams or professional transcription, accuracy is often more critical than raw speed. Most exams require a minimum accuracy of 95% to 98%.</p>
          <p>Focusing on accuracy first builds better muscle memory, which naturally leads to higher speeds over time without the penalty of frequent mistakes.</p>
        </div>
      </div>

      <section className="bg-white rounded-3xl p-8 md:p-12 border border-slate-100 shadow-sm mt-12 mb-12 text-left">
        <h2 className="text-2xl font-bold text-slate-900 mb-4">About Our Typing Accuracy Calculator</h2>
        <p className="text-slate-600 mb-4">
          Speed is useless without precision. Our typing accuracy calculator is built to help typists pinpoint the exact percentage of correct keystrokes they achieve during any session. Whether you are typing from a textbook, coding a program, or transcribing an audio file, measuring your accuracy percentage is vital to improvement.
        </p>
        <p className="text-slate-600 mb-4">
          Professional standards typically demand an accuracy rate of 95% or higher. When your accuracy drops below this threshold, the time you spend returning to backspace and correct your mistakes heavily degrades your overall words per minute. This calculator makes the math simple—just input your total characters and how many errors you made.
        </p>
        <h3 className="text-xl font-bold text-slate-900 mb-3">Why Calculate Your Precision?</h3>
        <p className="text-slate-600 mb-4">
          If you are applying for data entry jobs, legal transcription, or medical records positions, you will often find strict precision requirements. If your calculated accuracy is consistently hovering around 90%, it is a strong signal that you need to slow your raw speed down and rebuild your finger memory using guided lessons.
        </p>
        <p className="text-slate-600">
          We recommend using this accuracy calculator alongside our WPM calculator. By tracking both metrics, you can easily identify if you are sacrificing too much exactness for the sake of speed. Remember, typing fast is easy; typing fast and flawlessly takes genuine practice.
        </p>
      </section>

      <TypingLinksSection />
    </div>
  );
};

export default Tools;
