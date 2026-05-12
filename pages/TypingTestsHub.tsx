
import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import TypingLinksSection from '../components/TypingLinksSection';

const TypingTestsHub: React.FC = () => {
  const sections = [
    {
      title: "Short Typing Tests",
      items: [
        { name: "30 Second Typing Test", path: "/typing-test/30-second-typing-test", icon: "⚡" },
        { name: "45 Second Typing Test", path: "/typing-test/45-second-typing-test", icon: "⏱️" },
        { name: "60 Second Typing Test", path: "/typing-test/60-second-typing-test", icon: "⏱️" },
        { name: "90 Second Typing Test", path: "/typing-test/90-second-typing-test", icon: "⏱️" },
        { name: "120 Second Typing Test", path: "/typing-test/120-second-typing-test", icon: "🏆" }
      ]
    },
    {
      title: "Specialized Typing Tests",
      items: [
        { name: "Easy Typing Test", path: "/easy-typing-test", icon: "🟢" },
        { name: "Hard Typing Test", path: "/hard-typing-test", icon: "🔴" },
        { name: "Typing Test for Beginners", path: "/typing-test-for-beginners", icon: "🌱" },
        { name: "Typing Test with Numbers", path: "/typing-test-with-numbers", icon: "🔢" },
        { name: "Paragraph Typing Test", path: "/paragraph-typing-test", icon: "📝" }
      ]
    },
    {
      title: "Government Exam Practice",
      items: [
        { name: "SSC Typing Test Practice", path: "/exam-mode", icon: "📝" },
        { name: "RRB Typing Test Practice", path: "/rrb-typing-test-practice", icon: "🚆" },
        { name: "IBPS Typing Test Practice", path: "/ibps-typing-test-practice", icon: "🏦" },
        { name: "SBI Typing Test Practice", path: "/sbi-typing-test-practice", icon: "💎" }
      ]
    },
    {
      title: "Typing Lessons",
      items: [
        { name: "Beginner Lessons", path: "/lessons/beginner", icon: "🌱" },
        { name: "Intermediate Lessons", path: "/lessons/intermediate", icon: "🌿" },
        { name: "Advanced Lessons", path: "/lessons/advanced", icon: "🌳" }
      ]
    },
    {
      title: "Typing Tools",
      items: [
        { name: "WPM Calculator", path: "/wpm-calculator", icon: "🧮" },
        { name: "Words Per Minute Calculator", path: "/wpm-calculator", icon: "📏" },
        { name: "Typing Accuracy Calculator", path: "/tools/typing-accuracy-calculator", icon: "🎯" }
      ]
    }
  ];

  return (
    <div className="py-12 px-4 max-w-7xl mx-auto">
      <SEO 
        title="Free Online Typing Speed Tests | Check Your WPM" 
        description="Explore our free online typing tests. Check your typing speed in WPM, practice with numbers, and track your accuracy across different difficulty levels."
        keywords="typing test, typing speed test, WPM test, check typing speed, online typing test"
      />

      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4 tracking-tight">All Typing Tests & Tools</h1>
        <p className="text-lg text-slate-500 max-w-2xl mx-auto">The central hub for all your typing improvement needs. Choose a test or tool to get started.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {sections.map((section) => (
          <div key={section.title} className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
            <h2 className="text-2xl font-bold text-slate-900 mb-8 flex items-center gap-3">
              <span className="w-2 h-8 bg-blue-600 rounded-full"></span>
              {section.title}
            </h2>
            <div className="grid grid-cols-1 gap-4">
              {section.items.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 hover:bg-blue-50 hover:text-blue-700 transition-all group border border-transparent hover:border-blue-100"
                >
                  <span className="text-2xl group-hover:scale-110 transition-transform">{item.icon}</span>
                  <span className="font-bold text-slate-700 group-hover:text-blue-700">{item.name}</span>
                  <svg className="w-5 h-5 ml-auto text-slate-300 group-hover:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>

      <section className="mt-24 px-4 max-w-4xl mx-auto prose prose-slate">
        <h2 className="text-3xl font-bold text-slate-900 mb-6">Why Take an Online Typing Test?</h2>
        <p className="text-slate-600 mb-4">
          In today's digital-first environment, your typing speed directly impacts your productivity, educational success, and career opportunities. An online typing test is the first crucial step in evaluating your current keyboarding abilities. By measuring your <strong>Gross WPM</strong> (raw speed) and <strong>Net WPM</strong> (speed adjusted for uncorrected errors), our tests provide a clear baseline for your skills. This hub contains every specialized typing test you need to identify your weaknesses and build specialized muscle memory.
        </p>
        <h3 className="text-2xl font-bold text-slate-900 mb-4">Choosing the Right Typing Test</h3>
        <p className="text-slate-600 mb-4">
          Not all typing practice is created equal. Depending on your goals, you should select a test that specifically targets your required skill set:
        </p>
        <ul className="list-disc pl-6 text-slate-600 mb-6 space-y-2">
          <li><strong>Short Tests (30 to 60 seconds):</strong> Ideal for quick warm-ups or practicing burst speed. These tests help train fast reflexes and muscle memory for short n-grams.</li>
          <li><strong>Endurance Tests (120 seconds):</strong> Designed to build typing stamina. They force you to maintain an ergonomic posture and consistent rhythm over a longer duration, reducing error rates in standard multi-paragraph typing.</li>
          <li><strong>Specialized Challenges:</strong> If your speed drops when typing passwords or addresses, try the <em>Typing Test with Numbers</em>. If you are a complete novice, our <em>Beginner Test</em> ensures you don't build bad habits immediately.</li>
          <li><strong>Government Exam Simulators:</strong> SSC CHSL, RRB, and Banking exams strictly evaluate Net WPM using traditional scoring algorithms. Our exam practice modes simulate these exact constraints, including backspace locking and specific word-highlighting algorithms, ensuring you are thoroughly prepared for the real test interface.</li>
        </ul>
        <h3 className="text-2xl font-bold text-slate-900 mb-4">Understanding Your Typing Score Metrics</h3>
        <p className="text-slate-600 mb-4">
          After completing any test on this hub, you will receive a comprehensive breakdown of your performance. The most important metric is your <strong>Net Words Per Minute (NWPM)</strong>, which subtracts errors to reflect your true productive speed. A score of 40 NWPM is considered average, while 60+ NWPM is highly competitive for most administrative roles. We also log your specific keystroke errors, helping you identify which fingers or keys require dedicated drills in our Lessons portal.
        </p>
        <p className="text-slate-600">
          Make it a habit to cycle through different variations of the typing tests. Focusing entirely on speed without addressing your accuracy percentage will ultimately hinder your progress. Aim for an overall target of 98% accuracy before attempting to push your speed limits higher.
        </p>
      </section>

      <section className="mt-24 bg-slate-900 rounded-3xl p-12 text-center text-white shadow-xl">
        <h2 className="text-3xl font-bold mb-6">Master Touch Typing Today</h2>
        <p className="text-slate-400 mb-10 max-w-2xl mx-auto">Join thousands of students and professionals who have improved their typing speed and accuracy with our free tools.</p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link to="/typing-practice" className="bg-blue-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-blue-500 transition-all">
            Start Practice
          </Link>
          <Link to="/leaderboard" className="bg-white/10 text-white border border-white/20 px-8 py-4 rounded-xl font-bold hover:bg-white/20 transition-all">
            View Leaderboard
          </Link>
        </div>
      </section>

      <TypingLinksSection />
    </div>
  );
};

export default TypingTestsHub;
