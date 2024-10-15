import { createSlice } from '@reduxjs/toolkit';

// In your Redux slice
export const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: null,
        userIdToRegister: null, // Track user ID for registration
    },
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        },
        setUserIdToRegister: (state, action) => {
            state.userIdToRegister = action.payload; // Set user ID after user registration
        },
        clearUser: (state) => {
            state.user = null;
            state.userIdToRegister = null;
        },
    },
});

export const { setUser, setUserIdToRegister, clearUser } = userSlice.actions;


// Export reducer to add to the Redux store
export default userSlice.reducer;
