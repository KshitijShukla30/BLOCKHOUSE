import { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import axios from 'axios';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
);

const PieChart = () => {
    const [chartData, setChartData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/api/pie');
                const { labels, data } = response.data;
                
                setChartData({
                    labels,
                    datasets: [{
                        label: 'Pie Dataset',
                        data,
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.6)',
                            'rgba(54, 162, 235, 0.6)',
                            'rgba(255, 206, 86, 0.6)',
                        ],
                        borderColor: [
                            'rgba(255, 99, 132, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                        ],
                        borderWidth: 1,
                    }]
                });
                setLoading(false);
            } catch (err) {
                console.error('Error fetching pie chart data:', err);
                setError(`Failed to load pie chart data: ${err.message}`);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) return <div>Loading Pie Chart...</div>;
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
                text: 'Pie Chart',
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
            <h2 style={{ fontFamily: "'Arial', sans-serif", fontSize: '20px', fontWeight: 'bold' }}>Pie Chart</h2>
            <div style={{ width: '100%', height: '400px' }}>
                <Pie data={chartData} options={options} />
            </div>
        </div>
    );
};

export default PieChart;
