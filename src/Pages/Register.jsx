import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { register } from '../Features/Dispatch/Dispatch'; // Adjust the import path as necessary
import { Button } from 'flowbite-react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('customer');

  const [registrationSuccess, setRegistrationSuccess] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const dispatch = useDispatch();

  const handleRegister = async (e) => {
    e.preventDefault();
    setSubmitted(true);
    try {
      const result = await dispatch(register({ name, email, password, role }));
      if (register.fulfilled.match(result)) {
        setName('');
        setEmail('');
        setPassword('');
        setRole('customer');
        setRegistrationSuccess(true);
        setErrorMessage('');
      } else {
        throw new Error(result.error.message);
      }
    } catch (error) {
      setRegistrationSuccess(false);
      setErrorMessage('Registration failed: ' + (error.message || 'Unknown error'));
    }
  };

  return (
    <div className="card mx-auto max-w-md p-6">
      <form onSubmit={handleRegister} className="space-y-4">
        <div className="flex flex-wrap -mx-2">
          <div className="w-full px-2">
            <label htmlFor="name" className="block mb-1">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>

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

          <div className="w-full px-2">
            <label htmlFor="role" className="block mb-1">Role</label>
            <select
              id="role"
              name="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
            >
              <option value="customer">Customer</option>
              <option value="admin">Admin</option>
            </select>
          </div>
        </div>

        <div className="flex justify-center mt-6">
          <Button type="submit" gradientMonochrome="cyan" className="rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
            Register
          </Button>
        </div>
        
        {submitted && (
          <div className="flex justify-center mt-4">
            {registrationSuccess === true && (
              <>
              <span className="text-green-500">Registration Successful.  Check your mail!!</span>
              
              </>
            )}
            {registrationSuccess === false && (
              <span className="text-red-500">{errorMessage}</span>
            )}
          </div>
        )}
      </form>
    </div>
  );
};

export default Register;
