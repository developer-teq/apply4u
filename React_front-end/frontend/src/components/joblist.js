import React, { useEffect, useState } from "react";
import axios from "axios";

const JobList = () => {
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
         console.log(response.data)
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

  return (
    <div>
      <h1>Job Listings</h1>
      <ul>
        {jobs.map((job) => (
          <li key={job.id}>
            <h3>{job.jobtitle}</h3>
            <p>{job.meta_discription}</p>
            <p>
              Posted on: <strong>{job.addate}</strong>
            </p>
            <p>Last Date: {job.lastdate}</p>
            {job.sectorlogo && <img src={job.sectorlogo} alt="Sector Logo" width="100" />}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default JobList;
