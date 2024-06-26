import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const Activate = () => {
  const [message, setMessage] = useState('');
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const { token } = useParams();

  useEffect(() => {
    const activateAccount = async () => {
      try {
        const response = await axios.get(`https://travel-planner-app-backend.onrender.com/api/auth/activate/${token}`);
        setMessage(response.data.message);
        setError(false);
      } catch (err) {
        setMessage('Failed to activate the account. The token might be invalid or expired.');
        setError(true);
      }
    };

    activateAccount();
  }, [token]);

  const handleLoginClick = () => {
    navigate('/login');
  };

  return (
    <div>
      <div className="card-center">
        <div className="card card-format text-center p-4">
          <div className="card-header">
            Verification
          </div>
          <div className="card-body">
            <p className="card-title fa">
              <i className="fa fa-check-square-o" aria-hidden="true"></i>
            </p>
            <p className="card-text">{message}</p>
            {!error && (
              <button onClick={handleLoginClick} className="btn btn-success text-black">
                Click here to Login
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Activate;