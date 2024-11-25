import React, { useState, useEffect } from "react";

function UserProfileForm() {
  const [formData, setFormData] = useState({
    full_name: "",
    Dateofbirth: "",
    father_name: "",
    address: "",
    domicile: "",
    qualific: "",
    gender: "female",
    phone_number: "",
    get_alerts_by: "whatsapp and phone both",
    send_education_based_jobs_alerts: "",
    cnic_number: "",
    father_cnic: "",
    My_Father_is: "alive",
  });

  const [jobRegions, setJobRegions] = useState([]);
  const [educationCategories, setEducationCategories] = useState([]);

  // Fetch job regions and education categories from the backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const regionResponse = await fetch("/api/jobregions/");
        const regions = await regionResponse.json();
        setJobRegions(regions);

        const educationResponse = await fetch("/api/educationcategories/");
        const categories = await educationResponse.json();
        setEducationCategories(categories);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/user-profile/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Profile submitted successfully!");
      } else {
        alert("Error submitting profile!");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An unexpected error occurred.");
    }
  };

  return (
    <div>
    <form onSubmit={handleSubmit}>
      <div>
        <label>Full Name</label>
        <input
          type="text"
          name="full_name"
          value={formData.full_name}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Date of Birth</label>
        <input
          type="date"
          name="Dateofbirth"
          value={formData.Dateofbirth}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Father Name</label>
        <input
          type="text"
          name="father_name"
          value={formData.father_name}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Address</label>
        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Domicile</label>
        <select name="domicile" value={formData.domicile} onChange={handleChange}>
          <option value="">Select Domicile</option>
          {jobRegions.map((region) => (
            <option key={region.id} value={region.id}>
              {region.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>Qualification</label>
        <select name="qualific" value={formData.qualific} onChange={handleChange}>
          <option value="">Select Qualification</option>
          {educationCategories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.education}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>Gender</label>
        <select name="gender" value={formData.gender} onChange={handleChange}>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      </div>
      <div>
        <label>Phone Number</label>
        <input
          type="tel"
          name="phone_number"
          value={formData.phone_number}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Get Alerts By</label>
        <select
          name="get_alerts_by"
          value={formData.get_alerts_by}
          onChange={handleChange}
        >
          <option value="phone">Phone</option>
          <option value="Whasapp messages">WhatsApp Messages</option>
          <option value="whatsapp and phone both">WhatsApp and Phone Both</option>
          <option value="No alerts">No Alerts</option>
        </select>
      </div>
      <div>
        <label>Send Education-Based Jobs Alerts</label>
        <select
          name="send_education_based_jobs_alerts"
          value={formData.send_education_based_jobs_alerts}
          onChange={handleChange}
        >
          <option value="">Select Alert Category</option>
          {educationCategories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.education}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>CNIC Number</label>
        <input
          type="text"
          name="cnic_number"
          value={formData.cnic_number}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Father CNIC</label>
        <input
          type="text"
          name="father_cnic"
          value={formData.father_cnic}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>My Father is</label>
        <select name="My_Father_is" value={formData.My_Father_is} onChange={handleChange}>
          <option value="alive">Alive</option>
          <option value="not alive">Not Alive</option>
        </select>
      </div>
      <button type="submit">Submit</button>
    </form>
    </div>
  );
}

export default UserProfileForm;
