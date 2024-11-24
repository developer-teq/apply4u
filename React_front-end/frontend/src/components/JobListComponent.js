// JobListComponent.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function JobListComponent() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    // Fetch the job data (could be an API call)
    setJobs([
      { id: 1, title: 'Software Engineer', slug:'websitedeveloper-slug', description: 'Developing web applications' },
      { id: 2, title: 'Data Analyst',slug:'data-analyst-slug', description: 'Analyzing data for business insights' }
    ]);
  }, []);

  return (
    <div>
      {jobs.map(job => (
        <div key={job.id}>
          <h3>{job.title}</h3>
          <p>{job.description}</p>
          <Link to={`/jobs/${job.id}`} state={{ job }}>{job.title}
          </Link>
         
        </div>
      ))}
    </div>
  );
}

export default JobListComponent;
