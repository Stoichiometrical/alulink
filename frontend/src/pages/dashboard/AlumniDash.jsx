import './dash.scss'
import DashHero from "../../components/hero/DashHero";
import DashFrame from '../../components/dashframe/DashboardFrame';
import Dash2 from '../../components/dashframe/Dash2';


export default function AlumniDash(){
    return(
        <div className='dashboard'>
            <div>
            <DashHero/>
            </div>
            
            <div className='frame'>
                <DashFrame main='  '/>
               
            </div>
        
        </div>
    )
}