import React, { useState, useEffect } from "react";
import styles from "./Education.module.css";

const Education = ({ formData, setFormData, setIsFormValid }) => {
  const [localFormData, setLocalFormData] = useState(formData);

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
    setLocalFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  return (
    <div className={styles.formContainer}>
      <h2 className={styles.title}>Create Profile</h2>
      <form>
        <div className={styles.section}>
          <h3 className={styles.detail}>Personal Details</h3>
          <div className={styles.personal}>
            <div className={styles.formGroup}>
              <label htmlFor="maritalStatus">Marital Status*</label>
              <select id="maritalStatus" className={styles.input} value={localFormData.maritalStatus || ""} onChange={handleChange}>
                <option>- Please Select -</option>
                <option>Single</option>
                <option>Married</option>
              </select>
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="noOfChildren">No. of Children</label>
              <select id="noOfChildren" className={styles.input} value={localFormData.noOfChildren || ""} onChange={handleChange}>
                <option>- Please Select -</option>
                <option>0</option>
                <option>1</option>
                <option>2</option>
              </select>
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="height">Height*</label>
              <input type="text" id="height" className={styles.input} placeholder="Enter Height" value={localFormData.height || ""} onChange={handleChange} />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="bodyType">Body Type*</label>
              <select id="bodyType" className={styles.input} value={localFormData.bodyType || ""} onChange={handleChange}>
                <option>- Please Select -</option>
                <option>Slim</option>
                <option>Athletic</option>
              </select>
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="weight">Weight</label>
              <input type="text" id="weight" className={styles.input} placeholder="Enter Weight (kg)" value={localFormData.weight || ""} onChange={handleChange} />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="complexion">Complexion*</label>
              <select id="complexion" className={styles.input} value={localFormData.complexion || ""} onChange={handleChange}>
                <option>- Please Select -</option>
                <option>Fair</option>
                <option>Wheatish</option>
                <option>Dark</option>
              </select>
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="bloodGroup">Blood Group*</label>
              <select id="bloodGroup" className={styles.input} value={localFormData.bloodGroup || ""} onChange={handleChange}>
                <option>- Please Select -</option>
                <option>A+</option>
                <option>B+</option>
              </select>
            </div>
          </div>
        </div>

        <div className={styles.section}>
          <h3 className={styles.detail}>Education and Career</h3>
          <div className={styles.mainsection}>
            <div className={styles.formGroup}>
              <label htmlFor="educationLevel">Education Level*</label>
              <select id="educationLevel" className={styles.input} value={localFormData.educationLevel || ""} onChange={handleChange}>
                <option>- Please Select -</option>
                <option>Bachelor's</option>
                <option>Master's</option>
              </select>
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="educationField">Education Field*</label>
              <select id="educationField" className={styles.input} value={localFormData.educationField || ""} onChange={handleChange}>
                <option>- Please Select -</option>
                <option>Engineering</option>
                <option>Medicine</option>
              </select>
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="occupation">Occupation*</label>
              <select id="occupation" className={styles.input} value={localFormData.occupation || ""} onChange={handleChange}>
                <option>- Please Select -</option>
                <option>Engineer</option>
                <option>Doctor</option>
              </select>
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="companyName">Company Name*</label>
              <input type="text" id="companyName" className={styles.input} placeholder="Company Name" value={localFormData.companyName || ""} onChange={handleChange} />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="annualIncome">Annual Income*</label>
              <select id="annualIncome" className={styles.input} value={localFormData.annualIncome || ""} onChange={handleChange}>
                <option>- Please Select -</option>
                <option>Below $50k</option>
                <option>$50k-$100k</option>
              </select>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Education;
