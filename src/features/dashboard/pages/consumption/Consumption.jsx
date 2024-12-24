



import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Modal, Button, Form,Dropdown } from 'react-bootstrap';
import Swal from 'sweetalert2';
import ProgressSpinner from '../../../../components/ProgressSpinner';
import { useNavigate } from 'react-router-dom';

import { Pie, Bar, Line  } from 'react-chartjs-2';

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement
} from 'chart.js';

ChartJS.register(LineElement, PointElement, ArcElement,BarElement, CategoryScale, LinearScale, Tooltip, Legend);


const Consumption = (props)=>{
    
    const navigate = useNavigate();
    const blocks = useSelector((state)=>state.block.blocks);
    const [showSpinner,setShowSpinner] = useState(false);

    const [filterByBlock,setFilterByBlock] = useState("");
    const [filterByImei,setFilterByImei] = useState("");
    const [fromDate,setFromDate] = useState("");
    const [toDate,setToDate] = useState("");


    const [energyConsPieData,setEnergyConsPieData] = useState({
        labels: ['Gen', 'Grid', 'Inverter','Battery'],
        datasets: [
            {
            label: 'Energy Distribution',
            data: [300, 150, 100, 70],
            backgroundColor: [
                'maroon',
                'blue',
                'green',
                'yellow'
            ],
            borderColor: [
                'maroon',
                'blue',
                'green',
                'yellow'
            ],
            borderWidth: 1,
            },
        ],
    });


    // Define chart options
    const [pieOptions,setPieOptions] = useState({
        responsive: true,
        plugins: {
            legend: {
            position: 'top', // Position of the legend (top, bottom, left, right)
            },
            tooltip: {
            enabled: true, // Enable tooltips
            },
        },
    });

    


   
    useEffect(()=>{

    },[]); 

    useEffect(()=>{
    },[
        showSpinner,
        blocks
    ]);

    useEffect(()=>{
    },[
    ]);


    





    const handleFilterData = (value,filterType)=>{

    }


    

  

    return (
        <>
           <ProgressSpinner  show={showSpinner} />
           <div className="container-fluid">
                <div className="card">
                    <div className="card-header">
                         <div className='row'>
                             <h1 className="card-title">Consumption</h1>
                         </div>
                         <div className='row'>
                            <div className='col-md-3 col-lg-3 col-sm-12'>
                                <div class="input-group">
                                    <span class="input-group-prepend">
                                        <i class="input-group-text">Filter by Imei</i>
                                    </span>
                                    <input class="form-control" type="search" value={filterByImei} onChange={(e)=>handleFilterData(e.target.value,"imei")} />
                                </div>
                            </div>
                            <div className='col-md-3 col-lg-3 col-sm-12'>
                                <div class="input-group">
                                    <span class="input-group-prepend">
                                        <i class="input-group-text">Filter by Block</i>
                                    </span>
                                    <select class="form-control" value={filterByBlock} onChange={(e)=>handleFilterData(e.target.value,"block")} >
                                        <option value=""> All </option>
                                        {
                                            blocks?.length
                                            ? blocks.map((x,y)=>
                                              <option value={x.id}>
                                                  {x?.name}
                                              </option>
                                            )
                                            :<></>
                                        }
                                    </select>
                                </div>
                            </div>

                            <div className='col-md-3 col-lg-3 col-sm-12'>
                                <div class="input-group">
                                    <span class="input-group-prepend">
                                        <i class="input-group-text">From</i>
                                    </span>
                                    <input class="form-control" type="date" value={fromDate} onChange={(e)=>setFromDate(e.target.value)} />
                                </div>
                            </div>

                            <div className='col-md-3 col-lg-3 col-sm-12'>
                                <div class="input-group">
                                    <span class="input-group-prepend">
                                        <i class="input-group-text">To</i>
                                    </span>
                                    <input class="form-control" type="date" value={toDate} onChange={(e)=>setToDate(e.target.value)} />
                                </div>
                            </div>

                         </div>
                    </div>
                    <div className="card-body" style={{width:'100%',height:'78vh',overflowY: 'auto'}}>
                        <div className="row">
                             <div className="col-md-4 col-lg-4 col-sm-12">
                                  <Pie data={energyConsPieData} options={pieOptions} />
                             </div>
                             <div className="col-md-8 col-lg-8 col-sm-12">
                                <table className="table table-hashed">
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Date</th>
                                            <th>Imei</th>
                                            <th>Block</th>
                                            <th>Grid</th>
                                            <th>Gen</th>
                                            <th>Solar</th>
                                            <th>Battery</th>
                                            <th>Total</th>
                                        </tr>
                                    </thead>
                                    <tbody>

                                    </tbody>
                                </table>
                             </div>
                        </div>
                    </div>
                    <div className="card-footer"></div>
                </div>
           </div>

        </>
    );
}

export default Consumption;