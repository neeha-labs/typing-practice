
import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate, Link, useLocation } from 'react-router-dom';
import SEO, { SITE_URL } from '../components/SEO';
import TypingArea from '../components/TypingArea';
import TypingLinksSection from '../components/TypingLinksSection';
import PageSEOContent from '../components/PageSEOContent';
import Breadcrumbs from '../components/Breadcrumbs';
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

  const location = useLocation();
  const path = location.pathname;

  const getSEOData = () => {
    if (path.includes('beginner')) return {
      title: "Typing Test for Beginners | Free Lessons",
      description: "Step-by-step beginner typing lessons for everyone. Focus on proper finger placement and essential typing letter practice to learn touch typing correctly.",
      keywords: "beginner typing lessons, typing letter practice, learn touch typing, typing basics, finger placement"
    };
    if (path.includes('intermediate')) return {
      title: "Intermediate Typing Lessons | Master Practice Sentences",
      description: "Take your skills to the next level with intermediate typing lessons. Improve your flow using complete typing practice sentences and increase overall WPM.",
      keywords: "intermediate typing lessons, typing practice sentences, boost WPM, typing flow, intermediate typing practice"
    };
    if (path.includes('advanced')) return {
      title: "Advanced Typing Lessons | Professional Speed Training",
      description: "Challenge yourself with our advanced typing lessons. Master numbers, complex symbols, and difficult text passages to achieve true professional typing speed.",
      keywords: "advanced typing lessons, professional typing speed, master numbers typing, heavy typing drills, typing mastery"
    };
    if (path.includes('learn-touch-typing-free-online')) return {
      title: "Learn Touch Typing Free — Finger Position Guide",
      description: "Learn touch typing online for free. Master finger positions and home row keys with guided lessons.",
      canonicalPath: "/lessons"
    };
    return {
      title: "Free Typing Lessons for Beginners | Practice",
      description: "Free typing lessons for beginners. Learn proper finger placement and touch typing techniques step by step.",
      canonicalPath: "/lessons"
    };
  };

  const seo = getSEOData();

  const handleLevelChange = (l: Level) => {
    navigate(`/lessons/${l}`);
  };

  const getDisplayContent = () => {
    if (location.pathname.includes('learn-touch-typing-free-online')) {
      return {
        h1: "Learn Touch Typing Free Online — Finger Position Guide",
        p: "Master touch typing from scratch with our free finger position lessons. Learn the correct hand placement and home row keys to type without looking at the keyboard."
      };
    }
    return {
      h1: "Start Free Touch Typing Practice Lessons Today",
      p: "Our structured multi-level course provides specialized typing letter practice for absolute beginners and typing practice sentences for those aiming for professional speed."
    };
  };

  const displayContent = getDisplayContent();

  if (!level) {
    return (
      <div className="py-12 px-4 max-w-7xl mx-auto">
        <SEO title={seo.title} description={seo.description} keywords={(seo as any).keywords} canonicalPath={(seo as any).canonicalPath} />
        
        <Breadcrumbs />

        <div className="text-center mb-16">
          <h1 className="text-4xl font-extrabold text-slate-900 mb-4">{displayContent.h1}</h1>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto">
            {displayContent.p}
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

        <PageSEOContent 
          topic="Touch Typing Lessons"
          offers="Step-by-step guided lessons tailored to your exact skill level, from single home row keys up to advanced punctuation drills."
          steps={[
            "Select your comfort level: Beginner, Intermediate, or Advanced.",
            "Choose Lesson 1 and carefully place your fingers on the Home Row (ASDF JKL;).",
            "Follow the on-screen highlights without looking down at your keyboard.",
            "Repeat the lesson until you reach 100% accuracy before moving on."
          ]}
          benefits={[
            "Build correct muscle memory that lasts a lifetime.",
            "Double your productivity by typing at the speed of thought.",
            "Reduce wrist strain and RSI by typing ergonomically."
          ]}
          relatedPath="/typing-test/60-second-typing-test"
          relatedName="60 Second Typing Test"
        />

      </div>
    );
  }

  return (
    <div className="py-12 px-4 max-w-7xl mx-auto">
      <SEO title={seo.title} description={seo.description} keywords={(seo as any).keywords} canonicalPath={(seo as any).canonicalPath} />

      <Breadcrumbs />

      <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">
            {level === 'beginner' ? 'Free Typing Test for Beginners — Start Your Touch Typing Journey' : `${level.charAt(0).toUpperCase() + level.slice(1)} Typing Lessons`}
          </h1>
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

      <section className="bg-white rounded-3xl p-8 md:p-12 border border-slate-100 shadow-sm mt-16 max-w-5xl mx-auto mb-16 text-left">
        <h2 className="text-2xl font-bold text-slate-900 mb-4">About Our Touch Typing Practice Lessons</h2>
        <p className="text-slate-600 mb-4">
          Learning to touch type correctly from the beginning will accelerate your typing speed more than any other method. Our typing practice lessons are designed from the ground up to prevent the "hunt and peck" bad habits that plague most computer users. By starting at the beginner level, you train your hands to navigate independently without relying on your eyes. Our beginner lessons teach you to touch type without looking at the keyboard, which is the foundation of improving your typing speed.
        </p>
        <p className="text-slate-600 mb-4">
          The core of touch typing revolves around the home row (ASDF and JKL;). Once you build muscle memory for these central keys, navigating to the top and bottom rows becomes a seamless fluid motion rather than a targeted strike. Our progressive lesson plans guide you exactly through this anatomical transition.
        </p>
        <h3 className="text-xl font-bold text-slate-900 mb-3">Progressing Through Practice Sentences</h3>
        <p className="text-slate-600 mb-4">
          If you are already familiar with the keyboard layout, jumping into our intermediate typing practice sentences will help you build momentum. Here, we move beyond individual keystrokes and focus on "n-grams", which are common letter groupings (like "ing" or "tion"). Professional typists do not read letter-by-letter; they read word rhythms.
        </p>
        <p className="text-slate-600">
          Make it a goal to complete at least two lessons daily. Attempting to cram ten lessons in one day leads to fatigue and actually degrades muscle recall. Short, focused, and tension-free practice is the undisputed best way to increase your typing velocity and eliminate spelling errors.
        </p>
      </section>

      {level === 'beginner' && (
        <div className="space-y-12 max-w-5xl mx-auto mb-16 text-left">
          <section className="bg-white rounded-3xl p-8 md:p-12 border border-slate-100 shadow-sm">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">What is the Beginner Typing Test for Beginners?</h2>
            <p className="text-slate-600 mb-4 leading-relaxed">
              Our typing test for beginners is specifically designed for people who are new to typing or want to improve their basic keyboard skills. Unlike standard typing tests that use complex vocabulary, our beginner typing test uses simple common English words that help you build confidence and muscle memory from the very first session.
            </p>
            <p className="text-slate-600 leading-relaxed">
              The beginner typing test measures your current words per minute (WPM) score and accuracy percentage in real time. This gives you a clear baseline to track your improvement as you progress through the beginner lessons.
            </p>
          </section>

          <section className="bg-white rounded-3xl p-8 md:p-12 border border-slate-100 shadow-sm">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">How to Start Touch Typing as a Beginner</h2>
            <p className="text-slate-600 mb-4 leading-relaxed">
              Touch typing is the ability to type without looking at the keyboard. It is the single most important skill to develop for improving your typing speed. Most beginners start by looking at the keyboard which severely limits how fast they can ever type.
            </p>
            <p className="text-slate-600 mb-4 leading-relaxed">
              To start touch typing correctly: First place your left hand fingers on A S D F keys. Place your right hand fingers on J K L ; keys. Your thumbs should rest on the spacebar. This position is called the home row and it is where your fingers return after every keystroke.
            </p>
            <p className="text-slate-600 leading-relaxed">
              Practice our beginner typing lessons daily for 15 minutes and you will be touch typing naturally within 2 weeks.
            </p>
          </section>

          <section className="bg-white rounded-3xl p-8 md:p-12 border border-slate-100 shadow-sm">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Frequently Asked Questions</h2>

            <h3 className="text-xl font-bold text-slate-900 mb-2 mt-6">How long does it take to learn touch typing as a beginner?</h3>
            <p className="text-slate-600 mb-4 leading-relaxed">
              Most beginners can learn the basic touch typing technique within 1 to 2 weeks of daily 15 minute practice sessions. Reaching a comfortable typing speed of 40 WPM typically takes 4 to 6 weeks of consistent practice.
            </p>

            <h3 className="text-xl font-bold text-slate-900 mb-2 mt-6">What typing speed should a beginner aim for?</h3>
            <p className="text-slate-600 mb-4 leading-relaxed">
              As a beginner, aim for 20 to 25 WPM with high accuracy in your first week. Focus on accuracy over speed. Once you consistently type with 95%+ accuracy, your typing speed will naturally increase with practice.
            </p>

            <h3 className="text-xl font-bold text-slate-900 mb-2 mt-6">Is this typing test for beginners completely free?</h3>
            <p className="text-slate-600 mb-4 leading-relaxed">
              Yes. Our typing test for beginners and all beginner lessons are completely free with no signup or registration required. Practice as many times as you want at no cost.
            </p>

            <h3 className="text-xl font-bold text-slate-900 mb-2 mt-6">What makes a good typing test for beginners?</h3>
            <p className="text-slate-600 leading-relaxed">
              A good typing test for beginners uses simple common words, provides real-time feedback on errors, shows both speed and accuracy metrics and allows unlimited practice without pressure. Our beginner typing test meets all these criteria.
            </p>
          </section>

          <section className="bg-white rounded-3xl p-8 md:p-12 border border-slate-100 shadow-sm">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Your Journey from Beginner to Advanced Typist</h2>
            <p className="text-slate-600 mb-4 leading-relaxed">
              Starting with our typing test for beginners is just the first step in your typing journey. Here is what your progress will look like with consistent daily practice:
            </p>
            <p className="text-slate-600 mb-4 leading-relaxed">
              Week 1 to 2: Master home row keys and reach 20 WPM with good accuracy. Focus entirely on touch typing without looking at keyboard.
            </p>
            <p className="text-slate-600 mb-4 leading-relaxed">
              Week 3 to 4: Expand to full keyboard and reach 30 to 35 WPM. Your typing speed will increase naturally as muscle memory develops.
            </p>
            <p className="text-slate-600 mb-4 leading-relaxed">
              Week 5 to 8: Reach 40 to 50 WPM consistently. You are now typing at the global average and ready for intermediate and advanced lessons.
            </p>
            <p className="text-slate-600 leading-relaxed">
              After completing beginner lessons, continue with our intermediate and advanced typing lessons to keep improving your typing speed beyond 60 WPM.
            </p>
          </section>
        </div>
      )}

      <TypingLinksSection />
    </div>
  );
};

export default Lessons;
