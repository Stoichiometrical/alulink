import './hero.scss'
import Navbar from '../navbar/Navbar'
import im from '../../assets/home.jpg'

export default function AboutHero(){
    return(
        <div className='hero-container'>
        <Navbar/>
        <div className='pic-sect'>
            <img src={im} alt='Missing' className='pic-img pic-about'/>
            <div className='text'>
            <div className='first-text'>
                <h1 className='about-header'>About Us</h1>
            </div>
            

            
         </div>

        </div>


        
        </div>
    )
}