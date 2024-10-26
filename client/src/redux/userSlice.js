import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const registerUser = createAsyncThunk('user/register', async (userData) => {
    const response = await axios.post('http://localhost:5050/users/register', userData);
    return response.data;
});

export const loginUser = createAsyncThunk('user/login', async (loginData) => {
    const response = await axios.post('http://localhost:5050/users/login', loginData);
    return response.data;
});

const userSlice = createSlice({
    name: 'user',
    initialState: { user: null, loading: false, error: null },
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload; // Add this line
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.pending, (state) => { state.loading = true; })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(loginUser.pending, (state) => { state.loading = true; })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export const { setUser } = userSlice.actions; // Export setUser
export default userSlice.reducer;
