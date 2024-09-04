   export default async function handler(req, res) {
     try {
       const response = await fetch('http://127.0.0.1:8000/api/pie-chart-data/');
       if (!response.ok) {
         throw new Error(`HTTP error! status: ${response.status}`);
       }
       const data = await response.json();
       res.status(200).json(data);
     } catch (error) {
       console.error('Error fetching data:', error);
       res.status(500).json({ error: 'Failed to fetch data' });
     }
   }