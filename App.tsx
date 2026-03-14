
import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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
              <Route path="/typing-practice" element={<TypingPractice />} />
              
              {/* SEO Pages */}
              <Route path="/typing-speed-test" element={<TypingTest />} />
              <Route path="/ssc-typing-test-practice" element={<ExamMode />} />
              <Route path="/how-to-improve-typing-speed" element={<Blog predefinedPostId="how-to-improve-typing-speed" />} />
              <Route path="/typing-practice-for-government-exams" element={<Blog predefinedPostId="government-exam-typing-tips" />} />

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
