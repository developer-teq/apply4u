import React from 'react';
import JobListComponent from '../components/JobListComponent';
import "./jobs.css"
function JobPage() {
  return (
    <div className='container'>
      <h2> Latest Job Opportunities</h2>
      <JobListComponent />
    </div>
  );
}

export default JobPage;
