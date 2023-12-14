import React, { useContext, useState, useEffect } from "react";
import "./card.scss";
import { useAuth } from "../../utils/AuthContext";
import {API_URL} from "../../utils/services.js";

export default function AvailableEventCard({
  img,
  title,
  desc,
  date,
  location,
  eventId,
  availability,
}) {
  const auth = useAuth();
  const userId = auth.userData?._id;
  const [isRSVP, setIsRSVP] = useState(false);
  useEffect(() => {
    if (availability==true) {
      setIsRSVP(true);
    }
  }, [availability]);

  const handleRSVP = async () => {
    if (!userId) {
      alert("Please log in to join events.");
      return;
    }

    const confirmationMessage = isRSVP
      ? "Do you want to cancel RSVP?"
      : "Confirm Attendance?";

    const confirmAction = window.confirm(confirmationMessage);

    if (confirmAction) {
      try {
        const response = await fetch(
          `${API_URL}/event/${isRSVP ? "leave" : "join"}/${eventId}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ userId }),
          }
        );

        if (response.ok) {
          // Handle success, update UI or state accordingly
          const successMessage = isRSVP
            ? "You have successfully left this event"
            : "You have successfully joined this event";

          alert(successMessage);
          setIsRSVP(!isRSVP);
        } else {
          // Handle error, show error message or perform other actions
          console.error("Failed to RSVP:", await response.json());
          alert("You already signed up for this event");
        }
      } catch (error) {
        // Handle network or other errors
        console.error("An error occurred during RSVP:", error);
      }
    }
  };

  return (
    <div className="event-card">
      <div className="img-sect">
        <img src={img} alt="" className="card-img" />
        <div className="img-title">{title}</div>
      </div>
      <div className="event-dets">
        <div className="event-desc">{desc}</div>
        <div className="event-time">{date}</div>
        <div className="event-location">{location}</div>
        <div className="btn-sect">
          <button className="btn" onClick={handleRSVP}>
            {isRSVP ? "Cancel RSVP" : "RSVP"}
          </button>
        </div>
      </div>
    </div>
  );
}
