
import React from 'react';
const HomePage = () => {

  const openJobsPage = () => {
    window.location.href = '/jobs'; // Navigate to the "Jobs" page
  };

  const openAdmissionsPage = () => {
    window.location.href = '/admissions'; // Navigate to the "Admissions" page
  };
  return (
    <>
     <div className='container-fluid '>
     <button className='btn btn-primary mx-4' onClick={openJobsPage}>Go to Jobs</button>
      <button className='btn btn-primary mx-4' onClick={openAdmissionsPage}>Go to Admissions</button>
     </div>
    
    
    </>
  );
}

export default HomePage;
