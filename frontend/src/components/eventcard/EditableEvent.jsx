import './card.scss'

export default function EditableEventCard(){
    return(
        <div className='event-card'>
            <div className='img-sect'>
                <img src='https://images.pexels.com/photos/668137/pexels-photo-668137.jpeg?auto=compress&cs=tinysrgb&w=600' alt='' className='card-img'/>
                <div className='img-title'>Phoenix Meet & Greet</div>
            </div>
            <div className='event-dets'>
                {/* <div className='event-title'>Phoenix Meet & Greet</div> */}
                <div className='event-desc'>
                    Lorem ip sed olore m, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non pro
                 </div>
                 <div className='event-time'>10:00 AM - 12:00 PM</div>
                 <div className='event-location'>Grand Baie ,Public Hall</div>
                 <div className='btn-sect'>
                     <button className='btn-edit'>Edit</button>
                     <button className='btn-delete'>Cancel</button>
                 </div>
            </div>
        
        
        
        </div>
    )
}