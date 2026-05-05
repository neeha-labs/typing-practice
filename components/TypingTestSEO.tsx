
import React from 'react';
import { Link } from 'react-router-dom';

import TypingLinksSection from './TypingLinksSection';

interface TypingTestSEOProps {
  duration?: number;
  mode?: string;
}

const TypingTestSEO: React.FC<TypingTestSEOProps> = ({ duration = 60, mode = 'test' }) => {
  const getUniqueContent = () => {
    if (mode === 'easy') return {
      h1: "Easy Typing Test – Beginner Friendly Words Online",
      intro: "Take an easy typing test with simple words. Perfect for beginners looking to build confidence and accuracy.",
      unique: "Our easy typing test uses common, short words to help you focus on basic finger placement and rhythm. It's the ideal starting point for anyone new to touch typing or those who want a stress-free way to practice."
    };
    if (mode === 'hard') return {
      h1: "Hard Typing Test – Complex Words & Sentences",
      intro: "Challenge yourself with a hard typing test featuring complex vocabulary and technical terms.",
      unique: "The hard typing test is designed for advanced typists. It includes scientific terms, complex punctuation, and longer words that test your finger dexterity and mental focus. Perfect for those aiming for professional-level speeds."
    };
    if (mode === 'beginners') return {
      h1: "Typing Test for Beginners – Learn to Type Fast",
      intro: "A learning-focused typing test designed specifically for beginners to master the home row and common words.",
      unique: "This beginner-focused test emphasizes the home row and high-frequency letter combinations. By practicing these fundamentals, you'll build the muscle memory needed to transition to more complex texts without looking at the keyboard."
    };
    if (mode === 'numbers') return {
      h1: "Typing Test with Numbers and Symbols",
      intro: "Improve your data entry skills with our numbers and symbols typing test. Practice the top row and special characters.",
      unique: "Typing numbers and symbols requires a different set of movements than standard text. This test helps you master the top row and shift-key combinations, which is essential for coding, data entry, and technical writing."
    };
    if (mode === 'paragraph') return {
      h1: "Paragraph Typing Test – Long Text Practice",
      intro: "Focus on endurance and consistency with our paragraph typing test. Practice with longer, meaningful texts.",
      unique: "The paragraph typing test challenges your ability to maintain speed and accuracy over a longer period. It simulates real-world typing tasks like writing emails, reports, or essays, where consistency is key."
    };

    if (duration === 30) return {
      h1: "30 Second Typing Test – Quick Speed Check",
      intro: "Test your typing speed in just 30 seconds. A perfect burst to measure your raw typing performance.",
      unique: "The 30-second typing test is a high-intensity sprint. It's great for measuring your peak WPM and seeing how fast your fingers can move in a short duration. Use this to track your progress in raw speed."
    };
    if (duration === 45) return {
      h1: "45 Second Typing Test – Quick Speed Check",
      intro: "Test your typing speed in just 45 seconds. A perfect middle ground for a quick yet accurate assessment.",
      unique: "The 45-second typing test offers a balanced look at your typing ability. It's long enough to settle into a rhythm but short enough for a quick check-in during a busy day."
    };
    if (duration === 90) return {
      h1: "90 Second Typing Test – Accuracy & Speed Benchmark",
      intro: "Take a 90-second typing test to measure your sustained typing performance and accuracy.",
      unique: "The 90-second typing test is an excellent benchmark for intermediate typists. It tests your ability to maintain a steady pace and high accuracy as you move through multiple sentences."
    };
    if (duration === 300) return {
      h1: "Typing Practice 5 Minutes – Professional Endurance Test",
      intro: "Our typing practice 5 minutes module is designed for advanced typists preparing for long-duration certification exams.",
      unique: "Typing for five minutes straight requires mental focus, stamina, and consistent rhythm. This typing practice 5 minutes session mimics real-world office and exam environments, forcing you to maintain finger precision over hundreds of words without losing focus."
    };

    if (duration === 120) return {
      h1: "120 Second Typing Test – Accuracy Benchmark Online",
      intro: "Take a 2-minute typing test to measure your sustained typing performance and accuracy levels.",
      unique: "The 120-second test is perfect for intermediate typists. It provides a deeper look into your typing flow than shorter sprints."
    };

    return {
      h1: "60 Second Typing Test – Check Your Typing Speed Online",
      intro: "The standard 1-minute typing test is the most common benchmark for measuring typing proficiency.",
      unique: "The 60-second typing test is the industry standard for employment and certification. Most professional roles look for your 1-minute WPM as a primary indicator of your digital productivity."
    };
  };

  const content = getUniqueContent();

  return (
    <div className="mt-16 space-y-16 border-t border-slate-100 pt-16">
      <section className="prose prose-slate max-w-none">
        <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-8 tracking-tight">{content.h1}</h2>
        <p className="text-xl text-slate-600 leading-relaxed mb-12">
          {content.intro}
        </p>

        <div className="grid md:grid-cols-2 gap-12 mb-16 not-prose">
          <div className="bg-slate-50 p-8 rounded-3xl border border-slate-200">
            <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
              <span className="w-8 h-8 bg-blue-600 text-white rounded-lg flex items-center justify-center text-sm">1</span>
              How It Works
            </h2>
            <ul className="space-y-4 text-slate-600 font-medium">
              <li className="flex items-start gap-3">
                <span className="text-blue-600 mt-1">●</span>
                <span>Type the highlighted text as quickly and accurately as possible.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-600 mt-1">●</span>
                <span>The timer activates automatically upon your first keystroke.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-600 mt-1">●</span>
                <span>Real-time WPM and Accuracy metrics update as you type.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-600 mt-1">●</span>
                <span>Review your full analysis, errors, and percentile at the end.</span>
              </li>
            </ul>
          </div>

          <div className="bg-blue-600 p-8 rounded-3xl text-white shadow-xl shadow-blue-100">
            <h2 className="text-2xl font-bold mb-6">Expert Methodology</h2>
            <p className="leading-relaxed mb-6 font-medium opacity-90">
              Our 60 second typing test uses the industry-standard word calculation. One word is defined as exactly five characters. This compensates for fluctuating word complexity and provides a scientific benchmark for your proficiency.
            </p>
            <div className="flex gap-4">
               <div className="bg-white/20 px-4 py-2 rounded-xl text-sm font-bold">WPM = (Chars / 5) / Time</div>
            </div>
          </div>
        </div>

        <h2 className="text-3xl font-black text-slate-900 mb-6">Understanding Your Score</h2>
        <p className="text-slate-600 leading-relaxed mb-8 text-lg">
          What does your WPM actually mean in the professional world? Typing speed is often the first gatekeeper for data entry, administration, and digital creative roles. Understanding where you sit on the global curve helps you target the right practice routine.
        </p>

        <div className="overflow-hidden rounded-3xl border border-slate-200 mb-12 not-prose shadow-sm">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-900 text-white uppercase text-xs tracking-widest font-bold">
              <tr>
                <th className="px-8 py-5 text-left">Skill Level</th>
                <th className="px-8 py-5 text-left">Speed (WPM)</th>
                <th className="px-8 py-5 text-left">Professional Context</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-slate-100 text-slate-700 font-medium">
              <tr className="hover:bg-slate-50 transition-colors">
                <td className="px-8 py-5">Beginner</td>
                <td className="px-8 py-5">10–25</td>
                <td className="px-8 py-5">Hunting & Pecking phase.</td>
              </tr>
              <tr className="hover:bg-slate-50 transition-colors">
                <td className="px-8 py-5 text-blue-600">Intermediate</td>
                <td className="px-8 py-5">30–45</td>
                <td className="px-8 py-5">Average office professional.</td>
              </tr>
              <tr className="hover:bg-slate-50 transition-colors">
                <td className="px-8 py-5 text-emerald-600">Advanced</td>
                <td className="px-8 py-5">50–75</td>
                <td className="px-8 py-5">High productivity requirement.</td>
              </tr>
              <tr className="hover:bg-slate-50 transition-colors">
                <td className="px-8 py-5 text-indigo-600">Professional</td>
                <td className="px-8 py-5">80+</td>
                <td className="px-8 py-5">Data specialists & Transcriptionists.</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2 className="text-3xl font-black text-slate-900 mb-6">Benefits of This Test</h2>
        <div className="grid sm:grid-cols-2 gap-8 mb-12 not-prose">
           <div className="border-l-4 border-blue-600 pl-6">
              <h4 className="font-bold text-slate-900 text-xl mb-2">Real-Time Metrics</h4>
              <p className="text-slate-500 text-sm leading-relaxed">Instantly see your speed fluctuate as you type, helping you identify which character combinations slow you down.</p>
           </div>
           <div className="border-l-4 border-emerald-600 pl-6">
              <h4 className="font-bold text-slate-900 text-xl mb-2">Error Mapping</h4>
              <p className="text-slate-500 text-sm leading-relaxed">We pinpoint EXACTLY which letters you miss most frequently, allowing for targeted finger training.</p>
           </div>
           <div className="border-l-4 border-orange-600 pl-6">
              <h4 className="font-bold text-slate-900 text-xl mb-2">Exam Simulation</h4>
              <p className="text-slate-500 text-sm leading-relaxed">Our interface mimics the high-pressure environment of official government and banking exams.</p>
           </div>
           <div className="border-l-4 border-purple-600 pl-6">
              <h4 className="font-bold text-slate-900 text-xl mb-2">Adaptive Difficulty</h4>
              <p className="text-slate-500 text-sm leading-relaxed">From simple pangrams to complex technical paragraphs, the test adapts to your chosen mode.</p>
           </div>
        </div>

        <h2 className="text-3xl font-black text-slate-900 mb-6">Advanced Tips for Reaching 100 WPM</h2>
        <p className="text-slate-600 leading-relaxed mb-6 text-lg">
          Breaking the 100 WPM barrier requires moving beyond letter-by-letter typing. Here is how the pros do it:
        </p>
        <ul className="space-y-4 text-slate-600 mb-12">
          <li><strong>Unit Recognition:</strong> Train your brain to see whole words as single muscle movements. Instead of t-h-e, your hand should perform one "the" movement.</li>
          <li><strong>Active Reading:</strong> Your eyes should be 2 to 3 words ahead of your fingers. This eliminates the "hesitation gap" between words.</li>
          <li><strong>Posture Ergonomics:</strong> Ensure your elbows are at a 90-degree angle. Tension in the shoulders is the #1 cause of speed plateaus.</li>
          <li><strong>Consistent Daily Bursts:</strong> Take a <Link to="/typing-test/60-second-typing-test" className="text-blue-600 font-bold hover:underline">60 second typing test</Link> three times a day: morning, noon, and night. Short, focused sessions beat long, fatiguing ones.</li>
        </ul>

        <div className="bg-slate-900 rounded-[3rem] p-12 text-center not-prose mb-16 shadow-2xl">
           <h2 className="text-3xl font-bold text-white mb-6">Need Structured Improvement?</h2>
           <p className="text-slate-400 mb-8 max-w-2xl mx-auto">If you are stuck at a certain speed, you might need to fix your core technique. Our guided lessons are the perfect next step.</p>
           <Link to="/learn-touch-typing-free-online" className="inline-block bg-blue-600 text-white px-10 py-4 rounded-2xl font-black text-lg hover:bg-white hover:text-blue-600 transition-all shadow-xl">
             START TYPING LESSONS
           </Link>
        </div>

        <h2 className="text-3xl font-black text-slate-900 mb-8">Frequently Asked Questions</h2>
        <div className="grid gap-6 mb-16 not-prose">
          {[
            {
              q: "How to practice typing paragraphs online?",
              a: "To practice typing paragraphs effectively, use our 'Paragraph' mode specifically designed for long-form text. It helps you build the necessary endurance for professional writing tasks."
            },
            {
               q: "How to practice typing sentences daily?",
               a: "Start your daily routine with 10 minutes of typing practice sentences. Focusing on full sentences rather than single words helps you master the capitalization and punctuation needed for real-world typing."
            },
            {
              q: "What is the best way to improve typing speed for SSC CGL?",
              a: "For SSC CGL preparation, consistently use our Exam Simulation mode. It replicates the official test environment, ensuring you are comfortable with the interface and scoring logic before the actual exam."
            },
            {
              q: "How accurate is this typing test?",
              a: "Extremely. We use standard enterprise-level algorithms to calculate Gross WPM, Net WPM, and KPM (Keystrokes Per Minute). It is highly comparable to the software used in professional and government examination centers."
            },
            {
               q: "Does this test work on mobile?",
               a: "While you can take the test on mobile, we strongly recommend a physical keyboard. Typing speed is a physical skill dependent on finger placement, which cannot be accurately measured on a touch screen."
            },
            {
               q: "How can I compare my score with others?",
               a: "After completing your test, check our global leaderboard to see how you rank against the thousands of typists who use our platform daily."
            },
            {
               q: "Do mistakes matter in my WPM?",
               a: "Yes. Errors significantly impact your Net WPM (which is your final score). Correcting mistakes as you type is usually better than leaving them, as a high error rate disqualifies you from many professional positions."
            }
          ].map((faq, idx) => (
            <div key={idx} className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm hover:border-blue-100 transition-colors">
               <h4 className="font-black text-slate-900 text-xl mb-4 flex gap-3">
                 <span className="text-blue-600">Q.</span> {faq.q}
               </h4>
               <p className="text-slate-600 leading-relaxed pl-8 border-l-2 border-slate-50 italic">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>

      <TypingLinksSection />
    </div>
  );
};


export default TypingTestSEO;
