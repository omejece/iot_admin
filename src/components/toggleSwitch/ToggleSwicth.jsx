
import { useRef } from "react";
import "./toggleSwitch.css";


const ToggleSwitch = (props)=>{
    const inputElement = useRef();

    const handleToggle = ()=>{
        if(inputElement.current.checked){
            inputElement.current.checked = false;
            props.onSwitchOff();
        }
        else {
            inputElement.current.checked = true;
            props.onSwitchOn();
        }
    }

    return (
        <div className="toggleSwitch" onClick={()=>handleToggle()} style={{width:props.width}}>
             <input ref={inputElement} type="checkbox" />
             <span className="slider"></span>
        </div>
    );
}


export default ToggleSwitch;