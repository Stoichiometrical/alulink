import './card.scss'

export default function AlumniRecordCard(){
    return(
        <div className='event-card alum'>
            <div className='img-sect'>
                <img src='https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=600' alt='' className='card-img'/>
            </div>
            <div className='event-dets'>
                <div className='event-title'>David T Gondo</div>
                <div className='card-det'>Year : 2021J</div>
                <div className='card-det'>Degree : Computing</div>
                <div className='card-det'>Email : d.gondo@alustudent.com</div>
                <div className='card-det'>Events Organised : 4</div>
                <div className='card-det'>Events Attended : 6</div>
                    
             </div>
                 <div className='btn-sect'>
                     <button className='btn-edit'>Edit</button>
                     <button className='btn-delete'>Delete</button>
                 </div>
            </div>
        
        
      
    )
}