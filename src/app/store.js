import { configureStore } from "@reduxjs/toolkit";
import hotelReducer from "../features/hotels/hotelSlice";
const savedHostels = JSON.parse(
    localStorage.getItem("hotels")
) || [];
export const store = configureStore({
    reducer: {
        hotels: hotelReducer,
    },
    preloadedState: {
        hotels: {
            hotels : savedHostels,
        },
    },
});
store.subscribe (() => {
    const hotels = store.getState().hotels.hotels;
    localStorage.setItem("hotels" , JSON.stringify(hotels));
});

