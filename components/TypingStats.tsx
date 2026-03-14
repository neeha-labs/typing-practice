import React from 'react';

interface TypingStatsProps {
  wpm: number;
  accuracy: number;
  totalChars: number;
  errors: number;
}

const TypingStats: React.FC<TypingStatsProps> = ({ wpm, accuracy, totalChars, errors }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
      <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm text-center">
        <div className="text-sm text-slate-500 font-medium mb-1 uppercase tracking-wider">Net WPM</div>
        <div className="text-4xl font-black text-blue-600">{wpm}</div>
      </div>
      <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm text-center">
        <div className="text-sm text-slate-500 font-medium mb-1 uppercase tracking-wider">Accuracy</div>
        <div className="text-4xl font-black text-emerald-500">{accuracy}%</div>
      </div>
      <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm text-center">
        <div className="text-sm text-slate-500 font-medium mb-1 uppercase tracking-wider">Characters</div>
        <div className="text-4xl font-black text-slate-700">{totalChars}</div>
      </div>
      <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm text-center">
        <div className="text-sm text-slate-500 font-medium mb-1 uppercase tracking-wider">Errors</div>
        <div className="text-4xl font-black text-rose-500">{errors}</div>
      </div>
    </div>
  );
};

export default TypingStats;
