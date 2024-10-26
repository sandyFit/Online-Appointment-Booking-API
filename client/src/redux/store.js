import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import alertReducer from './alertSlice';
import doctorReducer from './doctorSlice'; // Import doctor reducer

const store = configureStore({
    reducer: {
        user: userReducer,
        alerts: alertReducer,
        doctor: doctorReducer, // Add doctor slice to store
    },
});

export default store;
