import { useContext, useLayoutEffect, useState } from 'react';
import {View,StyleSheet} from 'react-native';
import BookingForm from '../components/ManageBooking/BookingForm';
import ErrorOverlay from '../components/UI/ErrorOverlay';
import IconButton from '../components/UI/IconButton';
import LoadingOverlay from '../components/UI/LoadingOverlay';
import { GlobalStyles } from '../constants/styles';
import { bookingContext } from '../store/booking-context';
import { deleteBooking, storeBooking, updateBooking } from '../util/httpFirebase';

function ManageBooking({route,navigation}){
    const [isSubmitting,setIsSubmitting]=useState(false);
    const[error,setError]=useState();
    const bookingsCtx=useContext(bookingContext);
    const editedBookingId=route.params?.bookingId;
    const isEditing=!!editedBookingId;
    const { uid } = useContext(bookingContext); // Retrieve uid outside the confirmHandler
    

    const selectedBooking=bookingsCtx.bookings.find(
        (booking)=>booking.id===editedBookingId
        );

    useLayoutEffect(()=>{
        navigation.setOptions({
            title:isEditing ? 'Edit Booking':'Add Booking'
        });

    },[navigation,isEditing])

   async function deleteBookingHandler(){
    setIsSubmitting(true);
    try {
        await deleteBooking(uid,editedBookingId);
        bookingsCtx.deleteBooking(editedBookingId);
        navigation.goBack();
    } catch (error) {
        setError('Could not delete booking-pleas try again later!')
        setIsSubmitting(false);
    }
           
    }
    function cancelHandler(){
        navigation.goBack();
    }
    async function confirmHandler(bookingData){
         setIsSubmitting(true);
         
    try {
      if (isEditing) {
        bookingsCtx.updateBooking(editedBookingId, bookingData); // Update locally
        await updateBooking(uid, editedBookingId, bookingData);  // Update in Firebase
      } else {
        const id = await storeBooking(uid, bookingData); // Store in Firebase
        bookingsCtx.addBooking({ ...bookingData, id: id }); // Add locally
      }
      navigation.goBack(); // Navigate back
    } catch (error) {
      setError('Could not save data, please try again later!');
      setIsSubmitting(false);
    }
       
        
    }

    if(error&&!isSubmitting){
        return <ErrorOverlay messages={error} />
    }

   if(isSubmitting){
    return <LoadingOverlay/>;
   }

    return (
        <View style={styles.container}>
        <BookingForm
        submitButtonLabel={isEditing?'Update':'Add'}
        onSubmit={confirmHandler}
        onCancel={cancelHandler}
        defaultValues={selectedBooking}
        />
          
            {
                isEditing && (
                    <View style={styles.deleteContainer}>
                    <IconButton icon="trash" color={GlobalStyles.colors.error500} 
                    size={24} 
                    onPress={deleteBookingHandler}/>
                    </View>
                )

            }
        </View>
    )
}

export default ManageBooking;

const styles=StyleSheet.create({

    container:{
        flex:1,
        padding:24,
        backgroundColor:GlobalStyles.colors.primary50
    },
    deleteContainer:{
        marginTop:16,
        paddingTop:8,
        borderTopWidth:2,
        borderTopColor:GlobalStyles.colors.primary500,
        alignItems:'center'
    }

})