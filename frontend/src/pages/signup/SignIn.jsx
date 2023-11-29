import React, { useState } from 'react';
import './signup.scss';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../utils/AuthContext.jsx';

const SignIn = () => {
  const auth = useAuth();
  const navigate = useNavigate();
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

  const handleSubmit = async (e) => {
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
      try {
        // Assuming you have an API endpoint for user authentication
        const response = await fetch('http://localhost:3000/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          // Sign-in successful, save data and redirect to the home page
          const userData = await response.json();
          auth.login(userData);
          navigate('/');
        } else {
          // Handle sign-in error
          const errorData = await response.json();
          setErrors({ signIn: errorData.message });
        }
      } catch (error) {
        console.error('Sign-in failed:', error);
        setErrors({ signIn: 'An error occurred during sign-in.' });
      }
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
};

export default SignIn;
