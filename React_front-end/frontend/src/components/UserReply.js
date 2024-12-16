import React, { useState } from 'react';
import axios from 'axios';
import { refreshAccessToken } from './refreshAccessToken';

const SubmitReply = ({ jobId, onReplySubmitted }) => {
  const [userReply, setUserReply] = useState('');
  const [extraDocument, setExtraDocument] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [replies, setReplies] = useState([]); // State to store replies

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    const formData = new FormData();
    formData.append('job', jobId); // Job ID is passed as a prop
    formData.append('userreply', userReply);
    if (extraDocument) {
      formData.append('extradocument', extraDocument);
    }

    try {
      let token = await refreshAccessToken();
      if (!token) {
        token = await refreshAccessToken();
      }

      const response = await axios.post('http://127.0.0.1:8000/apicall/userreplied/', formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      setSuccess('Reply submitted successfully!');
      setUserReply('');
      setExtraDocument(null);

      // Capture the current time and add the new reply to the list
      const currentTime = new Date().toLocaleString(); // Get the current time
      setReplies((prevReplies) => [
        ...prevReplies,
        {
          reply: userReply,
          document: extraDocument ? extraDocument.name : null,
          time: currentTime, // Store the timestamp
        },
      ]);

      onReplySubmitted(); // Callback to refresh data or notify parent component
    } catch (err) {
        console.log(err)
    //   setError('Failed to submit the reply. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container my-4">
      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}

      {/* Display the list of submitted replies */}
      <div className="mb-3">
        {replies.length > 0 && (
          <div>
          
            <ul className="list-group">
              {replies.map((reply, index) => (
                <li key={index} className="list-group-item">
                  <strong>Reply:</strong> {reply.reply}
                  {reply.document && (
                    <div>
                      <strong>Document:</strong> {reply.document}
                    </div>
                  )}
                  <div className="text-muted" >
                  {reply.time}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
         
          <textarea
            id="userReply"
            className="form-control"
            placeholder='Reply here'
            value={userReply}
            onChange={(e) => setUserReply(e.target.value)}
            rows="3"
            required
          ></textarea>
        </div>
        <div className="mb-3">
          <label htmlFor="extraDocument" className="form-label">
            Upload Extra Document (Optional)
          </label>
          <input
            type="file"
            id="extraDocument"
            className="form-control"
            onChange={(e) => setExtraDocument(e.target.files[0])}
          />
        </div>
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? 'Submitting...' : 'Submit Reply'}
        </button>
      </form>
    </div>
  );
};

export default SubmitReply;
