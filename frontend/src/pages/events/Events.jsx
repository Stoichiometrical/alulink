import "./events.scss"
import EventsHero from '../../components/hero/EventsHero'
import AvailableEventCard from "../../components/eventcard/AvailableEventCard"
import AlumniRecordCard from "../../components/eventcard/AlumniRecordCard"
import EditableEventCard from "../../components/eventcard/EditableEvent"

export default function Events(){
    return(
       
       <>
        <EventsHero/>

        <div className="events" style={{display:'flex'}}>
            <AvailableEventCard/>
            <AlumniRecordCard/>
            <EditableEventCard/>
        </div>

        </>
    )
}