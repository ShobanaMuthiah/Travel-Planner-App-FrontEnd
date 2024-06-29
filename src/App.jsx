import React from 'react';
import {  Route, BrowserRouter, Routes } from 'react-router-dom';
import Login from './Pages/Login';
import Register from './Pages/Register';
import TravelPlanForm from './Pages/TravelPlanForm';
import TravelPlanList from './Pages/TravelPlanList';
import BookingForm from './Pages/BookingForm';
import BookingList from './Pages/BookingList';
import TourPlanForm from './Pages/TourPlanForm';
import TourPlanList from './Pages/TourPlanList';
import Home from './Pages/Home';
import MyBooking from './Pages/MyBooking';
import Nav from './Components/Nav';
import UserTravel from './Pages/UserTravel';
import Activate from './Pages/Activate';
import UserTour from './Pages/UserTour';
import Footer from './Components/Footer';
import ForgotPassword from './Pages/ForgotPassword';
import Reset from './Pages/Reset';

const App = () => {
  return (
    
<BrowserRouter>

<Nav />
<Routes>
<Route path="/userTravel" element={<UserTravel/>} />
<Route path="/userTour" element={<UserTour/>} />


        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/travel-plans" element={<TravelPlanForm/>} />
        <Route path='/travel-plans/list' element={<TravelPlanList/>}/>
        <Route path='/tour-plans' element={<TourPlanForm/>}/>
        <Route path='/tour-plans/list' element={<TourPlanList/>}/>
        <Route path="/bookings/create" element={<BookingForm/>} />
        <Route path="/bookings" element={<BookingList/>} />  
        <Route path='/' element={<Home/>}/>
        <Route path='/mybookings' element={<MyBooking/>}/>
        <Route path='/activate/:token' element={<Activate/>}/>
        <Route path='/forgot-password' element={<ForgotPassword/>}/>
        <Route path='/reset-password/:token' element={<Reset/>}/>

          </Routes>
    <Footer/>
    </BrowserRouter>
  );
};

export default App;
