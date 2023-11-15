
import './alumni.scss';
import DashHero from '../../../components/hero/DashHero';
import DashFrame from '../../../components/dashframe/DashboardFrame';
import EditableEventCard from '../../../components/eventcard/EditableEvent';


export default function ByMe(){
    return(
        <div className='dashboard'>
        <div>
        <DashHero/>
        </div>
        
        <div className='frame'>
            <DashFrame main={<ByMes/>} />
            
        </div>
    
    </div>
    )
}


const ByMes = ()=>{
    return (
        <div className='mains'>
            <EditableEventCard/>
            <EditableEventCard/>
            <EditableEventCard/>
            <EditableEventCard/>


        </div>
    )
}