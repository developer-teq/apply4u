// JobListComponent.js

import axios from "axios";

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import "./joblistcomponents.css"
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';


function JobListComponent() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch data from API
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/apicall/");
        // setJobs(response.data); // Assuming the API returns a list
        setJobs(response.data.results);
         
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch jobs. Please try again later.");
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  // from django.utils import timezone
// jobtitle posts sector newspaper addate sectorlogo adpic full_add lastdate work
//jobtitle posts sector newspaper addate sectorlogo adpic full_add lastdate work
  return (
    <div className='joblistcomponent'>

        {jobs.map(main_job => (<Card className='card' style={{ width: '18rem' }}>
          
      <Card.Header as="h5"> {main_job.jobtitle} </Card.Header>
      {main_job.sectorlogo && (
              <img
                src={main_job.sectorlogo}
                alt="Sector Logo"
                style={{ width: "100px", height: "auto" }}
              />
            )}
      <Card.Body>
      {main_job.adpic && (
              <img
                src={main_job.adpic}
                alt="Job Ad"
                style={{ width: "300px", height: "auto" }}
              />
            )}
        <Card.Title>{main_job.posts}</Card.Title>
        <Card.Text>
        27-4 newspaper jhang       last date 
        </Card.Text>
        <ListGroup horizontal>
      <ListGroup.Item>{main_job.newspaper}</ListGroup.Item>
      <ListGroup.Item> Posted on :{main_job.addate}</ListGroup.Item>
      <ListGroup.Item>last date:{main_job.lastdate} </ListGroup.Item>
    </ListGroup>
    
        <Button variant="primary">Detail jobs</Button>
      </Card.Body>
    </Card>
           
        ))}


    </div>
  );
}

export default JobListComponent;
