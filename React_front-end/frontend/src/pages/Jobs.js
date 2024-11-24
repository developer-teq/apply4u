import React from 'react';
import JobListComponent from '../components/JobListComponent';

function JobPage() {
  return (
    <div>
      <h2>Job Opportunities</h2>
      <JobListComponent />
      <p>Here are the available job listings:</p>
      {/* Add your job-related content here */}
    </div>
  );
}

export default JobPage;
