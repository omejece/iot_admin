
import "../../assets/plugins/fontawesome-free/css/all.min.css";
import "../../assets/plugins/overlayScrollbars/css/OverlayScrollbars.min.css";
import "../../assets/dist/css/adminlte.min.css";
import "../../index.css";
import { useEffect, useState } from 'react';
import PageNavBar from "../../components/PageNavBar";
import PageSideBar from "../../components/PageSideBar";
import { Outlet } from "react-router-dom";
import { useGetBlocksQuery } from "./pages/blocks/blockApiSlice";
import { useGetMerchantsQuery } from "./pages/merchants/merchantApiSlice";
import { useDispatch } from "react-redux";
import { setBlocks } from "./pages/blocks/blockSlice";
import { setMerchants } from "./pages/merchants/merchantSlice";


const Dashboard = (props)=>{
    const dispatch = useDispatch();
    const {data: allBlocks, isLoading: isBlockLoading, isSuccess: isBlockLoaded, refetch: refetchBlock } = useGetBlocksQuery();
    const {data: allMerchants, isLoading: isMerchantLoading, isSuccess: isMerchantLoaded, refetch: refetchMerchant } = useGetMerchantsQuery();

    useEffect(()=>{
        refetchBlock();
        refetchMerchant();
    },[]);

    useEffect(()=>{
      if(isMerchantLoaded){
         loadMerchantData();
      }
      
      if(isBlockLoaded){
         loadBlockData();
      }

    },[
      isMerchantLoaded,
      isBlockLoaded,
      allBlocks,
      allMerchants
    ])


    const loadMerchantData = ()=>{
      dispatch(setMerchants(allMerchants.data));
    }

    const loadBlockData = ()=>{
        dispatch(setBlocks(allBlocks.data));
    }

     return (
        <div className="wrapper">
            <PageNavBar />
            <PageSideBar />
            
            <div class="content-wrapper" style={{padding:'20px'}}>
               <Outlet />
            </div>
        </div>
     )
}

export default Dashboard;