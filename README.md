# Next.js Frontend with Django Backend (BLOCKHOUSE assignment)

This project consists of a Next.js frontend and a Django backend. 

## Prerequisites

- Node.js (v14 or later)
- Python (v3.8 or later)
- pip (Python package manager)

## Setup

1. Clone the repository:
   ```
   git clone <repository-url>
   cd <project-directory>
   ```

2. Set up the Next.js frontend:
   ```
   cd nextjs-frontend
   npm install
   ```

3. Set up the Django backend:
   ```
   cd ../myproject
   python -m venv venv
   source venv/bin/activate  # On Windows, use `venv\Scripts\activate`
   pip install -r requirements.txt
   ```

## Running the Application

1. Start the Django backend:
   ```
   cd myproject
   python manage.py runserver
   ```
   The backend will be available at `http://127.0.0.1:8000/`.
   Individual response JSON file can be accessed using there respective link
   `http://127.0.0.1:8000//api/candlestick-data/` – Returns JSON data for the Candlestick chart.

    `http://127.0.0.1:8000//api/line-chart-data/` – Returns JSON data for the Line chart.

    `http://127.0.0.1:8000//api/bar-chart-data/` – Returns JSON data for the Bar chart.

    `http://127.0.0.1:8000//api/pie-chart-data/` – Returns JSON data for the Pie chart.

2. In a new terminal, start the Next.js frontend:
   ```
   cd nextjs-frontend
   npm run dev
   ```
   The frontend will be available at `http://localhost:3000/`.

## Additional Information

- The Django backend provides API endpoints for the frontend to consume.
- The Next.js frontend uses Chart.js to display various charts.
- Make sure both the backend and frontend are running simultaneously for the application to work correctly.


