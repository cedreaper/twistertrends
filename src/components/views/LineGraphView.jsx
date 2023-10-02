import { Line } from 'react-chartjs-2';
import DataService from '../../services/DataService';

const LineGraphView = () => {

    /*
    const data = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
            {
                label: 'My First Dataset',
                data: [65, 59, 80, 81, 56, 55, 40],
                fill: false,
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1
            }
        ]
    };

    const options = {
        scales: {
            x: {
                type: 'category'
            },
            y: {
                type: 'linear'
            }
        }
    };
    
    return (
        <div>
            <Line data={data} options={options} />
        </div>
    );

    */
    const dataService = new DataService();

    return (
        <div>
            <h2>Line Graph</h2>
            { dataService.init() }
        </div>
    );
}

export default LineGraphView;