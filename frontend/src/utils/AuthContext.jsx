// import React, { createContext, useContext, useState, useEffect } from 'react';

// const AuthContext = createContext();

// export const useAuth = () => {
//   return useContext(AuthContext);
// };

// export  const AuthProvider = ({ children }) => {
//   const [userData, setUserData] = useState(null);

//   useEffect(() => {
//     // You might want to check local storage or make an API call to initialize user data
//     const storedUserData = JSON.parse(localStorage.getItem('userData'));
//     if (storedUserData) {
//       setUserData(storedUserData);
//     }
//   }, []);

//   const login = (userData) => {
//     setUserData(userData);
//     localStorage.setItem('userData', JSON.stringify(userData));
//   };

//   const logout = () => {
//     setUserData(null);
//     localStorage.removeItem('userData');
//   };

//   const isLoggedIn = () => {
//     return !!userData;
//   };

//   const contextValue = {
//     userData,
//     login,
//     logout,
//     isLoggedIn,
//   };

//   return (
//     <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
//   );
// };



import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [userData, setUserData] = useState(() => {
    // Initialize user data from local storage or set it to null
    const storedUserData = JSON.parse(localStorage.getItem('userData'));
    return storedUserData || null;
  });

  useEffect(() => {
    // Save user data to local storage whenever it changes
    localStorage.setItem('userData', JSON.stringify(userData));
  }, [userData]);

  const login = (userData) => {
    setUserData(userData);
  };

  const logout = () => {
    setUserData(null);
  };

  const isLoggedIn = () => {
    return !!userData;
  };

  const contextValue = {
    userData,
    login,
    logout,
    isLoggedIn,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};
