



import { useEffect, useState } from 'react';
import {useGetBlocksQuery, useCreateBlockMutation, useEditBlockMutation, useDeleteBlockMutation} from './blockApiSlice'; 
import { useSelector } from 'react-redux';
import { Modal, Button, Form,Dropdown } from 'react-bootstrap';
import Swal from 'sweetalert2';
import ProgressSpinner from '../../../../components/ProgressSpinner';
import { useNavigate } from 'react-router-dom';

const Block = (props)=>{
    
    const navigate = useNavigate();
    const merchants = useSelector((state)=>state.merchant.merchants);
    const {data: blocks,isLoading: isBlockLoading, isSuccess: isBlockLoaded, refetch: refetchBlock} = useGetBlocksQuery();
    const [createBlock,{isSuccess:isBlockSaveSuccess,isError: isBlockErrorSave}] = useCreateBlockMutation();
    const [editBlock,{isSuccess:isBlockUpdateSuccess,isError: isBlockErrorUpdate}] = useEditBlockMutation();
    const [deleteBlock,{isSuccess:isBlockDeleteSuccess,isError: isBlockErrorDelete}] = useDeleteBlockMutation();

    const [allBlock,setAllBlock] = useState([]);
    const [showAddBlockModal,setShowAddBlockModal] = useState(false);
    const [showUpdateBlockModal,setShowUpdateBlockModal] = useState(false);
    const [currentBlock, setCurrentBlock] = useState(null);
    const [showSpinner,setShowSpinner] = useState(false);

    const [filterByName,setFilterByName] = useState("");

    
    const [name,setName] = useState("");
    const [address,setAddress] = useState("");
    const [longitude,setLongitude] = useState("");
    const [latitude,setLatitude] = useState("");
    const [capacity,setCapacity] = useState("");
    const [merchant,setMerchant] = useState("");


    
    useEffect(()=>{
        refetchBlock();
    },[]);

    useEffect(()=>{
    },[
        showAddBlockModal,
        showUpdateBlockModal,
        currentBlock,
        showSpinner
    ]);

    useEffect(()=>{
        if(isBlockLoaded){
            setAllBlock(blocks.data);
        }
    },[
        isBlockLoaded,
        isBlockLoading
    ]);


    const handleShowEditModal = (data)=>{
        setCurrentBlock(data);
        setName(data?.name);
        setAddress(data?.address);
        setLongitude(data?.longitude);
        setLatitude(data?.latitude);
        setCapacity(data?.capacity);
        setMerchant(data?.merchant);
        setShowUpdateBlockModal(true);
    }

    const handleHideEditModal = (data)=>{
        setShowUpdateBlockModal(false);
    }

    const handleShowAddModal = (data)=>{
        setShowAddBlockModal(true);
        setName("");
        setAddress("");
        setLongitude("");
        setLatitude("");
        setCapacity("");
    }


    const handleHideAddModal = (data)=>{
        setShowAddBlockModal(false);
    }


    const handleSubmitUpdateBlock = async (e)=>{
        e.preventDefault();
        try{
            setShowUpdateBlockModal(false);
            setShowSpinner(true);
            const resp = await editBlock({
                id: currentBlock.id,
                name: name,
                address: address,
                longitude: longitude,
                latitude: latitude,
                capacity: capacity,
                merchant: merchant,
                block_referrence: currentBlock.reference
            }).unwrap();
            if(resp.success == true){
                setShowSpinner(false);
                Swal.fire({title: "Successfull", text:resp.message,icon:"success",timer:2000});
                refetchBlock();
            }
            else{
                setShowSpinner(false);
                Swal.fire({title: "Error", text:resp.message,icon:"warning",timer:2000});
            }
        }
        catch(err){
           setShowSpinner(false);
           setShowUpdateBlockModal(true);
           Swal.fire({title: "Error", text:err?.data?.message,icon:"warning",timer:2000});
        }
    }


    const handleSubmitAddBlock = async(e)=>{
        e.preventDefault();
        try{
            setShowAddBlockModal(false);
            setShowSpinner(true);
            const resp = await createBlock({
                id: currentBlock.id,
                name: name,
                address: address,
                longitude: longitude,
                latitude: latitude,
                capacity: capacity,
                merchant: merchant
            }).unwrap();
            if(resp.success == true){
                setShowSpinner(false);
                Swal.fire({title: "Successfull", text:resp.message,icon:"success",timer:2000});
                refetchBlock();
            }
            else{
                setShowSpinner(false);
                Swal.fire({title: "Error", text:resp.message,icon:"warning",timer:2000});
            }
        }
        catch(err){
           setShowSpinner(false);
           setShowAddBlockModal(true);
           Swal.fire({title: "Error", text:err.data.message,icon:"warning",timer:2000});
        }
        
    }


    const handleDeleteItem = async(data)=>{
          Swal.fire({
             title: `You are about to delete ${data.imei}`,
             text:'Are you sure you want to delete this Block',
             icon: 'warning',
             showCancelButton: false,
             showDenyButton: true,
             confirmButtonText:'Yes',
             denyButtonText: ' No '
          }).then(async(result)=>{
               if(result.isConfirmed){
                    try{
                        setShowSpinner(true);
                        const resp = await deleteBlock({
                            id: currentBlock.id,
                            block_referrence: currentBlock.reference
                        }).unwrap();
                        if(resp.success == true){
                            setShowSpinner(false);
                            Swal.fire({title: "Successfull", text:resp.message,icon:"success",timer:2000});
                            refetchBlock();
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


    const handleFilterData = (value)=>{
        var filteredData = blocks.data.filter((x)=>{
            if(x?.name.toLowerCase().startsWith(value.trim().toLowerCase())){
                return true;
            }
            else{
                return false;
            }
       });

       setAllBlock(filteredData);
    }


    
  

    return (
        <>
           <ProgressSpinner  show={showSpinner} />
           <div className="container-fluid">
                <div className="card">
                    <div className="card-header">
                         <h1 className="card-title">Blocks</h1>
                         <div className='row'>
                            <div className='col-md-8 col-lg-8 col-sm-12'>
                                <div class="input-group">
                                    <span class="input-group-prepend">
                                        <i class="input-group-text">Filter by Name</i>
                                    </span>
                                    <input class="form-control" type="search" value={filterByName} onChange={(e)=>handleFilterData(e.target.value)} />
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
                                    <th>Name</th>
                                    <th>Reference</th>
                                    <th>Capacity (KW)</th>
                                    <th>Address</th>
                                    <th>Longitude</th>
                                    <th>Latitude</th>
                                    <th></th>
                                </tr>
                             </thead>
                             <tbody>
                                 {
                                    allBlock?.length
                                    ? allBlock.map((x,y)=>
                                      <tr>
                                          <td>{y + 1}</td>
                                          <td>{x.name}</td>
                                          <td>{x?.reference}</td>
                                          <td>{x?.capacity}</td>
                                          <td>{x?.address}</td>
                                          <td>{x?.longitude}</td>
                                          <td>{x?.latitude}</td>
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
                                                        <a href="#" onClick={()=>navigate('/dashboard/Block_detail/'+x.imei)} className="dropdown-item">
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


           <Modal show={showAddBlockModal} onHide={handleHideAddModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Block</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmitAddBlock}>
                        <Form.Group className="mb-3" >
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                value={name}
                                onChange={(e)=>setName(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Merchants</Form.Label>
                            <Form.Select    
                                value={merchant}
                                className="form-control"
                                onChange={(e)=>setMerchant(e.target.value)}
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
                            <Form.Label>Capacity (KW)</Form.Label>
                            <Form.Control
                                type="text"
                                value={capacity}
                                onChange={(e)=>setCapacity(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" >
                            <Form.Label>Address</Form.Label>
                            <Form.Control
                                type="text"
                                value={address}
                                onChange={(e)=>setAddress(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" >
                            <Form.Label>Longitude</Form.Label>
                            <Form.Control
                                type="text"
                                value={longitude}
                                onChange={(e)=>setLongitude(e.target.value)}
                                required
                            />
                        </Form.Group> 

                        <Form.Group className="mb-3" >
                            <Form.Label>Latitude</Form.Label>
                            <Form.Control
                                type="text"
                                value={latitude}
                                onChange={(e)=>setLatitude(e.target.value)}
                                required
                            />
                        </Form.Group>                        

                        <Button variant="primary" type="submit">
                            submit
                        </Button>


                    </Form>
                </Modal.Body>
            </Modal>

            <Modal show={showUpdateBlockModal} onHide={handleHideEditModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Block</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmitUpdateBlock}>
                        <Form.Group className="mb-3" >
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                value={name}
                                onChange={(e)=>setName(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Merchants</Form.Label>
                            <Form.Select    
                                value={merchant}
                                className="form-control"
                                onChange={(e)=>setMerchant(e.target.value)}
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
                            <Form.Label>Capacity (KW)</Form.Label>
                            <Form.Control
                                type="text"
                                value={capacity}
                                onChange={(e)=>setCapacity(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" >
                            <Form.Label>Address</Form.Label>
                            <Form.Control
                                type="text"
                                value={address}
                                onChange={(e)=>setAddress(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" >
                            <Form.Label>Longitude</Form.Label>
                            <Form.Control
                                type="text"
                                value={longitude}
                                onChange={(e)=>setLongitude(e.target.value)}
                                required
                            />
                        </Form.Group> 

                        <Form.Group className="mb-3" >
                            <Form.Label>Latitude</Form.Label>
                            <Form.Control
                                type="text"
                                value={latitude}
                                onChange={(e)=>setLatitude(e.target.value)}
                                required
                            />
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

export default Block;