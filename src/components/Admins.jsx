import React, { useState, useEffect } from 'react';

function Admins() {
  const [admins, setAdmins] = useState([]);
  const apiUrl = 'http://157.245.129.71:8000/padmins';

  useEffect(() => {
    // Fetch data from the API when the component mounts
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        // Assuming the API response is an array of admins
        setAdmins(data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <div className="App">
      <h1>Admins</h1>
      <ul>
        {admins.map((admin) => (
          <li key={admin.id}>
            <h2>{admin.name}</h2>
            <p>Email: {admin.user.email}</p>

            <h3>Experiences:</h3>
            <ul>
              {admin.experiences.map((experience) => (
                <li key={experience.id}>
                  Company: {experience.company_name} <br />
                  Position: {experience.position} <br />
                  Time Period: {experience.start_date} - {experience.end_date}
                </li>
              ))}
            </ul>

            <h3>Educations:</h3>
            <ul>
              {admin.educations.map((education) => (
                <li key={education.id}>
                  Institute: {education.institute} <br /> 
                  Degree: {education.degree} <br /> 
                  Time Period: {education.start_date} - {education.end_date}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Admins;
