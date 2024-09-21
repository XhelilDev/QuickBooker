// Import the necessary Firebase SDKs
import { initializeApp } from 'firebase/app';
import { getAuth, signInAnonymously } from 'firebase/auth';
import { getDatabase } from 'firebase/database';

// Firebase configuration from your Firebase Console
const firebaseConfig = {
  apiKey: "AIzaSyDxLgG3cMZoOxRbDBTNbW18cJLbDPru2sE",
  authDomain: "booking-app-acac9.firebaseapp.com",
  databaseURL: "https://booking-app-acac9-default-rtdb.firebaseio.com",
  projectId: "booking-app-acac9",
  storageBucket: "booking-app-acac9.appspot.com",
  messagingSenderId: "751331239372",
  appId: "1:751331239372:web:cf8fe815b4e80745cfa969"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services (Auth and Database)
const auth = getAuth(app);
const database = getDatabase(app);

// Export Firebase services for use in other parts of the app
export { auth, database, signInAnonymously };

