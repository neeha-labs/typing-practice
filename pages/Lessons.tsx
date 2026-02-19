
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import SEO from '../components/SEO';
import TypingArea from '../components/TypingArea';
import { LESSONS } from '../constants';

type Level = 'beginner' | 'intermediate' | 'advanced';

const Lessons: React.FC = () => {
  const { level: levelParam } = useParams();
  const navigate = useNavigate();
  const [level, setLevel] = useState<Level | null>(null);
  const [activeLesson, setActiveLesson] = useState<any>(null);

  useEffect(() => {
    if (levelParam && ['beginner', 'intermediate', 'advanced'].includes(levelParam)) {
      setLevel(levelParam as Level);
      setActiveLesson(null);
    } else if (!levelParam) {
      setLevel(null);
      setActiveLesson(null);
    }
  }, [levelParam]);

  const handleLessonSelect = (lesson: any) => {
    setActiveLesson(lesson);
  };

  const handleBack = () => {
    setActiveLesson(null);
  };

  const getSEOData = () => {
    if (!level) return {
      title: "Free Touch Typing Lessons - Beginner to Advanced",
      description: "Master touch typing with our structured lessons. From home row basics to advanced symbol drills, we help you build muscle memory and speed."
    };
    if (level === 'beginner') return {
      title: "Beginner Typing Lessons – Build Speed & Confidence",
      description: "Start your typing journey with our beginner lessons. Master the home row and build foundational muscle memory without looking at the keys."
    };
    if (level === 'intermediate') return {
      title: "Intermediate Typing Lessons – Improve Flow & Rhythm",
      description: "Improve your flow with intermediate typing drills. Focus on common word patterns and consistent typing rhythm to boost your WPM."
    };
    return {
      title: "Advanced Typing Lessons – Master Numbers & Symbols",
      description: "Push your limits with advanced typing lessons featuring complex sentences, numbers, and symbols. Target 98%+ accuracy for professional mastery."
    };
  };

  const seo = getSEOData();

  const handleLevelChange = (l: Level) => {
    navigate(`/lessons/${l}`);
  };

  if (!level) {
    return (
      <div className="py-12 px-4 max-w-7xl mx-auto">
        <SEO title={seo.title} description={seo.description} />
        <div className="text-center mb-16">
          <h1 className="text-4xl font-extrabold text-slate-900 mb-4">Typing Lessons Hub</h1>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto">Structured learning paths designed to take you from zero to pro. Choose your starting point.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              id: 'beginner',
              name: 'Beginner',
              desc: 'Master the home row and basic finger placement. Perfect for absolute beginners.',
              icon: '🎹',
              color: 'bg-emerald-50 text-emerald-700 border-emerald-100'
            },
            {
              id: 'intermediate',
              name: 'Intermediate',
              desc: 'Build rhythm and flow with common word patterns and longer sentences.',
              icon: '🚀',
              color: 'bg-blue-50 text-blue-700 border-blue-100'
            },
            {
              id: 'advanced',
              name: 'Advanced',
              desc: 'Challenge yourself with numbers, symbols, and complex technical texts.',
              icon: '💎',
              color: 'bg-purple-50 text-purple-700 border-purple-100'
            }
          ].map((l) => (
            <Link 
              key={l.id} 
              to={`/lessons/${l.id}`}
              className={`p-8 rounded-3xl border-2 transition-all hover:shadow-xl flex flex-col h-full bg-white border-slate-100 hover:border-blue-200`}
            >
              <div className="text-5xl mb-6">{l.icon}</div>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">{l.name} Path</h2>
              <p className="text-slate-500 mb-8 flex-grow leading-relaxed">{l.desc}</p>
              <div className="bg-slate-900 text-white py-3 rounded-xl font-bold text-center">
                Explore Lessons
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-24 bg-slate-50 rounded-3xl p-8 md:p-12">
          <h2 className="text-2xl font-bold mb-8 text-center">Why Learn Touch Typing?</h2>
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="font-bold text-slate-900 mb-3">Double Your Productivity</h3>
              <p className="text-slate-600">The average person types at 40 WPM. Touch typists easily reach 80+ WPM, saving you hours of work every week.</p>
            </div>
            <div>
              <h3 className="font-bold text-slate-900 mb-3">Focus on Content, Not Keys</h3>
              <p className="text-slate-600">When you don't have to look at your fingers, your brain is free to focus on what you're actually writing.</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-12 px-4 max-w-7xl mx-auto">
      <SEO title={seo.title} description={seo.description} />

      <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <Link to="/lessons" className="text-blue-600 hover:underline text-sm font-bold mb-2 block">← All Lessons</Link>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2 capitalize">{level} Typing Lessons</h1>
          <p className="text-slate-500">Master muscle memory with structured drills.</p>
        </div>
        
        {!activeLesson && (
          <div className="bg-slate-200 p-1 rounded-xl flex self-start overflow-x-auto max-w-full">
            {(['beginner', 'intermediate', 'advanced'] as Level[]).map((l) => (
              <button
                key={l}
                onClick={() => handleLevelChange(l)}
                className={`px-6 py-2 rounded-lg text-sm font-bold capitalize transition-all whitespace-nowrap ${
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in duration-500">
          {LESSONS[level].map((lesson, idx) => (
            <div 
              key={lesson.id} 
              className="bg-white border border-slate-200 p-8 rounded-2xl hover:border-blue-500 transition-all shadow-sm group cursor-pointer flex flex-col"
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
              <button className="mt-auto w-full bg-blue-50 text-blue-700 py-3 rounded-xl font-bold group-hover:bg-blue-600 group-hover:text-white transition-all">
                Start Lesson
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between bg-blue-50 p-6 rounded-2xl border border-blue-100 gap-4">
            <div>
              <span className="text-blue-600 font-bold text-xs uppercase tracking-widest block mb-1">{level} level</span>
              <h2 className="text-2xl font-bold text-slate-900">{activeLesson.name}</h2>
            </div>
            <button 
              onClick={handleBack}
              className="bg-white text-slate-600 px-6 py-2 rounded-lg font-bold hover:shadow-md transition-all border border-slate-200 w-full sm:w-auto"
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
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
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

      <div className="mt-16 text-center">
        <h3 className="text-xl font-bold text-slate-900 mb-6">Ready to test your speed?</h3>
        <div className="flex flex-wrap justify-center gap-4">
          <Link to="/typing-test/1-minute" className="bg-slate-900 text-white px-6 py-3 rounded-xl font-bold hover:bg-slate-800 transition-all">
            1 Minute Test
          </Link>
          <Link to="/typing-test/5-minute" className="bg-slate-900 text-white px-6 py-3 rounded-xl font-bold hover:bg-slate-800 transition-all">
            5 Minute Test
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Lessons;
