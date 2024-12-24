import { useParams } from "react-router-dom";
import {useState} from "react";
import ProgressSpinner from "../../../../components/ProgressSpinner";

import { Pie, Bar, Line, Doughnut   } from 'react-chartjs-2';

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

    const [energyFromDate,setEnergyFromDate] = useState("");
    const [energyToDate,setEnergyToDate] = useState("");
    const [energyConsImei,setEnergyConsImei] = useState("");

    const [gasFromDate,setGasFromDate] = useState("");
    const [gasToDate,setGasToDate] = useState("");
    const [gasConsImei,setGasConsImei] = useState("");

    const [yearConst,setYearConst] = useState("");
    const [yearConsImei,setYearConsImei] = useState("");

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


    const [consSummaryData,setConstSummaryData] = useState({
        labels: ['January', 'February', 'March', 'April', 'May','June','July','August','September','October','November','December'], // X-axis labels
        datasets: [
          {
            label: 'Energy (kwh)',
            data: [65, 59, 80, 81, 56,40,65, 52, 84, 80, 55,43],
            backgroundColor: 'rgba(75, 192, 192, 0.6)', // Bar color
          },
          {
            label: 'Gas (kg)',
            data: [28, 48, 40, 19, 86,88,30, 43, 48, 15, 89,81],
            backgroundColor: 'rgba(255, 99, 132, 0.6)',
          }
        ],
      });

    const [stackedBarGraphOption,setStackedBarGraphOption] = useState({
        responsive: true,
        plugins: {
          legend: {
            position: 'top', // Position of the legend
          },
          title: {
            display: true,
            text: 'Multiple Bar Chart Example', // Chart title
          },
        },
        scales: {
          x: {
            stacked: false, // Set to true if you want the bars to stack
          },
          y: {
            beginAtZero: true,
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
                                            <h1 className="card-title">Realtime analysis</h1>
                                        </div>
                                        <div className="card-body" style={{width:'100%',height:'75vh',position:'relative'}}>
                                                
                                                <div style={{width:100,height:100,position:'absolute', bottom:'5%',left:'45%'}}>
                                                    <img style={{width:100,height:100}} src={require('../../../../assets/img/battery.png')} />
                                                </div>
                                                
                                                <div style={{width:100,height:100,position:'absolute', top:'40%',right:'10%'}}>
                                                    <img style={{width:100,height:100}} src={require('../../../../assets/img/generator.png')} />
                                                </div>

                                                <div style={{width:100,height:100,position:'absolute', top:'40%',left:'10%'}}>
                                                    <img style={{width:100,height:100}} src={require('../../../../assets/img/grid.jpeg')} />
                                                </div>

                                                <div style={{width:100,height:100,position:'absolute', top:'40%',left:'45%'}}>
                                                    <img style={{width:100,height:100}} src={require('../../../../assets/img/house.png')} />
                                                </div>

                                                <div style={{width:100,height:100,position:'absolute', top:'5%',left:'45%'}}>
                                                    <img style={{width:100,height:100}} src={require('../../../../assets/img/solar.jpeg')} />
                                                </div>
                                        </div>
                                    </div>
                              </div>

                              <div className="col-md-12 col-lg-12 col-sm-12">
                                    <div className="card">
                                        <div className="card-header">
                                            <h1 className="card-title">Energy Consumption</h1>
                                            <div className="row" style={{justifyContent:'flex-end'}}>

                                                <div className='col-md-3 col-lg-3 col-sm-12'>
                                                    <div class="input-group">
                                                        <span class="input-group-prepend">
                                                            <i class="input-group-text">Imei</i>
                                                        </span>
                                                        <input class="form-control" type="text" value={energyConsImei} onChange={(e)=>setEnergyConsImei(e.target.value)} />
                                                    </div>
                                                </div>

                                                <div className='col-md-3 col-lg-3 col-sm-12'>
                                                    <div class="input-group">
                                                        <span class="input-group-prepend">
                                                            <i class="input-group-text">From</i>
                                                        </span>
                                                        <input class="form-control" type="date" value={energyFromDate} onChange={(e)=>setEnergyFromDate(e.target.value)} />
                                                    </div>
                                                </div>

                                                <div className='col-md-3 col-lg-3 col-sm-12'>
                                                    <div class="input-group">
                                                        <span class="input-group-prepend">
                                                            <i class="input-group-text">To</i>
                                                        </span>
                                                        <input class="form-control" type="date" value={energyToDate} onChange={(e)=>setEnergyToDate(e.target.value)} />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="card-body" style={{width:'100%',overflowY: 'auto'}}>
                                              <div className="row">
                                                    <div className="col-md-4 col-lg-4 col-sm-12">
                                                            <Doughnut  data={energyConsPieData} options={pieOptions} />
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
                                                            <i class="input-group-text">Imei</i>
                                                        </span>
                                                        <input class="form-control" type="text" value={gasConsImei} onChange={(e)=>setGasConsImei(e.target.value)} />
                                                    </div>
                                                </div>

                                                <div className='col-md-3 col-lg-3 col-sm-12'>
                                                    <div class="input-group">
                                                        <span class="input-group-prepend">
                                                            <i class="input-group-text">From</i>
                                                        </span>
                                                        <input class="form-control" type="date" value={gasFromDate} onChange={(e)=>setGasFromDate(e.target.value)} />
                                                    </div>
                                                </div>

                                                <div className='col-md-3 col-lg-3 col-sm-12'>
                                                    <div class="input-group">
                                                        <span class="input-group-prepend">
                                                            <i class="input-group-text">To</i>
                                                        </span>
                                                        <input class="form-control" type="date" value={gasToDate} onChange={(e)=>setGasToDate(e.target.value)} />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="card-body" style={{width:'100%',height:'50vh',overflowY: 'auto'}}>
                                        </div>
                                    </div>
                              </div>


                              <div className="col-md-12 col-lg-12 col-sm-12">
                                    <div className="card">
                                        <div className="card-header">
                                            <h1 className="card-title">Summary For the year</h1>
                                            <div className="row" style={{justifyContent:'flex-end'}}>

                                                <div className='col-md-3 col-lg-3 col-sm-12'>
                                                    <div class="input-group">
                                                        <span class="input-group-prepend">
                                                            <i class="input-group-text">Imei</i>
                                                        </span>
                                                        <input class="form-control" type="text" value={yearConsImei} onChange={(e)=>setYearConsImei(e.target.value)} />
                                                    </div>
                                                </div>

                                                <div className='col-md-3 col-lg-3 col-sm-12'>
                                                    <div class="input-group">
                                                        <span class="input-group-prepend">
                                                            <i class="input-group-text">Year</i>
                                                        </span>
                                                        <input class="form-control" type="date" value={yearConst} onChange={(e)=>setYearConst(e.target.value)} />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="card-body" style={{width:'100%',overflowY: 'hidden',height:'50vh'}}>
                                             <div className="row">

                                                    <div className="col-md-6 col-lg-6 col-sm-12">
                                                          <Bar data={consSummaryData} options={stackedBarGraphOption} />
                                                    </div>
                                                    <div className="col-md-6 col-lg-6 col-sm-12" style={{height:'40vh',overflowY:'auto'}}>
                                                        <table className="table table-bordered">
                                                            <thead>
                                                                <tr>
                                                                    <th>Month</th>
                                                                    <th>Energy cons (kwh)</th>
                                                                    <th>Gas cons (kg)</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                <tr>
                                                                    <td>January</td>
                                                                    <td>0</td>
                                                                    <td>0</td>
                                                                </tr>
                                                                <tr>
                                                                    <td>February</td>
                                                                    <td>0</td>
                                                                    <td>0</td>
                                                                </tr>
                                                                <tr>
                                                                    <td>March</td>
                                                                    <td>0</td>
                                                                    <td>0</td>
                                                                </tr>
                                                                <tr>
                                                                    <td>April</td>
                                                                    <td>0</td>
                                                                    <td>0</td>
                                                                </tr>
                                                                <tr>
                                                                    <td>May</td>
                                                                    <td>0</td>
                                                                    <td>0</td>
                                                                </tr>
                                                                <tr>
                                                                    <td>June</td>
                                                                    <td>0</td>
                                                                    <td>0</td>
                                                                </tr>
                                                                <tr>
                                                                    <td>July</td>
                                                                    <td>0</td>
                                                                    <td>0</td>
                                                                </tr>
                                                                <tr>
                                                                    <td>August</td>
                                                                    <td>0</td>
                                                                    <td>0</td>
                                                                </tr>
                                                                <tr>
                                                                    <td>September</td>
                                                                    <td>0</td>
                                                                    <td>0</td>
                                                                </tr>
                                                                <tr>
                                                                    <td>October</td>
                                                                    <td>0</td>
                                                                    <td>0</td>
                                                                </tr>
                                                                <tr>
                                                                    <td>November</td>
                                                                    <td>0</td>
                                                                    <td>0</td>
                                                                </tr>
                                                                <tr>
                                                                    <td>December</td>
                                                                    <td>0</td>
                                                                    <td>0</td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </div>

                                             </div>
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