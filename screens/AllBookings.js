
import { useContext } from 'react';
import BookingsOutput from '../components/BookingOutput/BookingsOutput';
import { bookingContext } from '../store/booking-context';

function AllBookings(){
    const bookingsCtx=useContext(bookingContext);
    return <BookingsOutput bookings={bookingsCtx.bookings} 
    bookingsPeriod="All Bookings"
    fallbackText="No bookings registered found"
    />;
}

export default AllBookings;
