import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import Styles from './Analytics.module.css';

// Register chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

function Analytics() {
  const [activityPage, setActivityPage] = useState(1);
  const activityPerPage = 3;

  // Data for the Sales Overview chart
  const salesData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [
      {
        label: 'Sales ($)',
        data: [1000, 2000, 1500, 1800, 2200, 2500],
        fill: false,
        borderColor: 'rgba(75, 192, 192, 1)',
        tension: 0.4,  // Increased tension for more curvature
      },
    ],
  };

  // Data for the Order Trends chart
  const orderData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [
      {
        label: 'Orders',
        data: [120, 150, 200, 180, 250, 300],
        fill: false,
        borderColor: 'rgba(153, 102, 255, 1)',
        tension: 0.4,  // Increased tension for more curvature
      },
    ],
  };

  // Data for the Revenue Trends chart
  const revenueData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [
      {
        label: 'Revenue ($)',
        data: [500, 1200, 1300, 1500, 1700, 1900],
        fill: false,
        borderColor: 'rgba(255, 159, 64, 1)',
        tension: 0.4,  // Increased tension for more curvature
      },
    ],
  };

  const recentActivities = [
    "Order #1234 was placed by User1.",
    "Product 'Phone A' was added to the catalog.",
    "User2 signed up for the platform.",
    "Order #1233 was delivered successfully.",
    "Order #1235 was placed by User3.",
    "Product 'Smartwatch B' was added to the catalog.",
    "User4 signed up for the platform.",
    "Order #1236 was delivered successfully."
  ];

  const indexOfLastActivity = activityPage * activityPerPage;
  const indexOfFirstActivity = indexOfLastActivity - activityPerPage;
  const currentActivities = recentActivities.slice(indexOfFirstActivity, indexOfLastActivity);

  const nextPage = () => {
    if (activityPage * activityPerPage < recentActivities.length) {
      setActivityPage(activityPage + 1);
    }
  };

  const prevPage = () => {
    if (activityPage > 1) {
      setActivityPage(activityPage - 1);
    }
  };

  return (
    <div className={Styles.Container}>
      {/* Header Section */}
      <div className={Styles.Header}>
        <h2>Analytics Overview</h2>
        <p>Welcome to your system's analytics dashboard, where you can track your progress and make data-driven decisions.</p>
      </div>

      {/* Statistics Section */}
      <div className={Styles.Stats}>
        <div className={Styles.Card}>
          <h3>150</h3>
          <p>Total Products</p>
        </div>
        <div className={Styles.Card}>
          <h3>75</h3>
          <p>Orders Today</p>
        </div>
        <div className={Styles.Card}>
          <h3>50</h3>
          <p>Pending Deliveries</p>
        </div>
        <div className={Styles.Card}>
          <h3>200</h3>
          <p>Registered Users</p>
        </div>
      </div>

      {/* Charts Section */}
      <div className={Styles.Charts}>
        <div className={Styles.Chart}>
          <h4>Sales Overview</h4>
          <Line data={salesData} />
        </div>
        <div className={Styles.Chart}>
          <h4>Order Trends</h4>
          <Line data={orderData} />
        </div>
        <div className={Styles.Chart}>
          <h4>Revenue Trends</h4>
          <Line data={revenueData} />
        </div>
      </div>

      {/* Recent Activity Section */}
      <div className={Styles.Activity}>
        <h4>Recent Activity</h4>
        <ul>
          {currentActivities.map((activity, index) => (
            <li key={index}>{activity}</li>
          ))}
        </ul>
        <div className={Styles.Pagination}>
          <button onClick={prevPage} disabled={activityPage === 1}>Previous</button>
          <button onClick={nextPage} disabled={activityPage * activityPerPage >= recentActivities.length}>Next</button>
        </div>
      </div>
    </div>
  );
}

export default Analytics;
