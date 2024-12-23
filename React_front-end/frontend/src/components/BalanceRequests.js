import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { refreshAccessToken } from './refreshAccessToken';

const BalanceRequests = ({newbalanceData}) => {
  const [balanceData, setBalanceData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (newbalanceData) {
      setBalanceData((prevData) => [...prevData, newbalanceData]);
    }
  }, [newbalanceData]);
  // JWT Token for Authorization
  const token = localStorage.getItem('jwtToken');
  // Fetch existing balance data on component mount
  useEffect(() => {
    const fetchBalanceData = async () => {
      try {
        let token = await refreshAccessToken();
        if (!token) {
          throw new Error("Failed to refresh token.");
        } 
        const response = await axios.get('http://127.0.0.1:8000/apicall/adding-balance/', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setBalanceData(response.data);
        setLoading(false);
      } catch (err) {
        setError('Error fetching data');
        setLoading(false);
      }
    };

    fetchBalanceData();
  }, [token]);

  if (loading) return <div className="text-center mt-5"><div className="spinner-border text-primary" role="status"><span className="visually-hidden">Loading...</span></div></div>;
  if (error) return <div className="alert alert-danger text-center">{error}</div>;

  return (
    <div className="container mt-4">
      <h1 className="mb-4 text-center">Payment Requests</h1>

      <div className="table-responsive">
        <table className="table table-bordered table-striped">
          <thead className="table-dark">
            <tr>
              <th>Payment Amount</th>
              <th>Transaction ID</th>
              <th>Timestamp</th>
              <th>Comment</th>
              <th>Verified</th>
            </tr>
          </thead>
          <tbody>
            {balanceData.length > 0 ? (
              balanceData.map((balance) => (
                <tr key={balance.id}>
                  <td>{balance.payment_adding}</td>
                  <td>{balance.usertrnxid}</td>
                  <td>{new Date(balance.timestamp).toLocaleString()}</td>
                  <td>{balance.comment || 'No comment'}</td>
                  <td>
                    <span className={`badge ${balance.varified ? 'bg-success' : 'bg-danger'}`}>
                      {balance.varified ? 'your balance is varified' : 'Not varified yet, we updata this soon!'}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center">No payment requests found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BalanceRequests;
