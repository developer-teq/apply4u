import React from 'react';
import JobListComponent from '../components/JobListComponent';
import "./jobs.css"
import JobList from '../components/joblist';
function JobPage() {
  return (
    <div className='container'>
      {/* <h2> Latest Job Opportunities</h2> */}
      <JobListComponent />
      {/* <JobList/> */}
    </div>
  );
}

export default JobPage;
