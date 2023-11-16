import "./events.scss";
import EventsHero from "../../components/hero/EventsHero";
import AvailableEventCard from "../../components/eventcard/AvailableEventCard";
import AlumniRecordCard from "../../components/eventcard/AlumniRecordCard";
import EditableEventCard from "../../components/eventcard/EditableEvent";
import DashFrame from "../../components/dashframe/DashboardFrame";
import EventCollections from "../../components/eventcollections/EventCollections";
import Footer from "../../components/footer/Footer";
import SearchBar from "../../components/searchbar/Searchbar";
import { Link as ScrollLink } from "react-scroll";

export default function Events() {
  return (
    <>
      <EventsHero />

      <div className="events">
        <ul className="event-labels">
          <li>
            <ScrollLink
              to="prof"
              smooth={true}
              duration={500}
              className="li"
            >
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
            <ScrollLink
              to="campus"
              smooth={true}
              duration={500}
              className="li"
            >
              Campus Events
            </ScrollLink>
          </li>
        </ul>

        <div className="event-cards">
          <EventCollections
            title="Professionals"
            category="professional development"
            id="prof"
          />
          <EventCollections
            title="Networking"
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
