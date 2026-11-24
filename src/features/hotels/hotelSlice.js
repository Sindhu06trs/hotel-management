import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    hotels: [],
};
const hotelSlice = createSlice({
    name: "hotels",
    initialState,
    reducers: {
        addHotel:(state , action) => {
            state.hotels.push(action.payload);
        },
        editHotel: (state , action) => {
            const index = state.hotels.findIndex(
                (hotel) => hotel.id === action.payload.id
            );
            if(index !== -1){
                state.hotels[index] = action.payload;
            }
        },
        deleteHotel: (state , action) => {
            state.hotels = state.hotels.filter(
                (hotel) => hotel.id !== action.payload
            );
        },
    },
});
export const {addHotel , editHotel , deleteHotel} = hotelSlice.actions;
export default hotelSlice.reducer;


