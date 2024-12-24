



import { useEffect, useState } from "react"
import sideData from "../data/sideData"
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../features/auth/authSlice";


const PageSideBar = (props)=>{
    const navigate = useNavigate();
    const [tempSideData, setTempSideData] = useState([]);
    const myDetail = useSelector(selectCurrentUser);

    useEffect(()=>{
    },[
        myDetail
    ]);
 
    useEffect(()=>{
        setTempSideData(sideData);
    },[

    ])


    const handleSearchSideBar = (value)=>{
        if(value.trim() != ""){
            var searchedData = sideData.filter((x)=>{
                if(x.name.toLocaleLowerCase().includes(value.toLocaleLowerCase())){
                    return true;
                }
                else{
                    return false;
                }
            });
            setTempSideData(searchedData);
            return;
        }
        setTempSideData(sideData);
    }
     
    return (
        <>
            <aside className="main-sidebar sidebar-dark-primary elevation-4" style={{width: props.width}}>
                <a href="index3.html" className="brand-link">
                <img src={require("../assets/dist/img/AdminLTELogo.png")} alt="AdminLTE Logo" className="brand-image img-circle elevation-3" style={{opacity: .8}} />
                <span className="brand-text font-weight-light">IoT Admin</span>
                </a>

                <div className="sidebar">
                <div className="user-panel mt-3 pb-3 mb-3 d-flex">
                    <div className="image">
                    <img src={require("../assets/dist/img/user2-160x160.jpg")} className="img-circle elevation-2" alt="User Image" />
                    </div>
                    <div className="info">
                    <a href="#" className="d-block">{myDetail?.email}</a>
                    </div>
                </div>

                <div className="form-inline">
                    <div className="input-group" data-widget="sidebar-search">
                        <input className="form-control form-control-sidebar" type="search" placeholder="Search" aria-label="Search" onChange={(e)=>handleSearchSideBar(e.target.value)}  />
                    </div>
                </div>

                <nav className="mt-2">
                    <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
                        {
                            tempSideData.length 
                            ? tempSideData.map((x,y)=>                  
                                <li className="nav-item" key={y}>
                                    <a href="#" onClick={()=>navigate(x.path)} className="nav-link">
                                        <i className={"nav-icon "+x.icon}></i>
                                        <p>
                                            {x.name}
                                        </p>
                                    </a>
                                </li>
                            )
                            :<></>
                        }                    
                    </ul>
                </nav>
                </div>
            </aside>
        </>
    )
}

export default PageSideBar