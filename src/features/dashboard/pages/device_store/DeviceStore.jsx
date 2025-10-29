



import { useEffect, useState } from 'react';
import {useGetDevicesStoreQuery, useCreateDeviceStoreMutation, useEditDeviceStoreMutation, useDeleteDeviceStoreMutation} from './deviceStoreApiSlice'; 
import { useSelector } from 'react-redux';
import { Modal, Button, Form,Dropdown } from 'react-bootstrap';
import Swal from 'sweetalert2';
import ProgressSpinner from '../../../../components/ProgressSpinner';

const DeviceStore = (props)=>{
    
    const deviceTypes = useSelector((state)=>state.device.deviceTypes);
    const {data: deviceStores,isLoading: isDeviceStoreLoading, isSuccess: isDeviceStoreLoaded, refetch: refetchDeviceStore} = useGetDevicesStoreQuery();
    const [createDeviceStore,{data:deviceSaveResp,isSuccess:isDeviceSaveSuccess,isError: isDeviceErrorSave}] = useCreateDeviceStoreMutation();
    const [editDeviceStore,{data:deviceUpdateResp,isSuccess:isDeviceUpdateSuccess,isError: isDeviceErrorUpdate}] = useEditDeviceStoreMutation();
    const [deleteDeviceStore,{isSuccess:isDeviceDeleteSuccess,isError: isDeviceErrorDelete}] = useDeleteDeviceStoreMutation();
    const [allDeviceStore,setAllDeviceStore] = useState([]);
    const [showAddDeviceModal,setShowAddDeviceModal] = useState(false);
    const [showUpdateDeviceModal,setShowUpdateDeviceModal] = useState(false);
    const [currentDevice, setCurrentDevice] = useState(null);
    const [showSpinner,setShowSpinner] = useState(false);

    const [filterByUsage,setFilterByUsage] = useState("");
    const [filterByImei,setFilterByImei] = useState("");

    
    const [imei,setImei] = useState("");
    const [deviceType,setDeviceType] = useState("");
    const [status,setStatus] = useState("");


    useEffect(()=>{},[
        showAddDeviceModal,
        showUpdateDeviceModal,
        currentDevice,
        showSpinner
    ]);

    useEffect(()=>{
        if(deviceStores){
            if(deviceStores?.data?.length > 0){
                setAllDeviceStore(deviceStores?.data);
            }
            else{
                setAllDeviceStore([]);
            }
        }
    },[
        deviceStores,
        isDeviceStoreLoaded,
        isDeviceStoreLoading
    ]);


    const handleShowEditModal = (data)=>{
        setCurrentDevice(data);
        setImei(data?.imei);
        setDeviceType(data?.device_type);
        setStatus(data?.status);
        setShowUpdateDeviceModal(true);
    }

    const handleHideEditModal = (data)=>{
        setShowUpdateDeviceModal(false);
    }

    const handleShowAddModal = (data)=>{
        setShowAddDeviceModal(true);
        setImei("");
        setDeviceType("");
    }


    const handleHideAddModal = (data)=>{
        setShowAddDeviceModal(false);
    }


    const handleSubmitUpdateDevice = async (e)=>{
        e.preventDefault();
        try{
            setShowUpdateDeviceModal(false);
            setShowSpinner(true);
            const resp = await editDeviceStore({
                imei: imei,
                device_type: deviceType,
                status: status
            }).unwrap();
            if(resp.success == true){
                setShowSpinner(false);
                Swal.fire({title: "Successfull", text:resp.message,icon:"success",timer:2000});
                refetchDeviceStore();
            }
            else{
                setShowSpinner(false);
                Swal.fire({title: "Error", text:resp.message,icon:"warning",timer:2000});
            }
        }
        catch(err){
           setShowSpinner(false);
           setShowUpdateDeviceModal(true);
           Swal.fire({title: "Error", text:err?.data?.message,icon:"warning",timer:2000});
        }
    }


    const handleSubmitAddDevice = async(e)=>{
        e.preventDefault();
        try{
            setShowAddDeviceModal(false);
            setShowSpinner(true);
            const resp = await createDeviceStore({
                imei: imei,
                device_type: deviceType
            }).unwrap();
            if(resp.success == true){
                setShowSpinner(false);
                Swal.fire({title: "Successfull", text:resp.message,icon:"success",timer:2000});
                refetchDeviceStore();
            }
            else{
                setShowSpinner(false);
                Swal.fire({title: "Error", text:resp.message,icon:"warning",timer:2000});
            }
        }
        catch(err){
           setShowSpinner(false);
           setShowAddDeviceModal(true);
           Swal.fire({title: "Error", text:err.data.message,icon:"warning",timer:2000});
        }
        
    }


    const handleDeleteItem = async(data)=>{
          Swal.fire({
             title: `You are about to delete ${data.imei}`,
             text:'Are you sure you want to delete this device',
             icon: 'warning',
             showCancelButton: false,
             showDenyButton: true,
             confirmButtonText:'Yes',
             denyButtonText: ' No '
          }).then(async(result)=>{
               if(result.isConfirmed){
                    try{
                        setShowSpinner(true);
                        const resp = await deleteDeviceStore({
                            imei: data.imei
                        }).unwrap();
                        if(resp.success == true){
                            setShowSpinner(false);
                            Swal.fire({title: "Successfull", text:resp.message,icon:"success",timer:2000});
                            refetchDeviceStore();
                        }
                        else{
                            setShowSpinner(false);
                            Swal.fire({title: "Error", text:resp.message,icon:"warning",timer:2000});
                        }
                    }
                    catch(err){
                        setShowSpinner(false);
                        Swal.fire({title: "Error", text:err.data.message,icon:"warning",timer:2000});
                    }
               }
               else{

               }
          })
    }
    

    const handleFilterData = (value,filterType)=>{
          var filterImei = "";
          var filterStatus = "";
          if(filterType == "imei"){
             setFilterByImei(value.trim());
          }
          else if(filterType == "usage"){
              setFilterByUsage(value.trim());
          }
          var tempDeviceStore = deviceStores.data;
          filterImei = filterByImei;
          filterStatus = filterByUsage;

          if(filterType == "imei"){
              filterImei = value.trim();
          }
          else if(filterType == "usage"){
              filterStatus = value.trim();
          }

          if(filterImei == "" && filterStatus == ""){
              setAllDeviceStore(tempDeviceStore);
          }
          else if(filterImei != "" && filterStatus == ""){
               var myFiltered = tempDeviceStore.filter((x)=>{
                    if(x.imei.startsWith(filterImei)){
                       return true;
                    }
                    else{
                        return false;
                    }
               });
               setAllDeviceStore(myFiltered);
          }
          else if(filterImei == "" && filterStatus != ""){
                var myFiltered = tempDeviceStore.filter((x)=>{
                    if(x.status == filterStatus){
                        return true;
                    }
                    else{
                        return false;
                    }
                });
                setAllDeviceStore(myFiltered);
          }
          else if(filterImei != "" && filterStatus != ""){
                var myFiltered = tempDeviceStore.filter((x)=>{
                    if(x.imei.startsWith(filterImei) && x.status == filterStatus){
                        return true;
                    }
                    else{
                        return false;
                    }
                });
                setAllDeviceStore(myFiltered);
          }
    }



    return (
        <>
           <ProgressSpinner  show={showSpinner} />
           <div className="container-fluid">
                <div className="card">
                    <div className="card-header">
                         <h1 className="card-title">Manufactured Devices</h1>
                         <div className='row additional-option'>
                            <div className='col-md-4 col-lg-4 col-sm-12'>
                                <div class="input-group">
                                    <span class="input-group-prepend">
                                        <i class="input-group-text">Filter by Imei</i>
                                    </span>
                                    <input class="form-control" type="search" value={filterByImei} onChange={(e)=>handleFilterData(e.target.value,"imei")} />
                                </div>
                            </div>
                            <div className='col-md-4 col-lg-4 col-sm-12'>
                                <div class="input-group">
                                    <span class="input-group-prepend">
                                        <i class="input-group-text">Filter by Usage</i>
                                    </span>
                                    <select class="form-control" value={filterByUsage} onChange={(e)=>handleFilterData(e.target.value,"usage")} >
                                        <option value="">All</option>
                                        <option value="0">not in use</option>
                                        <option value="1">in use</option>
                                    </select>
                                </div>
                            </div>

                         </div>
                         <button className='btn btn-primary action-btn' onClick={handleShowAddModal}>
                            <i className='fa fa-plus'></i> Add
                         </button>
                    </div>
                    <div className="card-body table-container" >
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
                                 {
                                    allDeviceStore?.length > 0
                                    ? allDeviceStore.map((x,y)=>
                                      <tr>
                                          <td>{y + 1}</td>
                                          <td>{x.imei}</td>
                                          <td>{deviceTypes[x?.device_type]}</td>
                                          <td>{x?.status != 1 ? "not in use" : "In use" }</td>
                                          <td>
                                            <Dropdown>
                                                <Dropdown.Toggle variant="default" id="dropdown-basic">
                                                    <i style={{fontSize:'2opx'}}>...</i>
                                                </Dropdown.Toggle>

                                                <Dropdown.Menu>
                                                    <Dropdown.Item href="#">
                                                        <a href="#" onClick={()=>handleShowEditModal(x)} className="dropdown-item">
                                                            <i className="fas fa-pen mr-2"></i> Update
                                                        </a>
                                                    </Dropdown.Item>
                                                    <Dropdown.Item href="#">
                                                        <a href="#" onClick={()=>handleDeleteItem(x)} className="dropdown-item">
                                                            <i className="fas fa-trash mr-2"></i> Trash
                                                        </a>
                                                    </Dropdown.Item>
                                                </Dropdown.Menu>
                                            </Dropdown>                                          
                                          </td>
                                      </tr>
                                    )
                                    :<></>
                                 }
                             </tbody>
                         </table>
                    </div>
                    <div className="card-footer"></div>
                </div>
           </div>


           <Modal show={showAddDeviceModal} onHide={handleHideAddModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Add device</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmitAddDevice}>
                        <Form.Group className="mb-3" controlId="imei">
                            <Form.Label>Imei</Form.Label>
                            <Form.Control
                                type="text"
                                value={imei}
                                onChange={(e)=>setImei(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="device-type">
                            <Form.Label>Device Type</Form.Label>
                            <Form.Select    
                                value={deviceType}
                                className="form-control"
                                onChange={(e)=>setDeviceType(e.target.value)}
                                required
                            >
                                <option value="">Select device type</option>
                                <option value="1">Prepaid Meter</option>
                                <option value="2">Smart home</option>
                                <option value="3">Kike meter</option>
                                <option value="4">Gen starter</option>
                                <option value="5">Gateway</option>
                                <option value="6">Auto bidder</option>
                                <option value="7">Inverter</option>
                                <option value="8">Auto gen</option>
                                <option value="9">Obidder Meter</option>
                            </Form.Select>
                        </Form.Group>

                        <Button variant="primary" type="submit">
                            submit
                        </Button>


                    </Form>
                </Modal.Body>
            </Modal>

            <Modal show={showUpdateDeviceModal} onHide={handleHideEditModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Device</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmitUpdateDevice}>
                        <Form.Group className="mb-3" controlId="imei">
                            <Form.Label>Imei</Form.Label>
                            <Form.Control
                                type="text"
                                value={imei}
                                onChange={(e)=>setImei(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="device-type">
                            <Form.Label>Device Type</Form.Label>
                            <Form.Select    
                                value={deviceType}
                                className="form-control"
                                onChange={(e)=>setDeviceType(e.target.value)}
                                required
                            >
                                <option value="1">Prepaid Meter</option>
                                <option value="2">Smart home</option>
                                <option value="3">Kike meter</option>
                                <option value="4">Gen starter</option>
                                <option value="5">Gateway</option>
                                <option value="6">Auto bidder</option>
                                <option value="7">Inverter</option>
                                <option value="8">Auto gen</option>
                                <option value="9">Obidder Meter</option>
                            </Form.Select>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="status">
                            <Form.Label>Device Status</Form.Label>
                            <Form.Select    
                                value={status}
                                className="form-control"
                                onChange={(e)=>setStatus(e.target.value)}
                                required
                            >
                                <option value="1">In use</option>
                                <option value="0">Not in use</option>
                            </Form.Select>
                        </Form.Group>

                        <Button variant="primary" type="submit">
                            submit
                        </Button>                      
                    </Form>
                </Modal.Body>
            </Modal>

        </>
    );
}

export default DeviceStore;