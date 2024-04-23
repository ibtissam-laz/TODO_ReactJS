import { createSlice } from '@reduxjs/toolkit'

export const authSlice = createSlice({
    name: "auth",
    initialState: {
        isLoggedIn: false,
    },
    reducers: {
        login(state) {
        state.isLoggedIn = true;
        },
        logout(state) {
        state.isLoggedIn = false;
        },
    },
});
export const { login, logout } = authSlice.actions;
export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;

export const userSlice = createSlice({
    name: "lUser",
    initialState: {
        email: null,
        pass: null,
    },
    reducers: {
        loggedIn(state, user) {
        state.email = user.payload.email;
        state.pass = user.payload.pass;
        },
        loggedOut(state) {
        state.email = null;
        state.pass = null;
        },
    },
});

export const { loggedIn, loggedOut } = userSlice.actions;
export const selectUser = (state) => state.lUser;
