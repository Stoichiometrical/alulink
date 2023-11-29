import React, { useState, useEffect } from 'react';
import './eventcoll.scss';
import AvailableEventCard from '../eventcard/AvailableEventCard';

export default function EventCollections({ title, category, id }) {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAllEvents, setShowAllEvents] = useState(false);

  useEffect(() => {
    // Fetch either the latest events or all events based on the showAllEvents state
    const endpoint = showAllEvents
      ? `http://localhost:3000/event/events/category/${category}`
      : `http://localhost:3000/event/events/latest/${category}`;

    fetch(endpoint)
      .then((response) => response.json())
      .then((data) => {
        setEvents(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching events:', error);
        setLoading(false);
      });
  }, [category, showAllEvents]);

  const handleViewMore = () => {
    // Toggle the showAllEvents state when the "View More" is clicked
    setShowAllEvents((prev) => !prev);
  };

  return (
    <div className='e-collections' id={id}>
      <h3>{title}</h3>
      {loading ? (
        // Display loading indicator while events are being fetched
        <img
          src='https://media.tenor.com/hlKEXPvlX48AAAAi/loading-loader.gif'
          alt='Loading'
          className='loading-indicator'
        />
      ) : (
        // Display events once they are fetched
        <div className='e-cards'>
          {events.map((event) => (
            <AvailableEventCard
              key={event._id}
              eventId={event._id}
              img={event.imageUrl}
              title={event.title}
              desc={event.description}
              date={event.date}
              location={event.location}
            />
          ))}
        </div>
      )}
      <div className='view' onClick={handleViewMore}>
        {showAllEvents ? 'View Latest' : 'View More'}
      </div>
    </div>
  );
}

