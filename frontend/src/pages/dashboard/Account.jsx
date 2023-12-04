import "./dash.scss";
import DashHero from "../../components/hero/DashHero";
import DashFrame from "../../components/dashframe/DashboardFrame";
import React, { useState, useEffect } from "react";
import { useAuth } from "../../utils/AuthContext";

export default function Account() {
    const { userData } = useAuth();
  const alumniId = userData._id;
  let admin= false

  if (userData.role=='admin'){
    admin = true
  }else{
    admin = false
  }

  return (
    <>
      <DashHero name="Admin" />
      <DashFrame main={<MyAccount />} isAdmin={admin} />
    </>
  );
}

export function MyAccount() {
  const { userData } = useAuth();
  const alumniId = userData._id;

  const [formData, setFormData] = useState({
    fullName: "",
    graduationYear: "",
    degreeProgram: "",
    email: "",
    password: "",
    imageUrl: "",
    bio: "",
  });

  const [originalData, setOriginalData] = useState({});

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    try {
      const updateAccountEndpoint = `http://localhost:3000/alumni/${alumniId}`;

      // Identify changed fields
      const changedFields = {};
      for (const key in formData) {
        if (formData[key] !== originalData[key]) {
          changedFields[key] = formData[key];
        }
      }

      // Handle nested object (currentEmployment)
      if (formData.currentEmployment) {
        changedFields.currentEmployment = {};
        for (const key in formData.currentEmployment) {
          if (
            formData.currentEmployment[key] !==
            originalData.currentEmployment[key]
          ) {
            changedFields.currentEmployment[key] =
              formData.currentEmployment[key];
          }
        }
      }

      const response = await fetch(updateAccountEndpoint, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(changedFields),
      });

      if (!response.ok) {
        throw new Error("Failed to update account details");
      }

      console.log("Account details updated successfully");
    } catch (error) {
      console.error("Error updating account details:", error.message);
    }
  };

  useEffect(() => {
    const fetchAccountDetails = async () => {
      try {
        const getAccountDetailsEndpoint = `http://localhost:3000/alumni/${alumniId}`;
        const response = await fetch(getAccountDetailsEndpoint);

        if (!response.ok) {
          throw new Error("Failed to fetch account details");
        }

        const data = await response.json();
        setOriginalData(data);

        setFormData({
          ...data,
        });
      } catch (error) {
        console.error("Error fetching account details:", error.message);
      }
    };

    fetchAccountDetails();
    console.log(originalData);
  }, [alumniId]);

  return (
    <div className="my-account add-form">
      <label htmlFor="fullName">Full Name:</label>
      <input
        type="text"
        id="fullName"
        name="fullName"
        value={formData.fullName}
        onChange={handleInputChange}
      />

      <label htmlFor="graduationYear">Graduation Year:</label>
      <input
        type="number"
        id="graduationYear"
        name="graduationYear"
        value={formData.graduationYear}
        onChange={handleInputChange}
      />

      <label htmlFor="degreeProgram">Degree Program:</label>
      <input
        type="text"
        id="degreeProgram"
        name="degreeProgram"
        value={formData.degreeProgram}
        onChange={handleInputChange}
      />

      <label htmlFor="email">Email:</label>
      <input
        type="email"
        id="email"
        name="email"
        value={formData.email}
        onChange={handleInputChange}
      />

      <label htmlFor="password">Password:</label>
      <input
        type="password"
        id="password"
        name="password"
        value={formData.password}
        onChange={handleInputChange}
      />

      <label htmlFor="imageUrl">Image URL:</label>
      <input
        type="text"
        id="imageUrl"
        name="imageUrl"
        value={formData.imageUrl}
        onChange={handleInputChange}
      />

      <label htmlFor="bio">Bio:</label>
      <textarea
        id="bio"
        name="bio"
        value={formData.bio}
        onChange={handleInputChange}
      ></textarea>

      <button onClick={handleSubmit} style={{marginTop:'2%'}}>Update Account</button>
    </div>
  );
}
