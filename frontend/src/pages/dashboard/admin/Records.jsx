//
import React, { useState, useEffect } from "react";
import DashFrame from "../../../components/dashframe/DashboardFrame";
import AlumniRecordCard from "../../../components/eventcard/AlumniRecordCard";
import DashHero from "../../../components/hero/DashHero";
import SearchBar from "../../../components/searchbar/Searchbar";
import "../dash.scss";
import { API_URL} from "../../../utils/services.js";

const Record = () => {
  const [alumniData, setAlumniData] = useState([]);
  const [searchResults, setSearchResults] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newAlumniData, setNewAlumniData] = useState({
    fullName: "",
    graduationYear: "",
    degreeProgram: "",
    email: "",
    role: "alumni", // Assuming a default role
  });

  const handleSearch = (data) => {
    setSearchResults(data);
  };

  useEffect(() => {
    // Fetch alumni data when the component mounts
    fetchAlumniData();
  }, [alumniData]);

  const fetchAlumniData = async () => {
    try {
      const response = await fetch(`${API_URL}/alumni/list`);
      if (!response.ok) {
        throw new Error("Failed to fetch alumni data");
      }

      const data = await response.json();
      setAlumniData(data);
    } catch (error) {
      console.error("Error fetching alumni data:", error.message);
    }
  };

  const handleAddFormSubmit = async (e) => {
    e.preventDefault();
    try {

      const addAlumniEndpoint = `${API_URL}/auth/register`;

      const response = await fetch(addAlumniEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newAlumniData),
      });
      if (response.ok) {
        alert(
          "Alumni Record Successfully Added.Default alumni password is 12345"
        );
      }

      if (!response.ok) {
        throw new Error("Failed to add alumni record");
      }

      // Fetch alumni data after adding a new record
      fetchAlumniData();
      // Hide the form after successful submission
      setShowAddForm(false);
      // Reset form fields
      setNewAlumniData({
        fullName: "",
        graduationYear: "",
        degreeProgram: "",
        email: "",
        role: "alumni",
        password: "12345",
      });
    } catch (error) {
      console.error("Error adding alumni record:", error.message);
    }
  };

  const handleInputChange = (e) => {
    setNewAlumniData({
      ...newAlumniData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <DashHero name="Admin" />
      <DashFrame
        main={
          <>
            <div className="record">
              <SearchBar
                placeholder="Search Alumni Record"
                serverRoute="alumni/alumni/name"
                onSearch={handleSearch}
              />
            </div>

            <div className="add" onClick={() => setShowAddForm(true)}>
              Add Alumni Record
            </div>

            {showAddForm && (
              <form className="add-form" onSubmit={handleAddFormSubmit}>
                <label htmlFor="fullName">Full Name:</label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={newAlumniData.fullName}
                  onChange={handleInputChange}
                  required
                />

                <label htmlFor="graduationYear">Graduation Year:</label>
                <input
                  type="text"
                  id="graduationYear"
                  name="graduationYear"
                  value={newAlumniData.graduationYear}
                  onChange={handleInputChange}
                  required
                />

                <label htmlFor="degreeProgram">Degree Program:</label>
                <input
                  type="text"
                  id="degreeProgram"
                  name="degreeProgram"
                  value={newAlumniData.degreeProgram}
                  onChange={handleInputChange}
                  required
                />

                <label htmlFor="email">Email:</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={newAlumniData.email}
                  onChange={handleInputChange}
                  required
                />

                <label htmlFor="role">Role:</label>
                <select
                  id="role"
                  name="role"
                  value={newAlumniData.role}
                  onChange={handleInputChange}
                >
                  <option value="alumni">Alumni</option>
                  <option value="admin">Admin</option>
                </select>

                <div className="btn-sect">
                  <button type="submit">Save</button>
                  <button type="button" onClick={() => setShowAddForm(false)}>
                    Cancel
                  </button>
                </div>
              </form>
            )}

            {searchResults && searchResults._id != null ? (
              <div className="e-cards">
                <AlumniRecordCard
                  key={searchResults._id}
                  imageUrl={searchResults.imageUrl}
                  fullName={searchResults.fullName}
                  graduationYear={searchResults.graduationYear}
                  degreeProgram={searchResults.degreeProgram}
                  email={searchResults.email}
                  id={searchResults._id}
                  role={searchResults.role}
                />
              </div>
            ) : (
              <div className="no-results"></div>
            )}

            <div className="mains">
              {alumniData.map((alumni) => (
                <AlumniRecordCard
                  key={alumni._id}
                  imageUrl={alumni.imageUrl}
                  fullName={alumni.fullName}
                  graduationYear={alumni.graduationYear}
                  degreeProgram={alumni.degreeProgram}
                  email={alumni.email}
                  id={alumni._id}
                  role={alumni.role}
                />
              ))}
            </div>
          </>
        }
        isAdmin={true}
      />
    </>
  );
};

export default Record;


// import React, { useState, useEffect } from "react";
// import DashFrame from "../../../components/dashframe/DashboardFrame";
// import AlumniRecordCard from "../../../components/eventcard/AlumniRecordCard";
// import DashHero from "../../../components/hero/DashHero";
// import SearchBar from "../../../components/searchbar/Searchbar";
// import "../dash.scss";
// import { API_URL } from "../../../utils/services.js";
// import bcrypt from "bcrypt"; // Import bcrypt for password hashing
//
// const Record = () => {
//   const [alumniData, setAlumniData] = useState([]);
//   const [searchResults, setSearchResults] = useState(null);
//   const [showAddForm, setShowAddForm] = useState(false);
//   const [newAlumniData, setNewAlumniData] = useState({
//     fullName: "",
//     graduationYear: "",
//     degreeProgram: "",
//     email: "",
//     role: "alumni",
//     password: "12345",
//   });
//
//   const handleSearch = (data) => {
//     setSearchResults(data);
//   };
//
//   useEffect(() => {
//     // Fetch alumni data when the component mounts
//     fetchAlumniData();
//   }, []);
//
//   const fetchAlumniData = async () => {
//     try {
//       const response = await fetch(`${API_URL}/alumni/list`);
//       if (!response.ok) {
//         throw new Error("Failed to fetch alumni data");
//       }
//
//       const data = await response.json();
//       setAlumniData(data);
//     } catch (error) {
//       console.error("Error fetching alumni data:", error.message);
//     }
//   };
//
//   const handleAddFormSubmit = async (e) => {
//     e.preventDefault();
//     console.log(newAlumniData)
//     try {
//       const salt = bcrypt.genSaltSync(10);
//       const hashedPassword = bcrypt.hashSync(newAlumniData.password, salt);
//
//       const addAlumniEndpoint = `${API_URL}/auth/register`;
//
//       const response = await fetch(addAlumniEndpoint, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           ...newAlumniData,
//           password: hashedPassword,
//         }),
//       });
//
//
//       if (!response.ok) {
//         throw new Error("Failed to add alumni record");
//       }
//
//       // Fetch alumni data after adding a new record
//       fetchAlumniData();
//       // Hide the form after successful submission
//       setShowAddForm(false);
//       // Reset form fields
//       setNewAlumniData({
//         fullName: "",
//         graduationYear: "",
//         degreeProgram: "",
//         email: "",
//         role: "alumni",
//         password: "12345",
//       });
//
//       alert("Alumni Record Successfully Added. Default alumni password is 12345");
//     } catch (error) {
//       console.error("Error adding alumni record:", error.message);
//     }
//   };
//
//   const handleInputChange = (e) => {
//     setNewAlumniData({
//       ...newAlumniData,
//       [e.target.name]: e.target.value,
//     });
//   };
//
//   return (
//       <>
//         <DashHero name="Admin" />
//         <DashFrame
//             main={
//               <>
//                 <div className="record">
//                   <SearchBar
//                       placeholder="Search Alumni Record"
//                       serverRoute="alumni/alumni/name"
//                       onSearch={handleSearch}
//                   />
//                 </div>
//
//                 <div className="add" onClick={() => setShowAddForm(true)}>
//                   Add Alumni Record
//                 </div>
//
//                 {showAddForm && (
//                     <form className="add-form" onSubmit={handleAddFormSubmit}>
//                       <label htmlFor="fullName">Full Name:</label>
//                       <input
//                           type="text"
//                           id="fullName"
//                           name="fullName"
//                           value={newAlumniData.fullName}
//                           onChange={handleInputChange}
//                           required
//                       />
//
//                       <label htmlFor="graduationYear">Graduation Year:</label>
//                       <input
//                           type="text"
//                           id="graduationYear"
//                           name="graduationYear"
//                           value={newAlumniData.graduationYear}
//                           onChange={handleInputChange}
//                           required
//                       />
//
//                       <label htmlFor="degreeProgram">Degree Program:</label>
//                       <input
//                           type="text"
//                           id="degreeProgram"
//                           name="degreeProgram"
//                           value={newAlumniData.degreeProgram}
//                           onChange={handleInputChange}
//                           required
//                       />
//
//                       <label htmlFor="email">Email:</label>
//                       <input
//                           type="email"
//                           id="email"
//                           name="email"
//                           value={newAlumniData.email}
//                           onChange={handleInputChange}
//                           required
//                       />
//
//                       <label htmlFor="role">Role:</label>
//                       <select
//                           id="role"
//                           name="role"
//                           value={newAlumniData.role}
//                           onChange={handleInputChange}
//                       >
//                         <option value="alumni">Alumni</option>
//                         <option value="admin">Admin</option>
//                       </select>
//
//                       <div className="btn-sect">
//                         <button type="submit">Save</button>
//                         <button type="button" onClick={() => setShowAddForm(false)}>
//                           Cancel
//                         </button>
//                       </div>
//                     </form>
//                 )}
//
//                 {searchResults && searchResults._id != null ? (
//                     <div className="e-cards">
//                       <AlumniRecordCard
//                           key={searchResults._id}
//                           imageUrl={searchResults.imageUrl}
//                           fullName={searchResults.fullName}
//                           graduationYear={searchResults.graduationYear}
//                           degreeProgram={searchResults.degreeProgram}
//                           email={searchResults.email}
//                           id={searchResults._id}
//                           role={searchResults.role}
//                       />
//                     </div>
//                 ) : (
//                     <div className="no-results"></div>
//                 )}
//
//                 <div className="mains">
//                   {alumniData.map((alumni) => (
//                       <AlumniRecordCard
//                           key={alumni._id}
//                           imageUrl={alumni.imageUrl}
//                           fullName={alumni.fullName}
//                           graduationYear={alumni.graduationYear}
//                           degreeProgram={alumni.degreeProgram}
//                           email={alumni.email}
//                           id={alumni._id}
//                           role={alumni.role}
//                       />
//                   ))}
//                 </div>
//               </>
//             }
//             isAdmin={true}
//         />
//       </>
//   );
// };
//
// export default Record;
