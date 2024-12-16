import React, { useEffect, useState } from "react";
import axios from "axios";
import { refreshAccessToken } from "../components/refreshAccessToken";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Appliedjobs.css"; // Assuming you add custom CSS in this file
import CashoutForm from "../components/add_balance";
import BillingComponent from "../components/billing";
import BalanceRequests from "../components/BalanceRequests";
import JobStepsReplies from "../components/JobSteps";
import AskingQuestions from "../components/AskingQuestions";
import SubmitReply from "../components/UserReply";
const UserAppliedJobs = () => {
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  useEffect(() => {
    const fetchAppliedJobs = async () => {
      try {
        let token = await refreshAccessToken();
        if (!token) {
          token = await refreshAccessToken();
        }

        const response = await axios.get("http://127.0.0.1:8000/apicall/applied_jobs", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setAppliedJobs(response.data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch applied jobs.");
      } finally {
        setLoading(false);
      }
    };

    fetchAppliedJobs();
  }, []);

  if (loading) {
    return <div className="text-center mt-5"><div className="spinner-border text-primary" role="status"><span className="visually-hidden">Loading...</span></div></div>;
  }

  if (error) {
    return <div className="alert alert-danger text-center mt-5">{error}</div>;
  }

  return (
    <div className="container my-5">
       <BalanceRequests />
       <BillingComponent />
       <CashoutForm />
      <div className="card shadow-lg">
        <div className="card-header bg-primary text-white text-center">
          <h1>My Applied Jobs</h1>
        </div>
        <div className="card-body">
          {appliedJobs.length > 0 ? (
            <div className="table-responsive">
              <table className="table table-striped table-hover">
                <thead className="table-primary">
                  <tr>
                    <th>Job Id</th>
                    <th>Job Title</th>
                    <th>Applied On</th>
                    <th>Status</th>
                    <th>Comment</th>
                  </tr>
                </thead>
                <tbody>
                  {appliedJobs.map((job) => (
                    <>
                    <tr key={job.id}>
                      <td>{job.id}</td>
                      <td>{job.job_title}</td>
                      <td>{new Date(job.timestamp).toLocaleDateString()}</td>
                      <td><span className={`badge ${job.status === 'Accepted' ? 'bg-success' : 'bg-warning'}`}>{job.status}</span></td>
                      <td>{job.comment || "No comments"}</td>
                    </tr>
                    <tr>
                    <JobStepsReplies jobId={job.id}/>
                    <AskingQuestions jobId={job.id} />
                  
                    <SubmitReply jobId={job.id} />

                    </tr>
                   
                     
                    
                     
                    </>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-center text-muted">You have not applied to any jobs yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserAppliedJobs;
