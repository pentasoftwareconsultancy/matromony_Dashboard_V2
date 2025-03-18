import React, { useState, useEffect } from 'react';
import styles from './Personal.module.css';

const Personal = ({ onChange, formErrors }) => {
  const [formData, setFormData] = useState({
    maritalStatus: '',
    noOfChildren: 0,
    height: '',
    bodyType: '',
    weight: '',
    complexion: '',
    bloodGroup: '',
    smoke: '',
    drink: '',
    specialCase: '',
  });

  const heightOptions = [
    "4'6\"", "4'7\"", "4'8\"", "4'9\"", "4'10\"", "4'11\"", "5'0\"",
    "5'1\"", "5'2\"", "5'3\"", "5'4\"", "5'5\"", "5'6\"", "5'7\"",
    "5'8\"", "5'9\"", "5'10\"", "5'11\"", "6'0\"", "6'1\"", "6'2\"",
    "6'3\"", "6'4\"", "6'5\"", "6'6\"",
  ];

  const weightOptions = ["45kg", "50kg", "55kg", "60kg", "65kg", "70kg", "75kg", "80kg", "85kg", "90kg", "95kg", "100kg"];
  const bloodGroupOptions = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
  const yesNoOptions = [
    { value: 'yes', label: 'Yes' },
    { value: 'no', label: 'No' },
  ];

  useEffect(() => {
    if (onChange) {
      onChange(formData); // Pass updated formData back up to Groomform
    }
  }, [formData, onChange]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div className={styles.main}>
      {/* Marital Status */}
      <div className={styles.formGroup}>
        <label htmlFor="maritalStatus">Marital Status</label>
        <select
          id="maritalStatus"
          name="maritalStatus"
          value={formData.maritalStatus}
          onChange={handleChange}
          required
        >
          <option value="">Select...</option>
          <option value="single">Single</option>
          <option value="divorced">Divorced</option>
          <option value="widowed">Widowed</option>
        </select>
        {formErrors?.maritalStatus && <span className={styles.error}>{formErrors.maritalStatus}</span>}
      </div>

      {/* Height */}
      <div className={styles.formGroup}>
        <label htmlFor="height">Height</label>
        <select
          id="height"
          name="height"
          value={formData.height}
          onChange={handleChange}
          required
        >
          <option value="">Select height...</option>
          {heightOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        {formErrors?.height && <span className={styles.error}>{formErrors.height}</span>}
      </div>

      {/* Weight */}
      <div className={styles.formGroup}>
        <label htmlFor="weight">Weight</label>
        <select
          id="weight"
          name="weight"
          value={formData.weight}
          onChange={handleChange}
          required
        >
          <option value="">Select weight...</option>
          {weightOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        {formErrors?.weight && <span className={styles.error}>{formErrors.weight}</span>}
      </div>

      {/* Blood Group */}
      <div className={styles.formGroup}>
        <label htmlFor="bloodGroup">Blood Group</label>
        <select
          id="bloodGroup"
          name="bloodGroup"
          value={formData.bloodGroup}
          onChange={handleChange}
          required
        >
          <option value="">Select blood group...</option>
          {bloodGroupOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        {formErrors?.bloodGroup && <span className={styles.error}>{formErrors.bloodGroup}</span>}
      </div>

      {/* Do you smoke? */}
      <div className={styles.formGroup}>
        <label htmlFor="smoke">Do you smoke?</label>
        <select
          id="smoke"
          name="smoke"
          value={formData.smoke}
          onChange={handleChange}
          required
        >
          <option value="">Select...</option>
          {yesNoOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      {/* Do you drink? */}
      <div className={styles.formGroup}>
        <label htmlFor="drink">Do you drink?</label>
        <select
          id="drink"
          name="drink"
          value={formData.drink}
          onChange={handleChange}
          required
        >
          <option value="">Select...</option>
          {yesNoOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      {/* Special Case */}
      <div className={styles.formGroup}>
        <label htmlFor="specialCase">Special Case</label>
        <select
          id="specialCase"
          name="specialCase"
          value={formData.specialCase}
          onChange={handleChange}
        >
          <option value="">Select...</option>
          <option value="none">None</option>
          <option value="disability">Disability</option>
          <option value="other">Other</option>
        </select>
      </div>
    </div>
  );
};

export default Personal;
