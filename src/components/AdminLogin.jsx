import React, { useState, useEffect } from 'react';
import './AdminLogin.scss';
import jwt_decode from 'jwt-decode';
import Cookies from 'js-cookie';

const AdminLogin = () => {
  const [formData, setFormData] = useState({
    name: '',
    is_active: true,
    user_id: null,
    created_at: '', // Include created_at field
    updated_at: '', // Include updated_at field
    educations: [
      {
        institute: '',
        degree: '',
        start_date: '',
        end_date: '',
      },
    ],
    experiences: [
      {
        company_name: '',
        position: '',
        start_date: '',
        end_date: '',
      },
    ],
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

    if (dataset.fieldType === 'education') {
      const updatedEducations = formData.educations.map((edu, index) =>
        index === parseInt(dataset.index) ? { ...edu, [name]: value } : edu
      );
      setFormData((prevData) => ({
        ...prevData,
        educations: updatedEducations,
      }));
    } else if (dataset.fieldType === 'experience') {
      const updatedExperiences = formData.experiences.map((exp, index) =>
        index === parseInt(dataset.index) ? { ...exp, [name]: value } : exp
      );
      setFormData((prevData) => ({
        ...prevData,
        experiences: updatedExperiences,
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Include timestamps
    const currentDateTime = new Date().toISOString();
    const formDataWithTimestamps = {
      ...formData,
      created_at: currentDateTime,
      updated_at: currentDateTime,
    };

    // Send the form data to the backend API
    const response = await fetch('http://157.245.129.71:8000/padmins', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formDataWithTimestamps), // Use formDataWithTimestamps here
    });

    // Handle the response
    if (response.ok) {
      // Admin added successfully
      alert('Admin added successfully!');
      // Reset the form
      setFormData({
        name: '',
        is_active: true,
        user_id: null,
        created_at: '',
        updated_at: '',
        educations: [
          {
            institute: '',
            degree: '',
            start_date: '',
            end_date: '',
          },
        ],
        experiences: [
          {
            company_name: '',
            position: '',
            start_date: '',
            end_date: '',
          },
        ],
      });
    } else {
      // Handle any errors
      console.error('Error adding admin:', response.statusText);
    }
  }; 

  return (
    <div className="admin-login-wrapper">
      <form onSubmit={handleSubmit} className="admin-form">
        <label htmlFor="name">Full Name:</label>
        <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />

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
              type="date" // Change to type="date"
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
              type="date" // Change to type="date"
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
              type="date" // Change to type="date"
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
              type="date" // Change to type="date"
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

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AdminLogin;
