// import DashHero from "../../../components/hero/DashHero";
// import DashFrame from "../../../components/dashframe/DashboardFrame";

// import React, { useEffect, useState } from "react";
// import AvailableEventCard from "../../../components/eventcard/AvailableEventCard";
// import "./alumni.scss";
// import { useAuth } from "../../../utils/AuthContext";

// export default function Attending() {
//   return (
//     <div className="dashboard">
//       <div>
//         <DashHero />
//       </div>

//       <div className="frame">
//         <DashFrame main={<Attend />} />
//       </div>
//     </div>
//   );
// }

// export const Attend = () => {
//   const [registeredEvents, setRegisteredEvents] = useState([]);

//   const auth = useAuth();
//   const userId = auth.userData?._id;

//   useEffect(() => {
//     fetchRegisteredEvents(userId);
//   }, []); 

//   const fetchRegisteredEvents = async (userId) => {
//     try {
//       const response = await fetch(
//         `http://localhost:3000/event/events/registered/${userId}`
//       );
//       if (response.ok) {
//         const data = await response.json();
//         setRegisteredEvents(data);
//       } else {
//         console.error(
//           "Failed to fetch registered events:",
//           await response.json()
//         );
//       }
//     } catch (error) {
//       console.error("An error occurred during the fetch:", error);
//     }
//   };

//   return (
//     <div className="mains">
         

//       {registeredEvents.map((event) => (
//         <AvailableEventCard
//           key={event._id}
//           eventId={event._id}
//           img={event.imageUrl}
//           title={event.title}
//           desc={event.description}
//           date={event.date}
//           location={event.location}
//           isRSVP={true}
//         />
//       ))}
//     </div>
//   );
// };


import DashHero from "../../../components/hero/DashHero";
import DashFrame from "../../../components/dashframe/DashboardFrame";
import React, { useEffect, useState } from "react";
import AvailableEventCard from "../../../components/eventcard/AvailableEventCard";
import "./alumni.scss";
import { useAuth } from "../../../utils/AuthContext";
import { Link } from 'react-router-dom'
import {API_URL} from "../../../utils/services.js";

export default function Attending() {
  return (
    <div className="dashboard">
      <div>
        <DashHero />
      </div>

      <div className="frame">
        <DashFrame main={<Attend />} />
      </div>
    </div>
  );
}

export const Attend = () => {
  const [registeredEvents, setRegisteredEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  const auth = useAuth();
  const userId = auth.userData?._id;

  useEffect(() => {
    fetchRegisteredEvents(userId);
  }, [userId]);

  const fetchRegisteredEvents = async (userId) => {
    try {
      const response = await fetch(
        `${API_URL}/event/events/registered/${userId}`
      );
      if (response.ok) {
        const data = await response.json();
        setRegisteredEvents(data);
      } else {
        console.error(
          "Failed to fetch registered events:",
          await response.json()
        );
      }
    } catch (error) {
      console.error("An error occurred during the fetch:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mains">
      {loading ? (
        <p>Loading...</p>
      ) : registeredEvents.length === 0 ? (
        <div style={{marginLeft:'30%'}}>
                 <h3 >No events registered</h3>
         <button><Link to='/events' style={{color:'#F6D600'}}>Click Here To View Upcoming Events</Link></button>
        </div>
       
      ) : (
        registeredEvents.map((event) => (
          <AvailableEventCard
            key={event._id}
            eventId={event._id}
            img={event.imageUrl}
            title={event.title}
            desc={event.description}
            date={event.date}
            location={event.location}
            isRSVP={true}
          />
        ))
      )}
    </div>
  );
};
