import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SEO from '../components/SEO';
import { auth } from '../firebase';
import { getUserProfile, getUserStats } from '../services/typingService';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { format } from 'date-fns';

const Profile: React.FC = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState<any>(null);
  const [stats, setStats] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      if (!auth.currentUser) {
        navigate('/signin');
        return;
      }
      
      try {
        const userProfile = await getUserProfile(auth.currentUser.uid);
        const userStats = await getUserStats(auth.currentUser.uid);
        
        setProfile(userProfile);
        
        // Format stats for chart
        const chartData = userStats.map(stat => ({
          date: format(stat.createdAt.toDate(), 'MMM dd'),
          wpm: stat.wpm,
          accuracy: stat.accuracy
        }));
        
        setStats(chartData);
      } catch (error) {
        console.error("Error fetching user data", error);
      } finally {
        setLoading(false);
      }
    };

    // Wait a bit for auth to initialize
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        fetchUserData();
      } else {
        navigate('/signin');
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="py-12 px-4 max-w-6xl mx-auto">
      <SEO 
        title="Your Typing Dashboard | TypingPractice.online" 
        description="Track your typing progress, view your streak, and analyze your speed and accuracy over time." 
        noIndex={true}
      />
      
      <div className="mb-12 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 mb-2">Welcome back, {profile?.username || profile?.displayName || 'Typist'}!</h1>
          <p className="text-slate-500">Track your progress and keep up the great work.</p>
        </div>
        <div className="bg-orange-50 border border-orange-200 px-6 py-3 rounded-2xl flex items-center gap-3 shadow-sm">
          <span className="text-2xl">🔥</span>
          <div>
            <div className="text-xs font-bold text-orange-600 uppercase tracking-wider">Current Streak</div>
            <div className="text-xl font-extrabold text-orange-700">{profile?.streak || 0} Days</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
          <div className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-2">Total Tests</div>
          <div className="text-4xl font-bold text-blue-600">{profile?.totalTests || 0}</div>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
          <div className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-2">Avg WPM</div>
          <div className="text-4xl font-bold text-emerald-600">
            {stats.length > 0 ? Math.round(stats.reduce((acc, curr) => acc + curr.wpm, 0) / stats.length) : 0}
          </div>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
          <div className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-2">Avg Accuracy</div>
          <div className="text-4xl font-bold text-indigo-600">
            {stats.length > 0 ? Math.round(stats.reduce((acc, curr) => acc + curr.accuracy, 0) / stats.length) : 0}%
          </div>
        </div>
      </div>

      <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
        <h2 className="text-xl font-bold text-slate-900 mb-6">Typing Progress</h2>
        {stats.length > 0 ? (
          <div className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={stats} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fill: '#64748b' }} dy={10} />
                <YAxis yAxisId="left" axisLine={false} tickLine={false} tick={{ fill: '#64748b' }} />
                <YAxis yAxisId="right" orientation="right" axisLine={false} tickLine={false} tick={{ fill: '#64748b' }} />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}
                />
                <Legend iconType="circle" wrapperStyle={{ paddingTop: '20px' }} />
                <Line yAxisId="left" type="monotone" dataKey="wpm" name="Speed (WPM)" stroke="#2563eb" strokeWidth={3} dot={{ r: 4, strokeWidth: 2 }} activeDot={{ r: 6 }} />
                <Line yAxisId="right" type="monotone" dataKey="accuracy" name="Accuracy (%)" stroke="#10b981" strokeWidth={3} dot={{ r: 4, strokeWidth: 2 }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <div className="text-center py-12 text-slate-500">
            <p className="mb-4">No typing data available yet.</p>
            <button onClick={() => navigate('/typing-test')} className="bg-blue-600 text-white px-6 py-2 rounded-xl font-bold hover:bg-blue-700 transition-all">
              Take a Test
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
