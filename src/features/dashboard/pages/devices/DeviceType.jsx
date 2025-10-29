import { useEffect, useState } from 'react';
import {useGetDeviceTypesQuery, useCreateDeviceTypeMutation} from './deviceTypeApiSlice'; 
import { Modal, Button, Form } from 'react-bootstrap';
import Swal from 'sweetalert2';
import ProgressSpinner from '../../../../components/ProgressSpinner';

const DeviceType = (props)=>{
    
    const {data: deviceTypes, isLoading: isDeviceTypesLoading, isSuccess: isDeviceTypesLoaded, refetch: refetchDeviceTypes} = useGetDeviceTypesQuery();
    const [createDeviceType, {data:deviceTypeSaveResp, isSuccess:isDeviceTypeSaveSuccess, isError: isDeviceTypeErrorSave}] = useCreateDeviceTypeMutation();
    const [allDeviceTypes, setAllDeviceTypes] = useState([]);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showSpinner, setShowSpinner] = useState(false);

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");

    useEffect(()=>{
        refetchDeviceTypes();
    },[]); 

    useEffect(()=>{
        if(deviceTypes){
            setAllDeviceTypes(deviceTypes.data);
        }
    },[
        deviceTypes,
        isDeviceTypesLoaded,
        isDeviceTypesLoading
    ]);

    const handleShowAddModal = ()=>{
        setShowAddModal(true);
        setName("");
        setDescription("");
    }

    const handleHideAddModal = ()=>{
        setShowAddModal(false);
    }

    const handleSubmitAddDeviceType = async(e)=>{
        e.preventDefault();
        try{
            setShowAddModal(false);
            setShowSpinner(true);
            const resp = await createDeviceType({
                name: name,
                description: description
            }).unwrap();
            if(resp.success == true){
                setShowSpinner(false);
                Swal.fire({title: "Successfull", text:resp.message, icon:"success", timer:2000});
                refetchDeviceTypes();
            }
            else{
                setShowSpinner(false);
                Swal.fire({title: "Error", text:resp.message, icon:"warning", timer:2000});
            }
        }
        catch(err){
           setShowSpinner(false);
           setShowAddModal(true);
           Swal.fire({title: "Error", text:err?.data?.message, icon:"warning", timer:2000});
        }
    }

    return (
        <>
           <ProgressSpinner show={showSpinner} />
           <div className="container-fluid">
                <div className="card">
                    <div className="card-header">
                         <h1 className="card-title">Device Types</h1>
                         <div className='row'>
                            <button className='btn btn-primary ml-auto' style={{width:'100px'}} onClick={handleShowAddModal}>
                                <i className='fa fa-plus'></i> Add
                            </button>
                         </div>
                    </div>
                    <div className="card-body" style={{width:'100%', height:'78vh', overflowY: 'auto'}}>
                         <table className="table table-hashed">
                             <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Name</th>
                                    <th>Description</th>
                                    <th>Created At</th>
                                </tr>
                             </thead>
                             <tbody>
                                 {
                                    allDeviceTypes?.length
                                    ? allDeviceTypes.map((x, y)=>
                                      <tr key={x.id}>
                                          <td>{y + 1}</td>
                                          <td>{x.name}</td>
                                          <td>{x.description}</td>
                                          <td>{x.createdAt ? new Date(x.createdAt).toLocaleDateString() : 'N/A'}</td>
                                      </tr>
                                    )
                                    :<tr><td colSpan="4" className="text-center">No device types available</td></tr>
                                 }
                             </tbody>
                         </table>
                    </div>
                    <div className="card-footer"></div>
                </div>
           </div>

           <Modal show={showAddModal} onHide={handleHideAddModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Device Type</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmitAddDeviceType}>
                        <Form.Group className="mb-3" controlId="name">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                value={name}
                                onChange={(e)=>setName(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="description">
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                value={description}
                                onChange={(e)=>setDescription(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default DeviceType;
