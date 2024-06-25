import { createSlice } from '@reduxjs/toolkit';


const tourPlanSlice = createSlice({
  name: 'tourPlans',
  initialState:{ 
    tourPlans: []
},
  reducers: {
    setTourPlans(state, action) {
      state.tourPlans = action.payload;
    },
    addTourPlans(state, action) {
      state.tourPlans.push(action.payload);
    },
    updateTourPlan(state, action) {
      const index = state.tourPlans.findIndex(tourPlan => tourPlan._id === action.payload._id);
      if (index !== -1) {
        state.tourPlans[index] = action.payload;
      }
    },
    removeTourPlan(state, action) {
      state.tourPlans = state.tourPlans.filter(tourPlan => tourPlan._id !== action.payload);
    }
  },
});

export const {
    setTourPlans,addTourPlans,updateTourPlan,removeTourPlan
} = tourPlanSlice.actions;

export default tourPlanSlice.reducer;
