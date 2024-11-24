// AdmissionListComponent .js
import React, { useState, useEffect } from 'react';

function AdmissionListComponent () {
  const [admissions, setadmissions] = useState([]);

  useEffect(() => {
    // Fetch the admission data (could be an API call)
    setadmissions([
      { id: 1, title: 'Software Engineer', description: 'Developing web applications' },
      { id: 2, title: 'Data Analyst', description: 'Analyzing data for business insights' }
    ]);
  }, []);

  return (
    <div>
      {admissions.map(admission => (
        <div key={admission.id}>
          <h3>{admission.title}</h3>
          <p>{admission.description}</p>
        </div>
      ))}
    </div>
  );
}

export default AdmissionListComponent ;
