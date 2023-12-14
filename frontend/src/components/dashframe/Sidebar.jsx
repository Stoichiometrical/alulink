import React from 'react';
import { Link } from 'react-router-dom';
import './dash.scss';

export default function Sidebar({ title,isAdmin }) {
  const user = [
    { text: 'Attending', link: '/dash/attending' },
    { text: 'Organised By Me', link: '/dash/byme' },
    { text: 'My Account'   , link : '/dash/account' }
  ];

 const admin =[
    {text: 'Alumni Records', link: '/dash/records'},
    { text: 'Upcoming Events', link:'/dash/alumnievents' },
    { text: 'Usage Statistics', link: '/dash/usage'},
    { text: 'My Account'   , link : '/dash/account' }

 ] 

 const options = isAdmin ? admin : user

  return (
    <div className='sidebar'>
    
        <h1>{title}</h1>
      <ul className='options-list'>
        {options.map((option, index) => (
          <li key={index}>
            <Link to={option.link} className='option-link'>
              {option.text}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
