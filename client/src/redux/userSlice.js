import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
    userId: null, // Store the user ID
    userDetails: null, // Store additional user details if needed
    userType: null, // To differentiate roles, if required
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.userId = action.payload.userId || state.userId;
            state.userDetails = action.payload.userDetails || state.userDetails;
            state.userType = action.payload.userType || state.userType;
        },
        setUserIdToRegister: (state, action) => {
            state.userId = action.payload;
        },
        clearUser: (state) => {
            state.userId = null;
            state.userDetails = null;
            state.userType = null;
        },
    },
});

export const { setUser, setUserIdToRegister, clearUser } = userSlice.actions;

export default userSlice.reducer;
