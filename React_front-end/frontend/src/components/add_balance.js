// src/components/CashoutForm.js
import React, { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { refreshAccessToken } from "./refreshAccessToken";

const CashoutForm = ({addBalanceRequest}) => {
  const [formData, setFormData] = useState({
    payment_adding: 0,
    paymentMethod: "JazzCash",
    usertrnxid: 0,
    comment: "",
    fraudingperson: false,
  });
  const [message, setMessage] = useState(null);
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let token = await refreshAccessToken();
      if (!token) {
        throw new Error("Failed to refresh token.");
      }

      const response = await axios.post(
        "http://127.0.0.1:8000/apicall/adding-balance/",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      addBalanceRequest({ ...formData, id: response.data.id, timestamp: new Date() });
      setMessage({ type: "success", text: response.data.message });
      
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.response?.data?.error ||
        "An error occurred while submitting.";
      setMessage({ type: "error", text: errorMessage });
      console.error("Error submitting cashout:", error);
    }
  };

  return (
    <div className="container my-5">
      {message && (
        <div
          className={`alert ${
            message.type === "success" ? "alert-success" : "alert-danger"
          }`}
        >
          {message.text}
        </div>
      )}

      <div className="card shadow-lg">
        <div className="card-header bg-primary text-white text-center">
          <h3>Cashout Form</h3>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Cashout Amount:</label>
              <input
                type="number"
                className="form-control"
                name="payment_adding"
                value={formData.payment_adding}
                onChange={handleChange}
                min="0"
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Payment Method:</label>
              <select
                className="form-select"
                name="paymentMethod"
                value={formData.paymentMethod}
                onChange={handleChange}
                required
              >
                <option value="JazzCash">JazzCash</option>
                <option value="Easypaisa">Easypaisa</option>
              </select>
            </div>

            <div className="mb-3">
              <label className="form-label">Transaction ID:</label>
              <input
                type="number"
                className="form-control"
                name="usertrnxid"
                value={formData.usertrnxid}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Comment:</label>
              <textarea
                className="form-control"
                name="comment"
                value={formData.comment}
                onChange={handleChange}
                placeholder="Optional comment"
                rows="3"
              />
            </div>

            <div className="form-check mb-3">
              <input
                className="form-check-input"
                type="checkbox"
                name="fraudingperson"
                id="fraudingperson"
                checked={formData.fraudingperson}
                onChange={handleChange}
              />
              <label className="form-check-label" htmlFor="fraudingperson">
                Frauding Person
              </label>
            </div>

            <div className="d-grid">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CashoutForm;
