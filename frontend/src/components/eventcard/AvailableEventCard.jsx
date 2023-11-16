import './card.scss'

export default function AvailableEventCard({img,availability='RSVP',title,desc,date,location}){
    return(
        <div className='event-card'>
            <div className='img-sect'>
                <img src={img} alt='' className='card-img'/>
                <div className='img-title'>{title}</div>
            </div>
            <div className='event-dets'>
                <div className='event-desc'>
                {desc}
                 </div>
                 <div className='event-time'>{date}</div>
                 <div className='event-location'>{location}</div>
                 <div className='btn-sect'>
                     <button className='btn'>{availability}</button>
                 </div>
            </div>
        
        
        
        </div>
    )
}