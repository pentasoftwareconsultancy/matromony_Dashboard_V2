import React, { useState, useEffect } from 'react';
import styles from './Sociallink.module.css'; // Import your CSS module

const Sociallink = ({ onDataChange }) => {
  const [formData, setFormData] = useState({
    socialFacebook: '',
    socialInstagram: '',
    socialLinkedIn: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Whenever formData changes, send it to the parent (Groomform)
  useEffect(() => {
    if (typeof onDataChange === 'function') {
      onDataChange(formData);  // Send updated social media data to Groomform
    }
  }, [formData, onDataChange]);  // Trigger whenever formData changes

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Social Media Info:', formData);
    // You can send this data to a server or API here if needed
  };

  return (
    <div className={styles.formContainer}>
      <h2>Social Media Links</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="socialFacebook">Facebook Profile URL:</label>
          <input
            type="url"
            id="socialFacebook"
            name="socialFacebook"
            value={formData.socialFacebook}
            onChange={handleChange}
            placeholder="Enter Facebook URL"
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="socialInstagram">Instagram Profile URL:</label>
          <input
            type="url"
            id="socialInstagram"
            name="socialInstagram"
            value={formData.socialInstagram}
            onChange={handleChange}
            placeholder="Enter Instagram URL"
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="socialLinkedIn">LinkedIn Profile URL:</label>
          <input
            type="url"
            id="socialLinkedIn"
            name="socialLinkedIn"
            value={formData.socialLinkedIn}
            onChange={handleChange}
            placeholder="Enter LinkedIn URL"
          />
        </div>
        
      </form>
    </div>
  );
};

export default Sociallink;
