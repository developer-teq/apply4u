
import React, { useState, useEffect } from 'react'; 
import axios from 'axios';
import { refreshAccessToken } from '../refreshAccessToken';

const PersonalForm = () => {
  const [formData, setFormData] = useState({
    full_name: '',
    Dateofbirth: '',
    father_name: '',
    address: '',
    domicile: '',
    qualific: '',
    gender: 'female',
    phone_number: '',
    get_alerts_by: 'whatsapp and phone both',
    send_education_based_jobs_alerts: '',
    cnic_number: '',
    father_cnic: '',
    My_Father_is: 'alive',
  });
  const token = localStorage.getItem("access");
  const [jobRegions, setJobRegions] = useState([]); 
  const [educationCategories, setEducationCategories] = useState([]); 
  useEffect(() => {
    const fetchDataWithToken = async () => {
        try {
            let accessToken = localStorage.getItem("access");
            if (!accessToken) {
                console.error("No access token available. Please log in.");
                return;
            }

            // Function to fetch data with token
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
                // Fetch job regions and education categories
                await fetchJobRegions();
                await fetchEducationCategories();
            } catch (error) {
                if (error.response && error.response.status === 401) {
                    console.log("Access token expired. Refreshing token...");
                    accessToken = await refreshAccessToken();
                    if (accessToken) {
                        // Retry fetching data with the refreshed token
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
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    
  };
  console.log(formData)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // const csrfToken = document.cookie.split('; ').find(row => row.startsWith('csrftoken')).split('=')[1];
  
        let token = await refreshAccessToken();
        // alert(token)// Retrieve the access token
        console.log(token)
        if (!token) {
          token = await refreshAccessToken();
          console.log('token refreshed ')
          // Refresh the token
          
        }
        
        const response = await axios.post(
            'http://127.0.0.1:8000/apicall/personal/', 
            formData, 
            {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    // 'X-CSRFToken': csrfToken 
                },
                 // Not necessary for JWT, but good practice if cookies are involved
            }
        );
        console.log(response.data);
    } catch (error) {
        console.error('There was an error submitting the form!', error);
    }
};


  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Full Name:  {token}</label>
        <input type="text" name="full_name" value={formData.full_name} onChange={handleChange} />
      </div>
  
     
      
      <div> <label>Domicile:</label> <select name="domicile" value={formData.domicile} onChange={handleChange}> 
        <option value="">Select Domicile</option> {jobRegions.map(region => ( <option key={region.id} value={region.id}>{region.regions}</option> ))} </select> </div> 
      <div> 
        <label>Qualification:</label> <select name="qualific" value={formData.qualific} onChange={handleChange}>
           <option value="">Select Qualification</option> {educationCategories.map(category => ( <option key={category.id} value={category.id}>{category.education}</option> ))} </select> </div>
      <div>
        <label>Gender:</label>
        <select name="gender" value={formData.gender} onChange={handleChange}>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      </div>
      <div>
        <label>Phone Number:</label>
        <input type="text" name="phone_number" value={formData.phone_number} onChange={handleChange} />
      </div>
      <div>
        <label>Get Alerts By:</label>
        <select name="get_alerts_by" value={formData.get_alerts_by} onChange={handleChange}>
          <option value="phone">Phone</option>
          <option value="Whasapp messages">WhatsApp Messages</option>
          <option value="whatsapp and phone both">WhatsApp and Phone Both</option>
          <option value="No alerts">No Alerts</option>
        </select>
      </div>
      <div>
        <label>Education Based Job Alerts:</label>
        <input type="text" name="send_education_based_jobs_alerts" value={formData.send_education_based_jobs_alerts} onChange={handleChange} />
      </div>
    
     
      <div>
        <label>My Father Is:</label>
        <select name="My_Father_is" value={formData.My_Father_is} onChange={handleChange}>
          <option value="alive">Alive</option>
          <option value="not alive">Not Alive</option>
        </select>
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default PersonalForm;
