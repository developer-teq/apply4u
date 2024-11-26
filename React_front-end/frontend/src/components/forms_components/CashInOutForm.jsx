import React, { useState } from "react";
import axios from "axios";

const CashoutForm = () => {
    const [formData, setFormData] = useState({
        user: "",
        cashout: 0,
        payemntmathod: "JazzCash",
        usertrnxid: 0,
        comment: "",
        fraudingperson: false,
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        // Handle boolean values for fraudingperson (checkbox)
        if (type === "checkbox") {
            setFormData({
                ...formData,
                [name]: checked,
            });
        } else {
            setFormData({
                ...formData,
                [name]: value,
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post("/api/cashouts/", formData, {
                headers: {
                    "Content-Type": "application/json",
                },
            });
            console.log("Cashout submitted successfully:", response.data);
            // Optionally clear form or handle the response after submission
        } catch (error) {
            console.error("Error submitting cashout:", error);
        }
    };

    return (
        <div>
        <form onSubmit={handleSubmit} className="p-4 border rounded bg-light">
            <h3>Cashout Form</h3>

            {/* User selection */}
            <div className="mb-3">
                <label className="form-label">User:</label>
                <input
                    type="text"
                    name="user"
                    value={formData.user}
                    onChange={handleChange}
                    placeholder="User ID or Username"
                    required
                />
            </div>

            {/* Cashout amount */}
            <div className="mb-3">
                <label className="form-label">Cashout Amount:</label>
                <input
                    type="number"
                    name="cashout"
                    value={formData.cashout}
                    onChange={handleChange}
                    min="0"
                    required
                />
            </div>

            {/* Payment Method */}
            <div className="mb-3">
                <label className="form-label">Payment Method:</label>
                <select
                    name="payemntmathod"
                    value={formData.payemntmathod}
                    onChange={handleChange}
                    required
                >
                    <option value="JazzCash">JazzCash</option>
                    <option value="Easypaisa">Easypaisa</option>
                </select>
            </div>

            {/* Transaction ID */}
            <div className="mb-3">
                <label className="form-label">Transaction ID:</label>
                <input
                    type="number"
                    name="usertrnxid"
                    value={formData.usertrnxid}
                    onChange={handleChange}
                    required
                />
            </div>

            {/* Comment */}
            <div className="mb-3">
                <label className="form-label">Comment:</label>
                <textarea
                    name="comment"
                    value={formData.comment}
                    onChange={handleChange}
                    placeholder="Optional comment"
                />
            </div>

            {/* Fraud detection */}
            <div className="mb-3">
                <label className="form-label">Frauding Person:</label>
                <input
                    type="checkbox"
                    name="fraudingperson"
                    checked={formData.fraudingperson}
                    onChange={handleChange}
                />
            </div>

            {/* Submit button */}
            <div className="d-grid">
                <button type="submit" className="btn btn-primary">
                    Submit
                </button>
            </div>
        </form>
        </div>
    );
};

export default CashoutForm;
