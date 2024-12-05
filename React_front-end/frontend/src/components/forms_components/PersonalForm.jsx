import React, { useState, useEffect } from "react";

const PersonalForm = ({ onSubmit }) => {
  const [jobRegions, setJobRegions] = useState([]);
  const [educationCategories, setEducationCategories] = useState([]);
  const [formData, setFormData] = useState({
    full_name: "",
    date_of_birth: "",
    father_name: "",
    address: "",
    domicile: "",
    qualification: "",
    gender: "male",
    phone_number: "",
    get_alerts_by: "phone",
    send_education_based_jobs_alerts: "",
    cnic_number: "",
    father_cnic: "",
    father_status: "alive",
  });
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    // Use Promise.all to fetch both data concurrently
    Promise.all([
      fetch("/jobregion/"),
      fetch("/educationcategory/")
    ])
      .then(([resJobRegions, resEducationCategories]) => {
        // Log the raw response to debug the issue
        console.log('Job Regions Response:', resJobRegions);
        console.log('Education Categories Response:', resEducationCategories);
        
        if (!resJobRegions.ok) {
          throw new Error(`Error fetching job regions: ${resJobRegions.status}`);
        }
        if (!resEducationCategories.ok) {
          throw new Error(`Error fetching education categories: ${resEducationCategories.status}`);
        }

        // Try to parse the JSON after checking the response is not HTML
        return Promise.all([resJobRegions.text(), resEducationCategories.text()]);
      })
      .then(([jobRegionsText, educationCategoriesText]) => {
        try {
          // Now try to parse the text as JSON
          const jobRegionsData = JSON.parse(jobRegionsText);
          const educationCategoriesData = JSON.parse(educationCategoriesText);
          // Set the state for both jobRegions and educationCategories
          setJobRegions(jobRegionsData);
          setEducationCategories(educationCategoriesData);
        } catch (error) {
          console.error("Error parsing JSON:", error);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);
  
  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Validate the form fields
  const validateForm = () => {
    const newErrors = {};
    if (!formData.full_name.trim()) newErrors.full_name = "Full name is required.";
    if (!formData.date_of_birth) newErrors.date_of_birth = "Date of birth is required.";
    if (!formData.father_name.trim()) newErrors.father_name = "Father's name is required.";
    if (!formData.address.trim()) newErrors.address = "Address is required.";
    if (!formData.domicile) newErrors.domicile = "Please select a domicile.";
    if (!formData.qualification) newErrors.qualification = "Please select a qualification.";
    if (!/^\d{13}$/.test(formData.cnic_number)) newErrors.cnic_number = "Invalid CNIC number.";
    if (!/^\d{11}$/.test(formData.phone_number)) newErrors.phone_number = "Invalid phone number.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
      setSuccessMessage("Form submitted successfully!");
    } else {
      setSuccessMessage("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded bg-light">
      {/* Success Message */}
      {successMessage && <div className="alert alert-success">{successMessage}</div>}

      {/* Full Name */}
      <div className="mb-3">
        <label htmlFor="full_name" className="form-label">Full Name</label>
        <input
          type="text"
          id="full_name"
          name="full_name"
          className={`form-control ${errors.full_name ? "is-invalid" : ""}`}
          value={formData.full_name}
          onChange={handleChange}
          required
        />
        {errors.full_name && <div className="invalid-feedback">{errors.full_name}</div>}
      </div>

      {/* Date of Birth */}
      <div className="mb-3">
        <label htmlFor="date_of_birth" className="form-label">Date of Birth</label>
        <input
          type="date"
          id="date_of_birth"
          name="date_of_birth"
          className={`form-control ${errors.date_of_birth ? "is-invalid" : ""}`}
          value={formData.date_of_birth}
          onChange={handleChange}
          required
        />
        {errors.date_of_birth && <div className="invalid-feedback">{errors.date_of_birth}</div>}
      </div>

      {/* Father's Name */}
      <div className="mb-3">
        <label htmlFor="father_name" className="form-label">Father's Name</label>
        <input
          type="text"
          id="father_name"
          name="father_name"
          className={`form-control ${errors.father_name ? "is-invalid" : ""}`}
          value={formData.father_name}
          onChange={handleChange}
          required
        />
        {errors.father_name && <div className="invalid-feedback">{errors.father_name}</div>}
      </div>

      {/* Address */}
      <div className="mb-3">
        <label htmlFor="address" className="form-label">Address</label>
        <input
          type="text"
          id="address"
          name="address"
          className={`form-control ${errors.address ? "is-invalid" : ""}`}
          value={formData.address}
          onChange={handleChange}
          required
        />
        {errors.address && <div className="invalid-feedback">{errors.address}</div>}
      </div>

      {/* Domicile */}
      <div className="mb-3">
        <label htmlFor="domicile" className="form-label">Domicile</label>
        <select
          id="domicile"
          name="domicile"
          className={`form-select ${errors.domicile ? "is-invalid" : ""}`}
          value={formData.domicile}
          onChange={handleChange}
          required
        >
          <option value="">Select Domicile</option>
          {jobRegions.map((region) => (
            <option key={region.id} value={region.id}>{region.name}</option>
          ))}
        </select>
        {errors.domicile && <div className="invalid-feedback">{errors.domicile}</div>}
      </div>

      {/* Qualification */}
      <div className="mb-3">
        <label htmlFor="qualification" className="form-label">Qualification</label>
        <select
          id="qualification"
          name="qualification"
          className={`form-select ${errors.qualification ? "is-invalid" : ""}`}
          value={formData.qualification}
          onChange={handleChange}
          required
        >
          <option value="">Select Qualification</option>
          {educationCategories.map((category) => (
            <option key={category.id} value={category.id}>{category.education}</option>
          ))}
        </select>
        {errors.qualification && <div className="invalid-feedback">{errors.qualification}</div>}
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
     


      {/* Gender, Phone, Alerts, CNIC, Father's Status */}
      {/* Repeat similar structure as above for remaining fields */}
      {/* Submit Button */}
      <div className="d-grid">
        <button type="submit" className="btn btn-primary">Submit</button>
      </div>
    </form>
  );
};

export default PersonalForm;
