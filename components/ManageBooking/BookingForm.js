import { useState } from 'react';
import {View,Text,StyleSheet,Alert} from 'react-native';
import { GlobalStyles } from '../../constants/styles';
import Input from './Input';
import Button from '../UI/Button';
import { getFormattedDate } from '../../util/date';

function BookingForm({submitButtonLabel,onCancel,onSubmit,defaultValues}) {
    const [inputs,setInputs]=useState({
        date:{value:defaultValues ? getFormattedDate(defaultValues.date) : '',
        isValid:true, 
    },
        description:{value:defaultValues ? defaultValues.description : '',
        isValid:true,
    }
    });
    function inputChangeHandler(inputIdentifier,enteredValue){
        setInputs((curInputs)=>{
            return{
                ...curInputs,
                [inputIdentifier]:{value:enteredValue,isValid:true}
            };
        });
    }

    function submitHandler(){
        const bookingsData={
            date:new Date(inputs.date.value),
            description:inputs.description.value
        };
        function isValidDate(date) {
            return !isNaN(Date.parse(date));
          }
          
          const dateIsValid = isValidDate(bookingsData.date);
          const descriptionIsValid = bookingsData.description && bookingsData.description.trim().length > 0;
          
          if (!dateIsValid || !descriptionIsValid) {
            //Alert.alert('Invalid input', 'Please check your input values');
            setInputs((curInputs)=>{
                return{
                    date:{value:curInputs.date.value,isValid:dateIsValid},
                    description:{value:curInputs.description.value,isValid:descriptionIsValid},
                };
            });
            return;
          }
        onSubmit(bookingsData);
    }
    const formIsValid=!inputs.date.isValid||!inputs.description.isValid;
    return (
        <View style={styles.form}>
        <Text style={styles.title}>Your Bookings</Text>
        <Input label="Date"
            invalid={!inputs.date.isValid}
            textInputConfig={{
                placeholder:'YYYY-MM-DD',
                maxLength:10,
                onChangeText:inputChangeHandler.bind(this,'date'),
                value:inputs.date.value
            }}
        />
        <Input label="Description"
        invalid={!inputs.description.isValid} 
        textInputConfig={{
            multiline:true,
            onChangeText:inputChangeHandler.bind(this,'description'),
            value:inputs.description.value
        }}/>
        {formIsValid && <Text style={styles.errorText}>Invalid input values-please check your entered data!</Text>}
          <View style={styles.buttons}>
                <Button style={styles.button} mode="flat" onPress={onCancel}>Cancel</Button>
                <Button style={styles.button} onPress={submitHandler}>{submitButtonLabel}</Button>
            </View>
        </View>
    );
    
}

export default BookingForm;

const styles=StyleSheet.create({
    form:{
        //marginTop:30
    },
    title:{
        fontSize:18,
        fontWeight:'bold',
        marginVertical:24,
        color:GlobalStyles.colors.primary500,
        textAlign:'center'
    },
    errorText:{
        textAlign:'center',
        color:GlobalStyles.colors.error500,
        margin:8
    },
    buttons:{
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center'
},
button:{
    minWidth:120,
    marginHorizontal:8,
},
})