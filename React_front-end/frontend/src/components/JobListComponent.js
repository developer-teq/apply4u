import axios from "axios";
import React, { useState, useEffect } from 'react';
import { Button, Card, ListGroup } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './joblistcomponents.css';

function JobListComponent() {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch data from API
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/apicall/");
        console.log(response)
        setJobs(response.data.results); // Assuming the API returns an array in `results`
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch jobs. Please try again later.");
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

// addate
// adpic
// details
// full_add
// id
// jobtitle
// lastdate
// meta_discription
// newspaper
// oraganizational_data
// posts
// sector
// sectorinfo
// sectorlogo
// slug
// timestamp
// work
  // Loading or error state
  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  // Function to handle button click and navigate with state
  const handleNavigate = (main_job) => {
    navigate(`/jobs/${main_job.slug}`, { state: { main_job } });
  };

  return (
    <div className="container-fluid">
      {jobs.map(main_job => {
        // Check if the last date has passed
        const lastDate = new Date(main_job.lastdate);
        const isDatePassed = lastDate < new Date();

        return (
          <Card className="card" key={main_job.id}>
            <Card.Header as="h5">
              {main_job.sectorlogo && (
                <img
                  src={main_job.sectorlogo}
                  alt="Sector Logo"
                  style={{ width: "3.5em", height: "auto", padding: "2px 3px" }}
                />
              )}
              {main_job.jobtitle}
            </Card.Header>

            <Card.Body className="card-box">
              {/* {main_job.adpic && (
                <img className="img-fluid" src={main_job.adpic} alt="Job Ad" />
              )} */}
              <Card.Title> {main_job.posts.split(',').map((post, index) => (
    <Button key={index} variant="outline-success" className="m-1">
      {post.trim()}
    </Button>
  ))}</Card.Title>
              <div>
              <ListGroup horizontal className="job-list-card flex-wrap">
                <ListGroup.Item><span className="bold-text">Advertised in </span>{main_job.newspaper}</ListGroup.Item>
                <ListGroup.Item><span className="bold-text">Posted on: </span>{main_job.addate}</ListGroup.Item>
                <ListGroup.Item><span  className="bold-text">Last date: </span>{main_job.lastdate}... {isDatePassed && (<p style={{ color: "red", marginTop: "10px" }}>Date has passed</p>
              )}</ListGroup.Item>
              </ListGroup></div>
              <div>

              {/* Button to navigate to job details */}
              <Button
                variant="primary"
                onClick={() => handleNavigate(main_job)}
                 // Disable the button if the date is passed
              >
                Detail jobs
              </Button></div>

            </Card.Body>
          </Card>
        );
      })}
    </div>
  );
}

export default JobListComponent;
