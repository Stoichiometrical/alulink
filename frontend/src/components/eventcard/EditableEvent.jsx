import "./card.scss";
import { useState,useEffect } from "react";
import {API_URL} from "../../utils/services.js";



export default function EditableEventCard({
    img,
    title,
    description,
    date,
    location,
    eventId
  }) {
    const [isEditing, setIsEditing] = useState(false);
    const [editedFields, setEditedFields] = useState({
      title,
      description,
      date,
      location,
    });
  
    const handleEdit = () => {
      setIsEditing(true);
    };

    const handleSave = async () => {
        try {
          const response = await fetch(`${API_URL}/event/${eventId}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(editedFields),
          });

          console.log('Request Body:', JSON.stringify(editedFields)); 
      
          const responseData = await response.json();
        
          if (response.ok) {
            setIsEditing(false);
            if (onUpdate) {
              onUpdate(eventId, editedFields); // Pass updated data to the parent component
            }
            alert('Event successfully updated ');
          } else {
            console.error('Failed to update event:', responseData);
          }
        } catch (error) {
          console.error('Error updating event:', error);
        }
      };
      


    const handleCancel = () => {
      setIsEditing(false);
      // Reset the editedFields state to the original values
      setEditedFields({
        title,
        description,
        date,
        location,
      });
    };
  
    const handleDelete = async () => {
      try {
        const response = await fetch(`${API_URL}/event/${eventId}`, {
          method: 'DELETE',
        });
  
        if (response.ok) {
          alert('Event deleted successfully');
        } else {
          console.error('Failed to delete event:', await response.json());
        }
      } catch (error) {
        console.error('Error deleting event:', error);
      }
    };
  
    const handleInputChange = (name, value) => {
      // Update the editedFields state for the specific field being changed
      setEditedFields((prevFields) => ({
        ...prevFields,
        [name]: value,
      }));
    };
  
    return (
      <div className="event-card">
        <div className="img-sect">
          <img src={img} alt="Photo" className="card-img" />
          <div className="img-title">{title}</div>
        </div>
        <div className="event-dets">
          {isEditing ? (
            <div>
              <label>Title:</label>
              <input
                type="text"
                value={editedFields.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
              />
  
              <label>Description:</label>
              <input
                type="text"
                value={editedFields.desc}
                onChange={(e) => handleInputChange('description', e.target.value)}
              />
  
              <label>Date:</label>
              <input
                type="date"
                value={editedFields.date}
                onChange={(e) => handleInputChange('date', e.target.value)}
              />
  
              <label>Location:</label>
              <input
                type="text"
                value={editedFields.location}
                onChange={(e) => handleInputChange('location', e.target.value)}
              />
  
              <button onClick={handleSave}>Save</button>
              <button onClick={handleCancel}>Cancel</button>
            </div>
          ) : (
            <>
              <div className="event-desc">{description}</div>
              <div className="event-time">{date}</div>
              <div className="event-location">{location}</div>
            </>
          )}
          <div className="btn-sect">
            <button className="btn-edit" onClick={handleEdit} disabled={isEditing}>
              Edit
            </button>
            <button className="btn-delete" onClick={handleDelete} disabled={isEditing}>
              Delete
            </button>
          </div>
        </div>
      </div>
    );
  }



