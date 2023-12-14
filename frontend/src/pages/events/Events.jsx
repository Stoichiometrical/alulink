import React, { useState } from "react";
import "./events.scss";
import EventsHero from "../../components/hero/EventsHero";
import EventCollections from "../../components/eventcollections/EventCollections";
import AvailableEventCard from "../../components/eventcard/AvailableEventCard";
import Footer from "../../components/footer/Footer";
import { Link as ScrollLink } from "react-scroll";
import {API_URL } from "../../utils/services.js";

export default function Events() {
  const [searchResults, setSearchResults] = useState(null);
  console.log(searchResults);

  // Callback function to handle search results
  const handleSearch = (data) => {
    setSearchResults(data);
  };

  return (
    <>
      <EventsHero onSearch={handleSearch} />

      <div className="events">
        <ul className="event-labels">
          <li>
            <ScrollLink to="prof" smooth={true} duration={500} className="li">
              Professional
            </ScrollLink>
          </li>
          <li>
            <ScrollLink
              to="networking"
              smooth={true}
              duration={500}
              className="li"
            >
              Networking
            </ScrollLink>
          </li>
          <li>
            <ScrollLink to="campus" smooth={true} duration={500} className="li">
              Campus Events
            </ScrollLink>
          </li>
        </ul>

        <div className="event-cards">
          {searchResults && searchResults._id != null ? (
            <div className="e-cards">
              <AvailableEventCard
                key={searchResults._id}
                eventId={searchResults._id}
                img={searchResults.imageUrl}
                title={searchResults.title}
                desc={searchResults.description}
                date={searchResults.date}
                location={searchResults.location}
              />
            </div>
          ) : (
            // Display the message only if searchResults is empty
            searchResults !== null && (
              <div className="no-results">
                No events found for the given search.
              </div>
            )
          )
          }
        </div>

        <div className="events">
          <EventCollections
            title="Professional Events"
            category="professional development"
            id="prof"
          />
          <EventCollections
            title="Networking Events"
            category="networking"
            id="networking"
          />
          <EventCollections
            title="Campus Events"
            category="campus events"
            id="campus"
          />
        </div>
        <Footer />
      </div>
    </>
  );
}
