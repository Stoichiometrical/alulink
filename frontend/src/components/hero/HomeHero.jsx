import './hero.scss'
import Navbar from '../navbar/Navbar'
import im from '../../assets/home.jpg'
import { Link as ScrollLink } from 'react-scroll';

export default function HomeHero(){
    return(
        <div className='hero-container'>
        <Navbar/>
        <div className='pic-sect'>
            <img src={im} alt='Missing' className='pic-img'/>
            <div className='text'>
            <div className='first-text'>
                <h1>ALULINK</h1>
                <div className='ft-small'>Even after ALC,life goes on but we are still here</div>

            </div>

            <ScrollLink to='e-cards' smooth={true} duration={500} className='option-tag'>
              Let's Connect In Our Next Event
            </ScrollLink>
            


               
   


         </div>

        </div>


        
        </div>
    )
}