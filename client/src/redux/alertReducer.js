import { createSlice } from '@reduxjs/toolkit';

export const alertsSlice = createSlice({
    name: "alerts",
    initialState: {
        loading: false
    },
    reducers: {
        showLoading: (state) => {
            state.loading = true;
        },
        hideLoading: (state) => {
            state.loading = false;
        }
    }
});

// Corrected: it should be `actions` not `action`
const { showLoading, hideLoading } = alertsSlice.actions;

export { showLoading, hideLoading };
