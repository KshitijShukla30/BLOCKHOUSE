export default async function handler(req, res) {
  console.log('API route /api/bar called');
  try {
    console.log('Fetching data from Django backend...');
    const response = await fetch('http://127.0.0.1:8000/api/bar-chart-data/');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    console.log('Data received from Django:', data);
    res.status(200).json(data);
  } catch (error) {
    console.error('Error fetching bar chart data:', error);
    res.status(500).json({ error: `Failed to fetch bar chart data: ${error.message}` });
  }
}