import React from 'react';
import { Link } from 'react-router-dom';
import './dash.scss';

export default function Sidebar({ title,isAdmin }) {
  const user = [
    { text: 'Attending', link: '/attending' },
    { text: 'Organised By Me', link: '/byme' },
    { text: 'My Account'   , link : '/account' }
  ];

 const admin =[
    {text: 'Alumni Records', link: '/records'},
    { text: 'Upcoming Events', link:'/alumnievents' },
    { text: 'Usage Statistics', link: '/usage'},
    { text: 'My Account'   , link : '/account' }

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
