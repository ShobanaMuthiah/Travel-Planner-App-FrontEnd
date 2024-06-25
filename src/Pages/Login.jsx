import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../Features/Dispatch/Dispatch'; // Adjust the import path as necessary
import { Button } from 'flowbite-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    e.preventDefault();
    dispatch(login(email, password)); // Assuming login action returns a promise
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
          <Button gradientMonochrome="cyan" type="submit" className=" px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
            Login
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Login;
