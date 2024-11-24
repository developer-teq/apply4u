
import React, { useState } from 'react';
const HomePage = () => {
  const [selectedOption, setSelectedOption] = useState(null);

  // Function to handle button clicks
  const handleButtonClick = (option) => {
    setSelectedOption(option);  // Update state based on the button clicked
  };
  return (
    <>
     <div>
      {/* Buttons for selecting the data type */}
      <div className="button-group">
        <button className="btn btn-primary" onClick={() => handleButtonClick('jobs')}>Job Opportunities</button>
        <button className="btn btn-primary" onClick={() => handleButtonClick('visa')}>Visa Information</button>
        <button className="btn btn-primary" onClick={() => handleButtonClick('admission')}>Admission Process</button>
      </div>

      {/* Render content based on selected option */}
      <div className="content">
        {selectedOption === 'jobs' && (
          <div>
            <h2>Job Opportunities</h2>
            <p>Here are the available job listings:</p>
            {/* Add your job-related content here */}
          </div>
        )}

        {selectedOption === 'visa' && (
          <div>
            <h2>Visa Information</h2>
            <p>Here is the visa information:</p>
            {/* Add your visa-related content here */}
          </div>
        )}

        {selectedOption === 'admission' && (
          <div>
            <h2>Admission Process</h2>
            <p>Here is the admission process:</p>
            {/* Add your admission-related content here */}
          </div>
        )}

        {/* If no button is clicked */}
        {selectedOption === null && (
          <div>
            <h2>Welcome to Our Website!</h2>
            <p>Please select an option to view more details.</p>
          </div>
        )}
      </div>
    </div>
    
    
    </>
  );
}

export default HomePage;
