import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

const SitemapPage: React.FC = () => {
  return (
    <div className="py-12 px-4 max-w-7xl mx-auto">
      <SEO 
        title="Sitemap | Typing Practice Online" 
        description="Full sitemap of Typing Practice Online. Find typing tests, lessons, exam practice, tools and more."
      />
      <h1 className="text-4xl font-extrabold text-slate-900 mb-8">Sitemap</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div>
          <h2 className="text-2xl font-bold mb-4 text-slate-800">Main Pages</h2>
          <ul className="space-y-2 text-blue-600">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/typing-test">Typing Test</Link></li>
            <li><Link to="/lessons">Lessons</Link></li>
            <li><Link to="/exam-mode">Exam Mode</Link></li>
            <li><Link to="/ssc-typing-test-practice">SSC Practice</Link></li>
            <li><Link to="/about">About</Link></li>
          </ul>
        </div>
        <div>
          <h2 className="text-2xl font-bold mb-4 text-slate-800">Lessons</h2>
          <ul className="space-y-2 text-blue-600">
            <li><Link to="/lessons/beginner">Beginner Lessons</Link></li>
            <li><Link to="/lessons/intermediate">Intermediate</Link></li>
            <li><Link to="/lessons/advanced">Advanced</Link></li>
            <li><Link to="/learn-touch-typing-free-online">Learn Touch Typing Free</Link></li>
          </ul>
        </div>
        <div>
          <h2 className="text-2xl font-bold mb-4 text-slate-800">Typing Tests</h2>
          <ul className="space-y-2 text-blue-600">
            <li><Link to="/typing-test/30-second-typing-test">30 Second Typing Test</Link></li>
            <li><Link to="/typing-test/60-second-typing-test">60 Second Typing Test</Link></li>
            <li><Link to="/typing-test/120-second-typing-test">120 Second Typing Test</Link></li>
            <li><Link to="/tools">Tools</Link></li>
            <li><Link to="/tools/wpm-calculator">WPM Calculator</Link></li>
          </ul>
        </div>
      </div>
      
      <section className="mt-16 page-description text-slate-600 leading-relaxed bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm text-left">
        <h2 className="text-2xl font-bold text-slate-900 mb-4">About Our Sitemap</h2>
        <p className="mb-4">This sitemap provides a quick overview of all the major pages available on Typing Practice Online. Our website is designed to help you improve your typing speed and accuracy through practice tests and guided lessons.</p>
        <p className="mb-4">Use the links provided above to navigate directly to our various features, including timed tests, difficulty-based paragraphs, and exam condition simulators. If you're a beginner, start with our step-by-step lessons before moving on to the advanced typing tests.</p>
        <p>Return to the <Link to="/" className="text-blue-600 hover:underline">homepage</Link> to start typing immediately, or create a free account to track your progress over time.</p>
      </section>
    </div>
  );
};

export default SitemapPage;
