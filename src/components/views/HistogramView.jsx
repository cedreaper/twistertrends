import { Bar } from 'react-chartjs-2';
import { useState, useEffect } from 'react';
import { requestData } from '../../services/dataService';
import '../../App.css';
import DashboardFilters from '../common/DashboardFilters';

const HistogramView = () => {
    const [renderKey, setRenderKey] = useState(Date.now());
    const [tornadoData, setTornadoData] = useState([]);
    const [tempData, setTempData] = useState([]);
    const [selectedCounties, setSelectedCounties] = useState(['all']);
    const [selectedYears, setSelectedYears] = useState(['all']);
    const [selectedMonths, setSelectedMonths] = useState(['all']);
    const [graphLabels, setGraphLabels] = useState(['EF0, EF1', 'EF2', 'EF3', 'EF4', 'EF5']);
    const url = 'https://www.codeblossom.net/tt/TornadoEvents.php';

  const handleFilterChange = (filter) => {
    setSelectedCounties(filter.counties);
    setSelectedYears(filter.years);
    setSelectedMonths(filter.months);

    generateChartData(filter);

  };

  const mapTornadoSizeToScale = (size) => {
        if (size === "No Recorded Info") {
            size = "F0";
        }
    
        const sizeMapping = {
            'EF0': 0, 'F0': 0, 'EFU': 0,
            'EF1': 1, 'F1': 1,
            'EF2': 2, 'F2': 2,
            'EF3': 3, 'F3': 3,
            'EF4': 4, 'F4': 4,
            'EF5': 5, 'F5': 5
        };
    
        return sizeMapping[size] || 0; 
    };

    const generateChartData = async (filter) => {
        try {
            let dataResponse = await requestData(url);
            let tornadoData = dataResponse.records;
    
            const sizeBins = {
                'EF0': 0,
                'EF1': 0,
                'EF2': 0,
                'EF3': 0,
                'EF4': 0,
                'EF5': 0
            };
    
            tornadoData.forEach(tornado => {
                if ((filter.counties.includes('all') || filter.counties.includes(tornado.county)) &&
                    (filter.months.includes('all') || filter.months.includes(new Date(tornado.start).toLocaleString('default', { month: 'long' }))) &&
                    (filter.years.includes('all') || filter.years.includes(new Date(tornado.start).getFullYear().toString()))) {
    
                    const sizeNumeric = mapTornadoSizeToScale(tornado.size);

                    if (sizeNumeric === 0) {
                        sizeBins['EF0']++;
                    }
                    else if (sizeNumeric === 1) {
                        sizeBins['EF1']++;
                    } else if (sizeNumeric === 2) {
                        sizeBins['EF2']++;
                    } else if (sizeNumeric === 3) {
                        sizeBins['EF3']++;
                    } else if (sizeNumeric === 4) {
                        sizeBins['EF4']++;
                    } else if (sizeNumeric === 5) {
                        sizeBins['EF5']++;
                    }
                }
            });
    
            setTornadoData(Object.values(sizeBins)); 
            setGraphLabels(Object.keys(sizeBins));
        } catch (error) {
            console.error("Error fetching tornado data:", error);
        }
    };

    useEffect(() => { 
        const initialData = {
            counties: selectedCounties,
            months: selectedMonths,
            years: selectedYears,
        } 

        //generateChartData(initialData);
        setRenderKey(Date.now());
    }, []);

  const myData = {
    labels: graphLabels,
    datasets: [
        {
            label: 'Tornados',
            data: tornadoData,
            //fill: true, 
            backgroundColor: 'rgba(75, 192, 192, 0.2)', 
            borderColor: 'rgb(75, 192, 192)', 
            tension: 0.1,
            yAxisID: 'y'
        },
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
            <h2>Tornado Frequency</h2>
            <Bar className="line-graph" data={myData} options={options} key={renderKey} />
        </div>
    ); 
}

export default HistogramView;