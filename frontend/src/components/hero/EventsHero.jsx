import './hero.scss'
import Navbar from '../navbar/Navbar'
import im from '../../assets/home.jpg'
import SearchBar from '../searchbar/Searchbar'

export default function EventsHero(){
    return(
        <div className='hero-container'>
        <Navbar/>
        <div className='pic-sect'>
            <img src={im} alt='Missing' className='pic-img pic-events'/>
            <div className='text'>
            <div className='first-text'>
                <h1 className='events-header'>EVENTS</h1>
                <div className='ft-small'>Hop on to the next event happening soon</div>

            </div>
            <div className='search'>
               {/* <input type='text' placeholder='Search Events'/> */}
               <SearchBar placeholder='Search Events'/>
            </div>

            
         </div>

        </div>


        
        </div>
    )
}