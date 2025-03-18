import React, { useState, useEffect } from "react";
import styles from "./Groomregistration.module.css";

const Groomregistration = ({ onChange, formErrors }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    mobileNumber: "",
    dateOfBirth: "",
    city: "",
    gender: "",
    profilePhoto: "",
  });

  useEffect(() => {
    onChange(formData); // Call onChange prop to pass updated data to parent
  }, [formData, onChange]);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      setFormData((prevState) => ({
        ...prevState,
        [name]: files[0], // Handle file input
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  return (
    <div className={styles.form}>
      <label>Full Name</label>
      <input
        type="text"
        name="fullName"
        value={formData.fullName}
        onChange={handleChange}
        required
        className={formErrors?.fullName ? styles.error : ""}
      />
      {formErrors?.fullName && <span className={styles.errorText}>Full Name is required</span>}

      <label>Email</label>
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        required
        className={formErrors?.email ? styles.error : ""}
      />
      {formErrors?.email && <span className={styles.errorText}>Email is required</span>}

      <label>Mobile Number</label>
      <input
        type="text"
        name="mobileNumber"
        value={formData.mobileNumber}
        onChange={handleChange}
        required
        className={formErrors?.mobileNumber ? styles.error : ""}
      />
      {formErrors?.mobileNumber && <span className={styles.errorText}>Mobile Number is required</span>}

      <label>Date of Birth</label>
      <input
        type="date"
        name="dateOfBirth"
        value={formData.dateOfBirth}
        onChange={handleChange}
        required
        className={formErrors?.dateOfBirth ? styles.error : ""}
      />
      {formErrors?.dateOfBirth && <span className={styles.errorText}>Date of Birth is required</span>}

      <label>City</label>
      <input
        type="text"
        name="city"
        value={formData.city}
        onChange={handleChange}
        required
        className={formErrors?.city ? styles.error : ""}
      />
      {formErrors?.city && <span className={styles.errorText}>City is required</span>}

      <label>Gender</label>
      <select
        name="gender"
        value={formData.gender}
        onChange={handleChange}
        className={formErrors?.gender ? styles.error : ""}
      >
        <option value="">Select...</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
      </select>
      {formErrors?.gender && <span className={styles.errorText}>Gender is required</span>}

      <label>Profile Photo</label>
      <input
        type="file"
        name="profilePhoto"
        onChange={handleChange}
        accept="image/*"
        className={formErrors?.profilePhoto ? styles.error : ""}
      />
      {formErrors?.profilePhoto && <span className={styles.errorText}>Profile Photo is required</span>}
    </div>
  );
};

export default Groomregistration;
