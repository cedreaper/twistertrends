import React, { useState, useEffect } from 'react';
import { requestData } from '../../services/dataService';
import '../../App.css';
import '../../SearchView.css';

const SearchView = () => {
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [filters, setFilters] = useState({ size: '', county: '', year: '' });
    const [uniqueSizes, setUniqueSizes] = useState([]);
    const [uniqueCounties, setUniqueCounties] = useState([]);
    const [uniqueYears, setUniqueYears] = useState([]);
    const url = 'https://www.codeblossom.net/tt/TornadoEvents.php';

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await requestData(url);
                setData(response.records);
                setFilteredData(response.records); 

                const sizes = new Set(response.records.map(item => item.size));
                const counties = new Set(response.records.map(item => item.county));
                let years = new Set(response.records.map(item => new Date(item.start).getFullYear()));
            
                setUniqueSizes([...sizes]);
                setUniqueCounties([...counties]);
                setUniqueYears([...years]);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        const applyFilters = () => {
            let filtered = data.filter(item => 
                (filters.size ? item.size === filters.size : true) &&
                (filters.county ? item.county === filters.county : true) &&
                (filters.year ? new Date(item.start).getFullYear().toString() === filters.year : true)
            );
            setFilteredData(filtered);
        };
        applyFilters();
    }, [filters, data]);

    const handleFilterChange = (filterName, value) => {
        setFilters(prevFilters => ({ ...prevFilters, [filterName]: value }));
    };

    return (
        <div>
            <br /><br />
        <div className="search-view">
            <h2>Explore Tornado Events</h2>
            <div className="filters">
                <div className="filter fl">
                    <label>Size:</label>
                    <select onChange={(e) => handleFilterChange('size', e.target.value)}>
                        <option value="">All Sizes</option>
                        {uniqueSizes.map(size => (
                            <option key={size} value={size}>{size}</option>
                        ))}
                    </select>
                </div>
                <div className="filter fl">
                    <label>County:</label>
                    <select onChange={(e) => handleFilterChange('county', e.target.value)}>
                        <option value="">All Counties</option>
                        {uniqueCounties.map(county => (
                            <option key={county} value={county}>{county}</option>
                        ))}
                    </select>
                </div>
                <div className="filter">
                    <label>Year:</label>
                    <select onChange={(e) => handleFilterChange('year', e.target.value)}>
                        <option value="">All Years</option>
                        {uniqueYears.sort().map(year => (
                            <option key={year} value={year}>{year}</option>
                        ))}
                    </select>
                </div>
            </div>
            <div className="data-table">
                <table>
                    <thead>
                        <tr>
                            <th>Start</th>
                            <th>Size</th>
                            <th>County</th>
                            <th>Info</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredData.map((item, index) => (
                            <tr key={index}>
                                <td>{item.start}</td>
                                <td>{item.size}</td>
                                <td>{item.county}</td>
                                <td>{item.info}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
        </div>
    );
};

export default SearchView;