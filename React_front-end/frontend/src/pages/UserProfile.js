import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

import PersonalForm from "../components/forms_components/PersonalForm";
import MatricForm from "../components/forms_components/MatricForm";
import InterForm from "../components/forms_components/InterForm";
import BachelorForm from "../components/forms_components/BachelorForm";
import MasterForm from "../components/forms_components/MasterForm";
import MphilForm from "../components/forms_components/MPhilForm";
import DoctorialForm from "../components/forms_components/DoctorialForm";
import DocumentPicsForm from "../components/forms_components/DocumentPicForm";
import ExperiencePicsForm from "../components/forms_components/ExperiencPicForm";
const UserProfile = () => {
 
  const [currentStep, setCurrentStep] = useState(1);
  const [formSubmitted, setFormSubmitted] = useState(false); // Track form submission status

  const handlePersonalSubmit = async (data) => {
    try {
        const response = await axios.post("/api/matric/", data); // Update the API endpoint
        console.log("Matric data submitted successfully:", response.data);
        
    } catch (error) {
        console.error("Error submitting matric data:", error);
        setFormSubmitted(true);
    }
};
 
  const handleMatricSubmit = async (data) => {
    try {
        const response = await axios.post("/api/matric/", data); // Update the API endpoint
        console.log("Matric data submitted successfully:", response.data);
        
    } catch (error) {
        console.error("Error submitting matric data:", error);
        setFormSubmitted(true);
    }

};
  const handleInterSubmit = async (data) => {
    try {
        const response = await axios.post("/api/matric/", data); // Update the API endpoint
        console.log("Matric data submitted successfully:", response.data);
        setFormSubmitted(true);
    } catch (error) {
        console.error("Error submitting matric data:", error);
        setFormSubmitted(true);
    }
};
  const handleBachelorSubmit = async (data) => {
    try {
        const response = await axios.post("/api/matric/", data); // Update the API endpoint
        console.log("Matric data submitted successfully:", response.data);
        setFormSubmitted(true);
    } catch (error) {
        console.error("Error submitting matric data:", error);
        setFormSubmitted(true);
    }
};
  const handleMasterSubmit = async (data) => {
    try {
        const response = await axios.post("/api/matric/", data); // Update the API endpoint
        console.log("Matric data submitted successfully:", response.data);
        setFormSubmitted(true);
    } catch (error) {
        console.error("Error submitting matric data:", error);
        setFormSubmitted(true);
    }
};
  const handleMphilSubmit = async (data) => {
    try {
        const response = await axios.post("/api/matric/", data); // Update the API endpoint
        console.log("Matric data submitted successfully:", response.data);
        setFormSubmitted(true);
    } catch (error) {
        console.error("Error submitting matric data:", error);
        setFormSubmitted(true);
    }
};

  const handleDoctorialSubmit = async (data) => {
    try {
        const response = await axios.post("/api/matric/", data); // Update the API endpoint
        console.log("Matric data submitted successfully:", response.data);
        setFormSubmitted(true);
    } catch (error) {
        console.error("Error submitting matric data:", error);
        setFormSubmitted(true);
    }
};
  const handlePicSubmit = async (data) => {
    try {
        const response = await axios.post("/api/matric/", data); // Update the API endpoint
        console.log("Matric data submitted successfully:", response.data);
        setFormSubmitted(true);
    } catch (error) {
        console.error("Error submitting matric data:", error);
        setFormSubmitted(true);
    }
};
  const handleExpSubmit = async (data) => {
    try {
        const response = await axios.post("/api/matric/", data); // Update the API endpoint
        console.log("Matric data submitted successfully:", response.data);
        setFormSubmitted(true);
    } catch (error) {
        console.error("Error submitting matric data:", error);
        setFormSubmitted(true);
    }
};

const handleNext = () => {
  setCurrentStep((prevStep) => prevStep + 1);
  setFormSubmitted(false); // Reset the form submission status for the next step
};

const handlePrevious = () => {
  setCurrentStep((prevStep) => prevStep - 1);
};


  return (
    <div className="container mt-5">
      {/* Render the form based on the current step */}
      {currentStep === 1 && <PersonalForm onSubmit={handlePersonalSubmit} />}
      {currentStep === 2 && <MatricForm onSubmit={handleMatricSubmit} />}
      {currentStep === 3 && <InterForm onSubmit={handleInterSubmit} />}
      {currentStep === 4 && <BachelorForm onSubmit={handleBachelorSubmit} />}
      {currentStep === 5 && <MasterForm onSubmit={handleMasterSubmit} />}
      {currentStep === 6 && <MphilForm onSubmit={handleMphilSubmit} />}
      {currentStep === 7 && <DoctorialForm onSubmit={handleDoctorialSubmit} />}
      {currentStep === 8 && <DocumentPicsForm onSubmit={handlePicSubmit} />}
      {currentStep === 9 && <ExperiencePicsForm onSubmit={handleExpSubmit} />}
      
      {/* Navigation buttons */}
      <div className="d-flex justify-content-between mt-3">
        {currentStep > 1 && (
          <button
            type="button"
            className="btn btn-secondary"
            onClick={handlePrevious}
          >
            Previous
          </button>
        )}
        {currentStep < 9 ? (
          <button
            type="button"
            className="btn btn-primary"
            onClick={handleNext}
            disabled={!formSubmitted} 
          >
            Next
          </button>
        ) : (
          <button
            type="submit"
            className="btn btn-success"
            onClick={() => alert('Form submitted successfully!')}
          >
            Submit
          </button>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
