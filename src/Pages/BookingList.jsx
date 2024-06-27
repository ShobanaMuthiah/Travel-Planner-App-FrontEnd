import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchBookings, removeBooking } from '../Features/Dispatch/Dispatch';
import { Button, Spinner } from 'flowbite-react';

const BookingList = () => {
  const dispatch = useDispatch();
  const [loading,setloading]=useState(false)
  const token = useSelector((state) => state.auth.token);
  const bookings = useSelector((state) => state.bookings.bookings);

  useEffect(() => {
    if (token) {
      setloading(true)
      dispatch(fetchBookings(token));
      setloading(false)

    }
  }, [dispatch, token]);

  const handleDelete = async (_id) => {
    dispatch(removeBooking(_id));
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Bookings</h2>
      
    { 
    
    loading ? (
      <div className="flex justify-center items-center h-screen">
        <Spinner color="success" size="lg" aria-label="Loading" />
      </div>
    ) : 
    ( <div className="overflow-x-auto">
        <table className="min-w-full border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-4 py-2 text-left">Customer Name</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Transportation</th>
              <th className="border border-gray-300 px-4 py-2 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking._id}>
                <td className="border border-gray-300 px-4 py-2">{booking.customerName}</td>
                <td className="border border-gray-300 px-4 py-2">{booking.transportation}</td>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  <Button color='failure'
                    onClick={() => handleDelete(booking._id)}
                    className="  rounded hover:bg-red-600 focus:outline-none"
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>)}
    </div>
  );
};

export default BookingList;
