


import { createSlice } from "@reduxjs/toolkit";

const merchantSlice = createSlice({
    name:'merchant',
    initialState:{merchants:[],merchant:null},
    reducers: {
         setMerchants: (state,actions)=>{
             state.merchants = actions.payload;
         },

         setMerchant: (state,actions)=>{
            state.merchant = actions.payload;
         }
    }
});

export const {setMerchant,setMerchants} = merchantSlice.actions;
export default merchantSlice.reducer;
export const selectedMerchant = (state)=> state.merchants;