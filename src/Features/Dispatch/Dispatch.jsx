import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

import {
  updateAuthData,
  clearAuth,
  updateBookings,
  addNewBooking,
  deleteBooking,
  updateTravelPlans,
  addNewTravelPlan,
  modifyTravelPlan,
  deleteTravelPlan,
  deleteTourPlan,
  modifyTourPlan,
  addNewTourPlan,
  updateTourPlans,
} from '../Update/Update';

//Authentication
export const login = createAsyncThunk('auth/login', async ({ email, password }) => {
  try {
    const res = await axios.post('https://travel-planner-app-backend.onrender.com/api/auth/login', { email, password });
    const { user, token } = res.data;

    if (user.role === 'admin') {
      user.isAdmin = true; 
    }

    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));

    updateAuthData(user, token)
  } catch (error) {
    console.error('Login failed', error);
    throw error;
  }
});


export const register = createAsyncThunk('register',
  async ({name, email, password, role}) => {
    try {
      await axios.post('https://travel-planner-app-backend.onrender.com/api/auth/register', { name, email, password, role });
   
    } catch (error) {
      console.error('Registration failed', error);
    }
  }
)

export const logout = () => {
  clearAuth();
};

// Bookings
export const fetchBookings =createAsyncThunk(
  'bookings/fetchBookings',

  async (token) => {
    try {
      const res = await axios.get('https://travel-planner-app-backend.onrender.com/api/bookings', { headers: { 'Authorization': token } });
      updateBookings(res.data);
    } catch (error) {
      console.error('Failed to fetch bookings', error);
    }
  }
)

export const fetchCusBookings =createAsyncThunk(
  'bookings/fetchCusBookings',

  async (token) => {
  
    try {
      const user = JSON.parse(localStorage.getItem('user'))
      console.log(user)
    token=localStorage.getItem('token')
   console.log(token)
  

if (!user) {
  console.log('User not found in localStorage');
  updateBookings([]);
  
}
if (!user._id) {
  console.log('No bookings found for the user');
  updateBookings([]);

}

    const id=  user._id;
   
    console.log(id);
    const resData=await axios.get(`https://travel-planner-app-backend.onrender.com/api/bookings/${id}`, { headers: { 'Authorization': token } })
      updateBookings(resData.data);
    } catch (error) {
      console.error('Failed ', error);
    }
  }
)

export const createBooking = createAsyncThunk('booking/createBooking',
  async (bookingData, token) => {
    try {
      console.log(token)
      token=localStorage.getItem('token')
      const res = await axios.post('https://travel-planner-app-backend.onrender.com/api/bookings/create', bookingData, { headers: { 'Authorization': token } });
      addNewBooking(res.data.newBooking);
    } catch (error) {
      console.error('Booking failed', error);
    }
  }
)

export const removeBooking = createAsyncThunk('bookings/removeBooking',
  async (_id, token) => {
    try {
      token=localStorage.getItem('token')
      await axios.delete(`https://travel-planner-app-backend.onrender.com/api/bookings/${_id}`, { headers: { 'Authorization': token } });
      deleteBooking(_id);
    } catch (error) {
      console.error('Failed to delete booking', error);
    }
  }
)

// Travel Plans
export const fetchTravelPlans = createAsyncThunk('fetchTravelPlans',
  async (token) => {
    try {
      token=localStorage.getItem('token')

      const res = await axios.get('https://travel-planner-app-backend.onrender.com/api/travel-plans', { headers: { 'Authorization': token } });
      updateTravelPlans(res.data);
    } catch (error) {
      console.error('Failed to fetch travel plans', error);
    }
  }
)

export const createTravelPlan = createAsyncThunk('travel-plans/createTravelPlan',
  async (planData, token) => {
    token=localStorage.getItem('token')

    try {
      const res = await axios.post('https://travel-planner-app-backend.onrender.com/api/travel-plans/create', planData, { headers: { 'Authorization': token } });
      addNewTravelPlan(res.data.newTravelPlan);
    } catch (error) {
      console.error('Failed to create travel plan', error);
    }
  }
)

export const editTravelPlan = createAsyncThunk('editTravelplan',
  async (id, planData, token) => {
    token=localStorage.getItem('token')

    try {
      const res = await axios.put(`https://travel-planner-app-backend.onrender.com/api/travel-plans/${id}`, planData, { headers: { 'Authorization': token } });
      modifyTravelPlan(res.data);
    } catch (error) {
      console.error('Failed to update travel plan', error);
    }
  }
)

export const removeTravelPlan = createAsyncThunk('removeTravelPlan',
  async (_id, token) => {
    token=localStorage.getItem('token')
    try {
      await axios.delete(`https://travel-planner-app-backend.onrender.com/api/travel-plans/${_id}`, { headers: { 'Authorization': token } });
      deleteTravelPlan(_id);
    } catch (error) {
      console.error('Failed to delete travel plan', error);
    }
  }
)

// Tour Plans
export const fetchTourPlans = createAsyncThunk('fetchTourPlans',
  async () => {
    try {
      const res = await axios.get('https://travel-planner-app-backend.onrender.com/api/tour-plans');
      updateTourPlans(res.data);
    } catch (error) {
      console.error('Failed to fetch travel plans', error);
    }
  }
)

export const createTourPlan = createAsyncThunk('createTourPlan',
  async (planData, token) => {
    token=localStorage.getItem('token')

    try {
      const res = await axios.post('https://travel-planner-app-backend.onrender.com/api/tour-plans/create', planData, { headers: { 'Authorization': token } });
      addNewTourPlan(res.data);
    } catch (error) {
      console.error('Failed to create travel plan', error);
    }
  }
)

export const editTourPlan = createAsyncThunk('editourplan',
  async (id, planData, token) => {
    token=localStorage.getItem('token')

    try {
      const res = await axios.put(`https://travel-planner-app-backend.onrender.com/api/tour-plans/${id}`, planData, { headers: { 'Authorization': token } });
      modifyTourPlan(res.data);
    } catch (error) {
      console.error('Failed to update travel plan', error);
    }
  }
)

export const removeTourPlan = createAsyncThunk('removetourplan',
  async (id, token) => {
    token=localStorage.getItem('token')

    try {
      await axios.delete(`https://travel-planner-app-backend.onrender.com/api/tour-plans/${id}`, { headers: { 'Authorization': token } });
      deleteTourPlan(id);
    } catch (error) {
      console.error('Failed to delete travel plan', error);
    }
  }
)
