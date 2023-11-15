import "./events.scss"
import EventsHero from '../../components/hero/EventsHero'
import AvailableEventCard from "../../components/eventcard/AvailableEventCard"
import AlumniRecordCard from "../../components/eventcard/AlumniRecordCard"
import EditableEventCard from "../../components/eventcard/EditableEvent"
import DashFrame from "../../components/dashframe/DashboardFrame"
import EventCollections from "../../components/eventcollections/EventCollections"
import Footer from "../../components/footer/Footer"
import SearchBar from "../../components/searchbar/Searchbar"


export default function Events(){
    return(
       
       <>
        <EventsHero/>

        <div className="events">
           
           
                <ul className="event-labels">
                    <li>Professional</li> 
                    <li>Networking</li>
                    <li>Campus Events</li>
                </ul>
            
            <div className="event-cards" >
                <EventCollections title='Professionals'/>
                <EventCollections title='Networking'/>
                <EventCollections title='Campus Events'/>
            </div>
            <Footer/>


        </div>
        </>
    )
}