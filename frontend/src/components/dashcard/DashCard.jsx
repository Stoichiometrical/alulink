// // DashCard.jsx
//
import "./dashcard.scss";
// import EditableEventCard from "../eventcard/EditableEvent.jsx";
//
// export default function DashCard({ event}) {
//     return (
//         <div className='dash-card'>
//             <h2>{event.organizer.fullName}'s Events</h2>
//             <div className='d-cards'>
//                 <EditableEventCard event={event} />
//             </div>
//         </div>
//     );
// }


import React, { useState, useEffect } from 'react';
import EditableEventCard from '../eventcard/EditableEvent.jsx';
import { API_URL } from '../../utils/services.js';

export default function DashCard({ userId,user }) {
    const [userEvents, setUserEvents] = useState([]);

    useEffect(() => {
        // Fetch events by user ID when the component mounts
        const fetchUserEvents = async () => {
            try {
                const response = await fetch(`${API_URL}/event/events/user/${userId}`);
                console.log(response)
                if (!response.ok) {
                    console.error('Failed to fetch user events:', await response.json());
                    return;
                }

                const data = await response.json();
                setUserEvents(data);
            } catch (error) {
                console.error('Error fetching user events:', error);
            }
        };

        fetchUserEvents();
    }, [userId]); // Fetch user events when userId changes

    return (
        <div className='dash-card'>
            <h2>{user.fullName}'s Events</h2>
            <div className='d-cards'>
                {userEvents.map((event) => (
                    // <EditableEventCard key={event._id} event={event} />
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
        </div>
    );
}
