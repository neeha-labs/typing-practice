
import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Layout from './components/Layout';
import ScrollToTop from './components/ScrollToTop';

// Lazy load components for performance
const Home = lazy(() => import('./pages/Home'));
const TypingTest = lazy(() => import('./pages/TypingTest'));
const TypingPractice = lazy(() => import('./pages/TypingPractice'));
const ExamMode = lazy(() => import('./pages/ExamMode'));
const Lessons = lazy(() => import('./pages/Lessons'));
const HindiTyping = lazy(() => import('./pages/HindiTyping'));
const Signin = lazy(() => import('./pages/Signin'));
const Tools = lazy(() => import('./pages/Tools'));
const Blog = lazy(() => import('./pages/Blog'));
const Leaderboard = lazy(() => import('./pages/Leaderboard'));
const Profile = lazy(() => import('./pages/Profile'));
const TypingTestsHub = lazy(() => import('./pages/TypingTestsHub'));
const ExamPractice = lazy(() => import('./pages/ExamPractice'));
const WPMCalculator = lazy(() => import('./pages/WPMCalculator'));
const About = lazy(() => import('./pages/StaticPages').then(m => ({ default: m.About })));
const Contact = lazy(() => import('./pages/StaticPages').then(m => ({ default: m.Contact })));
const Privacy = lazy(() => import('./pages/StaticPages').then(m => ({ default: m.Privacy })));
const Terms = lazy(() => import('./pages/StaticPages').then(m => ({ default: m.Terms })));

// Loading fallback
const Loading = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
  </div>
);

const App: React.FC = () => {
  return (
    <HelmetProvider>
      <Router>
        <ScrollToTop />
        <Layout>
          <Suspense fallback={<Loading />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/typing-test" element={<TypingTest />} />
              <Route path="/typing-test/:duration" element={<TypingTest />} />
              <Route path="/typing-tests" element={<TypingTestsHub />} />
              <Route path="/typing-practice" element={<TypingPractice />} />
              
              {/* SEO Pages */}
              <Route path="/typing-speed-test" element={<TypingTest />} />
              <Route path="/typing-test/30-second-typing-test" element={<TypingTest />} />
              <Route path="/typing-test/45-second-typing-test" element={<TypingTest />} />
              <Route path="/typing-test/60-second-typing-test" element={<TypingTest />} />
              <Route path="/typing-test/90-second-typing-test" element={<TypingTest />} />
              <Route path="/typing-test/120-second-typing-test" element={<TypingTest />} />
              <Route path="/typing-test/300-second-typing-test" element={<TypingTest />} />
              <Route path="/typing-test/1-minute" element={<Navigate to="/typing-test/60-second-typing-test" replace />} />
              <Route path="/typing-test/5-minute" element={<Navigate to="/typing-test/300-second-typing-test" replace />} />
              <Route path="/easy-typing-test" element={<TypingTest />} />
              <Route path="/hard-typing-test" element={<TypingTest />} />
              <Route path="/typing-test-for-beginners" element={<TypingTest />} />
              <Route path="/typing-test-with-numbers" element={<TypingTest />} />
              <Route path="/paragraph-typing-test" element={<TypingTest />} />
              <Route path="/ssc-typing-test-practice" element={<ExamMode />} />
              <Route path="/rrb-typing-test-practice" element={<ExamPractice />} />
              <Route path="/ibps-typing-test-practice" element={<ExamPractice />} />
              <Route path="/sbi-typing-test-practice" element={<ExamPractice />} />
              <Route path="/how-to-improve-typing-speed" element={<Navigate to="/blog/how-to-improve-typing-speed" replace />} />
              <Route path="/typing-practice-for-government-exams" element={<Navigate to="/blog/government-exam-typing-tips" replace />} />
              <Route path="/how-typing-speed-is-calculated" element={<Navigate to="/blog/how-wpm-is-calculated" replace />} />
              <Route path="/learn-touch-typing-free-online" element={<Lessons />} />
              <Route path="/words-per-minute-calculator-typing" element={<Navigate to="/tools/words-per-minute-calculator" replace />} />

              <Route path="/lessons" element={<Lessons />} />
              <Route path="/lessons/:level" element={<Lessons />} />
              <Route path="/exam-mode" element={<ExamMode />} />
              <Route path="/practice" element={<Lessons />} />
              <Route path="/hindi" element={<HindiTyping />} />
              <Route path="/signin" element={<Signin />} />
              <Route path="/leaderboard" element={<Leaderboard />} />
              <Route path="/profile" element={<Profile />} />
              
              {/* Tools & Blog Routes */}
              <Route path="/tools" element={<Tools />} />
              <Route path="/tools/words-per-minute-calculator" element={<WPMCalculator />} />
              <Route path="/tools/:toolId" element={<Tools />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:postId" element={<Blog />} />

              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/terms" element={<Terms />} />
            </Routes>
          </Suspense>
        </Layout>
      </Router>
    </HelmetProvider>
  );
};

export default App;
