
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
    if (token) {
      setIsAuthenticated(true);
      setIsAdmin(user.isAdmin);
    } else {
      setIsAuthenticated(false);
      setIsAdmin(false);
    }
  }, [token, user]);

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
            background: linear-gradient(45deg, #05556b, #c031ef); 
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
            @media (max-width: 600px) {
  .three-d {
    font-size: 1.5rem; 
  }
}
     @media (max-width: 250px) {
  .three-d {
    font-size: 1.2rem; 
  }
}
          .Navbar {
            font-family: "Sorts Mill Goudy", serif;
            font-style: normal;
          }

          .navLink {
            margin-left: 10px;
            color: #000;
            text-decoration: none;
          }

          .navLink:hover {
            text-decoration: underline;
          }
.nav {
  display: flex;
  flex-wrap: wrap;
  gap: 2px;  
  justify-content: flex-end;
}

.navButton {
  font-size: 1rem;
}

@media (max-width: 600px) {
  .navButton {
  padding:0;
    font-size: 0.5rem;
  }
}

          .navbar-collapse {
            flex-grow: 1;
            display: flex;
            justify-content: flex-end;
          }
            .admin{
            color:brown;
            }
          
        `}
      </style>

      <Navbar className="Navbar" data-text="APEXORA" fluid rounded>
        <Navbar.Brand href="/">
          <img src="https://img.icons8.com/?size=100&id=vAyHnkZOlhyF&format=png&color=000000" className="m-2 h-10 sm:h-9" alt="Apexora" />
          <span className="self-center font-extrabold whitespace-nowrap sm:size-1 text-xl three-d">APEXORA</span>
          {isAdmin&& (
            <span className="p-2 pt-3 admin " >
              Admin
            </span>
          )}
        </Navbar.Brand>
        <div className="flex md:order-2">
          {!isAuthenticated && (
            <div className=" nav flex flex-wrap gap-2 ">
              <Link  to="/"><Button gradientMonochrome="purple" pill className="navButton">Home</Button></Link>
              <Link to="/login"><Button gradientMonochrome="purple" pill className="navButton">Login</Button></Link>
              <Link to="/register"><Button gradientMonochrome="purple" pill className="navButton">Register</Button></Link>
            </div>
          )}
        </div>
        {isAuthenticated && (
          <>
            <Navbar.Toggle />
            <Navbar.Collapse className="navbar-collapse">
              <Link className="navLink" to="/">Home</Link>
              {!isAdmin && (
                <>
                  <Link className="navLink" to="/mybookings">My Bookings</Link>
                  <Link className="navLink" to="/userTravel">Travels</Link>
                  <Link className="navLink" to="/userTour">Tour Plans</Link>
                </>
              )}
              <Link className="navLink" to="/bookings/create">Easy Booking</Link>
              {isAdmin && (
                <>
                  <Link className="navLink" to="/travel-plans/list">Travels</Link>
                  <Link className="navLink" to="/tour-plans/list">Tour Plans</Link>
                  <Link className="navLink" to="/travel-plans">Add TravelPlan</Link>
                  <Link className="navLink" to="/tour-plans">Add TourPlan</Link>
                  <Link className="navLink" to="/bookings">Bookings</Link>
                </>
              )}
              <Button gradientMonochrome="purple" pill onClick={handleLogout}>Logout</Button>
            </Navbar.Collapse>
          </>
        )}
      </Navbar>
    </>
  );
};

export default Nav;
