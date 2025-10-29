import {createApi,fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import { setCredentials, logOut ,selectCurrentAccessToken} from '../features/auth/authSlice';
import {jwtDecode } from 'jwt-decode';

//const baseUrl = "http://66.29.130.36:5016/api/v2";//"http://localhost:4000";
const baseUrl = "https://iot2.owattspay.net/api/v2";//"http://localhost:4000";

const baseQuery = fetchBaseQuery({
    baseUrl: baseUrl,
    //credentials: 'include',
    prepareHeaders: (async (headers,{getState})=>{
        const token = await localStorage.getItem('token');//getState().auth.token;
        if(token){
           headers.set("Authorization",`Bearer ${token}`)
        }
        headers.set('Content-Type', 'application/json');
        return headers;
    })
});

const baseQueryWithReauth = async (args,api,extraOptions)=>{
     let result = await baseQuery(args,api,extraOptions);

     if(result?.error?.status === 403 || result?.error?.status === 401){
         const refresh = await localStorage.getItem('refresh');//api.getState().auth.user;
         const myRefreshArg = {
            url: '/user/token/refresh/',
            method: 'POST',
            body: {
                refresh: refresh
            }
         };
         
         const refreshResult = await baseQuery(myRefreshArg,api,extraOptions);
         if(refreshResult?.data){
            if(refreshResult.status === 200 || refreshResult.status === 201 || refreshResult.status === 204){
                const myResult = refreshResult.data;
                const user = jwtDecode (myResult.access);
                api.dispatch(setCredentials({token:myResult.access,refresh:myResult.refresh,user:user}));
                // retry the originl request with new access token
                result = await baseQuery(args,api,extraOptions);
            }
            else{
                //api.dispatch(logOut());
            }
         }
         else{
            api.dispatch(logOut());
         }
     }
     return result;
}


export const apiSlice = createApi({
    baseQuery: baseQueryWithReauth,
    endpoints: builder =>({})
});