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
  console.log("User Data from sessionStorage:", parsedUserData);

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
  console.log("Job Data:", job);
  console.log("Extracted Job Requirements:");
  console.log("Qualifications Required:", qualificationsRequired);
  console.log("Who Can Apply IDs:", whoCanApply);
  console.log("Post Regions IDs:", postRegions);

  // Debugging logs for conditions
  console.log("Calculated User Age:", userAge);
  console.log("User Qualification:", parsedUserData.qualific);
  console.log("User Domicile:", parsedUserData.domicile);
  console.log("User Gender:", parsedUserData.gender);
  console.log("Job Target Gender:", job.jobs_for);

  // Eligibility checks
  const isEligible =
    whoCanApply.includes(Number(parsedUserData.qualific.id)) &&
    postRegions.includes(Number(parsedUserData.domicile.id)) &&
    (job.jobs_for === parsedUserData.gender || job.jobs_for.toLowerCase() === "both") &&
    (job.min_age ? userAge >= job.min_age : true) &&
    userAge <= job.max_age;

  // Log the final result of the eligibility check
  console.log("Eligibility Check Result:", isEligible);

  return isEligible;
};
