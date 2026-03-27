
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const TypingLinksSection: React.FC = () => {
  const location = useLocation();

  const links = [
    { path: '/typing-test/30-second-typing-test', text: 'Take a quick 30 second typing test' },
    { path: '/typing-test/45-second-typing-test', text: 'Try the 45 second typing speed check' },
    { path: '/typing-test/60-second-typing-test', text: 'Practice with the standard 60 second typing test' },
    { path: '/typing-test/90-second-typing-test', text: 'Challenge your accuracy with a 90 second typing test' },
    { path: '/typing-test/120-second-typing-test', text: 'Test your endurance with a 120 second typing test' },
    { path: '/easy-typing-test', text: 'Practice with an easy typing test for beginners' },
    { path: '/hard-typing-test', text: 'Challenge yourself with a hard typing test' },
    { path: '/typing-test-for-beginners', text: 'Start learning with a beginner typing test' },
    { path: '/typing-test-with-numbers', text: 'Improve data entry with a numbers typing test' },
    { path: '/paragraph-typing-test', text: 'Practice consistency with a paragraph typing test' },
    { path: '/typing-practice', text: 'Build muscle memory with free typing practice' },
    { path: '/lessons', text: 'Learn touch typing with step-by-step lessons' },
  ];

  // Filter out the current page link to avoid self-linking
  const filteredLinks = links.filter(link => link.path !== location.pathname);

  return (
    <section className="mt-16 bg-slate-50 rounded-3xl p-8 md:p-12 border border-slate-200">
      <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6">Practice More Typing Tests</h2>
      
      <p className="text-slate-600 mb-8 leading-relaxed">
        Improve your typing speed by practicing with different tests. 
        Try a quick 30 second typing test or challenge yourself with a 60 second typing test. 
        Beginners can start with easy typing tests while advanced users can try harder challenges.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredLinks.map((link) => (
          <Link
            key={link.path}
            to={link.path}
            className="flex items-center p-4 bg-white rounded-xl border border-slate-200 hover:border-blue-500 hover:text-blue-600 hover:shadow-md transition-all group"
          >
            <span className="font-medium text-slate-700 group-hover:text-blue-600 text-sm md:text-base">{link.text}</span>
            <svg className="w-4 h-4 ml-auto text-slate-300 group-hover:text-blue-400 transition-colors flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default TypingLinksSection;
