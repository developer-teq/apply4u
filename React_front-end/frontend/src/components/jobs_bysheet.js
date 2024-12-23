import React, { useState, useEffect } from 'react';
import * as XLSX from 'xlsx';
import { Button, Card, ListGroup } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './joblistcomponents.css';

function JobListComponent() {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch jobs from the Excel file
  useEffect(() => {
    const fetchJobsFromExcel = async () => {
      try {
        // Fetch the Excel file from /public folder
        const response = await fetch('https://docs.google.com/spreadsheets/d/e/2PACX-1vQ9xR7FcJxzyChh8al_wqgB4oF0vPzpizyZ4Dc-cjGeUuKxHi_hu0XuESgSe30lcktEQzPeb3ejeUpR/pubhtml');
        const arrayBuffer = await response.arrayBuffer();
        
        // Read the Excel file using XLSX
        const workbook = XLSX.read(arrayBuffer, { type: 'array' });
        const worksheet = workbook.Sheets[workbook.SheetNames[0]]; // Get the first sheet
        const data = XLSX.utils.sheet_to_json(worksheet); 
        
        setJobs(data); 
        console.log(data)// Store the parsed Excel data as jobs
        setLoading(false);
      } catch (err) {
        console.error("Failed to load jobs from Excel", err);
        setError("Failed to load jobs. Please try again later.");
        setLoading(false);
      }
    };

    fetchJobsFromExcel();
  }, []);

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

            <Card.Body>
              {main_job.adpic && (
                <img className="img-fluid" src={main_job.adpic} alt="Job Ad" />
              )}
              <Card.Title>{main_job.posts} Positions Available</Card.Title>
              <ListGroup horizontal className="w-100 flex-wrap flex-md-nowrap">
                <ListGroup.Item>{main_job.newspaper}</ListGroup.Item>
                <ListGroup.Item>Posted on: {main_job.addate}</ListGroup.Item>
                <ListGroup.Item>Last date: {main_job.lastdate} 
                  {isDatePassed && (<p style={{ color: "red", marginTop: "10px" }}>Date has passed</p>)}
                </ListGroup.Item>
              </ListGroup>

              <Button
                variant="primary"
                onClick={() => handleNavigate(main_job)}
                disabled={isDatePassed}
              >
                View Details
              </Button>
            </Card.Body>
          </Card>
        );
      })}
    </div>
  );
}

export default JobListComponent;
