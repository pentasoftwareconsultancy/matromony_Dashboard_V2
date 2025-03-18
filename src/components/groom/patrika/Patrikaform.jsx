import React, { useState } from 'react';
import styles from './PatrikaForm.module.css';

const PatrikaForm = ({ formData, handleChange, formErrors }) => {
  // List of common mother tongues (static example)
  const motherTongues = [
    'Hindi', 'Tamil', 'Telugu', 'Gujarati', 'Marathi', 'Bengali', 'Punjabi', 'Malayalam', 'Kannada', 'Odia',
    'Urdu', 'Konkani', 'Assamese', 'Maithili', 'Sanskrit', 'Bhojpuri', 'Rajasthani', 'Sindhi', 'Dogri', 'Manipuri'
  ];

  return (
    <div className={styles.formContainer}>
      <h2>Patrika / Astrology Details</h2>
      <div className={styles.form}>
        <div className={styles.grid}>
          <div className={styles.formGroup}>
            <label htmlFor="motherTongue">Mother Tongue:</label>
            <select
              id="motherTongue"
              name="motherTongue"
              value={formData.motherTongue}
              onChange={handleChange}
              required
            >
              <option value="">Select Mother Tongue</option>
              {motherTongues.map((language, index) => (
                <option key={index} value={language}>
                  {language}
                </option>
              ))}
            </select>
            {formErrors.motherTongue && <span className="error">Mother Tongue is required</span>}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="religion">Religion:</label>
            <input
              type="text"
              id="religion"
              name="religion"
              value={formData.religion}
              onChange={handleChange}
              required
            />
            {formErrors.religion && <span className="error">Religion is required</span>}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="timeOfBirth">Time of Birth:</label>
            <input
              type="time"
              id="timeOfBirth"
              name="timeOfBirth"
              value={formData.timeOfBirth}
              onChange={handleChange}
              required
            />
            {formErrors.timeOfBirth && <span className="error">Time of Birth is required</span>}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="cityOfBirth">City of Birth:</label>
            <input
              type="text"
              id="cityOfBirth"
              name="cityOfBirth"
              value={formData.cityOfBirth}
              onChange={handleChange}
              required
            />
            {formErrors.cityOfBirth && <span className="error">City of Birth is required</span>}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="isManglik">Is Manglik:</label>
            <input
              type="checkbox"
              id="isManglik"
              name="isManglik"
              checked={formData.isManglik}
              onChange={handleChange}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="gotra">Gotra:</label>
            <input
              type="text"
              id="gotra"
              name="gotra"
              value={formData.gotra}
              onChange={handleChange}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="ras">Ras:</label>
            <input
              type="text"
              id="ras"
              name="ras"
              value={formData.ras}
              onChange={handleChange}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="gan">Gan:</label>
            <input
              type="text"
              id="gan"
              name="gan"
              value={formData.gan}
              onChange={handleChange}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="nadi">Nadi:</label>
            <input
              type="text"
              id="nadi"
              name="nadi"
              value={formData.nadi}
              onChange={handleChange}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="charan">Charan:</label>
            <input
              type="text"
              id="charan"
              name="charan"
              value={formData.charan}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatrikaForm;
