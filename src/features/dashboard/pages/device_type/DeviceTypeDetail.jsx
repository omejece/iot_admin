import { useParams } from "react-router-dom";
import "./device.css";
import {useState} from "react";
import ProgressSpinner from "../../../../components/ProgressSpinner";

const DeviceTypeDetail = (props)=>{
    const {imei} = useParams();
    const [showSpinner,setShowSpinner] = useState(false);


    return (
        <div className="deviceDetail">
           <ProgressSpinner  show={showSpinner} />
           <div className="deviceDetailContainer">
           </div>
        </div>
    );
}

export default DeviceTypeDetail;