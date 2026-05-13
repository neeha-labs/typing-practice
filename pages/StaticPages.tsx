
import React from 'react';
import SEO from '../components/SEO';

export const About: React.FC = () => (
  <div className="py-16 px-4 max-w-3xl mx-auto">
    <SEO 
      title="About Us - Our Mission to Help Exam Aspirants" 
      description="Learn about Typing-Practice.online, our mission to bridge the skill gap for government job aspirants, and why we build realistic exam simulations." 
    />
    <header className="mb-12 border-b border-slate-200 pb-8">
      <h1 className="text-4xl font-extrabold text-slate-900 mb-4">Learn About Our Mission to Improve Global Typing</h1>
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

      <section className="mt-12 p-8 bg-blue-50 rounded-3xl text-slate-700">
        <h3 className="text-xl font-bold text-slate-900 mb-3">Our Core Philosophy</h3>
        <p className="mb-4">
          Typing seems like an intuitive skill, but without guided instruction, almost everyone develops inefficient habits that eventually cap their speed. Our philosophy is that typing should be taught like a physical sport. You need to understand your form, build muscle memory, and track your metrics rigorously. We provide all the specialized exercises needed to take you from a hunt-and-pecker to a professional touch typist in a matter of weeks.
        </p>
        <p className="mb-4">
          Before launching this platform, we examined the highest-rated government exam centers and premium keyboarding software. We found that most free tools are either cluttered with ads or use inaccurate grading metrics that do not actually reflect how official examinations penalize errors. We built this platform to guarantee that when you score 40 WPM here, you will score 40 WPM on your big day.
        </p>
        <p>
          We continue to expand our features based on user feedback. Our recent updates introduced adaptive lessons, detailed letter-error mapping, and customizable exam interfaces. We are dedicated to ensuring that you always have the most scientifically sound methodology for keyboard mastery available directly in your browser.
        </p>
      </section>
    </div>
  </div>
);

export const Contact: React.FC = () => (
  <div className="py-16 px-4 max-w-3xl mx-auto">
    <SEO 
      title="Contact Support - Get in Touch" 
      description="Have questions or feedback about our typing tools? Contact the Typing-Practice.online team for support or partnership inquiries." 
    />
    <h1 className="text-4xl font-bold mb-8 text-center">Get in Touch with Our Typing Experts</h1>
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

    <section className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm mt-12 text-left text-slate-700">
      <h2 className="text-2xl font-bold text-slate-900 mb-4">How Can We Assist You?</h2>
      <p className="mb-4">
        Our support team is primarily dedicated to ensuring that your typing practice experience is flawless. If you encounter any issues regarding WPM calculation discrepancies, exam simulation glitches, or account data problems, please provide detailed context in your message. Whether you're accessing the site from a desktop computer, a mobile workstation, or a specialized browser, letting us know the specific setup you are using can drastically speed up our troubleshooting process. We aim to resolve all technical support tickets within 48 hours to ensure your study schedule remains uninterrupted. We understand that preparing for a typing exam or learning to touch type is a time-sensitive endeavor, so our team takes every single bug report and performance issue very seriously.
      </p>
      <p className="mb-4">
        For users who are strictly preparing for upcoming government exams (such as SSC CHSL, CGL, Banking, or State Level tests) and notice a difference between our interface and the official examination software, we highly encourage you to reach out! Official exam boards are notorious for sudden changes in their software, including how they handle scrolling, backspace keys, and word highlighting. We actively update our styling, highlighting logic, and error-penalty mathematical formulas to precisely match regional specific typing boards. Your immediate, detailed feedback helps us maintain the absolute gold standard of free typing utilities across the internet. Providing detailed information, such as screenshots or official notification circulars, is incredibly helpful for our development engineers.
      </p>
      <h3 className="text-xl font-bold text-slate-900 mb-3">Partnerships & Feature Ideas</h3>
      <p className="mb-4">
        If you run a coaching center, an educational publication, an e-learning platform, or oversee corporate training, we are completely open to partnerships and customized licensing agreements. We have previously customized our tools for specialized learning hubs, tailoring lesson progress tracks and leaderboard systems to better serve their specific student demographics. Providing a dedicated practice environment with branded interfaces has been highly successful for our ongoing partners.
      </p>
      <p>
        Additionally, if there is a specific metric, granular statistical graph, language variation, or unique lesson structure you wish we had, please let us know! Many of our most popular advanced features—like our detailed N-gram analysis, hard-mode exam simulators, and real-time accuracy charts—were directly inspired by dedicated typists reaching out to our contact desk. Our developers continually evaluate feature requests and regularly implement community-driven ideas in our weekly deployment cycles. So whatever your idea might be, don't hesitate to share it with us; we are actively trying to build the best, most comprehensive typing tool on the web.
      </p>
    </section>
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
        <li>Users may opt-out of the use of the DART cookie by visiting the Google ad and content network privacy policy at the following URL: <a href="https://policies.google.com/technologies/ads" target="_blank" rel="noopener noreferrer">Google Advertising Policies</a></li>
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
      <p>Welcome to Typing-Practice.online. By accessing, browsing, or utilizing any of the typing tests, lessons, tools, or other materials provided on this website, you explicitly agree to comply with and be bound by the following comprehensive terms and conditions of use. If you disagree with any part of these terms and conditions, you must discontinue your use of our platform immediately. These terms apply to all visitors, users, and others who access or use the Service.</p>
      
      <h2>1. Proper Use and Account Integrity</h2>
      <p>Our platform is designed to provide genuine typing metrics for personal improvement. Users must not use automated scripts, macro programs, browser extensions, bots, or any other artificial means to manipulate typing scores, bypass time constraints, or inflate leaderboard rankings. We maintain sophisticated anti-cheat monitoring systems and reserve the right to instantly and permanently remove any suspicious entries, wipe account histories, or ban IP addresses that violate this core tenet of fairness without prior notice.</p>
      
      <h2>2. Intellectual Property and Content Ownership</h2>
      <p>The site design, architecture, styling, and underlying code infrastructure are the intellectual property of Typing-Practice.online. However, the typing texts, historical quotes, literature snippets, and exam simulations provided are utilized strictly under Fair Use for educational and typing practice purposes only. We do not claim exclusive copyright over public domain texts or simulated exam formats. These materials are provided strictly for your personal, non-commercial practice and skill development.</p>
      
      <h2>3. Legal Disclaimer of Official Status</h2>
      <p>Typing-Practice.online is an entirely independent, private educational project. We are not officially affiliated with, endorsed by, or sponsored by any government organization, examination board (such as the Staff Selection Commission [SSC] or Railway Recruitment Board [RRB]), or commercial testing agency. While we invest significant time ensuring our exam interfaces meticulously simulate real-world conditions, they do not represent the exact or official exam software of any governing body.</p>
      
      <h2>4. Limitation of Liability and Warranties</h2>
      <p>Your use of the Service is at your sole risk. The Service is provided on an "AS IS" and "AS AVAILABLE" basis. Typing-Practice.online makes no specific guarantees that practicing here will guarantee employment, pass competitive exams, or prevent physical typing injuries. While we strive to maintain 100% mathematical accuracy in our WPM calculations and testing environments, we are not legally or financially responsible for any career outcomes or minor discrepancies between our platform's metrics and actual government examination results on test day.</p>

      <h2>5. User Generated Content and Community Conduct</h2>
      <p>If the service permits user profiles, forum posts, or custom text submissions, you agree not to submit any content that is illegal, threatening, defamatory, invasive of privacy, infringing of intellectual property rights, or otherwise injurious to third parties. We reserve the ultimate editorial right to remove any content we deem inappropriate or off-topic without providing justification to the author.</p>
      
      <h2>6. Modifications to the Service and Terms</h2>
      <p>We reserve the right, at our sole discretion, to modify or replace these Terms at any time. We may also alter, suspend, or discontinue the Service (including the availability of any feature, database, or content) at any time without prior notice or liability. Your continued use of the platform following the posting of any changes to the Terms constitutes acceptance of those changes.</p>

      <p className="mt-8 text-sm text-slate-500 italic">If you have any questions or concerns regarding these Terms of Service, please reach out to us via our designated Contact page.</p>
    </div>
  </div>
);
