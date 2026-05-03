import React from 'react';
import { Link } from 'react-router-dom';

interface PageSEOContentProps {
  topic: string;
  offers: string;
  steps: string[];
  benefits: string[];
  relatedPath: string;
  relatedName: string;
}

const PageSEOContent: React.FC<PageSEOContentProps> = ({ topic, offers, steps, benefits, relatedPath, relatedName }) => {
  return (
    <section className="seo-content mt-16 bg-white p-8 md:p-12 rounded-[2.5rem] border border-slate-100 shadow-sm max-w-4xl mx-auto mb-16 text-left">
      <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6">{topic} — Everything You Need to Know</h2>
      
      <div className="space-y-8 text-slate-600 leading-relaxed">
        <div>
          <h3 className="text-xl font-bold text-slate-800 mb-3">What this page offers</h3>
          <p>{offers} This feature is specifically designed to help you improve your {topic.toLowerCase()} quickly and efficiently. Whether you are preparing for a specific exam, looking for a job, or simply wanting to become a faster typist, this page gives you the exact tools you need.</p>
        </div>

        <div>
          <h3 className="text-xl font-bold text-slate-800 mb-3">How to use it</h3>
          <p className="mb-4">Follow these step-by-step instructions to get the most out of {topic}:</p>
          <ol className="list-decimal pl-5 space-y-2">
            {steps.map((step, idx) => (
              <li key={idx}>{step}</li>
            ))}
          </ol>
        </div>

        <div>
          <h3 className="text-xl font-bold text-slate-800 mb-3">Key Benefits</h3>
          <p className="mb-4">Practicing {topic.toLowerCase()} regularly provides several major benefits:</p>
          <ul className="list-disc pl-5 space-y-2">
            {benefits.map((benefit, idx) => (
              <li key={idx}>{benefit}</li>
            ))}
          </ul>
        </div>

        <div>
           <h3 className="text-xl font-bold text-slate-800 mb-3">Related Features</h3>
           <p>
             If you enjoyed using this feature, we highly recommend checking out our <Link to={relatedPath} className="text-blue-600 hover:underline font-semibold">{relatedName}</Link>. 
             Practicing across different modules ensures that your {topic.toLowerCase()} skills are well-rounded and that you don't grow reliant on just one type of practice format. Combining these will yield the best Words Per Minute (WPM) results.
           </p>
        </div>
      </div>
    </section>
  );
};

export default PageSEOContent;
