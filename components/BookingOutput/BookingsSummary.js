import {View,Text,StyleSheet} from 'react-native';
import { GlobalStyles } from '../../constants/styles';

function BookingsSummary({periodName}){
    return (
    <View style={styles.container}>
       
        <Text style={styles.period}>{periodName}</Text>
       
    
    </View>
    );
}

export default BookingsSummary;

const styles=StyleSheet.create({
    container:{
        padding:8,
        backgroundColor:GlobalStyles.colors.primary60,
        borderRadius:6,
        alignItems:'center'
    },

    period:{
        fontSize:16,
        color:GlobalStyles.colors.primary400,
        fontWeight: 'bold',
    }

})