import React, { useState } from 'react';

const ResumeBuilder = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    education: '',
    experience: '',
    skills: '',
    summary: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle resume generation here
    console.log(formData);
  };

  return (
    <div>
      <h2>Create Your Resume</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />
        </label>
        <label>
          Email:
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />
        </label>
        <label>
          Phone:
          <input type="text" name="phone" value={formData.phone} onChange={handleChange} required />
        </label>
        <label>
          Address:
          <input type="text" name="address" value={formData.address} onChange={handleChange} required />
        </label>
        <label>
          Education:
          <textarea name="education" value={formData.education} onChange={handleChange}></textarea>
        </label>
        <label>
          Work Experience:
          <textarea name="experience" value={formData.experience} onChange={handleChange}></textarea>
        </label>
        <label>
          Skills:
          <textarea name="skills" value={formData.skills} onChange={handleChange}></textarea>
        </label>
        <label>
          Summary:
          <textarea name="summary" value={formData.summary} onChange={handleChange}></textarea>
        </label>
        <button type="submit">Generate Resume</button>
      </form>
    </div>
  );
};

export default ResumeBuilder;
