
import React from 'react';
import { Link } from 'react-router-dom';

const TypingTestSEO: React.FC = () => {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is a good typing speed?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A good typing speed for most people is around 40 words per minute (WPM). Professional typists often reach speeds of 60-80 WPM, while experts can exceed 100 WPM with high accuracy."
        }
      },
      {
        "@type": "Question",
        "name": "How is typing speed measured?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Typing speed is measured in Words Per Minute (WPM). It is calculated by taking the total number of characters typed, dividing by 5 (the average word length), and then dividing by the time spent typing in minutes."
        }
      },
      {
        "@type": "Question",
        "name": "What is WPM?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "WPM stands for Words Per Minute. It is a standard measure of typing speed. One 'word' is generally considered to be 5 characters, including spaces and punctuation."
        }
      },
      {
        "@type": "Question",
        "name": "How can I improve my typing speed?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "To improve your typing speed, practice touch typing without looking at the keyboard, maintain good posture, focus on accuracy first, and practice consistently using typing tests and lessons."
        }
      }
    ]
  };

  return (
    <div className="mt-16 space-y-12 border-t border-slate-100 pt-16">
      <script type="application/ld+json">
        {JSON.stringify(faqSchema)}
      </script>

      <section className="prose prose-slate max-w-none">
        <h2 className="text-3xl font-bold text-slate-900 mb-6">How This Typing Test Works</h2>
        <p className="text-slate-600 leading-relaxed mb-4">
          Our typing speed test measures your ability to type accurately and quickly. When you start the test, a timer begins, and you must type the provided text exactly as it appears. The system tracks every keystroke, calculating your speed and identifying any errors in real-time.
        </p>
        <p className="text-slate-600 leading-relaxed">
          At the end of the duration (30, 60, or 120 seconds), we provide a detailed breakdown of your performance, including your Gross WPM, Net WPM, and overall accuracy percentage.
        </p>

        <h2 className="text-3xl font-bold text-slate-900 mt-12 mb-6">What Is Words Per Minute (WPM)?</h2>
        <p className="text-slate-600 leading-relaxed mb-4">
          Words Per Minute (WPM) is the standard metric used to measure typing speed. Since words vary in length, the industry standard defines one "word" as exactly five characters, including spaces and punctuation.
        </p>
        <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100 mb-8">
          <p className="text-blue-800 font-medium">
            Formula: WPM = (Total Characters / 5) / Time in Minutes
          </p>
        </div>

        <h2 className="text-3xl font-bold text-slate-900 mt-12 mb-6">Average Typing Speed</h2>
        <p className="text-slate-600 leading-relaxed mb-6">
          Curious how you stack up? Here is a breakdown of typing speed levels:
        </p>
        <div className="overflow-hidden rounded-2xl border border-slate-200 mb-8">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Level</th>
                <th className="px-6 py-3 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Speed (WPM)</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-slate-200">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">Beginner</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">20–30 WPM</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">Average</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">40–50 WPM</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">Advanced</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">60–80 WPM</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">Professional</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">90+ WPM</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2 className="text-3xl font-bold text-slate-900 mt-12 mb-6">How To Improve Your Typing Speed</h2>
        <ul className="space-y-4 text-slate-600 list-disc pl-6">
          <li><strong>Practice Touch Typing:</strong> Learn to type without looking at the keys. This is the single most effective way to increase speed.</li>
          <li><strong>Focus on Accuracy First:</strong> Speed comes naturally once your fingers know where the keys are. Slow down to ensure 100% accuracy.</li>
          <li><strong>Maintain Proper Posture:</strong> Sit up straight, keep your feet flat on the floor, and position your wrists correctly to avoid strain.</li>
          <li><strong>Use All Ten Fingers:</strong> Don't just "hunt and peck" with two fingers. Use the home row method to maximize efficiency.</li>
          <li><strong>Practice Consistently:</strong> Even 15 minutes of daily practice can lead to significant improvements over time.</li>
        </ul>
      </section>

      <section className="bg-slate-50 p-8 rounded-3xl border border-slate-200 mt-16">
        <h3 className="text-xl font-bold text-slate-900 mb-6">Internal Resources</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <Link to="/typing-practice" className="p-4 bg-white rounded-xl border border-slate-200 hover:border-blue-500 hover:shadow-md transition-all group">
            <span className="block font-bold text-slate-900 group-hover:text-blue-600 mb-1">Practice More</span>
            <span className="text-sm text-slate-500">Build muscle memory without timers.</span>
          </Link>
          <Link to="/lessons" className="p-4 bg-white rounded-xl border border-slate-200 hover:border-blue-500 hover:shadow-md transition-all group">
            <span className="block font-bold text-slate-900 group-hover:text-blue-600 mb-1">Typing Lessons</span>
            <span className="text-sm text-slate-500">Step-by-step guides for all levels.</span>
          </Link>
          <Link to="/typing-speed-test" className="p-4 bg-white rounded-xl border border-slate-200 hover:border-blue-500 hover:shadow-md transition-all group">
            <span className="block font-bold text-slate-900 group-hover:text-blue-600 mb-1">Speed Test</span>
            <span className="text-sm text-slate-500">Test your typing speed again.</span>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default TypingTestSEO;
