import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
{/* <FaEye /> */}

const Reset = () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [msg, setMsg] = useState('');
    const [toast, setToast] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const navigate = useNavigate();
    const { token } = useParams();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setMsg("Passwords do not match");
            setToast(true);
            return;
        }

        const payload = { password };
        await axios.post(`https://travel-planner-app-backend.onrender.com/api/auth/reset-password/${token}`, payload)
            .then(res => {
                setMsg(res.data.message);
                setToast(true);
                setTimeout(() => {
                    navigate('/login');
                }, 1000);
                setPassword('');
                setConfirmPassword('');
            })
            .catch(err => {
                setMsg(err.response.data.message);
                setToast(true);
            });
    };

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
                                <div className='col-12 col-sm-8 p-2 text-sm-end'>
                                    <div className="input-group">
                                        <input
                                            className='border-black form-control'
                                            required
                                            type={showPassword ? "text" : "password"}
                                            name="password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="btn btn-outline-secondary"
                                        >
                                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="row-cols-sm-2">
                                <label className='col-12 col-sm-4 p-2 text-sm-end'>
                                    Confirm Password:
                                </label>
                                <div className='col-12 col-sm-8 p-2 text-sm-end'>
                                    <div className="input-group">
                                        <input
                                            className='border-black form-control'
                                            required
                                            type={showConfirmPassword ? "text" : "password"}
                                            name="confirmPassword"
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                            className="btn btn-outline-secondary"
                                        >
                                            {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <button className="btn" type='submit'>
                            Reset
                        </button>
                        {toast && (
                            <div className="toast-container position-fixed top-0 end-0 p-3">
                                <div className="toast show" role="alert" aria-live="assertive" aria-atomic="true">
                                    <div className="d-flex">
                                        <div className="toast-body fw-bolder w-100 text-bg-info">
                                            {msg}
                                        </div>
                                        <div className="toast-header">
                                            <button
                                                type="button"
                                                className="btn-close me-2 m-auto"
                                                data-bs-dismiss="toast"
                                                aria-label="Close"
                                                onClick={() => setToast(false)}
                                            ></button>
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
