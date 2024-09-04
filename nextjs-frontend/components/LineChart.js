import { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import axios from 'axios';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const LineChart = () => {
    const [chartData, setChartData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/api/line');
                const { labels, data } = response.data;
                
                setChartData({
                    labels,
                    datasets: [{
                        label: 'Line Dataset',
                        data,
                        borderColor: 'rgb(75, 192, 192)',
                        tension: 0.1
                    }]
                });
                setLoading(false);
            } catch (err) {
                console.error('Error fetching line chart data:', err);
                setError('Failed to load line chart data');
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) return <div>Loading Line Chart...</div>;
    if (error) return <div>{error}</div>;
    if (!chartData) return null;

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Line Chart',
                font: {
					family: "'Arial', sans-serif",
					size: 20,
					weight: 'bold',
				},
            },
        },
    };

    return (
        <div>
            <h2 style={{ fontFamily: "'Arial', sans-serif", fontSize: '20px', fontWeight: 'bold' }}>Line Chart</h2>
            <Line options={options} data={chartData} />
        </div>
    );
};

export default LineChart;
