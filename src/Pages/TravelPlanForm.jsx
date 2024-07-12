import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createTravelPlan } from '../Features/Dispatch/Dispatch';
import { Button } from 'flowbite-react';

const TravelPlanForm = () => {
  const [destination, setDestination] = useState('');
  const [details, setDetails] = useState('');
  const [transportation, setTransportation] = useState('');
  const [departure, setDeparture] = useState('');
  const [arrival, setArrival] = useState('');
  const [timing, setTiming] = useState('');
  const [image, setImage] = useState(null);

  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleCreatePlan = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('destination', destination);
    formData.append('details', details);
    formData.append('transportation', transportation);
    formData.append('departure', new Date(departure).toISOString().split('T')[0]);
    formData.append('arrival', new Date(arrival).toISOString().split('T')[0]);
    formData.append('timing', timing); 
    if (image) {
      formData.append('image', image);
    }

    dispatch(createTravelPlan(formData, token));

    setDestination('');
    setDetails('');
    setTransportation('');
    setDeparture('');
    setArrival('');
    setTiming('');
    setImage(null);
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg">
    <h1 className='m-3'>Travel Plans</h1>

      <form onSubmit={handleCreatePlan} className="space-y-4">
        <div>
          <label htmlFor="destination" className="block text-sm font-medium text-gray-700">Destination</label>
          <input
            id="destination"
            type="text"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            placeholder="Enter destination"
            className="input-field"
            required
          />
        </div>

        <div>
          <label htmlFor="details" className="block text-sm font-medium text-gray-700">Details</label>
          <input
            id="details"
            type="text"
            value={details}
            onChange={(e) => setDetails(e.target.value)}
            placeholder="Enter details"
            className="input-field"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Transportation</label>
          <div className="flex flex-col">
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="transportation"
                value="flight"
                checked={transportation === 'flight'}
                onChange={(e) => setTransportation(e.target.value)}
                className="form-radio"
              />
              <span className="ml-2">Flight</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="transportation"
                value="train"
                checked={transportation === 'train'}
                onChange={(e) => setTransportation(e.target.value)}
                className="form-radio"
              />
              <span className="ml-2">Train</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="transportation"
                value="car"
                checked={transportation === 'car'}
                onChange={(e) => setTransportation(e.target.value)}
                className="form-radio"
              />
              <span className="ml-2">Car</span>
            </label>
          </div>
        </div>

        <div>
          <label htmlFor="departure" className="block text-sm font-medium text-gray-700">Departure Date</label>
          <input
            id="departure"
            type="date"
            value={departure}
            onChange={(e) => setDeparture(e.target.value)}
            className="input-field"
            required
          />
        </div>

        <div>
          <label htmlFor="arrival" className="block text-sm font-medium text-gray-700">Arrival Date</label>
          <input
            id="arrival"
            type="date"
            value={arrival}
            onChange={(e) => setArrival(e.target.value)}
            className="input-field"
            required
          />
        </div>

        <div>
          <label htmlFor="timing" className="block text-sm font-medium text-gray-700">Travel Duration (HH:mm:ss)</label>
          <input
            id="timing"
            type="text"
            value={timing}
            onChange={(e) => setTiming(e.target.value)}
            placeholder="Enter travel duration"
            className="input-field"
            required
          />
        </div>

        <div>
          <label htmlFor="image" className="block text-sm font-medium text-gray-700">Image</label>
          <input
            id="image"
            type="file"
            onChange={handleImageChange}
            accept="image/*"
            className="input-field"
          />
        </div>

        <Button type="submit" gradientMonochrome="cyan" pill>
          Create Plan
        </Button>
      </form>
    </div>
  );
};

export default TravelPlanForm;
