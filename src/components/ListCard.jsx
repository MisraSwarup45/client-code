import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons';
import { Link } from "react-router-dom";
import './ListCard.scss';

const ListCard = ({ id, title, description,tech_used,domain,contributors_active,contributors_needed,date_started}) => {
  return (
    <div className="list-card">
      <div className="list-card__info">
        <h2 className="list-card__company">{title}</h2>
        <h1>{id}</h1>
        <p className="list-card__title">{title}</p>
        <p className="list-card__pay">Description: {description}</p>
        <p className="list-card__duration">Tech Stack: {tech_used}</p>
        <p className="list-card__employee-required">domain: {domain}</p>
        <p className="list-card__skills">Contributors Active: {contributors_active}</p>
        <p className="list-card__employee-required">Contributors needed: {contributors_needed}</p>
        <p className="list-card__employee-required">Date Started: {date_started}</p>
        <div className="list-card__contact">
          <div className="list-card__contact-icon">
            <FontAwesomeIcon icon={faEnvelope} />
          </div>
          {/* <p>{email}</p> */}
        </div>
        <div className="list-card__contact">
          <div className="list-card__contact-icon">
            <FontAwesomeIcon icon={faPhone} />
          </div>
          {/* <p>{contact_number}</p> */}
        </div>
        <Link className='links-project' to={`project-details/${id}`}>
          <button className="list-card__button">Apply Now</button>
        </Link>
      </div>
    </div>
  );
};

ListCard.propTypes = {
  // company: PropTypes.string,
  // title: PropTypes.string,
  // pay: PropTypes.string,
  // duration: PropTypes.string,
  // employee_required: PropTypes.string,
  // skills: PropTypes.string,
  // email: PropTypes.string,
  // contact_number: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  tech_used: PropTypes.string,
  domain: PropTypes.string,
  contributors_active: PropTypes.number,
  contributors_needed: PropTypes.number,
  date_started: PropTypes.string
};

export default ListCard;
