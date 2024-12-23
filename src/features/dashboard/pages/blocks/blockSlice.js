


import { createSlice } from "@reduxjs/toolkit";

const blockSlice = createSlice({
    name:'block',
    initialState:{blocks:[],block:null},
    reducers: {
         setBlocks: (state,actions)=>{
             state.blocks = actions.payload;
         },

         setBlock: (state,actions)=>{
            state.block = actions.payload;
         }
    }
});

export const {setBlock,setBlocks} = blockSlice.actions;
export default blockSlice.reducer;
export const selectedBlock = (state)=> state.blocks;