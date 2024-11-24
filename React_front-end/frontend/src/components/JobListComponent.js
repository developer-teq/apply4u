// JobListComponent.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import "./joblistcomponents.css"

function JobListComponent() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    // Fetch the job data (could be an API call)
    setJobs([
      { id: 1, title: 'Software Engineer', slug:'websitedeveloper-slug', description: 'Developing web applications' },
      { id: 2, title: 'Data Analyst',slug:'data-analyst-slug', description: 'Analyzing data for business insights' },
      { id: 3, title: 'Software Engineer', slug:'websitedeveloper-slug', description: 'Developing web applications' },
      { id: 4, title: 'Data Analyst',slug:'data-analyst-slug', description: 'Analyzing data for business insights' },
      { id: 5, title: 'Software Engineer', slug:'websitedeveloper-slug', description: 'Developing web applications' },
      { id: 6, title: 'Data Analyst',slug:'data-analyst-slug', description: 'Analyzing data for business insights' },
      { id: 7, title: 'Software Engineer', slug:'websitedeveloper-slug', description: 'Developing web applications' },
      { id: 8, title: 'Data Analyst',slug:'data-analyst-slug', description: 'Analyzing data for business insights' },
      { id: 6, title: 'Data Analyst',slug:'data-analyst-slug', description: 'Analyzing data for business insights' },
      { id: 7, title: 'Software Engineer', slug:'websitedeveloper-slug', description: 'Developing web applications' },
      { id: 8, title: 'Data Analyst',slug:'data-analyst-slug', description: 'Analyzing data for business insights' },
      { id: 6, title: 'Data Analyst',slug:'data-analyst-slug', description: 'Analyzing data for business insights' },
      { id: 7, title: 'Software Engineer', slug:'websitedeveloper-slug', description: 'Developing web applications' },
      { id: 8, title: 'Data Analyst',slug:'data-analyst-slug', description: 'Analyzing data for business insights' }
    ]);
  }, []);

  return (
    <div className='joblistcomponent'>

        {jobs.map(job => (<Card className='card' style={{ width: '18rem' }}>
              <Card.Body key={job.id}>
                <Card.Title>{job.title}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{job.description}</Card.Subtitle>
                <Card.Text>
                  slug:{job.slug}Some quick example text to build on the {job.title} and make up the
                  bulk of the card's content.
                </Card.Text>
                <Link className='btn btn-secondary' to={`/jobs/${job.slug}`} state={{ job }}>{job.title}
                </Link>
                
              </Card.Body>
            </Card>
        ))}


    </div>
  );
}

export default JobListComponent;
