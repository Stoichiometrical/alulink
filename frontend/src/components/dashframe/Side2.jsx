import React from 'react';
import { Link } from 'react-router-dom';
import './dash.scss';

export default function Sidebar({ options, title, onSelectOption }) {
  const handleOptionClick = (option) => {
    onSelectOption(option);
    console.log(option)
  };

  return (
    <div className='sidebar'>
      <h1>{title}</h1>
      <ul className='options-list'>
        {options.map((option, index) => (
          <li key={index} onClick={() => handleOptionClick(option.text)}>
            {option.text}
            
          </li>
        ))}
      </ul>
    </div>
  );
}

