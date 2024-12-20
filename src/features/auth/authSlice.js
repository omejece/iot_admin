
import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: 'auth',
    initialState: {user: null, accessToken: null,refresh:null, isLoggedIn: false},
    reducers:{
        setCredentials: (state,action)=>{
             const payload = action.payload;
             localStorage.setItem('user', JSON.stringify(payload.user));
             localStorage.setItem('token', payload.token);
             localStorage.setItem('refresh', payload.refresh);
             state.user = payload.user;
             state.accessToken = payload.token;
             state.refresh = payload.refresh;
             state.isLoggedIn = true;
        },
        refreshCredential:  (state,action)=>{
            state.user =  localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;
            state.accessToken =  localStorage.getItem('token');
            state.refresh =  localStorage.getItem('refresh');
            state.isLoggedIn =  localStorage.getItem('token') ? true : false;
        },
        logOut: (state,action)=>{
            state.accessToken = null;
            localStorage.setItem('token', null);
            localStorage.setItem('refresh', null);
            localStorage.setItem('user', null);
            state.isLoggedIn = false;
            state.refresh = null;
            state.user = null;
            window.location.href = "/";
        }
    },
});

export const {setCredentials,logOut,refreshCredential} = authSlice.actions;
export default authSlice.reducer;
export const selectCurrentUser = (state)=> localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;
export const selectCurrentAccessToken = (state)=> localStorage.getItem('token');

