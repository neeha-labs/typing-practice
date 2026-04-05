
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
    if (duration === 120) return {
      h1: "120 Second Typing Test – Endurance & Accuracy Focus",
      intro: "Test your endurance over 2 minutes. This test focuses on maintaining high accuracy over a longer duration.",
      unique: "The 120-second typing test is the ultimate test of endurance. It reveals how your accuracy holds up as your fingers begin to tire, making it a crucial tool for those training for long-form typing tasks."
    };

    return {
      h1: "60 Second Typing Test – Check Your Typing Speed Online",
      intro: "The standard 1-minute typing test is the most common benchmark for measuring typing proficiency.",
      unique: "The 60-second typing test is the industry standard for employment and certification. Most professional roles look for your 1-minute WPM as a primary indicator of your digital productivity."
    };
  };

  const content = getUniqueContent();

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
        "name": "How is WPM calculated?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "WPM stands for Words Per Minute. It is calculated by taking the total number of characters typed, dividing by 5 (the average word length), and then dividing by the time spent typing in minutes."
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
        <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-6">{content.h1}</h1>
        <p className="text-lg text-slate-600 leading-relaxed mb-8">
          {content.intro}
        </p>

        <h2 className="text-2xl font-bold text-slate-900 mb-4">How It Works</h2>
        <ul className="space-y-2 text-slate-600 list-disc pl-6 mb-8">
          <li>Type the given paragraph as accurately as possible</li>
          <li>The timer runs automatically as soon as you start typing</li>
          <li>Your WPM (Words Per Minute) is calculated in real-time</li>
          <li>Accuracy is measured based on correct vs incorrect keystrokes</li>
        </ul>

        <h2 className="text-2xl font-bold text-slate-900 mb-4">What is WPM?</h2>
        <p className="text-slate-600 leading-relaxed mb-6">
          WPM stands for Words Per Minute. It is a standard measure of typing speed. Since words vary in length, the industry standard defines one "word" as exactly five characters, including spaces and punctuation. This ensures a fair comparison regardless of the complexity of the text.
        </p>

        <h2 className="text-2xl font-bold text-slate-900 mb-4">Why Take This Test?</h2>
        <p className="text-slate-600 leading-relaxed mb-8">
          {content.unique}
        </p>

        <h2 className="text-2xl font-bold text-slate-900 mb-4">Average Typing Speed Levels</h2>
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
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">10–20 WPM</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">Intermediate</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">30–40 WPM</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">Advanced</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">50–70 WPM</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">Professional</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">80+ WPM</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2 className="text-2xl font-bold text-slate-900 mb-4">Tips to Improve Typing Speed & Reach 80 WPM</h2>
        <p className="text-slate-600 leading-relaxed mb-4">
          Reaching a professional typing speed of 80 WPM or higher requires dedication and the right techniques. Here are proven strategies to boost your words per minute:
        </p>
        <ul className="space-y-2 text-slate-600 list-disc pl-6 mb-8">
          <li><strong>Master Touch Typing:</strong> Learn to type without looking at the keyboard. This is the single most important factor in reaching high speeds.</li>
          <li><strong>Focus on Accuracy First:</strong> It's a common mistake to rush. In our tests, errors reduce your net WPM. A 98% accuracy rate at 60 WPM is better than 90% accuracy at 80 WPM.</li>
          <li><strong>Proper Finger Placement:</strong> Always return your fingers to the home row (ASDF and JKL;). This minimizes finger travel distance.</li>
          <li><strong>Read Ahead:</strong> As you type the current word, your eyes should be reading the next 2-3 words. This creates a continuous flow.</li>
          <li><strong>Take a 60 Second Typing Test Daily:</strong> Consistency is key. Taking a quick 1-minute test every day tracks your progress and builds muscle memory without causing fatigue.</li>
        </ul>

        <h2 className="text-2xl font-bold text-slate-900 mb-4">60 Second vs 120 Second Typing Test</h2>
        <p className="text-slate-600 leading-relaxed mb-8">
          While the <strong>60 second typing test</strong> is the industry standard for quick assessments and job applications, longer tests serve a different purpose. A 1-minute test measures your peak burst speed. However, a 120-second (2-minute) or 5-minute test measures your endurance and sustained accuracy. If you are preparing for a data entry role or a government exam (like SSC CHSL), practicing with longer durations is highly recommended to build stamina.
        </p>

        <h2 className="text-2xl font-bold text-slate-900 mb-4">Frequently Asked Questions</h2>
        <div className="space-y-6 mb-12">
          <div>
            <h3 className="font-bold text-slate-900">What is a good typing speed?</h3>
            <p className="text-slate-600">A speed of 40 WPM is considered average, while 60-80 WPM is excellent for professional work. Data entry specialists often need to type at 80 WPM or higher with 98%+ accuracy.</p>
          </div>
          <div>
            <h3 className="font-bold text-slate-900">How is WPM calculated?</h3>
            <p className="text-slate-600">WPM = (Total Characters / 5) / Time in Minutes. This standardizes word length to 5 characters. You can use our <Link to="/tools/words-per-minute-calculator" className="text-blue-600 hover:underline">WPM calculator</Link> to manually check your scores.</p>
          </div>
          <div>
            <h3 className="font-bold text-slate-900">How to improve typing speed?</h3>
            <p className="text-slate-600">Consistent practice, focusing on accuracy, and using the home row method are the best ways to improve. Taking a daily 60 second typing test helps track your progress.</p>
          </div>
          <div>
            <h3 className="font-bold text-slate-900">Is a 60 second typing test enough?</h3>
            <p className="text-slate-600">Yes, a 60 second typing test is the most common benchmark used by employers to assess typing skills. It provides a highly accurate snapshot of your Words Per Minute (WPM) and error rate.</p>
          </div>
        </div>
      </section>

      <TypingLinksSection />
    </div>
  );
};


export default TypingTestSEO;
