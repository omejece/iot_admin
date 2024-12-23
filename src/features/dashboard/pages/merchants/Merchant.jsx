



import { useEffect, useState } from 'react';
import {useGetMerchantsQuery, useCreateMerchantMutation, useEditMerchantMutation, useDeleteMerchantMutation} from './merchantApiSlice'; 
import { useSelector } from 'react-redux';
import { Modal, Button, Form,Dropdown } from 'react-bootstrap';
import Swal from 'sweetalert2';
import ProgressSpinner from '../../../../components/ProgressSpinner';
import { useNavigate } from 'react-router-dom';

const Merchant = (props)=>{
    
    const navigate = useNavigate();
    const {data: merchants,isLoading: isMerchantLoading, isSuccess: isMerchantLoaded, refetch: refetchMerchant} = useGetMerchantsQuery();
    const [createMerchant,{isSuccess:isMerchantSaveSuccess,isError: isMerchantErrorSave}] = useCreateMerchantMutation();
    const [editMerchant,{isSuccess:isMerchantUpdateSuccess,isError: isMerchantErrorUpdate}] = useEditMerchantMutation();
    const [deleteMerchant,{isSuccess:isMerchantDeleteSuccess,isError: isMerchantErrorDelete}] = useDeleteMerchantMutation();

    const [allMerchant,setAllMerchant] = useState([]);
    const [showAddMerchantModal,setShowAddMerchantModal] = useState(false);
    const [showUpdateMerchantModal,setShowUpdateMerchantModal] = useState(false);
    const [currentMerchant, setCurrentMerchant] = useState(null);
    const [showSpinner,setShowSpinner] = useState(false);

    const [filterByName,setFilterByName] = useState("");

    
    const [name,setName] = useState("");
    const [address,setAddress] = useState("");
    const [email,setEmail] = useState("");
    const [phone,setPhone] = useState("");


    
    useEffect(()=>{
        refetchMerchant();
    },[]);

    useEffect(()=>{
    },[
        showAddMerchantModal,
        showUpdateMerchantModal,
        currentMerchant,
        showSpinner
    ]);

    useEffect(()=>{
        if(isMerchantLoaded){
            setAllMerchant(merchants.data);
        }
    },[
        isMerchantLoaded,
        isMerchantLoading
    ]);


    const handleShowEditModal = (data)=>{
        setCurrentMerchant(data);
        setName(data?.name);
        setAddress(data?.address);
        setEmail(data?.email);
        setPhone(data?.phone);
        setShowUpdateMerchantModal(true);
    }

    const handleHideEditModal = (data)=>{
        setShowUpdateMerchantModal(false);
    }

    const handleShowAddModal = (data)=>{
        setShowAddMerchantModal(true);
        setName("");
        setAddress("");
        setEmail("");
        setPhone("");
    }


    const handleHideAddModal = (data)=>{
        setShowAddMerchantModal(false);
    }


    const handleSubmitUpdateMerchant = async (e)=>{
        e.preventDefault();
        try{
            setShowUpdateMerchantModal(false);
            setShowSpinner(true);
            const resp = await editMerchant({
                name: name,
                address: address,
                email: email,
                phone: phone
            }).unwrap();
            if(resp.success == true){
                setShowSpinner(false);
                Swal.fire({title: "Successfull", text:resp.message,icon:"success",timer:2000});
                refetchMerchant();
            }
            else{
                setShowSpinner(false);
                Swal.fire({title: "Error", text:resp.message,icon:"warning",timer:2000});
            }
        }
        catch(err){
           setShowSpinner(false);
           setShowUpdateMerchantModal(true);
           Swal.fire({title: "Error", text:err?.data?.message,icon:"warning",timer:2000});
        }
    }


    const handleSubmitAddMerchant = async(e)=>{
        e.preventDefault();
        try{
            setShowAddMerchantModal(false);
            setShowSpinner(true);
            const resp = await createMerchant({
                id: currentMerchant.id,
                name: name,
                address: address,
                email: email,
                phone: phone
            }).unwrap();
            if(resp.success == true){
                setShowSpinner(false);
                Swal.fire({title: "Successfull", text:resp.message,icon:"success",timer:2000});
                refetchMerchant();
            }
            else{
                setShowSpinner(false);
                Swal.fire({title: "Error", text:resp.message,icon:"warning",timer:2000});
            }
        }
        catch(err){
           setShowSpinner(false);
           setShowAddMerchantModal(true);
           Swal.fire({title: "Error", text:err.data.message,icon:"warning",timer:2000});
        }
        
    }


    const handleDeleteItem = async(data)=>{
          Swal.fire({
             title: `You are about to delete ${data.imei}`,
             text:'Are you sure you want to delete this Merchant',
             icon: 'warning',
             showCancelButton: false,
             showDenyButton: true,
             confirmButtonText:'Yes',
             denyButtonText: ' No '
          }).then(async(result)=>{
               if(result.isConfirmed){
                    try{
                        setShowSpinner(true);
                        const resp = await deleteMerchant({
                            id: currentMerchant.id
                        }).unwrap();
                        if(resp.success == true){
                            setShowSpinner(false);
                            Swal.fire({title: "Successfull", text:resp.message,icon:"success",timer:2000});
                            refetchMerchant();
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
        var filteredData = merchants.filter((x)=>{
            if(x?.name.toLowerCase().startsWith(value.trim().toLowerCase())){
                return true;
            }
            else{
                return false;
            }
       });

       setAllMerchant(filteredData);
    }


    
  

    return (
        <>
           <ProgressSpinner  show={showSpinner} />
           <div className="container-fluid">
                <div className="card">
                    <div className="card-header">
                         <h1 className="card-title">Merchants</h1>
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
                                    <th>Phone</th>
                                    <th>Email</th>
                                    <th>Address</th>
                                    <th></th>
                                </tr>
                             </thead>
                             <tbody>
                                 {
                                    allMerchant?.length
                                    ? allMerchant.map((x,y)=>
                                      <tr>
                                          <td>{y + 1}</td>
                                          <td>{x.name}</td>
                                          <td>{x?.phone}</td>
                                          <td>{x?.email}</td>
                                          <td>{x?.address}</td>
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
                                                        <a href="#" onClick={()=>navigate('/dashboard/merchant_detail/'+x.imei)} className="dropdown-item">
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


           <Modal show={showAddMerchantModal} onHide={handleHideAddModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Merchant</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmitAddMerchant}>
                        <Form.Group className="mb-3" >
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                value={name}
                                onChange={(e)=>setName(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" >
                            <Form.Label>Phone</Form.Label>
                            <Form.Control
                                type="text"
                                value={phone}
                                onChange={(e)=>setPhone(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" >
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="text"
                                value={email}
                                onChange={(e)=>setEmail(e.target.value)}
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

                        <Button variant="primary" type="submit">
                            submit
                        </Button>


                    </Form>
                </Modal.Body>
            </Modal>

            <Modal show={showUpdateMerchantModal} onHide={handleHideEditModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Merchant</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmitUpdateMerchant}>
                    <Form.Group className="mb-3" >
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                value={name}
                                onChange={(e)=>setName(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" >
                            <Form.Label>Phone</Form.Label>
                            <Form.Control
                                type="text"
                                value={phone}
                                onChange={(e)=>setPhone(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" >
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="text"
                                value={email}
                                onChange={(e)=>setEmail(e.target.value)}
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

                        <Button variant="primary" type="submit">
                            submit
                        </Button>                      
                    </Form>
                </Modal.Body>
            </Modal>

        </>
    );
}

export default Merchant;