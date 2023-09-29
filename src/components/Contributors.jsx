import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import './Contributors.scss';

function Contributors() {
  const [contributors, setContributors] = useState([]);
  const apiUrl = 'http://157.245.129.71:8000/contributor';

  useEffect(() => {
    // Fetch data from the API when the component mounts
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        // Assuming the API response is an array of contributors
        setContributors(data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <>
      <Navbar />
      <div className="App">
        <h1>Contributors</h1>
        <ul>
          {contributors.map((contributor) => (
            <li key={contributor.id}>
              <h2>{contributor.name}</h2>
              <p>Role: {contributor.role}</p>
              <p>Stack: {contributor.stack.join(', ')}</p>
              <p>Bio: {contributor.bio}</p>
              <p>Email: {contributor.user.email}</p>

              <h3>Experiences:</h3>
              <ul>
                {contributor.experiences.map((experience) => (
                  <li key={experience.id}>
                    Company: {experience.company_name}<br />
                    Position: {experience.position}, <br />
                    Time Period: {experience.start_date} - {experience.end_date}
                  </li>
                ))}
              </ul>

              <h3>Educations:</h3>
              <ul>
                {contributor.educations.map((education) => (
                  <li key={education.id}>
                    Institute: {education.institute}<br />
                    Degree: {education.degree}<br />
                    Time Period: {education.start_date} - {education.end_date}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default Contributors;
