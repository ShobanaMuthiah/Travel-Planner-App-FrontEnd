import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchTourPlans } from '../Features/Dispatch/Dispatch';
import BookingModal from './BookingModal';
import { Button } from 'flowbite-react';

const Home = () => {
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
      <div className="row gap-4">
        {tourPlans.map((plan) => (
          <div key={plan._id} className="border col border-gray-200 rounded-lg shadow-md overflow-hidden">
            
              <img
                src={plan.image}
                alt={plan.title}
                className="w-full img object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-bold mb-2">{plan.title}</h3>
                <p className="text-gray-700 mb-2">{plan.description}</p>
                <p className="text-gray-700 mb-2">Duration: {plan.duration}</p>
                <p className="text-gray-700 mb-4">Price: ${plan.price}</p>
                <div className="flex justify-between">
                  <Button gradientMonochrome="lime" pill
                    
                    onClick={() => handleBookNow(plan)}
                  >
                    Book Now
                  </Button>
                </div>
              </div>
          </div>
        ))}
      </div>
      {selectedPlan && <BookingModal plan={selectedPlan} onClose={handleCloseModal} />}
    </div>
  );
};

export default Home;
