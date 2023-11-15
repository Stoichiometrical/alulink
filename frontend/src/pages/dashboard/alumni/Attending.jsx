import AvailableEventCard from '../../../components/eventcard/AvailableEventCard';
import './alumni.scss';
import DashHero from '../../../components/hero/DashHero';
import DashFrame from '../../../components/dashframe/DashboardFrame';

export default function Attending(){
    return(
        <div className='dashboard'>
        <div>
        <DashHero/>
        </div>
        
        <div className='frame'>
            <DashFrame main={<Attend/>} />
            
        </div>
    
    </div>
    )
}

const Attend = ()=>{
    return(
        <div className='mains'>
         <AvailableEventCard availability='Cancel RSVP'/>
         <AvailableEventCard availability='Cancel RSVP'/>
         <AvailableEventCard availability='Cancel RSVP'/>
         <AvailableEventCard availability='Cancel RSVP'/>
    </div>
    )
}