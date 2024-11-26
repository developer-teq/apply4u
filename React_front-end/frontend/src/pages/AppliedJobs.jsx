import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";

const AppliedJobDetail = () => {
  const { slug } = useParams(); // Fetch slug from the URL
  const [jobDetail, setJobDetail] = useState(null); // Store job data
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  // Fetch job details on component mount
  useEffect(() => {
    const fetchJobDetail = async () => {
      try {
        const response = await axios.get(`/api/applied-jobs/${slug}/`); // Adjust the endpoint
        setJobDetail(response.data);
      } catch (err) {
        setError("Failed to fetch job details. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchJobDetail();
  }, [slug]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="container mt-5">
      <h1>Job Application Detail</h1>

      {jobDetail && (
        <div className="card p-4">
          <h2>Job Title: {jobDetail.appliedtojob?.title || "N/A"}</h2>
          <p><strong>Applied On:</strong> {new Date(jobDetail.timestamp).toLocaleDateString()}</p>
          <p><strong>Status:</strong> {jobDetail.status_display || "N/A"}</p>
          <p><strong>Comments:</strong> {jobDetail.comment || "No Comments"}</p>
          <p><strong>Referral Payment:</strong> {jobDetail.ref_payment_display || "N/A"}</p>
          <p><strong>All Done:</strong> {jobDetail.alldone ? "Completed" : "Pending"}</p>

          <Link to="/applied-jobs" className="btn btn-primary mt-3">
            Back to Applied Jobs
          </Link>
        </div>
      )}
    </div>
  );
};

export default AppliedJobDetail;
