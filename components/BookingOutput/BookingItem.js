import { Pressable,StyleSheet, View,Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { GlobalStyles } from "../../constants/styles";
import { getFormattedDate } from "../../util/date";



function BookingItem({id,description,date}){
    const navigation=useNavigation();

    function eventPressHandler(){
        navigation.navigate('ManageBooking',
        {
            bookingId:id,
           
        }
        );
    }
     return(
        <Pressable onPress={eventPressHandler} style={({pressed})=>pressed&&styles.pressed}>
            <View style={styles.bookingItem}>
                <View>
                    <Text style={[styles.textBase,styles.description]}>{description}</Text>
                    <Text  style={styles.textBase}>{getFormattedDate(date)}</Text>
                </View>
            </View>
        </Pressable>
     );

}

export default BookingItem;

const styles=StyleSheet.create({
    pressed:{
        opacity:0.75
    },
    bookingItem:{
        paddding:12,
        marginVertical:8,
        backgroundColor:GlobalStyles.colors.primary500,
        borderRadius:6,
        elevation:3,
        shadowOpacity:0.4

    },
    textBase:{
        color:GlobalStyles.colors.primary50,
        marginLeft:8,
        marginVertical:4,
        fontSize:14
       
    },
    description:{
        
        fontSize:16,
        marginBottom:4,
        fontWeight:'bold',
        marginVertical:4
    },
   
   
    
    

})