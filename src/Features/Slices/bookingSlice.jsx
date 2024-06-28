import { createSlice } from '@reduxjs/toolkit';

const bookingSlice = createSlice({
  name: 'bookings',
  initialState:{
    bookings:[]
  },
  reducers: {
    setBookings(state, action) {
      state.bookings = action.payload;
    },
    addBooking(state, action) {
      state.bookings.push(action.payload);
    },
    removeBooking(state, action) {
      state.bookings = state.bookings.filter(booking => booking._id !== action.payload);
    },
  },
});

export const { setBookings, addBooking, removeBooking } = bookingSlice.actions;
export default bookingSlice.reducer;
