import DashFrame from "../../../components/dashframe/DashboardFrame";
import "../dash.scss";
import EditableEventCard from "../../../components/eventcard/EditableEvent";
import DashHero from "../../../components/hero/DashHero";
import {useState, useEffect } from 'react'
import SearchBar from "../../../components/searchbar/Searchbar";

export default function AlumniEvents() {
  return (
    <>
      <DashHero name='Admin'/>
      <DashFrame main={<AlEvents />} isAdmin={true} />
    </>
  );
}

const AlEvents = () => {
  const [events, setEvents] = useState([]);


  const [searchResults, setSearchResults] = useState(null);


  // Callback function to handle search results
  const handleSearch = (data) => {
    setSearchResults(data);
  };

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch("http://localhost:3000/event/events");
        const data = await response.json();

        setEvents(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchEvents();
  }, [events]);

  return (
    <>
    
    <div className="record">
        <SearchBar placeholder='Search Events'  serverRoute='event/events/title' onSearch={handleSearch}  />
      </div>
      

      {searchResults && searchResults._id != null ? (
            <div className="e-cards" style={{display:'flex',flexFlow:'row wrap'}}>
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
            <div className="no-results">
             
            </div>
          )}
        


      <div className="mains">
        {events.map(event => (
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


// import { useState, useEffect } from 'react';
// import SearchBar from "../../../components/searchbar/Searchbar";
// import EditableEventCard from "../../../components/eventcard/EditableEvent";
// import DashHero from "../../../components/hero/DashHero";
// import DashFrame from "../../../components/dashframe/DashboardFrame";
// import { useAuth } from '../../../utils/AuthContext';

// const AlEvents = () => {
//   const { userData} = useAuth();


//   const [events, setEvents] = useState([]);
//   const [searchResults, setSearchResults] = useState(null);
//   const [showAddEventFields, setShowAddEventFields] = useState(false);
//   const [newEvent, setNewEvent] = useState({
//     title: '',
//     description: '',
//     category: '',
//     date: '',
//     organizer: userData._id,
//     imageUrl: '',
//     location: '',
//   });

//   const handleSearch = (data) => {
//     setSearchResults(data);
//   };

//   useEffect(() => {
//     const fetchEvents = async () => {
//       try {
//         const response = await fetch("http://localhost:3000/event/events");
//         const data = await response.json();

//         setEvents(data);
//       } catch (error) {
//         console.error(error);
//       }
//     };

//     fetchEvents();
//   }, [events]);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setNewEvent((prevEvent) => ({ ...prevEvent, [name]: value }));
//   };

//   const handleSaveEvent = async () => {
//     try {
//       const response = await fetch("http://localhost:3000/event/add", {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(newEvent),
//       });

//       if (response.ok) {
//         const eventData = await response.json();
//         setEvents((prevEvents) => [...prevEvents, eventData]);
//         setShowAddEventFields(false);
//         setNewEvent({
//           title: '',
//           description: '',
//           category: '',
//           date: '',
//           imageUrl: '',
//           location: '',
//         });
//       } else {
//         console.error('Failed to add event');
//       }
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const handleCancelAddEvent = () => {
//     setShowAddEventFields(false);
//     setNewEvent({
//       title: '',
//       description: '',
//       category: '',
//       date: '',
//       imageUrl: '',
//       location: '',
//     });
//   };

//   return (
//     <>
//       <DashHero name='Admin'/>
//       <DashFrame main={<AlEvents />} isAdmin={true} />

//       <div className="record">
//         <button onClick={() => setShowAddEventFields(true)}>Add Event</button>
//         <SearchBar placeholder='Search Events' serverRoute='event/events/title' onSearch={handleSearch} />
//       </div>

//       {showAddEventFields && (
//         <div className="add-event-fields">
//           <input
//             type="text"
//             placeholder="Title"
//             name="title"
//             value={newEvent.title}
//             onChange={handleInputChange}
//           />
//           <input
//             type="text"
//             placeholder="Description"
//             name="description"
//             value={newEvent.description}
//             onChange={handleInputChange}
//           />
//          <select
//             name="category"
//             value={newEvent.category}
//             onChange={handleInputChange}
//           >
//             <option value="" disabled>Select a category</option>
//             <option value="professional development">Professional Development</option>
//             <option value="networking">Networking</option>
//             <option value="campus events">Campus Events</option>
//           </select>
//           <input
//             type="date"
//             placeholder="Date"
//             name="date"
//             value={newEvent.date}
//             onChange={handleInputChange}
//           />
       
//           <input
//             type="text"
//             placeholder="Image URL"
//             name="imageUrl"
//             value={newEvent.imageUrl}
//             onChange={handleInputChange}
//           />
//           <input
//             type="text"
//             placeholder="Location"
//             name="location"
//             value={newEvent.location}
//             onChange={handleInputChange}
//           />
//           <button onClick={handleSaveEvent}>Save</button>
//           <button onClick={handleCancelAddEvent}>Cancel</button>
//         </div>
//       )}

//       <div className="mains">
//         {searchResults && searchResults._id != null ? (
//           <div className="e-cards" style={{ display: 'flex', flexFlow: 'row wrap' }}>
//             <EditableEventCard
//               key={searchResults._id}
//               img={searchResults.imageUrl}
//               title={searchResults.title}
//               description={searchResults.description}
//               date={new Date(searchResults.date).toLocaleDateString('en-US', {
//                 weekday: 'long',
//                 year: 'numeric',
//                 month: 'long',
//                 day: 'numeric',
//               })}
//               location={searchResults.location}
//               eventId={searchResults._id}
//             />
//           </div>
//         ) : (
//           <div className="no-results">
//             {/* Display a message or component for no search results */}
//           </div>
//         )}

//         {events.map((event) => (
//           <EditableEventCard
//             key={event._id}
//             img={event.imageUrl}
//             title={event.title}
//             description={event.description}
//             date={event.date}
//             location={event.location}
//             eventId={event._id}
//           />
//         ))}
//       </div>
//     </>
//   );
// };

// export default AlEvents;

