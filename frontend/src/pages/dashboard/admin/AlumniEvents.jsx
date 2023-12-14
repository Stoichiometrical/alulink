
import React, { useState, useEffect } from 'react';
import DashFrame from '../../../components/dashframe/DashboardFrame';
import '../dash.scss';
import EditableEventCard from '../../../components/eventcard/EditableEvent';
import DashHero from '../../../components/hero/DashHero';
import SearchBar from '../../../components/searchbar/Searchbar';
import { useAuth } from '../../../utils/AuthContext';
import { API_URL} from "../../../utils/services.js";

export default function AlumniEvents() {
  return (
    <>
      <DashHero name="Admin" />
      <DashFrame main={<AlEvents />} isAdmin={true} />
    </>
  );
}

const AlEvents = () => {
  const [events, setEvents] = useState([]);
  const { userData } = useAuth();
  const [showAddEventForm, setShowAddEventForm] = useState(false);
  const [newEventData, setNewEventData] = useState({
    title: '',
    description: '',
    category: '',
    date: '',
    location: '',
    organizer: userData._id,
  });

  const [searchResults, setSearchResults] = useState(null);

  // Callback function to handle search results
  const handleSearch = (data) => {
    setSearchResults(data);
  };

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch(`${API_URL}/event/events`);
        const data = await response.json();

        setEvents(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchEvents();
  }, [events]);

  const handleAddEvent = () => {
    setShowAddEventForm(true);
  };

  const handleCancelEvent = () => {
    // Reset the form data and hide the form when cancel is clicked
    setNewEventData({
      title: '',
      description: '',
      category: '',
      date: '',
      location: '',
      organizer: userData._id,
    });
    setShowAddEventForm(false);
  };

  const handleSaveEvent = async () => {
    try {

      const addEventEndpoint = `${API_URL}/event/add`;
      const response = await fetch(addEventEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newEventData),
      });

      if (!response.ok) {
        throw new Error('Failed to add event');
      }else{
        alert('New Event Created')
      }

      // Reset the form data and hide the form after successful addition
      setNewEventData({
        title: '',
        description: '',
        category: '',
        date: '',
        location: '',
        organizer: userData._id,
      });
      setShowAddEventForm(false);
    } catch (error) {
      console.error('Error adding event:', error.message);
    }
  };

  const handleInputChange = (e) => {
    // Update the new event data when input fields change
    setNewEventData({
      ...newEventData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <div className="record">
        <SearchBar
          placeholder="Search Events"
          serverRoute="event/events/title"
          onSearch={handleSearch}
        />
      </div>

      <button onClick={handleAddEvent}>Add Event</button>

      {showAddEventForm && (
        <div style={{maxWidth:'300px',marginLeft:'30%'}}>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={newEventData.title}
            onChange={handleInputChange}
          />

          <label htmlFor="description">Description:</label>
          <input
            type="text"
            id="description"
            name="description"
            value={newEventData.description}
            onChange={handleInputChange}
          />



          <label htmlFor="category">Category:</label>
          <select
              id="category"
              name="category"
              value={newEventData.category}
              onChange={handleInputChange}
          >
            <option value="" disabled>Select a category</option>
            <option value="professional development">Professional Development</option>
            <option value="networking">Networking</option>
            <option value="campus events">Campus Events</option>
          </select>

          <label htmlFor="date">Date:</label>
          <input
            type="date"
            id="date"
            name="date"
            value={newEventData.date}
            onChange={handleInputChange}
          />

          <label htmlFor="location">Location:</label>
          <input
            type="text"
            id="location"
            name="location"
            value={newEventData.location}
            onChange={handleInputChange}
          />

          <button onClick={handleSaveEvent}>Save</button>
          <button onClick={handleCancelEvent}>Cancel</button>
        </div>
      )}

      {searchResults && searchResults._id != null ? (
        <div className="e-cards" style={{ display: 'flex', flexFlow: 'row wrap' }}>
          <EditableEventCard
            key={searchResults._id}
            img={searchResults.imageUrl}
            title={searchResults.title}
            description={searchResults.description}
            date={new Date(searchResults.date).toLocaleDateString('en-US', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
            location={searchResults.location}
            eventId={searchResults._id}
          />
        </div>
      ) : (
        <div className="no-results"></div>
      )}

      <div className="mains">
        {events.map((event) => (
          <EditableEventCard
            key={event._id}
            img={event.imageUrl}
            title={event.title}
            description={event.description}
            date={event.date}
            location={event.location}
            eventId={event._id}
          />
        ))}
      </div>
    </>
  );
};

