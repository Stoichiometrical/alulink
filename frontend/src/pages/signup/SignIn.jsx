import React, { useState } from 'react';
import './signup.scss';
import { Link } from 'react-router-dom';

export default function SignIn() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validate the form fields
    const validationErrors = {};
    if (!formData.email.trim()) {
      validationErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      validationErrors.email = 'Invalid email address';
    }
    if (!formData.password.trim()) {
      validationErrors.password = 'Password is required';
    }

    if (Object.keys(validationErrors).length === 0) {
      // Form is valid, you can proceed with submission
      // For now, just log the data to the console
      console.log('Form data:', formData);
    } else {
      // Set validation errors to display to the user
      setErrors(validationErrors);
    }
  };

  return (
    <div className='sign-container'>
      <div className='left-side'>
        <img
          src='https://images.pexels.com/photos/6476782/pexels-photo-6476782.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
          alt='Missing'
        />
      </div>
      <div className='right-side sign'>
        <h1 className='sign-h'> Sign In</h1>
        <form className='form' onSubmit={handleSubmit}>
          {errors.email && <p className='error'>{errors.email}</p>}
          <input
            type='text'
            placeholder='Email'
            name='email'
            value={formData.email}
            onChange={handleChange}
          />
          {errors.password && <p className='error'>{errors.password}</p>}
          <input
            type='password'
            placeholder='Password'
            name='password'
            value={formData.password}
            onChange={handleChange}
          />
          <button type='submit'>Sign In</button>
        </form>
        <div className='alternative'>
          <Link to='/signup' className='link'>
            Don't have an account? Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
}
