import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCusBookings } from '../Features/Dispatch/Dispatch';
import { removeBooking } from '../Features/Slices/bookingSlice';

const MyBooking = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const bookings = useSelector((state) => state.bookings.bookings);

  useEffect(() => {
    if (token) {
      dispatch(fetchCusBookings(token));
    }
  }, [dispatch, token]);
  const handleDelete = async (_id) => {
    dispatch(removeBooking(_id));
  };
 

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">My Bookings</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {bookings && bookings.length > 0 ? (
          bookings.map((booking) => (
            <div key={booking._id} className="border border-gray-200 rounded-lg shadow-md overflow-hidden">
              <div className="p-4">
                <h3 className="text-xl font-bold mb-2">{booking.tourTitle}</h3>
                <p className="text-gray-700 mb-2">Customer Name: {booking.customerName}</p>
                <p className="text-gray-700 mb-2">Email: {booking.customerEmail}</p>
                <p className="text-gray-700 mb-2">Phone: {booking.customerPhone}</p>
                <p className="text-gray-700 mb-2">Transportation: {booking.transportation}</p>
                <p className="text-gray-700 mb-2">Departure: {booking.departure}</p>
                <p className="text-gray-700 mb-2">Arrival: {booking.arrival}</p>
                <p className="text-gray-700 mb-2">Timing: {booking.timing}</p>
            <button onClick={() => handleDelete(booking._id)}>Delete</button>
                
              </div>
            </div>
          ))
        ) : (
          <div className="text-xl">Bookings not found</div>
        )}
      </div>
    </div>
  );
};

export default MyBooking;
