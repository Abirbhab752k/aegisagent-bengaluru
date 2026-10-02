// Firebase configuration for AegisAgent
// Initialize Firebase with your project credentials
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, onSnapshot, query, orderBy, limit, serverTimestamp } from 'firebase/firestore';

// Firebase config - uses environment variables for security
// Set VITE_FIREBASE_* variables in .env.local for production
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || 'demo-api-key',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || 'aegis-agent-demo.firebaseapp.com',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || 'aegis-agent-demo',
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || 'aegis-agent-demo.appspot.com',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '123456789',
  appId: import.meta.env.VITE_FIREBASE_APP_ID || '1:123456789:web:abcdef',
};

// Initialize Firebase app
let app;
let db;

try {
  app = initializeApp(firebaseConfig);
  db = getFirestore(app);
  console.log('[AegisAgent] Firebase initialized successfully');
} catch (error) {
  console.warn('[AegisAgent] Firebase initialization failed, using mock mode:', error.message);
  // Mock mode - app will use local state instead
}

// Export Firestore instance and helpers
export { db };
export { collection, addDoc, onSnapshot, query, orderBy, limit, serverTimestamp };

/**
 * Add a security incident to Firestore audit log
 * Falls back gracefully if Firebase is not configured
 */
export async function addAuditLog(logEntry) {
  if (!db) return null;
  try {
    const docRef = await addDoc(collection(db, 'audit_logs'), {
      ...logEntry,
      timestamp: serverTimestamp(),
    });
    return docRef.id;
  } catch (error) {
    console.warn('[AegisAgent] Firestore write failed:', error.message);
    return null;
  }
}

/**
 * Subscribe to real-time audit log updates
 * Returns unsubscribe function
 */
export function subscribeToAuditLogs(callback, maxEntries = 50) {
  if (!db) {
    // Return mock subscription that calls callback with empty data
    return () => {};
  }
  try {
    const q = query(
      collection(db, 'audit_logs'),
      orderBy('timestamp', 'desc'),
      limit(maxEntries)
    );
    return onSnapshot(q, (snapshot) => {
      const logs = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        timestamp: doc.data().timestamp?.toDate?.() || new Date(),
      }));
      callback(logs);
    }, (error) => {
      console.warn('[AegisAgent] Firestore listen error:', error.message);
    });
  } catch (error) {
    console.warn('[AegisAgent] Firestore subscription failed:', error.message);
    return () => {};
  }
}
