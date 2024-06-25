import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchTravelPlans } from '../Features/Dispatch/Dispatch';
import BookingModal from './BookingModal';

const UserTravel = () => {
  const dispatch = useDispatch();
  const travelPlans = useSelector((state) => state.travelPlans.travelPlans);
  
  const [selectedPlan, setSelectedPlan] = useState(null);

  useEffect(() => {
    dispatch(fetchTravelPlans());
  }, [dispatch]);

  const handleBookNow = (plan) => {
    setSelectedPlan(plan);
  };

  const handleCloseModal = () => {
    setSelectedPlan(null);
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Travel Plans</h2>
        {travelPlans.map((plan) => (
      <div className=" gap-4">

          <div key={plan._id} className="border row  border-gray-200 rounded-lg shadow-md overflow-hidden">
            
            <div className="col">
            <img
                src={plan.image}
                alt={plan.destination}
                className="w-full img object-cover"
              />
            </div>
              <div className="p-4 col">
                <h3 className="text-xl font-bold mb-2">{plan.destination}</h3>
                <p className="text-gray-700 mb-2">{plan.details}</p>
                <p className="text-gray-700 mb-2">Transportation: {plan.transportation}</p>
                <p className="text-gray-700 mb-4">Departure: ${plan.departure}</p>
                <p className="text-gray-700 mb-4">Arrival: ${plan.arrival}</p>
                <p className="text-gray-700 mb-4">Duration: ${plan.timing}</p>


                <div className="flex justify-between">
                  <button
                    className=" text-green-950  px-4 py-2 rounded"
                    onClick={() => handleBookNow(plan)}
                  >
                    Book Now
                  </button>
                </div>
              </div>
          </div>
      </div>

        ))}
      {selectedPlan && <BookingModal plan={selectedPlan} onClose={handleCloseModal} />}
    </div>
  );
};

export default UserTravel;
