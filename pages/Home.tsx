
import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

const Home: React.FC = () => {
  return (
    <div className="pb-20">
      <SEO 
        title="Master Touch Typing - Free Speed Tests & Lessons" 
        description="Improve your typing speed and accuracy for SSC, Banking, and Government exams with our free touch typing lessons and realistic mock tests. No registration required."
      />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-blue-50 to-white pt-20 pb-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex justify-center gap-3 mb-6">
            <span className="inline-block px-4 py-1.5 text-sm font-semibold text-blue-700 bg-blue-100 rounded-full">
              The #1 Free Typing Practice Platform
            </span>
            <span className="inline-block px-4 py-1.5 text-sm font-semibold text-emerald-700 bg-emerald-100 rounded-full border border-emerald-200">
              No Sign-in Required
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
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Master Every Key</h2>
          <p className="text-slate-500">Structured learning paths for every skill level. Accessible instantly.</p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              title: "Step-by-Step Lessons",
              desc: "Learn finger placement with row-specific drills. No registration needed to start learning.",
              icon: "🎹"
            },
            {
              title: "Exam Simulations",
              desc: "Realistic interfaces for SSC CHSL, CGL, and Banking tests with official WPM calculation.",
              icon: "🏆"
            },
            {
              title: "Optional Analytics",
              desc: "Create a free account only when you want to save scores and see deep performance charts.",
              icon: "📈"
            }
          ].map((feature, idx) => (
            <div key={idx} className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold mb-3 text-slate-900">{feature.title}</h3>
              <p className="text-slate-500 leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
