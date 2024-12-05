import React, { useEffect, useState } from "react";
import axios from "axios";

const UserAppliedJobs = () => {
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAppliedJobs = async () => {
      try {
        // Fetch data from the backend
        const response = await axios.get("http://127.0.0.1:8000/apicall/applied_jobs", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Assumes JWT stored in localStorage
          },
        });
        setAppliedJobs(response.data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch applied jobs.");
      } finally {
        setLoading(false);
      }
    };

    fetchAppliedJobs();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p style={{ color: "red" }}>{error}</p>;
  }

  return (
    <div>
      <h1>My Applied Jobs</h1>
      
      {appliedJobs.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Job Title</th>
              <th>Applied On</th>
              <th>Status</th>
              <th>Comment</th>
            </tr>
          </thead>
          <tbody>
            {appliedJobs.map((job) => (
              <tr key={job.id}>
                <td>{job.appliedtojob}</td>
                <td>{new Date(job.timestamp).toLocaleDateString()}</td>
                <td>{job.status}</td>
                <td>{job.comment || "No comments"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>You have not applied to any jobs yet.</p>
      )}
    </div>
  );
};

export default UserAppliedJobs;
