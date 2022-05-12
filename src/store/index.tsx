import { configureStore } from "@reduxjs/toolkit";

import geolocationSlice from "./geolocation-slice";

const store = configureStore({
    reducer: {
        geolocation: geolocationSlice.reducer,
    }
});

export type RootState = ReturnType<typeof store.getState>
export default store;
