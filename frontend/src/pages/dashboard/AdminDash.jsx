import './dash.scss'
import DashHero from '../../components/hero/DashHero'
import DashFrame from '../../components/dashframe/DashboardFrame'


export default function AdminDash(){
    return(
        <>
        <DashHero name='Admin'/>
        <DashFrame isAdmin={true} />
        
        </>
    )
}