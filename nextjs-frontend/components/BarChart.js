import { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend,
} from 'chart.js';

ChartJS.register(
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend
);

const BarChart = () => {
	const [chartData, setChartData] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchData = async () => {
			try {
				console.log('Fetching bar chart data...');
				const response = await axios.get('/api/bar');
				console.log('Response received:', response);
				const { labels, data } = response.data;
				
				setChartData({
					labels,
					datasets: [{
						label: 'Bar Dataset',
						data,
						backgroundColor: 'rgba(75, 192, 192, 0.6)',
						borderColor: 'rgba(75, 192, 192, 1)',
						borderWidth: 1
					}]
				});
				setLoading(false);
			} catch (err) {
				console.error('Error fetching bar chart data:', err);
				if (err.response) {
					console.error('Error response:', err.response.data);
					console.error('Error status:', err.response.status);
				}
				setError(`Failed to load bar chart data: ${err.message}`);
				setLoading(false);
			}
		};

		fetchData();
	}, []);

	if (loading) return <div>Loading Bar Chart...</div>;
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
				text: 'Bar Chart',
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
			<h2 style={{ fontFamily: "'Arial', sans-serif", fontSize: '20px', fontWeight: 'bold' }}>Bar Chart</h2>
			<div style={{ width: '100%', height: '400px' }}>
				<Bar options={options} data={chartData} />
			</div>
		</div>
	);
};

export default BarChart;
