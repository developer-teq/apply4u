// import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

import PersonalForm from "../components/forms_components/PersonalForm";
import MatricForm from "../components/forms_components/MatricForm";
import InterForm from "../components/forms_components/InterForm";
import BachelorForm from "../components/forms_components/BachelorForm";
import MasterForm from "../components/forms_components/MasterForm";
import MphilForm from "../components/forms_components/MPhilForm";
const UserProfile = () => {
 
  const handlePersonalSubmit = async (data) => {
    try {
        const response = await axios.post("/api/matric/", data); // Update the API endpoint
        console.log("Matric data submitted successfully:", response.data);
    } catch (error) {
        console.error("Error submitting matric data:", error);
    }
};
 
  const handleMatricSubmit = async (data) => {
    try {
        const response = await axios.post("/api/matric/", data); // Update the API endpoint
        console.log("Matric data submitted successfully:", response.data);
    } catch (error) {
        console.error("Error submitting matric data:", error);
    }
};
  const handleInterSubmit = async (data) => {
    try {
        const response = await axios.post("/api/matric/", data); // Update the API endpoint
        console.log("Matric data submitted successfully:", response.data);
    } catch (error) {
        console.error("Error submitting matric data:", error);
    }
};
  const handleBachelorSubmit = async (data) => {
    try {
        const response = await axios.post("/api/matric/", data); // Update the API endpoint
        console.log("Matric data submitted successfully:", response.data);
    } catch (error) {
        console.error("Error submitting matric data:", error);
    }
};
  const handleMasterSubmit = async (data) => {
    try {
        const response = await axios.post("/api/matric/", data); // Update the API endpoint
        console.log("Matric data submitted successfully:", response.data);
    } catch (error) {
        console.error("Error submitting matric data:", error);
    }
};
  const handleMphilSubmit = async (data) => {
    try {
        const response = await axios.post("/api/matric/", data); // Update the API endpoint
        console.log("Matric data submitted successfully:", response.data);
    } catch (error) {
        console.error("Error submitting matric data:", error);
    }
};



  return (
    <div className="container mt-5">
      
      <PersonalForm onSubmit={handlePersonalSubmit} />
      <MatricForm onSubmit={handleMatricSubmit} />
      <InterForm onSubmit={handleInterSubmit} />
      <BachelorForm onSubmit={handleBachelorSubmit} />
      <MasterForm onSubmit={handleMasterSubmit} />
      <MphilForm onSubmit={handleMphilSubmit} />
          </div>
  );
};

export default UserProfile;
