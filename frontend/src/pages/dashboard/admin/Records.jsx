import DashFrame from "../../../components/dashframe/DashboardFrame";
import "../dash.scss";
import AlumniRecordCard from '../../../components/eventcard/AlumniRecordCard'
import DashHero from "../../../components/hero/DashHero";
import SearchBar from "../../../components/searchbar/Searchbar";

export default function Records() {
  return (
    <>
      <DashHero name='Admin'/>
      <DashFrame main={<Record/>} isAdmin={true} />
    </>
  );
}

const Record = () => {
  return (
    <>
    
        <div className="record">
            <SearchBar placeholder='Search Alumni Record'/>
        </div>



      <div className="mains">
       <AlumniRecordCard/>
       <AlumniRecordCard/>
       <AlumniRecordCard/>
       <AlumniRecordCard/>

      </div>
    </>
  );
};
