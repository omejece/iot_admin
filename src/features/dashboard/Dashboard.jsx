
import "../../assets/plugins/fontawesome-free/css/all.min.css";
import "../../assets/plugins/overlayScrollbars/css/OverlayScrollbars.min.css";
import "../../assets/dist/css/adminlte.min.css";
import "../../index.css";
import PageNavBar from "../../components/PageNavBar";
import PageSideBar from "../../components/PageSideBar";
import { Outlet } from "react-router-dom";

const Dashboard = (props)=>{
     
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