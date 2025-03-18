import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./Notificationmain.module.css";

const Notificationmain = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/v1/bride-groom");
      if (response.data?.data) {
        // Only add users who are not approved yet
        const unapprovedUsers = response.data.data.filter(user => !user.isApproved);
        setUsers(unapprovedUsers);
      } else {
        console.error("Unexpected API response format:", response.data);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleApproval = async (id) => {
    try {
      const response = await axios.put(`http://localhost:8000/api/v1/bride-groom/${id}`, {
        isApproved: true,
      });

      if (response.status === 200) {
        alert("User Approved Successfully!");
        // Remove the approved user from the list
        setUsers((prevUsers) => prevUsers.filter(user => user._id !== id));
      }
    } catch (error) {
      console.error("Error approving user:", error);
      alert("Error approving user");
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:8000/api/v1/bride-groom/${id}`);

      if (response.status === 200) {
        alert("User Deleted Successfully!");
        // Remove the deleted user from the list
        setUsers((prevUsers) => prevUsers.filter(user => user._id !== id));
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      alert("Error deleting user");
    }
  };

  return (
    <div className={styles.container}>
      <h2>Admin Panel: Approve Users</h2>
      {loading && <p>Loading users...</p>}
      <div className={styles.userList}>
        {users.length === 0 && !loading && <p>No new user registrations pending approval.</p>}
        {users.map((profile) => (
          <div key={profile._id} className={styles.profileCard}>
            <h2>Personal Details</h2>
            <p><strong>Full Name:</strong> {profile.fullName}</p>
            <p><strong>Email:</strong> {profile.email}</p>
            <p><strong>Mobile Number:</strong> {profile.mobileNumber}</p>
            <p><strong>City:</strong> {profile.city}</p>
            {profile.profilePhoto && <img className={styles.image} src={profile.profilePhoto} alt="Profile" />}
            <div className={styles.actions}>
              <button onClick={() => handleApproval(profile._id)} className={styles.approve}>
                Approve
              </button>
              <button onClick={() => handleDelete(profile._id)} className={styles.delete}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notificationmain;
