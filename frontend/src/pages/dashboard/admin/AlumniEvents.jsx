import DashFrame from "../../../components/dashframe/DashboardFrame";
import "../dash.scss";
import EditableEventCard from "../../../components/eventcard/EditableEvent";
import DashHero from "../../../components/hero/DashHero";

export default function AlumniEvents() {
  return (
    <>
      <DashHero name='Admin'/>
      <DashFrame main={<AlEvents />} isAdmin={true} />
    </>
  );
}

const AlEvents = () => {
  return (
    <>
    
        <ul className="filters">
            <li>Filter by :</li>
            <li>Graduation Year</li>
            <li>Degree Program</li>
        </ul>



      <div className="mains">
        <EditableEventCard />
        <EditableEventCard />
        <EditableEventCard />
      </div>
    </>
  );
};
