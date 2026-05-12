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
            <li><Link to="/exam-mode">SSC Practice</Link></li>
            <li><Link to="/about">About</Link></li>
          </ul>
        </div>
        <div>
          <h2 className="text-2xl font-bold mb-4 text-slate-800">Lessons</h2>
          <ul className="space-y-2 text-blue-600">
            <li><Link to="/lessons/beginner">Beginner Lessons</Link></li>
            <li><Link to="/lessons/intermediate">Intermediate</Link></li>
            <li><Link to="/lessons/advanced">Advanced</Link></li>
            <li><Link to="/lessons">Learn Touch Typing Free</Link></li>
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
        <p className="mb-4">This sitemap provides a comprehensive overview of all the major pages available on <strong>Typing Practice Online</strong>. Our platform is meticulously designed to help individuals of all skill levels drastically improve their typing speed, accuracy, and overall keyboard efficiency through scientifically backed practice tests and guided touch-typing lessons.</p>
        <p className="mb-4">As the digital world continues to evolve, touch typing has become an indispensable skill for professionals, students, and everyday internet users. Our completely free platform offers a structured pathway to typing mastery. Navigating through our sitemap, you will find a variety of targeted resources tailored to different learning objectives. Use the links provided above to navigate directly to our various features, including timed typing rests, difficulty-based training paragraphs, and professional exam condition simulators.</p>
        
        <h3 className="text-xl font-bold text-slate-900 mt-6 mb-2">Our Key Offerings</h3>
        <ul className="list-group list-disc pl-6 mb-4 space-y-2">
          <li><strong>Typing Tests:</strong> From 30-second rapid sprints to 120-second endurance tests, our typing assessments let you benchmark your current Gross and Net Words Per Minute (WPM) alongside your accuracy percentage.</li>
          <li><strong>Structured Lessons:</strong> If you're a typing beginner, our step-by-step lesson plans guide you through the keyboard layout, teaching you the proper hand positioning and finger assignments starting from the home row.</li>
          <li><strong>Exam Simulators:</strong> We offer specialized practice modes designed to replicate the exact conditions of government typing exams, such as the SSC CHSL, CGL DEST, and various banking assessments, ensuring you are fully prepared for test day.</li>
          <li><strong>Typing Tools & Calculators:</strong> Access utility pages like our WPM Calculator to manually determine your typing scores and understand the exact mathematics behind professional typing speed calculations.</li>
          <li><strong>Typing Blog:</strong> Dive deep into our extensive collection of articles, tutorials, and expert tips covering everything from ergonomic desk setups to choosing the perfect mechanical keyboard for data entry.</li>
        </ul>
        
        <p className="mb-4">Whether your goal is to land a data entry job, increase your coding efficiency, or simply chat with your friends faster, consistent practice is the only proven method for improvement. We recommend exploring the various sections listed above and dedicating at least 15 minutes each day to focused typing exercises. Tracking your progress over time will reveal patterns in your errors and help you break through speed plateaus.</p>
        <p>If you encounter any issues finding the content you need, please reach out to us. Otherwise, return to the <Link to="/" className="text-blue-600 hover:underline">homepage</Link> to start your next typing test immediately, or create a free account to automatically track your WPM history and climb our global leaderboards.</p>
      </section>
    </div>
  );
};

export default SitemapPage;
