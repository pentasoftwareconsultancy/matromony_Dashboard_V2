import React, { useEffect, useState } from "react";
import styles from "./Profile.module.css";

const initialFormData = {
  fullName: "",
  email: "",
  mobileNumber: "",
  password: "",
  dateOfBirth: "",
  country: "",
  state: "",
  city: "",
  gender: "",
};

const config = {
  cUrl: "https://api.countrystatecity.in/v1/countries",
  ckey: "NHhvOEcyWk50N2Vna3VFTE00bFp3MjFKR0ZEOUhkZlg4RTk1MlJlaA==",
};

const Profile = ({ formData, setFormData, setIsFormValid }) => {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch(config.cUrl, {
          headers: { "X-CSCAPI-KEY": config.ckey },
        });
        const data = await response.json();
        setCountries(data);
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };
    fetchCountries();
    
  }, []);

  useEffect(() => {
    if (formData.country) {
      const fetchStates = async () => {
        try {
          const response = await fetch(`${config.cUrl}/${formData.country}/states`, {
            headers: { "X-CSCAPI-KEY": config.ckey },
          });
          const data = await response.json();
  
          if (Array.isArray(data)) {
            setStates(data);
          } else {
            setStates([]); // If response is not an array, set an empty array
          }
        } catch (error) {
          console.error("Error fetching states:", error);
          setStates([]); // Reset states to an empty array in case of an error
        }
      };
      fetchStates();
    } else {
      setStates([]); // Reset when country is deselected
    }
  }, [formData.country]);
  

useEffect(() => {
  if (formData.state) {
    const fetchCities = async () => {
      try {
        const response = await fetch(`${config.cUrl}/${formData.country}/states/${formData.state}/cities`, {
          headers: { "X-CSCAPI-KEY": config.ckey },
        });
        const data = await response.json();

        if (Array.isArray(data)) {
          setCities(data);
        } else {
          setCities([]); // Ensure cities is always an array
        }
      } catch (error) {
        console.error("Error fetching cities:", error);
        setCities([]);
      }
    };
    fetchCities();
  } else {
    setCities([]);
  }
}, [formData.state]);

  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const requiredFields = [
      "fullName", "email", "mobileNumber", "password", "dateOfBirth", "country", "state", "city", "gender"
    ];
    const isValid = requiredFields.every(field => formData[field]);
    if (typeof setIsFormValid === "function") {
      setIsFormValid(isValid);
    }
  };

  useEffect(() => {
    validateForm();
  }, [formData]);

  return (
    <div className={styles.container}>
       <h2 className={styles.title}>Bride/Groom Registration</h2>
      <form className={styles.form}>
       
        <p className={styles.subtitle}>Complete your profile to start your journey!</p>

        <div className={styles.row}>
          <div className={styles.inputGroup}>
            <label>Full Name*</label>
            <input className={styles.fullName} type="text" name="fullName" value={formData.fullName} onChange={handleInputChange} />
          </div>
          <div className={styles.inputGroup}>
            <label>Email Address*</label>
            <input type="email" name="email" value={formData.email} onChange={handleInputChange} />
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.inputGroup}>
            <label>Mobile Number*</label>
            <input type="tel" name="mobileNumber" value={formData.mobileNumber} onChange={handleInputChange} />
          </div>
          <div className={styles.inputGroup}>
            <label>Password* (min 6 characters)</label>
            <input type="password" name="password" value={formData.password} onChange={handleInputChange} />
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.inputGroup}>
            <label>Date of Birth*</label>
            <input type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleInputChange} />
          </div>
          <div className={styles.inputGroup}>
            <label>Country*</label>
            <select name="country" value={formData.country} onChange={handleInputChange}>
              <option value="">-- Select Country --</option>
              {countries.map((country) => (
                <option key={country.iso2} value={country.iso2}>{country.name}</option>
              ))}
            </select>
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.inputGroup}>
            <label>State*</label>
            <select name="state" value={formData.state} onChange={handleInputChange}>
              <option value="">-- Select State --</option>
              {states.map((state) => (
                <option key={state.iso2} value={state.iso2}>{state.name}</option>
              ))}
            </select>
          </div>
          <div className={styles.inputGroup}>
            <label>City*</label>
            <select name="city" value={formData.city} onChange={handleInputChange}>
              <option value="">-- Select City --</option>
              {cities.map((city) => (
                <option key={city.id} value={city.name}>{city.name}</option>
              ))}
            </select>
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.inputGroup}>
            <label>Gender*</label>
            <select name="gender" value={formData.gender} onChange={handleInputChange}>
              <option value="">-- Select Gender --</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Profile;
