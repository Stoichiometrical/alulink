import Sidebar from './Sidebar'
import './dash.scss'
import Footer from '../footer/Footer'


export default function DashFrame({main,isAdmin}){


return(
    <div className='dashs' style={{display:'flex',flexDirection:'column'}}>
              <div className='dash'>
              <div className='dash-sidebar'>
        <Sidebar isAdmin={isAdmin} title='Events'/>
        </div>
        <div className='dash-main'>
            {main}
        </div>
              </div>
       
        <Footer/>
    
    
    </div>
)


}