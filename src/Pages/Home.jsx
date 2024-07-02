import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchTourPlans } from '../Features/Dispatch/Dispatch';
import BookingModal from './BookingModal';
import { Button, Carousel, Spinner } from 'flowbite-react';
import { useLocation } from 'react-router-dom';

const Home = () => {
  const dispatch = useDispatch();
  const tourPlans = useSelector((state) => state.tourPlans.tourPlans);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 3;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await dispatch(fetchTourPlans());
      setLoading(false);
    };

    fetchData();
  }, [dispatch]);

  useEffect(() => {
    if (location.hash) {
      const element = document.getElementById(location.hash.substring(1));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [location]);

  const handleBookNow = (plan) => {
    setSelectedPlan(plan);
  };

  const handleCloseModal = () => {
    setSelectedPlan(null);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const startIndex = (currentPage - 1) * pageSize;
  const currentPagePlans = tourPlans.slice(startIndex, startIndex + pageSize);
  const totalPages = Math.ceil(tourPlans.length / pageSize);

  const carouselData = [
    {
      image: 'https://plus.unsplash.com/premium_photo-1670986971794-1ab9ec4beb28?dpr=1&w=306&auto=format&fit=crop&q=60&crop=entropy&cs=tinysrgb&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8N3x8ZXhwbG9yZXJ8ZW58MHwwfHx8MTcxOTIyODA2N3wx&ixlib=rb-4.0.3',
      content: 'Travel is more than the seeing of sights; it is a change that goes on, deep and permanent, in the ideas of living.',
    },
    {
      image: 'https://images.unsplash.com/photo-1605999212947-0e516b62b2a0?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGV4cGxvcmVyfGVufDB8fDB8fHww',
      content: 'To travel is to discover that everyone is wrong about other countries.',
    },
    {
      image: 'https://images.unsplash.com/photo-1573072738379-7c640e17ac4e?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZXhwbG9yZXJ8ZW58MHx8MHx8fDA%3D',
      content: 'Travel far enough, you meet yourself.',
    },
  ];

  return (
    <div>
      <style>
        {`
          .image {
            position: relative;
            height: 100%;
            background-size: cover;
            background-position: center;
          }
          .image::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            filter: blur(5px);
            z-index: 0;
            width: 100%;
          }
          .content {
            position: relative;
            z-index: 1;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100%;
            color: white;
            font-weight: bold;
            text-align: center;
            padding: 50px;
          }
        `}
      </style>

      <div className="title-container">
        <h1 className="animated-text">
          <span className="word">A</span>
          <span className="word">P</span>
          <span className="word">E</span>
          <span className="word">X</span>
          <span className="word">O</span>
          <span className="word">R</span>
          <span className="word">A</span>
        </h1>
      </div>
      <h2 className="text-center italic quote mb-1">"Make your international trip today with Apexora"</h2>

      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <Spinner color='success' size='xl' aria-label="Loading" />
        </div>
      ) : (
        <>
          <div className="h-56 sm:h-64 xl:h-80 2xl:h-96">
            <Carousel
              responsive={{
                desktop: {
                  breakpoint: {
                    max: 3000,
                    min: 1024,
                  },
                  items: 1,
                },
                mobile: {
                  breakpoint: {
                    max: 464,
                    min: 0,
                  },
                  items: 1,
                },
                tablet: {
                  breakpoint: {
                    max: 1024,
                    min: 464,
                  },
                  items: 1,
                },
              }}
            >
              {carouselData.map((image, index) => (
                <div
                  key={index}
                  className="flex h-full image items-center w-full img object-cover justify-center bg-gray-400 dark:bg-gray-700 dark:text-white"
                  style={{ backgroundImage: `url(${image.image})` }}
                >
                  <div className="text-center text-white p-4">
                    <p className="text-lg font-bold">{image.content}</p>
                  </div>
                </div>
              ))}
            </Carousel>
          </div>
          <h2 className="mt-2 p-2 text-2xl italic plan font-bold mb-3">Tour Plans</h2>
          <div className="align-center">
            <div className="row row-cols-1 row-cols-sm-3">
              {currentPagePlans.map((plan) => (
                <div key={plan._id} className="border col mb-2 border-gray-200 rounded-lg shadow-md overflow-hidden">
                  <img
                    src={plan.image}
                    alt={plan.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="text-xl font-bold mb-2">{plan.title}</h3>
                    <p className="text-gray-700 mb-2">{plan.description}</p>
                    <p className="text-gray-700 mb-2">Duration: {plan.duration} Days</p>
                    <p className="text-gray-700 mb-4">Price: &nbsp; &#8377; {plan.price}</p>
                    <div className="flex justify-between">
                      <Button gradientMonochrome="lime" pill onClick={() => handleBookNow(plan)}>
                        Book Now
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-center mt-4">
              {Array.from({ length: totalPages }, (_, index) => (
                <Button
                  key={index + 1}
                  onClick={() => handlePageChange(index + 1)}
                  gradientMonochrome={currentPage === index + 1 ? 'success' : 'info'}
                  className={`mx-1 ${currentPage === index + 1 ? 'font-bold' : ''}`}
                >
                  {index + 1}
                </Button>
              ))}
            </div>
          </div>
        </>
      )}
      <section id="about-us">
        <h2 className="mt-2 p-2 text-2xl italic plan font-bold mb-3">About Us</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam convallis risus ut orci imperdiet, sed blandit urna varius. Mauris pharetra, enim vitae gravida laoreet, quam nulla facilisis quam.
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam convallis risus ut orci imperdiet, sed blandit urna varius. Mauris pharetra, enim vitae gravida laoreet, quam nulla facilisis quam.
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam convallis risus ut orci imperdiet, sed blandit urna varius. Mauris pharetra, enim vitae gravida laoreet, quam nulla facilisis quam.
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam convallis risus ut orci imperdiet, sed blandit urna varius. Mauris pharetra, enim vitae gravida laoreet, quam nulla facilisis quam.
        </p>
      </section>
      <section id="privacy">
        <h2 className="mt-2 p-2 text-2xl italic plan font-bold mb-3">Privacy Policy</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam convallis risus ut orci imperdiet, sed blandit urna varius. Mauris pharetra, enim vitae gravida laoreet, quam nulla facilisis quam.
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam convallis risus ut orci imperdiet, sed blandit urna varius. Mauris pharetra, enim vitae gravida laoreet, quam nulla facilisis quam.
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam convallis risus ut orci imperdiet, sed blandit urna varius. Mauris pharetra, enim vitae gravida laoreet, quam nulla facilisis quam.
        </p>
      </section>
      {selectedPlan && <BookingModal plan={selectedPlan} onClose={handleCloseModal} />}
    </div>
  );
};

export default Home;
