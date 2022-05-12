import { createSlice } from '@reduxjs/toolkit';

const geolocationSlice = createSlice({
    name: 'geolocation',
    initialState: {
        latitude: 39.78109,
        longitude: -8.79604
    },
    reducers: {
        updateGeolocation(state, action) {
            state.latitude = action.payload.latitude;
            state.longitude = action.payload.longitude;
        }
    }
});

export const geolocationActions = geolocationSlice.actions;

export default geolocationSlice;