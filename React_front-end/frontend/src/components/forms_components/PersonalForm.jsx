import React, { useState, useEffect } from 'react'; 
import axios from 'axios';
import { refreshAccessToken } from '../refreshAccessToken';

const PersonalForm = () => {
  
 
  // Store the user ID in localStorage (optional) or in state

  const [formData, setFormData] = useState({
    user_id:'',
    user_email:'',
    full_name: '',
    Dateofbirth: '',
    father_name: '',
    domicile: '',
    qualific: '',
    gender: 'female',
    phone_number: '',
    get_alerts_by: 'whatsapp and phone both',
    send_education_based_jobs_alerts: '',
    My_Father_is: 'alive',
  });
  const [jobRegions, setJobRegions] = useState([]); 
  const [Message, setMessage] = useState([]); 
  const [educationCategories, setEducationCategories] = useState([]); 
  useEffect(() => {
    const fetchDataWithToken = async () => {
      try {
        let accessToken = localStorage.getItem("access");
        if (!accessToken) {
          console.error("No access token available. Please log in.");
          return;
        }

        const fetchJobRegions = async () => {
          const config = {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          };
          const response = await axios.get("http://127.0.0.1:8000/apicall/jobregions/", config);
          setJobRegions(response.data.results);
        };

        const fetchEducationCategories = async () => {
          const config = {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          };
          const response = await axios.get("http://127.0.0.1:8000/apicall/educationcategory/", config);
          setEducationCategories(response.data.results);
        };

        
        try {
          await fetchJobRegions();
          await fetchEducationCategories();
        } catch (error) {
          if (error.response && error.response.status === 401) {
            console.log("Access token expired. Refreshing token...");
            accessToken = await refreshAccessToken();
            if (accessToken) {
              await fetchJobRegions();
              await fetchEducationCategories();
            } else {
              console.error("Token refresh failed. Please log in again.");
            }
          } else {
            console.error("Error fetching data:", error);
          }
        }
      } catch (error) {
        console.error("Unexpected error:", error);
      }
    };

    fetchDataWithToken();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
  
    // Check if the field is domicile or qualific
    if (name === "domicile") {
      const selectedDomicile = jobRegions.find((region) => region.id.toString() === value);
      setFormData({
        ...formData,
        domicile: {
          id: selectedDomicile.id,
          name: selectedDomicile.regions,
        },
      });
    } else if (name === "qualific") {
      const selectedQualification = educationCategories.find((category) => category.id.toString() === value);
      setFormData({
        ...formData,
        qualific: {
          id: selectedQualification.id,
          name: selectedQualification.education,
        },
      });
    } else {
      // Handle other fields normally
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    const submissionData = {
      ...formData,
      domicile: formData.domicile.id, // Only send ID
      qualific: formData.qualific.id, // Only send ID
    };
    try {
      let token = await refreshAccessToken();
      if (!token) {
        token = await refreshAccessToken();
      }

      const response = await axios.put(
        'http://127.0.0.1:8000/apicall/personal/',
        submissionData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      alert('your data is saved ');
      localStorage.setItem('formData', JSON.stringify(formData));
    } catch (error) {
      setMessage('pleas fill all feilds ')
      console.error('There was an error submitting the form!', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="container mt-4">

      <div className="mb-3">
        <label className="form-label">Full Name</label>
        <input 
          type="text" 
          name="full_name" 
          className="form-control" 
          value={formData.full_name} 
          onChange={handleChange} 
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Date of Birth</label>
        <input 
          type="date" 
          name="Dateofbirth" 
          className="form-control" 
          value={formData.Dateofbirth} 
          onChange={handleChange} 
        />
      </div>

      <div className="mb-3">
        
        <label className="form-label">Domicile</label>
        <select name="domicile" className="form-select" value={formData.domicile.id || ""}  onChange={handleChange}>
          <option value="">Select Domicile</option>
          {jobRegions.map(region => (
            <option key={region.id} value={region.id}>{region.regions}</option>
          ))}
        </select>
      </div>

      <div className="mb-3">
        <label className="form-label">Qualification</label>
        <select 
          name="qualific" 
          className="form-select" 
          value={formData.qualific.id || ""} 
          onChange={handleChange}
        >
          <option value="">Select Qualification</option>
          {educationCategories.map(category => (
            <option key={category.id} value={category.id}>{category.education}</option>
          ))}
        </select>
      </div>

      <div className="mb-3">
        <label className="form-label">Gender</label>
        <select 
          name="gender" 
          className="form-select" 
          value={formData.gender} 
          onChange={handleChange}
        >
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      </div>

      <div className="mb-3">
        <label className="form-label">Phone Number</label>
        <input 
          type="text" 
          name="phone_number" 
          className="form-control" 
          value={formData.phone_number} 
          onChange={handleChange} 
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Get Alerts By</label>
        <select 
          name="get_alerts_by" 
          className="form-select" 
          value={formData.get_alerts_by} 
          onChange={handleChange}
        >
          <option value="phone">Phone</option>
          <option value="Whasapp messages">WhatsApp Messages</option>
          <option value="whatsapp and phone both">WhatsApp and Phone Both</option>
          <option value="No alerts">No Alerts</option>
        </select>
      </div>

      <div className="mb-3">
        <label className="form-label">Education Based Job Alerts</label>
        <select 
          name="send_education_based_jobs_alerts" 
          className="form-select" 
          value={formData.send_education_based_jobs_alerts} 
          onChange={handleChange}
        >
          <option value="">Select Qualification</option>
          {educationCategories.map(category => (
            <option key={category.id} value={category.id}>{category.education}</option>
          ))}
        </select>
      </div>

      <div className="mb-3">
        <label className="form-label">My Father Is</label>
        <select 
          name="My_Father_is" 
          className="form-select" 
          value={formData.My_Father_is} 
          onChange={handleChange}
        >
          <option value="alive">Alive</option>
          <option value="not alive">Not Alive</option>
        </select>
      </div>
<h3>{ Message}</h3>
      <button type="submit" className="btn btn-primary">Submit</button>
    </form>
  );
};

export default PersonalForm;
