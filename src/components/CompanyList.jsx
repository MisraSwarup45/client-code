import React, { useState, useEffect } from 'react';
import CompanyCard from './CompanyCard';

const CompanyList = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  const API_ENDPOINT = 'http://157.245.129.71:8000/padmins';

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

  return (
    <>
      <div>
        {loading ? (
          <div>
            <div></div>
            <span>Loading...</span>
          </div>
        ) : (
          <div>
            {filteredData.map((item) => (
              <CompanyCard
                name={item.name}
                created_at={item.created_at}
                educations={item.educations}
                experiences={item.experiences}
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default CompanyList;
