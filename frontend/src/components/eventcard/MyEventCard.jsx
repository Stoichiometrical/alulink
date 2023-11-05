import React, { useState } from "react";
import "./card.scss";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function MyEventCard({ title, desc, time, eventId, onDelete, onUpdate,events }) {
    const [isModifying, setIsModifying] = useState(false);
    const [updatedTitle, setUpdatedTitle] = useState(title);
    const [updatedDescription, setUpdatedDescription] = useState(desc);
    const [updatedTime, setUpdatedTime] = useState(time);

    const handleDelete = () => {
        // Make a DELETE request to your server to delete the event
        fetch(`http://localhost:3000/event/${eventId}`, {
            method: 'DELETE',
        })
            .then((response) => {
                if (response.status === 200) {
                    // Check for the confirmation message in the response body
                    response.json().then((data) => {
                        if (data.message === "Event deleted successfully") {
                           alert("Event Deleted")
                        } else {
                            // Handle other success scenarios or unexpected responses
                            console.error('Unexpected response:', data);
                        }
                    });
                } else {
                    // Handle errors here
                    console.error('Error deleting event');
                }
            })
            .catch((error) => {
                console.error('Error deleting event:', error);
            });
    };



    const handleModify = () => {
        setIsModifying(true);
    };

    const handleCancelModify = () => {
        setIsModifying(false);
    };

    const handleUpdate = () => {
        // Create an object containing all the updated event details
        const updatedEvent = {
            title: updatedTitle,
            description: updatedDescription,
            date: updatedTime,
        };

        // Make a PUT request to update the event
        fetch(`http://localhost:3000/event/${eventId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedEvent),
        })
            .then((response) => {
                if (response.status === 200) {
                    setIsModifying(false); // Hide the modification form

                } else {
                    // Handle errors here
                    console.error("Error updating event");
                }
            })
            .catch((error) => {
                console.error("Error updating event:", error);
            });
    };


    return (
        <>
            <Card sx={{ maxWidth: 345, marginBottom: "2%" }}>
                <CardMedia
                    component="img"
                    alt="green iguana"
                    height="140"
                    image="https://images.pexels.com/photos/2774556/pexels-photo-2774556.jpeg?auto=compress&cs=tinysrgb&w=600"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {isModifying ? (
                            <form>
                                <input
                                    type="text"
                                    value={updatedTitle}
                                    onChange={(e) => setUpdatedTitle(e.target.value)}
                                />
                                <textarea
                                    value={updatedDescription}
                                    onChange={(e) =>
                                        setUpdatedDescription(e.target.value)
                                    }
                                ></textarea>
                                <input
                                    type="text"
                                    value={updatedTime}
                                    onChange={(e) => setUpdatedTime(e.target.value)}
                                />
                            </form>
                        ) : (
                            title
                        )}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{display:'flex',flexDirection:'column',gap:'2%'}}>
                        <div className="desc">{desc}</div>
                        <div className='time'>{time}</div>
                    </Typography>
                </CardContent>
                <CardActions>
                    {isModifying ? (
                        <>
                            <Button size="small" onClick={handleUpdate}>
                                Save
                            </Button>
                            <Button size="small" onClick={handleCancelModify}>
                                Cancel
                            </Button>
                        </>
                    ) : (
                        <>
                            <Button size="small" onClick={handleModify}>
                                Modify
                            </Button>
                            <Button size="small" onClick={handleDelete}>
                                Delete
                            </Button>
                        </>
                    )}
                </CardActions>
            </Card>
        </>
    );
}
