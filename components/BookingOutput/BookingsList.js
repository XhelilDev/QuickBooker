
import { FlatList, Text, View } from 'react-native';
import BookingItem from './BookingItem';

function renderBookingsItem(itemData) {
  return <BookingItem {...itemData.item} />
}

function BookingsList({ bookings }) {
//   if (!bookings || bookings.length === 0) {
//     return <View><Text>No bookings available</Text></View>; // Fallback message
//   }

  return <FlatList data={bookings} renderItem={renderBookingsItem} keyExtractor={(item) => item.id}/>
  
}

export default BookingsList;