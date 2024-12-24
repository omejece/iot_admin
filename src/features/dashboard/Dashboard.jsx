
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

    const [sideBarWidth,setSideBarWidth] = useState("15%");

    useEffect(()=>{
        refetchBlock();
        refetchMerchant();
    },[]);

    useEffect(()=>{},[
      sideBarWidth
    ]);

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

    const handleControlTab = ()=>{
         if(sideBarWidth == "15%"){
            setSideBarWidth("0%");
         }
         else{
            setSideBarWidth("15%");
         }
    }

     return (
        <div className="wrapper" >
            <PageNavBar onControlTab={handleControlTab} />
            <PageSideBar width={sideBarWidth} />
            
            <div class="content-wrapper" style={{paddingLeft:"0%",padding:'5px' }}>
               <Outlet />
            </div>
        </div>
     )
}

export default Dashboard;