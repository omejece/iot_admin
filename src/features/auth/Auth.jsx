



import '../../assets/css/mystyle.css';
import { useState } from 'react';
import {jwtDecode } from 'jwt-decode';
import { useLoginMutation } from './authApiSlice';
import { setCredentials } from './authSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';



const Auth = (props)=>{
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [loginStatus,setLoginStatus] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");

    const [login,{isLoading,isSuccess}] = useLoginMutation();

    
    const handleLogin = async (e)=>{
        e.preventDefault();
        try{
            setLoginStatus("");
            const result = await login({email,password}).unwrap();
            const user = jwtDecode (result.data.token);
            dispatch(setCredentials({token:result.data.token,refresh:result.data.token,user:user}));
            navigate('/dashboard');
        }
        catch(err){
            setLoginStatus(err?.data?.detail ? err?.data?.detail : 'invalid login details');
        }
    }

    return (
        <div className='container-fluid' style={{backgroundColor:'white',height:'100vh'}}>
            <div className='row' style={{backgroundColor:'white',height:'100vh'}}>
                <div className='col-md-8 col-lg-8 col-sm-12 login-background'>
                </div>
                <div className='col-md-4 col-lg-4 col-sm-12' style={{height:'100%',padding:'5%'}}>
                        <form onSubmit={handleLogin}>
                            <div class="login-user-info">
                                <div class="login-heading">
                                    <h4 style={{color:'black'}}>Sign In your IoT dashboard</h4>
                                </div>
                                <div class="form-group">
                                    <label class="col-form-label" style={{color:'black'}}>Email Address</label>
                                    <input type="text" value={email} onChange={(e)=>setEmail(e.target.value)} class="form-control" required/>
                                </div>
                                <div class="form-wrap">
                                    <label class="col-form-label" style={{color:'black'}}>Password</label>
                                    <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} class="pass-input form-control" required />
                                </div>
                                <div class="form-wrap form-wrap-checkbox">
                                    <div class="text-end">
                                        <a href="forgot-password.html" class="forgot-link">Forgot Password?</a>
                                    </div>
                                </div>
                                <div class="form-wrap">
                                    <button type="submit" class="btn btn-info">Sign In</button>
                                </div>

                                {
                                  loginStatus != ""
                                  ? <div className='alert alert-danger' style={{justifyContent:'center', alignItems:'center'}}>
                                     {loginStatus}
                                    </div>
                                  : <></>
                                }

                            </div>
                        </form>
                </div>
            </div>
        </div>
    )
}


export default Auth;