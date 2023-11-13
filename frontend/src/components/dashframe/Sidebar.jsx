import React from 'react';
import { Link } from 'react-router-dom';
import './dash.scss';

export default function Sidebar({ options,title }) {
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
