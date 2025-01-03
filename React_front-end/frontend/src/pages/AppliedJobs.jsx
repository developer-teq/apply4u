import React, { useEffect, useState } from "react";
import axios from "axios";
import { refreshAccessToken } from "../components/refreshAccessToken";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Appliedjobs.css";
import CashoutForm from "../components/add_balance";
import BillingComponent from "../components/billing";
import BalanceRequests from "../components/BalanceRequests";
import JobStepsReplies from "../components/JobSteps";
import AskingQuestions from "../components/AskingQuestions";
import AppliedCertificates from "../components/AppliedCertificates";
import { Tabs, Tab } from "react-bootstrap";

const UserAppliedJobs = () => {
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [balanceData, setBalanceData] = useState([]);

  const addBalanceRequest = (newRequest) => {
    setBalanceData((prevData) => [newRequest, ...prevData]);
  };

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
    return (
      <div className="text-center mt-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return <div className="alert alert-danger text-center mt-5">{error}</div>;
  }

  return (
    <div className="container">
      <BillingComponent />
      <hr />
      <BalanceRequests balanceData={balanceData} />
      <CashoutForm addBalanceRequest={addBalanceRequest} />
      <div className="card shadow-lg d-flex w-100">
        <div className="card-header bg-primary text-white text-center">
          <h1>My Applied Jobs</h1>
        </div>
        <div className="card-bodyd-flex w-100">
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
                    <React.Fragment key={job.id}>
                      <tr>
                        <td>{job.id}</td>
                        <td>{job.job_title}</td>
                        <td>{new Date(job.timestamp).toLocaleDateString()}</td>
                        <td>
                          <span
                            className={`badge ${
                              job.status_display === "registeration done"
                                ? "bg-success"
                                : job.status_display === "registeration_started"
                                ? "bg-primary"
                                : job.status_display === "pending"
                                ? "bg-warning"
                                : "bg-danger"
                            }`}
                          >
                            {job.status_display}
                          </span>
                        </td>
                        <td>{job.comment || "No comments"}</td>
                      </tr>
                    
                      <tr>
                        <td colSpan="6" className="mt-1" style={{ border: '1px solid black', paddingTop: '10px' }}>
                          <Tabs defaultActiveKey="questions" id={`job-tabs-${job.id}`} className="mb-3">
                            <Tab eventKey="steps" title={<span style={{ color: 'black' }}>Job Steps Replies</span>}>
                              <JobStepsReplies jobId={job.id} />
                            </Tab>
                            <Tab eventKey="questions" title={<span style={{ color: 'black' }}>Ask Questions</span>}>
                              <AskingQuestions jobId={job.id} />
                            </Tab>
                            <Tab eventKey="certificates" title={<span style={{ color: 'black' }}>Slips</span>}>
                              <AppliedCertificates jobId={job.id} />
                            </Tab>
                          </Tabs>
                        </td>
                      </tr>
                    </React.Fragment>
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
