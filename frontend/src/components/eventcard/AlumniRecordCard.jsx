

import React, { useState } from 'react';
import "./card.scss";

export default function AlumniRecordCard({ id, imageUrl, fullName, graduationYear, degreeProgram, email, onDelete, onEdit, role }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState({
    fullName,
    graduationYear,
    degreeProgram,
    email,
    role,
  });

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    // Reset the edited data to the original values
    setEditedData({
      fullName,
      graduationYear,
      degreeProgram,
      email,
      role,
    });
  };

  const handleSaveEdit = async () => {
    try {
      // Replace the placeholder URL with the actual update endpoint
      const updateEndpoint = `http://localhost:3000/alumni/${id}`;

      const onUpdate = async (updateEndpoint, editedData) => {
        try {
          // Assuming updateEndpoint is a valid URL for updating alumni record
          const response = await fetch(updateEndpoint, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(editedData),
          });

          if (!response.ok) {
            throw new Error('Failed to update alumni record');
          }

          // Handle success, e.g., show a success message
          console.log('Alumni record updated successfully');
        } catch (error) {
          console.error('Error updating alumni record:', error.message);
          // Handle error, e.g., show an error message to the user
        }
      };
      // Assuming onUpdate makes a PUT request to update the alumni record
      await onUpdate(updateEndpoint, editedData);
      setIsEditing(false);
    } catch (error) {
      console.error('Error saving edited alumni record:', error.message);
    }
  };

  const handleDelete = async () => {
    try {
      // Show a confirmation dialog
      const confirmDelete = window.confirm("Are you sure you want to delete this alumni record?");
      if (confirmDelete) {
        // Replace the placeholder URL with the actual delete endpoint
        const deleteEndpoint = `http://localhost:3000/alumni/${id}`;

        const onDelete = async (deleteEndpoint) => {
          try {
            // Assuming deleteEndpoint is a valid URL for deleting alumni record
            const response = await fetch(deleteEndpoint, {
              method: 'DELETE',
            });

            if (!response.ok) {
              throw new Error('Failed to delete alumni record');
            }

            // Handle success, e.g., show a success message or perform additional actions
            console.log('Alumni record deleted successfully');
          } catch (error) {
            console.error('Error deleting alumni record:', error.message);
            // Handle error, e.g., show an error message to the user
          }
        };
        // Assuming onDelete makes a DELETE request to delete the alumni record
        await onDelete(deleteEndpoint);
      }
    } catch (error) {
      console.error('Error deleting alumni record:', error.message);
    }
  };

  const handleInputChange = (e) => {
    // Update the edited data when input fields change
    setEditedData({
      ...editedData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="event-card alum">
      <div className="img-sect">
        <img
          src={imageUrl}
          alt=""
          className="card-img"
        />
      </div>
      <div className="event-dets">
        {isEditing ? (
          <>
            <label htmlFor="fullName">Full Name:</label>
            <input type="text" id="fullName" name="fullName" value={editedData.fullName} onChange={handleInputChange} />

            <label htmlFor="graduationYear">Graduation Year:</label>
            <input type="text" id="graduationYear" name="graduationYear" value={editedData.graduationYear} onChange={handleInputChange} />

            <label htmlFor="degreeProgram">Degree Program:</label>
            <input type="text" id="degreeProgram" name="degreeProgram" value={editedData.degreeProgram} onChange={handleInputChange} />

            <label htmlFor="email">Email:</label>
            <input type="text" id="email" name="email" value={editedData.email} onChange={handleInputChange} />

            <label htmlFor="role">Role:</label>
            <select id="role" name="role" value={editedData.role} onChange={handleInputChange}>
              <option value="alumni">Alumni</option>
              <option value="admin">Admin</option>
            </select>
          </>
        ) : (
          <>
            <div className="event-title">{fullName}</div>
            <div className="card-det">Year: {graduationYear}</div>
            <div className="card-det">Degree: {degreeProgram}</div>
            <div className="card-det">Email: {email}</div>
            <div className="card-det">Role: {role}</div>
          </>
        )}
      </div>
      <div className="btn-sect">
        {isEditing ? (
          <>
            <button className="btn-save" onClick={handleSaveEdit}>Save</button>
            <button className="btn-cancel" onClick={handleCancelEdit}>Cancel</button>
          </>
        ) : (
          <>
            <button className="btn-edit" onClick={handleEdit}>Edit</button>
            <button className="btn-delete" onClick={handleDelete}>Delete</button>
          </>
        )}
      </div>
    </div>
  );
}




