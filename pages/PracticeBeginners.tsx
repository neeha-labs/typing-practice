
import React, { useState } from 'react';
import SEO from '../components/SEO';
import TypingArea from '../components/TypingArea';
import { LESSONS } from '../constants';

type Level = 'beginner' | 'intermediate' | 'advanced';

const PracticeBeginners: React.FC = () => {
  const [level, setLevel] = useState<Level>('beginner');
  const [activeLesson, setActiveLesson] = useState<any>(null);

  const handleLessonSelect = (lesson: any) => {
    setActiveLesson(lesson);
  };

  const handleBack = () => {
    setActiveLesson(null);
  };

  const getSEOData = () => {
    if (level === 'beginner') return {
      title: "Beginner Touch Typing Lessons - Home Row Basics",
      description: "Start your typing journey with our beginner lessons. Master the home row and build foundational muscle memory without looking at the keys."
    };
    if (level === 'intermediate') return {
      title: "Intermediate Typing Drills - Word Patterns & Rhythm",
      description: "Improve your flow with intermediate typing drills. Focus on common word patterns and consistent typing rhythm to boost your WPM."
    };
    return {
      title: "Advanced Typing Challenges - Numbers & Symbols",
      description: "Push your limits with advanced typing lessons featuring complex sentences, numbers, and symbols. Target 98%+ accuracy for professional mastery."
    };
  };

  const seo = getSEOData();

  return (
    <div className="py-12 px-4 max-w-7xl mx-auto">
      <SEO title={seo.title} description={seo.description} />

      <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Practice Center</h1>
          <p className="text-slate-500">Master muscle memory with structured drills.</p>
        </div>
        
        {!activeLesson && (
          <div className="bg-slate-200 p-1 rounded-xl flex self-start">
            {(['beginner', 'intermediate', 'advanced'] as Level[]).map((l) => (
              <button
                key={l}
                onClick={() => setLevel(l)}
                className={`px-6 py-2 rounded-lg text-sm font-bold capitalize transition-all ${
                  level === l 
                    ? 'bg-white text-blue-600 shadow-sm' 
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {l}
              </button>
            ))}
          </div>
        )}
      </div>

      {!activeLesson ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in duration-500">
          {LESSONS[level].map((lesson, idx) => (
            <div 
              key={lesson.id} 
              className="bg-white border border-slate-200 p-8 rounded-2xl hover:border-blue-500 transition-all shadow-sm group cursor-pointer"
              onClick={() => handleLessonSelect(lesson)}
            >
              <div className="flex justify-between items-start mb-4">
                <span className="text-blue-600 font-bold text-xs uppercase tracking-widest">Lesson {idx + 1}</span>
                <span className="text-2xl group-hover:scale-125 transition-transform">⌨️</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-4">{lesson.name}</h3>
              <div className="bg-slate-50 p-4 rounded-lg mono text-sm mb-6 text-slate-500 border border-slate-100 truncate">
                {lesson.text}
              </div>
              <button className="w-full bg-blue-50 text-blue-700 py-3 rounded-xl font-bold group-hover:bg-blue-600 group-hover:text-white transition-all">
                Start Lesson
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="flex items-center justify-between bg-blue-50 p-6 rounded-2xl border border-blue-100">
            <div>
              <span className="text-blue-600 font-bold text-xs uppercase tracking-widest block mb-1">{level} level</span>
              <h2 className="text-2xl font-bold text-slate-900">{activeLesson.name}</h2>
            </div>
            <button 
              onClick={handleBack}
              className="bg-white text-slate-600 px-6 py-2 rounded-lg font-bold hover:shadow-md transition-all border border-slate-200"
            >
              Cancel Lesson
            </button>
          </div>

          <TypingArea 
            key={activeLesson.id}
            targetText={activeLesson.text}
            duration={60}
            onFinish={() => {}}
            showHighlight={true}
            allowBackspace={true}
          />
        </div>
      )}

      {!activeLesson && (
        <div className="mt-20 grid md:grid-cols-3 gap-8">
           <div className="bg-emerald-50 p-8 rounded-3xl border border-emerald-100">
             <h4 className="font-bold text-emerald-900 mb-2">Beginner Path</h4>
             <p className="text-emerald-700 text-sm leading-relaxed">Focus strictly on finger placement. Don't look at the keyboard. Speed doesn't matter yet.</p>
           </div>
           <div className="bg-blue-50 p-8 rounded-3xl border border-blue-100">
             <h4 className="font-bold text-blue-900 mb-2">Intermediate Path</h4>
             <p className="text-blue-700 text-sm leading-relaxed">Start working on common 'n-grams' (character sequences). Focus on consistent rhythm.</p>
           </div>
           <div className="bg-purple-50 p-8 rounded-3xl border border-purple-100">
             <h4 className="font-bold text-purple-900 mb-2">Advanced Path</h4>
             <p className="text-purple-700 text-sm leading-relaxed">Increase complexity with punctuation and numbers. Aim for high accuracy above 98%.</p>
           </div>
        </div>
      )}
    </div>
  );
};

export default PracticeBeginners;
