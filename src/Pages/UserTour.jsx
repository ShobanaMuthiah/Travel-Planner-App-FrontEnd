import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchTourPlans } from '../Features/Dispatch/Dispatch';
import BookingModal from './BookingModal';

const UserTour = () => {
  const dispatch = useDispatch();
  const tourPlans = useSelector((state) => state.tourPlans.tourPlans);
  const [selectedPlan, setSelectedPlan] = useState(null);

  useEffect(() => {
    dispatch(fetchTourPlans());
  }, [dispatch]);

  const handleBookNow = (plan) => {
    setSelectedPlan(plan);
  };

  const handleCloseModal = () => {
    setSelectedPlan(null);
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Tour Plans</h2>
        {tourPlans.map((plan) => (
      <div className=" gap-4">

          <div key={plan._id} className="border row  border-gray-200 rounded-lg shadow-md overflow-hidden">
            
            <div className="col">
            <img
                src={plan.image}
                alt={plan.title}
                className="w-full img object-cover"
              />
            </div>
              <div className="p-4 col">
                <h3 className="text-xl font-bold mb-2">{plan.title}</h3>
                <p className="text-gray-700 mb-2">{plan.description}</p>
                <p className="text-gray-700 mb-2">Duration: {plan.duration}</p>
                <p className="text-gray-700 mb-4">Price: ${plan.price}</p>
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

export default UserTour;
