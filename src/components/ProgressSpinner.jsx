

import "../assets/css/progress_spinner.css";

import { useEffect, useState } from 'react';

const ProgressSpinner = (props)=>{

    useEffect(()=>{},[
        props.show
    ]);

    return (
        <>
           {
              props.show
              ? <div class="preloader">
                    <div class="spinner"></div>
                </div> 
              :<></>
           }
      
        </>
    )
}

export default ProgressSpinner;