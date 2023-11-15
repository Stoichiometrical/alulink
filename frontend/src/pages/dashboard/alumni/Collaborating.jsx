
import './alumni.scss';
import DashHero from '../../../components/hero/DashHero';
import DashFrame from '../../../components/dashframe/DashboardFrame';
import EditableEventCard from '../../../components/eventcard/EditableEvent';


export default function Collaborating(){
    return(
        <div className='dashboard'>
        <div>
        <DashHero/>
        </div>
        
        <div className='frame'>
            <DashFrame main={<Collab/>} />
            
        </div>
    
    </div>
    )
}


const Collab = ()=>{
    return (
        <div className='mains'>
            <EditableEventCard/>
            <EditableEventCard/>
            <EditableEventCard/>
            <EditableEventCard/>


        </div>
    )
}