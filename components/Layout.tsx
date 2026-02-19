
import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Navbar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Sync login state with localStorage
  useEffect(() => {
    const checkLogin = () => {
      setIsLoggedIn(!!localStorage.getItem('tp_user'));
    };
    checkLogin();
    // Use an interval for local checks as 'storage' event doesn't fire on the same tab
    const interval = setInterval(checkLogin, 1000);
    window.addEventListener('storage', checkLogin);
    return () => {
      window.removeEventListener('storage', checkLogin);
      clearInterval(interval);
    };
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem('tp_user');
    setIsLoggedIn(false);
    navigate('/');
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Typing Test', path: '/typing-test' },
    { name: 'Lessons', path: '/lessons' },
    { name: 'Exam Mode', path: '/exam-mode' },
    { name: 'Hindi', path: '/hindi' },
  ];

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
                <span className="text-white font-bold text-xl italic">T</span>
              </div>
              <span className="text-xl font-bold text-slate-900 tracking-tight">Typing-Practice<span className="text-blue-600">.online</span></span>
            </Link>
            <div className="hidden md:ml-8 md:flex md:space-x-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive(link.path)
                      ? 'bg-blue-50 text-blue-700'
                      : 'text-slate-600 hover:text-blue-600 hover:bg-slate-50'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
          <div className="hidden md:flex items-center gap-4">
            {!isLoggedIn ? (
              <Link 
                to="/signin" 
                className="bg-blue-600 text-white px-6 py-2 rounded-lg text-sm font-semibold hover:bg-blue-700 transition-all shadow-sm"
              >
                Sign In
              </Link>
            ) : (
              <div className="flex items-center gap-4">
                <button 
                  onClick={() => alert('Progress saved successfully!')}
                  className="bg-slate-900 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-slate-800 transition-all shadow-sm"
                >
                  Save Progress
                </button>
                <button 
                  onClick={handleLogout}
                  className="text-slate-500 hover:text-rose-600 text-xs font-bold uppercase tracking-wider transition-colors"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
          
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-slate-600 hover:text-blue-600 p-2"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-4 space-y-1">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                isActive(link.path) ? 'bg-blue-50 text-blue-700' : 'text-slate-600'
              }`}
            >
              {link.name}
            </Link>
          ))}
          <div className="pt-4 border-t border-slate-100 flex flex-col gap-2">
            {!isLoggedIn ? (
              <button 
                onClick={() => { navigate('/signin'); setIsOpen(false); }}
                className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold text-center"
              >
                Sign In
              </button>
            ) : (
              <>
                <button 
                  onClick={() => { alert('Progress saved!'); setIsOpen(false); }}
                  className="w-full bg-slate-900 text-white px-4 py-2 rounded-lg text-sm font-semibold"
                >
                  Save Progress
                </button>
                <button 
                  onClick={() => { handleLogout(); setIsOpen(false); }}
                  className="w-full bg-rose-50 text-rose-600 px-4 py-2 rounded-lg text-sm font-bold text-center"
                >
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
};

const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-slate-200 mt-auto py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center">
                <span className="text-white font-bold text-sm">T</span>
              </div>
              <span className="text-lg font-bold text-slate-900 tracking-tight">Typing-Practice<span className="text-blue-600">.online</span></span>
            </div>
            <p className="text-slate-500 text-sm leading-relaxed">
              Empowering learners to master the art of touch typing with precision and speed for exams and productivity.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-slate-900 mb-4">Typing Tests</h4>
            <ul className="space-y-2 text-sm text-slate-500">
              <li><Link to="/typing-test/1-minute" className="hover:text-blue-600">1 Minute Typing Test</Link></li>
              <li><Link to="/typing-test/5-minute" className="hover:text-blue-600">5 Minute Typing Test</Link></li>
              <li><Link to="/typing-test/10-minute" className="hover:text-blue-600">10 Minute Typing Test</Link></li>
              <li><Link to="/exam-mode" className="hover:text-blue-600">Exam Mock Tests</Link></li>
              <li><Link to="/hindi" className="hover:text-blue-600">Hindi Typing Test</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-slate-900 mb-4">Resources</h4>
            <ul className="space-y-2 text-sm text-slate-500">
              <li><Link to="/lessons" className="hover:text-blue-600">Typing Lessons</Link></li>
              <li><Link to="/tools/wpm-calculator" className="hover:text-blue-600">WPM Calculator</Link></li>
              <li><Link to="/tools/typing-accuracy-calculator" className="hover:text-blue-600">Accuracy Calculator</Link></li>
              <li><Link to="/blog" className="hover:text-blue-600">Typing Blog</Link></li>
              <li><Link to="/blog/government-exam-typing-tips" className="hover:text-blue-600">Exam Tips</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-slate-900 mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-slate-500">
              <li><Link to="/about" className="hover:text-blue-600">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-blue-600">Contact</Link></li>
              <li><Link to="/privacy" className="hover:text-blue-600">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-blue-600">Terms of Use</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-slate-900 mb-4">Support</h4>
            <p className="text-sm text-slate-500 mb-4">Subscribe for typing tips and practice materials.</p>
            <div className="flex gap-2">
              <input type="email" placeholder="Email" className="flex-1 bg-slate-100 border-none rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500" />
              <button className="bg-slate-900 text-white px-3 py-2 rounded-lg text-sm font-medium">Join</button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Layout;
