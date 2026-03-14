import React, { useState, useEffect } from 'react';
import SEO from '../components/SEO';
import { Link } from 'react-router-dom';
import { collection, query, where, orderBy, limit, getDocs, startAfter, getCountFromServer, DocumentData, QueryDocumentSnapshot } from 'firebase/firestore';
import { db, auth } from '../firebase';

const Leaderboard: React.FC = () => {
  const [category, setCategory] = useState<'30s' | '60s' | '120s' | 'allTime'>('60s');
  const [entries, setEntries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [lastDoc, setLastDoc] = useState<QueryDocumentSnapshot<DocumentData> | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [userRank, setUserRank] = useState<{ rank: number, wpm: number, accuracy: number } | null>(null);

  const fetchUserRank = async (currentCategory: string) => {
    if (!auth.currentUser) {
      setUserRank(null);
      return;
    }

    try {
      const uid = auth.currentUser.uid;
      let userQuery;
      
      if (currentCategory !== 'allTime') {
        userQuery = query(collection(db, 'typing_results'), where('userId', '==', uid), where('testType', '==', currentCategory), orderBy('wpm', 'desc'), limit(1));
      } else {
        userQuery = query(collection(db, 'typing_results'), where('userId', '==', uid), orderBy('wpm', 'desc'), limit(1));
      }

      const userSnap = await getDocs(userQuery);
      
      if (!userSnap.empty) {
        const userBest = userSnap.docs[0].data() as any;
        
        // Count how many people have a higher WPM in this category
        let countQuery;
        if (currentCategory !== 'allTime') {
          countQuery = query(collection(db, 'typing_results'), where('testType', '==', currentCategory), where('wpm', '>', userBest.wpm));
        } else {
          countQuery = query(collection(db, 'typing_results'), where('wpm', '>', userBest.wpm));
        }

        const countSnap = await getCountFromServer(countQuery);
        const rank = countSnap.data().count + 1;
        
        setUserRank({
          rank,
          wpm: userBest.wpm,
          accuracy: userBest.accuracy
        });
      } else {
        setUserRank(null);
      }
    } catch (error) {
      console.error("Error fetching user rank:", error);
    }
  };

  const buildQuery = (currentCategory: string, lastDocument?: QueryDocumentSnapshot<DocumentData> | null) => {
    let baseConstraints: any[] = [];
    
    if (currentCategory !== 'allTime') {
      baseConstraints.push(where('testType', '==', currentCategory));
    }

    baseConstraints.push(orderBy('wpm', 'desc'));
    
    if (lastDocument) {
      baseConstraints.push(startAfter(lastDocument));
    }
    
    baseConstraints.push(limit(50));
    
    return query(collection(db, 'typing_results'), ...baseConstraints);
  };

  useEffect(() => {
    const fetchInitialLeaderboard = async () => {
      setLoading(true);
      try {
        const q = buildQuery(category);
        const snapshot = await getDocs(q);
        
        const results = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() as any }));
        setEntries(results);
        
        if (snapshot.docs.length > 0) {
          setLastDoc(snapshot.docs[snapshot.docs.length - 1]);
          setHasMore(snapshot.docs.length === 50);
        } else {
          setLastDoc(null);
          setHasMore(false);
        }

        await fetchUserRank(category);
      } catch (error) {
        console.error("Failed to fetch leaderboard", error);
      } finally {
        setLoading(false);
      }
    };

    fetchInitialLeaderboard();
  }, [category]);

  const loadMore = async () => {
    if (!lastDoc || loadingMore) return;
    
    setLoadingMore(true);
    try {
      const q = buildQuery(category, lastDoc);
      const snapshot = await getDocs(q);
      
      const newResults = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() as any }));
      setEntries(prev => [...prev, ...newResults]);
      
      if (snapshot.docs.length > 0) {
        setLastDoc(snapshot.docs[snapshot.docs.length - 1]);
        setHasMore(snapshot.docs.length === 50);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Failed to load more entries", error);
    } finally {
      setLoadingMore(false);
    }
  };

  const getRankDisplay = (index: number) => {
    if (index === 0) return <span className="text-2xl" title="Rank 1">🥇</span>;
    if (index === 1) return <span className="text-2xl" title="Rank 2">🥈</span>;
    if (index === 2) return <span className="text-2xl" title="Rank 3">🥉</span>;
    return <span className="font-bold text-slate-500 w-8 text-center inline-block">{index + 1}</span>;
  };

  return (
    <div className="py-12 px-4 max-w-5xl mx-auto">
      <SEO 
        title="Typing Leaderboard - Top Speeds | TypingPractice.online" 
        description="Check out the fastest typists on TypingPractice.online. Compete for the top spot on our leaderboards." 
      />

      <Link to="/" className="text-blue-600 hover:underline text-sm font-bold mb-6 inline-flex items-center gap-1">
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back to Home
      </Link>
      
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-slate-900 mb-4">Typing Leaderboard 🏆</h1>
        <p className="text-lg text-slate-500 max-w-2xl mx-auto">See how you stack up against the fastest typists. Practice daily to climb the ranks!</p>
      </div>

      {userRank && (
        <div className="mb-8 bg-blue-50 border border-blue-200 rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-4 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold shadow-md">
              #{userRank.rank}
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900">Your Personal Best ({category === 'allTime' ? 'All-Time' : category})</h3>
              <p className="text-slate-600 text-sm">Keep practicing to improve your rank!</p>
            </div>
          </div>
          <div className="flex gap-6 text-center">
            <div>
              <div className="text-2xl font-black text-blue-600">{userRank.wpm}</div>
              <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">WPM</div>
            </div>
            <div>
              <div className="text-2xl font-black text-emerald-600">{userRank.accuracy}%</div>
              <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Accuracy</div>
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-wrap justify-center gap-3 md:gap-4 mb-8">
        <button 
          onClick={() => setCategory('30s')}
          className={`px-6 py-2 rounded-full font-bold transition-all ${category === '30s' ? 'bg-blue-600 text-white shadow-md' : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'}`}
        >
          30 Seconds
        </button>
        <button 
          onClick={() => setCategory('60s')}
          className={`px-6 py-2 rounded-full font-bold transition-all ${category === '60s' ? 'bg-blue-600 text-white shadow-md' : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'}`}
        >
          60 Seconds
        </button>
        <button 
          onClick={() => setCategory('120s')}
          className={`px-6 py-2 rounded-full font-bold transition-all ${category === '120s' ? 'bg-blue-600 text-white shadow-md' : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'}`}
        >
          120 Seconds
        </button>
        <button 
          onClick={() => setCategory('allTime')}
          className={`px-6 py-2 rounded-full font-bold transition-all ${category === 'allTime' ? 'bg-blue-600 text-white shadow-md' : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'}`}
        >
          All-Time
        </button>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[600px]">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 text-sm uppercase tracking-wider">
                <th className="p-4 font-semibold text-center w-20">Rank</th>
                <th className="p-4 font-semibold">Username</th>
                <th className="p-4 font-semibold text-right">Typing Speed</th>
                <th className="p-4 font-semibold text-right">Accuracy</th>
                <th className="p-4 font-semibold text-center">Test Type</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                // Loading Skeleton
                Array.from({ length: 5 }).map((_, i) => (
                  <tr key={i} className="border-b border-slate-100 animate-pulse">
                    <td className="p-4 text-center"><div className="h-6 w-6 bg-slate-200 rounded-full mx-auto"></div></td>
                    <td className="p-4"><div className="h-4 w-32 bg-slate-200 rounded"></div></td>
                    <td className="p-4"><div className="h-4 w-16 bg-slate-200 rounded ml-auto"></div></td>
                    <td className="p-4"><div className="h-4 w-12 bg-slate-200 rounded ml-auto"></div></td>
                    <td className="p-4"><div className="h-6 w-16 bg-slate-200 rounded-full mx-auto"></div></td>
                  </tr>
                ))
              ) : entries.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-12 text-center text-slate-500">
                    <div className="text-4xl mb-4">📭</div>
                    <p className="text-lg font-medium text-slate-700">No scores recorded yet.</p>
                    <p className="text-sm mt-1">Be the first to submit a score for this category!</p>
                  </td>
                </tr>
              ) : (
                entries.map((entry, index) => (
                  <tr key={entry.id} className={`border-b border-slate-100 hover:bg-slate-50 transition-colors ${index < 3 ? 'bg-slate-50/50' : ''}`}>
                    <td className="p-4 text-center align-middle">
                      {getRankDisplay(index)}
                    </td>
                    <td className="p-4 font-semibold text-slate-900">
                      {entry.username || entry.displayName || 'Anonymous'}
                    </td>
                    <td className="p-4 font-bold text-blue-600 text-right text-lg">
                      {entry.wpm} <span className="text-xs text-slate-400 font-normal">WPM</span>
                    </td>
                    <td className="p-4 text-emerald-600 font-medium text-right">
                      {entry.accuracy}%
                    </td>
                    <td className="p-4 text-center">
                      <span className="inline-block px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-xs font-bold uppercase tracking-wider">
                        {entry.testType || entry.mode || 'N/A'}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        
        {!loading && hasMore && (
          <div className="p-6 text-center border-t border-slate-100">
            <button 
              onClick={loadMore}
              disabled={loadingMore}
              className="bg-white border-2 border-slate-200 text-slate-700 px-6 py-2 rounded-xl font-bold hover:bg-slate-50 hover:border-slate-300 transition-all disabled:opacity-50 flex items-center justify-center gap-2 mx-auto"
            >
              {loadingMore ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-slate-700"></div>
                  Loading...
                </>
              ) : (
                'Load More'
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Leaderboard;
