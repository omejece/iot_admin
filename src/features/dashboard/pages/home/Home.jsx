
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


import { useState } from 'react';

ChartJS.register(LineElement, PointElement, ArcElement,BarElement, CategoryScale, LinearScale, Tooltip, Legend);





const Home = (props)=>{

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


    const [deviceDistPieData,useDeviceDistPieData] = useState({
        labels: ['Obidder Meter', 'Obidder', 'Meter','Kike'],
        datasets: [
            {
            label: 'Devices Distribution',
            data: [300, 150, 100, 50],
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


    const [energyConsBarData,setEnergyConsBarData] = useState({
        labels: ["January", "February", "March", "April", "May", "June","July","August","September","October","November","December"],
        datasets: [
          {
            label: "Energy consumed",
            data: [30, 45, 28, 80, 99, 43, 30, 45, 28, 80, 99, 43],
            backgroundColor: [
              "rgba(255, 99, 132, 0.5)",
              "rgba(54, 162, 235, 0.5)",
              "rgba(255, 206, 86, 0.5)",
              "rgba(75, 192, 192, 0.5)",
              "rgba(153, 102, 255, 0.5)",
              "rgba(255, 159, 64, 0.5)",
            ],
            borderColor: [
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
              "rgba(255, 159, 64, 1)",
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


      const [energyConsMultilineData,setEnergyConsMultilineData] = useState({
        labels: ["January", "February", "March", "April", "May", "June","July","August","September","October","November","December"],
        datasets: [
          {
            label: "Gen",
            data: [30, 45, 28, 80, 99, 43],
            borderColor: "rgba(75, 192, 192, 1)",
            backgroundColor: "rgba(75, 192, 192, 0.2)",
            tension: 0.4,
            pointBackgroundColor: "rgba(75, 192, 192, 1)",
          },
          {
            label: "Grid",
            data: [40, 55, 38, 70, 120, 60],
            borderColor: "rgba(255, 99, 132, 1)",
            backgroundColor: "rgba(255, 99, 132, 0.2)",
            tension: 0.4,
            pointBackgroundColor: "rgba(255, 99, 132, 1)",
          },
          {
            label: "Solar",
            data: [20, 30, 50, 90, 100, 80],
            borderColor: "rgba(54, 162, 235, 1)",
            backgroundColor: "rgba(54, 162, 235, 0.2)",
            tension: 0.4,
            pointBackgroundColor: "rgba(54, 162, 235, 1)",
          },
          {
            label: "Battery",
            data: [90, 30, 50, 90, 120, 40],
            borderColor: "rgba(54, 100, 235, 1)",
            backgroundColor: "rgba(54, 100, 235, 0.2)",
            tension: 0.4,
            pointBackgroundColor: "rgba(54, 162, 235, 1)",
          },
        ],
      });
    
      const [multiLineoptions,setMultiLineoptions] = useState({
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
    


    return (
        <>
                <div className="content-header">
                    <div className="container-fluid">
                        <div className="row mb-2">
                            <div className="col-sm-6">
                                <h1 className="m-0">Home</h1>
                            </div>
                            <div className="col-sm-6">
                                <ol className="breadcrumb float-sm-right">
                                    <li className="breadcrumb-item">
                                        <a href="#">Home</a>
                                    </li>
                                </ol>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-12 col-sm-6 col-md-3">
                        <div className="info-box">
                            <span className="info-box-icon bg-info elevation-1">
                                <i className="fas fa-users" />
                            </span>
                            <div className="info-box-content">
                                <span className="info-box-text">Merchants</span>
                                <span className="info-box-number">
                                    10 <small>%</small>
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="col-12 col-sm-6 col-md-3">
                        <div className="info-box mb-3">
                            <span className="info-box-icon bg-danger elevation-1">
                                <i className="fas fa-university" />
                            </span>
                            <div className="info-box-content">
                                <span className="info-box-text">Blocks</span>
                                <span className="info-box-number">41,410</span>
                            </div>
                        </div>
                    </div>


                    <div className="clearfix hidden-md-up" />

                    <div className="col-12 col-sm-6 col-md-3">
                        <div className="info-box mb-3">
                            <span className="info-box-icon bg-success elevation-1">
                                <i className="fas fa-microchip" />
                            </span>
                            <div className="info-box-content">
                                <span className="info-box-text">Devices</span>
                                <span className="info-box-number">760</span>
                            </div>
                        </div>
                    </div>

                    <div className="col-12 col-sm-6 col-md-3">
                        <div className="info-box mb-3">
                            <span className="info-box-icon bg-warning elevation-1">
                                <i className="fas fa-bolt" />
                            </span>
                            <div className="info-box-content">
                                <span className="info-box-text">Consumptions</span>
                                <span className="info-box-number">2,000</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-6">
                        <div className="card">
                            <div className="card-header">
                                <h5 className="card-title">Energy Consumed Chart</h5>
                            </div>
                            <div className="card-body item-center" style={{padding:'2%',height:'300px'}}>
                                <Pie data={energyConsPieData} options={pieOptions} />
                            </div>
                            <div className="card-footer">
                            </div>
                        </div>
                    </div>

                    <div className="col-md-6">
                        <div className="card">
                            <div className="card-header">
                                <h5 className="card-title"> Device Chart</h5>
                            </div>
                            <div className="card-body item-center" style={{padding:'2%',height:'300px'}}>
                                 <Pie data={deviceDistPieData} options={pieOptions}  />
                            </div>
                            <div className="card-footer">
                            </div>
                        </div>
                    </div>

                    <div className="col-md-6">
                        <div className="card">
                            <div className="card-header">
                                <h5 className="card-title"> Energy Consumption Distribution </h5>
                            </div>
                            <div className="card-body" style={{padding:'20px',height:'300px'}}>
                                    <Bar data={energyConsBarData} options={barChartOptions}  />
                            </div>
                            <div className="card-footer">
                            </div>
                        </div>
                    </div>

                    <div className="col-md-6">
                        <div className="card">
                            <div className="card-header">
                                <h5 className="card-title"> Energy Consumption </h5>
                            </div>
                            <div className="card-body" style={{padding:'20px',height:'300px',overflowY:'auto'}}>
                                <table className='table table-bordered'>
                                    <thead>
                                        <tr>
                                            <th>Month</th>
                                            <th>Gen</th>
                                            <th>Grid</th>
                                            <th>Solar</th>
                                            <th>Battery</th>
                                            <th>Total</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>January</td>
                                            <td>67</td>
                                            <td>0</td>
                                            <td>0</td>
                                            <td>0</td>
                                            <td>67</td>
                                        </tr>
                                        <tr>
                                            <td>February</td>
                                            <td>67</td>
                                            <td>0</td>
                                            <td>0</td>
                                            <td>0</td>
                                            <td>67</td>
                                        </tr>
                                        <tr>
                                            <td>March</td>
                                            <td>67</td>
                                            <td>0</td>
                                            <td>0</td>
                                            <td>0</td>
                                            <td>67</td>
                                        </tr>
                                        <tr>
                                            <td>April</td>
                                            <td>67</td>
                                            <td>0</td>
                                            <td>0</td>
                                            <td>0</td>
                                            <td>67</td>
                                        </tr>
                                        <tr>
                                            <td>May</td>
                                            <td>67</td>
                                            <td>0</td>
                                            <td>0</td>
                                            <td>0</td>
                                            <td>67</td>
                                        </tr>
                                        <tr>
                                            <td>June</td>
                                            <td>67</td>
                                            <td>0</td>
                                            <td>0</td>
                                            <td>0</td>
                                            <td>67</td>
                                        </tr>
                                        <tr>
                                            <td>July</td>
                                            <td>67</td>
                                            <td>0</td>
                                            <td>0</td>
                                            <td>0</td>
                                            <td>67</td>
                                        </tr>
                                        <tr>
                                            <td>August</td>
                                            <td>67</td>
                                            <td>0</td>
                                            <td>0</td>
                                            <td>0</td>
                                            <td>67</td>
                                        </tr>
                                        <tr>
                                            <td>September</td>
                                            <td>67</td>
                                            <td>0</td>
                                            <td>0</td>
                                            <td>0</td>
                                            <td>67</td>
                                        </tr>
                                        <tr>
                                            <td>October</td>
                                            <td>67</td>
                                            <td>0</td>
                                            <td>0</td>
                                            <td>0</td>
                                            <td>67</td>
                                        </tr>
                                        <tr>
                                            <td>November</td>
                                            <td>67</td>
                                            <td>0</td>
                                            <td>0</td>
                                            <td>0</td>
                                            <td>67</td>
                                        </tr>
                                        <tr>
                                            <td>December</td>
                                            <td>67</td>
                                            <td>0</td>
                                            <td>0</td>
                                            <td>0</td>
                                            <td>67</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="card-footer">
                            </div>
                        </div>
                    </div>

                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-header">
                                <h5 className="card-title"> Consumption Profile </h5>
                            </div>
                            <div className="card-body" style={{padding:'20px',height:'300px'}}>
                                <Line data={energyConsMultilineData} options={multiLineoptions} />
                            </div>
                            <div className="card-footer">
                            </div>
                        </div>
                    </div>
                </div>
        </>
    );
}

export default Home;