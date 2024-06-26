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
   <>
 <style>
        {`
          .three-d {
  position: relative;
  font-size: 2rem; 
  background: linear-gradient(45deg, #05556b, #c031ef); /* Gradient colors */
  -webkit-background-clip: text;
  color: transparent;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  text-align: center;
  display: inline-block;
  
  font-family: "Cherry Cream Soda", system-ui;
  font-weight: 400;
  font-style: normal;
}

.three-d::before,
.three-d::after {
  content: attr(data-text);
  position: absolute;
  left: 0;
  top: 0;
  z-index: -1;
}

.three-d::before {
  color: #c0c0c0; /* Shadow color */
  transform: translate(2px, 2px);
  z-index: -2;
}

.three-d::after {
  color: #808080; /* Shadow color */
  transform: translate(4px, 4px);
  z-index: -3;
}
.Navbar{
 font-family: "Sorts Mill Goudy", serif;
  font-weight: 400;
  font-style: normal;
}
        `}
      </style>

    <Navbar className="Navbar" data-text="APEXORA" fluid rounded>
      <Navbar.Brand href="/">
        <img src="https://img.icons8.com/?size=100&id=vAyHnkZOlhyF&format=png&color=000000" className="mr-2 h-10 sm:h-9" alt="Apexora" />
        <span className="self-center font-extrabold whitespace-nowrap text-xl three-d ">APEXORA</span>
      </Navbar.Brand>
      <div className="flex md:order-2">
      {!isAuthenticated && (<>
        <Link to="/login"><Button gradientMonochrome="cyan" >Login</Button></Link>   
        <Link to="/register"><Button gradientMonochrome="cyan" className="ml-3">Register</Button></Link>
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
           
                <Link className="navLink" to="/travel-plans">Add TravelPlan</Link>
             
                <Link className="navLink" to="/tour-plans">Add TourPlan</Link>
              <Link className="navLink" to ="/bookings">Bookings</Link>

            
         </>   )}
         <Link className="navLink" to="/"> <Button gradientMonochrome="cyan" onClick={handleLogout}>Logout</Button></Link> 

           
        </Navbar.Collapse>
          
          </>
        ) 
        }
      
    </Navbar>
     </>
      );
      
};

export default Nav;
