import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

const Chart = dynamic(() => import('react-chartjs-2').then(mod => mod.Chart), { ssr: false });

const Modal = ({ isOpen, onClose, chartData }) => {
    if (!isOpen) return null;

    return (
        <div style={modalStyles.overlay}>
            <div style={modalStyles.content}>
                <button onClick={onClose} style={modalStyles.closeButton}>Close</button>
                <h2>Candlestick Chart (Detailed View)</h2>
                <div style={{ width: '100%', height: '400px' }}>
                    <Chart type='candlestick' data={chartData} options={{ ...options, plugins: { legend: { position: 'top' } } }} />
                </div>
            </div>
        </div>
    );
};

const modalStyles = {
    overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000
    },
    content: {
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '8px',
        width: '80%',
        maxWidth: '800px',
        position: 'relative',
    },
    closeButton: {
        position: 'absolute',
        top: '10px',
        right: '10px',
        border: 'none',
        backgroundColor: 'transparent',
        cursor: 'pointer',
        fontSize: '18px'
    }
};

const CandlestickChart = () => {
    const [chartData, setChartData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);

    useEffect(() => {
        const loadAndFetchData = async () => {
            try {
                const { Chart: ChartJS, CategoryScale, LinearScale, TimeScale, Title, Tooltip, Legend } = await import('chart.js');
                const { CandlestickController, CandlestickElement } = await import('chartjs-chart-financial');
                await import('chartjs-adapter-date-fns');

                ChartJS.register(
                    CategoryScale,
                    LinearScale,
                    TimeScale,
                    Title,
                    Tooltip,
                    Legend,
                    CandlestickController,
                    CandlestickElement
                );

                const response = await fetch('/api/candlestick');
                const data = await response.json();
                console.log('Fetched data:', data);

                const processedData = data.data.map(item => ({
                    x: new Date(item.x).getTime(),
                    o: item.open,
                    h: item.high,
                    l: item.low,
                    c: item.close
                }));

                setChartData({
                    datasets: [{
                        label: 'OHLC',
                        data: processedData,
                        backgroundColor: {
                            up: 'rgba(75, 192, 192, 1)',
                            down: 'rgba(255, 99, 132, 1)',
                            unchanged: 'rgba(201, 203, 207, 1)',
                        },
                        borderColor: {
                            up: 'rgba(75, 192, 192, 1)',
                            down: 'rgba(255, 99, 132, 1)',
                            unchanged: 'rgba(201, 203, 207, 1)',
                        }
                    }]
                });
                setLoading(false);
            } catch (err) {
                console.error('Error fetching candlestick data:', err);
                setError('Failed to load candlestick data');
                setLoading(false);
            }
        };

        loadAndFetchData();
    }, []);

    const handleCandlestickClick = (event) => {
        const chartInstance = event.chartInstance; // Get chartInstance from the event
        const activeElements = chartInstance.getElementsAtEventForMode(event.native, 'nearest', { intersect: true }, false);
        
        if (activeElements.length > 0) {
            setModalOpen(true);
        }
    };

    if (loading) return <div>Loading Candlestick Chart...</div>;
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
                text: 'Candlestick Chart',
                font: {
                    family: "'Arial', sans-serif",
                    size: 20,
                    weight: 'bold',
                },
            },
            tooltip: {
                callbacks: {
                    label: function(context) {
                        const { o, h, l, c } = context.raw;
                        return [
                            `Open: ${o}`,
                            `High: ${h}`,
                            `Low: ${l}`,
                            `Close: ${c}`
                        ];
                    },
                    title: function(tooltipItems) {
                        const date = new Date(tooltipItems[0].parsed.x);
                        return date.toLocaleDateString(); // Only display the date
                    }
                }
            }
        },
        scales: {
            x: {
                type: 'time',
                time: {
                    unit: 'day'
                },
                title: {
                    display: true,
                    text: 'Date'
                }
            },
            y: {
                title: {
                    display: true,
                    text: 'Price'
                },
                beginAtZero: false
            }
        },
        onClick: handleCandlestickClick // Correctly set the onClick event
    };

    console.log('Chart data:', chartData); // Log the chart data before rendering

    return (
        <div>
            <h2 style={{ fontFamily: "'Arial', sans-serif", fontSize: '20px', fontWeight: 'bold' }}>Candlestick Chart</h2>
            <div style={{ width: '100%', height: '400px' }}>
                <Chart type='candlestick' options={options} data={chartData} />
            </div>
            <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} chartData={chartData} />
        </div>
    );
};

export default CandlestickChart;
