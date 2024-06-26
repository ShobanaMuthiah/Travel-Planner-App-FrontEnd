import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../Slices/authSlice';
import bookingReducer from '../Slices/bookingSlice';
import travelPlanReducer from '../Slices/TravelPlanSlice';
import tourPlanReducer from '../Slices/tourPlanSlice';
import {thunk} from 'redux-thunk';


const store = configureStore({
  reducer: {
    auth: authReducer,
    bookings: bookingReducer,
    travelPlans: travelPlanReducer,
    tourPlans: tourPlanReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});

export default store;


