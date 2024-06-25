// Navbar Component
import { Button, Navbar } from "flowbite-react";
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { clearAuthData } from '../Features/Slices/authSlice';
import { Link } from "react-router-dom";

const Nav = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const dispatch = useDispatch();
  const token = useSelector(state => state.auth.token);
  const user = useSelector(state => state.auth.user);

  useEffect(() => {
    // Check if the token is present in Redux state
    if (token) {
      setIsAuthenticated(true);
      setIsAdmin(user.isAdmin);
    } else {
      setIsAuthenticated(false);
      setIsAdmin(false);
    }
  }, [token,user]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    dispatch(clearAuthData());
    setIsAuthenticated(false);
    setIsAdmin(false);
  };

  return (
   


    <Navbar className="Navbar" fluid rounded>
      <Navbar.Brand href="/">
        <img src="src\Components\Icon\airplane_2200326.png" className="mr-3 h-6 sm:h-9" alt="Flowbite React Logo" />
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">Apexora</span>
      </Navbar.Brand>
      <div className="flex md:order-2">
      {!isAuthenticated && (<>
        <Link to="/login"><Button>Login</Button></Link>   
        <Link to="/register"><Button>Register</Button></Link>
      </>)}
        
      </div>
      
      {isAuthenticated && (
          <>
          <Navbar.Toggle />
            <Navbar.Collapse>
            
            
               {!isAdmin && (<>
                <Link className="navLink" to ="/mybookings">My Bookings</Link>
                <Link className="navLink" to ="/userTravel">Travels</Link>
                <Link className="navLink" to ="/userTour">Tour Plans</Link>

               </>)}
             
              
              <Link className="navLink" to="/bookings/create">Easy Booking</Link>
           
            {isAdmin && ( // Render only if user is admin
             <> 
              <Link className="navLink" to="/travel-plans/list">Travels</Link>
              <Link className="navLink" to="/tour-plans/list">Tour Plans</Link>
           
                <Link className="navLink" to="/travel-plans">Create Travel Plan</Link>
             
                <Link className="navLink" to="/tour-plans">Create Tour Plan</Link>
              <Link className="navLink" to ="/bookings">Bookings</Link>

            
         </>   )}
         <Link className="navLink" to="/"> <Button onClick={handleLogout}>Logout</Button></Link> 

           
        </Navbar.Collapse>
          
          </>
        ) 
        }
      
    </Navbar>
     
      );
};

export default Nav;
