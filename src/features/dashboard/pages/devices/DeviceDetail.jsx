import { useParams } from "react-router-dom";
import "./device.css";
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
import ToggleSwitch from "../../../../components/toggleSwitch/ToggleSwicth";

ChartJS.register(LineElement, PointElement, ArcElement,BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const DeviceDetail = (props)=>{
    const {imei} = useParams();
    const [showSpinner,setShowSpinner] = useState(false);

    const [energyConsBarData,setEnergyConsBarData] = useState({
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun","Jul","Aug","Sept","Oct","Nov","Dec"],
        datasets: [
          {
            label: "Energy consumed",
            data: [30, 45, 28, 80, 99, 43, 30, 45, 28, 80, 99, 43],
            backgroundColor: [
              "rgba(87, 212, 151, 0.5)",
              "rgba(87, 212, 151, 0.5)",
              "rgba(87, 212, 151, 0.5)",
              "rgba(87, 212, 151, 0.5)",
              "rgba(87, 212, 151, 0.5)",
              "rgba(87, 212, 151, 0.5)",
              "rgba(87, 212, 151, 0.5)",
              "rgba(87, 212, 151, 0.5)",
              "rgba(87, 212, 151, 0.5)",
              "rgba(87, 212, 151, 0.5)",
              "rgba(87, 212, 151, 0.5)",
              "rgba(87, 212, 151, 0.5)",
            ],
            borderColor: [
                "rgba(87, 212, 151, 1)",
                "rgba(87, 212, 151, 1)",
                "rgba(87, 212, 151, 1)",
                "rgba(87, 212, 151, 1)",
                "rgba(87, 212, 151, 1)",
                "rgba(87, 212, 151, 1)",
                "rgba(87, 212, 151, 1)",
                "rgba(87, 212, 151, 1)",
                "rgba(87, 212, 151, 1)",
                "rgba(87, 212, 151, 1)",
                "rgba(87, 212, 151, 1)",
                "rgba(87, 212, 151, 1)",
            ],
            borderWidth: 1,
          },
        ],
      });
    
      const [barChartOptions,setBarChartOptions] = useState({
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: "top",
            labels: {
                color: 'white', // Change the label color here
                font: {
                    size: 14, // Optional: Change font size
                },
            }
          },
          tooltip: {
            enabled: true,
          },
        },
        scales: {
          x: {
            beginAtZero: true,
            ticks: {
                color: 'white', // Change x-axis labels color
            },
          },
          y: {
            beginAtZero: true,
            ticks: {
                color: 'white', // Change x-axis labels color
            },
          },
        },
      });


    return (
        <div className="deviceDetail">
           <ProgressSpinner  show={showSpinner} />
           <div className="deviceDetailContainer">
                <div className="detailCenter">
                    <div className="topCenterDetail"></div>
                    <div className="baseCenterDetail">
                        <div className="baseCenterSideDetail">
                            <div className="controlContent">
                                <span>Control Device</span>
                                <ToggleSwitch 
                                    width={'100px' }  
                                    onSwitchOff={()=>{}} 
                                    onSwitchOn={()=>{}} 
                                />
                            </div>

                            <div className="controlContent">
                                <span>Enable Device</span>
                                <ToggleSwitch 
                                    width={'100px' }  
                                    onSwitchOff={()=>{}} 
                                    onSwitchOn={()=>{}} 
                                />
                            </div>

                        </div>
                        <div className="baseCenterMainDetail">
                            <div className="smallBoxInfoContainer">
                                 
                                 <div className="smallBoxInfo">
                                    <span>Consumption Yesterday</span>
                                 </div>
                                 <div className="smallBoxInfo">
                                     <span>Consumption Today</span>
                                 </div>
                                 <div className="smallBoxInfo">
                                     <span>Peak Load</span>
                                 </div>

                            </div>
                            <div className="graphContainer">
                                 <Bar data={energyConsBarData} options={barChartOptions}  />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="detaitSide">
                    <div className="alarmContainer">
                        <h4>Alarm</h4>
                    </div>
                    <div className="consumptionContainer">
                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Grid</th>
                                    <th>Gen</th>
                                    <th>Solar</th>
                                    <th>Battery</th>
                                </tr>
                            </thead>
                            <tbody>

                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DeviceDetail;