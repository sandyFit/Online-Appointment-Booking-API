import { createSlice } from '@reduxjs/toolkit';

// Initial state of the user
const initialState = {
    user: null, // Default state is no user
};

// Create user slice
export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        // Action to set the user
        setUser: (state, action) => {
            state.user = action.payload;
        },
        // Optional: Action to clear the user (e.g., on logout)
        clearUser: (state) => {
            state.user = null;
        }
    },
});

// Export actions so they can be dispatched in components
export const { setUser, clearUser } = userSlice.actions;

// Export reducer to add to the Redux store
export default userSlice.reducer;
