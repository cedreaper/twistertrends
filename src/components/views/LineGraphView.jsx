import { Bar, Line } from 'react-chartjs-2';
import { useState, useEffect } from 'react';
import { pullAnomalyData, pullTornadoData } from '../../services/dataService';
import '../../App.css';
import DashboardFilters from '../common/DashboardFilters';

const LineGraphView = () => {
    const [renderKey, setRenderKey] = useState(Date.now());
    const [graphLabels, setGraphLabels] = useState(['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']);
    const [tornadoData, setTornadoData] = useState([10, 20, 50, 30, 20]);
    const [anomalyData, setAnomalyData] = useState([1.23, -0.45, 0.85, 2.25, -1.10]);
    const [selectedCounties, setSelectedCounties] = useState(['all']);
    const [selectedYears, setSelectedYears] = useState(['all']);
    const [selectedMonths, setSelectedMonths] = useState(['all']);
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

     pullAnomalyData(tempUrl, setAnomalyData, filter.months, filter.years);
      
  }

    useEffect(() => {  
        const url = 'https://www.codeblossom.net/tt/TornadoEvents.php'
        pullTornadoData(url, setTornadoData, selectedCounties, selectedMonths, selectedYears);
        pullAnomalyData(tempUrl, setAnomalyData, selectedMonths, selectedYears);
        setRenderKey(Date.now());
    }, []);

      const data = {
        labels: graphLabels, 
        datasets: [
          {
            label: 'Tornado Count',
            type: 'bar',
            data: tornadoData,
            backgroundColor: 'rgba(0, 123, 255, 0.5)',
            yAxisID: 'y'
          },
          {
            label: 'Temperature Anomaly',
            type: 'line',
            data: anomalyData,
            borderColor: 'rgba(255, 193, 7, 0.5)',
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
        color: 'white',
        text: selectedYears.find(item => item === 'all') ? '1950 - 2023' :`${selectedYears[selectedYears.length - 1]} - ${selectedYears[0]}`,
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
            <h2>Anomalies</h2>
            <Line className="line-graph" data={data} options={options} key={renderKey} />
        </div>
    ); 
}

export default LineGraphView;