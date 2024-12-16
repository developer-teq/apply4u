import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { refreshAccessToken } from './refreshAccessToken';

const BillingComponent = () => {
  const [billingData, setBillingData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // JWT Token for Authorization
  const token = localStorage.getItem('jwtToken');

  useEffect(() => {
    // Fetch billing data from the Django API
    const fetchBillingData = async () => {
      try {
        let token = await refreshAccessToken();
        if (!token) {
          throw new Error("Failed to refresh token.");
        }

        const response = await axios.get('http://127.0.0.1:8000/apicall/billing/', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setBillingData(response.data);
        setLoading(false);
      } catch (err) {
        setError('Error fetching data');
        setLoading(false);
      }
    };

    fetchBillingData();
  }, [token]);

  if (loading) return <div className="text-center mt-5"><div className="spinner-border text-primary" role="status"><span className="visually-hidden">Loading...</span></div></div>;
  if (error) return <div className="alert alert-danger text-center">{error}</div>;

  return (
    <div className="container mt-4">
      <h1 className="mb-4 text-center">Billing Information</h1>

      <div className="card shadow-sm">
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-bordered table-striped">
              <thead className="table-dark">
                <tr>
                  <th>Balance in request</th>
                  <th>Current Balance</th>
                  <th>Timestamp</th>
                </tr>
              </thead>
              <tbody>
                {billingData.length > 0 ? (
                  billingData.map((billing) => (
                    <tr key={billing.id}>
                      <td>{billing.userbalance}</td>
                      <td>{billing.accountmanagement}</td>
                      <td>{new Date(billing.timestamp).toLocaleString()}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3" className="text-center">No billing information found</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BillingComponent;
