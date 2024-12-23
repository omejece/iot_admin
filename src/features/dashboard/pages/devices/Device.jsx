



import { useEffect, useState } from 'react';
import {useGetDevicesQuery, useCreateDeviceMutation, useEditDeviceMutation, useDeleteDeviceMutation} from './deviceApiSlice'; 
import { useSelector } from 'react-redux';
import { Modal, Button, Form,Dropdown } from 'react-bootstrap';
import Swal from 'sweetalert2';
import ProgressSpinner from '../../../../components/ProgressSpinner';
import { useNavigate } from 'react-router-dom';

const Device = (props)=>{
    
    const navigate = useNavigate();
    const deviceTypes = useSelector((state)=>state.device.deviceTypes);
    const blocks = useSelector((state)=>state.block.blocks);
    const merchants = useSelector((state)=>state.merchant.merchants);
    const [merchantBlocks,setMerchantBlocks] = useState([]);
    const {data: devices,isLoading: isDeviceLoading, isSuccess: isDeviceLoaded, refetch: refetchDevice} = useGetDevicesQuery();
    const [createDevice,{data:deviceSaveResp,isSuccess:isDeviceSaveSuccess,isError: isDeviceErrorSave}] = useCreateDeviceMutation();
    const [editDevice,{data:deviceUpdateResp,isSuccess:isDeviceUpdateSuccess,isError: isDeviceErrorUpdate}] = useEditDeviceMutation();
    const [deleteDevice,{isSuccess:isDeviceDeleteSuccess,isError: isDeviceErrorDelete}] = useDeleteDeviceMutation();
    const [allDevice,setAllDevice] = useState([]);
    const [showAddDeviceModal,setShowAddDeviceModal] = useState(false);
    const [showUpdateDeviceModal,setShowUpdateDeviceModal] = useState(false);
    const [currentDevice, setCurrentDevice] = useState(null);
    const [showSpinner,setShowSpinner] = useState(false);

    const [filterByStatus,setFilterByStatus] = useState("");
    const [filterByBlock,setFilterByBlock=[]] = useState("");
    const [filterByImei,setFilterByImei] = useState("");

    
    const [imei,setImei] = useState("");
    const [deviceType,setDeviceType] = useState("");
    const [blockReference,setBlockReference] = useState("");
    const [merchant,setMerchant] = useState("");


   

    useEffect(()=>{
    },[
        showAddDeviceModal,
        showUpdateDeviceModal,
        currentDevice,
        showSpinner,
        blocks,
        merchantBlocks
    ]);

    useEffect(()=>{
        if(isDeviceLoaded){
            setAllDevice(devices.data);
        }
    },[
        isDeviceLoaded,
        isDeviceLoading
    ]);


    const handleShowEditModal = (data)=>{
        setCurrentDevice(data);
        setImei(data?.imei);
        setDeviceType(data?.device_type);
        setDeviceType(data?.merchant_id);
        var foundBlock = blocks.find(x=>x.id == data.block_id);
        setBlockReference(foundBlock?.reference);
        setMerchantBlocks(blocks);
        setShowUpdateDeviceModal(true);
    }

    const handleHideEditModal = (data)=>{
        setShowUpdateDeviceModal(false);
    }

    const handleShowAddModal = (data)=>{
        setShowAddDeviceModal(true);
        setImei("");
        setDeviceType("");
        setMerchant("");
        setMerchantBlocks([]);
    }


    const handleHideAddModal = (data)=>{
        setShowAddDeviceModal(false);
    }


    const handleSubmitUpdateDevice = async (e)=>{
        e.preventDefault();
        try{
            setShowUpdateDeviceModal(false);
            setShowSpinner(true);
            const resp = await editDevice({
                imei: imei,
                device_type: deviceType,
                block_reference: blockReference,
                merchant: merchant
            }).unwrap();
            if(resp.success == true){
                setShowSpinner(false);
                Swal.fire({title: "Successfull", text:resp.message,icon:"success",timer:2000});
                refetchDevice();
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
            const resp = await createDevice({
                imei: imei,
                device_type: deviceType,
                block_reference: blockReference,
                merchant: merchant
            }).unwrap();
            if(resp.success == true){
                setShowSpinner(false);
                Swal.fire({title: "Successfull", text:resp.message,icon:"success",timer:2000});
                refetchDevice();
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
                        const resp = await deleteDevice({
                            imei: data.imei
                        }).unwrap();
                        if(resp.success == true){
                            setShowSpinner(false);
                            Swal.fire({title: "Successfull", text:resp.message,icon:"success",timer:2000});
                            refetchDevice();
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
        if(filterType == "status"){
            setFilterByStatus(value.trim());
        }
        else if(filterType == "block"){
            setFilterByBlock(value.trim());
        }
        else if(filterType == "imei"){
            setFilterByImei(value.trim());
        }

        var statusFilter = filterByStatus;
        var blockFilter = filterByBlock; 
        var imeiFilter = filterByImei;
        
        if(filterType == "status"){
            statusFilter = value.trim();
        }
        else if(filterType == "block"){
            blockFilter = value.trim();
        }
        else if(filterType == "imei"){
            imeiFilter = value.trim();
        }



        var tempDevice = devices.data;

        if(statusFilter.trim() == "" && blockFilter.trim() == "" && imeiFilter.trim() == ""){
            setAllDevice(tempDevice);
        }
        else if(statusFilter.trim() != "" && blockFilter.trim() == "" && imeiFilter.trim() == ""){
            var filteredData = tempDevice.filter((x)=>{
                if(statusFilter == 0){
                     if(x?.data?.output == statusFilter && x?.data?.disabled == statusFilter){
                        return true;
                     }
                     else{
                        return false;
                     }
                }
                else{
                     if(x?.data?.output == statusFilter || x?.data?.disabled == statusFilter){
                        return true;
                     }
                     else{
                        return false;
                     }                   
                }
            })
            setAllDevice(filteredData);
        }
        else if(statusFilter.trim() == "" && blockFilter.trim() != "" && imeiFilter.trim() == ""){
            var filteredData = tempDevice.filter((x)=>{
                if(x?.block_id == blockFilter){
                    return true;
                }
                else{
                    return false;
                }
           })
           setAllDevice(filteredData);            
        }
        else if(statusFilter.trim() == "" && blockFilter.trim() == "" && imeiFilter.trim() != ""){
            var filteredData = tempDevice.filter((x)=>{
                if( x?.imei.startsWith(imeiFilter)){
                    return true;
                }
                else{
                    return false;
                }
           })
           setAllDevice(filteredData);           
        }
        else if(statusFilter.trim() != "" && blockFilter.trim() != "" && imeiFilter.trim() == ""){
            var filteredData = tempDevice.filter((x)=>{
                if(statusFilter == 0){
                     if(x?.block_id == blockFilter  && (x?.data?.output == statusFilter && x?.data?.disabled == statusFilter)){
                        return true;
                     }
                     else{
                        return false;
                     }
                }
                else{
                     if(x?.block_id == blockFilter  && (x?.data?.output == statusFilter || x?.data?.disabled == statusFilter)){
                        return true;
                     }
                     else{
                        return false;
                     }                  
                }
           })
           setAllDevice(filteredData);           
        }
        else if(statusFilter.trim() == "" && blockFilter.trim() != "" && imeiFilter.trim() != ""){
            var filteredData = tempDevice.filter((x)=>{
                if(x?.block_id == blockFilter && x?.imei.startsWith(imeiFilter)){
                    return true;
                 }
                 else{
                    return false;
                 }
           })
           setAllDevice(filteredData);           
        }
        else if(statusFilter.trim() != "" && blockFilter.trim() == "" && imeiFilter.trim() != ""){
            var filteredData = tempDevice.filter((x)=>{
                 if(statusFilter == 0){
                     if(x?.imei.startsWith(imeiFilter) && (x?.data?.output == statusFilter && x?.data?.disabled == statusFilter)){
                        return true;
                     }
                     else{
                        return false;
                     }
                 }
                 else{
                     if(x?.imei.startsWith(imeiFilter) && (x?.data?.output == statusFilter || x?.data?.disabled == statusFilter)){
                        return true;
                     }
                     else{
                        return false;
                     }
                 }
           })
           setAllDevice(filteredData);           
        }
        else if(statusFilter.trim() != "" && blockFilter.trim() != "" && imeiFilter.trim() != ""){
            var filteredData = tempDevice.filter((x)=>{
                 if(statusFilter == 0){
                     if(x?.block_id == blockFilter && x?.imei.startsWith(imeiFilter) && (x?.data?.output == statusFilter && x?.data?.disabled == statusFilter)){
                        return true;
                     }
                     else{
                        return false;
                     }
                 }
                 else{
                     if(x?.block_id == blockFilter && x?.imei.startsWith(imeiFilter) && (x?.data?.output == statusFilter || x?.data?.disabled == statusFilter)){
                        return true;
                     }
                     else{
                        return false;
                     }                    
                 }
           })
           setAllDevice(filteredData);           
        }
    }


    
    const handleChangeMerchant = (data)=>{
         setMerchant(data);
         var filtered = blocks.filter(x=>{
              if(x.merchant_id == data){
                 return true;
              }
              else{
                 return false;
              }
         });

         setMerchantBlocks(filtered);
    } 

  

    return (
        <>
           <ProgressSpinner  show={showSpinner} />
           <div className="container-fluid">
                <div className="card">
                    <div className="card-header">
                         <h1 className="card-title">Devices</h1>
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
                                        <i class="input-group-text">Filter by status</i>
                                    </span>
                                    <select class="form-control" value={filterByStatus} onChange={(e)=>handleFilterData(e.target.value,"status")} >
                                        <option value=""> All </option>
                                        <option value="0"> Onn</option>
                                        <option value="1"> Off</option>
                                    </select>
                                </div>
                            </div>
                            <button className='btn btn-primary' style={{width:'100px'}} onClick={handleShowAddModal}>
                                <i className='fa fa-plus'></i> Add
                            </button>
                         </div>
                    </div>
                    <div className="card-body" style={{width:'100%',height:'78vh',overflowY: 'auto'}}>
                         <table className="table table-hashed">
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
                                    allDevice?.length
                                    ? allDevice.map((x,y)=>
                                      <tr>
                                          <td>{y + 1}</td>
                                          <td>{x.imei.substring(0,16)}</td>
                                          <td>{deviceTypes[x?.device_type]}</td>
                                          <td>{x?.data?.output == 1 ? "Onn" : "Off" }</td>
                                          <td>{x?.data?.disabled == 1 ? "Disable" : "Active" }</td>
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
                                                        <a href="#" onClick={()=>navigate('/dashboard/device_detail/'+x.imei)} className="dropdown-item">
                                                            <i className="fas fa-eye mr-2"></i> Detail
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

                        <Form.Group className="mb-3">
                            <Form.Label>Merchants</Form.Label>
                            <Form.Select    
                                value={merchant}
                                className="form-control"
                                onChange={(e)=>handleChangeMerchant(e.target.value)}
                                required
                            >
                                <option value="">-- Select merchants --</option>
                                 {
                                    merchants?.length
                                    ? merchants.map((x,y)=>
                                        <option value={x.id}>
                                            {x?.name}
                                        </option>
                                    )
                                    :<></>
                                }
                            </Form.Select>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Block</Form.Label>
                            <Form.Select    
                                value={blockReference}
                                className="form-control"
                                onChange={(e)=>setBlockReference(e.target.value)}
                                required
                            >
                                 {
                                    merchantBlocks?.length
                                    ? merchantBlocks.map((x,y)=>
                                        <option value={x.reference}>
                                            {x?.name}
                                        </option>
                                    )
                                    :<></>
                                }
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

                        <Form.Group className="mb-3">
                            <Form.Label>Merchants</Form.Label>
                            <Form.Select    
                                value={merchant}
                                className="form-control"
                                onChange={(e)=>handleChangeMerchant(e.target.value)}
                                required
                            >
                                 {
                                    merchants?.length
                                    ? merchants.map((x,y)=>
                                        <option value={x.id}>
                                            {x?.name}
                                        </option>
                                    )
                                    :<></>
                                }
                            </Form.Select>
                        </Form.Group>

                        <Form.Group className="mb-3" >
                            <Form.Label>Block</Form.Label>
                            <Form.Select    
                                value={blockReference}
                                className="form-control"
                                onChange={(e)=>setBlockReference(e.target.value)}
                                required
                            >
                                 {
                                    merchantBlocks?.length
                                    ? merchantBlocks.map((x,y)=>
                                        <option value={x.reference}>
                                            {x?.name}
                                        </option>
                                    )
                                    :<></>
                                }                               
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

export default Device;