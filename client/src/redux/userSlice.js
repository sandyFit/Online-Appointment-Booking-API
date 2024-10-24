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

        clearUser: (state) => {
            state.user = null;
            
        },
    },
});

export const { setUser,  clearUser } = userSlice.actions;


// Export reducer to add to the Redux store
export default userSlice.reducer;
