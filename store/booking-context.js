import { createContext, useReducer,useState,useEffect } from 'react';
import {signInAnonymouslyFunction } from '../util/httpFirebase';

export const bookingContext = createContext({
    bookings: [],
    uid: null, // Add uid to the context
    setUid: (uid) => {}, // Placeholder for setUid
    addBooking: ({ description, date }) => {},
    setBookings: (bookings) => {},
    deleteBooking: (id) => {},
    updateBooking: (id, { description, date }) => {},
});

function bookingReducer(state, action) {
    switch (action.type) {
        case 'ADD':
            // Add a single booking to the state
            return [action.payload, ...state];
        case 'SET':
            const inverted = action.payload.reverse();
            return inverted;
        case 'UPDATE':
            const updatableBookingIndex = state.findIndex(
                (booking) => booking.id === action.payload.id
            );
            const updatableBooking = state[updatableBookingIndex];
            const updatedItem = { ...updatableBooking, ...action.payload.data };
            const updatedBookings = [...state];
            updatedBookings[updatableBookingIndex] = updatedItem;
            return updatedBookings;
        case 'DELETE':
            return state.filter((booking) => booking.id !== action.payload);
        default:
            return state;
    }
}

function BookingsContextProvider({ children }) {
    const [bookingsState, dispatch] = useReducer(bookingReducer, []);
    const [uid, setUid] = useState(null); // Shto një state për uid

    useEffect(() => {
        // Call your custom signInAnonymously function
        const signIn = async () => {
          try {
            const userUid = await signInAnonymouslyFunction();
            setUid(userUid); // Set the user's UID after successful sign-in
          } catch (error) {
            console.error('Error during anonymous sign-in:', error);
          }
        };
    
        signIn();
      }, []);

    function addBooking(bookingData) {
        dispatch({ type: 'ADD', payload: bookingData });
    }

    function setBookings(bookings) {
        dispatch({ type: 'SET', payload: bookings });
    }

    function deleteBooking(id) {
        dispatch({ type: 'DELETE', payload: id });
    }

    function updateBooking(id, bookingData) {
        dispatch({ type: 'UPDATE', payload: { id: id, data: bookingData } });
    }

    const value = {
        bookings: bookingsState,
        uid: uid, // Provide uid in the context
        setUid: setUid, // Provide setUid function in the context
        setBookings: setBookings,
        addBooking: addBooking,
        deleteBooking: deleteBooking,
        updateBooking: updateBooking,
    };

    return <bookingContext.Provider value={value}>{children}</bookingContext.Provider>;
}

export default BookingsContextProvider;
