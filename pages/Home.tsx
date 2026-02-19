
import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

const Home: React.FC = () => {
  return (
    <div className="pb-20">
      <SEO 
        title="Typing-Practice.online | Tests, Lessons & Progress Tracking" 
        description="Master touch typing for SSC, Banking, and Government exams. Free speed tests, structured lessons, and professional WPM calculators."
      />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-blue-50 to-white pt-20 pb-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex justify-center gap-3 mb-6">
            <span className="inline-block px-4 py-1.5 text-sm font-semibold text-blue-700 bg-blue-100 rounded-full">
              The #1 Free Typing Practice Platform
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 mb-6 tracking-tight">
            Level Up Your <br className="hidden md:block" />
            <span className="text-blue-600 underline decoration-blue-200">Typing Skills</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto mb-10 leading-relaxed">
            From absolute beginners to advanced exam aspirants. 
            Build muscle memory, increase WPM, and track your progress in real-time.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/typing-test" className="bg-blue-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-blue-700 transition-all shadow-lg shadow-blue-200">
              Take a Free Test
            </Link>
            <Link to="/practice" className="bg-white text-slate-900 border-2 border-slate-200 px-8 py-4 rounded-xl font-bold text-lg hover:border-blue-600 hover:text-blue-600 transition-all">
              Beginner Lessons
            </Link>
          </div>
        </div>
      </section>

      {/* Feature Grid */}
      <section className="max-w-7xl mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Master Every Key</h2>
          <p className="text-slate-500">Structured learning paths for every skill level. Accessible instantly.</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              title: "1-Minute Typing Test",
              desc: "Quick speed check to measure your current WPM and accuracy in just 60 seconds.",
              icon: "⚡",
              link: "/typing-test/1-minute"
            },
            {
              title: "5-Minute Typing Test",
              desc: "Standard duration for most professional exams. Build endurance and consistency.",
              icon: "⏱️",
              link: "/typing-test/5-minute"
            },
            {
              title: "10-Minute Typing Test",
              desc: "The ultimate challenge. Perfect for high-level government exam preparation.",
              icon: "🏆",
              link: "/typing-test/10-minute"
            },
            {
              title: "Beginner Lessons",
              desc: "Learn finger placement with row-specific drills. Master the home row first.",
              icon: "🎹",
              link: "/lessons/beginner"
            },
            {
              title: "Intermediate Lessons",
              desc: "Focus on common word patterns and rhythm to boost your typing flow.",
              icon: "🚀",
              link: "/lessons/intermediate"
            },
            {
              title: "Advanced Lessons",
              desc: "Complex sentences, numbers, and symbols for professional-grade mastery.",
              icon: "💎",
              link: "/lessons/advanced"
            }
          ].map((feature, idx) => (
            <Link 
              key={idx} 
              to={feature.link}
              className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl hover:border-blue-200 transition-all group flex flex-col h-full"
            >
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">{feature.icon}</div>
              <h3 className="text-xl font-bold mb-3 text-slate-900 group-hover:text-blue-600 transition-colors">{feature.title}</h3>
              <p className="text-slate-500 leading-relaxed mb-6 flex-grow">{feature.desc}</p>
              <div className="text-blue-600 font-bold text-sm flex items-center gap-2">
                Start Now
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Exam Section */}
      <section className="bg-slate-900 py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Preparing for Government Exams?</h2>
          <p className="text-slate-400 max-w-2xl mx-auto mb-10 text-lg">
            Our Exam Mode simulates the exact interface of SSC CHSL, CGL, RRB, and Banking exams.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/exam-mode" className="bg-blue-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-blue-700 transition-all">
              Try Exam Mock Test
            </Link>
            <Link to="/hindi" className="bg-white/10 text-white border border-white/20 px-8 py-4 rounded-xl font-bold hover:bg-white/20 transition-all">
              Hindi Typing Test
            </Link>
          </div>
        </div>
      </section>

      {/* Tools & Blog Section */}
      <section className="max-w-7xl mx-auto px-4 py-20 border-t border-slate-100">
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-3xl font-bold text-slate-900 mb-6">Free Typing Tools</h2>
            <div className="space-y-4">
              <Link to="/tools/wpm-calculator" className="flex items-center p-4 bg-white border border-slate-200 rounded-2xl hover:border-blue-500 hover:shadow-md transition-all group">
                <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center text-xl mr-4 group-hover:bg-blue-600 group-hover:text-white transition-colors">🧮</div>
                <div>
                  <h3 className="font-bold text-slate-900">WPM Calculator</h3>
                  <p className="text-sm text-slate-500">Calculate your net speed for exams.</p>
                </div>
              </Link>
              <Link to="/tools/typing-accuracy-calculator" className="flex items-center p-4 bg-white border border-slate-200 rounded-2xl hover:border-blue-500 hover:shadow-md transition-all group">
                <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center text-xl mr-4 group-hover:bg-emerald-600 group-hover:text-white transition-colors">🎯</div>
                <div>
                  <h3 className="font-bold text-slate-900">Accuracy Calculator</h3>
                  <p className="text-sm text-slate-500">Check your precision percentage.</p>
                </div>
              </Link>
            </div>
          </div>
          <div>
            <h2 className="text-3xl font-bold text-slate-900 mb-6">Latest from Blog</h2>
            <div className="space-y-4">
              <Link to="/blog/how-to-improve-typing-speed" className="block p-4 bg-white border border-slate-200 rounded-2xl hover:border-blue-500 hover:shadow-md transition-all group">
                <h3 className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors">How to Improve Your Typing Speed</h3>
                <p className="text-sm text-slate-500 mt-1">10 expert tips to boost your WPM from 30 to 80+.</p>
              </Link>
              <Link to="/blog/government-exam-typing-tips" className="block p-4 bg-white border border-slate-200 rounded-2xl hover:border-blue-500 hover:shadow-md transition-all group">
                <h3 className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors">Cracking Government Typing Exams</h3>
                <p className="text-sm text-slate-500 mt-1">Specific strategies for SSC CHSL, CGL, and Banking.</p>
              </Link>
              <Link to="/blog" className="text-blue-600 font-bold text-sm hover:underline inline-block mt-2 px-4">View all articles →</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
