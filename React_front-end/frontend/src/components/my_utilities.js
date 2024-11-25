

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
    return (
      job.qualification_required.includes(user.qualification) &&
      job.whocanapply.includes(user.qualification) &&
      job.post_regions.includes(user.domicile) &&
      (job.jobs_for === user.gender || job.jobs_for === "Both") &&
      userAge >= job.min_age &&
      userAge <= job.max_age
    );
  };
  