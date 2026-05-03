
import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { auth, db } from '../firebase';
import { onAuthStateChanged, User } from 'firebase/auth';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';

const Navbar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    console.log("Auth listener initialized");
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      console.log("Auth state changed:", currentUser ? `User logged in: ${currentUser.uid}` : "User logged out");
      setUser(currentUser);
      
      if (currentUser) {
        // Sync user data to Firestore
        try {
          const userDisplayName = currentUser.displayName || currentUser.email?.split('@')[0] || `User_${currentUser.uid.substring(0, 5)}`;
          console.log("Attempting to sync user data for:", userDisplayName);
          
          const userRef = doc(db, "users", currentUser.uid);
          await setDoc(userRef, {
            userId: currentUser.uid,
            username: userDisplayName,
            email: currentUser.email || "",
            photoURL: currentUser.photoURL || "",
            lastLogin: serverTimestamp(),
          }, { merge: true });
          
          console.log("User data synced successfully to Firestore");
        } catch (error) {
          console.error("Error syncing user data:", error);
        }
      }
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
    { name: 'Typing Test', path: '/typing-test' },
    { name: 'Speed Test', path: '/typing-speed-test' },
    { name: 'Lessons', path: '/lessons' },
    { name: 'Exam Mode', path: '/exam-mode' },
    { name: 'About', path: '/about' }
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
    
    if (path === '/blog') {
      return currentPath.startsWith('/blog');
    }

    if (path === '/tools') {
      return currentPath.startsWith('/tools');
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
              <div className="relative flex items-center justify-center w-9 h-9 bg-transparent overflow-hidden group-hover:scale-105 transition-transform duration-300">
                <svg width="36" height="36" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                  {/* Base keyboard body */}
                  <rect x="1" y="8" width="30" height="18" rx="5" fill="#1e293b" className="group-hover:fill-blue-600 transition-colors duration-300"/>
                  
                  {/* Top row keys */}
                  <rect x="4" y="11" width="4" height="3" rx="1" fill="#64748b"/>
                  <rect x="9" y="11" width="4" height="3" rx="1" fill="#64748b"/>
                  <rect x="14" y="11" width="4" height="3" rx="1" fill="#64748b"/>
                  <rect x="19" y="11" width="4" height="3" rx="1" fill="#64748b"/>
                  <rect x="24" y="11" width="4" height="3" rx="1" fill="#3b82f6"/>
                  
                  {/* Spacebar section (Face) */}
                  <rect x="4" y="16" width="24" height="7" rx="3" fill="white"/>
                  
                  {/* Cute blushing eyes */}
                  <circle cx="12" cy="19.5" r="1.5" fill="#1e293b"/>
                  <circle cx="20" cy="19.5" r="1.5" fill="#1e293b"/>
                  
                  {/* Blush */}
                  <ellipse cx="9.5" cy="20.5" rx="1.5" ry="1" fill="#fecaca"/>
                  <ellipse cx="22.5" cy="20.5" rx="1.5" ry="1" fill="#fecaca"/>
                  
                  {/* Little smile */}
                  <path d="M14 20.5C14.5 22 17.5 22 18 20.5" stroke="#1e293b" strokeWidth="1.2" strokeLinecap="round"/>
                </svg>
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
          <div className="hidden lg:flex flex-1 justify-center items-center px-4 overflow-x-auto no-scrollbar">
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
                </Link>
              ))}
            </div>
          </div>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-2 lg:gap-4 flex-shrink-0">
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
          
          <div className="lg:hidden flex items-center">
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
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-4 space-y-1">
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 rounded-md flex items-center justify-center bg-transparent">
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="1" y="8" width="30" height="18" rx="5" fill="#1e293b" />
                  <rect x="4" y="11" width="4" height="3" rx="1" fill="#64748b"/>
                  <rect x="9" y="11" width="4" height="3" rx="1" fill="#64748b"/>
                  <rect x="14" y="11" width="4" height="3" rx="1" fill="#64748b"/>
                  <rect x="19" y="11" width="4" height="3" rx="1" fill="#64748b"/>
                  <rect x="24" y="11" width="4" height="3" rx="1" fill="#3b82f6"/>
                  <rect x="4" y="16" width="24" height="7" rx="3" fill="white"/>
                  <circle cx="12" cy="19.5" r="1.5" fill="#1e293b"/>
                  <circle cx="20" cy="19.5" r="1.5" fill="#1e293b"/>
                  <ellipse cx="9.5" cy="20.5" rx="1.5" ry="1" fill="#fecaca"/>
                  <ellipse cx="22.5" cy="20.5" rx="1.5" ry="1" fill="#fecaca"/>
                  <path d="M14 20.5C14.5 22 17.5 22 18 20.5" stroke="#1e293b" strokeWidth="1.2" strokeLinecap="round"/>
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
            <h4 className="font-semibold text-slate-900 mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-slate-500">
              <li><Link to="/" className="hover:text-blue-600">Home</Link></li>
              <li><Link to="/typing-test" className="hover:text-blue-600">Typing Test</Link></li>
              <li><Link to="/typing-speed-test" className="hover:text-blue-600">Speed Test</Link></li>
              <li><Link to="/lessons" className="hover:text-blue-600">Lessons</Link></li>
              <li><Link to="/exam-mode" className="hover:text-blue-600">Exam Mode</Link></li>
              <li><Link to="/about" className="hover:text-blue-600">About</Link></li>
              <li><Link to="/sitemap" className="hover:text-blue-600">Sitemap</Link></li>
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
