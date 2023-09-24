import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons';

const CompanyCard = ({ id, name, created_at, educations, experiences }) => {
  return (
    <div>
      <div>
        <h2>{name}</h2>
        <p>Created At: {created_at}</p>
        <div>
          <h3>Educations:</h3>
          <ul>
            {educations.map((education) => (
              <li key={education.id}>
                <div>
                  Institute: {education.institute}
                </div>
                <div>
                  Degree: {education.degree}
                </div>
                <div>
                  Start Date: {education.start_date}
                </div>
                <div>
                  End Date: {education.end_date}
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3>Experiences:</h3>
          <ul>
            {experiences.map((experience) => (
              <li key={experience.id}>
                <div>
                  Company Name: {experience.company_name}
                </div>
                <div>
                  Position: {experience.position}
                </div>
                <div>
                  Start Date: {experience.start_date}
                </div>
                <div>
                  End Date: {experience.end_date}
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <div>
            <FontAwesomeIcon icon={faEnvelope} />
          </div>
          {/* <p>{email}</p> */}
        </div>
        <div>
          <div>
            <FontAwesomeIcon icon={faPhone} />
          </div>
          {/* <p>{contact_number}</p> */}
        </div>
      </div>
    </div>
  );
};

CompanyCard.propTypes = {
  id: PropTypes.number,
  name: PropTypes.string,
  created_at: PropTypes.string,
  educations: PropTypes.arrayOf(
    PropTypes.shape({
      institute: PropTypes.string,
      degree: PropTypes.string,
      start_date: PropTypes.string,
      end_date: PropTypes.string
    })
  ),
  experiences: PropTypes.arrayOf(
    PropTypes.shape({
      company_name: PropTypes.string,
      position: PropTypes.string,
      start_date: PropTypes.string,
      end_date: PropTypes.string
    })
  ),
};

export default CompanyCard;
