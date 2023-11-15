import HomeHero from '../../components/hero/HomeHero'
import AvailableEventCard from '../../components/eventcard/AvailableEventCard'
import './home.scss'
import Footer from '../../components/footer/Footer'

export default function Home (){
    return(
        <>
        <HomeHero/>
        <div className='home-main'> 
        <h2>Upcoming Events</h2>
        <div className='e-cards'>
            <AvailableEventCard/>
            <AvailableEventCard/>

        </div>
        <div className='view-more'>View More</div> 
        
        
        
        </div>

        <div className='home-about'>

            <h2>About Us</h2>
            <div className='about-sect'>
                <img src='https://images.pexels.com/photos/2833037/pexels-photo-2833037.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' alt='Mising'/>
                <div className='as-text'>
                    
                        ALULINK is a platform that connects students and faculty in
                        the ALU community. It is designed to bring together
                        students from all corners of the world.
                        
At ALULINK, we understand the power of the ALU community. This platform is your gateway to reconnect with classmates, engage in enriching collaborations, and participate in exciting alumni-led events. Whether you're seeking professional opportunities, planning reunions, or simply want to stay connected with the spirit of ALU, ALULINK is your go-to destination.
            
                </div>
            </div>
        </div>
        <Footer/>
        </>
    )
}