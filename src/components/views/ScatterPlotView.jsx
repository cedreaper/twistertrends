import React, { useState, useEffect } from 'react';
import { Scatter } from 'react-chartjs-2';
import DashboardFilters from '../common/DashboardFilters';
import '../../App.css';
import { pullTornadoSizeData, pullTemperatureData } from '../../services/dataService';

const ScatterPlotView = () => {
    const [tornadoSizeData, setTornadoSizeData] = useState([]);
    const [tempData, setTempData] = useState([]);
    const [selectedCounties, setSelectedCounties] = useState(['all']);
    const [selectedYears, setSelectedYears] = useState(['all']);
    const [selectedMonths, setSelectedMonths] = useState(['all']);
    const [renderKey, setRenderKey] = useState(Date.now());
    const url = 'https://www.codeblossom.net/tt/TornadoEvents.php';
    const tempUrl = 'https://www.codeblossom.net/tt/readAverageTemps.php';
    

    const handleFilterChange = (filter) => {
        setSelectedCounties(filter.counties);
        setSelectedYears(filter.years);
        setSelectedMonths(filter.months);
    
        generateChartData(filter);
    
      };

      useEffect(() => {  
        const url = 'https://www.codeblossom.net/tt/TornadoEvents.php'
        pullTemperatureData(tempUrl, setTempData, selectedMonths, selectedYears);
        pullTornadoSizeData(url, setTornadoSizeData, selectedCounties, selectedMonths, selectedYears);
       
        setRenderKey(Date.now());
    }, []);
    
        const generateChartData = (filter) => {
          pullTemperatureData(tempUrl, setTempData, filter.months, filter.years);
          pullTornadoSizeData(url, tempData, setTornadoSizeData, filter.counties, filter.months, filter.years);
        }
  const scatterData = {
    datasets: [{
      label: 'Tornado Size vs Average Temperature',
      data: tornadoSizeData.map(tornado => ({
        x: tornado.temp, 
        y: tornado.size,
    })),

    backgroundColor: 'rgba(173, 216, 230, 0.5)',
    borderColor: 'rgba(173, 216, 230, 1)',
    pointRadius: 8, 
    }]
  };

  const options = {
    scales: {
      x: {
        type: 'linear',
        position: 'bottom',
        title: {
          display: true,
          text: 'Average Temperature (°F)'
        },
        ticks: {
            color: 'white',
        }
      },
      y: {
        title: {
          display: true,
          text: 'Tornado Size (Strength)'
        },
        ticks: {
            color: 'white',
        }
      }
    },
    plugins: {
        legend: {
          position: 'top',
          labels: {
              color: 'white',
            },
        },
        title: {
          display: true,
          text: selectedYears.find(item => item === 'all') ? '1950 - 2023' :`${selectedYears[selectedYears.length - 1]} - ${selectedYears[0]}`,
          color: 'white',
        },
      },
  };

  return (
      <div>
                 <div>
            <h6>Multiple Selected Drop Down Values Accepted </h6>
            <DashboardFilters  
            selectedCounties={selectedCounties}
            selectedYears={selectedYears}
            selectedMonths={selectedMonths}
            onChange={handleFilterChange}/>
            </div>
          <Scatter data={scatterData} options={options} />
          </div>
  );
  
};

export default ScatterPlotView;