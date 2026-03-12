
import React from 'react';
import SEO from '../components/SEO';

export const About: React.FC = () => (
  <div className="py-16 px-4 max-w-3xl mx-auto">
    <SEO 
      title="About Us - Our Mission to Help Exam Aspirants" 
      description="Learn about Typing-Practice.online, our mission to bridge the skill gap for government job aspirants, and why we build realistic exam simulations." 
    />
    <header className="mb-12 border-b border-slate-200 pb-8">
      <h1 className="text-4xl font-extrabold text-slate-900 mb-4">About Us</h1>
      <p className="text-lg text-slate-500">Bridging the skill gap for government job aspirants.</p>
    </header>
    <div className="prose">
      <p>Typing-Practice.online was born out of a simple observation: government exam aspirants spend months studying for written papers but often fail at the final stage—the typing skill test.</p>
      <p>Our platform is built by former aspirants who understand the specific requirements of <strong>SSC, State PCS, and Banking</strong> typing tests. We provide real exam environments, accurate speed calculation, and comprehensive data to help you succeed.</p>
      
      <h2>Our Vision</h2>
      <p>To become the most trusted typing partner for every learner in India, providing world-class tools for both English and regional language typing.</p>
      
      <h2>Why Choose Us?</h2>
      <ul>
        <li><strong>Realistic Simulations:</strong> Our exam mode mimics the actual software used in government tests.</li>
        <li><strong>Data-Driven Growth:</strong> Detailed analytics on your WPM, accuracy, and mistyped keys.</li>
        <li><strong>Free Forever:</strong> We believe essential skill-building tools should be accessible to everyone.</li>
      </ul>
    </div>
  </div>
);

export const Contact: React.FC = () => (
  <div className="py-16 px-4 max-w-3xl mx-auto">
    <SEO 
      title="Contact Support - Get in Touch" 
      description="Have questions or feedback about our typing tools? Contact the Typing-Practice.online team for support or partnership inquiries." 
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
      description="Read our privacy policy to understand how we collect, use, and protect your typing performance data at Typing-Practice.online." 
    />
    <header className="mb-12 border-b border-slate-200 pb-8">
      <h1 className="text-4xl font-extrabold text-slate-900 mb-4">Privacy Policy</h1>
      <p className="text-slate-500 text-sm">Last Updated: March 2026</p>
    </header>
    <div className="prose">
      <p>At Typing-Practice.online, we value your privacy. This policy explains how we collect and use your data to provide a better learning experience.</p>
      
      <h2>1. Data Collection</h2>
      <p>We collect basic information like your WPM scores, accuracy percentages, and time spent practicing. This data is used solely to provide you with progress reports and personalized feedback.</p>
      
      <h2>2. Cookies and Local Storage</h2>
      <p>We use local storage and cookies to remember your preferences, such as keyboard settings, theme choices, and skill levels. This ensures a seamless experience across sessions.</p>
      
      <h2>3. Third-Party Services</h2>
      <p>We use Firebase for authentication and data storage. Your data is protected by Google's industry-leading security infrastructure.</p>
    </div>
  </div>
);

export const Terms: React.FC = () => (
  <div className="py-16 px-4 max-w-3xl mx-auto">
    <SEO 
      title="Terms of Service - Usage Guidelines" 
      description="Legal terms and conditions for using the Typing-Practice.online platform for typing tests and lessons." 
    />
    <header className="mb-12 border-b border-slate-200 pb-8">
      <h1 className="text-4xl font-extrabold text-slate-900 mb-4">Terms of Service</h1>
      <p className="text-slate-500 text-sm">Last Updated: March 2026</p>
    </header>
    <div className="prose">
      <p>By using Typing-Practice.online, you agree to the following terms and conditions:</p>
      
      <h2>1. Proper Use</h2>
      <p>Users must not use automated scripts, bots, or any other artificial means to manipulate typing scores or leaderboard rankings. We reserve the right to remove suspicious entries.</p>
      
      <h2>2. Content Ownership</h2>
      <p>All typing texts, lessons, and simulations are for practice purposes only. They do not represent the official exam content of any government body or private organization.</p>
      
      <h2>3. Limitation of Liability</h2>
      <p>While we strive for 100% accuracy in our simulations, we are not responsible for any discrepancies between our platform and actual government examination software.</p>
    </div>
  </div>
);
