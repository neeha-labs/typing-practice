
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
      description="Read our privacy policy to understand how we collect, use, and protect your data at Typing-Practice.online in compliance with AdSense policies." 
    />
    <header className="mb-12 border-b border-slate-200 pb-8">
      <h1 className="text-4xl font-extrabold text-slate-900 mb-4">Privacy Policy</h1>
      <p className="text-slate-500 text-sm">Last Updated: April 2026</p>
    </header>
    <div className="prose prose-slate max-w-none">
      <p>At Typing-Practice.online, the privacy of our visitors is of extreme importance to us. This privacy policy document outlines the types of personal information received and collected by Typing-Practice.online and how it is used.</p>
      
      <h2>1. Log Files</h2>
      <p>Like many other Web sites, Typing-Practice.online makes use of log files. The information inside the log files includes internet protocol (IP) addresses, type of browser, Internet Service Provider (ISP), date/time stamp, referring/exit pages, and number of clicks to analyze trends, administer the site, track user's movement around the site, and gather demographic information. IP addresses and other such information are not linked to any information that is personally identifiable.</p>
      
      <h2>2. Cookies and Web Beacons</h2>
      <p>Typing-Practice.online does use cookies to store information about visitors' preferences, record user-specific information on which pages the user access or visit, customize Web page content based on visitors browser type or other information that the visitor sends via their browser.</p>
      
      <h2>3. DoubleClick DART Cookie</h2>
      <ul>
        <li>Google, as a third-party vendor, uses cookies to serve ads on Typing-Practice.online.</li>
        <li>Google's use of the DART cookie enables it to serve ads to users based on their visit to Typing-Practice.online and other sites on the Internet.</li>
        <li>Users may opt-out of the use of the DART cookie by visiting the Google ad and content network privacy policy at the following URL: <a href="https://policies.google.com/technologies/ads" target="_blank" rel="noopener noreferrer">https://policies.google.com/technologies/ads</a></li>
      </ul>

      <h2>4. Advertising Partners</h2>
      <p>Some of our advertising partners may use cookies and web beacons on our site. Our advertising partners include Google AdSense.</p>
      <p>These third-party ad servers or ad networks use technology to send the advertisements and links that appear on Typing-Practice.online directly to your browsers. They automatically receive your IP address when this occurs. Other technologies (such as cookies, JavaScript, or Web Beacons) may also be used by the third-party ad networks to measure the effectiveness of their advertisements and / or to personalize the advertising content that you see.</p>
      <p>Typing-Practice.online has no access to or control over these cookies that are used by third-party advertisers.</p>
      
      <h2>5. Third Party Privacy Policies</h2>
      <p>You should consult the respective privacy policies of these third-party ad servers for more detailed information on their practices as well as for instructions about how to opt-out of certain practices. Typing-Practice.online's privacy policy does not apply to, and we cannot control the activities of, such other advertisers or web sites.</p>
      <p>If you wish to disable cookies, you may do so through your individual browser options. More detailed information about cookie management with specific web browsers can be found at the browsers' respective websites.</p>

      <h2>6. Data Collection & Authentication</h2>
      <p>If you choose to create an account, we use Firebase Authentication. We collect basic information such as your email address and associated profile information (like your name or avatar) solely to save your typing progress, preferences, and leaderboard standings. We do not sell this information to third parties.</p>

      <h2>Consent</h2>
      <p>By using our website, you hereby consent to our privacy policy and agree to its terms.</p>
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
