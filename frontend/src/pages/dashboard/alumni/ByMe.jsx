import "./alumni.scss";
import DashHero from "../../../components/hero/DashHero";
import DashFrame from "../../../components/dashframe/DashboardFrame";
import EditableEventCard from "../../../components/eventcard/EditableEvent";

import { useState, useEffect } from "react";
import { useAuth } from "../../../utils/AuthContext";

export default function ByMe() {
  const [events, setEvents] = useState([]);
  const auth = useAuth();
  const userId = auth.userData?._id;

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
          `http://localhost:3000/event/events/organized/${userId}`
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
        <DashFrame main={<ByMes events={events}  handleUpdate={handleUpdate}/>} />
      </div>
    </div>
  );
}

const ByMes = ({ events, handleUpdate }) => {
    
  return (
    <div className="mains">

     <button>Add Event</button>

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
  );
};
