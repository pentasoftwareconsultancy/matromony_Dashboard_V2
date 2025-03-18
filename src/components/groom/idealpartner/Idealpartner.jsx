import React, { useState, useEffect } from 'react';
import styles from './Idealpartner.module.css';

const Idealpartner = ({ onDataChange, formErrors }) => {
  const [formData, setFormData] = useState({
    partnerAgeFrom: '',
    partnerAgeTo: '',
    partnerEducation: '',
    partnerLocation: '',
    partnerPackage: '',
    partnerAbout: '',
  });

  const [errors, setErrors] = useState({
    partnerAgeFrom: false,
    partnerAgeTo: false,
    partnerEducation: false,
    partnerLocation: false,
    partnerPackage: false,
    partnerAbout: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  useEffect(() => {
    if (typeof onDataChange === 'function') {
      onDataChange(formData); // Send updated form data to parent
    }
  }, [formData, onDataChange]);

  useEffect(() => {
    setErrors({
      partnerAgeFrom: !formData.partnerAgeFrom,
      partnerAgeTo: !formData.partnerAgeTo,
      partnerEducation: !formData.partnerEducation,
      partnerLocation: !formData.partnerLocation,
      partnerPackage: !formData.partnerPackage,
      partnerAbout: !formData.partnerAbout,
    });
  }, [formData]);

  return (
    <div className={styles.formContainer}>
      <h2>Ideal Partner Preferences</h2>
      <form>
        <div className={styles.grid}>
          <div className={styles.formGroup}>
            <label htmlFor="partnerAgeFrom">Partner Age From:</label>
            <input
              type="number"
              id="partnerAgeFrom"
              name="partnerAgeFrom"
              value={formData.partnerAgeFrom}
              onChange={handleChange}
              required
              min="18"
            />
            {errors.partnerAgeFrom && <span className={styles.error}>This field is required</span>}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="partnerAgeTo">Partner Age To:</label>
            <input
              type="number"
              id="partnerAgeTo"
              name="partnerAgeTo"
              value={formData.partnerAgeTo}
              onChange={handleChange}
              required
              min="18"
            />
            {errors.partnerAgeTo && <span className={styles.error}>This field is required</span>}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="partnerEducation">Partner Education:</label>
            <select
              id="partnerEducation"
              name="partnerEducation"
              value={formData.partnerEducation}
              onChange={handleChange}
              required
            >
              <option value="">Select Education Level</option>
              <option value="High School">High School</option>
              <option value="Undergraduate">Undergraduate</option>
              <option value="Postgraduate">Postgraduate</option>
              <option value="Doctorate">Doctorate</option>
              <option value="Other">Other</option>
            </select>
            {errors.partnerEducation && <span className={styles.error}>This field is required</span>}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="partnerLocation">Partner Location:</label>
            <input
              type="text"
              id="partnerLocation"
              name="partnerLocation"
              value={formData.partnerLocation}
              onChange={handleChange}
              required
            />
            {errors.partnerLocation && <span className={styles.error}>This field is required</span>}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="partnerPackage">Partner Package (Income):</label>
            <select
              id="partnerPackage"
              name="partnerPackage"
              value={formData.partnerPackage}
              onChange={handleChange}
              required
            >
              <option value="">Select Income Range</option>
              <option value="Below 5 LPA">Below 5 LPA</option>
              <option value="5 - 10 LPA">5 - 10 LPA</option>
              <option value="10 - 15 LPA">10 - 15 LPA</option>
              <option value="15 - 20 LPA">15 - 20 LPA</option>
              <option value="Above 20 LPA">Above 20 LPA</option>
            </select>
            {errors.partnerPackage && <span className={styles.error}>This field is required</span>}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="partnerAbout">Partner About:</label>
            <textarea
              id="partnerAbout"
              name="partnerAbout"
              value={formData.partnerAbout}
              onChange={handleChange}
              required
            />
            {errors.partnerAbout && <span className={styles.error}>This field is required</span>}
          </div>
        </div>
      </form>
    </div>
  );
};

export default Idealpartner;
