// httpFirebase.js
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, set, get, update, remove, push } from 'firebase/database';
import { signInAnonymously, initializeAuth, getReactNativePersistence} from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Konfigurimi i Firebase
const firebaseConfig = {
    apiKey: "",
    authDomain: "",
    databaseURL: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: ""
};

// Inicializo Firebase
const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage),
  });
const database = getDatabase(app);

export { auth };
// Funksioni për autentifikimin anonim
export const signInAnonymouslyFunction = async () => {
  try {
    const userCredential = await signInAnonymously(auth);
    return userCredential.user.uid; // Kthe uid-në e përdoruesit
  } catch (error) {
    console.error('Error signing in anonymously:', error);
    throw error;
  }
};


export const storeBooking = async (uid, bookingData) => {
    try {
      const userBookingsRef = ref(database, `bookings/${uid}`);
      const newBookingRef = push(userBookingsRef);
      
      //console.log('Booking data being stored:', bookingData); // Logo të dhënat që po dërgohen
      
      // Sigurohu që bookingData ka të dhëna për description dhe date
      await set(newBookingRef, {
        description: bookingData.description,
        date: bookingData.date.toISOString()
      });
      
      //console.log('Booking stored with ID:', newBookingRef.key);
      return newBookingRef.key;
    } catch (error) {
      console.error('Error storing booking:', error);
      throw error;
    }
  };
  
  
  

  export const fetchBookings = async (uid) => {
    try {
      const userBookingsRef = ref(database, `bookings/${uid}`);
      const snapshot = await get(userBookingsRef);
      
      //console.log('Snapshot data:', snapshot.val()); // Logo të dhënat nga snapshot
      
      if (snapshot.exists()) {
        const bookings = snapshot.val();
        const bookingsArray = Object.keys(bookings).map(key => ({
          id: key,
          ...bookings[key],
        }));
        return bookingsArray;
      } else {
        return [];
      }
    } catch (error) {
      console.error('Error fetching bookings:', error);
      throw error;
    }
  };
  
  
  
export const updateBooking = async (uid, id, updatedBookingData) => {
  try {
    const bookingRef = ref(database, `bookings/${uid}/${id}`);
    await update(bookingRef, updatedBookingData);
    console.log('Booking updated');
  } catch (error) {
    console.error('Error updating booking:', error);
    throw error;
  }
};

export const deleteBooking = async (uid, id) => {
  try {
    const bookingRef = ref(database, `bookings/${uid}/${id}`);
    await remove(bookingRef);
    console.log('Booking deleted');
  } catch (error) {
    console.error('Error deleting booking:', error);
    throw error;
  }
};
