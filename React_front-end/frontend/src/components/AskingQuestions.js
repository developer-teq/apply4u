import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { refreshAccessToken } from './refreshAccessToken';

const AskingQuestions = ({ jobId }) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch questions and replies
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        let token = await refreshAccessToken();
        if (!token) {
          token = await refreshAccessToken();
        }

        const response = await axios.get(`http://127.0.0.1:8000/apicall/askingquestions/${jobId}/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // Ensure both questions and replies exist
        const questions = response.data.questions || [];
        const replies = response.data.user_replies || [];

        // Merge and label each message type
        const combinedMessages = [
          ...questions.map((question) => ({ ...question, type: 'question' })),
          ...replies.map((reply) => ({ ...reply, type: 'reply' }))
        ];

        // Sort messages by timestamp
        combinedMessages.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));

        setMessages(combinedMessages);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch messages');
        setLoading(false);
      }
    };

    fetchMessages();
  }, [jobId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="chat-container">
      <h3 className="chat-title">Discussion</h3>
      <div className="chat-box">
        {messages.map((message) => (
          <div 
            key={`${message.type}-${message.id}`} 
            className={`chat-message ${message.type === 'question' ? 'staff-message' : 'user-message'}`}
          >
            <div className="message-content">
              <strong></strong> 
              {message.type === 'question' ? message.whattoask : message.userreply}
            </div>
            <div className="message-timestamp">{new Date(message.timestamp).toLocaleString()}</div>
            {message.read ? (
              <span className="badge bg-success">Read</span>
            ) : (
              <span className="badge bg-warning">Unread</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AskingQuestions;
