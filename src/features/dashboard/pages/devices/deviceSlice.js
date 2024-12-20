


import { createSlice } from "@reduxjs/toolkit";

const deviceSlice = createSlice({
    name:'device',
    initialState:{devices:[],device:null},
    reducers: {
         setDevices: (state,actions)=>{
             state.devices = actions.payload;
         },

         setDevice: (state,actions)=>{
            state.device = actions.payload;
         }
    }
});

export const {setDevice,setDevices} = deviceSlice.actions;
export default deviceSlice.reducer;
export const delectedDevice = (state)=> state.device;