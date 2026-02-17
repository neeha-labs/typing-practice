
import React from 'react';
import SEO from '../components/SEO';

export const About: React.FC = () => (
  <div className="py-16 px-4 max-w-3xl mx-auto">
    <SEO 
      title="About Us - Our Mission to Help Exam Aspirants" 
      description="Learn about TypingPractice.in, our mission to bridge the skill gap for government job aspirants, and why we build realistic exam simulations." 
    />
    <h1 className="text-4xl font-bold mb-8">About Us</h1>
    <div className="prose prose-slate prose-lg">
      <p>TypingPractice.in was born out of a simple observation: government exam aspirants spend months studying for written papers but often fail at the final stage—the typing skill test.</p>
      <p>Our platform is built by former aspirants who understand the specific requirements of SSC, State PCS, and Banking typing tests. We provide real exam environments, accurate speed calculation, and comprehensive data to help you succeed.</p>
      <h2 className="text-2xl font-bold mt-8 mb-4">Our Vision</h2>
      <p>To become the most trusted typing partner for every learner in India, providing world-class tools for both English and regional language typing.</p>
    </div>
  </div>
);

export const Contact: React.FC = () => (
  <div className="py-16 px-4 max-w-3xl mx-auto">
    <SEO 
      title="Contact Support - Get in Touch" 
      description="Have questions or feedback about our typing tools? Contact the TypingPractice.in team for support or partnership inquiries." 
    />
    <h1 className="text-4xl font-bold mb-8 text-center">Contact Support</h1>
    <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
      <form className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
          <input type="text" className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder="John Doe" />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
          <input type="email" className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder="john@example.com" />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Message</label>
          <textarea rows={4} className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder="How can we help?"></textarea>
        </div>
        <button type="button" className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 transition-all">Send Message</button>
      </form>
    </div>
  </div>
);

export const Privacy: React.FC = () => (
  <div className="py-16 px-4 max-w-3xl mx-auto">
    <SEO 
      title="Privacy Policy - Data Handling Practices" 
      description="Read our privacy policy to understand how we collect, use, and protect your typing performance data at TypingPractice.in." 
    />
    <h1 className="text-3xl font-bold mb-8">Privacy Policy</h1>
    <div className="text-slate-600 space-y-4">
      <p>At TypingPractice.in, we value your privacy. This policy explains how we collect and use your data.</p>
      <h2 className="text-xl font-bold text-slate-900">1. Data Collection</h2>
      <p>We collect basic information like your WPM scores and time spent typing to provide you with progress reports.</p>
      <h2 className="text-xl font-bold text-slate-900">2. Cookies</h2>
      <p>We use local storage and cookies to remember your preferences like keyboard settings and skill levels.</p>
    </div>
  </div>
);

export const Terms: React.FC = () => (
  <div className="py-16 px-4 max-w-3xl mx-auto">
    <SEO 
      title="Terms of Service - Usage Guidelines" 
      description="Legal terms and conditions for using the TypingPractice.in platform for typing tests and lessons." 
    />
    <h1 className="text-3xl font-bold mb-8">Terms of Service</h1>
    <div className="text-slate-600 space-y-4">
      <p>By using TypingPractice.in, you agree to the following terms:</p>
      <h2 className="text-xl font-bold text-slate-900">1. Proper Use</h2>
      <p>Users must not use automated scripts or bots to manipulate typing scores.</p>
      <h2 className="text-xl font-bold text-slate-900">2. Content</h2>
      <p>All typing texts are for practice purposes only and do not represent the official exam content of any government body.</p>
    </div>
  </div>
);
