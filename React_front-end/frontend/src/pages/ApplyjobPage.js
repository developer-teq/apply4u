import { useLocation } from 'react-router-dom';
import { checkEligibility } from '../components/my_utilities';

function ApplyjobPage() {
  const location = useLocation();
  const { job, UserData, main_job } = location.state || {}; // Retrieve all passed state


  if (!job || !UserData) {
    return <div>No data available. Please navigate properly.</div>;
  }

  // const full_eligible = UserData ? checkEligibility(UserData, job) : false;
let full_eligible;
if (UserData) {
  full_eligible = checkEligibility(UserData, job);
} else {
  full_eligible = false;
}




  const isEligible = (jobValue, userValue, type) => {
    if (type === "qualification") {
      return jobValue.includes(userValue) ? "Eligible" : "Not Eligible";
    }
    if (type === "domicile") {
      return jobValue.includes(userValue) ? "Eligible" : "Not Eligible";
    }
    if (type === "gender") {
      return jobValue === userValue || jobValue === "Both" ? "Eligible" : "Not Eligible";
    }
    if (type === "age") {
      const userAge = new Date().getFullYear() - new Date(userValue).getFullYear();
      return userAge >= jobValue.min && userAge <= jobValue.max ? "Eligible" : "Not Eligible";
    }
    return "Not Applicable";
  };

// submitting on apply form 
const handleSubmit = (e) => {
  e.preventDefault();

  // You can submit the data via an API or to another page
  // For example, using fetch to send the data to an API endpoint
  const formData = new FormData();
  formData.append('main_job_title', main_job.title);
  formData.append('job_title', job.title);

  // on this api we send the job name, user etc to website 
  
  fetch('/apply', {
    method: 'POST',
    body: formData,
  })
    .then(response => response.json())
    .then(data => {
      console.log('Application submitted successfully:', data);
      // Redirect or show success message
    })
    .catch(error => {
      console.error('Error submitting the form:', error);
    });
};




  return (
    <div className="container">
      <h1>Apply for {job.title} in {main_job.title}</h1>

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
                <td>{job.qualification_required.join(', ')}</td>
                <td>{UserData.qualification}</td>
                <td>{isEligible(job.qualification_required, UserData.qualification, "qualification")}</td>
              </tr>
              <tr>
                <td>Domicile</td>
                <td>{job.post_regions.join(', ')}</td>
                <td>{UserData.domicile}</td>
                <td>{isEligible(job.post_regions, UserData.domicile, "domicile")}</td>
              </tr>
              <tr>
                <td>Gender</td>
                <td>{job.jobs_for}</td>
                <td>{UserData.gender}</td>
                <td>{isEligible(job.jobs_for, UserData.gender, "gender")}</td>
              </tr>
              <tr>
                <td>Age</td>
                <td>{job.min_age} - {job.max_age}</td>
                <td>{new Date().getFullYear() - new Date(UserData.date_of_birth).getFullYear()}</td>
                <td>{isEligible({ min: job.min_age, max: job.max_age }, UserData.date_of_birth, "age")}</td>
              </tr>
            </tbody>
          </table>
         
         


           <form onSubmit={handleSubmit}>
                {/* Hidden fields for main_job.title and job.title */}
                <input type="hidden" name="main_job_title" value={main_job.title} />
                <input type="hidden" name="job_title" value={job.title} />

                <button type="submit" className="btn btn-primary"  disabled={!full_eligible}
                  >
                    {full_eligible ? 'Apply Now' : 'Not Eligible'}
                   </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ApplyjobPage;
