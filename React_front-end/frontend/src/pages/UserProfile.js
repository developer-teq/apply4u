import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  // Initialize state for form data
  const [formData, setFormData] = useState({
    full_name: "",
    Dateofbirth: "",
    father_name: "",
    address: "",
    domicile: "",
    qualific: "",
    gender: "male",
    phone_number: "",
    get_alerts_by: "phone",
    send_education_based_jobs_alerts: "",
    cnic_number: "",
    father_cnic: "",
    My_Father_is: "alive",
  });

  // Mock data for job regions and education categories
  const jobRegions = [
    { id: 1, name: "Region 1" },
    { id: 2, name: "Region 2" },
  ];

  const educationCategories = [
    { id: 1, education: "High School" },
    { id: 2, education: "Bachelor's Degree" },
    { id: 3, education: "Master's Degree" },
  ];

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    alert("Form submitted successfully!");
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">User Information Form</h2>
      <form onSubmit={handleSubmit} className="p-4 border rounded bg-light">
        {/* Full Name */}
        <div className="mb-3">
          <label className="form-label">Full Name</label>
          <input
            type="text"
            className="form-control"
            name="full_name"
            value={formData.full_name}
            onChange={handleChange}
            required
          />
        </div>

        {/* Date of Birth */}
        <div className="mb-3">
          <label className="form-label">Date of Birth</label>
          <input
            type="date"
            className="form-control"
            name="Dateofbirth"
            value={formData.Dateofbirth}
            onChange={handleChange}
            required
          />
        </div>

        {/* Father's Name */}
        <div className="mb-3">
          <label className="form-label">Father Name</label>
          <input
            type="text"
            className="form-control"
            name="father_name"
            value={formData.father_name}
            onChange={handleChange}
            required
          />
        </div>

        {/* Address */}
        <div className="mb-3">
          <label className="form-label">Address</label>
          <input
            type="text"
            className="form-control"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
          />
        </div>

        {/* Domicile */}
        <div className="mb-3">
          <label className="form-label">Domicile</label>
          <select
            className="form-select"
            name="domicile"
            value={formData.domicile}
            onChange={handleChange}
            required
          >
            <option value="">Select Domicile</option>
            {jobRegions.map((region) => (
              <option key={region.id} value={region.id}>
                {region.name}
              </option>
            ))}
          </select>
        </div>

        {/* Qualification */}
        <div className="mb-3">
          <label className="form-label">Qualification</label>
          <select
            className="form-select"
            name="qualific"
            value={formData.qualific}
            onChange={handleChange}
            required
          >
            <option value="">Select Qualification</option>
            {educationCategories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.education}
              </option>
            ))}
          </select>
        </div>

        {/* Gender */}
        <div className="mb-3">
          <label className="form-label">Gender</label>
          <select
            className="form-select"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>

        {/* Phone Number */}
        <div className="mb-3">
          <label className="form-label">Phone Number</label>
          <input
            type="tel"
            className="form-control"
            name="phone_number"
            value={formData.phone_number}
            onChange={handleChange}
            required
          />
        </div>

        {/* Get Alerts By */}
        <div className="mb-3">
          <label className="form-label">Get Alerts By</label>
          <select
            className="form-select"
            name="get_alerts_by"
            value={formData.get_alerts_by}
            onChange={handleChange}
          >
            <option value="phone">Phone</option>
            <option value="WhatsApp messages">WhatsApp Messages</option>
            <option value="WhatsApp and phone both">WhatsApp and Phone Both</option>
            <option value="No alerts">No Alerts</option>
          </select>
        </div>

        {/* CNIC Number */}
        <div className="mb-3">
          <label className="form-label">CNIC Number</label>
          <input
            type="text"
            className="form-control"
            name="cnic_number"
            value={formData.cnic_number}
            onChange={handleChange}
            required
          />
        </div>

        {/* Father's CNIC */}
        <div className="mb-3">
          <label className="form-label">Father CNIC</label>
          <input
            type="text"
            className="form-control"
            name="father_cnic"
            value={formData.father_cnic}
            onChange={handleChange}
            required
          />
        </div>

        {/* Father's Status */}
        <div className="mb-3">
          <label className="form-label">My Father is</label>
          <select
            className="form-select"
            name="My_Father_is"
            value={formData.My_Father_is}
            onChange={handleChange}
          >
            <option value="alive">Alive</option>
            <option value="not alive">Not Alive</option>
          </select>
        </div>

        {/* Submit Button */}
        <div className="d-grid">
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default App;
