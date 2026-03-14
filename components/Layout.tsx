
import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import { onAuthStateChanged, User } from 'firebase/auth';

const Navbar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await auth.signOut();
      navigate('/');
    } catch (error) {
      console.error("Error signing out", error);
    }
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Typing Practice', path: '/typing-practice' },
    { name: 'Typing Test', path: '/typing-test' },
    { name: 'Exam Mode', path: '/ssc-typing-test-practice' },
    { name: 'Hindi Typing', path: '/hindi' },
    { name: 'Leaderboard', path: '/leaderboard' },
  ];

  const isActive = (path: string) => {
    const currentPath = location.pathname;
    if (path === '/') return currentPath === '/';
    
    // Group related routes for highlighting
    if (path === '/typing-test') {
      return currentPath.startsWith('/typing-test') || 
             currentPath === '/typing-speed-test' ||
             currentPath.includes('-minute-typing-test');
    }
    
    if (path === '/lessons') {
      return currentPath.startsWith('/lessons') || currentPath === '/practice';
    }
    
    if (path === '/exam-mode') {
      return currentPath === '/exam-mode' || 
             currentPath === '/ssc-typing-test-practice';
    }
    
    if (path === '/hindi') {
      return currentPath === '/hindi';
    }
    
    return currentPath.startsWith(path);
  };

  return (
    <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center group">
              <div className="relative flex items-center justify-center w-8 h-8 bg-slate-900 rounded-lg overflow-hidden group-hover:bg-blue-600 transition-colors duration-300 shadow-md">
                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m4 0h1m-7 4h12a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <div className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-500 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
              </div>
              <div className="ml-2 flex flex-col leading-none">
                <span className="text-lg font-black text-slate-900 tracking-tighter uppercase">
                  Typing<span className="text-blue-600">Practice</span>
                </span>
                <span className="text-[9px] font-bold text-slate-400 tracking-[0.2em] uppercase">
                  .online
                </span>
              </div>
            </Link>
          </div>
          
          {/* Desktop Nav Links */}
          <div className="hidden md:flex flex-1 justify-center items-center px-4 overflow-x-auto no-scrollbar">
            <div className="flex items-center space-x-1 lg:space-x-2">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-2 lg:px-3 py-2 rounded-md text-sm font-medium transition-colors whitespace-nowrap flex items-center gap-1.5 ${
                    isActive(link.path)
                      ? 'bg-blue-50 text-blue-700'
                      : 'text-slate-600 hover:text-blue-600 hover:bg-slate-50'
                  }`}
                >
                  {link.name}
                  {link.path === '/hindi' && (
                    <span className="flex h-2 w-2 rounded-full bg-orange-500"></span>
                  )}
                </Link>
              ))}
            </div>
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-2 lg:gap-4 flex-shrink-0">
            {!user ? (
              <Link 
                to="/signin" 
                className="bg-blue-600 text-white p-2 lg:px-6 lg:py-2 rounded-lg text-sm font-semibold hover:bg-blue-700 transition-all shadow-sm flex items-center gap-2"
                title="Sign In"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                </svg>
                <span className="hidden lg:inline">Sign In</span>
              </Link>
            ) : (
              <div className="flex items-center gap-4">
                <Link 
                  to="/profile"
                  className="flex items-center gap-2 text-slate-700 hover:text-blue-600 font-semibold transition-colors"
                >
                  {user.photoURL ? (
                    <img src={user.photoURL} alt="Avatar" className="w-8 h-8 rounded-full border border-slate-200" referrerPolicy="no-referrer" />
                  ) : (
                    <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold">
                      {user.displayName ? user.displayName.charAt(0).toUpperCase() : 'U'}
                    </div>
                  )}
                  <span className="text-sm hidden lg:block">{user.displayName || 'User'}</span>
                </Link>
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
                isActive(link.path) ? 'bg-blue-50 text-blue-700' : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              {link.name}
            </Link>
          ))}
          <div className="pt-4 border-t border-slate-100 flex flex-col gap-2">
            {!user ? (
              <button 
                onClick={() => { navigate('/signin'); setIsOpen(false); }}
                className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold text-center"
              >
                Sign In
              </button>
            ) : (
              <>
                <Link 
                  to="/profile"
                  onClick={() => setIsOpen(false)}
                  className="w-full bg-slate-100 text-slate-800 px-4 py-2 rounded-lg text-sm font-semibold flex items-center justify-center gap-2"
                >
                  {user.photoURL ? (
                    <img src={user.photoURL} alt="Avatar" className="w-6 h-6 rounded-full" referrerPolicy="no-referrer" />
                  ) : (
                    <div className="w-6 h-6 bg-blue-200 text-blue-700 rounded-full flex items-center justify-center text-xs font-bold">
                      {user.displayName ? user.displayName.charAt(0).toUpperCase() : 'U'}
                    </div>
                  )}
                  {user.displayName || 'Profile'}
                </Link>
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
            <div className="flex items-center gap-2 mb-6">
              <div className="w-7 h-7 bg-slate-900 rounded-md flex items-center justify-center shadow-sm">
                <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m4 0h1m-7 4h12a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div className="flex flex-col leading-none">
                <span className="text-base font-black text-slate-900 tracking-tighter uppercase">
                  Typing<span className="text-blue-600">Practice</span>
                </span>
                <span className="text-[8px] font-bold text-slate-400 tracking-[0.2em] uppercase">
                  .online
                </span>
              </div>
            </div>
            <p className="text-slate-500 text-sm leading-relaxed">
              Empowering learners to master the art of touch typing with precision and speed for exams and productivity.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-slate-900 mb-4">Typing Tests</h4>
            <ul className="space-y-2 text-sm text-slate-500">
              <li><Link to="/typing-test/30-second-typing-test" className="hover:text-blue-600">30 Second Typing Test</Link></li>
              <li><Link to="/typing-test/60-second-typing-test" className="hover:text-blue-600">60 Second Typing Test</Link></li>
              <li><Link to="/typing-test/120-second-typing-test" className="hover:text-blue-600">120 Second Typing Test</Link></li>
              <li><Link to="/ssc-typing-test-practice" className="hover:text-blue-600">SSC Typing Practice</Link></li>
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
