import Sidebar from './Sidebar'
import './dash.scss'


export default function DashFrame({main}){

    const options = [
        { text: 'Attending', link: '/attending' },
        { text: 'Organised By Me', link: '/byme' },
        { text: 'Collaborating', link: '/collaborating' },
      ];

return(
    <div className='dash'>

        <div className='dash-sidebar'>
        <Sidebar options={options} title='Events'/>
        </div>
        <div className='dash-main'>
            {main}
        </div>
    
    
    </div>
)


}