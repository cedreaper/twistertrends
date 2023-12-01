import React, { useState, useEffect } from 'react';
import { requestData } from '../../services/dataService';
import '../../App.css';

const DashboardFilters = ({ selectedCounties, selectedYears, selectedMonths, onChange }) => {
  const [counties, setCounties] = useState([]);
  const [years, setYears] = useState([]);
  const [months, setMonths] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const monthsData = [
      { id: 1, name: 'January' },
      { id: 2, name: 'February' },
      { id: 3, name: 'March' },
      { id: 4, name: 'April' },
      { id: 5, name: 'May' },
      { id: 6, name: 'June' },
      { id: 7, name: 'July' },
      { id: 8, name: 'August' },
      { id: 9, name: 'September' },
      { id: 10, name: 'October' },
      { id: 11, name: 'November' },
      { id: 12, name: 'December' },
    ];

    async function fetchCounties() {
        try {
          const data = await requestData('https://www.codeblossom.net/tt/readCounties.php');
          setCounties(data.records);
          setLoading(false); 
        } catch (error) {
          console.error('Error fetching counties:', error);
        }
    }

    async function fetchYears() {
        try {
            const yearData = await requestData('https://www.codeblossom.net/tt/readYears.php');
            setYears(yearData.records);
            setLoading(false); 
          } catch (error) {
            console.error('Error fetching years:', error);
          }
    }
  
    fetchCounties();
    fetchYears();

    setMonths(monthsData);
   
  }, []);

const handleFilterChange = (e) => {
    const { name, value } = e.target;
    const selectedOptions = e.target.selectedOptions;
    const selectedArrayForm = Array.from(selectedOptions).map((option) => option.value);
  
    if (selectedArrayForm.includes("all")) {
      onChange({
        counties: name === "counties" ? counties.map((countyObject) => countyObject.county) : selectedCounties,
        years: name === "years" ? years.map((yearObject) => yearObject.year) : selectedYears,
        months: name === "months" ? months.map((month) => month.name).filter(item => item !== 'all') : selectedMonths,
      });
    } else {
      onChange({
        counties: name === "counties" ? selectedArrayForm : selectedCounties,
        years: name === "years" ? selectedArrayForm : selectedYears,
        months: name === "months" ? selectedArrayForm : selectedMonths,
      });
    }
  };

  return (
    <div className="filter-container">
    <div className="filter-group">
      <select multiple className="filter-padding" name="counties" id="countySelector" value={selectedCounties} onChange={(e) => handleFilterChange(e)} disabled={loading}>
      <option key={"all"} value="all">All Counties</option>
        {loading ? (
          <option>Loading...</option>
        ) : (
            counties.map((countyObject) => (
                <option key={countyObject.id} value={countyObject.county}>
                  {countyObject.county}
                </option>
              ))
        )}
      </select>
    </div>

    <div className="filter-group">
      <select multiple className="filter-padding" name="years" id="yearSelector" value={selectedYears} onChange={(e) => handleFilterChange(e)}>
      <option key={"all"} value="all">All Years</option>
      {loading ? (
          <option>Loading...</option>
        ) : (
            years.map((yearObject) => (
                <option key={yearObject.year} value={yearObject.year}>
                  {yearObject.year}
                </option>
              ))
        )}
      </select>
    </div>

    <div className="filter-group">
      <select multiple className="filter-padding" name="months"id="monthSelector" value={selectedMonths} onChange={(e) => handleFilterChange(e)}>
      <option key={"all"} value="all">All Months</option>
        {months.map((month) => (
          <option key={month.id} value={month.name}>
            {month.name}
          </option>
        ))}
      </select>
    </div>
  </div>
  );
};

export default DashboardFilters;