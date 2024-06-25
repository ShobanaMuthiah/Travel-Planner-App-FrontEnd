import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createBooking } from '../Features/Dispatch/Dispatch';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Button } from 'flowbite-react';

const BookingForm = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);

  const initialValues = {
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    transportation: '',
    duration: '',
    departure: '',
    arrival: '',
  };

  const validationSchema = Yup.object({
    customerName: Yup.string().required('Customer Name is required'),
    customerEmail: Yup.string().email('Invalid email address').required('Email is required'),
    customerPhone: Yup.string().required('Phone number is required'),
    transportation: Yup.string().required('Transportation is required'),
    duration: Yup.number().integer().required('Duration (days) is required'),
    departure: Yup.date().required('Departure date is required'),
    arrival: Yup.date().required('Arrival date is required'),
  });

  const handleSubmit = (values, { setSubmitting }) => {
    const { customerName, customerEmail, customerPhone, transportation, duration, departure, arrival } = values;

    dispatch(createBooking({
      customerName,
      customerEmail,
      customerPhone,
      transportation,
      duration,
      departure,
      arrival,
    }));

    setSubmitting(false); // Reset submitting state after form submission
  };

  return (
    <div className="card mx-auto max-w-md p-6">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form className="space-y-4">
          <div className="flex flex-wrap -mx-2">
            <div className="w-full px-2">
              <label className="block mb-1">Customer Name</label>
              <Field type="text" name="customerName" placeholder="Customer Name" className="w-full p-2 border border-gray-300 rounded" />
              <ErrorMessage name="customerName" component="div" className="text-red-500 text-sm" />
            </div>

            <div className="w-full px-2">
              <label className="block mb-1">Customer Email</label>
              <Field type="email" name="customerEmail" placeholder="Customer Email" className="w-full p-2 border border-gray-300 rounded" />
              <ErrorMessage name="customerEmail" component="div" className="text-red-500 text-sm" />
            </div>

            <div className="w-full px-2">
              <label className="block mb-1">Phone Number</label>
              <Field type="text" name="customerPhone" placeholder="Phone Number" className="w-full p-2 border border-gray-300 rounded" />
              <ErrorMessage name="customerPhone" component="div" className="text-red-500 text-sm" />
            </div>

            <div className="w-full px-2">
              <label className="block mb-1">Transportation</label>
              <Field type="text" name="transportation" placeholder="Transportation (Flight/Car/Train)" className="w-full p-2 border border-gray-300 rounded" />
              <ErrorMessage name="transportation" component="div" className="text-red-500 text-sm" />
            </div>

            <div className="w-full px-2">
              <label className="block mb-1">Duration (days)</label>
              <Field type="number" name="duration" placeholder="Duration (days)" className="w-full p-2 border border-gray-300 rounded" />
              <ErrorMessage name="duration" component="div" className="text-red-500 text-sm" />
            </div>

            <div className="w-full px-2">
              <label className="block mb-1">Departure Date</label>
              <Field type="date" name="departure" placeholder="Departure Date" className="w-full p-2 border border-gray-300 rounded" />
              <ErrorMessage name="departure" component="div" className="text-red-500 text-sm" />
            </div>

            <div className="w-full px-2">
              <label className="block mb-1">Arrival Date</label>
              <Field type="date" name="arrival" placeholder="Arrival Date" className="w-full p-2 border border-gray-300 rounded" />
              <ErrorMessage name="arrival" component="div" className="text-red-500 text-sm" />
            </div>
          </div>

          <div className="flex justify-center mt-6">
            <Button type="submit">Book</Button>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default BookingForm;
