


import { createSlice } from "@reduxjs/toolkit";

const devicesStoreSlice = createSlice({
    name:'devicesStore',
    initialState: {
        deviceStores: [],
        deviceStore: null,
        deviceTypes: [
            "",
            "Prepaid meter",
            "Smart home",
            "Kike meter",
            "Gen starter",
            "Gateway",
            "Auto bidder",
            "Inverter",
            "Auto gen",
            "Obidder Meter"
        ]
    },
    reducers: {
        setDeviceStores: (state, actions) => {
            state.deviceStores = actions.payload;
        },

        setDeviceStore: (state, actions) => {
        state.deviceStore = actions.payload;
        }
    }
});

export const {setDeviceStore,setDeviceStores} = devicesStoreSlice.actions;
export default devicesStoreSlice.reducer;
export const delectedDeviceStore = (state)=> state.deviceStores;