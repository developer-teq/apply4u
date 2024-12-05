

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
  export const checkEligibility = (user, job) => {
    const userAge = calculateAge(user.date_of_birth);
  
    const qualificationsRequired = job.qualification_req.map(q => q.education);
    const whoCanApply = job.whocanapply.map(q => q.education);
    const postRegions = job.post_regions.map(r => r.regions);
  
    return (
      qualificationsRequired.includes(user.qualification) &&
      whoCanApply.includes(user.qualification) &&
      postRegions.includes(user.domicile) &&
      (job.jobs_for === user.gender || job.jobs_for.toLowerCase() === "both") &&
      (job.min_age ? userAge >= job.min_age : true) &&
      userAge <= job.max_age
    );
  };
  