
import React from 'react';
import { Link } from 'react-router-dom';
import SEO, { SITE_URL } from '../components/SEO';

const Home: React.FC = () => {
  const homeSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "url": SITE_URL,
        "name": "Typing-Practice.online",
        "description": "Master touch typing with free lessons and speed tests. Improve your WPM for SSC, Banking, and Government exams.",
        "potentialAction": {
          "@type": "SearchAction",
          "target": `${SITE_URL}/search?q={search_term_string}`,
          "query-input": "required name=search_term_string"
        }
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "What is a good typing speed?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "A good typing speed for most professionals is around 40 to 60 Words Per Minute (WPM). However, for data entry or transcription jobs, a speed of 70 to 90 WPM is often required. You can measure your current speed using our free 60 second typing test."
            }
          },
          {
            "@type": "Question",
            "name": "How is typing speed calculated?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Typing speed is calculated in Words Per Minute (WPM). A 'word' is standardized as 5 characters or keystrokes. Gross WPM is calculated by dividing total characters typed by 5, then dividing by the time in minutes. Net WPM subtracts your errors from the Gross WPM to give your true typing speed."
            }
          },
          {
            "@type": "Question",
            "name": "How can I learn touch typing for free online?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "You can learn touch typing for free online by using our structured typing lessons. Start by mastering the home row keys (ASDF JKL;), then gradually move to the top and bottom rows. Consistent daily practice of 15-30 minutes is the best way to build muscle memory."
            }
          },
          {
            "@type": "Question",
            "name": "Why should I take a 60 second typing test?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "A 60 second typing test is the industry standard for measuring typing speed and accuracy. It provides a quick, accurate snapshot of your Words Per Minute (WPM) without causing typing fatigue. It's perfect for daily practice and tracking your progress over time."
            }
          }
        ]
      }
    ]
  };

  return (
    <div className="pb-12 bg-white">
      <SEO 
        title="English Typing Practice Online | Best WPM & Accuracy Test" 
        description="Master English typing practice with our free high-speed tools. Measure your WPM, accuracy, and efficiency for professional and government exams without sign-up."
        schema={homeSchema}
      />
      
      {/* Tool-First Section */}
      <section className="bg-slate-900 pt-16 pb-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 tracking-tight">
            Advanced <span className="text-blue-400">English Typing Practice</span> Online
          </h1>
          <p className="text-lg md:text-xl text-slate-300 mb-10 leading-relaxed max-w-2xl mx-auto">
            Improve your performance with the most robust English typing practice platform. 
            Free to use, sign-up is only required if you want to save your scores.
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
                  Why Improve Speed?
                </h3>
                <p className="text-slate-600 leading-relaxed mb-6">
                  The modern world lives on digital communication. Increasing your typing speed from 30 WPM to 60 WPM effectively doubles your productivity for writing emails, coding, or data entry. It saves you hundreds of hours per year and reduces cognitive load, allowing you to focus on your thoughts rather than your fingers.
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

      {/* Deep Content Section 2 - How to Improve */}
      <section className="bg-slate-50 py-24 px-4 border-y border-slate-200">
        <div className="max-w-5xl mx-auto">
          <div className="bg-white p-12 md:p-20 rounded-[4rem] shadow-xl border border-slate-100">
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-8">How to Improve Your Typing Speed Online</h2>
            <p className="text-xl text-slate-600 leading-relaxed mb-12">
              Improving your typing speed is a journey of muscle memory building. It's not about how fast you move your fingers, 
              but how efficiently you use the keyboard layout. Below are the steps to go from a beginner to a pro.
            </p>

            <div className="space-y-12">
              <div className="flex gap-6">
                <div className="flex-shrink-0 w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-xl shadow-lg">1</div>
                <div>
                  <h4 className="text-2xl font-bold text-slate-900 mb-3">Master the Home Row</h4>
                  <p className="text-slate-600 leading-relaxed">Your fingers should always rest on the <strong>ASDF</strong> and <strong>JKL;</strong> keys. The "F" and "J" keys have small bumps to help you find them without looking. Every keystroke should originate from this home position and return to it immediately.</p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex-shrink-0 w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-xl shadow-lg">2</div>
                <div>
                  <h4 className="text-2xl font-bold text-slate-900 mb-3">Stop Looking at the Keyboard</h4>
                  <p className="text-slate-600 leading-relaxed">This is the most difficult but essential step. Looking down creates a cognitive bottleneck. By keeping your eyes on the screen, you allow your brain to build a spatial map of the keys, leading to subconscious finger movements.</p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex-shrink-0 w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-xl shadow-lg">3</div>
                <div>
                  <h4 className="text-2xl font-bold text-slate-900 mb-3">Focus on Rhythm, Not Speed</h4>
                  <p className="text-slate-600 leading-relaxed">Consistent rhythm leads to naturally high speeds. Instead of bursting and stopping, try to type at a steady pace. This reduces errors and makes the typing process much smoother over long durations like a 5-minute test.</p>
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
                a: "A good typing speed for most professional environments is between 40 and 60 Words Per Minute (WPM). However, for specialized roles like transcription or courtroom typing, you should aim for 80-100 WPM with near-perfect accuracy."
              },
              {
                q: "How can I improve my typing speed for FREE?",
                a: "Consistent practice on platforms like Typing-Practice.online is the best way. Use our structured lessons to build foundational skills, and then transition to daily 60 second typing tests to track and boost your performance."
              },
              {
                q: "How is WPM calculated standardizedly?",
                a: "The industry standard formula is: WPM = (Total Characters typed / 5) / Time in Minutes. One 'word' is standardized as 5 characters to ensure fairness regardless of word complexity. Net WPM is your Final Speed = Gross WPM - (Errors / Time)."
              },
              {
                q: "What is the best way to practice touch typing?",
                a: "Focus on finger placement first. Always return to the home row. Avoid looking at your keyboard at all costs. Use our lessons to learn the correct fingers for each key before attempting high-speed tests."
              },
              {
                q: "Why is accuracy more important than speed?",
                a: "In real-world typing and exams, errors require time to fix. A typist at 80 WPM with 5 errors may actually be slower than a typist at 65 WPM with 0 errors because of the 'repair time' needed. Most exams have strict accuracy thresholds."
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
