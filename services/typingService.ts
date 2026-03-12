import { collection, addDoc, serverTimestamp, doc, getDoc, setDoc, updateDoc, increment, query, orderBy, limit, getDocs, where, Timestamp } from 'firebase/firestore';
import { db, auth } from '../firebase';
import { format } from 'date-fns';

export const saveTestResult = async (
  wpm: number,
  accuracy: number,
  duration: number,
  mode: string,
  mistypedKeys: Record<string, number>
) => {
  if (!auth.currentUser) return;

  const uid = auth.currentUser.uid;
  const todayDate = format(new Date(), 'yyyy-MM-dd');
  const testType = duration === 60 ? '1min' : duration === 300 ? '5min' : duration === 600 ? '10min' : `${duration}s`;

  // 1. Save the test result
  await addDoc(collection(db, 'typing_results'), {
    userId: uid,
    username: auth.currentUser.displayName || `User_${uid.substring(0, 4)}`,
    wpm,
    accuracy,
    testType,
    duration,
    mode,
    mistypedKeys,
    createdAt: serverTimestamp()
  });

  // 2. Update User Profile & Streak
  const userRef = doc(db, 'users', uid);
  const userSnap = await getDoc(userRef);

  if (userSnap.exists()) {
    const userData = userSnap.data();
    let newStreak = userData.streak || 0;
    
    if (userData.lastPracticeDate !== todayDate) {
      // Check if it was yesterday
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const yesterdayStr = format(yesterday, 'yyyy-MM-dd');
      
      if (userData.lastPracticeDate === yesterdayStr) {
        newStreak += 1;
      } else {
        newStreak = 1; // Reset streak
      }
      
      await updateDoc(userRef, {
        streak: newStreak,
        lastPracticeDate: todayDate,
        totalTests: increment(1)
      });
    } else {
      await updateDoc(userRef, {
        totalTests: increment(1)
      });
    }
  } else {
    // Create user profile
    await setDoc(userRef, {
      userId: uid,
      username: auth.currentUser.displayName || `User_${uid.substring(0, 4)}`,
      email: auth.currentUser.email,
      photoURL: auth.currentUser.photoURL,
      createdAt: serverTimestamp(),
      streak: 1,
      lastPracticeDate: todayDate,
      totalTests: 1
    });
  }
};

export const getUserStats = async (uid: string) => {
  const q = query(collection(db, 'typing_results'), where('userId', '==', uid));
  const snapshot = await getDocs(q);
  const results = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() as any }));
  return results.sort((a, b) => {
    const timeA = a.createdAt?.toMillis() || 0;
    const timeB = b.createdAt?.toMillis() || 0;
    return timeA - timeB;
  });
};

export const getUserProfile = async (uid: string) => {
  const docRef = doc(db, 'users', uid);
  const snapshot = await getDoc(docRef);
  return snapshot.exists() ? snapshot.data() : null;
};
