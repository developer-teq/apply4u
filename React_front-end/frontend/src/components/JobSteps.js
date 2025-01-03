import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { refreshAccessToken } from './refreshAccessToken';
import './JobStepsReplies.css'; // Import the CSS

const JobStepsReplies = ({ jobId }) => {
  const [replies, setReplies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch replies
  useEffect(() => {
    const fetchReplies = async () => {
      try {
        let token = await refreshAccessToken();
        if (!token) {
          token = await refreshAccessToken();
        }

        const response = await axios.get(
          `http://127.0.0.1:8000/apicall/jobstepsreplies/${jobId}/`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setReplies(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch replies');
        setLoading(false);
      }
    };

    fetchReplies();
  }, [jobId]);

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="job-steps-container">
      <h3 className="title">Job Proccess</h3>
      <ul className="job-steps-list">
        {replies.map((reply, index) => (
          <li key={reply.id} className="job-step-item">
            <strong className="step-number">Step {index + 1}:</strong> {reply.steps}
            <span className="timestamp">
              {new Date(reply.timestamp).toLocaleString()}
            </span>
            {reply.alldone && (
              <span className="badge">All Done</span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default JobStepsReplies;
