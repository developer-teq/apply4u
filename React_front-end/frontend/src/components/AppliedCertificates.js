import React, { useState, useEffect } from "react";
import axios from "axios";
import { refreshAccessToken } from "./refreshAccessToken";

const AppliedCertificates = ({ jobId }) => {
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const fetchCertificates = async () => {
      try {
        let token = await refreshAccessToken();
        if (!token) {
          token = await refreshAccessToken();
        }
        const response = await axios.get(
          `http://127.0.0.1:8000/apicall/applied-certificates/${jobId}/`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setCertificates(response.data.job_certificates || []);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch certificates");
        setLoading(false);
      }
    };

    fetchCertificates();
  }, [jobId]);

  if (loading)
    return (
      <div className="d-flex justify-content-center align-items-center my-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  if (error)
    return (
      <div className="alert alert-danger text-center my-3" role="alert">
        {error}
      </div>
    );

  return (
    <div className="container my-4">
      <h3 className="text-center mb-4">Job Certificates</h3>
      {certificates.length === 0 ? (
        <div className="alert alert-warning text-center" role="alert">
          No certificates available for this job.
        </div>
      ) : (
        <div className="row">
          {certificates.map((certificate) => (
            <div className="col-md-6 col-lg-4 mb-4" key={certificate.id}>
              <div className="card shadow-sm h-100">
                <div className="card-body">
                  <h5 className="card-title text-primary">
                     {certificate.purpose}
                  </h5>
                  <p className="card-text">
                    <strong>{certificate.description}</strong> 
                  </p>
                  {certificate.depositslip && (
                    <div className="text-center">
                      <img
                        src={`http://127.0.0.1:8000${certificate.depositslip}`}
                        alt="Deposit Slip"
                        className="img-fluid rounded"
                        style={{
                          maxHeight: "150px",
                          cursor: "pointer",
                          marginBottom: "10px",
                        }}
                        onClick={() =>
                          setSelectedImage(
                            `http://127.0.0.1:8000${certificate.depositslip}`
                          )
                        }
                        onDoubleClick={() =>
                          window.open(
                            `http://127.0.0.1:8000${certificate.depositslip}`,
                            "_blank"
                          )
                        }
                      />
                    </div>
                  )}
                  <p className="card-text">
                    <small className="text-muted">
                      Uploaded On:{" "}
                      {new Date(certificate.timestamp).toLocaleString()}
                    </small>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal for Image Zoom */}
      {selectedImage && (
        <div
          className="modal fade show"
          style={{ display: "block", backgroundColor: "rgba(0,0,0,0.8)" }}
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="modal-dialog modal-dialog-centered"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-content">
              <div className="modal-body p-0">
                <img
                  src={selectedImage}
                  alt="Full View"
                  className="img-fluid"
                  style={{ cursor: "pointer" }}
                  onClick={() => setSelectedImage(null)}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AppliedCertificates;
