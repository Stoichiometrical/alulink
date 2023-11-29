

// import React from 'react';
// import './navbar.scss';
// import { Link } from 'react-router-dom';
// import { useAuth }  from  '../../utils/AuthContext'


// const Navbar = () => {
//   const { isLoggedIn, userData } = useAuth();

//   const renderAccountLink = () => {
//     if (isLoggedIn()) {
//       // User is signed in
//       if (userData.role === 'admin') {
//         // Redirect to /admindash for admin
//         return <li className="account"><Link to="/admindash" className='a'>Account</Link></li>;
//       } else if (userData.role === 'alumni') {
//         // Redirect to /userdash for alumni
//         return <li className="account"><Link to="/userdash" className='a'>Account</Link></li>;
//       }
//     } else {
//       // User is not signed in
//       return <li className="account"><Link to="/login" className='a'>Sign In</Link></li>;
//     }
//   };

//   return (
//     <div className="top-navbar">
//       <div className="logo">ALUMLINK</div>
//       <ul className="nav-list">
//         <li className="home"><Link to="/" className='a'>Home</Link></li>
//         <li className="events"><Link to="/events" className='a'>Events</Link></li>
//         <li className="about-us"><Link to="/about" className='a'>About Us</Link></li>
//         {renderAccountLink()}
//       </ul>
//     </div>
//   );
// };

// export default Navbar;
import React from 'react';
import './navbar.scss';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../utils/AuthContext';

const Navbar = () => {
  const { isLoggedIn, userData, logout } = useAuth();
  const history = useNavigate();

  const handleLogout = () => {
    logout();
    // Redirect to the home page after logout
    history('/');
  };

  const renderAccountLink = () => {
    if (isLoggedIn()) {
      // User is signed in
      return (
        <>
          {userData.role === 'admin' && (
            <li className="account">
              <Link to="/admindash" className="a">
                 Dashboard
              </Link>
            </li>
          )}
          {userData.role === 'alumni' && (
            <li className="account">
              <Link to="/userdash" className="a">
                 Dashboard
              </Link>
            </li>
          )}
          <li className="account">
            <button onClick={handleLogout} >
              Logout
            </button>
          </li>
        </>
      );
    } else {
      // User is not signed in
      return (
        <li className="account">
          <Link to="/login" className="a">
            Sign In
          </Link>
        </li>
      );
    }
  };

  return (
    <div className="top-navbar">
      <div className="logo">ALUMLINK</div>
      <ul className="nav-list">
        <li className="home">
          <Link to="/" className="a">
            Home
          </Link>
        </li>
        <li className="events">
          <Link to="/events" className="a">
            Events
          </Link>
        </li>
        <li className="about-us">
          <Link to="/about" className="a">
            About Us
          </Link>
        </li>
        {renderAccountLink()}
      </ul>
    </div>
  );
};

export default Navbar;
