
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./alumni.scss";
import '../dash.scss'
import DashHero from "../../../components/hero/DashHero";
import DashFrame from "../../../components/dashframe/DashboardFrame";
import EditableEventCard from "../../../components/eventcard/EditableEvent";
import { useAuth } from "../../../utils/AuthContext";
import {API_URL} from "../../../utils/services.js";

export default function ByMe() {
  const [events, setEvents] = useState([]);
  const { userData } = useAuth()
  const userId = userData?._id;

  const handleUpdate = (eventId, updatedData) => {
    // Update the events array in state with the updated data
    setEvents((prevEvents) =>
      prevEvents.map((event) =>
        event._id === eventId ? { ...event, ...updatedData } : event
      )
    );
  };

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch(
          `${API_URL}/event/events/organized/${userId}`
        );
        if (response.ok) {
          const data = await response.json();
          setEvents(data);
        } else {
          console.error("Failed to fetch events:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, [userId, events]);

  return (
    <div className="dashboard">
      <div>
        <DashHero />
      </div>

      <div className="frame">
        <DashFrame main={<ByMes events={events} handleUpdate={handleUpdate} />} />
      </div>
    </div>
  );
}

const ByMes = ({ events, handleUpdate }) => {
  const navigate = useNavigate();
  const { userData } = useAuth()
  const [showAddEventForm, setShowAddEventForm] = useState(false);
  const [newEventData, setNewEventData] = useState({
    title: "",
    description: "",
    category: "",
    date: "",
    location: "",
    organizer: userData._id
  });

  const handleAddEvent = () => {
    setShowAddEventForm(true);
  };

  const handleCancel = () => {
    setShowAddEventForm(false);
  };

  const handleChange = (e) => {
    setNewEventData({
      ...newEventData,
      [e.target.name]: e.target.value,
    });
  };

  const handleCreateEvent = async () => {
    try {
      const response = await fetch(`${API_URL}/event/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newEventData),
      });

      if (!response.ok) {
        throw new Error("Failed to create event");
      }else{
        alert('Event Succesfully Created')
      }

      setShowAddEventForm(false);
      setNewEventData({
        title: "",
        description: "",
        category: "",
        date: "",
        location: "",
      });

      alert("Event successfully created");
    } catch (error) {
      console.error("Error creating event:", error.message);
    }
  };

  return (
    <div className="mains byme">
      {showAddEventForm && (
        <div className="add-form">
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={newEventData.title}
            onChange={handleChange}
          />

          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            value={newEventData.description}
            onChange={handleChange}
          ></textarea>

          <label htmlFor="category">Category:</label>
          <select
            id="category"
            name="category"
            value={newEventData.category}
            onChange={handleChange}
            
          >
            <option value="">Select Category</option>
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
            onChange={handleChange}
          />

          <label htmlFor="location">Location:</label>
          <input
            type="text"
            id="location"
            name="location"
            value={newEventData.location}
            onChange={handleChange}
          />
          <div className='form-btns'>
            <button onClick={handleCreateEvent}>Create Event</button>
            <button onClick={handleCancel}>Cancel</button>
          </div>
        </div>
      )}

      {events.length === 0 ? (
        <div style={{ marginLeft: '30%' }}>
          <h3>No Events Organised Yet</h3>
          <button onClick={handleAddEvent}>Click Here To Create An Event</button>
        </div>
      ) : (
        <div className='event-by-me'>
          <div>
          <button onClick={handleAddEvent} className='adding'>Add Event</button>
          </div>
          
          {events.map((event) => (
            <EditableEventCard
              key={event._id}
              img={event.imageUrl}
              title={event.title}
              description={event.description}
              date={event.date}
              location={event.location}
              eventId={event._id}
              handleUpdate={handleUpdate}
            />
          ))}
        </div>
      )}
    </div>
  );
};
