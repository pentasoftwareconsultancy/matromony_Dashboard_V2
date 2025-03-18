import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import styles from "./Addgroom.module.css"; // Your CSS module for styling

const AddGroom = () => {
  const config = {
    cUrl: "https://api.countrystatecity.in/v1/countries",
    ckey: "NHhvOEcyWk50N2Vna3VFTE00bFp3MjFKR0ZEOUhkZlg4RTk1MlJlaA==",
  };

  const formik = useFormik({
    initialValues: {
      fullName: "",
      email: "",
      mobileNumber: "",
      password: "",
      dateOfBirth: "",
      country: "",
      state: "",
      city: "",
      gender: "",
      maritalStatus: "",
      bloodGroup: "",
      isManglik: false,
      specialCase: "",
      height: "",
      weight: "",
      educationLevel: "",
      educationField: "",
      occupation: "",
      annualIncome: "",
      partnerAgeFrom: "",
      partnerAgeTo: "",
      partnerEducation: "",
      partnerLocation: "",
      smoke: false, // Added smoke checkbox
    },
    validationSchema: Yup.object({
      fullName: Yup.string().required("Full name is required"),
      email: Yup.string().email("Invalid email format").required("Email is required"),
      mobileNumber: Yup.string().matches(/^\d{10}$/, "Mobile number must be 10 digits").required("Mobile number is required"),
      country: Yup.string().required("Country is required"),
      state: Yup.string().required("State is required"),
      city: Yup.string().required("City is required"),
      gender: Yup.string().required("Gender is required"),
      maritalStatus: Yup.string().required("Marital status is required"),
      bloodGroup: Yup.string().required("Blood group is required"),
      height: Yup.string().required("Height is required"),
      weight: Yup.string().required("Weight is required"),
      educationLevel: Yup.string().required("Education level is required"),
      occupation: Yup.string().required("Occupation is required"),
      annualIncome: Yup.string().required("Annual income is required"),
      partnerAgeFrom: Yup.number().required("Partner age range is required"),
      partnerAgeTo: Yup.number().required("Partner age range is required"),
    }),
    onSubmit: (values) => {
      console.log("Form Data Submitted:", values);
    },
  });

  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [profileImage, setProfileImage] = useState(null);

  useEffect(() => {
    fetch(config.cUrl, {
      headers: { "X-CSCAPI-KEY": config.ckey },
    })
      .then((response) => response.json())
      .then((data) => setCountries(data))
      .catch((error) => console.error("Error loading countries:", error));
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
        formik.setFieldValue("profilePhoto", reader.result); // Save the base64 image to formik's value
      };
      reader.readAsDataURL(file);
    }
  };
  useEffect(() => {
    if (formik.values.country) {
      fetch(`${config.cUrl}/${formik.values.country}/states`, {
        headers: { "X-CSCAPI-KEY": config.ckey },
      })
        .then((response) => response.json())
        .then((data) => setStates(data))
        .catch((error) => console.error("Error loading states:", error));
    } else {
      setStates([]);
      setCities([]);
    }
  }, [formik.values.country]);

  useEffect(() => {
    if (formik.values.country && formik.values.state) {
      fetch(`${config.cUrl}/${formik.values.country}/states/${formik.values.state}/cities`, {
        headers: { "X-CSCAPI-KEY": config.ckey },
      })
        .then((response) => response.json())
        .then((data) => setCities(data))
        .catch((error) => console.error("Error loading cities:", error));
    } else {
      setCities([]);
    }
  }, [formik.values.country, formik.values.state]);

  return (
    <form className={styles.formContainer} onSubmit={formik.handleSubmit}>
      <h2>Add Groom</h2>

      {/* Full Name */}
      <div className={styles.inputGroup}>
        <label>Full Name:</label>
        <input
          type="text"
          name="fullName"
          value={formik.values.fullName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          required
        />
        {formik.touched.fullName && formik.errors.fullName ? (
          <div className={styles.error}>{formik.errors.fullName}</div>
        ) : null}
      </div>

      {/* Email */}
      <div className={styles.inputGroup}>
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          required
        />
        {formik.touched.email && formik.errors.email ? (
          <div className={styles.error}>{formik.errors.email}</div>
        ) : null}
      </div>
 
      {/* Profile Photo Upload */}
      <div className={styles.inputGroup}>
        <label>Profile Photo:</label>
        <input
          type="file"
          name="profilePhoto"
          onChange={handleImageChange}
          accept="image/*"
        />
        {profileImage && (
          <div className={styles.imagePreview}>
            <img src={profileImage} alt="Profile Preview" />
          </div>
        )}
        {formik.touched.profilePhoto && formik.errors.profilePhoto && (
          <div className={styles.error}>{formik.errors.profilePhoto}</div>
        )}
      </div>
      {/* Country */}
      <div className={styles.inputGroup}>
        <label>Country:</label>
        <select
          name="country"
          value={formik.values.country}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          required
        >
          <option value="">Select Country</option>
          {countries.map((country) => (
            <option key={country.iso2} value={country.iso2}>
              {country.name}
            </option>
          ))}
        </select>
        {formik.touched.country && formik.errors.country ? (
          <div className={styles.error}>{formik.errors.country}</div>
        ) : null}
      </div>

      {/* State */}
      <div className={styles.inputGroup}>
        <label>State:</label>
        <select
          name="state"
          value={formik.values.state}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          required
        >
          <option value="">Select State</option>
          {states.map((state) => (
            <option key={state.iso2} value={state.iso2}>
              {state.name}
            </option>
          ))}
        </select>
        {formik.touched.state && formik.errors.state ? (
          <div className={styles.error}>{formik.errors.state}</div>
        ) : null}
      </div>

      {/* City */}
      <div className={styles.inputGroup}>
        <label>City:</label>
        <select
          name="city"
          value={formik.values.city}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          required
        >
          <option value="">Select City</option>
          {cities.map((city) => (
            <option key={city.name} value={city.name}>
              {city.name}
            </option>
          ))}
        </select>
        {formik.touched.city && formik.errors.city ? (
          <div className={styles.error}>{formik.errors.city}</div>
        ) : null}
      </div>

      {/* Gender */}
      <div className={styles.inputGroup}>
        <label>Gender:</label>
        <select
          name="gender"
          value={formik.values.gender}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          required
        >
          <option value="">Select</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
        {formik.touched.gender && formik.errors.gender ? (
          <div className={styles.error}>{formik.errors.gender}</div>
        ) : null}
      </div>

      {/* Education Level */}
      <div className={styles.inputGroup}>
        <label>Education Level:</label>
        <input
          type="text"
          name="educationLevel"
          value={formik.values.educationLevel}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          required
        />
        {formik.touched.educationLevel && formik.errors.educationLevel ? (
          <div className={styles.error}>{formik.errors.educationLevel}</div>
        ) : null}
      </div>

      {/* Education Field */}
      <div className={styles.inputGroup}>
        <label>Education Field:</label>
        <input
          type="text"
          name="educationField"
          value={formik.values.educationField}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          required
        />
        {formik.touched.educationField && formik.errors.educationField ? (
          <div className={styles.error}>{formik.errors.educationField}</div>
        ) : null}
      </div>

      {/* Education Description */}
      <div className={styles.inputGroup}>
        <label>Education Description:</label>
        <textarea
          name="educationDescription"
          value={formik.values.educationDescription}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
      </div>

      {/* Occupation */}
      <div className={styles.inputGroup}>
        <label>Occupation:</label>
        <input
          type="text"
          name="occupation"
          value={formik.values.occupation}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          required
        />
        {formik.touched.occupation && formik.errors.occupation ? (
          <div className={styles.error}>{formik.errors.occupation}</div>
        ) : null}
      </div>

      {/* Occupation Description */}
      <div className={styles.inputGroup}>
        <label>Occupation Description:</label>
        <textarea
          name="occupationDescription"
          value={formik.values.occupationDescription}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
      </div>

      {/* Company Name */}
      <div className={styles.inputGroup}>
        <label>Company Name:</label>
        <input
          type="text"
          name="companyName"
          value={formik.values.companyName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          required
        />
      </div>

      {/* Residency Status */}
      <div className={styles.inputGroup}>
        <label>Residency Status:</label>
        <input
          type="text"
          name="residencyStatus"
          value={formik.values.residencyStatus}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          required
        />
      </div>

      {/* Annual Income */}
      <div className={styles.inputGroup}>
        <label>Annual Income:</label>
        <input
          type="text"
          name="annualIncome"
          value={formik.values.annualIncome}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          required
        />
      </div>
      {/* Marital Status */}
      <div className={styles.inputGroup}>
        <label>Marital Status:</label>
        <select
          name="maritalStatus"
          value={formik.values.maritalStatus}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        >
          <option value="">Select</option>
          <option value="Single">Single</option>
          <option value="Divorced">Divorced</option>
          <option value="Widowed">Widowed</option>
        </select>
        {formik.touched.maritalStatus && formik.errors.maritalStatus ? (
          <div className={styles.error}>{formik.errors.maritalStatus}</div>
        ) : null}
      </div>

      {/* Smoke */}
      <div className={styles.inputGroup}>
        <label>Smoke:</label>
        <input
          type="checkbox"
          name="smoke"
          checked={formik.values.smoke}
          onChange={formik.handleChange}
        />
      </div>

      {/* Special Case */}
      <div className={styles.inputGroup}>
        <label>Special Case:</label>
        <select
          name="specialCase"
          value={formik.values.specialCase}
          onChange={formik.handleChange}
        >
          <option value="">Select</option>
          <option value="None">None</option>
          <option value="Disability">Disability</option>
          <option value="Other">Other</option>
        </select>
      </div>

      {/* Blood Group */}
      <div className={styles.inputGroup}>
        <label>Blood Group:</label>
        <select
          name="bloodGroup"
          value={formik.values.bloodGroup}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        >
          <option value="">Select</option>
          <option value="A+">A+</option>
          <option value="A-">A-</option>
          <option value="B+">B+</option>
          <option value="B-">B-</option>
          <option value="O+">O+</option>
          <option value="O-">O-</option>
          <option value="AB+">AB+</option>
          <option value="AB-">AB-</option>
        </select>
        {formik.touched.bloodGroup && formik.errors.bloodGroup ? (
          <div className={styles.error}>{formik.errors.bloodGroup}</div>
        ) : null}
      </div>

      {/* Height */}
      <div className={styles.inputGroup}>
        <label>Height:</label>
        <input
          type="text"
          name="height"
          value={formik.values.height}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.height && formik.errors.height ? (
          <div className={styles.error}>{formik.errors.height}</div>
        ) : null}
      </div>

      {/* Weight */}
      <div className={styles.inputGroup}>
        <label>Weight:</label>
        <input
          type="text"
          name="weight"
          value={formik.values.weight}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.weight && formik.errors.weight ? (
          <div className={styles.error}>{formik.errors.weight}</div>
        ) : null}
      </div>

      {/* Education Level */}
      <div className={styles.inputGroup}>
        <label>Education Level:</label>
        <input
          type="text"
          name="educationLevel"
          value={formik.values.educationLevel}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.educationLevel && formik.errors.educationLevel ? (
          <div className={styles.error}>{formik.errors.educationLevel}</div>
        ) : null}
      </div>

      {/* Occupation */}
      <div className={styles.inputGroup}>
        <label>Occupation:</label>
        <input
          type="text"
          name="occupation"
          value={formik.values.occupation}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.occupation && formik.errors.occupation ? (
          <div className={styles.error}>{formik.errors.occupation}</div>
        ) : null}
      </div>




      {/* Other Personal Information Fields... */}

      {/* Family Information */}
      <div className={styles.inputGroup}>
        <label>Father's Name:</label>
        <input
          type="text"
          name="fatherName"
          value={formik.values.fatherName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.fatherName && formik.errors.fatherName && (
          <div className={styles.error}>{formik.errors.fatherName}</div>
        )}
      </div>

      <div className={styles.inputGroup}>
        <label>Father's Occupation:</label>
        <input
          type="text"
          name="fatherOccupation"
          value={formik.values.fatherOccupation}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.fatherOccupation && formik.errors.fatherOccupation && (
          <div className={styles.error}>{formik.errors.fatherOccupation}</div>
        )}
      </div>

      <div className={styles.inputGroup}>
        <label>Mother's Name:</label>
        <input
          type="text"
          name="motherName"
          value={formik.values.motherName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.motherName && formik.errors.motherName && (
          <div className={styles.error}>{formik.errors.motherName}</div>
        )}
      </div>

      <div className={styles.inputGroup}>
        <label>Mother's Occupation:</label>
        <input
          type="text"
          name="motherOccupation"
          value={formik.values.motherOccupation}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.motherOccupation && formik.errors.motherOccupation && (
          <div className={styles.error}>{formik.errors.motherOccupation}</div>
        )}
      </div>

      {/* Brothers and Sisters */}
      <div className={styles.inputGroup}>
        <label>Brothers:</label>
        <input
          type="number"
          name="brothers"
          value={formik.values.brothers}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
      </div>

      <div className={styles.inputGroup}>
        <label>Sisters:</label>
        <input
          type="number"
          name="sisters"
          value={formik.values.sisters}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
      </div>

      <div className={styles.inputGroup}>
        <label>Cultural Values:</label>
        <input
          type="text"
          name="culturalValues"
          value={formik.values.culturalValues}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.culturalValues && formik.errors.culturalValues && (
          <div className={styles.error}>{formik.errors.culturalValues}</div>
        )}
      </div>

      <div className={styles.inputGroup}>
        <label>About Family:</label>
        <textarea
          name="aboutFamily"
          value={formik.values.aboutFamily}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.aboutFamily && formik.errors.aboutFamily && (
          <div className={styles.error}>{formik.errors.aboutFamily}</div>
        )}
      </div>

      {/* Astrology Details */}
      <div className={styles.inputGroup}>
        <label>Mother Tongue:</label>
        <input
          type="text"
          name="motherTongue"
          value={formik.values.motherTongue}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
      </div>

      <div className={styles.inputGroup}>
        <label>Religion:</label>
        <input
          type="text"
          name="religion"
          value={formik.values.religion}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
      </div>


      <div className={styles.inputGroup}>
        <label>Time of Birth:</label>
        <input
          type="text"
          name="timeOfBirth"
          value={formik.values.timeOfBirth}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.timeOfBirth && formik.errors.timeOfBirth && (
          <div className={styles.error}>{formik.errors.timeOfBirth}</div>
        )}
      </div>

      <div className={styles.inputGroup}>
        <label>City of Birth:</label>
        <input
          type="text"
          name="cityOfBirth"
          value={formik.values.cityOfBirth}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.cityOfBirth && formik.errors.cityOfBirth && (
          <div className={styles.error}>{formik.errors.cityOfBirth}</div>
        )}
      </div>

      <div className={styles.inputGroup}>
        <label>Gotra:</label>
        <input
          type="text"
          name="gotra"
          value={formik.values.gotra}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.gotra && formik.errors.gotra && (
          <div className={styles.error}>{formik.errors.gotra}</div>
        )}
      </div>

      <div className={styles.inputGroup}>
        <label>Ras:</label>
        <input
          type="text"
          name="ras"
          value={formik.values.ras}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.ras && formik.errors.ras && (
          <div className={styles.error}>{formik.errors.ras}</div>
        )}
      </div>

      <div className={styles.inputGroup}>
        <label>Gan:</label>
        <input
          type="text"
          name="gan"
          value={formik.values.gan}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.gan && formik.errors.gan && (
          <div className={styles.error}>{formik.errors.gan}</div>
        )}
      </div>

      <div className={styles.inputGroup}>
        <label>Nadi:</label>
        <input
          type="text"
          name="nadi"
          value={formik.values.nadi}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.nadi && formik.errors.nadi && (
          <div className={styles.error}>{formik.errors.nadi}</div>
        )}
      </div>

      <div className={styles.inputGroup}>
        <label>Charan:</label>
        <input
          type="text"
          name="charan"
          value={formik.values.charan}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.charan && formik.errors.charan && (
          <div className={styles.error}>{formik.errors.charan}</div>
        )}
      </div>

      {/* Annual Income */}
      <div className={styles.inputGroup}>
        <label>Annual Income:</label>
        <input
          type="text"
          name="annualIncome"
          value={formik.values.annualIncome}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.annualIncome && formik.errors.annualIncome ? (
          <div className={styles.error}>{formik.errors.annualIncome}</div>
        ) : null}
      </div>

      {/* Partner Age Range */}
      <div className={styles.inputGroup}>
        <label>Partner Age From:</label>
        <input
          type="number"
          name="partnerAgeFrom"
          value={formik.values.partnerAgeFrom}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.partnerAgeFrom && formik.errors.partnerAgeFrom ? (
          <div className={styles.error}>{formik.errors.partnerAgeFrom}</div>
        ) : null}
      </div>

      <div className={styles.inputGroup}>
        <label>Partner Age To:</label>
        <input
          type="number"
          name="partnerAgeTo"
          value={formik.values.partnerAgeTo}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.partnerAgeTo && formik.errors.partnerAgeTo ? (
          <div className={styles.error}>{formik.errors.partnerAgeTo}</div>
        ) : null}
      </div>
  {/* Social Media Links */}
  <div className={styles.inputGroup}>
        <label>Facebook:</label>
        <input
          type="text"
          name="socialFacebook"
          value={formik.values.socialFacebook}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.socialFacebook && formik.errors.socialFacebook && (
          <div className={styles.error}>{formik.errors.socialFacebook}</div>
        )}
      </div>

      <div className={styles.inputGroup}>
        <label>Instagram:</label>
        <input
          type="text"
          name="socialInstagram"
          value={formik.values.socialInstagram}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.socialInstagram && formik.errors.socialInstagram && (
          <div className={styles.error}>{formik.errors.socialInstagram}</div>
        )}
      </div>

      <div className={styles.inputGroup}>
        <label>LinkedIn:</label>
        <input
          type="text"
          name="socialLinkedIn"
          value={formik.values.socialLinkedIn}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.socialLinkedIn && formik.errors.socialLinkedIn && (
          <div className={styles.error}>{formik.errors.socialLinkedIn}</div>
        )}
      </div>
      <div className={styles.submitBtn}>
        <button type="submit">Submit</button>
      </div>
    </form>
  );
};

export default AddGroom;
