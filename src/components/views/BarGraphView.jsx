import { Bar } from 'react-chartjs-2';
import { useState, useEffect } from 'react';
import { pullTornadoData } from '../../services/dataService';
import '../../App.css';
import DashboardFilters from '../common/DashboardFilters';

const BarGraphView = () => {
    const [renderKey, setRenderKey] = useState(Date.now());
    const [datar, setDatar] = useState([]);
    const [selectedCounties, setSelectedCounties] = useState(['all']);
    const [selectedYears, setSelectedYears] = useState(['all']);
    const [selectedMonths, setSelectedMonths] = useState(['all']);

  const handleFilterChange = (filter) => {
    setSelectedCounties(filter.counties);
    setSelectedYears(filter.years);
    setSelectedMonths(filter.months);
    console.log(filter);
  };

    useEffect(() => {  
        const url = 'https://www.codeblossom.net/tt/TornadoEvents.php'
        pullTornadoData(url, setDatar, 0);
        setRenderKey(Date.now());
    }, []);

    const data = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
            {
            label: 'Trends',
            data: [65, 59, 80, 81, 56, 55, 40],
            fill: true, 
            backgroundColor: 'rgba(75, 192, 192, 0.2)', 
            borderColor: 'rgb(75, 192, 192)', 
            tension: 0.1
            }
        ]
    };

  const myData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
        {
            label: 'Tornados',
            data: [65, 59, 80, 81, 56, 55, 40],
            //fill: true, 
            backgroundColor: 'rgba(75, 192, 192, 0.2)', 
            borderColor: 'rgb(75, 192, 192)', 
            tension: 0.1
        },
         {
            label: 'Avg Monthly Temp',
            data: [25, 85, 50, 60, 17, 20, 90],
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
        }
    ]
};

const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Climatic Events',
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
            Test Record: {datar}
        </div>
    ); 
}

export default BarGraphView;