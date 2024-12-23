import { useParams } from 'react-router-dom';
import { useLocation, Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { checkEligibility } from '../components/my_utilities';
import { Button } from "react-bootstrap";
import axios from "axios";

function JobDetailsPage() {
  const [showFullImage, setShowFullImage] = useState(false);

  const { jobslug } = useParams(); // Get jobslug from URL (if needed)
  const [JobDetails, setJobDetails] = useState([]); // Store the list of jobs
  const [loading, setLoading] = useState(true); // Loading state
 const location = useLocation();
  const { main_job } = location.state || {}; // Get job data passed from previous page
  const [error, setError] = useState("");

 


// '{"full_name":"newform","Dateofbirth":"2002-09-09","father_name":"","domicile":"3","qualific":"58","gender":"male","phone_number":"23232",
// "get_alerts_by":"whatsapp and phone both","send_education_based_jobs_alerts":"1","My_Father_is":"alive"}'
const [UserData, setUserData] = useState({
  user: "sajid",
  user_id: 1, 
  date_of_birth: "1997-01-01",
  qualification: { id: 64, name: "MBA Finance" }, 
  domicile: { id: 2, name: "Punjab" },          
  gender:"male" ,              
});

  // Handle no job details
  if (!main_job || main_job.length === 0) {
    return <div>No job details available.</div>;
  }

  return (
    <div className="container">
     
      <div className="row detail-job-row">
        <h5 className="card-title">{main_job?.jobtitle || 'Job Details'}</h5>
        <p className="card-text">{main_job?.posts || 'Job description is not available.'}</p>
        {main_job.adpic && (
        <>
          
          <Button
            variant="primary"
            className="mt-2"
            onClick={() => setShowFullImage(!showFullImage)}
          >
            {showFullImage ? "Hide Full Ad" : "View Full Ad"}
          </Button>
          {showFullImage && (
            <div className="mt-3">
              <img
                src={main_job.adpic}
                alt="Full Job Ad"
                className="img-fluid"
              />
            </div>
          )}
        </>
      )}
        <hr />
        <hr />
        {main_job.details.map((job, index) => {
          const lastDate = new Date(main_job.lastdate);
          const isDatePassed = lastDate < new Date();
         
          const full_eligible = checkEligibility(job);
         
          return (<>


            <div className="col-md-4 job-box" key={index}>{job.cropedad && (

              <img className="img-fluid" src={job.cropedad} alt="Job Ad" />
            )}

              <div className="card mb-4">
                <div className="card-body">
                  <h5 className="card-title">{job.title}</h5>
                  <div className="bold-text">
                   Qualifications:
                    {job.qualification_req.map((qual, index) => (
                      <Button
                        key={index}
                        variant="outline-primary"
                        className="m-1 p-1"
                        style={{ fontSize: '0.6rem' }}

                      >
                        {qual.education} 
                      </Button>
                    ))}
                  </div>
                  {/* <p className="card-text"> Qualifications required ids: {job.qualification_req.map(qual => qual.id).join(', ')}</p> */}
                  {/* <p className="card-text"> who can apply: {job.whocanapply.map(qual => qual.education).join(', ')}</p> */}
                  {/* <p className="card-text"> who can apply_id: {job.whocanapply.map(qual => qual.id).join(', ')}</p> */}
                  <div className=" bold-text  flex-wrap">
                    Regions:
                    {job.post_regions.map((region, index) => (
                      <Button
                        key={index}
                        variant="outline-secondary"
                        className="m-1 p-1"
                        style={{ fontSize: '0.6rem' }}
                      >
                        {region.regions}
                      </Button>
                    ))}
                  </div> 
                
                  <p className=""><span className='bold-text'>Gender: </span>{job.jobs_for}</p>
                  <p className=""><span className='bold-text'>Max-age:</span> {job.max_age}</p>  
                  
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


                  
                  <p className="card-text">
                    {full_eligible ? (
                      <span className="text-success">You are eligible for this job.</span>
                    ) : (
                      <span className="UserData" UserDataName="text-danger">You are not eligible for this job.</span>
                    )}
                  </p>

                  <Link className='btn btn-secondary' to={`/apply/`} state={{ job,  main_job }} disabled={!full_eligible}
                  >
                    {full_eligible ? 'Apply Now' : 'Not Eligible'}
                  </Link>
                   {isDatePassed && (<p style={{ color: "red", marginTop: "10px" }}>Date has passed</p>
              )}
                  
                </div>
              </div>
            </div>
            </>
          );
        })}
      </div>
    </div>
  );
}

export default JobDetailsPage;
