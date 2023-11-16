import React, { useState } from 'react';
import { Link, useNavigate} from 'react-router-dom';

const SignUp = () => {
  const history = useNavigate();

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    graduationYear: '',
    degreeProgram: '',
    password: '',
    confirmPassword: '',
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
    if (!formData.fullName.trim()) {
      validationErrors.fullName = 'Full Name is required';
    }
    if (!formData.email.trim()) {
      validationErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      validationErrors.email = 'Invalid email address';
    }
    if (!formData.graduationYear.trim()) {
      validationErrors.graduationYear = 'Graduation Year is required';
    }
    if (!formData.degreeProgram.trim()) {
      validationErrors.degreeProgram = 'Degree Program is required';
    }
    if (!formData.password.trim()) {
      validationErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      validationErrors.password = 'Password must be at least 6 characters';
    }
    if (formData.confirmPassword !== formData.password) {
      validationErrors.confirmPassword = 'Passwords do not match';
    }

    if (Object.keys(validationErrors).length === 0) {
      try {
        // Assuming you have an API endpoint for user registration
        const response = await fetch('http://localhost:3000/auth/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          // Registration successful, redirect to the home page
          history('/login');
        } else {
          // Handle registration error
          const errorData = await response.json();
          setErrors({ registration: errorData.message });
        }
      } catch (error) {
        console.error('Registration failed:', error);
        setErrors({ registration: 'An error occurred during registration.' });
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
          src='https://images.pexels.com/photos/6476780/pexels-photo-6476780.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
          alt='Missing'
        />
      </div>
      <div className='right-side'>
        <h1>Sign Up</h1>
        <form className='form' onSubmit={handleSubmit}>
          <input
            type='text'
            placeholder='Full Name'
            name='fullName'
            value={formData.fullName}
            onChange={handleChange}
          />
          {errors.fullName && <p className='error'>{errors.fullName}</p>}

          <input
            type='text'
            placeholder='Email'
            name='email'
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <p className='error'>{errors.email}</p>}

          <input
            type='text'
            placeholder='Graduation Year'
            name='graduationYear'
            value={formData.graduationYear}
            onChange={handleChange}
          />
          {errors.graduationYear && (
            <p className='error'>{errors.graduationYear}</p>
          )}

          <input
            type='text'
            placeholder='Degree Program'
            name='degreeProgram'
            value={formData.degreeProgram}
            onChange={handleChange}
          />
          {errors.degreeProgram && (
            <p className='error'>{errors.degreeProgram}</p>
          )}

          <input
            type='password'
            placeholder='Password'
            name='password'
            value={formData.password}
            onChange={handleChange}
          />
          {errors.password && <p className='error'>{errors.password}</p>}

          <input
            type='password'
            placeholder='Confirm Password'
            name='confirmPassword'
            value={formData.confirmPassword}
            onChange={handleChange}
          />
          {errors.confirmPassword && (
            <p className='error'>{errors.confirmPassword}</p>
          )}

          <button type='submit'>Sign Up</button>
        </form>
        {errors.registration && (
          <p className='error'>{errors.registration}</p>
        )}
        <div className='alternative'>
          <Link to='/login' className='link'>
            Already have an account? Sign in
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
