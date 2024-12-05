import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { checkEligibility } from "../components/my_utilities";

function ApplyJobPage() {
  const location = useLocation();
  const { job, UserData, main_job } = location.state || {}; // Retrieve state
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  console.log(job)

  // Check overall eligibility
  const lastDate = new Date(main_job.lastdate);
  const isDatePassed = lastDate < new Date();
  const fullEligible = UserData ? checkEligibility(UserData, job) : false;

  const isEligible = (jobValue, userValue, type) => {
    switch (type) {
      case "qualification":
      case "domicile":
        return jobValue.includes(userValue) ? "Eligible" : "Not Eligible";
      case "gender":
        return jobValue === userValue || jobValue === "Both" ? "Eligible" : "Not Eligible";
      case "age":
        const userAge = new Date().getFullYear() - new Date(userValue).getFullYear();
        return userAge >= jobValue.min && userAge <= jobValue.max ? "Eligible" : "Not Eligible";
      default:
        return "Not Applicable";
    }
  };

  // Form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null); // Clear previous messages

    const formData = {
      user_id: UserData.user_id,
      job_id: job.id,
    };

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/apicall/apply-to-job/",
        formData,
        { headers: { "Content-Type": "application/json" } }
      );
      setMessage({ type: "success", text: response.data.message });
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "An unexpected error occurred. Please try again.";
      setMessage({ type: "error", text: errorMessage });
    } finally {
      setLoading(false);
    }
  };

  if (!job || !UserData) {
    return <div>No data available. Please navigate properly.</div>;
  }

  return (
    <div className="container">
      {message && (
        <div className={`alert ${message.type === "success" ? "alert-success" : "alert-danger"}`}>
          {message.text}
        </div>
      )}
      

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
                <th>User Data</th>
                <th>Eligibility</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Qualification</td>
                <td>{job.qualification_req.map((q) => q.education).join(", ")}</td>
                <td>{UserData.qualification}</td>
                <td>{isEligible(job.whocanapply.map((q) => q.education), UserData.qualification, "qualification")}</td>
              </tr>
              <tr>
                <td>Domicile</td>
                <td>{job.post_regions.map((r) => r.regions).join(", ")}</td>
                <td>{UserData.domicile}</td>
                <td>{isEligible(job.post_regions.map((r) => r.regions), UserData.domicile, "domicile")}</td>
              </tr>
              <tr>
                <td>Gender</td>
                <td>{job.jobs_for}</td>
                <td>{UserData.gender}</td>
                <td>{isEligible(job.jobs_for, UserData.gender, "gender")}</td>
              </tr>
              <tr>
                <td>Age</td>
                <td>
                  {job.min_age} --- {job.max_age}
                </td>
                <td>{new Date().getFullYear() - new Date(UserData.date_of_birth).getFullYear()}</td>
                <td>{isEligible({ min: job.min_age, max: job.max_age }, UserData.date_of_birth, "age")}</td>
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
            <input type="" name="user_id" value={UserData.user_id} />
            <input type="" name="job_id" value={job.id} />

            <button type="submit" className="btn btn-primary" disabled={!fullEligible || loading || isDatePassed}>
                      {loading ? "Applying..." : fullEligible ? "Apply Now" : "Not Eligible"}
                    </button>
                    {isDatePassed && (
                      <p style={{ color: "red", marginTop: "10px" }}>
                        Date has passed
                      </p>
                    )}
          </form>
        </div>
      </div>
    </div>
  );
}

export default ApplyJobPage;
