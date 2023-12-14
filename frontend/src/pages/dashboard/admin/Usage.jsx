// import React, { useState, useEffect } from 'react';
// import DashFrame from '../../../components/dashframe/DashboardFrame';
// import '../dash.scss';
// import './admin.scss'
// import EditableEventCard from '../../../components/eventcard/EditableEvent';
// import DashHero from '../../../components/hero/DashHero';
// import SearchBar from '../../../components/searchbar/Searchbar';
// import { useAuth } from '../../../utils/AuthContext';
// import { API_URL} from "../../../utils/services.js";
// import DashCard from "../../../components/dashcard/DashCard.jsx";
//
// export default function Usage() {
//   return (
//     <>
//       <DashHero name="Admin" />
//       <DashFrame main={<UsageDashboard/>} isAdmin={true} />
//     </>
//   );
// }
//
// export function UsageDashboard(){
//     return(
//         <div className='usage'>
//             <h1>Usage Statistics</h1>
//
//             <div className='usage-1'>
//                 <div className='number'>
//                     <h1>8</h1>
//                     <div className='number-txt'>Total Events</div>
//                 </div>
//
//                 <div className='number'>
//                     <h1>8</h1>
//                     <div className='number-txt'>Alumni Joined</div>
//                 </div>
//
//
//             </div>
//
//             <div className='usage-2'>
//
//                 <div className='usage-head'>Manage User Events</div>
//                 <div className='bar'>
//                     <SearchBar placeholder='Search Events By Alumni'/>
//                 </div>
//
//                 <div className='u-card'>
//                     <DashCard/>
//                 </div>
//             </div>
//
//
//
//         </div>
//     )
// }

// import React, { useState, useEffect } from 'react';
// import DashFrame from '../../../components/dashframe/DashboardFrame';
// import '../dash.scss';
// import './admin.scss';
// import EditableEventCard from '../../../components/eventcard/EditableEvent';
// import DashHero from '../../../components/hero/DashHero';
// import SearchBar from '../../../components/searchbar/Searchbar';
// import { useAuth } from '../../../utils/AuthContext';
// import { API_URL } from '../../../utils/services.js';
// import DashCard from '../../../components/dashcard/DashCard.jsx';
//
// export default function Usage() {
//     return (
//         <>
//             <DashHero name="Admin" />
//             <DashFrame main={<UsageDashboard />} isAdmin={true} />
//         </>
//     );
// }
//
// export function UsageDashboard() {
//     const [searchResults, setSearchResults] = useState([]);
//     const { currentUser } = useAuth(); // Assuming you have a useAuth hook to get the current user
//
//     const handleSearch = (data) => {
//         setSearchResults(data);
//     };
//
//     return (
//         <div className='usage'>
//             <h1>Usage Statistics</h1>
//
//             <div className='usage-1'>
//                 <div className='number'>
//                     <h1>8</h1>
//                     <div className='number-txt'>Total Events</div>
//                 </div>
//
//                 <div className='number'>
//                     <h1>8</h1>
//                     <div className='number-txt'>Alumni Joined</div>
//                 </div>
//             </div>
//
//             <div className='usage-2'>
//                 <div className='usage-head'>Manage User Events</div>
//                 <div className='bar'>
//                     <SearchBar
//                         placeholder='Search Events By Alumni'
//                         serverRoute='alumni/alumni/name' // Adjust this based on your server route for searching by alumni name
//                         onSearch={handleSearch}
//                     />
//                 </div>
//
//                 <div className='u-card'>
//                     {searchResults.map((event) => (
//                         <DashCard key={event._id} event={event} />
//                     ))}
//                 </div>
//             </div>
//         </div>
//     );
// }


import React, { useState, useEffect } from 'react';
import DashFrame from '../../../components/dashframe/DashboardFrame';
import '../dash.scss';
import './admin.scss';
import EditableEventCard from '../../../components/eventcard/EditableEvent';
import DashHero from '../../../components/hero/DashHero';
import SearchBar from '../../../components/searchbar/Searchbar';
import { useAuth } from '../../../utils/AuthContext';
import { API_URL } from '../../../utils/services.js';
import DashCard from '../../../components/dashcard/DashCard.jsx';

export default function Usage() {
    return (
        <>
            <DashHero name="Admin" />
            <DashFrame main={<UsageDashboard />} isAdmin={true} />
        </>
    );
}

export function UsageDashboard() {
    const [searchResults, setSearchResults] = useState([]);
    const { currentUser } = useAuth(); // Assuming you have a useAuth hook to get the current user

    const handleSearch = (data) => {
        setSearchResults(data);
        console.log(data)
    };

    return (
        <div className='usage'>
            <h1>Usage Statistics</h1>

            <div className='usage-1'>
                <div className='number'>
                    <h1>8</h1>
                    <div className='number-txt'>Total Events</div>
                </div>

                <div className='number'>
                    <h1>8</h1>
                    <div className='number-txt'>Alumni Joined</div>
                </div>
            </div>

            <div className='usage-2'>
                <div className='usage-head'>Manage User Events</div>
                <div className='bar'>
                    <SearchBar
                        placeholder='Search Events By Alumni'
                        serverRoute='alumni/alumni/name' // Adjust this based on your server route for searching by alumni name
                        onSearch={handleSearch}
                    />
                </div>

                <div className='u-card'>
                    { searchResults._id !=null ? <DashCard key={searchResults._id} userId={searchResults._id} user={searchResults}/> : ''}
                    {/*{Array.isArray(searchResults) && searchResults.length > 0 ? (*/}
                    {/*    searchResults.map((event) => (*/}
                    {/*        <DashCard key={event._id} event={event} userId={event._id}/>*/}
                    {/*    ))*/}
                    {/*) : (*/}
                    {/*    <p>No events found.</p>*/}
                    {/*)}*/}
                </div>

            </div>
        </div>
    );
}
