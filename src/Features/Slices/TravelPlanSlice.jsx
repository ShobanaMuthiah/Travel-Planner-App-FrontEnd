import { createSlice } from '@reduxjs/toolkit';


const travelPlanSlice = createSlice({
  name: 'travelPlans',
  initialState:{
    travelPlans: [],
  },
  reducers: {
    setTravelPlans(state, action) {
      state.travelPlans = action.payload;
    },
    addTravelPlan(state, action) {
      state.travelPlans.push(action.payload);
    },
    updateTravelPlan(state, action) {
      const index = state.travelPlans.findIndex(plan => plan.id === action.payload.id);
      if (index !== -1) {
        state.travelPlans[index] = action.payload;
      }
    },
    removeTravelPlan(state, action) {
      state.travelPlans = state.travelPlans.filter(plan => plan._id !== action.payload);
    },
  },
});

export const { setTravelPlans, addTravelPlan, updateTravelPlan, removeTravelPlan } = travelPlanSlice.actions;
export default travelPlanSlice.reducer;
