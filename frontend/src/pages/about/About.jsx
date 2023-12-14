import React, { useState } from 'react';
import AboutHero from "../../components/hero/AboutHero";
import "./about.scss";
import Footer from '../../components/footer/Footer';

export default function About() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert('Please enter a valid email address.');
      return;
    }

    // Basic input validation
    if (!fullName || !email || !message) {
      alert('Please fill in all fields.');
      return;
    }

    // FormSubmit.co endpoint
    const formSubmitEndpoint = 'https://formsubmit.co/d.gondo@alustudent.com';

    // Constructing the form data
    const formData = new FormData();
    formData.append('full_name', fullName);
    formData.append('_replyto', email);
    formData.append('message', message);

    // Sending the form data
    fetch(formSubmitEndpoint, {
      method: 'POST',
      body: formData,
      headers: {
        Accept: 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('FormSubmit.co Response:', data);
        alert('Your message has been sent successfully!');
      })
      .catch((error) => {
        console.error('Error sending the form:', error);
        alert('An error occurred while sending your message. Please try again later.');
      });
  };

  return (
    <div className="about">
      <AboutHero />
      <div className="contact-main">
        <div className="about-text">
          Welcome to ALULINK, your exclusive online space dedicated to fostering
          connections and collaborations within the ALU alumni community.
          ALULINK is more than a platform; it's a dynamic hub designed to bring
          together ALU graduates from all corners of the world.
          <br />
          <br />
          At ALULINK, we understand the power of the ALU community. This
          platform is your gateway to reconnect with classmates, engage in
          enriching collaborations, and participate in exciting alumni-led
          events. Whether you're seeking professional opportunities, planning
          reunions, or simply want to stay connected with the spirit of ALU,
          ALULINK is your go-to destination.
          <br />
          <br />
          Join us in creating a vibrant network where memories are shared, ideas
          flourish, and the ALU legacy thrives. ALULINK is not just a platform;
          it's your virtual connection to the heart of ALU's rich history and
          bright future. Embrace the ALULINK experience, where your journey
          continues beyond the classroom. Welcome to a world of connections,
          opportunities, and shared success on ALULINK!
        </div>

        <div className="contact-form">
          <h2>Send Us A Message</h2>
          <form onSubmit={handleSubmit} action='https://formsubmit.co/d.gondo@alustudent.com'>
            <input
              type="text"
              name="full_name"
              placeholder="Your full name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <textarea
              name="message"
              placeholder="Your message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            ></textarea>
            <button type="submit">Send</button>
          </form>
        </div>
        
      </div>
      <Footer/>
    </div>
  );
}
