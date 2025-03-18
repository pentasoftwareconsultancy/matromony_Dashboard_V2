import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import styles from "./Step.module.css";
import Profile from "../profile/Profile";
import FamilyBackground from "../familyback/Familyback";
import Education from "../education/Education";
import Horoscope from "../horoscope/Horoscope";

const Stepmain = () => {
  const navigate = useNavigate(); // Initialize navigation
  const [currentStep, setCurrentStep] = useState(1);

  const initialFormData = {
    fullName: "",
    email: "",
    mobileNumber: "",
    password: "",
    dateOfBirth: "",
    city: "",
    gender: "", // To check whether to go to Groom or Bride page
    maritalStatus: "",
    height: "",
    bodyType: "",
    complexion: "",
    bloodGroup: "",
    educationLevel: "",
    educationField: "",
    occupation: "",
    annualIncome: "",
    fatherName: "",
    motherName: "",
    brothers: "",
    sisters: "",
    religion: "",
    isManglik: false,
    partnerAgeFrom: "",
    partnerAgeTo: "",
    partnerEducation: "",
    partnerLocation: "",
    partnerPackage: "",
    partnerAbout: "",
    profilePhoto: "",
    aadharNumber: "",
    aadharPhoto: "",
    isApproved: false, // By default, user is not approved
  };

  const [formData, setFormData] = useState(() => {
    const savedData = localStorage.getItem("formData");
    return savedData ? JSON.parse(savedData) : initialFormData;
  });

  useEffect(() => {
    localStorage.setItem("formData", JSON.stringify(formData));
  }, [formData]);

  const validateForm = () => {
    for (const key in formData) {
      if (typeof formData[key] === "string" && formData[key].trim() === "") {
        console.log(`❌ Empty field found: ${key}`);
        return false;
      }
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      alert("⚠️ Please complete all steps before submitting.");
      return;
    }

    const formDataToSend = new FormData();

    // Append non-file fields
    Object.entries(formData).forEach(([key, value]) => {
      if (value && key !== "profilePhoto" && key !== "aadharPhoto") {
        formDataToSend.append(key, value);
      }
    });

    // Append file fields
    if (formData.profilePhoto instanceof File) {
      formDataToSend.append("profilePhoto", formData.profilePhoto);
    } else {
      console.warn("⚠️ Profile Photo is missing or not a valid File object");
    }

    if (formData.aadharPhoto instanceof File) {
      formDataToSend.append("aadharPhoto", formData.aadharPhoto);
    } else {
      console.warn("⚠️ Aadhar Photo is missing or not a valid File object");
    }

    try {
      const response = await fetch("http://localhost:8000/api/v1/bride-groom/create", {
        method: "POST",
        body: formDataToSend,
      });

      const responseText = await response.text(); // Read response as text
      
      if (!response.ok) {
        throw new Error(`Server responded with ${response.status}: ${responseText}`);
      }

      const result = JSON.parse(responseText);
      alert("🎉 Registration successful!");

      // Redirect based on gender
      if (formData.gender.toLowerCase() === "male") {
        navigate("/Groommain");
      } else if (formData.gender.toLowerCase() === "female") {
        navigate("/bridemain");
      } else {
        alert("⚠️ Invalid gender selection. Please check your input.");
      }
    } catch (error) {
      console.error("❌ Submission failed:", error);
      alert("❌ Submission failed: " + error.message);
    }
  };

  const steps = [
    { id: 1, label: "1", component: <Profile formData={formData} setFormData={setFormData} /> },
    { id: 2, label: "2", component: <Education formData={formData} setFormData={setFormData} /> },
    { id: 3, label: "3", component: <FamilyBackground formData={formData} setFormData={setFormData} /> },
    { id: 4, label: "4", component: <Horoscope formData={formData} setFormData={setFormData} /> },
  ];

  return (
    <div className={styles.stepContainer}>
      <div className={styles.stepBar}>
        {steps.map((step) => (
          <div
            key={step.id}
            className={`${styles.step} ${currentStep === step.id ? styles.active : ""}`}
            onClick={() => setCurrentStep(step.id)}
          >
            {currentStep === step.id ? "⭐" : "☆"} {step.label}
          </div>
        ))}
      </div>
      <div className={styles.stepContent}>
        {steps.find((step) => step.id === currentStep)?.component}
      </div>
      <div className={styles.stepActions}>
        <button className={styles.previous} onClick={() => setCurrentStep(currentStep - 1)} disabled={currentStep === 1}>
          Previous
        </button>
        {currentStep === steps.length ? (
          <button className={styles.submit} onClick={handleSubmit}>
            Submit
          </button>
        ) : (
          <button className={styles.next} onClick={() => setCurrentStep(currentStep + 1)}>
            Next
          </button>
        )}
      </div>
    </div>
  );
};

export default Stepmain;
