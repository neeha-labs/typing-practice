
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import SEO from '../components/SEO';

interface BlogProps {
  predefinedPostId?: string;
}

const Blog: React.FC<BlogProps> = ({ predefinedPostId }) => {
  const { postId: routePostId } = useParams();
  const postId = predefinedPostId || routePostId;

  if (postId === 'how-to-improve-typing-speed') return <ImproveSpeedPost />;
  if (postId === 'common-typing-mistakes') return <CommonMistakesPost />;
  if (postId === 'how-wpm-is-calculated') return <WPMCalculationPost />;
  if (postId === 'government-exam-typing-tips') return <ExamTipsPost />;

  return (
    <div className="py-12 px-4 max-w-7xl mx-auto">
      <SEO 
        title="Typing Tips & Educational Blog" 
        description="Learn how to improve your typing speed, avoid common mistakes, and prepare for government typing exams with our expert guides."
      />
      <div className="text-center mb-16">
        <Link to="/" className="text-blue-600 hover:underline text-sm font-bold mb-4 block">← Back to Home</Link>
        <h1 className="text-4xl font-extrabold text-slate-900 mb-4">Typing Mastery Blog</h1>
        <p className="text-lg text-slate-500 max-w-2xl mx-auto">Expert advice, guides, and tips to help you become a professional touch typist.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {[
          {
            id: 'how-to-improve-typing-speed',
            title: 'How to Improve Your Typing Speed: 10 Expert Tips',
            desc: 'A comprehensive guide on moving from 30 WPM to 80+ WPM with consistent practice.',
            icon: '🚀'
          },
          {
            id: 'common-typing-mistakes',
            title: '7 Common Typing Mistakes and How to Fix Them',
            desc: 'Identify the bad habits holding you back and learn how to correct them for better accuracy.',
            icon: '⚠️'
          },
          {
            id: 'how-wpm-is-calculated',
            title: 'Understanding WPM: How Typing Speed is Calculated',
            desc: 'Deep dive into Gross WPM vs Net WPM and why the difference matters for your career.',
            icon: '📊'
          },
          {
            id: 'government-exam-typing-tips',
            title: 'Cracking Government Typing Exams: A Complete Guide',
            desc: 'Specific strategies for SSC CHSL, CGL, and Banking typing tests.',
            icon: '🏆'
          }
        ].map((post) => (
          <Link 
            key={post.id} 
            to={`/blog/${post.id}`}
            className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl transition-all group flex flex-col"
          >
            <div className="text-4xl mb-4">{post.icon}</div>
            <h2 className="text-2xl font-bold mb-3 text-slate-900 group-hover:text-blue-600 transition-colors">{post.title}</h2>
            <p className="text-slate-500 leading-relaxed mb-6 flex-grow">{post.desc}</p>
            <div className="text-blue-600 font-bold text-sm flex items-center gap-2">
              Read Article
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

const ImproveSpeedPost = () => (
  <article className="py-12 px-4 max-w-3xl mx-auto">
    <SEO 
      title="How to Improve Typing Speed - 10 Expert Tips" 
      description="Learn the best techniques to increase your typing speed. From finger placement to rhythm, master touch typing with our expert guide."
      ogType="article"
    />
    <div className="flex justify-between items-center mb-8">
      <Link to="/blog" className="text-blue-600 hover:underline text-sm font-bold flex items-center gap-1">
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
        Back to Blog
      </Link>
      <Link to="/" className="text-slate-500 hover:text-blue-600 hover:underline text-sm font-bold">Home</Link>
    </div>
    
    <header className="mb-12">
      <div className="flex items-center gap-2 text-blue-600 text-sm font-bold uppercase tracking-wider mb-4">
        <span>Education</span>
        <span className="text-slate-300">•</span>
        <span>5 Min Read</span>
      </div>
      <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 leading-tight">How to Improve Your Typing Speed: 10 Expert Tips</h1>
      <div className="flex items-center gap-4 text-slate-500 text-sm">
        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold">TP</div>
        <div>
          <p className="font-bold text-slate-900">Typing-Practice Team</p>
          <p>Updated March 2026</p>
        </div>
      </div>
    </header>

    <div className="prose">
      <p className="text-xl text-slate-600 leading-relaxed mb-8 italic border-l-4 border-blue-200 pl-6">Mastering touch typing is one of the most valuable skills in the modern digital economy. Whether you're an administrative professional, a developer, or a student, typing faster allows you to get your thoughts onto the screen with minimal friction.</p>
      
      <h3>1. Master the Home Row</h3>
      <p>The foundation of all fast typing is the home row (<strong>ASDF JKL;</strong>). Your fingers should always return to these keys. The small bumps on the 'F' and 'J' keys are there to help you find your position without looking.</p>

      <h3>2. Stop Looking at the Keyboard</h3>
      <p>This is the hardest but most important rule. Looking down slows you down and prevents muscle memory from forming. If you make a mistake, try to feel your way to the correct key rather than looking.</p>

      <h3>3. Focus on Accuracy First</h3>
      <p>Speed is a byproduct of accuracy. If you type fast but make many mistakes, your net speed will be low because of the time spent correcting errors. Aim for <strong>98% accuracy</strong> before trying to push your speed.</p>

      <h3>4. Maintain Good Posture</h3>
      <p>Sit up straight, keep your feet flat on the floor, and ensure your wrists are slightly elevated. Good ergonomics prevent fatigue and long-term injury.</p>

      <h3>5. Use All Ten Fingers</h3>
      <p>Many people "hunt and peck" with just two or four fingers. To reach speeds above 50 WPM, you must use all ten fingers, including your pinkies for keys like 'A', ';', 'Shift', and 'Enter'.</p>

      <h3>6. Practice Consistently</h3>
      <blockquote>"Consistency beats intensity. Practicing for 15 minutes every day is far more effective than practicing for two hours once a week."</blockquote>
      <p>Make typing practice a daily habit. Even a short session keeps your muscle memory sharp.</p>

      <h3>7. Learn Keyboard Shortcuts</h3>
      <p>Every time you move your hand to the mouse, you lose typing momentum. Learn common shortcuts like <code>Ctrl+C</code>, <code>Ctrl+V</code>, <code>Ctrl+Z</code>, and navigation shortcuts to keep your hands on the keyboard.</p>

      <h3>8. Find Your Rhythm</h3>
      <p>Fast typists don't type in erratic bursts; they type with a smooth, continuous rhythm. Try to keep the time between each keystroke as even as possible.</p>

      <h3>9. Take Regular Breaks</h3>
      <p>Typing fatigue leads to mistakes and slower speeds. Take a 5-minute break every hour to stretch your fingers, wrists, and shoulders to prevent strain and maintain peak performance.</p>

      <h3>10. Track Your Progress</h3>
      <p>You can't improve what you don't measure. Take regular typing tests to monitor your Words Per Minute (WPM) and accuracy. Celebrate small milestones to stay motivated!</p>
    </div>
  </article>
);

const CommonMistakesPost = () => (
  <article className="py-12 px-4 max-w-3xl mx-auto">
    <SEO 
      title="Common Typing Mistakes & How to Fix Them" 
      description="Identify and correct the most common typing errors. Improve your accuracy and speed by fixing these bad habits."
      ogType="article"
    />
    <div className="flex justify-between items-center mb-8">
      <Link to="/blog" className="text-blue-600 hover:underline text-sm font-bold flex items-center gap-1">
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
        Back to Blog
      </Link>
      <Link to="/" className="text-slate-500 hover:text-blue-600 hover:underline text-sm font-bold">Home</Link>
    </div>

    <header className="mb-12">
      <div className="flex items-center gap-2 text-rose-600 text-sm font-bold uppercase tracking-wider mb-4">
        <span>Tips & Tricks</span>
        <span className="text-slate-300">•</span>
        <span>4 Min Read</span>
      </div>
      <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 leading-tight">7 Common Typing Mistakes and How to Fix Them</h1>
      <div className="flex items-center gap-4 text-slate-500 text-sm">
        <div className="w-10 h-10 bg-rose-100 rounded-full flex items-center justify-center text-rose-600 font-bold">TP</div>
        <div>
          <p className="font-bold text-slate-900">Typing-Practice Team</p>
          <p>Updated March 2026</p>
        </div>
      </div>
    </header>

    <div className="prose">
      <p className="text-xl text-slate-600 leading-relaxed mb-8">Even experienced typists often have "bottlenecks" in their technique that prevent them from reaching their full potential. Here are the most common mistakes we see at Typing-Practice.online.</p>
      
      <h3>1. Over-reliance on the Backspace Key</h3>
      <p>If you find yourself hitting backspace every few words, you're typing faster than your accuracy allows. Slow down until you can type several sentences without a single error.</p>

      <h3>2. "Flying" Fingers</h3>
      <p>Some typists lift their fingers too high off the keyboard. Keep your fingers close to the keys to minimize the distance they need to travel.</p>

      <h3>3. Inconsistent Rhythm</h3>
      <p>Fast typing isn't about bursts of speed; it's about a steady, consistent rhythm. Try to type with a "metronome" feel where every keystroke has the same timing.</p>

      <h3>4. Looking at the Keyboard</h3>
      <p>Constantly shifting your eyes between the screen and the keyboard breaks your concentration and slows you down significantly. Trust your muscle memory and keep your eyes on the screen.</p>

      <h3>5. Incorrect Finger Placement</h3>
      <p>Using the wrong finger for a key forces your hand out of position, making the next keystroke harder. Always return to the home row and use the designated finger for each key.</p>

      <h3>6. Ignoring Posture and Ergonomics</h3>
      <p>Slouching or resting your wrists on the desk can lead to fatigue and repetitive strain injuries. Keep your back straight, feet flat, and wrists slightly elevated while typing.</p>

      <h3>7. Tensing Up</h3>
      <p>Typing with stiff hands and tense shoulders reduces your speed and increases the chance of errors. Relax your hands and let your fingers glide smoothly over the keys.</p>
    </div>
  </article>
);

const WPMCalculationPost = () => (
  <article className="py-12 px-4 max-w-3xl mx-auto">
    <SEO 
      title="How WPM is Calculated - Gross vs Net Speed" 
      description="Understand the science behind WPM calculation. Learn the difference between gross speed and net speed used in professional exams."
      ogType="article"
    />
    <div className="flex justify-between items-center mb-8">
      <Link to="/blog" className="text-blue-600 hover:underline text-sm font-bold flex items-center gap-1">
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
        Back to Blog
      </Link>
      <Link to="/" className="text-slate-500 hover:text-blue-600 hover:underline text-sm font-bold">Home</Link>
    </div>

    <header className="mb-12">
      <div className="flex items-center gap-2 text-emerald-600 text-sm font-bold uppercase tracking-wider mb-4">
        <span>Technical</span>
        <span className="text-slate-300">•</span>
        <span>3 Min Read</span>
      </div>
      <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 leading-tight">Understanding WPM: How Typing Speed is Calculated</h1>
      <div className="flex items-center gap-4 text-slate-500 text-sm">
        <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 font-bold">TP</div>
        <div>
          <p className="font-bold text-slate-900">Typing-Practice Team</p>
          <p>Updated March 2026</p>
        </div>
      </div>
    </header>

    <div className="prose">
      <p className="text-xl text-slate-600 leading-relaxed mb-8">Not all "Words Per Minute" scores are created equal. Depending on the platform or exam, your speed might be calculated in several different ways.</p>
      
      <h3>The Standard "Word"</h3>
      <p>In the world of professional typing, a "word" is standardized as <strong>5 characters</strong>, including spaces and punctuation. This ensures that typing "the" isn't "easier" than typing "extraordinary" in terms of WPM calculation.</p>

      <h3>Gross WPM</h3>
      <p>Gross WPM is your raw speed. It's calculated as:</p>
      <blockquote><code>(Total Characters / 5) / Time in Minutes</code></blockquote>
      <p>It doesn't account for errors, only the total number of keys pressed.</p>

      <h3>Net WPM</h3>
      <p>This is the most important metric. It's your Gross WPM minus the penalty for errors. The formula is:</p>
      <blockquote><code>Gross WPM - (Uncorrected Errors / Time in Minutes)</code></blockquote>
      <p>Most professional and government exams focus on Net WPM as it represents your actual productive output.</p>
    </div>
  </article>
);

const ExamTipsPost = () => (
  <article className="py-12 px-4 max-w-3xl mx-auto">
    <SEO 
      title="Government Exam Typing Tips - SSC, CGL, Banking" 
      description="Get the edge in your government typing test. Expert strategies for SSC CHSL, CGL, and Banking examinations."
      ogType="article"
    />
    <div className="flex justify-between items-center mb-8">
      <Link to="/blog" className="text-blue-600 hover:underline text-sm font-bold flex items-center gap-1">
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
        Back to Blog
      </Link>
      <Link to="/" className="text-slate-500 hover:text-blue-600 hover:underline text-sm font-bold">Home</Link>
    </div>

    <header className="mb-12">
      <div className="flex items-center gap-2 text-indigo-600 text-sm font-bold uppercase tracking-wider mb-4">
        <span>Exams</span>
        <span className="text-slate-300">•</span>
        <span>6 Min Read</span>
      </div>
      <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 leading-tight">Cracking Government Typing Exams: A Complete Guide</h1>
      <div className="flex items-center gap-4 text-slate-500 text-sm">
        <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 font-bold">TP</div>
        <div>
          <p className="font-bold text-slate-900">Typing-Practice Team</p>
          <p>Updated March 2026</p>
        </div>
      </div>
    </header>

    <div className="prose">
      <p className="text-xl text-slate-600 leading-relaxed mb-8">Government typing tests like the SSC CHSL or CGL DEST are not just about speed; they are about composure and strict adherence to rules.</p>
      
      <h3>1. Know the Interface</h3>
      <p>Many exams use a specific interface where the text is displayed in a box above the typing area. Our <Link to="/exam-mode" className="text-blue-600 underline">Exam Mode</Link> is designed to simulate this exactly. Familiarize yourself with the layout to avoid surprises on test day.</p>

      <h3>2. The "Backspace" Rule</h3>
      <p>Some exams allow backspace, while others don't. Always check the latest notification for your specific exam. Practicing without backspace is a great way to force yourself to be more accurate and build confidence.</p>

      <h3>3. Managing Exam Stress</h3>
      <p>The sound of dozens of other people typing in a room can be distracting. Practice with "keyboard noise" in the background to desensitize yourself to the environment. Stay calm, breathe, and focus only on your screen.</p>
    </div>
  </article>
);

export default Blog;
