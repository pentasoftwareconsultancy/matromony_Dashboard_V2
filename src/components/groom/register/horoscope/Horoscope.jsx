import React, { useState, useEffect } from "react";
import styles from "./Horoscope.module.css";

const Horoscope = ({ formData, setFormData }) => {
  const [horoscopeData, setHoroscopeData] = useState(formData.horoscope || {});

  useEffect(() => {
    setHoroscopeData(formData.horoscope || {});
  }, [formData.horoscope]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setHoroscopeData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    setFormData((prevData) => ({
      ...prevData,
      horoscope: {
        ...prevData.horoscope,
        [name]: value,
      },
    }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (files.length > 0) {
      const file = files[0];

      // Update local horoscope state
      setHoroscopeData((prevData) => ({
        ...prevData,
        [name]: file,
      }));

      // Update main formData state
      setFormData((prevData) => ({
        ...prevData,
        [name]: file,
      }));
    }
  };

  return (
    <form className={styles.form}>
      <div className={styles.main}>
        <div className={styles.fieldGroup}>
          <label>Profile Photo*</label>
          <input type="file" name="profilePhoto" onChange={handleFileChange} className={styles.inputFile} />
          <span>{horoscopeData.profilePhoto ? horoscopeData.profilePhoto.name : "No file chosen"}</span>
        </div>

        <div className={styles.fieldGroup}>
          <label>PAN Card Number</label>
          <input type="text" name="panCardNumber" value={horoscopeData.panCardNumber || ""} onChange={handleInputChange} className={styles.inputText} />
        </div>

        <div className={styles.fieldGroup}>
          <label>Company ID</label>
          <input type="text" name="companyId" value={horoscopeData.companyId || ""} onChange={handleInputChange} className={styles.inputText} />
        </div>

        <div className={styles.fieldGroup}>
          <label>Aadhar Number</label>
          <input type="text" name="aadharNumber" value={horoscopeData.aadharNumber || ""} onChange={handleInputChange} className={styles.inputText} />
        </div>

        <div className={styles.fieldGroup}>
          <label>Aadhar Card Photo*</label>
          <input type="file" name="aadharPhoto" onChange={handleFileChange} className={styles.inputFile} />
          <span>{horoscopeData.aadharPhoto ? horoscopeData.aadharPhoto.name : "No file chosen"}</span>
        </div>

        <div className={styles.fieldGroup}>
          <label>Passport Number</label>
          <input type="text" name="passportNumber" value={horoscopeData.passportNumber || ""} onChange={handleInputChange} className={styles.inputText} />
        </div>

        <div className={styles.socialLinks}>
          <div className={styles.fieldGroup}>
            <label>Facebook Profile Link</label>
            <input type="text" name="socialFacebook" value={horoscopeData.socialFacebook || ""} onChange={handleInputChange} className={styles.inputText} />
          </div>

          <div className={styles.fieldGroup}>
            <label>Instagram Profile Link</label>
            <input type="text" name="socialInstagram" value={horoscopeData.socialInstagram || ""} onChange={handleInputChange} className={styles.inputText} />
          </div>

          <div className={styles.fieldGroup}>
            <label>LinkedIn Profile Link</label>
            <input type="text" name="socialLinkedIn" value={horoscopeData.socialLinkedIn || ""} onChange={handleInputChange} className={styles.inputText} />
          </div>
        </div>
      </div>
    </form>
  );
};

export default Horoscope;
