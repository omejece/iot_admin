import { useParams } from "react-router-dom";
import {useState} from "react";
import ProgressSpinner from "../../../../components/ProgressSpinner";

const DeviceDetail = (props)=>{
    const {imei} = useParams();
    const [showSpinner,setShowSpinner] = useState(false);

    return (
        <>
           <ProgressSpinner  show={showSpinner} />
           <div className="container-fluid">
                <div className="card">
                    <div className="card-header">
                         <h1 className="card-title">Device Detail</h1>
                    </div>
                    <div className="card-body" style={{width:'100%',height:'78vh',overflowY: 'auto'}}></div> 
                </div>  
            </div>
        </>
    );
}

export default DeviceDetail;