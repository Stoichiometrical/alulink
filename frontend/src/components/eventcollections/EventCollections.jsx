import './eventcoll.scss'
import AvailableEventCard from '../eventcard/AvailableEventCard'

export default function EventCollections({title}){

    return(
        <div className='e-collections'>
            <h3>{title}</h3>
            <div className='e-cards'>
            <AvailableEventCard/>
            <AvailableEventCard/>
            <AvailableEventCard/>
            </div>
            <div className='view'>View More</div>
            

        </div>
    )
}