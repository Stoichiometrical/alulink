import React, { useEffect, useState } from "react";
import "./dash.scss";
import Navbar from "../../components/navbar/Navbar.jsx";
import MyEventCard from "../../components/eventcard/MyEventCard.jsx";
import RegisteredEvents from "../../components/eventcard/RegisteredEvents.jsx";
import Footer from "../../components/footer/Footer.jsx";
import ImgMediaCard from "../../components/eventcard/ImgCard.jsx";
import MultiActionAreaCard from "../../components/eventcard/ImgCancel.jsx";
import Button from "@mui/material/Button";
import EventForm from "../../components/eventcard/EventForm.jsx"; // Import the EventForm component
import DashHero from "../../components/hero/DashHero";


export default function AlumniDashboard() {
    const [events, setEvents] = useState([]);
    const [isFormVisible, setFormVisible] = useState(false);

    useEffect(() => {
        // Fetch events from the server
        fetch("http://localhost:3000/event/events")
            .then((response) => response.json())
            .then((data) => setEvents(data))
            .catch((error) => console.error("Error fetching events:", error));
    }, [events]);

    const handleCreateEvent = (eventData) => {
        // Update the state with the newly created event
        setEvents([...events, eventData]);
    };

    return (
        <div className="alumni-dash">
            <DashHero/>

            <div className="my-events">
                <h2>My Events</h2>
                <div className="events-sect">
                    <div className="f-sect cards-section">
                        <ImgMediaCard
                            img="https://images.pexels.com/photos/2774556/pexels-photo-2774556.jpeg?auto=compress&cs=tinysrgb&w=600"
                            title="The Great Show"
                        />
                        <ImgMediaCard
                            img="https://images.pexels.com/photos/2833037/pexels-photo-2833037.jpeg?auto=compress&cs=tinysrgb&w=600"
                            title="The Great Revel"
                        />
                        <ImgMediaCard
                            img="https://images.pexels.com/photos/1709003/pexels-photo-1709003.jpeg?auto=compress&cs=tinysrgb&w=600"
                            title="The Networking Buzz"
                        />
                        <ImgMediaCard
                            img="https://images.pexels.com/photos/716276/pexels-photo-716276.jpeg?auto=compress&cs=tinysrgb&w=600"
                            title="Devfest"
                        />
                    </div>

                    <div className="f-sect cards-section">
                        {events.map((event) => (
                            <MyEventCard
                                key={event._id}
                                title={event.title}
                                desc={event.description}
                                time={event.date}
                                eventId={event._id}
                                events={events}
                            />
                        ))}
                    </div>
                </div>
                <div className="add-more">
                    <Button
                        variant="contained"
                        disableElevation
                        onClick={() => setFormVisible(true)}
                    >
                        Add An Event
                    </Button>
                </div>
                {isFormVisible && (
                    <EventForm onClose={() => setFormVisible(false)} onEventCreate={handleCreateEvent} />
                )}
            </div>
            <div className="registered-events">
                <h2>Registered Events</h2>
                <div className="reg-sect">
                    <div className="f-sect cards-section">
                        <MultiActionAreaCard
                            im="https://images.pexels.com/photos/5935186/pexels-photo-5935186.jpeg?auto=compress&cs=tinysrgb&w=600"
                            title="ReUnion 2024"
                        />
                        <MultiActionAreaCard
                            im="https://images.pexels.com/photos/2182975/pexels-photo-2182975.jpeg?auto=compress&cs=tinysrgb&w=600"
                            title="Networking 101"
                        />
                        <MultiActionAreaCard
                            im="https://images.pexels.com/photos/2608517/pexels-photo-2608517.jpeg?auto=compress&cs=tinysrgb&w=600"
                            title="Alumni Retreat"
                        />
                        <MultiActionAreaCard
                            im="https://images.pexels.com/photos/3321793/pexels-photo-3321793.jpeg?auto=compress&cs=tinysrgb&w=600"
                            title="Fireside Chat with Tony"
                        />
                    </div>
                </div>
                <div className="view-upcoming">
                    <Button variant="contained" disableElevation>
                        View More Upcoming Events
                    </Button>
                </div>
                <Footer />
            </div>
        </div>
    );
}
