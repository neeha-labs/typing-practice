
import React from 'react';
import { Link } from 'react-router-dom';
import SEO, { SITE_URL } from '../components/SEO';

const Home: React.FC = () => {
  return (
    <div className="pb-12 bg-white">
      <SEO 
        title="Free Typing Test Online | Typing-Practice.online" 
        description="Free online typing test and practice platform. Improve your WPM typing speed with daily practice. No sign-up required."
        canonicalPath="/"
      />
      
      {/* Tool-First Section */}
      <section className="bg-slate-900 pt-16 pb-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 tracking-tight">
            Free Typing Test — Improve Your Typing Speed Online
          </h1>
          <p className="text-lg md:text-xl text-slate-300 mb-10 leading-relaxed max-w-2xl mx-auto">
            Welcome to Typing Practice Online — the best free tool to test and improve your typing speed. Whether you're a beginner or a professional, our WPM typing test helps you track your progress and build accuracy.
          </p>
          
          <div className="bg-white p-2 rounded-3xl shadow-2xl flex flex-col md:flex-row gap-2 max-w-3xl mx-auto border-4 border-slate-800">
            <div className="flex-1 p-4 text-left md:border-r border-slate-100">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">Select Duration</span>
              <div className="flex gap-2">
                <Link to="/typing-test/60-second-typing-test" className="flex-1 bg-blue-50 text-blue-700 py-3 rounded-xl font-bold text-center hover:bg-blue-600 hover:text-white transition-all">1 Minute</Link>
                <Link to="/typing-test/120-second-typing-test" className="flex-1 bg-slate-50 text-slate-600 py-3 rounded-xl font-bold text-center hover:bg-blue-600 hover:text-white transition-all">2 Minute</Link>
                <Link to="/typing-test/300-second-typing-test" className="flex-1 bg-slate-50 text-slate-600 py-3 rounded-xl font-bold text-center hover:bg-blue-600 hover:text-white transition-all">5 Minute</Link>
              </div>
            </div>
            <div className="p-4 flex items-center justify-center">
              <Link to="/typing-test" className="w-full md:w-auto bg-blue-600 text-white px-10 py-4 rounded-2xl font-black text-xl hover:bg-blue-700 transition-all shadow-lg hover:scale-105 active:scale-95">
                START TEST
              </Link>
            </div>
          </div>
          
          <div className="mt-8 flex flex-wrap justify-center gap-6 text-slate-400 text-sm font-medium">
             <span className="flex items-center gap-2">✓ Optional Sign-up</span>
             <span className="flex items-center gap-2">✓ Instant Analysis</span>
          </div>
        </div>
      </section>

      {/* Trust & Stats Section */}
      <section className="bg-white py-12 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-black text-slate-900 mb-1">10M+</div>
              <div className="text-sm text-slate-500 font-bold uppercase tracking-widest">Tests Taken</div>
            </div>
            <div>
              <div className="text-3xl font-black text-slate-900 mb-1">98%</div>
              <div className="text-sm text-slate-500 font-bold uppercase tracking-widest">Accuracy Focus</div>
            </div>
            <div>
              <div className="text-3xl font-black text-slate-900 mb-1">150+</div>
              <div className="text-sm text-slate-500 font-bold uppercase tracking-widest">WPM Masters</div>
            </div>
            <div>
              <div className="text-3xl font-black text-slate-900 mb-1">Free</div>
              <div className="text-sm text-slate-500 font-bold uppercase tracking-widest">Always Online</div>
            </div>
          </div>
        </div>
      </section>

      {/* Hero Content Section - Deep SEO */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="prose prose-slate max-w-none">
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-8 text-center">What is a Typing Test?</h2>
            <p className="text-xl text-slate-600 leading-relaxed mb-12 text-center max-w-4xl mx-auto">
              A typing test is a standardized method to measure your typing speed and precision. 
              By calculating your <strong>Words Per Minute (WPM)</strong> and accuracy percentage, 
              it allows you to benchmark your productivity against global standards and professional requirements. 
              Whether you are applying for a job, preparing for a government exam, or simply wanting to become more efficient, 
              regular typing practice online is the most effective way to improve.
            </p>

            <div className="grid md:grid-cols-2 gap-12 mt-16">
              <div className="bg-blue-50 p-10 rounded-[3rem] border border-blue-100">
                <h3 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                  <span className="w-10 h-10 bg-blue-600 text-white rounded-2xl flex items-center justify-center text-xl shadow-lg">🚀</span>
                  Why Practice Typing?
                </h3>
                <p className="text-slate-600 leading-relaxed mb-6">
                  Typing faster saves hours every day. Students, programmers, writers, and professionals all benefit from improved typing speed. Regular practice on our platform helps you go from a beginner typist to 80+ WPM with consistent daily sessions.
                </p>
                <p className="text-slate-600 leading-relaxed mb-6 font-medium">
                  Try our <Link to="/typing-test" className="text-blue-600 hover:underline">free typing speed test</Link> now, or check our <Link to="/lessons" className="text-blue-600 hover:underline">typing lessons for beginners</Link> to get started.
                </p>
                <ul className="space-y-3 text-slate-700 font-medium">
                  <li>✨ Save up to 5 hours per week</li>
                  <li>✨ Professional resume advantage</li>
                  <li>✨ Cleaner creative flow state</li>
                </ul>
              </div>

              <div className="bg-emerald-50 p-10 rounded-[3rem] border border-emerald-100">
                <h3 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                  <span className="w-10 h-10 bg-emerald-600 text-white rounded-2xl flex items-center justify-center text-xl shadow-lg">🎯</span>
                  The Accuracy Factor
                </h3>
                <p className="text-slate-600 leading-relaxed mb-6">
                  Speed is useless without precision. Professional typing tests prioritize "Net WPM," which penalizes errors. A typist at 70 WPM with 95% accuracy is often less productive than one at 60 WPM with 100% accuracy due to the time lost correcting mistakes.
                </p>
                <Link to="/learn-touch-typing-free-online" className="inline-block bg-white text-emerald-700 px-6 py-2 rounded-xl font-bold shadow-sm hover:shadow-md transition-all">
                  Master Accuracy First
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Grid */}
      <section className="max-w-7xl mx-auto px-4 py-20 border-t border-slate-100">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">Everything You Need to Master the Keyboard</h2>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto font-medium">Complete workspace for beginners, students, and exam aspirants.</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              title: "Professional WPM Test",
              desc: "Quick 1-minute and 5-minute typing tests to measure your current performance. Industry standard benchmarking.",
              icon: "⚡",
              link: "/typing-test"
            },
            {
              title: "Typing Lessons Online",
              desc: "Step-by-step touch typing courses from beginner to advanced. Master the home row and beyond.",
              icon: "🎹",
              link: "/learn-touch-typing-free-online"
            },
            {
              title: "SSC & Government Mocks",
              desc: "Official simulation interface for SSC CHSL, CGL, and Banking exams with strict accuracy tracking.",
              icon: "🏛️",
              link: "/ssc-typing-test-practice"
            },
            {
              title: "Manual Calculations",
              desc: "Professional Words Per Minute Calculator to analyze your external scores with official formulas.",
              icon: "🧮",
              link: "/tools/words-per-minute-calculator"
            },
            {
              title: "Typing Tips Blog",
              desc: "In-depth guides on how to improve typing speed, posture, and ergonomics for zero-fatigue typing.",
              icon: "💡",
              link: "/blog"
            },
            {
              title: "Global Leaderboard",
              desc: "Daily challenges and all-time rankings. Compete with the world's fastest typists.",
              icon: "🏆",
              link: "/leaderboard"
            }
          ].map((feature, idx) => (
            <Link 
              key={idx} 
              to={feature.link}
              className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-2xl hover:border-blue-200 transition-all group flex flex-col h-full ring-1 ring-slate-100"
            >
              <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center text-4xl mb-6 group-hover:bg-blue-600 transition-all duration-500">
                <span className="group-hover:scale-110 transition-transform">{feature.icon}</span>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-slate-900 group-hover:text-blue-600 transition-colors tracking-tight">{feature.title}</h3>
              <p className="text-slate-500 leading-relaxed mb-8 flex-grow font-medium leading-relaxed">{feature.desc}</p>
              <div className="text-blue-600 font-bold text-sm flex items-center gap-2 group-hover:gap-4 transition-all uppercase tracking-widest">
                Explore Module
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Deep Content Section 2 - How It Works */}
      <section className="bg-slate-50 py-24 px-4 border-y border-slate-200">
        <div className="max-w-5xl mx-auto">
          <div className="bg-white p-12 md:p-20 rounded-[4rem] shadow-xl border border-slate-100">
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-8">How It Works</h2>
            <p className="text-xl text-slate-600 leading-relaxed mb-12">
              Improving your typing speed is a journey of muscle memory building. Follow these simple steps to start testing your speed right away.
            </p>

            <div className="space-y-12">
              <div className="flex gap-6">
                <div className="flex-shrink-0 w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-xl shadow-lg">1</div>
                <div>
                  <h4 className="text-2xl font-bold text-slate-900 mb-3">Choose your typing test duration</h4>
                  <p className="text-slate-600 leading-relaxed">Select between 1, 2, or 5 minutes. A 1-minute test offers a quick benchmark, while a 5-minute test helps you practice real-world typing stamina and focus.</p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex-shrink-0 w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-xl shadow-lg">2</div>
                <div>
                  <h4 className="text-2xl font-bold text-slate-900 mb-3">Start typing the words shown on screen as fast and accurately as you can</h4>
                  <p className="text-slate-600 leading-relaxed">Keep your eyes on the screen and do your best to touch type. Every correct word counts towards tracking your progression effectively.</p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex-shrink-0 w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-xl shadow-lg">3</div>
                <div>
                  <h4 className="text-2xl font-bold text-slate-900 mb-3">See your WPM score, accuracy percentage, and track your improvement</h4>
                  <p className="text-slate-600 leading-relaxed">Instantly view your gross and net WPM scores once the timer finishes. Consistently logging your sessions builds muscle memory naturally.</p>
                </div>
              </div>
            </div>

            <div className="mt-16 pt-12 border-t border-slate-100 text-center">
              <Link to="/typing-practice" className="inline-block bg-slate-900 text-white px-12 py-5 rounded-2xl font-black text-xl hover:bg-blue-600 transition-all shadow-xl">
                START YOUR PRACTICE TODAY
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Internal SEO Linking - Contextual */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-8">Ready for Professional Exams?</h2>
              <p className="text-slate-600 text-lg leading-relaxed mb-8">
                If you are preparing for government exams such as <strong>SSC CHSL, CGL, RRB,</strong> or various state-level data entry exams, our <Link to="/ssc-typing-test-practice" className="text-blue-600 font-bold hover:underline">SSC Typing Practice</Link> section is tailor-made for you. It simulates the exact user interface and rules used in official examination centers.
              </p>
              <div className="flex gap-4">
                 <Link to="/exam-mode" className="text-blue-600 font-bold flex items-center gap-2 group">
                   Visit Exam Hub
                   <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                   </svg>
                 </Link>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
               <div className="bg-slate-900 p-8 rounded-[2.5rem] text-center text-white">
                 <div className="text-2xl mb-2">🏛️</div>
                 <div className="font-bold">SSC Mocks</div>
               </div>
               <div className="bg-blue-600 p-8 rounded-[2.5rem] text-center text-white">
                 <div className="text-2xl mb-2">💸</div>
                 <div className="font-bold">Banking Tests</div>
               </div>
               <div className="bg-emerald-600 p-8 rounded-[2.5rem] text-center text-white">
                 <div className="text-2xl mb-2">🖋️</div>
                 <div className="font-bold">Court Exams</div>
               </div>
               <div className="bg-orange-600 p-8 rounded-[2.5rem] text-center text-white">
                 <div className="text-2xl mb-2">⌨️</div>
                 <div className="font-bold">Data Entry</div>
               </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 px-4 bg-slate-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-slate-900 mb-8 text-center">
            Explore All Typing Tests
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <Link to="/easy-typing-test" className="p-4 bg-white rounded-xl border border-slate-200 hover:border-blue-300 transition-colors text-center">
              <div className="text-2xl mb-2">🟢</div>
              <div className="font-semibold text-slate-900">Easy Typing Test</div>
              <div className="text-sm text-slate-500">For beginners</div>
            </Link>
            <Link to="/hard-typing-test" className="p-4 bg-white rounded-xl border border-slate-200 hover:border-blue-300 transition-colors text-center">
              <div className="text-2xl mb-2">🔴</div>
              <div className="font-semibold text-slate-900">Hard Typing Test</div>
              <div className="text-sm text-slate-500">For advanced typists</div>
            </Link>
            <Link to="/paragraph-typing-test" className="p-4 bg-white rounded-xl border border-slate-200 hover:border-blue-300 transition-colors text-center">
              <div className="text-2xl mb-2">📝</div>
              <div className="font-semibold text-slate-900">Paragraph Test</div>
              <div className="text-sm text-slate-500">Long text practice</div>
            </Link>
            <Link to="/ibps-typing-test-practice" className="p-4 bg-white rounded-xl border border-slate-200 hover:border-blue-300 transition-colors text-center">
              <div className="text-2xl mb-2">🏦</div>
              <div className="font-semibold text-slate-900">IBPS Typing Test</div>
              <div className="text-sm text-slate-500">Bank exam practice</div>
            </Link>
            <Link to="/sbi-typing-test-practice" className="p-4 bg-white rounded-xl border border-slate-200 hover:border-blue-300 transition-colors text-center">
              <div className="text-2xl mb-2">🏛️</div>
              <div className="font-semibold text-slate-900">SBI Typing Test</div>
              <div className="text-sm text-slate-500">Bank clerk practice</div>
            </Link>
            <Link to="/blog" className="p-4 bg-white rounded-xl border border-slate-200 hover:border-blue-300 transition-colors text-center">
              <div className="text-2xl mb-2">📚</div>
              <div className="font-semibold text-slate-900">Typing Blog</div>
              <div className="text-sm text-slate-500">Tips and guides</div>
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ Section for SEO */}
      <section className="bg-slate-50 py-24 px-4 border-t border-slate-200">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-4 tracking-tight">Expert FAQs</h2>
            <p className="text-lg text-slate-600 font-medium">Everything you need to know about typing tests and speed improvement.</p>
          </div>
          
          <div className="space-y-6">
            {[
              {
                q: "What is a good typing speed?",
                a: "The average typing speed is 40 WPM. A speed above 60 WPM is considered fast, and 80+ WPM is excellent for professionals."
              },
              {
                q: "How do I improve my typing speed?",
                a: "Practice daily for 10–15 minutes. Focus on accuracy first, then speed will follow naturally over time."
              },
              {
                q: "Is this typing test free?",
                a: "Yes, completely free with no sign-up required."
              },
              {
                q: "What is WPM?",
                a: "WPM means Words Per Minute. Every 5 characters is counted as one word in the standard calculation."
              }
            ].map((faq, i) => (
              <div key={i} className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 transition-all hover:shadow-md">
                <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-3">
                  <span className="text-blue-600">Q.</span> {faq.q}
                </h3>
                <p className="text-slate-600 leading-relaxed pl-8 border-l-2 border-blue-50">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
