import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { checkEligibility } from "../components/my_utilities";
import { Button } from "react-bootstrap";
import { jwtDecode } from 'jwt-decode'; // Use the named import
function ApplyJobPage() {
  const location = useLocation();
  const { job,  main_job } = location.state || {}; // Retrieve state
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const access = localStorage.getItem("access"); // Assume the token is already stored in localStorage
  const decoded = jwtDecode(access);
  const userId = decoded.user_id; 
  // Check overall eligibility
  const lastDate = new Date(main_job.lastdate);
  const isDatePassed = lastDate < new Date();
  const full_eligible = checkEligibility(job);

  const userstoreddata = localStorage.getItem('formData');
  if (!userstoreddata) {
    console.error("No user data found in sessionStorage.");
    return false;
  }
  const parsedUserData = JSON.parse(userstoreddata);
  function checkeligible(array, value) {
   
    // Check if the value exists in the array
    return array.includes(Number(value)) ? (
      <span style={{ color: "green", fontSize: "1.2em" }}>✔️</span>
    ) : (
      <span style={{ color: "red", fontSize: "1.2em" }}>❌</span>
    );

    
}

  const isEligible = (jobValue, parsedUserData, type) => {
    switch (type) {
      case "qualification":
      case "domicile":
        return jobValue.includes(parsedUserData) ?(
    <span style={{ color: "green", fontSize: "1.2em" }}>✔️</span>
  ) : (
    <span style={{ color: "red", fontSize: "1.2em" }}>❌</span>
  );
      case "gender":
        return jobValue === parsedUserData || jobValue === "Both" ?(
    <span style={{ color: "green", fontSize: "1.2em" }}>✔️</span>
  ) : (
    <span style={{ color: "red", fontSize: "1.2em" }}>❌</span>
  );
      case "age":
        const userAge = new Date().getFullYear() - new Date(parsedUserData).getFullYear();
        return userAge >= jobValue.min && userAge <= jobValue.max ?(
    <span style={{ color: "green", fontSize: "1.2em" }}>✔️</span>
  ) : (
    <span style={{ color: "red", fontSize: "1.2em" }}>❌</span>
  );
      default:
        return "Not Applicable";
    }
  };
console.log(message)
  // Form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null); // Clear previous messages

    const formData = {
      job_id: job.id,
      user_id:userId
    };
console.log(formData)
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/apicall/apply-to-job/",
        formData,
        { headers: { "Content-Type": "application/json" } }
      );
      setMessage({ type: "success", text: 'Applied on jobs' });
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "An unexpected error occurred. Please try again.";
      setMessage({ type: "error", text: errorMessage });
    } finally {
      setLoading(false);
    }
  };

  if (!job) {
    return <div>No data available. Please navigate properly.</div>;
  }

  return (
    <div className="container">
     
     
      <h1>
        <strong>{job.post_name}</strong> {main_job?.jobtitle}
      </h1>

      <div className="card mb-4">
        <div className="card-body">
          <h5 className="card-title">{job.title}</h5>
          <table className="table">
            <thead>
              <tr>
                <th>Requirement</th>
                <th>Job Data</th>
                <th>Your Data</th>
                <th>Eligibility</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Qualification</td>
                <td>{job.qualification_req.map((qual, index) => (
                      <Button
                        key={index}
                        variant="outline-primary"
                        className="m-1 p-1"
                        style={{ fontSize: '0.6rem' }}

                      >
                        {qual.education}
                      </Button>
                    ))}</td>
                <td>{parsedUserData.qualific.name}</td>
               <td>{checkeligible(job.whocanapply.map((q) => q.id), parsedUserData.qualific.id)}</td>

              </tr>
              <tr>
                <td>Domicile</td>
                <td>{job.post_regions.map((region, index) => (
                      <Button
                        key={index}
                        variant="outline-secondary"
                        className="m-1 p-1"
                        style={{ fontSize: '0.6rem' }}
                      >
                        {region.regions}
                      </Button>
                    ))}</td>
                <td>{parsedUserData.domicile.name} </td>
                <td>{isEligible(job.post_regions.map((r) => r.id), parsedUserData.domicile.id, "domicile")}</td>
              </tr>
              <tr>
                <td>Gender</td>
                <td>{job.jobs_for}</td>
                <td>{parsedUserData.gender}</td>
                <td>{isEligible(job.jobs_for, parsedUserData.gender, "gender")}</td>
              </tr>
              <tr>
                <td>Age</td>
                <td>
                 {job.min_age && <span>Min Age: {job.min_age}</span>}
  {job.max_age && <span> Max Age: {job.max_age}</span>}
                </td>
                <td>{new Date().getFullYear() - new Date(parsedUserData.Dateofbirth).getFullYear()}</td>
                <td>{isEligible({ min: job.min_age, max: job.max_age }, parsedUserData.Dateofbirth, "age")}</td>
              </tr>
            </tbody>
          </table>

          <hr />

          <table className="table table-bordered table-striped">
            <thead className="table-dark">
              <tr>
                <th>#</th>
                <th>Service</th>
                <th>Cost</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>Bank Fee</td>
                <td>${job.bankfee}</td>
              </tr>
              <tr>
                <td>2</td>
                <td>Photocopies</td>
                <td>${job.photocopies}</td>
              </tr>
              <tr>
                <td>3</td>
                <td>Posting Fee</td>
                <td>${job.posting_fee}</td>
              </tr>
              <tr>
                <td>4</td>
                <td>Service Fee</td>
                <td>${job.service_fee}</td>
              </tr>
              <tr className="fw-bold">
                <td colSpan="2" className="text-end">
                  Total
                </td>
                <td>${job.total_cost}</td>
              </tr>
            </tbody>
          </table>

          <form onSubmit={handleSubmit}>
          
            {/* <button type="submit" className="btn btn-primary" disabled={!full_eligible || loading || isDatePassed}> */}
            <button
        type="submit"
        className={`btn btn-primary ${loading ? "btn-loading" : ""}`}
        disabled={!full_eligible || loading || isDatePassed} >
        {loading
          ? "Submitting..."
          : message
          ? `${message.text}` 
          : "Apply Now"}
      </button>
                    {isDatePassed && (
                      <p style={{ color: "red", marginTop: "10px" }}>
                        Date has passed
                      </p>
                    )}
                     {message && (
        <div className={`alert ${message.type === "success" ? "alert-success" : "alert-danger"}`}>
          {message.text}
        </div>
      )}
          </form>
        </div>
      </div>
    </div>
  );
}

export default ApplyJobPage;
