import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../Features/Dispatch/Dispatch'; 
import { Button } from 'flowbite-react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginSuccess, setLoginSuccess] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const dispatch = useDispatch();
  const navigate=useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setSubmitted(true);
    try {
      const result = await dispatch(login({ email, password }));
      if (login.fulfilled.match(result)) {
        setEmail('');
        setPassword('');
        setLoginSuccess(true);
        setErrorMessage('');
        setTimeout(() => {
          navigate('/')
        }, 2000);

      } else {
        throw new Error(result.error.message);
      }
    } catch (error) {
      setLoginSuccess(false);
      setErrorMessage('Login failed: Invalid mail or password ' );
      
    }
  };

  return (
    <div className="card mx-auto max-w-md p-6">
      <form onSubmit={handleLogin} className="space-y-4">
        <div className="flex flex-wrap -mx-2">
          <div className="w-full px-2">
            <label htmlFor="email" className="block mb-1">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>

          <div className="w-full px-2">
            <label htmlFor="password" className="block mb-1">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
        </div>

        <div className="flex justify-center mt-6">
          <Button gradientMonochrome="cyan" type="submit" className="rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
            Login
          </Button>
        </div>
      </form>
      
      {submitted && (
        <div className="flex justify-center mt-4">
          {loginSuccess === true && (
            <span className="text-green-500">Login Successful</span>
          )}
          {loginSuccess === false && (
            <span className="text-red-500">{errorMessage}</span>
          )}
        </div>
      )}
    </div>
  );
};

export default Login;
