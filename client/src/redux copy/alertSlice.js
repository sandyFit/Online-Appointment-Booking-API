import { createSlice } from '@reduxjs/toolkit';

export const alertSlice = createSlice({
    name: "alerts",
    initialState: {
        loading: false,
        error: null, // Additional state for error handling
        success: null // Additional state for success messages
    },
    reducers: {
        showLoading: (state) => {
            state.loading = true;
            state.error = null; // Clear error when loading starts
            state.success = null; // Clear success message
        },
        hideLoading: (state) => {
            state.loading = false;
        },
        setError: (state, action) => {
            state.error = action.payload;
            state.loading = false; // Stop loading on error
        },
        setSuccess: (state, action) => {
            state.success = action.payload;
            state.loading = false; // Stop loading on success
        },
    }
});

// Export actions for use in components
const { showLoading, hideLoading, setError, setSuccess } = alertSlice.actions;

export { showLoading, hideLoading, setError, setSuccess };

// Selector for accessing loading state
export const selectLoading = (state) => state.alerts.loading;
export const selectError = (state) => state.alerts.error;
export const selectSuccess = (state) => state.alerts.success;
