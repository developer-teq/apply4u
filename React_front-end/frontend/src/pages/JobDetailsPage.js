import { useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

function JobDetailsPage() {
  const { jobslug } = useParams(); // Get jobslug from URL (if needed)
  const [jobDetails, setJobDetails] = useState([]); // Store the list of jobs
  const [loading, setLoading] = useState(true); // Loading state
  const [showForm, setShowForm] = useState(false); // Control form visibility
  const [selectedJob, setSelectedJob] = useState(null); // Track the selected job
  const [username, setUsername] = useState(''); // Track user's name input

  // Fetch job details when the component loads
  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/posts`); // Simulating API call
        const data = await response.json();
        setJobDetails(data);
      } catch (error) {
        console.error('Error fetching job details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobDetails();
  }, [jobslug]);

  // Handle loading state
  if (loading) {
    return <div>Loading job details...</div>;
  }

  // Handle no job details
  if (!jobDetails || jobDetails.length === 0) {
    return <div>No job details available.</div>;
  }

  // Handle Apply Button Click
  const handleApplyClick = (job) => {
    setSelectedJob(job); // Set the selected job details
    setShowForm(true); // Show the form
  };

  // Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Replace this with your actual API endpoint
      const response = await fetch('https://your-backend-api.com/api/apply-job/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          jobId: selectedJob.id,
          jobTitle: selectedJob.title,
          username,
        }),
      });

      if (response.ok) {
        alert('Application submitted successfully!');
        setShowForm(false); // Hide the form
        setSelectedJob(null); // Clear selected job
        setUsername(''); // Reset username input
      } else {
        alert('Failed to submit the application.');
      }
    } catch (error) {
      console.error('Error submitting application:', error);
      alert('An error occurred.');
    }
  };

  return (
    <div className="container">
      <div className="row">
        {/* Job Cards */}
        {jobDetails.map((job) => (
          <div className="col-md-4" key={job.id}>
            <div className="card mb-4">
              <div className="card-body">
                <h5 className="card-title">{job.title}</h5>
                <p className="card-text">{job.body}</p>
                <button
                  onClick={() => handleApplyClick(job)}
                  className="btn btn-primary"
                >
                  Apply to this Job
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Conditional Form Rendering */}
      {showForm && selectedJob && (
        <form onSubmit={handleSubmit} className="mt-3 border p-3">
          <h2>Apply to "{selectedJob.title}"</h2>

          {/* Job Details (Read-Only) */}
          <div className="mb-3">
            <label>Job Title</label>
            <input
              type="text"
              value={selectedJob.title}
              readOnly
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <label>Job Description</label>
            <textarea
              value={selectedJob.body}
              readOnly
              className="form-control"
              rows="3"
            />
          </div>
          <div className="mb-3">
            <label>Job ID</label>
            <input
              type="text"
              value={selectedJob.id}
              readOnly
              className="form-control"
            />
          </div>

          {/* Username Input */}
          <div className="mb-3">
            <label>Your Name</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="form-control"
              required
            />
          </div>

          {/* Submit Button */}
          <button type="submit" className="btn btn-success">
            Submit Application
          </button>
        </form>
      )}
    </div>
  );
}

export default JobDetailsPage;
