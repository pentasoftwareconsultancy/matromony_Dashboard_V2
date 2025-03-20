import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Step.module.css";
import Profile from "../profile/Profile";
import FamilyBackground from "../familyback/Familyback";
import Education from "../education/Education";
import Horoscope from "../horoscope/Horoscope";

const Stepmain = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);

  const initialFormData = {
    fullName: "",
    email: "",
    mobileNumber: "",
    password: "",
    dateOfBirth: "",
    city: "",
    gender: "",
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
    isApproved: false,
  };

  // State to store form data
  const [formData, setFormData] = useState(() => {
    const savedData = localStorage.getItem("formData");
    return savedData ? JSON.parse(savedData) : initialFormData;
  });

  // State to track which steps are validated and complete
  const [completedSteps, setCompletedSteps] = useState([]);

  // Save form data to localStorage
  useEffect(() => {
    localStorage.setItem("formData", JSON.stringify(formData));
  }, [formData]);

  // Validate each step to allow marking as complete
  const validateStep = (stepId) => {
    switch (stepId) {
      case 1:
        return formData.fullName && formData.email && formData.mobileNumber;
      case 2:
        return formData.educationLevel && formData.educationField;
      case 3:
        return formData.fatherName && formData.motherName;
      case 4:
        return formData.religion && formData.isManglik !== "";
      default:
        return false;
    }
  };

  // Handle next step and mark step as complete if valid
  const handleNext = () => {
    if (validateStep(currentStep)) {
      if (!completedSteps.includes(currentStep)) {
        setCompletedSteps((prev) => [...prev, currentStep]);
      }
      setCurrentStep((prev) => prev + 1);
    } else {
      alert("⚠️ Please complete the current step before proceeding.");
    }
  };

  // Handle going to the previous step
  const handlePrevious = () => {
    setCurrentStep((prev) => prev - 1);
  };

  // Array of steps with respective components
  const steps = [
    {
      id: 1,
      label: "1",
      title: "Profile",
      component: <Profile formData={formData} setFormData={setFormData} />,
    },
    {
      id: 2,
      label: "2",
      title: "Education",
      component: <Education formData={formData} setFormData={setFormData} />,
    },
    {
      id: 3,
      label: "3",
      title: "Family",
      component: (
        <FamilyBackground formData={formData} setFormData={setFormData} />
      ),
    },
    {
      id: 4,
      label: "4",
      title: "Document",
      component: <Horoscope formData={formData} setFormData={setFormData} />,
    },
  ];


  return (
    <div className={styles.stepContainer}>
      {/* Step bar with connected steps */}
      <div className={styles.stepBar}>
        {steps.map((step, index) => (
          <div key={step.id} className={styles.stepWrapper}>
            {/* Step Title Added Here */}

            <div className={styles.numTitle}>
              <div className={styles.stepTitle}>{step.title}</div>

              {/* Step Number/Indicator */}
              <div
                className={`${styles.step} ${currentStep === step.id ? styles.active : ""
                  } ${completedSteps.includes(step.id) ? styles.completed : ""}`}
                onClick={() => setCurrentStep(step.id)}
              >
                {completedSteps.includes(step.id) ? "✅" : step.label}
              </div>
            </div>

            {/* Progress Line */}
            {index < steps.length - 1 && (
              <div
                className={`${styles.progressLine} ${completedSteps.includes(step.id) ? styles.filled : ""
                  }`}
              />
            )}
          </div>
        ))}
      </div>


      {/* Step content */}
      <div className={styles.stepContent}>
        {steps.find((step) => step.id === currentStep)?.component}
      </div>

      {/* Action buttons */}
      <div className={styles.stepActions}>
        <button
          className={styles.previous}
          onClick={handlePrevious}
          disabled={currentStep === 1}
        >
          Previous
        </button>
        {currentStep === steps.length ? (
          <button
            className={styles.submit}
            onClick={() =>
              alert(
                "🎉 All steps completed successfully! Form submitted."
              )
            }
          >
            Submit
          </button>
        ) : (
          <button className={styles.next} onClick={handleNext}>
            Next
          </button>
        )}
      </div>
    </div>
  );
};

export default Stepmain;
