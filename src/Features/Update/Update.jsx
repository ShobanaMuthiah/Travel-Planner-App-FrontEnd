
import store from '../Stores/Store';
import { setAuthData, clearAuthData } from '../Slices/authSlice';
import { setBookings, addBooking, removeBooking } from '../Slices/bookingSlice';
import { setTravelPlans, addTravelPlan, updateTravelPlan, removeTravelPlan } from '../Slices/TravelPlanSlice';
import { addTourPlans, removeTourPlan, setTourPlans, updateTourPlan } from '../Slices/tourPlanSlice';

// Auth updates
export const updateAuthData = (user, token) => {
  store.dispatch(setAuthData({ user, token }));
};

export const clearAuth = () => {
  store.dispatch(clearAuthData());
};

// Booking updates
export const updateBookings = (bookings) => {
  store.dispatch(setBookings(bookings));
};

export const addNewBooking = (booking) => {
  store.dispatch(addBooking(booking));
};

export const deleteBooking = (_id) => {
  store.dispatch(removeBooking(_id));
};

// Travel plan updates
export const updateTravelPlans = (plans) => {
  store.dispatch(setTravelPlans(plans));
};

export const addNewTravelPlan = (plan) => {
  store.dispatch(addTravelPlan(plan));
};

export const modifyTravelPlan = (plan) => {
  store.dispatch(updateTravelPlan(plan));
};

export const deleteTravelPlan = (_id) => {
  store.dispatch(removeTravelPlan(_id));
};

// Tour plan updates
export const updateTourPlans = (plans) => {
  store.dispatch(setTourPlans(plans));
};

export const addNewTourPlan = (plan) => {
  store.dispatch(addTourPlans(plan));
};

export const modifyTourPlan = (plan) => {
  store.dispatch(updateTourPlan(plan));
};

export const deleteTourPlan = (_id) => {
  store.dispatch(removeTourPlan(_id));
};
