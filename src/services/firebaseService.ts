import {
  auth,
  db,
  googleProvider,
  signInWithPopup,
  signOut,
  signInAnonymously,
  onAuthStateChanged,
  collection,
  doc,
  setDoc,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  where,
  addDoc,
  deleteDoc,
  User
} from '../firebase/config';
import { RideRecord, UserProfile } from '../types';

export { auth };

// Auth helpers
export async function loginWithGoogle() {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    return result.user;
  } catch (error) {
    console.error("Google sign-in error:", error);
    throw error;
  }
}

export async function loginAnonymouslyUser() {
  try {
    const result = await signInAnonymously(auth);
    return result.user;
  } catch (error) {
    console.error("Anonymous sign-in error:", error);
    throw error;
  }
}

export async function logout() {
  return await signOut(auth);
}

export function subscribeAuthState(callback: (user: User | null) => void) {
  return onAuthStateChanged(auth, callback);
}

// Firestore Rides Sync
export async function saveRideToFirestore(ride: RideRecord, userId: string = 'guest') {
  try {
    const rideRef = doc(db, 'rides', ride.id);
    await setDoc(rideRef, {
      ...ride,
      userId,
      createdAt: new Date().toISOString()
    });
  } catch (error) {
    console.warn("Firestore save ride error:", error);
  }
}

export async function deleteRideFromFirestore(rideId: string) {
  try {
    const rideRef = doc(db, 'rides', rideId);
    await deleteDoc(rideRef);
  } catch (error) {
    console.warn("Firestore delete ride error:", error);
  }
}

export function subscribeUserRides(userId: string, callback: (rides: RideRecord[]) => void) {
  try {
    const ridesRef = collection(db, 'rides');
    const q = query(ridesRef, where('userId', '==', userId));
    return onSnapshot(q, (snapshot) => {
      const rides: RideRecord[] = [];
      snapshot.forEach((docSnap) => {
        const data = docSnap.data();
        rides.push({
          id: docSnap.id,
          timestamp: data.timestamp || '00:00',
          platform: data.platform || 'App',
          fareValue: Number(data.fareValue || 0),
          totalKm: Number(data.totalKm || 0),
          durationMin: Number(data.durationMin || 0),
          netProfit: Number(data.netProfit || 0),
          score: Number(data.score || 0),
          color: data.color || 'green'
        });
      });
      if (rides.length > 0) {
        callback(rides);
      }
    }, (err) => {
      console.warn("Rides subscription error:", err);
    });
  } catch (e) {
    console.warn("Firestore subscription failed:", e);
    return () => {};
  }
}

// Firestore Lead submission for Register Modal / Admin Panel
export async function saveLeadToFirestore(lead: {
  name: string;
  email: string;
  phone: string;
  country: string;
  city: string;
  platform: string;
  plan: string;
}) {
  try {
    const leadsRef = collection(db, 'leads');
    await addDoc(leadsRef, {
      ...lead,
      status: 'Ativo',
      date: new Date().toLocaleDateString('pt-BR'),
      createdAt: new Date().toISOString()
    });
  } catch (error) {
    console.warn("Firestore save lead error:", error);
  }
}

// Firestore User Profile Sync
export async function saveUserProfileToFirestore(userId: string, profile: UserProfile) {
  try {
    const userRef = doc(db, 'users', userId);
    await setDoc(userRef, {
      ...profile,
      updatedAt: new Date().toISOString()
    }, { merge: true });
  } catch (error) {
    console.warn("Firestore profile save error:", error);
  }
}

export async function getUserProfileFromFirestore(userId: string): Promise<UserProfile | null> {
  try {
    const userRef = doc(db, 'users', userId);
    const snap = await getDoc(userRef);
    if (snap.exists()) {
      return snap.data() as UserProfile;
    }
  } catch (error) {
    console.warn("Firestore profile get error:", error);
  }
  return null;
}
