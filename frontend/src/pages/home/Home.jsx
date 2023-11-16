import React, { useState, useEffect } from 'react';
import HomeHero from '../../components/hero/HomeHero';
import AvailableEventCard from '../../components/eventcard/AvailableEventCard';
import './home.scss';
import { Link } from 'react-router-dom';
import Footer from '../../components/footer/Footer';

export default function Home() {
  const [latestEvents, setLatestEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch the latest events when the component mounts
    fetch('http://localhost:3000/event/latest')
      .then(response => response.json())
      .then(data => {
        setLatestEvents(data);
        setLoading(false); // Set loading to false after fetching data
      })
      .catch(error => {
        console.error('Error fetching latest events:', error);
        setLoading(false); // Set loading to false in case of an error
      });
  }, []); // The empty dependency array ensures that this effect runs once on mount

  return (
    <>
      <HomeHero />
      <div className='home-main'>
        <h2>Upcoming Events</h2>
        {loading ? (
          // Display loading image while fetching events
          <img
            src='https://media.tenor.com/hlKEXPvlX48AAAAi/loading-loader.gif'
            alt='Loading...'
            className='loading-image'
          />
        ) : (
          // Display event cards once data is loaded
          <div className='e-cards' id='e-cards'>
            {latestEvents.map(event => (
              <AvailableEventCard
                key={event._id}
                img={event.imageUrl}
                title={event.title}
                desc={event.description}
                date={event.date}
                location={event.location}
              />
            ))}
          </div>
        )}
        <Link to='/events' className='view-more'>
          View More
        </Link>
      </div>

      <div className='home-about'>
        <h2>About Us</h2>
        <div className='about-sect'>
          <img
            src='https://images.pexels.com/photos/2833037/pexels-photo-2833037.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
            alt='Mising'
          />
          <div className='as-text'>
            ALULINK is a platform that connects students and faculty in the ALU community. It is designed to bring together students from all corners of the world. At ALULINK, we understand the power of the ALU community. This platform is your gateway to reconnect with classmates, engage in enriching collaborations, and participate in exciting alumni-led events. Whether you're seeking professional opportunities, planning reunions, or simply want to stay connected with the spirit of ALU, ALULINK is your go-to destination.
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
