import React, { useState } from 'react';
import Sidebar from './Sidebar';
import './dash.scss';
import AvailableEventCard from '../eventcard/AvailableEventCard';
import EditableEventCard from '../eventcard/EditableEvent';
import EventCollections from '../eventcollections/EventCollections';

export default function Dash2() {
  const [selectedOption, setSelectedOption] = useState(null);

  const options = [
    { text: 'Attending', component: AvailableEventCard },
    { text: 'Organised By Me', component: EditableEventCard },
    { text: 'Collaborating', component: EventCollections },
  ];

  const renderComponent = () => {
    console.log('Selected Option:', selectedOption);
    console.log('Options:', options);
    setSelectedOption(option.text)

    const ComponentToRender = options.find((option) => option.text.toLowerCase() === selectedOption?.toLowerCase())?.component;

    if (!ComponentToRender) {
      return <div>Error: Component not found.</div>;
    }

    return <ComponentToRender />;
  };

  return (
    <div className='dash'>
      <div className='dash-sidebar'>
        <Sidebar options={options} title='Events' onSelectOption={setSelectedOption} />
      </div>
      <div className='dash-main'>{renderComponent()}</div>
    </div>
  );
}