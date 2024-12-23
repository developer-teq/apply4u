export const calculateAge = (dob) => {
  const birthDate = new Date(dob);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDifference = today.getMonth() - birthDate.getMonth();
  if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
};

export const checkEligibility = (job) => {
  // Retrieve and parse user data from sessionStorage
  const userData = localStorage.getItem('formData');
  if (!userData) {
    console.error("No user data found in sessionStorage.");
    return false;
  }

  const parsedUserData = JSON.parse(userData);

  // Log the parsed user data for debugging
  
  // Validate required fields in parsedUserData
  if (
    !parsedUserData.Dateofbirth ||
    !parsedUserData.qualific.id ||
    !parsedUserData.domicile.id ||
    !parsedUserData.gender
  ) {
    console.error("Incomplete user data in sessionStorage.");
    return false;
  }

  // Calculate user's age
  const userAge = calculateAge(parsedUserData.Dateofbirth);

  // Extract job requirements
  const qualificationsRequired = job.qualification_req.map((q) => q.id);
  const whoCanApply = job.whocanapply.map((q) => q.id);
  const postRegions = job.post_regions.map((r) => r.id);

  // Log the job data for debugging

  // Eligibility checks
  const isEligible =
    whoCanApply.includes(Number(parsedUserData.qualific.id)) &&
    postRegions.includes(Number(parsedUserData.domicile.id)) &&
    (job.jobs_for === parsedUserData.gender || job.jobs_for.toLowerCase() === "both") &&
    (job.min_age ? userAge >= job.min_age : true) &&
    userAge <= job.max_age;

  // Log the final result of the eligibility check
 
  return isEligible;
};


export const saveJobApplication = (jobId, userId) => {
  // Retrieve stored user data
  let userstoreddata = JSON.parse(localStorage.getItem('formData')) || {};

  // Check if 'applied_jobs' key exists, if not initialize it as an array
  if (!Array.isArray(userstoreddata.applied_jobs)) {
    userstoreddata.applied_jobs = [];
  }

  // Add new job application data
  const newJobApplication = {
    job_id: jobId,
    user_id: userId,
  };

  // Check for duplicates before adding
  if (!userstoreddata.applied_jobs.some(job => job.job_id === jobId)) {
    userstoreddata.applied_jobs.push(newJobApplication);
  }

  // Save the updated data back to localStorage
  localStorage.setItem('formData', JSON.stringify(userstoreddata));

  console.log('Updated userstoreddata:', userstoreddata);
};

