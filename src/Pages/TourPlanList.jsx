import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchTourPlans, removeTourPlan } from '../Features/Dispatch/Dispatch';

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
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {tourPlans.map((plan) => (
          <div key={plan._id} className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-md">
            <div className="p-4 row">
            <img src={plan.image} alt={plan.title} className="img w-28 col  object-cover" />
            
              <div className="col">
              <h3 className="text-xl font-bold mb-2">{plan.title}</h3>
              <p className="text-gray-700 mb-2">{plan.description}</p>
              <p className="text-gray-700 mb-2">Duration: {plan.duration}</p>
              <p className="text-gray-700 mb-2">Price: ${plan.price}</p>

              </div>
              <div className="flex justify-end">
                <button
                  className="bg-red-500 text-red-950 font-bold px-4 py-2 rounded"
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

export default TourPlanList;
