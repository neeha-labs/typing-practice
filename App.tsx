
import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Layout from './components/Layout';
import Home from './pages/Home';
import TypingTest from './pages/TypingTest';
import ExamMode from './pages/ExamMode';
import PracticeBeginners from './pages/PracticeBeginners';
import HindiTyping from './pages/HindiTyping';
import Signin from './pages/Signin';
import { About, Contact, Privacy, Terms } from './pages/StaticPages';

const App: React.FC = () => {
  return (
    <HelmetProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/typing-test" element={<TypingTest />} />
            <Route path="/exam-mode" element={<ExamMode />} />
            <Route path="/practice" element={<PracticeBeginners />} />
            <Route path="/hindi" element={<HindiTyping />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
          </Routes>
        </Layout>
      </Router>
    </HelmetProvider>
  );
};

export default App;
