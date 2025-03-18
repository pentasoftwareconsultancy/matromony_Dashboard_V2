import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import Data from '../../service/Data';
import Styles from './Dashboard.module.css';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

function Dashboard() {
  // States for stats and chart data using imported data
  const [stats, setStats] = useState(Data.stats);
  const [recentActivities, setRecentActivities] = useState(Data.recentActivities);
  const [chartData, setChartData] = useState(Data.chartData);
  const [orderTrendsData, setOrderTrendsData] = useState(Data.orderTrendsData);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Simulate API calls or other dynamic data fetching logic here if needed
        setLoading(false);
      } catch (err) {
        setError('Error fetching data');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className={Styles.Container}>

      <div className={Styles.Header}>
        <h2>{Data.header.title}</h2>
        <p>{Data.header.welcomeMessage}</p>
      </div>

      {/* Loading/Error State */}
      {loading && <p>Loading...</p>}
      {error && <p className={Styles.Error}>{error}</p>}

      {/* Statistics Section */}
      {!loading && !error && (
        <div className={Styles.Stats}>
          <div className={Styles.Card}>
            <h3>{stats.totalProducts}</h3>
            <p>{Data.statsHeadings.totalProducts}</p>
          </div>
          <div className={Styles.Card}>
            <h3>{stats.ordersToday}</h3>
            <p>{Data.statsHeadings.ordersToday}</p>
          </div>
          <div className={Styles.Card}>
            <h3>{stats.pendingDeliveries}</h3>
            <p>{Data.statsHeadings.pendingDeliveries}</p>
          </div>
          <div className={Styles.Card}>
            <h3>{stats.registeredUsers}</h3>
            <p>{Data.statsHeadings.registeredUsers}</p>
          </div>
        </div>
      )}

      {!loading && !error && (
        <div className={Styles.Charts}>
          <div className={Styles.Chart}>
            <h4>{Data.chartHeadings.salesOverview}</h4>
            <Line data={chartData} />
          </div>
          <div className={Styles.Chart}>
            <h4>{Data.chartHeadings.orderTrends}</h4>
            <Line data={orderTrendsData} />
          </div>
        </div>
      )}

      {!loading && !error && (
        <div className={Styles.Activity}>
          <h4>{Data.recentActivityHeading}</h4>
          <ul>
            {recentActivities.map((activity, index) => (
              <li key={index}>{activity}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Dashboard;



