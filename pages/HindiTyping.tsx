
import React from 'react';
import SEO from '../components/SEO';
import { Link } from 'react-router-dom';

const HindiTyping: React.FC = () => {
  return (
    <div className="py-12 px-4 max-w-7xl mx-auto">
      <SEO 
        title="Hindi Typing Test - KrutiDev & Mangal Remington GAIL" 
        description="Practice Hindi typing for UP Police, High Court, and state government exams. Online practice tools for KrutiDev 010 and Mangal Remington GAIL layouts." 
      />

      <div className="text-center mb-16">
        <h1 className="text-4xl font-extrabold text-slate-900 mb-4">Hindi Typing Mastery</h1>
        <p className="text-lg text-slate-500 max-w-2xl mx-auto">Choose your keyboard layout and practice for state-level government examinations.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
          <div className="w-16 h-16 bg-orange-100 text-orange-600 rounded-2xl flex items-center justify-center text-3xl mb-6 font-bold">क</div>
          <h2 className="text-2xl font-bold mb-4 text-slate-900">KrutiDev 010</h2>
          <p className="text-slate-500 mb-6 leading-relaxed">Most popular legacy font for Hindi typing exams in Uttar Pradesh and MP government jobs.</p>
          <button disabled className="w-full bg-slate-100 text-slate-400 py-3 rounded-xl font-semibold cursor-not-allowed">
            Coming Soon
          </button>
        </div>

        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
          <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center text-3xl mb-6 font-bold">अ</div>
          <h2 className="text-2xl font-bold mb-4 text-slate-900">Mangal (Remington GAIL)</h2>
          <p className="text-slate-500 mb-6 leading-relaxed">The modern standard for CPCT and High Court exams across India. Unicode based.</p>
          <button disabled className="w-full bg-slate-100 text-slate-400 py-3 rounded-xl font-semibold cursor-not-allowed">
            Coming Soon
          </button>
        </div>
      </div>

      <div className="mt-20 text-center bg-blue-50 p-12 rounded-3xl">
        <h3 className="text-2xl font-bold mb-4">Why is Hindi typing different?</h3>
        <p className="text-slate-600 max-w-3xl mx-auto mb-0 leading-relaxed">
          Hindi typing often involves Alt codes and character combinations that aren't present in English typing. 
          State exams usually have a 25-30 WPM requirement with strict accuracy. We are building a custom rendering 
          engine to support these complex characters natively in your browser.
        </p>
      </div>
    </div>
  );
};

export default HindiTyping;
