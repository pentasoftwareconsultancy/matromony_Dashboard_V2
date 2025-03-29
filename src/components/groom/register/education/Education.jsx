import React, { useState, useEffect } from "react";
import {
  initialFormData,
  heights,
  educationLevels,
  educationFields,
  occupations,
  bloodGroups,
  complexions,
  bodyTypes,
  maritalStatuses,
  noOfChildrenOptions,
  annualIncomes,
} from "../datafiles/datafile"; // Import the data
import styles from "./Education.module.css";

const Education = ({ formData, setFormData, setIsFormValid }) => {
  const [localFormData, setLocalFormData] = useState(formData || initialFormData); // Use initial data

  useEffect(() => {
    setFormData(localFormData);

    if (typeof setIsFormValid === "function") {
      const isValid =
        localFormData.maritalStatus &&
        localFormData.height &&
        localFormData.bodyType &&
        localFormData.complexion &&
        localFormData.bloodGroup;
      setIsFormValid(isValid);
    }
  }, [localFormData, setFormData, setIsFormValid]);

  const handleChange = (e) => {
    const { id, value } = e.target;

    // Special handling for smoke and drink to convert to boolean
    if (id === "smoke" || id === "drink") {
      setLocalFormData((prevData) => ({
        ...prevData,
        [id]: value === "Yes" ? true : value === "No" ? false : prevData[id], // Keep previous value if not "Yes" or "No"
      }));
    } else {
      setLocalFormData((prevData) => ({
        ...prevData,
        [id]: value,
      }));
    }
  };

  return (
    <div className={styles.formContainer}>
      <h2 className={styles.title}>Create Profile</h2>
      <form>
        {/* Personal Details */}
        <div className={styles.section}>
          <h3 className={styles.detail}>Personal Details</h3>
          <div className={styles.personal}>
            <div className={styles.formGroup}>
              <label htmlFor="maritalStatus">Marital Status*</label>
              <select
                id="maritalStatus"
                className={styles.input}
                value={localFormData.maritalStatus}
                onChange={handleChange}
              >
                <option value="">- Please Select -</option>
                {maritalStatuses.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="noOfChildren">No. of Children</label>
              <select
                id="noOfChildren"
                className={styles.input}
                value={localFormData.noOfChildren}
                onChange={handleChange}
              >
                <option value="">- Please Select -</option>
                {noOfChildrenOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="height">Height*</label>
              <select
                id="height"
                className={styles.input}
                value={localFormData.height || ""}
                onChange={handleChange}
              >
                <option value="">- Please Select -</option>
                {heights.map((height) => (
                  <option key={height} value={height}>
                    {height}
                  </option>
                ))}
              </select>
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="bodyType">Body Type*</label>
              <select
                id="bodyType"
                className={styles.input}
                value={localFormData.bodyType}
                onChange={handleChange}
              >
                <option value="">- Please Select -</option>
                {bodyTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>
            {/* Smoke Field (Yes/No Dropdown) */}
            <div className={styles.formGroup}>
              <label htmlFor="smoke">Do you smoke?</label>
              <select
                id="smoke"
                className={styles.input}
                value={
                  localFormData.smoke === true
                    ? "Yes"
                    : localFormData.smoke === false
                    ? "No"
                    : ""
                }
                onChange={handleChange}
              >
                <option value="">- Please Select -</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>
            {/* Drink Field (Yes/No Dropdown) */}
            <div className={styles.formGroup}>
              <label htmlFor="drink">Do you drink?</label>
              <select
                id="drink"
                className={styles.input}
                value={
                  localFormData.drink === true
                    ? "Yes"
                    : localFormData.drink === false
                    ? "No"
                    : ""
                }
                onChange={handleChange}
              >
                <option value="">- Please Select -</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="specialCase">Special Case</label>
              <input
                type="text"
                id="specialCase"
                className={styles.input}
                placeholder="e.g., None, Disability"
                value={localFormData.specialCase || ""}
                onChange={handleChange}
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="weight">Weight</label>
              <input
                type="text"
                id="weight"
                className={styles.input}
                placeholder="Enter Weight (kg)"
                value={localFormData.weight || ""}
                onChange={handleChange}
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="complexion">Complexion*</label>
              <select
                id="complexion"
                className={styles.input}
                value={localFormData.complexion}
                onChange={handleChange}
              >
                <option value="">- Please Select -</option>
                {complexions.map((complexion) => (
                  <option key={complexion} value={complexion}>
                    {complexion}
                  </option>
                ))}
              </select>
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="bloodGroup">Blood Group*</label>
              <select
                id="bloodGroup"
                className={styles.input}
                value={localFormData.bloodGroup}
                onChange={handleChange}
              >
                <option value="">- Please Select -</option>
                {bloodGroups.map((group) => (
                  <option key={group} value={group}>
                    {group}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Education and Career */}
        <div className={styles.section}>
          <h3 className={styles.detail}>Education and Career</h3>
          <div className={styles.mainsection}>
            <div className={styles.formGroup}>
              <label htmlFor="educationLevel">Education Level*</label>
              <select
                id="educationLevel"
                className={styles.input}
                value={localFormData.educationLevel}
                onChange={handleChange}
              >
                <option value="">- Please Select -</option>
                {educationLevels.map((level) => (
                  <option key={level} value={level}>
                    {level}
                  </option>
                ))}
              </select>
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="educationField">Education Field*</label>
              <select
                id="educationField"
                className={styles.input}
                value={localFormData.educationField}
                onChange={handleChange}
              >
                <option value="">- Please Select -</option>
                {educationFields.map((field) => (
                  <option key={field} value={field}>
                    {field}
                  </option>
                ))}
              </select>
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="occupation">Occupation*</label>
              <select
                id="occupation"
                className={styles.input}
                value={localFormData.occupation}
                onChange={handleChange}
              >
                <option value="">- Please Select -</option>
                {occupations.map((occupation) => (
                  <option key={occupation} value={occupation}>
                    {occupation}
                  </option>
                ))}
              </select>
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="occupationDescription">Occupation Description</label>
              <textarea
                id="occupationDescription"
                className={styles.input}
                placeholder="Describe your occupation"
                value={localFormData.occupationDescription || ""}
                onChange={handleChange}
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="educationDescription">Education Description</label>
              <textarea
                id="educationDescription"
                className={styles.input}
                placeholder="Describe your education background"
                value={localFormData.educationDescription || ""}
                onChange={handleChange}
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="companyName">Company Name*</label>
              <input
                type="text"
                id="companyName"
                className={styles.input}
                placeholder="Company Name"
                value={localFormData.companyName || ""}
                onChange={handleChange}
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="residencyStatus">Residency Status</label>
              <input
                type="text"
                id="residencyStatus"
                className={styles.input}
                placeholder="e.g., Citizen, Permanent Resident"
                value={localFormData.residencyStatus || ""}
                onChange={handleChange}
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="annualIncome">Annual Income*</label>
              <select
                id="annualIncome"
                className={styles.input}
                value={localFormData.annualIncome}
                onChange={handleChange}
              >
                <option value="">- Please Select -</option>
                {annualIncomes.map((income) => (
                  <option key={income} value={income}>
                    {income}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Education;