import { useParams } from "react-router-dom";
import {useState} from "react";
import ProgressSpinner from "../../../../components/ProgressSpinner";

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


const BlockDetail = (props)=>{
    const {id} = useParams();
    const [showSpinner,setShowSpinner] = useState(false);
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

    return (
        <>
           <ProgressSpinner  show={showSpinner} />
           <div className="container-fluid">
                <div className="card">
                    <div className="card-header">
                         <h1 className="card-title">Block Detail</h1>
                    </div>
                    <div className="card-body" style={{width:'100%',height:'85vh',overflowY: 'auto'}}>
                    
                          <div className="row">

                              <div className="col-md-12 col-lg-12 col-sm-12">
                                    <div className="card">
                                        <div className="card-header">
                                            <h1 className="card-title">Basic Block Info</h1>
                                        </div>
                                        <div className="card-body" style={{width:'100%'}}>
                                            <div className="row">
                                                <div className="col-md-4 col-lg-4 col-sm-12">
                                                    <iframe 
                                                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2990.274257380938!2d-70.56068388481569!3d41.45496659976631!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89e52963ac45bbcb%3A0xf05e8d125e82af10!2sDos%20Mas!5e0!3m2!1sen!2sus!4v1671220374408!5m2!1sen!2sus" 
                                                        style={{border:0,width:'100%',height:450}} 
                                                        allowfullscreen="" 
                                                        loading="lazy" 
                                                        referrerpolicy="no-referrer-when-downgrade"
                                                    >

                                                    </iframe>
                                                </div>
                                                <div className="col-md-8 col-lg-8 col-sm-12" style={{boxShadow:'1px',height: 450,padding:20,paddingTop: 0}}>
                                                    <table className="table table-bordered">
                                                        <thead>
                                                            <tr>
                                                                <th style={{width:'20%'}}>Name</th>
                                                                <th style={{width:'80%'}}></th>
                                                            </tr>
                                                            <tr>
                                                                <th style={{width:'20%'}}>Reference</th>
                                                                <th style={{width:'80%'}}></th>
                                                            </tr>
                                                            <tr>
                                                                <th style={{width:'20%'}}>Capacity</th>
                                                                <th style={{width:'80%'}}></th>
                                                            </tr>
                                                            <tr>
                                                                <th style={{width:'20%'}}>Address</th>
                                                                <th style={{width:'80%'}}></th>
                                                            </tr>
                                                            <tr>
                                                                <th style={{width:'20%'}}>Merchant</th>
                                                                <th style={{width:'80%'}}></th>
                                                            </tr>
                                                            <tr>
                                                                <th style={{width:'20%'}}>Total Device</th>
                                                                <th style={{width:'80%'}}></th>
                                                            </tr>
                                                            <tr>
                                                                <th style={{width:'20%'}}>Percentage Loading</th>
                                                                <th style={{width:'80%'}}></th>
                                                            </tr>
                                                            <tr>
                                                                <th style={{width:'20%'}}>Energy Source</th>
                                                                <th style={{width:'80%'}}></th>
                                                            </tr>
                                                            <tr>
                                                                <th style={{width:'20%'}}>Peak Load</th>
                                                                <th style={{width:'80%'}}></th>
                                                            </tr>
                                                        </thead>
                                                    </table>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                              </div>
                              <hr />

                              <div className="col-md-12 col-lg-12 col-sm-12">
                                    <div className="card">
                                        <div className="card-header">
                                            <h1 className="card-title">Energy Consumption</h1>
                                            <div className="row" style={{justifyContent:'flex-end'}}>
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
                                        <div className="card-body" style={{width:'100%',overflowY: 'auto'}}>
                                              <div className="row">
                                                    <div className="col-md-4 col-lg-4 col-sm-12">
                                                            <Pie data={energyConsPieData} options={pieOptions} />
                                                    </div>
                                                    <div className="col-md-8 col-lg-8 col-sm-12">
                                                            <table className="table table-bordered">
                                                                <thead>
                                                                    <tr>
                                                                        <th>#</th>
                                                                        <th>Date</th>
                                                                        <th>Imei</th>
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
                                    </div>
                              </div>


                              <div className="col-md-12 col-lg-12 col-sm-12">
                                    <div className="card">
                                        <div className="card-header">
                                            <h1 className="card-title">Kike Cooking Gas Consumption (kg)</h1>
                                            <div className="row" style={{justifyContent:'flex-end'}}>
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
                                        <div className="card-body" style={{width:'100%',height:'50vh',overflowY: 'auto'}}>
                                        </div>
                                    </div>
                              </div>



                          </div>
                    
                    </div> 
                </div>  
            </div>
        </>
    );
}

export default BlockDetail;