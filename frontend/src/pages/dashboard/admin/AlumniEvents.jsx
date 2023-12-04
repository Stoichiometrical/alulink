// import DashFrame from "../../../components/dashframe/DashboardFrame";
// import "../dash.scss";
// import EditableEventCard from "../../../components/eventcard/EditableEvent";
// import DashHero from "../../../components/hero/DashHero";
// import {useState, useEffect } from 'react'
// import SearchBar from "../../../components/searchbar/Searchbar";
// import { useAuth } from '../../utils/AuthContext'

// export default function AlumniEvents() {

//   const { userData} = useAuth();
  
//   return (
//     <>
//       <DashHero name='Admin'/>
//       <DashFrame main={<AlEvents />} isAdmin={true} />
//     </>
//   );
// }

// const AlEvents = () => {
//   const [events, setEvents] = useState([]);


//   const [searchResults, setSearchResults] = useState(null);


//   // Callback function to handle search results
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

//   return (
//     <>
    
//     <div className="record">
//         <SearchBar placeholder='Search Events'  serverRoute='event/events/title' onSearch={handleSearch}  />
//       </div>

//       <button>Add Event</button>
      

//       {searchResults && searchResults._id != null ? (
//             <div className="e-cards" style={{display:'flex',flexFlow:'row wrap'}}>
//         <EditableEventCard
//       key={searchResults._id}
//       img={searchResults.imageUrl}
//       title={searchResults.title}
//       description={searchResults.description}
//       date={new Date(searchResults.date).toLocaleDateString('en-US', {
//         weekday: 'long',
//         year: 'numeric',
//         month: 'long',
//         day: 'numeric',
//       })}
//       location={searchResults.location}
//       eventId={searchResults._id}
//     />
  
    
//    </div>

//           ) : (
//             <div className="no-results">
             
//             </div>
//           )}
        


//       <div className="mains">
//         {events.map(event => (
//         <EditableEventCard
//           key={event._id}
//           img={event.imageUrl}
//           title={event.title}
//           description={event.description}
//           date={event.date}
//           location={event.location}
//           eventId={event._id}
         
//         />
//       ))}
//       </div>
//     </>
//   );
// };


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



// import React, { useState, useEffect } from 'react';
// import DashFrame from '../../../components/dashframe/DashboardFrame';
// import '../dash.scss';
// import EditableEventCard from '../../../components/eventcard/EditableEvent';
// import DashHero from '../../../components/hero/DashHero';
// import SearchBar from '../../../components/searchbar/Searchbar';
// import { useAuth } from  '../../../utils/AuthContext'

// export default function AlumniEvents() {
//   return (
//     <>
//       <DashHero name="Admin" />
//       <DashFrame main={<AlEvents />} isAdmin={true} />
//     </>
//   );
// }

// const AlEvents = () => {
//   const [events, setEvents] = useState([]);
//   const { userData} = useAuth();
//   const [showAddEventForm, setShowAddEventForm] = useState(false);
//   const [newEventData, setNewEventData] = useState({
//     title: '',
//     description: '',
//     category: '',
//     date: '',
//     location: '',
//     organizer: userData._id
//   });

//   const [searchResults, setSearchResults] = useState(null);

//   // Callback function to handle search results
//   const handleSearch = (data) => {
//     setSearchResults(data);
//   };

//   useEffect(() => {
//     const fetchEvents = async () => {
//       try {
//         const response = await fetch('http://localhost:3000/event/events');
//         const data = await response.json();

//         setEvents(data);
//       } catch (error) {
//         console.error(error);
//       }
//     };

//     fetchEvents();
//   }, [events]);

//   const handleAddEvent = () => {
//     setShowAddEventForm(true);
//   };

//   const handleSaveEvent = async () => {
//     try {
//       // Replace the placeholder URL with your actual add event endpoint
//       const addEventEndpoint = 'http://localhost:3000/event/add';
//       const response = await fetch(addEventEndpoint, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(newEventData),
//       });

//       if (!response.ok) {
//         throw new Error('Failed to add event');
//       }

//       // Reset the form data and hide the form after successful addition
//       setNewEventData({
//         title: '',
//         description: '',
//         category: '',
//         date: '',
//         location: '',
//       });
//       setShowAddEventForm(false);
//     } catch (error) {
//       console.error('Error adding event:', error.message);
//     }
//   };

//   const handleInputChange = (e) => {
//     // Update the new event data when input fields change
//     setNewEventData({
//       ...newEventData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   return (
//     <>
//       <div className="record">
//         <SearchBar
//           placeholder="Search Events"
//           serverRoute="event/events/title"
//           onSearch={handleSearch}
//         />
//       </div>

//       <button onClick={handleAddEvent}>Add Event</button>

//       {showAddEventForm && (
//         <div>
//           <label htmlFor="title">Title:</label>
//           <input
//             type="text"
//             id="title"
//             name="title"
//             value={newEventData.title}
//             onChange={handleInputChange}
//           />

//           <label htmlFor="description">Description:</label>
//           <input
//             type="text"
//             id="description"
//             name="description"
//             value={newEventData.description}
//             onChange={handleInputChange}
//           />

//           <label htmlFor="category">Category:</label>
//           <input
//             type="text"
//             id="category"
//             name="category"
//             value={newEventData.category}
//             onChange={handleInputChange}
//           />

//           <label htmlFor="date">Date:</label>
//           <input
//             type="text"
//             id="date"
//             name="date"
//             value={newEventData.date}
//             onChange={handleInputChange}
//           />

//           <label htmlFor="location">Location:</label>
//           <input
//             type="text"
//             id="location"
//             name="location"
//             value={newEventData.location}
//             onChange={handleInputChange}
//           />

//           <button onClick={handleSaveEvent}>Save</button>
//         </div>
//       )}

//       {searchResults && searchResults._id != null ? (
//         <div className="e-cards" style={{ display: 'flex', flexFlow: 'row wrap' }}>
//           <EditableEventCard
//             key={searchResults._id}
//             img={searchResults.imageUrl}
//             title={searchResults.title}
//             description={searchResults.description}
//             date={new Date(searchResults.date).toLocaleDateString('en-US', {
//               weekday: 'long',
//               year: 'numeric',
//               month: 'long',
//               day: 'numeric',
//             })}
//             location={searchResults.location}
//             eventId={searchResults._id}
//           />
//         </div>
//       ) : (
//         <div className="no-results"></div>
//       )}

//       <div className="mains">
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


import React, { useState, useEffect } from 'react';
import DashFrame from '../../../components/dashframe/DashboardFrame';
import '../dash.scss';
import EditableEventCard from '../../../components/eventcard/EditableEvent';
import DashHero from '../../../components/hero/DashHero';
import SearchBar from '../../../components/searchbar/Searchbar';
import { useAuth } from '../../../utils/AuthContext';

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
        const response = await fetch('http://localhost:3000/event/events');
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
      // Replace the placeholder URL with your actual add event endpoint
      const addEventEndpoint = 'http://localhost:3000/event/add';
      const response = await fetch(addEventEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newEventData),
      });

      if (!response.ok) {
        throw new Error('Failed to add event');
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
          <input
            type="text"
            id="category"
            name="category"
            value={newEventData.category}
            onChange={handleInputChange}
          />

          <label htmlFor="date">Date:</label>
          <input
            type="text"
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

