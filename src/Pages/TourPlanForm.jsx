import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createTourPlan } from '../Features/Dispatch/Dispatch';

const TourPlanForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [duration, setDuration] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState(null);
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleCreatePlan = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('duration', parseInt(duration)); // Ensure duration is parsed to integer
    formData.append('price', parseInt(price)); // Ensure price is parsed to integer
    formData.append('image', image);

    dispatch(createTourPlan(formData, token));

    // Clear form fields after submission (optional)
    setTitle('');
    setDescription('');
    setDuration('');
    setPrice('');
    setImage(null);
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg">
      <form onSubmit={handleCreatePlan} className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter title"
            className="input-field"
            required
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
          <input
            id="description"
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter description"
            className="input-field"
            required
          />
        </div>

        <div>
          <label htmlFor="duration" className="block text-sm font-medium text-gray-700">Duration (days)</label>
          <input
            id="duration"
            type="number"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            placeholder="Enter duration"
            className="input-field"
            required
          />
        </div>

        <div>
          <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price (INR)</label>
          <input
            id="price"
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Enter price"
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
            required
          />
        </div>

        <button type="submit" className="bg-blue-500 text-white font-bold py-2 px-4 rounded mt-4">
          Create Plan
        </button>
      </form>
    </div>
  );
};

export default TourPlanForm;
