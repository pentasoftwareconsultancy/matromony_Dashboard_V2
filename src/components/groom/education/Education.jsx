import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Importing useNavigate for navigation
import styles from './Education.module.css'; // Import the CSS module

// Data for dropdown options
const educationLevels = [
  { value: '', label: 'Select Education Level' },
  { value: 'Graduate', label: 'Graduate' },
  { value: 'Postgraduate', label: 'Postgraduate' },
  { value: 'PhD', label: 'PhD' }
];

const educationFields = [
  { value: '', label: 'Select Education Field' },
  { value: 'Engineering', label: 'Engineering' },
  { value: 'Arts', label: 'Arts' },
  { value: 'Science', label: 'Science' },
  { value: 'Business', label: 'Business' }
];

const residencyStatuses = [
  { value: '', label: 'Select Residency Status' },
  { value: 'Citizen', label: 'Citizen' },
  { value: 'PR', label: 'Permanent Resident' }
];

const annualIncomes = [
  { value: '', label: 'Select Annual Income' },
  { value: '5 LPA', label: '5 LPA' },
  { value: '10 LPA', label: '10 LPA' },
  { value: '15 LPA', label: '15 LPA' },
  { value: '20 LPA', label: '20 LPA' }
];

const Education = ({ onChange }) => {
  const [formData, setFormData] = useState({
    educationLevel: '',
    educationField: '',
    educationDescription: '',
    occupation: '',
    occupationDescription: '',
    companyName: '',
    residencyStatus: '',
    annualIncome: ''
  });

  const [formErrors, setFormErrors] = useState({});
  const navigate = useNavigate(); // Use navigate for programmatic navigation

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  // Validation function for required fields
  const validateForm = () => {
    const errors = {};

    // Validate education fields
    if (!formData.educationLevel) {
      errors.educationLevel = 'Education Level is required';
    }

    if (!formData.occupation) {
      errors.occupation = 'Occupation is required';
    }

    return errors;
  };

  // Effect hook for form validation
  useEffect(() => {
    const errors = validateForm();
    setFormErrors(errors);

    // Optionally scroll to the education section if there are validation errors
    if (Object.keys(errors).length > 0) {
      navigate('#education'); // This scrolls to the Education section
    }

    if (onChange) {
      onChange(formData); // Send updated form data to the parent component
    }
  }, [formData, onChange]);

  return (
    <div className={styles.formContainer} id="education">
      <h2>Education and Career Details</h2>
      <form className={styles.form}>
        {/* Education Level Dropdown */}
        <label htmlFor="educationLevel">Education Level</label>
        <select
          name="educationLevel"
          value={formData.educationLevel}
          onChange={handleChange}
          className={styles.select}
        >
          {educationLevels.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {formErrors.educationLevel && <span className={styles.error}>{formErrors.educationLevel}</span>}

        {/* Education Field Dropdown */}
        <label htmlFor="educationField">Education Field</label>
        <select
          name="educationField"
          value={formData.educationField}
          onChange={handleChange}
          className={styles.select}
        >
          {educationFields.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        {/* Education Description Text Field */}
        <label htmlFor="educationDescription">Education Description</label>
        <textarea
          name="educationDescription"
          value={formData.educationDescription}
          onChange={handleChange}
          placeholder="Describe your education"
          className={styles.textarea}
        />

        {/* Occupation Text Field */}
        <label htmlFor="occupation">Occupation</label>
        <input
          type="text"
          name="occupation"
          value={formData.occupation}
          onChange={handleChange}
          placeholder="e.g., Software Engineer"
          className={styles.input}
        />
        {formErrors.occupation && <span className={styles.error}>{formErrors.occupation}</span>}

        {/* Occupation Description Text Field */}
        <label htmlFor="occupationDescription">Occupation Description</label>
        <textarea
          name="occupationDescription"
          value={formData.occupationDescription}
          onChange={handleChange}
          placeholder="Describe your occupation"
          className={styles.textarea}
        />

        {/* Company Name Text Field */}
        <label htmlFor="companyName">Company Name</label>
        <input
          type="text"
          name="companyName"
          value={formData.companyName}
          onChange={handleChange}
          placeholder="e.g., Google"
          className={styles.input}
        />

        {/* Residency Status Dropdown */}
        <label htmlFor="residencyStatus">Residency Status</label>
        <select
          name="residencyStatus"
          value={formData.residencyStatus}
          onChange={handleChange}
          className={styles.select}
        >
          {residencyStatuses.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        {/* Annual Income Dropdown */}
        <label htmlFor="annualIncome">Annual Income</label>
        <select
          name="annualIncome"
          value={formData.annualIncome}
          onChange={handleChange}
          className={styles.select}
        >
          {annualIncomes.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </form>
    </div>
  );
};

export default Education;
