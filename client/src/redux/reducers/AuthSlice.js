import { createSlice } from "@reduxjs/toolkit"

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        login: {
            currentUser: null,
            isLoading: false,
            err: false,
        },
        register: {
            isLoading: false,
            err: false,
            success: false
        },
    },
    reducers: {
        loginStart: (state) => {
            state.login.isLoading = true;
        },
        loginSuccess: (state, action) => {
            state.login.isLoading = false;
            state.login.currentUser = action.payload;
            state.login.err = false;
        },
        loginFailed: (state) => {
            state.login.isLoading = false;
            state.login.err = true;
        },
        registerStart: (state) => {
            state.register.isLoading = true;
        },
        registerSuccess: (state) => {
            state.register.isLoading = false;
            state.register.err = false;
            state.register.success = true;
        },
        registerFailed: (state) => {
            state.register.isLoading = false;
            state.register.err = true;
        },
        logoutStart: (state) => {
            state.login.isLoading = true;
        },
        logoutSuccess: (state) => {
            state.login.isLoading = false;
            state.login.err = false;
            state.login.currentUser= null;
        },
        logoutFailed: (state) => {
            state.login.isLoading = false;
            state.login.err = true;
        },
    }
});

export const { loginStart, loginSuccess,loginFailed, 
    registerStart,registerFailed, registerSuccess,
    logoutStart,logoutSussess,logoutFailed } = authSlice.actions;
export default authSlice.reducer;

