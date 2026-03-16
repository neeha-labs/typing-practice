
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import SEO from '../components/SEO';

const ExamPractice: React.FC = () => {
  const location = useLocation();
  const path = location.pathname;

  const getExamData = () => {
    if (path.includes('rrb')) return {
      name: "RRB (Railway Recruitment Board)",
      title: "RRB Typing Test Practice Online | Free RRB Typing Speed Test",
      description: "Prepare for RRB NTPC and other railway exams with our free RRB typing test practice tool. Accurate WPM calculation and exam-style interface."
    };
    if (path.includes('ibps')) return {
      name: "IBPS (Institute of Banking Personnel Selection)",
      title: "IBPS Typing Test Practice Online | Free IBPS Typing Speed Test",
      description: "Practice for IBPS Clerk and PO exams with our free IBPS typing test tool. Improve your speed and accuracy for banking sector exams."
    };
    if (path.includes('sbi')) return {
      name: "SBI (State Bank of India)",
      title: "SBI Typing Test Practice Online | Free SBI Typing Speed Test",
      description: "Prepare for SBI Clerk and PO exams with our free SBI typing test practice tool. Realistic exam interface and performance tracking."
    };
    return {
      name: "Government Exam",
      title: "Government Exam Typing Test Practice | Free Typing Speed Test",
      description: "Practice for various government exams with our free typing test tool. Accurate WPM calculation and exam-style interface."
    };
  };

  const exam = getExamData();

  return (
    <div className="py-12 px-4 max-w-7xl mx-auto">
      <SEO title={exam.title} description={exam.description} />

      <Link to="/typing-tests" className="text-blue-600 hover:underline text-sm font-bold mb-6 inline-flex items-center gap-1">
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back to All Tests
      </Link>

      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4 tracking-tight">{exam.name} Typing Test Practice</h1>
        <p className="text-lg text-slate-500 max-w-2xl mx-auto">Master the typing requirements for {exam.name} exams with our specialized practice environment.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-16">
        <div className="lg:col-span-2 space-y-12">
          <section className="bg-white rounded-3xl p-8 md:p-12 border border-slate-100 shadow-sm">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">About the {exam.name} Typing Test</h2>
            <p className="text-slate-600 leading-relaxed mb-4">
              The {exam.name} typing test is a critical component of the selection process for many positions. It typically requires a minimum speed of 30-35 WPM in English or 25-30 WPM in Hindi, with a high degree of accuracy.
            </p>
            <p className="text-slate-600 leading-relaxed">
              Our practice tool is designed to mimic the actual exam environment, helping you build the confidence and muscle memory needed to succeed on the day of the test.
            </p>
          </section>

          <section className="bg-white rounded-3xl p-8 md:p-12 border border-slate-100 shadow-sm">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Practice Instructions</h2>
            <ul className="space-y-4 text-slate-600 list-disc pl-6">
              <li><strong>Focus on Accuracy:</strong> Most exams have a strict penalty for errors. Aim for 95% accuracy or higher.</li>
              <li><strong>Maintain Steady Rhythm:</strong> Don't try to type in bursts. A steady, consistent pace is more effective for long passages.</li>
              <li><strong>Use Proper Posture:</strong> Ensure your wrists are comfortable and your back is straight to avoid fatigue during the test.</li>
              <li><strong>Practice Daily:</strong> Consistency is key. Even 20 minutes of daily practice can significantly improve your results.</li>
            </ul>
          </section>
        </div>

        <div className="space-y-8">
          <div className="bg-blue-600 rounded-3xl p-8 text-white shadow-xl shadow-blue-200">
            <h3 className="text-xl font-bold mb-4">Ready to Start?</h3>
            <p className="text-blue-100 mb-8">Take a full-length typing test now to see where you stand.</p>
            <Link 
              to="/typing-test" 
              className="block w-full bg-white text-blue-600 text-center py-4 rounded-xl font-bold hover:bg-blue-50 transition-all shadow-md"
            >
              Start Typing Test
            </Link>
          </div>

          <div className="bg-slate-900 rounded-3xl p-8 text-white shadow-xl">
            <h3 className="text-xl font-bold mb-4">Need Lessons?</h3>
            <p className="text-slate-400 mb-8">If you're just starting out, our beginner lessons will help you learn the basics of touch typing.</p>
            <Link 
              to="/lessons" 
              className="block w-full bg-white/10 text-white text-center py-4 rounded-xl font-bold border border-white/20 hover:bg-white/20 transition-all"
            >
              View Lessons
            </Link>
          </div>
        </div>
      </div>

      <section className="bg-slate-50 rounded-3xl p-8 md:p-12 border border-slate-200">
        <h2 className="text-2xl font-bold text-slate-900 mb-8 text-center">Frequently Asked Questions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h4 className="font-bold text-slate-900 mb-2">What is the required speed for {exam.name}?</h4>
            <p className="text-slate-600 text-sm">Most {exam.name} exams require a minimum speed of 35 WPM in English or 30 WPM in Hindi.</p>
          </div>
          <div>
            <h4 className="font-bold text-slate-900 mb-2">How is accuracy calculated in the exam?</h4>
            <p className="text-slate-600 text-sm">Accuracy is typically calculated by subtracting the number of errors from the total words typed, then dividing by the total words.</p>
          </div>
          <div>
            <h4 className="font-bold text-slate-900 mb-2">Can I use backspace during the test?</h4>
            <p className="text-slate-600 text-sm">Most modern computer-based typing tests allow the use of backspace, but it's best to practice without relying on it too heavily.</p>
          </div>
          <div>
            <h4 className="font-bold text-slate-900 mb-2">How long is the actual typing test?</h4>
            <p className="text-slate-600 text-sm">The duration varies by exam, but it is typically 10 minutes for most government and banking sector tests.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ExamPractice;
