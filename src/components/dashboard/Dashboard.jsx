import React, { useEffect, useState } from "react";
import axios from "axios";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";
import styles from "./Dashboard.module.css";

const Dashboard = () => {
  const [counts, setCounts] = useState({ male: 0, female: 0, other: 0, total: 0 });
  const [monthlyData, setMonthlyData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCounts();
    fetchMonthlyData();
  }, []);

  const fetchCounts = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/v1/bride-groom/gender-counts");
      if (response.data.success) {
        setCounts({
          male: response.data.data.male,
          female: response.data.data.female,
          other: response.data.data.other,
          total: response.data.data.totalUsers,
        });
      }
    } catch (error) {
      console.error("Error fetching counts:", error);
      setError("Failed to load counts.");
    }
  };

  const fetchMonthlyData = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/v1/bride-groom/monthly-stats");
      if (response.data.success) {
        setMonthlyData(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching monthly data:", error);
      setError("Failed to load monthly data.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  // Prepare the data in the required format
  const chartData = monthlyData.map((value, index) => ({
    name: value.month,  // Using month as the 'name' for X-axis
    male: value.male,
    female: value.female,
    other: value.other,
  }));

  return (
    <div className={styles.dashboard}>
      <h2 className={styles.welcome}>Welcome to Your Profile Dashboard</h2>

      <div className={styles.statsContainer}>
        <div className={styles.statBox}>
          <h3>Male Profiles</h3>
          <p>{counts.male}</p>
        </div>
        <div className={styles.statBox}>
          <h3>Female Profiles</h3>
          <p>{counts.female}</p>
        </div>
        <div className={styles.statBox}>
          <h3>Other Profiles</h3>
          <p>{counts.other}</p>
        </div>
        <div className={styles.statBox}>
          <h3>Total Profiles</h3>
          <p>{counts.total}</p>
        </div>
      </div>

      <div className={styles.chartContainer}>
        <h3 className={styles.monthly}>Monthly Growth Trend</h3>
        <ResponsiveContainer width="100%" height={300} className={styles.main}>
        <BarChart data={chartData} margin={{ top: 0, right: 20, left: 20, bottom: 5 }}>
  <XAxis dataKey="name" />
  <YAxis />
  <Tooltip />
  <Legend />
  {/* Male Bar */}
  <Bar
    className={styles.bar}
    dataKey="male"
    fill="#8884d8"
    name="Male"
    barSize={40} // Adjust the bar size width here
  />
  {/* Female Bar */}
  <Bar
    dataKey="female"
    fill="#82ca9d"
    name="Female"
    barSize={40} // Adjust the bar size width here
  />
  {/* Other Bar */}
  <Bar
    dataKey="other"
    fill="#ffc658"
    name="Other"
    barSize={40} // Adjust the bar size width here
  />
</BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Dashboard;
