import React, { useState, useEffect } from 'react';
import './DeveloperLogin.scss'; // Don't forget to create the corresponding CSS file
import jwt_decode from 'jwt-decode';
import Cookies from 'js-cookie';

const ContributorForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    stack: [''],
    bio: '',
    profile_pic: '',
    experiences: [
      {
        company_name: '',
        position: '',
        start_date: '',
        end_date: '',
      },
    ],
    educations: [
      {
        institute: '',
        degree: '',
        start_date: '',
        end_date: '',
      },
    ],
    created_at: '',
    updated_at: '',
    user_id: null, // Initialize user_id to null
  });

  // Update user_id from the decoded token
  useEffect(() => {
    const access_token = Cookies.get('accesstoken');

    if (access_token) {
      try {
        const decodedToken = jwt_decode(access_token);
        const user_id = decodedToken.user_id;

        // Update the user_id in the formData state
        setFormData((prevData) => ({
          ...prevData,
          user_id: user_id,
        }));
      } catch (error) {
        console.error('Error decoding access token:', error);
      }
    } else {
      console.error('Access Token not found.');
    }
  }, []);

  const handleChange = (e) => {
    const { name, value, dataset } = e.target;

    if (name === 'stack') {
      // Handle changes for the 'stack' field
      setFormData((prevData) => ({
        ...prevData,
        stack: value.split(',').map((item) => item.trim()), // Split by comma and trim whitespace
      }));
    } else if (dataset.fieldType === 'experience') {
      // Handle changes for experiences
      const updatedExperiences = formData.experiences.map((exp, index) =>
        index === parseInt(dataset.index)
          ? { ...exp, [name]: value }
          : exp
      );
      setFormData((prevData) => ({
        ...prevData,
        experiences: updatedExperiences,
      }));
    } else if (dataset.fieldType === 'education') {
      // Handle changes for educations
      const updatedEducations = formData.educations.map((edu, index) =>
        index === parseInt(dataset.index)
          ? { ...edu, [name]: value }
          : edu
      );
      setFormData((prevData) => ({
        ...prevData,
        educations: updatedEducations,
      }));
    } else {
      // Handle changes for other fields
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleAddExperience = () => {
    setFormData((prevData) => ({
      ...prevData,
      experiences: [
        ...prevData.experiences,
        {
          company_name: '',
          position: '',
          start_date: '',
          end_date: '',
        },
      ],
    }));
  };

  const handleAddEducation = () => {
    setFormData((prevData) => ({
      ...prevData,
      educations: [
        ...prevData.educations,
        {
          institute: '',
          degree: '',
          start_date: '',
          end_date: '',
        },
      ],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate the form data
    if (
      !formData.name ||
      !formData.role ||
      !formData.stack[0] ||
      !formData.bio ||
      !formData.profile_pic ||
      !formData.experiences.length ||
      !formData.educations.length
    ) {
      alert('Please fill in all required fields.');
      return;
    }

    // Set the created_at and updated_at fields
    formData.created_at = new Date().toISOString();
    formData.updated_at = new Date().toISOString();

    // Send the form data to the backend API
    const response = await fetch('http://157.245.129.71:8000/contributor', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    // Handle the response
    if (response.ok) {
      // Contributor added successfully
      alert('Contributor added successfully!');
      // Reset the form
      setFormData({
        name: '',
        role: '',
        stack: [''],
        bio: '',
        profile_pic: '',
        experiences: [
          {
            company_name: '',
            position: '',
            start_date: '',
            end_date: '',
          },
        ],
        educations: [
          {
            institute: '',
            degree: '',
            start_date: '',
            end_date: '',
          },
        ],
        created_at: '',
        updated_at: '',
        user_id: null, // Reset user_id to null
      });
    } else {
      // Handle errors here
      console.error('Error adding contributor:', response.statusText);
    }
  };

  return (
    <div className="contributor-form-wrapper">
      <form onSubmit={handleSubmit} className="contributor-form">
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />

        <label htmlFor="role">Role:</label>
        <input type="text" id="role" name="role" value={formData.role} onChange={handleChange} required />

        <label htmlFor="stack">Stack (comma-separated):</label>
        <input type="text" id="stack" name="stack" value={formData.stack.join(', ')} onChange={handleChange} required />

        <label htmlFor="bio">Bio:</label>
        <textarea id="bio" name="bio" value={formData.bio} onChange={handleChange} required />

        <label htmlFor="profile_pic">Profile Picture URL:</label>
        <input type="text" id="profile_pic" name="profile_pic" value={formData.profile_pic} onChange={handleChange} required />

        <h3>Experiences:</h3>
        {formData.experiences.map((exp, index) => (
          <div key={index} className="experience-section">
            <label htmlFor={`company_name-${index}`}>Company:</label>
            <input
              type="text"
              id={`company_name-${index}`}
              name="company_name"
              data-field-type="experience"
              data-index={index}
              value={exp.company_name}
              onChange={handleChange}
              required
            />

            <label htmlFor={`position-${index}`}>Position:</label>
            <input
              type="text"
              id={`position-${index}`}
              name="position"
              data-field-type="experience"
              data-index={index}
              value={exp.position}
              onChange={handleChange}
              required
            />

            <label htmlFor={`start_date-${index}`}>Start Date:</label>
            <input
              type="date"
              id={`start_date-${index}`}
              name="start_date"
              data-field-type="experience"
              data-index={index}
              value={exp.start_date}
              onChange={handleChange}
              required
            />

            <label htmlFor={`end_date-${index}`}>End Date:</label>
            <input
              type="date"
              id={`end_date-${index}`}
              name="end_date"
              data-field-type="experience"
              data-index={index}
              value={exp.end_date}
              onChange={handleChange}
              required
            />
          </div>
        ))}
        <button type="button" className="add-section-btn" onClick={handleAddExperience}>
          Add Experience
        </button>

        <h3>Educations:</h3>
        {formData.educations.map((edu, index) => (
          <div key={index} className="education-section">
            <label htmlFor={`institute-${index}`}>Institute:</label>
            <input
              type="text"
              id={`institute-${index}`}
              name="institute"
              data-field-type="education"
              data-index={index}
              value={edu.institute}
              onChange={handleChange}
              required
            />

            <label htmlFor={`degree-${index}`}>Degree:</label>
            <input
              type="text"
              id={`degree-${index}`}
              name="degree"
              data-field-type="education"
              data-index={index}
              value={edu.degree}
              onChange={handleChange}
              required
            />

            <label htmlFor={`start_date-${index}`}>Start Date:</label>
            <input
              type="date"
              id={`start_date-${index}`}
              name="start_date"
              data-field-type="education"
              data-index={index}
              value={edu.start_date}
              onChange={handleChange}
              required
            />

            <label htmlFor={`end_date-${index}`}>End Date:</label>
            <input
              type="date"
              id={`end_date-${index}`}
              name="end_date"
              data-field-type="education"
              data-index={index}
              value={edu.end_date}
              onChange={handleChange}
              required
            />
          </div>
        ))}
        <button type="button" className="add-section-btn" onClick={handleAddEducation}>
          Add Education
        </button>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default ContributorForm;
