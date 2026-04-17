
import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import SEO, { SITE_URL } from '../components/SEO';
import TypingArea from '../components/TypingArea';
import TypingLinksSection from '../components/TypingLinksSection';
import { LESSONS } from '../constants';

type Level = 'beginner' | 'intermediate' | 'advanced';

const Lessons: React.FC = () => {
  const { level: levelParam } = useParams();
  const navigate = useNavigate();
  const [level, setLevel] = useState<Level | null>(null);
  const [activeLesson, setActiveLesson] = useState<any>(null);
  const [resetKey, setResetKey] = useState(0);

  useEffect(() => {
    if (levelParam && ['beginner', 'intermediate', 'advanced'].includes(levelParam)) {
      setLevel(levelParam as Level);
      setActiveLesson(null);
      setResetKey(prev => prev + 1);
    } else if (!levelParam) {
      setLevel(null);
      setActiveLesson(null);
      setResetKey(prev => prev + 1);
    }
  }, [levelParam]);

  const handleLessonSelect = (lesson: any) => {
    setActiveLesson(lesson);
    setResetKey(prev => prev + 1);
  };

  const handleBack = () => {
    setActiveLesson(null);
    setResetKey(prev => prev + 1);
  };

  const handleLessonFinish = useCallback(() => {
    // Lesson finished
  }, []);

  const getSEOData = () => {
    if (!level) return {
      title: "Learn Touch Typing Free Online – Typing Finger Position Practice",
      description: "Master touch typing with our free online lessons. Get the best typing finger position practice and start with basic typing letter practice to build a solid foundation."
    };
    if (level === 'beginner') return {
      title: "Beginner Typing Lessons – Typing Letter Practice Online",
      description: "Start your typing journey with our beginner lessons. Master foundational typing letter practice and build essential muscle memory without looking at the keys."
    };
    if (level === 'intermediate') return {
      title: "Intermediate Lessons – Typing Practice Sentences",
      description: "Improve your flow with intermediate typing practice sentences. Focus on common word patterns and consistent typing rhythm to boost your WPM."
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

  const lessonsSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Course",
        "name": "Learn Touch Typing Free Online",
        "description": "A comprehensive, free online course to learn touch typing from beginner to advanced levels.",
        "provider": {
          "@type": "Organization",
          "name": "Typing-Practice.online",
          "sameAs": SITE_URL
        },
        "hasCourseInstance": {
          "@type": "CourseInstance",
          "courseMode": "online"
        }
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "How can I learn touch typing for free online?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "You can learn touch typing for free online using our structured lessons. Start with the beginner path to master the home row, then progress to intermediate and advanced drills to build speed and accuracy."
            }
          },
          {
            "@type": "Question",
            "name": "How long does it take to learn touch typing?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "With 15-30 minutes of daily practice, most people can learn the basic touch typing finger placements in 1-2 weeks. Reaching a professional speed of 60+ WPM usually takes a few months of consistent practice."
            }
          }
        ]
      }
    ]
  };

  if (!level) {
    return (
      <div className="py-12 px-4 max-w-7xl mx-auto">
        <SEO title={seo.title} description={seo.description} schema={lessonsSchema} />
        
        <Link to="/" className="text-blue-600 hover:underline text-sm font-bold mb-6 inline-flex items-center gap-1">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Home
        </Link>

        <div className="text-center mb-16">
          <h1 className="text-4xl font-extrabold text-slate-900 mb-4">Learn Touch Typing Free & Improve Finger Precision</h1>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto">
            Our structured multi-level course provides specialized <strong>typing letter practice</strong> for absolute beginners and <strong>typing practice sentences</strong> for those aiming for professional speed.
          </p>
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

        <div className="mt-24 bg-slate-50 rounded-3xl p-8 md:p-12 border border-slate-200">
          <h2 className="text-3xl font-bold mb-8 text-center text-slate-900">Why Learn Touch Typing?</h2>
          <div className="grid md:grid-cols-2 gap-12 mb-12">
            <div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Double Your Productivity</h3>
              <p className="text-slate-600 leading-relaxed">The average person types at 40 WPM using the "hunt and peck" method. Touch typists easily reach 80+ WPM, saving you hours of work every week. Whether you are coding, writing emails, or taking an online exam, speed is your biggest advantage.</p>
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Focus on Content, Not Keys</h3>
              <p className="text-slate-600 leading-relaxed">When you don't have to look at your fingers, your brain is free to focus on what you're actually writing. This reduces cognitive load and allows for better flow state, improving the quality of your work.</p>
            </div>
          </div>
          
          <h2 className="text-2xl font-bold mb-6 text-slate-900">Effective Typing Finger Position Practice</h2>
          <p className="text-slate-600 leading-relaxed mb-6">
            Our platform provides a completely free, structured curriculum to help you master the keyboard. Here is how to perform effective <strong>typing finger position practice</strong>:
          </p>
          <ul className="space-y-4 text-slate-600 list-disc pl-6 mb-8">
            <li><strong>Start with the Home Row:</strong> The beginner path focuses on ASDF and JKL;. Your fingers should always rest here at the start of every session.</li>
            <li><strong>Typing Letter Practice:</strong> Don't rush into words. Spend the first few days mastering individual letters to ensure your fingers know the exact distance to each key.</li>
            <li><strong>Advanced Typing Practice Sentences:</strong> Once letters are comfortable, move to full sentences. This teaches you how to handle capital letters and punctuation without pausing.</li>
          </ul>
        </div>
      </div>
    );
  }

  return (
    <div className="py-12 px-4 max-w-7xl mx-auto">
      <SEO title={seo.title} description={seo.description} schema={lessonsSchema} />

      <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <Link to="/lessons" className="text-blue-600 hover:underline text-sm font-bold mb-4 flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to All Lessons
          </Link>
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
            onFinish={handleLessonFinish}
            showHighlight={true}
            allowBackspace={true}
            resetKey={resetKey}
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
          <Link to="/typing-test/60-second-typing-test" className="bg-slate-900 text-white px-6 py-3 rounded-xl font-bold hover:bg-slate-800 transition-all">
            60 Second Test
          </Link>
          <Link to="/typing-test/120-second-typing-test" className="bg-slate-900 text-white px-6 py-3 rounded-xl font-bold hover:bg-slate-800 transition-all">
            120 Second Test
          </Link>
        </div>
      </div>

      <TypingLinksSection />
    </div>
  );
};

export default Lessons;
