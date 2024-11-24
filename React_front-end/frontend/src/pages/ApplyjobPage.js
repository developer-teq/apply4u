import { useLocation } from 'react-router-dom';

function ApplyjobPage() {
  const location = useLocation();
  const { job, userData } = location.state || {}; // Corrected 'UserData' to 'userData'
  console.log(location.state);

  if (!job || !userData) {
    return <div>No data available</div>;
  }

  return (
    <div className="container">    
      <div className="col-md-4" key={job.id}>
        <div className="card mb-4">
          <div className="card-body">
            <h5 className="card-title">{job.title}</h5>
            <p className="card-text">Qualifications: {job.qualification_required.join(', ')}</p>
            <p className="card-text">Domicile: {job.post_regions.join(', ')}</p>
            <p className="card-text">Gender: {job.jobs_for}</p>
            <p className="card-text">Age Range: {job.min_age} - {job.max_age}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ApplyjobPage;
