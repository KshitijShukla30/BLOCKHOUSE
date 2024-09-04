import styles from '../styles/Home.module.css'
import CandlestickChart from '../components/CandlestickChart'
import LineChart from '../components/LineChart'
import BarChart from '../components/BarChart'
import PieChart from '../components/PieChart'

const ChartContainer = ({ children }) => (
  <div 
    style={{ 
      transition: 'box-shadow 0.3s ease-in-out, transform 0.3s ease-in-out',
      borderRadius: '8px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0)',
      
    }} 
    className="chart-container"
    onMouseOver={(e) => {
      e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.2)';
      e.currentTarget.style.transform = 'scale(1.08)';
    }}
    onMouseOut={(e) => {
      e.currentTarget.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0)';
      e.currentTarget.style.transform = 'scale(1)';
    }}
  >
    {children}
  </div>
)

export default function Dashboard() {
    return (
        <div style={{ width: '100%', height: '100%' ,backgroundColor: '#e1e1e1'}} className={styles.container}>
            <a 
                href="https://blockhouse.app/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className={styles.companyName}
                style={{ textDecoration: 'none' }}
            >
                blockhouse.app
            </a>
            <div class="line"></div>          
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%', height: '100%', padding: '20px' }}>
            <div className={styles.chartContainer}>
                <ChartContainer><CandlestickChart /></ChartContainer>
                <ChartContainer><LineChart /></ChartContainer>
                <ChartContainer><BarChart /></ChartContainer>
                <ChartContainer><PieChart /></ChartContainer>
            </div>
            </div>
        </div>
    )
}