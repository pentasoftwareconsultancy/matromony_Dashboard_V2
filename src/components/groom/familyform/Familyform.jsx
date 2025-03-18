import React, { useState } from 'react';
import styles from './FamilyForm.module.css';

const FamilyForm = () => {
  const [formData, setFormData] = useState({
    fatherName: '',
    fatherOccupation: '',
    motherName: '',
    motherOccupation: '',
    brothers: 0,
    sisters: 0,
    culturalValues: '',
    aboutFamily: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Submitted', formData);
    // Add your form submission logic here (e.g., send data to an API or server)
  };

  return (
    <div className={styles.formContainer}>
      <h2>Family Information</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.grid}>
          <div className={styles.formGroup}>
            <label htmlFor="fatherName">Father's Name:</label>
            <input
              type="text"
              id="fatherName"
              name="fatherName"
              value={formData.fatherName}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="fatherOccupation">Father's Occupation:</label>
            <input
              type="text"
              id="fatherOccupation"
              name="fatherOccupation"
              value={formData.fatherOccupation}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="motherName">Mother's Name:</label>
            <input
              type="text"
              id="motherName"
              name="motherName"
              value={formData.motherName}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="motherOccupation">Mother's Occupation:</label>
            <input
              type="text"
              id="motherOccupation"
              name="motherOccupation"
              value={formData.motherOccupation}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="brothers">Number of Brothers:</label>
            <input
              type="number"
              id="brothers"
              name="brothers"
              value={formData.brothers}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="sisters">Number of Sisters:</label>
            <input
              type="number"
              id="sisters"
              name="sisters"
              value={formData.sisters}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="culturalValues">Cultural Values:</label>
            <input
              type="text"
              id="culturalValues"
              name="culturalValues"
              value={formData.culturalValues}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="aboutFamily">About Family:</label>
            <textarea
              id="aboutFamily"
              name="aboutFamily"
              value={formData.aboutFamily}
              onChange={handleChange}
              required
            />
          </div>
        </div>

       
      </form>
    </div>
  );
};

export default FamilyForm;
