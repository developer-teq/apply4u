import React, { useState, useEffect ,useRef} from 'react';
import axios from 'axios';
import { refreshAccessToken } from './refreshAccessToken';
import SubmitReply from './UserReply';

const AskingQuestions = ({ jobId }) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const chatBoxRef = useRef(null); // Ref to the chat box container

   const handleReplySubmitted = (newReply) => {
    setMessages((prevMessages) => [...prevMessages, newReply]);
  };
  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [messages]);
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
          ...replies.map((reply) => ({ ...reply, type: 'reply', submitted: true, })),
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
      <div  ref={chatBoxRef} className="chat-box">
        {messages.map((message) => (
          
          <div
            key={`${message.type}-${message.id}`}
            className={`chat-message ${message.type === 'question' ? 'staff-message' : 'user-message'}`}
          >
            <div className="message-content">
             
              {message.type === 'question' ? message.whattoask : message.userreply}
            </div>

            {/* Display image if available */}
            {message.extradocument && (
              <div className="message-image">
                <img
                  src={`http://127.0.0.1:8000${message.extradocument}`}
                  alt='Attachement'
                  style={{ maxWidth: '200px', borderRadius: '5px', marginTop: '10px' }}
                />
              </div>
            )}

            <div className="message-timestamp">{new Date(message.timestamp).toLocaleString()} {message.type === 'reply' && (
          message.submitted ? (
            message.read ? (
              <span className="text-success">
                <i className="fas fa-check-double"></i> {/* Double tick for read */}
              </span>
            ) : (
              <span className="text-warning">
                <i className="fas fa-check"></i> {/* Single tick for sent but unread */}
              </span>
            )
          ) : (
            <span className="text-danger">
              <i className="fas fa-times-circle"></i>
            </span>
          )
        )}</div>
           


      </div>
    ))}



          
      </div>
      <SubmitReply jobId={jobId} onReplySubmitted={handleReplySubmitted}/>
    </div>
  );
};

export default AskingQuestions;
