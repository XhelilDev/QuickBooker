
import { View, StyleSheet, Text } from 'react-native';
import { GlobalStyles } from '../../constants/styles';
import BookingsList from './BookingsList'; // Assuming this is where you import BookingsList
import BookingsSummary from './BookingsSummary';




function BookingsOutput({ bookings, bookingsPeriod, fallbackText }) {




    let content = <Text style={styles.infoText}>{fallbackText}</Text>;

    if (bookings.length > 0) {
        content = <BookingsList bookings={bookings} />;
    }

    return (
        <View style={styles.container}>
        
        <BookingsSummary periodName={bookingsPeriod} />
       
            
            {content}
           
        </View>
    );
}

export default BookingsOutput;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 24,
        paddingTop: 24,
        paddingBottom: 0,
        backgroundColor: GlobalStyles.colors.primary700,
        
    },
  
    infoText: {
        color: GlobalStyles.colors.primary500,
        fontSize: 16,
        textAlign: 'center',
        marginTop: 32,
    },
});
