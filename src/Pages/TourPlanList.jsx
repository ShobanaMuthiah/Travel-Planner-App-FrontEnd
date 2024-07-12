import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchTourPlans, removeTourPlan } from '../Features/Dispatch/Dispatch';
import { Button } from 'flowbite-react';

const TourPlanList = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const tourPlans = useSelector((state) => state.tourPlans.tourPlans);

  useEffect(() => {
    if (token) {
      dispatch(fetchTourPlans(token));
    }
  }, [dispatch, token]);

  const handleDelete = (_id) => {
    dispatch(removeTourPlan(_id));
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Tour Plans</h2>
      <div className="grid grid-cols-1  gap-4">
        {tourPlans.map((plan) => (
        
          <div key={plan._id} className="bg-white row border border-gray-200 rounded-lg overflow-hidden shadow-md">
         
         <div className="col-12 p-2 col-sm">
            <img src={plan.image} alt={plan.title} className="w-full h-100  object-cover" />
            </div>
            
              <div className="p-4 col">
              <h3 className="text-xl font-bold mb-2">{plan.title}</h3>
              <p className="text-gray-700 mb-2">{plan.description}</p>
              <p className="text-gray-700 mb-2">Duration: {plan.duration}</p>
              <p className="text-gray-700 mb-2">Price: ${plan.price}</p>

              <div className="flex justify-end m-2 mt-0">
                <Button
                  gradientMonochrome="failure"
                  onClick={() => handleDelete(plan._id)}
                >
                  Delete
                </Button>
              </div>
              </div>

          </div>
        ))}
      </div>
    </div>
  );
};

export default TourPlanList;
