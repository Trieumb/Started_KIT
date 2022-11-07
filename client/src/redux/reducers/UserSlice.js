import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: 'user',
    initialState:{
        users:{
            allUsers: null,
            isLoading: false,
            err: false
        },
    },
    reducers: {
        getUserStart: (state) => {
            state.users.isLoading = true;
        },
        getUserSuccess: (state, action) => {
            state.users.isLoading = false;
            state.users.allUsers = action.payload;
        },
        getUserFailed: (state) => {
            state.users.isLoading = false;
            state.users.err = true;
        },
        deleteUserStart: (state) => {
            state.users.isLoading = true;
        },
        deleteUserSuccess: (state, action) => {
            state.users.isLoading = false;
            state.users.allUsers = action.payload;
        },
        deleteUserFailed: (state) => {
            state.users.isLoading = false;
            state.users.err = true;
        },
    }
})

export const { getUserStart,getUserSuccess,getUserFailed,
    deleteUserStart,deleteUserSuccess, deleteUserFailed } = userSlice.actions;
export default userSlice.reducer;