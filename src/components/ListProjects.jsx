import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import ListCard from './ListCard';
import './ListProjects.scss';

const ListProjects = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const API_ENDPOINT = 'http://157.245.129.71:8000/projects';

  useEffect(() => {
    // Fetch data from the API when the component mounts
    fetch(API_ENDPOINT)
      .then((response) => response.json())
      .then((data) => {
        console.log('API data:', data); // Log the data from the API
        setData(data);
        setFilteredData(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    // Filter the data based on the search query
    const filtered = data.filter((item) =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredData(filtered);
  }, [searchQuery, data]);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  console.log('loading:', loading); // Log the loading state
  console.log('filteredData:', filteredData); // Log the filtered data
  console.log('searchQuery:', searchQuery); // Log the search query

  return (
    <>
      {/* <Navbar /> */}
      <div className="list-projects">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search projects..."
            value={searchQuery}
            onChange={handleSearch}
          />
        </div>
        {loading ? (
          <div className="loading-indicator">
            <div className="spinner"></div>
            <span>Loading...</span>
          </div>
        ) : (
          <div className="list-projects__container">
            {filteredData.map((item) => (
              <ListCard
              title={item.title}
              description={item.description}
              tech_used={item.tech_used ? item.tech_used.join(', ') : ''} // Join tech_used with commas
              domain={item.domain || []}
              contributors_active={item.contributors_active || 0}
              contributors_needed={item.contributors_needed || 0}
              date_started={item.date_started || ''}
            />
            ))}
          </div>
        )}
      </div>
      {/* <Footer /> */}
    </>
  );
};

export default ListProjects;
