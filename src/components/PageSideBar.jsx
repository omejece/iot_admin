



import { useEffect, useRef, useState } from "react"
import sideData from "../data/sideData"
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../features/auth/authSlice";


const PageSideBar = (props)=>{
    const navigate = useNavigate();
    const sideBarRef = useRef(null);
    const [tempSideData, setTempSideData] = useState([]);
    const [selectedIdex,setSelectedIdex] = useState(1);
    const myDetail = useSelector(selectCurrentUser);
    const [openSideBar,setOpenSideBar] = useState(false);

    


    useEffect(()=>{
        document.addEventListener("mousedown",clickOutside);

        return ()=>{
            document.addEventListener("mousedown",clickOutside);
        }
    },[]);

    useEffect(()=>{
        setOpenSideBar(props.showSideBar);
    },[props.showSideBar]);

    useEffect(()=>{
    },[
        myDetail
    ]);
 
    useEffect(()=>{
        setTempSideData(sideData);
    },[

    ])


    const clickOutside = (e)=>{

         if(sideBarRef.current && !sideBarRef.current.contains(e.target)){
            setOpenSideBar(false);
            props.onClose();
         }
    }


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


    const navigateToPage = (index,path)=>{
        setSelectedIdex(index);
        navigate(path);
    }

    

     
    return (
        <>
            <div 
              ref={sideBarRef}
              className={props.showSideBar ? "side-bar-main sidebar-dark-primary" : "side-bar-main-hidden sidebar-dark-primary"}
            >
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
                                <li 
                                    className={selectedIdex == y ? "nav-item active-menu" : "nav-item"} 
                                    onClick={()=>navigateToPage(y,x.path)} 
                                    key={y}
                                >
                                    <a href="#" className="nav-link">
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
            </div>
        </>
    )
}

export default PageSideBar