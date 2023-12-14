import React, { useState } from "react";
import './card.scss'
import { API_URL} from "../../utils/services.js";

export default function EventForm({ onClose, onEventCreate }) {
    const [eventData, setEventData] = useState({
        title: "",
        description: "",
        date: "",
        category: "professional development", // Default category
        organizer: "6539800f32228eec5550033b", // Default organizer
    });

    const [error, setError] = useState(null);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEventData({ ...eventData, [name]: value });
    };

    const handleCreateEvent = () => {
        // Send the eventData to the server to create the event
        fetch("${API_URL}/event/add", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(eventData),
        })
            .then((response) => {
                if (response.status === 200) {
                    return response.json();
                } else if (response.status === 400) {
                    throw new Error("Bad Request: Please check your input.");
                } else {
                    throw new Error("Event creation failed");
                }
            })
            .then((data) => {
                alert('Event Created');
                onEventCreate(data);
                onClose();
            })
            .catch((error) => {
                setError(error.message);
                console.error("Error creating event:", error);
            });
    };

    return (
        <div className="event-form">
            <h2>Create an Event</h2>
            {error && <div className="error-message">{error}</div>}
            <form>
                <label>
                    Title:
                    <input
                        type="text"
                        name="title"
                        value={eventData.title}
                        onChange={handleInputChange}
                    />
                </label>
                <label>
                    Description:
                    <textarea
                        name="description"
                        value={eventData.description}
                        onChange={handleInputChange}
                    />
                </label>
                <label>
                    Date:
                    <input
                        type="date"
                        name="date"
                        value={eventData.date}
                        onChange={handleInputChange}
                    />
                </label>
                <label>
                    Category:
                    <select
                        name="category"
                        value={eventData.category}
                        onChange={handleInputChange}
                    >
                        <option value="professional development">Professional Development</option>
                        <option value="networking">Networking</option>
                        <option value="campus events">Campus Events</option>
                    </select>
                </label>
            </form>
            <div className="form-buttons">
                <button onClick={handleCreateEvent}>Save</button>
                <button onClick={onClose}>Cancel</button>
            </div>
        </div>
    );
}
