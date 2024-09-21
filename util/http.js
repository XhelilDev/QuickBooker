import axios from 'axios';

const BACKEND_URL = '';

export async function storeBooking(bookingData) {
    
    const response=await axios.post(BACKEND_URL+'/bookings.json',bookingData);
    const id = response.data.name;
    return id;
}
export async function fetchBookings(){
    const response=await axios.get(BACKEND_URL+'/bookings.json');

    const bookings=[];

    for(const key in response.data){
        const bookingObj={
            id:key,
            date:new Date(response.data[key].date),
            description:response.data[key].description
        }

        bookings.push(bookingObj);
    }

    return bookings;

}
export  function updateBookings(id,bookingData){
    return axios.put(BACKEND_URL+`/bookings/${id}.json`,bookingData);

}

export async function deleteBooking(id){
        return axios.delete(BACKEND_URL+`/bookings/${id}.json`);
}
