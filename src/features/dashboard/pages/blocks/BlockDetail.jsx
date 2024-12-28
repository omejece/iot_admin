import { useNavigate, useParams } from "react-router-dom";
import {useEffect, useState} from "react";
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
import { useGetBlockQuery, useBlockDevicesQuery } from "./blockApiSlice";
import { useSelector } from "react-redux";



ChartJS.register(LineElement, PointElement, ArcElement,BarElement, CategoryScale, LinearScale, Tooltip, Legend);


const BlockDetail = (props)=>{
    const {reference} = useParams();
    const energySource = useSelector((state)=>state.energySource.sources);
    const deviceTypes = useSelector((state)=>state.device.deviceTypes);
    const {data: getBlockDetail, isLoading: isBlockLoaded, isError: isBlockError, refetch: refetchBlock} = useGetBlockQuery({reference: reference});
    const {data: getBlockDevices, isLoading: isBlockDevicesLoaded, isError: isBlockDevicesError, refetch: refetchBlockDevices} = useBlockDevicesQuery({reference: reference});
    
    const navigate = useNavigate();

    const [showSpinner,setShowSpinner] = useState(false);

    const [myBlockDetail, setMyBlockDetail] = useState();

    const [energyFromDate,setEnergyFromDate] = useState("");
    const [energyToDate,setEnergyToDate] = useState("");
    const [energyConsImei,setEnergyConsImei] = useState("");

    const [gasFromDate,setGasFromDate] = useState("");
    const [gasToDate,setGasToDate] = useState("");
    const [gasConsImei,setGasConsImei] = useState("");

    const [yearConst,setYearConst] = useState("");
    const [yearConsImei,setYearConsImei] = useState("");

    const [blockDevicesImei,setBlockDevicesImei] = useState("");
    const [blockDevices,setBlockDevices] = useState("");

    const [deviceTypeCount,setDeviceTypeCount] = useState([0,0,0,0,0,0,0,0,0,0])



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


    const [blockDeviceDistributionData,setBlockDeviceDistributionData] = useState({
        labels: ["Prepaid meter","Smart home","Kike meter","Gen starter","Gateway","Auto bidder","Inverter","Auto gen","Obidder Meter"], // X-axis labels
        datasets: [
          {
            label: 'Device Distribution',
            data: deviceTypeCount,
            backgroundColor: 'rgba(75, 192, 192, 0.6)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
          }
        ],
    });

    const [blockDeviceDistributionOption,setBlockDeviceDistributionOption] = useState({
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
        indexAxis: 'y', // Change the axis to make it horizontal
        scales: {
          x: {
            stacked: false, // Set to true if you want the bars to stack
          },
          y: {
            beginAtZero: true,
          },
        },
    });


    const [gasConsProfileData,setGasConsProfileData] = useState({
        labels: ["January", "February", "March", "April", "May", "June","July","August","September","October","November","December"],
        datasets: [
          {
            label: "Cooking Hours",
            data: [30, 45, 28, 80, 99, 43],
            borderColor: "rgba(75, 192, 192, 1)",
            backgroundColor: "rgba(75, 192, 192, 0.2)",
            tension: 0.4,
            pointBackgroundColor: "rgba(75, 192, 192, 1)",
          },
          {
            label: "Gas Consumed",
            data: [40, 55, 38, 70, 120, 60],
            borderColor: "rgba(255, 99, 132, 1)",
            backgroundColor: "rgba(255, 99, 132, 0.2)",
            tension: 0.4,
            pointBackgroundColor: "rgba(255, 99, 132, 1)",
          },
        ],
      });
    
      const [gasConsProfileOption,setGasConsProfileOption] = useState({
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: "top",
          },
          tooltip: {
            enabled: true,
          },
        },
        scales: {
          x: {
            beginAtZero: true,
          },
          y: {
            beginAtZero: true,
          },
        },
      });


      useEffect(()=>{
        if(reference){
            refetchBlock();
            refetchBlockDevices();
            getDeviceTypeQuantity();
        }
    },[
        reference
    ]);
    
    useEffect(()=>{},[blockDeviceDistributionData,blockDevices]);

    useEffect(()=>{
         
         const interval = setInterval(()=>{
            refetchBlock();
            refetchBlockDevices();
            getDeviceTypeQuantity();
         },10000);


         // clear when unmouted

         return ()=> clearInterval(interval);

    },[]);

    useEffect(()=>{
         if(getBlockDetail){
            setMyBlockDetail(getBlockDetail.data);
         }

         if(getBlockDevices){
            setBlockDevices(getBlockDevices.data)
         }
    },[
        getBlockDetail,
        getBlockDevices,
    ]);


    const getDeviceTypeQuantity = ()=>{
        var quantity = 0;
        var tempDeviceTypeCount = [0,0,10,0,0,0,0,0,0];
        console.log(blockDevices);
        if(blockDevices?.length){
            blockDevices.forEach(x=>{
                 tempDeviceTypeCount[x.device_type - 1] += 1;
            });

            setDeviceTypeCount(tempDeviceTypeCount);
        }

        console.log(tempDeviceTypeCount);
        
        setBlockDeviceDistributionData(
            {
                labels: ["Prepaid meter","Smart home","Kike meter","Gen starter","Gateway","Auto bidder","Inverter","Auto gen","Obidder Meter"], // X-axis labels
                datasets: [
                  {
                    label: 'Device Distribution',
                    data: tempDeviceTypeCount,
                    backgroundColor: 'rgba(75, 192, 192, 0.6)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1,
                  }
                ],
            }
        );
    }



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
                                                    <iframe src={`https://maps.google.com/maps?q='+${myBlockDetail?.latitude ? myBlockDetail?.latitude : 0}+','+${myBlockDetail?.longitude ? myBlockDetail?.longitude : 0}+'&hl=es&z=14&amp;output=embed`}
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
                                                                <th style={{width:'80%'}}>{myBlockDetail?.name}</th>
                                                            </tr>
                                                            <tr>
                                                                <th style={{width:'20%'}}>Reference</th>
                                                                <th style={{width:'80%'}}>{myBlockDetail?.reference}</th>
                                                            </tr>
                                                            <tr>
                                                                <th style={{width:'20%'}}>Capacity</th>
                                                                <th style={{width:'80%'}}>{myBlockDetail?.capacity}</th>
                                                            </tr>
                                                            <tr>
                                                                <th style={{width:'20%'}}>Address</th>
                                                                <th style={{width:'80%'}}>{myBlockDetail?.address}</th>
                                                            </tr>
                                    
                                                            <tr>
                                                                <th style={{width:'20%'}}>Merchant</th>
                                                                <th style={{width:'80%'}}>{myBlockDetail?.merchant?.name}</th>
                                                            </tr>
                                                            <tr>
                                                                <th style={{width:'20%'}}>Total Device</th>
                                                                <th style={{width:'80%'}}>
                                                                    {blockDevices?.length ? blockDevices?.length+" Devices" : "0 Devices"} 
                                                                </th>
                                                            </tr>
                                                            <tr>
                                                                <th style={{width:'20%'}}>Percentage Loading</th>
                                                                <th style={{width:'80%'}}></th>
                                                            </tr>
                                                            <tr>
                                                                <th style={{width:'20%'}}>Energy Source</th>
                                                                <th style={{width:'80%'}}>{energySource[myBlockDetail?.data?.source]}</th>
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
                                                
                                                {
                                                    myBlockDetail?.data?.source == 1
                                                    ?<>
                                                        <img style={{position:'absolute',left:'20%',top:'42%',transform: 'rotate(-90deg)'}} src={require('../../../../assets/img/arrow_down.gif')} />
                                                        <img style={{position:'absolute',left:'25%',top:'42%',transform: 'rotate(-90deg)'}} src={require('../../../../assets/img/arrow_down.gif')} />
                                                        <img style={{position:'absolute',left:'30%',top:'42%',transform: 'rotate(-90deg)'}} src={require('../../../../assets/img/arrow_down.gif')} />
                                                        <img style={{position:'absolute',left:'35%',top:'42%',transform: 'rotate(-90deg)'}} src={require('../../../../assets/img/arrow_down.gif')} />
                                                        <img style={{position:'absolute',left:'40.5%',top:'42%',transform: 'rotate(-90deg)'}} src={require('../../../../assets/img/arrow_down.gif')} />  
                                                    </>
                                                    :<></>
                                                }


                                                {
                                                    myBlockDetail?.data?.source == 2
                                                    ?<>
                                                       <img style={{position:'absolute',right:'20%',top:'42%',transform: 'rotate(90deg)'}} src={require('../../../../assets/img/arrow_down.gif')} />
                                                       <img style={{position:'absolute',right:'25%',top:'42%',transform: 'rotate(90deg)'}} src={require('../../../../assets/img/arrow_down.gif')} />
                                                       <img style={{position:'absolute',right:'30%',top:'42%',transform: 'rotate(90deg)'}} src={require('../../../../assets/img/arrow_down.gif')} />
                                                       <img style={{position:'absolute',right:'35%',top:'42%',transform: 'rotate(90deg)'}} src={require('../../../../assets/img/arrow_down.gif')} />
                                                       <img style={{position:'absolute',right:'40.5%',top:'42%',transform: 'rotate(90deg)'}} src={require('../../../../assets/img/arrow_down.gif')} />
                                                       <img style={{position:'absolute',right:'43%',top:'42%',transform: 'rotate(90deg)'}} src={require('../../../../assets/img/arrow_down.gif')} />                                                    
                                                    </>
                                                    :<></>
                                                }


                                                {
                                                    myBlockDetail?.data?.source == 3
                                                    ?<>
                                                        <img style={{position:'absolute',left:'48%',top:'15%'}} src={require('../../../../assets/img/arrow_down.gif')} />
                                                        <img style={{position:'absolute',left:'48%',top:'25%'}} src={require('../../../../assets/img/arrow_down.gif')} />
                                                    </>
                                                    :<></>
                                                } 


                                                {
                                                    myBlockDetail?.data?.source == 4
                                                    ?<>
                                                       <img style={{position:'absolute',right:'48%',bottom:'32%',transform: 'rotate(90deg)'}} src={require('../../../../assets/img/arrow_left.gif')} />
                                                       <img style={{position:'absolute',right:'48%',bottom:'20%',transform: 'rotate(90deg)'}} src={require('../../../../assets/img/arrow_left.gif')} />                                                 
                                                    </>
                                                    :<></>
                                                }                                                       

                                               
                                                
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

                                            <div className="row">

                                                <div className="col-md-6 col-lg-6 col-sm-12" style={{height:'40vh',overflowY:'auto'}}>
                                                      <Line  data={gasConsProfileData} options={gasConsProfileOption} />                                                    
                                                </div>

                                                <div className="col-md-6 col-lg-6 col-sm-12" style={{height:'40vh',overflowY:'auto'}}>
                                                    <table className="table table-bordered">
                                                        <thead>
                                                            <tr>
                                                                <th>#</th>
                                                                <th>Imei</th>
                                                                <th>Cooking Hour</th>
                                                                <th>Gas Consumed (kg)</th>
                                                                <th></th>
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



                              <div className="col-md-12 col-lg-12 col-sm-12">
                                    <div className="card">
                                        <div className="card-header">
                                            <h1 className="card-title">Block Devices</h1>
                                            <div className="row" style={{justifyContent:'flex-end'}}>

                                                <div className='col-md-3 col-lg-3 col-sm-12'>
                                                    <div class="input-group">
                                                        <span class="input-group-prepend">
                                                            <i class="input-group-text">Imei</i>
                                                        </span>
                                                        <input class="form-control" type="text" value={blockDevicesImei} onChange={(e)=>setBlockDevicesImei(e.target.value)} />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="card-body" style={{width:'100%',overflowY: 'hidden',height:'50vh'}}>
                                             <div className="row">

                                                    <div className="col-md-6 col-lg-6 col-sm-12">
                                                          <Bar data={blockDeviceDistributionData} options={blockDeviceDistributionOption} />
                                                    </div>
                                                    <div className="col-md-6 col-lg-6 col-sm-12" style={{height:'40vh',overflowY:'auto'}}>
                                                        <table className="table table-bordered">
                                                            <thead>
                                                                <tr>
                                                                    <th>#</th>
                                                                    <th>Imei</th>
                                                                    <th>Type</th>
                                                                    <th>Status</th>
                                                                    <th>Active</th>
                                                                    <th></th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {
                                                                    blockDevices?.length
                                                                    ? blockDevices.map((x,y)=>
                                                                    <tr>
                                                                        <td>{y + 1}</td>
                                                                        <td>{x.imei.substring(0,16)}</td>
                                                                        <td>{deviceTypes[x?.device_type]}</td>
                                                                        <td>{x?.data?.output == 0 ? "Onn" : "Off" }</td>
                                                                        <td>{x?.data?.disabled == 1 ? "Disable" : "Active" }</td>
                                                                        <td>
                                                                            <button onClick={()=>navigate('/dashboard/device_detail/'+x.imei)} className="btn btn-primary">
                                                                                <i className="fa fa-eye"></i>
                                                                            </button>                                       
                                                                        </td>
                                                                    </tr>
                                                                    )
                                                                    :<></>
                                                                }
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