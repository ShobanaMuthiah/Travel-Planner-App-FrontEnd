import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const Reset = () => {
const [password,setpassword]=useState('');
const [msg,setmsg]=useState('');
const [toast,settoast]=useState(false)

const navig=useNavigate()
const {token}=useParams();


const handleSubmit=async(e)=>{
    e.preventDefault();
    const payload={password}
    await axios.post(`https://travel-planner-app-backend.onrender.com/api/auth/reset-password/${token}`,payload)
    .then(res=>{setmsg(res.data.message)
settoast(true)
        setTimeout(() => {
            navig('/login')            
        }, 1000);
            setpassword('');
    })
    .catch(err=>{
        setmsg(err.response.data.message);
settoast(true)

    })


}

    return (
        <div>
            <h1 className='title'>Reset Password</h1>
            <div className="card-center m-3">
                <div className="card card-format text-center">

                <form onSubmit={handleSubmit}>
            <div className="row">
                <div className="row-cols-sm-2">
                <label className='col-12 col-sm-4 p-2 text-sm-end'>
                    New Password:
                </label>
                <input className='border-black' required type="password" name="password" value={password} onChange={(e)=>setpassword(e.target.value)}/><br />
<br />
                </div>
            </div>
                <button className="btn" type='submit' >
                    Reset
                </button>
                {toast && (
                        <div className="toast-container position-fixed top-0 end-0 p-3" >
                            <div className="toast show" role="alert" aria-live="assertive" aria-atomic="true">
                              
                            <div className="d-flex">
                            <div className="toast-body fw-bolder w-100  text-bg-info">
                                    {msg}
                                </div>
                            
                                <div className="toast-header  ">
                                    
    <button type="button" class="btn-close me-2 m-auto" data-bs-dismiss="toast" aria-label="Close" onClick={()=>settoast(false)}></button>
                                </div>
                                
                            </div>
                                
                            </div>
                        </div>
                    )}
            </form>

                </div>
            </div>
        </div>
    );
};

export default Reset;