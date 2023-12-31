import { Bar } from 'react-chartjs-2';
import { useState, useEffect } from 'react';
import { pullTemperatureData, pullTornadoData } from '../../services/dataService';
import '../../App.css';
import DashboardFilters from '../common/DashboardFilters';

const BarGraphView = () => {
    const [renderKey, setRenderKey] = useState(Date.now());
    const [tornadoData, setTornadoData] = useState([]);
    const [tempData, setTempData] = useState([]);
    const [selectedCounties, setSelectedCounties] = useState(['all']);
    const [selectedYears, setSelectedYears] = useState(['all']);
    const [selectedMonths, setSelectedMonths] = useState(['all']);
    const [graphLabels, setGraphLabels] = useState(['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']);
    const url = 'https://www.codeblossom.net/tt/TornadoEvents.php';
    const tempUrl = 'https://www.codeblossom.net/tt/readAverageTemps.php';

  const handleFilterChange = (filter) => {
    setSelectedCounties(filter.counties);
    setSelectedYears(filter.years);
    setSelectedMonths(filter.months);

    generateChartData(filter);

    setGraphLabels(filter.months);

  };

  const generateChartData = (filter) => {
      pullTornadoData(url, setTornadoData, filter.counties, filter.months, filter.years);

      pullTemperatureData(tempUrl, setTempData, filter.months, filter.years);
      
  }

    useEffect(() => {  
        const startFilter = {
            months: selectedMonths,
            years: selectedYears,
            counties: selectedCounties,
        };

        handleFilterChange(startFilter);
        pullTornadoData(url, setTornadoData, selectedCounties, selectedMonths, selectedYears);
        pullTemperatureData(tempUrl, setTempData, selectedMonths, selectedYears);
        setRenderKey(Date.now());
    }, []);

  const myData = {
    labels: graphLabels,
    datasets: [
        {
            label: 'Tornados',
            data: tornadoData,
            backgroundColor: 'rgba(75, 192, 192, 0.2)', 
            borderColor: 'rgb(75, 192, 192)', 
            tension: 0.1,
            yAxisID: 'y'
        },
         {
            label: 'Avg Monthly Temp',
            data: tempData,
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
            yAxisID: 'y1'
        }
    ]
};

const options = {
    responsive: true,
    scales: {
        x: {
            ticks: {
                color: 'white',
            },
        },
        y: {
            ticks: {
                color: 'white',
            },
        },
        y1: {
            position: 'right',
            beginAtZero: true,
            ticks: {
                color: 'white',
            }
          },
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
            <h2>Monthly Average Temp to Tornado Ratio</h2>
            <Bar className="line-graph" data={myData} options={options} key={renderKey} />
        </div>
    ); 
}

export default BarGraphView;