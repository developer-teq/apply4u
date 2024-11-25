import { useParams } from 'react-router-dom';
import { useLocation, Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

function JobDetailsPage() {
  const { jobslug } = useParams(); // Get jobslug from URL (if needed)
  const [jobDetails, setJobDetails] = useState([]); // Store the list of jobs
  const [loading, setLoading] = useState(true); // Loading state
  const [UserData, setUserData] = useState(null); // User data for eligibility check
  const location = useLocation();
  const { main_job } = location.state || {}; // Get job data passed from previous page
 
  // Fetch job details when the component loads
  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        // Mock job response
        const jobResponse = [
          {
            "id": 1,
            "title": "clirk job",
            "qualification_required": ["Bachelors", "Masters"],
            "whocanapply": ["Bachelors"],
            "post_regions": ["Punjab", "Sindh"],
            "jobs_for": "Both",
            "min_age": 25,
            "max_age": 35
          },
          {
            "id": 2,
            "title": "Assistant",
            "qualification_required": ["Masters", "PhD"],
            "whocanapply": ["Masters"],
            "post_regions": ["Punjab", "KPK"],
            "jobs_for": "female",
            "min_age": 30,
            "max_age": 45
          },
          {
            "id": 3,
            "title": "computer operator",
            "qualification_required": ["Bachelors"],
            "whocanapply": ["Bachelors"],
            "post_regions": ["Sindh", "Balochistan"],
            "jobs_for": "Both",
            "min_age": 22,
            "max_age": 30
          }
        ];

        setJobDetails(jobResponse);

        // Mock user data (can be fetched from an API or state)
        const userResponse = {
          qualification: "Bachelors",
          date_of_birth: "1992-06-10", // Use a valid date string
          gender: "male",
          domicile: "Punjab"
        };
        setUserData(userResponse);
      } catch (error) {
        console.error('Error fetching job details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobDetails();
  }, [jobslug]);

  const calculateAge = (dob) => {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  // Function to check eligibility
  const checkEligibility = (user, job) => {
    const userAge = calculateAge(user.date_of_birth);
    return (
      job.qualification_required.includes(user.qualification) &&
      job.whocanapply.includes(user.qualification) &&
      job.post_regions.includes(user.domicile) &&
      (job.jobs_for === user.gender || job.jobs_for === "Both") &&
      userAge >= job.min_age &&
      userAge <= job.max_age
    );
  };

  // Handle loading state
  if (loading) {
    return <div>Loading job details...</div>;
  }

  // Handle no job details
  if (!jobDetails || jobDetails.length === 0) {
    return <div>No job details available.</div>;
  }

  return (
    <div className="container">
      <div className="row">
        <h5 className="card-title">{main_job?.title || 'Job Details'}</h5>
        <p className="card-text">{main_job?.description || 'Job description is not available.'}</p>
        <hr />
        {jobDetails.map((job) => {
          const isEligible = UserData ? checkEligibility(UserData, job) : false;

          return (
            <div className="col-md-4" key={job.id}>
              <div className="card mb-4">
                <div className="card-body">
                  <h5 className="card-title">{job.title}</h5>
                  <p className="card-text">Qualifications: {job.qualification_required.join(', ')}</p>
                  <p className="card-text">Domicile: {job.post_regions.join(', ')}</p>
                  <p className="card-text">Gender: {job.jobs_for}</p>
                  <p className="card-text">Age Range: {job.min_age} - {job.max_age}</p>
                  <p className="card-text">
                    {isEligible ? (
                      <span className="text-success">You are eligible for this job.</span>
                    ) : (
                      <span classNUserData
UserDataName="text-danger">You are not eligible for this job.</span>
                    )}
                  </p>

                  <Link className='btn btn-secondary' to={`/apply/`} state={{ job, UserData, main_job }} disabled={!isEligible}
                  >
                    {isEligible ? 'Apply Now' : 'Not Eligible'}
                  </Link>
                  
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default JobDetailsPage;
