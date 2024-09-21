import { useContext, useEffect, useState } from "react";
import BookingsOutput from "../components/BookingOutput/BookingsOutput";
import ErrorOverlay from "../components/UI/ErrorOverlay";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import { bookingContext } from "../store/booking-context";
import { getDatePlusDays } from '../util/date';
import { fetchBookings } from "../util/httpFirebase";

function RecentBookings() {
    const [isFetching, setIsFetching] = useState(true);
    const [error, setError] = useState(null);
    const bookingsCtx = useContext(bookingContext);
    const { uid } = bookingsCtx;

    useEffect(() => {
        async function getBookings() {
            setError(null); // Fshijmë gabimet e mëparshme

            // Kontrollojmë nëse uid ekziston para se të bëjmë thirrjen
            if (!uid) {
                console.error('UID is missing');
                setError('UID is missing');
                setIsFetching(false); // Ndalojmë spinner-in në rast gabimi
                return;
            }

            try {
                console.log('Fetching bookings for UID:', uid);
                const bookings = await fetchBookings(uid);
                console.log('Bookings fetched successfully:', bookings);
                bookingsCtx.setBookings(bookings); // Ruaj rezervimet në kontekst
            } catch (error) {
                console.error('Error fetching bookings:', error);
                setError('Could not fetch bookings!Check your network connection!'); // Vendos gabimin
            } finally {
                // Ndalojmë spinner-in gjithmonë pas përfundimit
                setIsFetching(false);
            }
        }

        getBookings();
    }, [uid]);

    // Nëse ka gabim, shfaqim mesazhin e gabimit
    if (error) {
        console.log('Displaying ErrorOverlay with message:', error);
        return <ErrorOverlay message={error} />;
    }

    // Nëse jemi duke e marrë rezervimin, shfaqim spinner-in
    if (isFetching) {
        console.log('Displaying SpinnerOverlay, isFetching:', isFetching);
        return <LoadingOverlay />;
    }

    // Logjika për rezervimet e ardhshme
    const nextBookings = bookingsCtx.bookings.filter((booking) => {
        const today = new Date();
        const date7daysAfter = getDatePlusDays(today, 7);
        const bookingDate = new Date(booking.date);
        return bookingDate >= today && bookingDate <= date7daysAfter;
    });

    return (
        <BookingsOutput 
            bookings={nextBookings}
            bookingsPeriod="Next 7 days Bookings" 
            fallbackText="No bookings registered for next 7 days!"
        />
    );
}

export default RecentBookings;
