


import { createSlice } from "@reduxjs/toolkit";

const devicesTypeStoreSlice = createSlice({
    name:'devicesTypeStore',
    initialState:{deviceTypeStores:[],deviceTypeStore:null},
    reducers: {
         setDeviceTypeStores: (state,actions)=>{
             state.deviceTypeStores = actions.payload;
         },

         setDeviceTypeStore: (state,actions)=>{
            state.deviceTypeStore = actions.payload;
         }
    }
});

export const {setDeviceTypeStore,setDeviceTypeStores} = devicesTypeStoreSlice.actions;
export default devicesTypeStoreSlice.reducer;