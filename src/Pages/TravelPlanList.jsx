import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchTravelPlans, removeTravelPlan } from '../Features/Dispatch/Dispatch';

const TravelPlanList = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const travelPlans = useSelector((state) => state.travelPlans.travelPlans);

  useEffect(() => {
    if (token) {
      dispatch(fetchTravelPlans(token));
    }
  }, [dispatch, token]);

  const handleDelete = (_id) => {
    dispatch(removeTravelPlan(_id));
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Travel Plans</h2>
      <div className="grid grid-cols-1  gap-4">
        {travelPlans.map((plan) => (
          <div key={plan._id} className="bg-white row border border-gray-200 rounded-lg overflow-hidden shadow-md">
           <div className="col">
           <img src={plan.image} alt={plan.destination} className="w-full h-48 object-cover" />
           </div>
            <div className="p-4 col">
              <h3 className="text-xl font-bold mb-2"> {plan.destination}</h3>
              <p className="text-gray-700 mb-2">{plan.details}</p>
              <p className="text-gray-700 mb-2">Transportation :{plan.transportation}</p>
              <p className="text-gray-700 mb-2">Departure: {plan.departure}</p>
              <p className="text-gray-700 mb-2">Arrival: {plan.arrival}</p>
              <p className="text-gray-700 mb-2">Travel Duration: {plan.timing}</p>




              <div className="flex justify-end">
                <button
                  className="bg-red-500 text-green font-bold px-4 py-2 rounded"
                  onClick={() => handleDelete(plan._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TravelPlanList;
