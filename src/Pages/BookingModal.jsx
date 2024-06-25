import { ImCancelCircle } from "react-icons/im";
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createBooking } from '../Features/Dispatch/Dispatch'; // Make sure to import the correct action

const BookingModal = ({ plan, onClose }) => {
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [transportation, setTransportation] = useState('');
  const [departure, setDeparture] = useState('');
  const [arrival, setArrival] = useState('');
  const [timing, setTiming] = useState('');
  const dispatch = useDispatch();
  
  const handleBooking = (e) => {
    e.preventDefault();
    dispatch(createBooking({
      customerName, 
      customerEmail, 
      customerPhone, 
      transportation, 
      departure, 
      arrival, 
      timing 
    }));
    onClose(); // Close the modal after booking
  };
  
  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-md p-4 w-full max-w-md h-full max-h-[80%] overflow-y-auto relative">
        <button 
          type="button" 
          className="absolute top-3 right-0 text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          <ImCancelCircle size={24} />
        </button>
        <form onSubmit={handleBooking}>
          <h2 className="text-xl font-bold mb-4">Book Tour: {plan.title}</h2>
          
          <div className="mb-2">
            <label className="block text-gray-700">Customer Name</label>
            <input 
              type="text" 
              className="w-full p-2 border border-gray-300 rounded" 
              value={customerName} 
              onChange={(e) => setCustomerName(e.target.value)} 
              placeholder="Customer Name" 
              required 
            />
          </div>
          
          <div className="mb-2">
            <label className="block text-gray-700">Customer Email</label>
            <input 
              type="email" 
              className="w-full p-2 border border-gray-300 rounded" 
              value={customerEmail} 
              onChange={(e) => setCustomerEmail(e.target.value)} 
              placeholder="Customer Email" 
              required 
            />
          </div>
          
          <div className="mb-2">
            <label className="block text-gray-700">Phone No</label>
            <input 
              type="text" 
              className="w-full p-2 border border-gray-300 rounded" 
              value={customerPhone} 
              onChange={(e) => setCustomerPhone(e.target.value)} 
              placeholder="Customer Phone" 
              required 
            />
          </div>
          
          <div className="mb-2">
            <label className="block text-gray-700">Transportation</label>
            <input 
              type="text" 
              className="w-full p-2 border border-gray-300 rounded" 
              value={transportation} 
              onChange={(e) => setTransportation(e.target.value)} 
              placeholder="Transportation" 
              required 
            />
          </div>

          <div className="mb-2">
            <label className="block text-gray-700">Departure</label>
            <input 
              type="text" 
              className="w-full p-2 border border-gray-300 rounded" 
              value={departure} 
              onChange={(e) => setDeparture(e.target.value)} 
              placeholder="Departure" 
              required 
            />
          </div>
          
          <div className="mb-2">
            <label className="block text-gray-700">Arrival</label>
            <input 
              type="text" 
              className="w-full p-2 border border-gray-300 rounded" 
              value={arrival} 
              onChange={(e) => setArrival(e.target.value)} 
              placeholder="Arrival" 
              required 
            />
          </div>
          
          <div className="mb-2">
            <label className="block text-gray-700">Timing</label>
            <input 
              type="text" 
              className="w-full p-2 border border-gray-300 rounded" 
              value={timing} 
              onChange={(e) => setTiming(e.target.value)} 
              placeholder="Timing" 
              required 
            />
          </div>
          
          <div className="flex justify-between mt-4">
            <button type="button" className="bg-gray-500 text-red-600 px-4 py-2 rounded" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="bg-blue-500 text-red-600 px-4 py-2 rounded">
              Book Now
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookingModal;
