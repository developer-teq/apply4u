// JobDetailsPage.js
import { useLocation, useParams } from 'react-router-dom';
import React, { useState } from 'react';
function JobDetailsPage() {
    const { state } = useLocation(); // Access the state from Link
    const { jobId } = useParams(); // Get jobId from URL (if needed)
    const [showForm, setShowForm] = useState(false); // Control form visibility
    const [username, setUsername] = useState(''); // Track user input


  if (!state?.job) {
    return <p>No job data available. Please navigate from the Job List Page.</p>;
  }

//   const { title, description, slug } = state.job;
const title = state.job.title;
const description = state.job.description;
const slug = state.job.slug;

const handleApplyClick = () => {
    setShowForm(true); // Show the form
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Prepare data to send to the Django API
    const formData = {
      jobTitle: title,
      jobSlug: slug,
      username,
    };

    try {
      // Replace with your Django API endpoint
      const response = await fetch('https://your-backend-api.com/api/apply-job/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('Application submitted successfully!');
        setShowForm(false); // Hide the form after submission
        setUsername('enw name'); // Reset form
      } else {
        alert('Failed to submit the application.');
      }
    } catch (error) {
      console.error('Error submitting application:', error);
      alert('An error occurred.');
    }
  };

  return (
    <div>
      <h1>Job Details</h1>
      <h2>{title}</h2>
      <p>{description}</p>
      <p>{slug}</p>
      <p>Job ID: {jobId}</p>
      <button onClick={handleApplyClick} className="btn btn-primary">
        Apply to this Job
      </button>
 {/* Conditional Rendering of the Form */}
 {showForm && (
        <form onSubmit={handleSubmit} className="mt-3 border p-3">
          <h2>Apply to {title}</h2>
          
          {/* Job Details (Read-Only) */}
          <div className="mb-3">
            <label>Job Title</label>
            <input type="text" value={title} readOnly className="form-control" />
          </div>
          <div className="mb-3">
            <label>Job Description</label>
            <textarea value={description} readOnly className="form-control" rows="3" />
          </div>

          {/* Username Input */}
          <div className="mb-3">
            <label>Your Username</label>
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

 )};
    </div>
  );
}

export default JobDetailsPage;
