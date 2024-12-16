import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

import PersonalForm from "../components/forms_components/PersonalForm";
// import MatricForm from "../components/forms_components/MatricForm";
// import InterForm from "../components/forms_components/InterForm";
// import BachelorForm from "../components/forms_components/BachelorForm";
// import MasterForm from "../components/forms_components/MasterForm";
// import MphilForm from "../components/forms_components/MPhilForm";
// import DoctorialForm from "../components/forms_components/DoctorialForm";
// import DocumentPicsForm from "../components/forms_components/DocumentPicForm";
// import ExperiencePicsForm from "../components/forms_components/ExperiencPicForm";
const UserProfile = () => {
 
  // const [currentStep, setCurrentStep] = useState(1);
  const [formSubmitted, setFormSubmitted] = useState(false); // Track form submission status

  const handlePersonalSubmit = async (data) => {
    try {
        const response = await axios.post("http://127.0.0.1:8000/apicall/personal/", data); // Update the API endpoint
        console.log("personal data submitted successfully:", response.data);
        
    } catch (error) {
        console.error("Error submitting matric data:", error);
        setFormSubmitted(true);
    }
};


  return (
    <div className="container mt-5">
      {/* Render the form based on the current step */}
       <PersonalForm onSubmit={handlePersonalSubmit} />
      {/* {currentStep === 2 && <MatricForm onSubmit={handleMatricSubmit} />}
      {currentStep === 3 && <InterForm onSubmit={handleInterSubmit} />}
      {currentStep === 4 && <BachelorForm onSubmit={handleBachelorSubmit} />}
      {currentStep === 5 && <MasterForm onSubmit={handleMasterSubmit} />}
      {currentStep === 6 && <MphilForm onSubmit={handleMphilSubmit} />}
      {currentStep === 7 && <DoctorialForm onSubmit={handleDoctorialSubmit} />}
      {currentStep === 8 && <DocumentPicsForm onSubmit={handlePicSubmit} />}
      {currentStep === 9 && <ExperiencePicsForm onSubmit={handleExpSubmit} />}
       */}
    
    </div>
  );
};

export default UserProfile;
