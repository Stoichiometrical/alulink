import './hero.scss'
import Navbar from '../navbar/Navbar'
import im from '../../assets/home.jpg'

export default function DashHero({name='David'}){
    return(
        <div className='hero-container'>
        <Navbar/>
        <div className='pic-sect'>
            <img src={im} alt='Missing' className='pic-img pic-dash'/>
            <div className='text dash-text'>
            <div className='first-text'>
                <h1 className='about-header alumni-header'>Welcome Back,{name}!</h1>
            </div>
            

            
         </div>

        </div>


        
        </div>
    )
}