import React, { useState } from 'react';
import axios from 'axios';
import { refreshAccessToken } from './refreshAccessToken';

const SubmitReply = ({ jobId, onReplySubmitted }) => {
  const [userReply, setUserReply] = useState('');
  const [extraDocument, setExtraDocument] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
 

    const formData = new FormData();
    formData.append('job', jobId);
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

  
      setUserReply('');
      setExtraDocument(null);

      // Send the new reply to the parent component
      onReplySubmitted({
        type: 'reply',
        userreply: userReply,
        submitted:true,
        // extradocument: extraDocument ? URL.createObjectURL(extraDocument) : null,
        extradocument: response.data.extradocument,
        timestamp: new Date().toISOString(),
      });
    } catch (err) {
      setError('Failed to submit the reply. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container my-4">
      {error && <div className="alert alert-danger">{error}</div>}
    
      <form onSubmit={handleSubmit} className="d-flex align-items-center">
        <div className="flex-grow-1">
          <textarea
            id="userReply"
            className="form-control"
            placeholder="Reply here"
            value={userReply}
            onChange={(e) => setUserReply(e.target.value)}
            rows="3"
            required
          ></textarea>
        </div>
       
        <div className=""> <div className="">
          <label htmlFor="extraDocument" className="btn btn-light border shadow-sm p-2 rounded-circle">
            <i className="fa fa-paperclip" style={{ fontSize: "20px" }}></i>
          </label>
          <input
            type="file"
            id="extraDocument"
            className="d-none"
            onChange={(e) => setExtraDocument(e.target.files[0])}
          />
        </div>
        <button type="submit" className="btn btn-primary submitbutton" disabled={loading}>
  {loading ? (
    <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
  ) : (
    ""
  )}
</button>
        </div>
      </form>
    </div>
  );
};

export default SubmitReply;
