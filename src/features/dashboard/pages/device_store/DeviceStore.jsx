



import { useEffect, useState } from 'react';
import {useGetDevicesStoreQuery} from './deviceStoreApiSlice'; 

const DeviceStore = (props)=>{

    const {data: deviceStores,isLoading: isDeviceStoreLoading, isSuccess: isDeviceStoreLoaded, refetch: refetchDeviceStore} = useGetDevicesStoreQuery();
    const [allDeviceStore,setAllDeviceStore] = useState([]);

    useEffect(()=>{
        if(isDeviceStoreLoaded){
            setAllDeviceStore(deviceStores.data);
        }
    },[
        isDeviceStoreLoaded,
        isDeviceStoreLoading
    ]);

    return (
        <>
           <div className="container-fluid">
                <div className="card">
                    <div className="card-header">
                         <h1 className="card-title">Manufactured Devices</h1>
                         <div className='row'>
                            <div className='col-md-4 col-lg-4 col-sm-12'>
                                <div class="input-group">
                                    <span class="input-group-prepend">
                                        <i class="input-group-text">Filter by Imei</i>
                                    </span>
                                    <input class="form-control" type="search" />
                                </div>
                            </div>
                            <div className='col-md-4 col-lg-4 col-sm-12'>
                                <div class="input-group">
                                    <span class="input-group-prepend">
                                        <i class="input-group-text">Filter by Usage</i>
                                    </span>
                                    <select class="form-control">
                                        <option value="0">not in use</option>
                                        <option value="1">in use</option>
                                    </select>
                                </div>
                            </div>
                            <button className='btn btn-primary'>
                                <i className='fa fa-plus'></i> Add
                            </button>
                         </div>
                    </div>
                    <div className="card-body" style={{width:'100%',height:'80vh',overFlowY: 'auto'}}>
                         <table className="table table-bordered">
                             <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Imei</th>
                                    <th>Type</th>
                                    <th>Status</th>
                                    <th></th>
                                </tr>
                             </thead>
                             <tbody>

                             </tbody>
                         </table>
                    </div>
                    <div className="card-footer"></div>
                </div>
           </div>
        </>
    );
}

export default DeviceStore;