


import { createSlice } from "@reduxjs/toolkit";

const energySourceSlice = createSlice({
    name:'energySource',
    initialState:{sources:["","Grid","Gen","Solar","Battery"]},
    reducers: {
         setSources: (state,actions)=>{
             state.sources = actions.payload;
         }
    }
});

export const {setSources} = energySourceSlice.actions;
export default energySourceSlice.reducer;