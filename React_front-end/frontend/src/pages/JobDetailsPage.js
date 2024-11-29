import { useParams } from 'react-router-dom';
import { useLocation, Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { checkEligibility } from '../components/my_utilities';
import axios from "axios";

function JobDetailsPage() {
  const { jobslug } = useParams(); // Get jobslug from URL (if needed)
  const [JobDetails, setJobDetails] = useState([]); // Store the list of jobs
  const [loading, setLoading] = useState(true); // Loading state
  const [UserData, setUserData] = useState(null); // User data for eligibility check
  const location = useLocation();
  const { main_job } = location.state || {}; // Get job data passed from previous page
  const [error, setError] = useState("");

  

console.log(main_job)

  

  // Handle no job details
  if (!main_job || main_job.length === 0) {
    return <div>No job details available.</div>;
  }

  return (
    <div className="container">
     
      <div className="row">
        <h5 className="card-title">{main_job?.jobtitle || 'Job Details'}</h5>
        <p className="card-text">{main_job?.posts || 'Job description is not available.'}</p>
        {main_job.adpic && (
              <img className="img-fluid" src={main_job.adpic} alt="Job Ad" />
            )}
        <hr />
        {main_job.details.map((job, index) => {
          const full_eligible = UserData ? checkEligibility(UserData, job) : false;


          return (<>
           
            
            <div className="col-md-4" key={index}>{job.cropedad && (
              <img className="img-fluid" src={job.cropedad} alt="Job Ad" />
            )}
              <div className="card mb-4">
                <div className="card-body">
                  <h5 className="card-title">{job.title}</h5>
                  <p className="card-text"> Qualifications required: {job.qualification_req.map(qual => qual.education).join(', ')}</p>
                  {/* <p className="card-text"> who can apply: {job.whocanapply.map(qual => qual.education).join(', ')}</p> */}
                  {/* <p className="card-text"> Regions: {job.post_regions.map(region => region.regions).join(', ')} </p>*/}
                  <div className="container mt-5">
   <table className="table table-bordered table-striped">
        <thead className="table-dark">
          <tr>
            <th>#</th>
            <th>Service</th>
            <th>Cost</th>
          </tr>
        </thead>
        <tbody>
            <tr key={job.id}>
              <td>1</td>
              <td>bank fee</td>
              <td>${job.bankfee}</td>
            </tr>
            <tr key={job.id}>
              <td>2</td>
              <td>photocopies</td>
              <td>${job.photocopies}</td>
            </tr>
            <tr key={job.id}>
              <td>4</td>
              <td>posting_fee</td>
              <td>${job.posting_fee}</td>
            </tr>
            <tr key={job.id}>
              <td>3</td>
              <td>service_fee</td>
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
      
    </div>


                  <p className="card-text">Gender: {job.jobs_for}</p>
                  <p className="card-text">Age Range: {job.min_age}   :{job.max_age}</p>
                  <p className="card-text">
                    {full_eligible ? (
                      <span className="text-success">You are eligible for this job.</span>
                    ) : (
                      <span className="UserData" UserDataName="text-danger">You are not eligible for this job.</span>
                    )}
                  </p>

                  <Link className='btn btn-secondary' to={`/apply/`} state={{ job, UserData, main_job }} disabled={!full_eligible}
                  >
                    {full_eligible ? 'Apply Now' : 'Not Eligible'}
                  </Link>
                  
                </div>
              </div>
            </div></>
          );
        })}
      </div>
    </div>
  );
}

export default JobDetailsPage;
