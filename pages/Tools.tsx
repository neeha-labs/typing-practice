
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import SEO from '../components/SEO';

const Tools: React.FC = () => {
  const { toolId } = useParams();

  if (toolId === 'wpm-calculator') return <WPMCalculator />;
  if (toolId === 'typing-accuracy-calculator') return <AccuracyCalculator />;

  return (
    <div className="py-12 px-4 max-w-7xl mx-auto">
      <SEO 
        title="Typing Tools & Calculators" 
        description="Free tools to calculate your typing speed (WPM) and accuracy. Professional calculators for government exam preparation."
      />
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
        title="WPM Calculator - Calculate Your Typing Speed Online" 
        description="Use our free WPM calculator to find your gross and net typing speed. Essential tool for SSC, CGL, and Banking exam preparation."
      />
      <Link to="/tools" className="text-blue-600 hover:underline text-sm font-bold mb-4 block">← Back to Tools</Link>
      <h1 className="text-3xl font-bold mb-8">Words Per Minute (WPM) Calculator</h1>
      
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
        title="Typing Accuracy Calculator - Check Your Percentage" 
        description="Calculate your typing accuracy percentage instantly. Learn how to improve your precision for professional data entry and clerk roles."
      />
      <Link to="/tools" className="text-blue-600 hover:underline text-sm font-bold mb-4 block">← Back to Tools</Link>
      <h1 className="text-3xl font-bold mb-8">Typing Accuracy Calculator</h1>
      
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
    </div>
  );
};

export default Tools;
