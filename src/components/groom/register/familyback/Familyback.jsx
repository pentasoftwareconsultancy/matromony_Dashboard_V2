import React, { useState, useEffect } from "react";
import styles from "./Familyback.module.css";

const Familyback = ({ formData, setFormData, setIsFormValid }) => {
  const [localFormData, setLocalFormData] = useState(formData);

  useEffect(() => {
    setFormData(localFormData);
    
    if (typeof setIsFormValid === "function") {
      const isValid =
        localFormData.fatherName &&
        localFormData.fatherOccupation &&
        localFormData.motherName &&
        localFormData.motherOccupation &&
        localFormData.brothers &&
        localFormData.sisters &&
        localFormData.culturalValues &&
        localFormData.aboutFamily &&
        localFormData.motherTongue &&
        localFormData.religion &&
        localFormData.timeOfBirth &&
        localFormData.cityOfBirth &&
        localFormData.gotra &&
        localFormData.ras &&
        localFormData.gan &&
        localFormData.nadi &&
        localFormData.charan &&
        localFormData.partnerAgeFrom &&
        localFormData.partnerAgeTo &&
        localFormData.partnerEducation &&
        localFormData.partnerLocation &&
        localFormData.partnerPackage &&
        localFormData.partnerAbout;
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
      <h2 className={styles.title}>Family Background</h2>
      <form>
        <div className={styles.section}>
          <h3 className={styles.detail}>Family Details</h3>
          <div className={styles.personal}>
            <div className={styles.formGroup}>
              <label htmlFor="fatherName">Father Name*</label>
              <input type="text" id="fatherName" className={styles.input} placeholder="Enter Father's Name" value={localFormData.fatherName || ""} onChange={handleChange} />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="fatherOccupation">Father Occupation*</label>
              <input type="text" id="fatherOccupation" className={styles.input} placeholder="Enter Father's Occupation" value={localFormData.fatherOccupation || ""} onChange={handleChange} />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="motherName">Mother Name*</label>
              <input type="text" id="motherName" className={styles.input} placeholder="Enter Mother's Name" value={localFormData.motherName || ""} onChange={handleChange} />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="motherOccupation">Mother Occupation*</label>
              <input type="text" id="motherOccupation" className={styles.input} placeholder="Enter Mother's Occupation" value={localFormData.motherOccupation || ""} onChange={handleChange} />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="brothers">Number of Brothers*</label>
              <input type="number" id="brothers" className={styles.input} placeholder="Enter Number of Brothers" value={localFormData.brothers || ""} onChange={handleChange} />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="sisters">Number of Sisters*</label>
              <input type="number" id="sisters" className={styles.input} placeholder="Enter Number of Sisters" value={localFormData.sisters || ""} onChange={handleChange} />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="culturalValues">Cultural Values*</label>
              <input type="text" id="culturalValues" className={styles.input} placeholder="Enter Cultural Values" value={localFormData.culturalValues || ""} onChange={handleChange} />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="aboutFamily">About Family*</label>
              <textarea id="aboutFamily" className={styles.input} placeholder="Describe Your Family" value={localFormData.aboutFamily || ""} onChange={handleChange}></textarea>
            </div>
          </div>
        </div>

        <div className={styles.section}>
          <h3 className={styles.detail}>Astrological Details</h3>
          <div className={styles.mainsection}>
          <div className={styles.formGroup}>
              <label htmlFor="motherTongue">Mother Tongue*</label>
              <input type="text" id="motherTongue" className={styles.input} placeholder="Enter Mother Tongue" value={localFormData.motherTongue || ""} onChange={handleChange} />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="religion">Religion*</label>
              <input type="text" id="religion" className={styles.input} placeholder="Enter Religion" value={localFormData.religion || ""} onChange={handleChange} />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="timeOfBirth">Time of Birth*</label>
              <input type="text" id="timeOfBirth" className={styles.input} placeholder="Enter Time of Birth" value={localFormData.timeOfBirth || ""} onChange={handleChange} />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="cityOfBirth">City of Birth*</label>
              <input type="text" id="cityOfBirth" className={styles.input} placeholder="Enter City of Birth" value={localFormData.cityOfBirth || ""} onChange={handleChange} />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="gotra">Gotra</label>
              <input type="text" id="gotra" className={styles.input} value={localFormData.gotra || ""} onChange={handleChange} />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="ras">Ras</label>
              <input type="text" id="ras" className={styles.input} value={localFormData.ras || ""} onChange={handleChange} />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="gan">Gan</label>
              <input type="text" id="gan" className={styles.input} value={localFormData.gan || ""} onChange={handleChange} />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="nadi">Nadi</label>
              <input type="text" id="nadi" className={styles.input} value={localFormData.nadi || ""} onChange={handleChange} />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="charan">Charan</label>
              <input type="text" id="charan" className={styles.input} value={localFormData.charan || ""} onChange={handleChange} />
            </div>
          </div>
        </div>

       <div className={styles.section}>
          <h3 className={styles.detail}>Family Details</h3>
          <div className={styles.personal}>
            <div className={styles.formGroup}>
              <label htmlFor="partnerAgeFrom">Partner Age From*</label>
              <input type="number" id="partnerAgeFrom" className={styles.input} placeholder="Enter Age From" value={localFormData.partnerAgeFrom || ""} onChange={handleChange} />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="partnerAgeTo">Partner Age To*</label>
              <input type="number" id="partnerAgeTo" className={styles.input} placeholder="Enter Age To" value={localFormData.partnerAgeTo || ""} onChange={handleChange} />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="partnerEducation">Partner Education*</label>
              <input type="text" id="partnerEducation" className={styles.input} placeholder="Enter Education" value={localFormData.partnerEducation || ""} onChange={handleChange} />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="partnerLocation">Partner Location*</label>
              <input type="text" id="partnerLocation" className={styles.input} placeholder="Enter Location" value={localFormData.partnerLocation || ""} onChange={handleChange} />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="partnerPackage">Partner Package*</label>
              <input type="text" id="partnerPackage" className={styles.input} placeholder="Enter Package" value={localFormData.partnerPackage || ""} onChange={handleChange} />
            </div>
          
          </div>
          <div className={styles.formGroupmain}>
              <label htmlFor="partnerAbout">About Partner*</label>
              <textarea id="partnerAbout" className={styles.input} placeholder="Describe Partner" value={localFormData.partnerAbout || ""} onChange={handleChange}></textarea>
            </div>
        </div>
      </form>
    </div>
  );
};

export default Familyback;
