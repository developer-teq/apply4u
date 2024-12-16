import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { refreshAccessToken } from './refreshAccessToken';

const JobStepsReplies = ({ jobId }) => {
  const [replies, setReplies] = useState([]);
  const [newStep, setNewStep] = useState('');
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
    
        const response = await axios.get(`http://127.0.0.1:8000/apicall/jobstepsreplies/${jobId}/`,
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

 

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="container">
      <h3>Job Steps</h3>
      <ul className="list-group">
        {replies.map((reply) => (
          <li key={reply.id} className="list-group-item">
            <strong>{reply.steps}</strong> - {reply.timestamp}
            {reply.alldone && <span className="badge bg-success ms-2">All Done</span>}
          </li>
        ))}
      </ul>
     
    </div>
  );
};

export default JobStepsReplies;
