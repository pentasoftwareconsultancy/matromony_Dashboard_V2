import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaCheck } from "react-icons/fa";
import styles from "./Step.module.css";
import Profile from "../profile/Profile";
import FamilyBackground from "../familyback/Familyback";
import Education from "../education/Education";
import Horoscope from "../horoscope/Horoscope";
import { registerBrideGroom } from "./api";

const Stepmain = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const initialFormData = {
    fullName: "",
    email: "",
    mobileNumber: "",
    password: "",
    dateOfBirth: "",
    city: "",
    gender: "",
    maritalStatus: "",
    noOfChildren: "",
    height: "",
    bodyType: "",
    weight: "",
    complexion: "",
    bloodGroup: "",
    smoke: false,
    drink: false,
    specialCase: "",
    educationLevel: "",
    educationField: "",
    educationDescription: "",
    occupation: "",
    occupationDescription: "",
    companyName: "",
    residencyStatus: "",
    annualIncome: "",
    fatherName: "",
    fatherOccupation: "",
    motherName: "",
    motherOccupation: "",
    brothers: "",
    sisters: "",
    culturalValues: "",
    aboutFamily: "",
    motherTongue: "",
    religion: "",
    timeOfBirth: "",
    cityOfBirth: "",
    isManglik: false,
    gotra: "",
    ras: "",
    gan: "",
    nadi: "",
    charan: "",
    partnerAgeFrom: "",
    partnerAgeTo: "",
    partnerEducation: "",
    partnerLocation: "",
    partnerPackage: "",
    partnerAbout: "",
    profilePhoto: null,
    panCardNumber: "",
    companyId: "",
    aadharNumber: "",
    aadharPhoto: null,
    passportNumber: "",
    socialFacebook: "",
    socialInstagram: "",
    socialLinkedIn: "",
    isApproved: false,
  };

  const [formData, setFormData] = useState(() => {
    const savedData = localStorage.getItem("formData");
    return savedData ? JSON.parse(savedData) : initialFormData;
  });

  useEffect(() => {
    localStorage.setItem("formData", JSON.stringify(formData));
  }, [formData]);

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCompletedSteps((prev) => [...prev, currentStep]);
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    try {
      const response = await registerBrideGroom(formData);
      alert("🎉 Registration successful!");
      console.log("✅ Form Data Submitted:", response);
      localStorage.removeItem("formData");
      setCompletedSteps([]);
      navigate("/login");
    } catch (error) {
      console.error("❌ Submission failed:", error.message);
      alert(`❌ Submission failed: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

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
      <div className={styles.stepBar}>
        {steps.map((step, index) => (
          <div key={step.id} className={styles.stepWrapper}>
            <div>
              <div className={styles.stepTitle}>{step.title}</div>
              <div
                className={`${styles.step} ${
                  currentStep === step.id ? styles.active : ""
                } ${completedSteps.includes(step.id) ? styles.completed : ""}`}
                onClick={() => setCurrentStep(step.id)}
              >
                {completedSteps.includes(step.id) ? <FaCheck /> : step.label}
              </div>
            </div>
            {index < steps.length - 1 && (
              <div
                className={`${styles.progressLine} ${
                  completedSteps.includes(step.id) ? styles.filled : ""
                }`}
              />
            )}
          </div>
        ))}
      </div>

      <div className={styles.stepContent}>
        {steps.find((step) => step.id === currentStep)?.component}
      </div>

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
            onClick={handleSubmit}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Submit"}
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