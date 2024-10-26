import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const registerDoctor = createAsyncThunk('doctor/registerDoctor', async (doctorData, { getState }) => {
    const { auth: { token } } = getState();
    const config = { headers: { Authorization: `Bearer ${token}` } };
    const response = await axios.post('http://localhost:5050/users/register-doctor', doctorData, config);
    return response.data;
});

const doctorSlice = createSlice({
    name: 'doctor',
    initialState: { doctor: null, loading: false, error: null },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(registerDoctor.pending, (state) => { state.loading = true; })
            .addCase(registerDoctor.fulfilled, (state, action) => {
                state.loading = false;
                state.doctor = action.payload;
            })
            .addCase(registerDoctor.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export default doctorSlice.reducer;
