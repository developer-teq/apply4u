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
      { id: 1, title: 'Agriculter departement', slug:'websitedeveloper-slug', description: 'Developing web applications' , imageUrl: 'https://picsum.photos/200/300'  },
      { id: 2, title: 'sement company',slug:'data-analyst-slug', description: 'Analyzing data for business insights', imageUrl: 'https://picsum.photos/200/300'  },
      { id: 3, title: 'Agriculter departement', slug:'websitedeveloper-slug', description: 'Developing web applications', imageUrl: 'https://picsum.photos/200/300'  },
      { id: 4, title: 'sement company',slug:'data-analyst-slug', description: 'Analyzing data for business insights' , imageUrl: 'https://picsum.photos/200/300' },
      { id: 5, title: 'Agriculter departement', slug:'websitedeveloper-slug', description: 'Developing web applications' , imageUrl: 'https://picsum.photos/200/300' },
      { id: 6, title: 'sement company',slug:'data-analyst-slug', description: 'Analyzing data for business insights' , imageUrl: 'https://picsum.photos/200/300' },
      { id: 7, title: 'Agriculter departement', slug:'websitedeveloper-slug', description: 'Developing web applications', imageUrl: 'https://picsum.photos/200/300'  },
      { id: 8, title: 'sement company',slug:'data-analyst-slug', description: 'Analyzing data for business insights', imageUrl: 'https://picsum.photos/200/300'  },
      { id: 6, title: 'sement company',slug:'data-analyst-slug', description: 'Analyzing data for business insights' , imageUrl: 'https://picsum.photos/200/300' },
      { id: 7, title: 'Agriculter departement', slug:'websitedeveloper-slug', description: 'Developing web applications', imageUrl: 'https://picsum.photos/200/300'  },
      { id: 8, title: 'sement company',slug:'data-analyst-slug', description: 'Analyzing data for business insights', imageUrl: 'https://picsum.photos/200/300'  },
      { id: 6, title: 'sement company',slug:'data-analyst-slug', description: 'Analyzing data for business insights' , imageUrl: 'https://picsum.photos/200/300' },
      { id: 7, title: 'Agriculter departement', slug:'websitedeveloper-slug', description: 'Developing web applications', imageUrl: 'https://picsum.photos/200/300'  },
      { id: 8, title: 'sement company',slug:'data-analyst-slug', description: 'Analyzing data for business insights', imageUrl: 'https://picsum.photos/200/300'  }
    ]);
  }, []);

  return (
    <div className='joblistcomponent'>

        {jobs.map(main_job => (<Card className='card' style={{ width: '18rem' }}>
              <Card.Body key={main_job.id}>
                <Card.Title>{main_job.title}</Card.Title>
                <img src={main_job.imageUrl} alt={main_job.title} className="job-image" />
                <Card.Subtitle className="mb-2 text-muted">{main_job.description}</Card.Subtitle>
                <Card.Text>
                  slug:{main_job.slug}Some quick example text to build on the {main_job.title} and make up the
                  bulk of the card's content.
                </Card.Text>
                <Link className='btn btn-secondary' to={`/jobs/${main_job.slug}`} state={{ main_job }}>{main_job.title}
                </Link>
                
              </Card.Body>
            </Card>
        ))}


    </div>
  );
}

export default JobListComponent;
