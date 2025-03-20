// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { FaDownload } from "react-icons/fa";
// // import background from "../images/image1.jpg";
// import jsPDF from "jspdf";
// import styles from "./ProfileComponent.module.css";

// const ProfileComponent = () => {
//   const { id } = useParams();
//   const [profile, setProfile] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   // Helper function to format date
//   const formatDate = (dateString) => {
//     const date = new Date(dateString);
//     if (isNaN(date.getTime())) return ""; // Check for invalid date
//     const year = date.getFullYear();
//     const month = String(date.getMonth() + 1).padStart(2, "0");
//     const day = String(date.getDate()).padStart(2, "0");
//     return `${year}-${month}-${day}`;
//   };

//   useEffect(() => {
//     const fetchProfile = async () => {
//       try {
//         const response = await fetch(`http://localhost:8000/api/v1/bride-groom/${id}`);
//         const data = await response.json();
//         if (data.success) {
//           data.data.dateOfBirth = formatDate(data.data.dateOfBirth);
//           setProfile(data.data);
//         } else {
//           setError(data.message || "Failed to fetch profile.");
//         }
//       } catch (err) {
//         setError("Error fetching profile: " + err.message);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchProfile();
//   }, [id]);

//   const handleDownload = async () => {
//     const doc = new jsPDF("p", "mm", "a4");
//     let y = 10; // Initial Y position
//     const pageHeight = doc.internal.pageSize.height - 10;

//     // Max character limits for specific fields
//     const MAX_CHARACTERS = 150;

//     // Function to convert an image URL to Base64
//     const getBase64Image = async (url) => {
//       const img = new Image();
//       img.crossOrigin = "Anonymous"; // Handle CORS issues
//       return new Promise((resolve, reject) => {
//         img.onload = () => {
//           const canvas = document.createElement("canvas");
//           canvas.width = img.width;
//           canvas.height = img.height;
//           const ctx = canvas.getContext("2d");
//           ctx.drawImage(img, 0, 0);
//           resolve(canvas.toDataURL("image/png"));
//         };
//         img.onerror = reject;
//         img.src = url;
//       });
//     };

//     try {
//       // Load and add the background image
//       const backgroundImage = await getBase64Image(background);
//       doc.addImage(backgroundImage, "JPEG", 0, 0, 210, 297); // Full A4 background

//       // Profile Image Handling
//       if (profile.profilePhoto) {
//         try {
//           const imgData = await getBase64Image(profile.profilePhoto);
//           doc.addImage(imgData, "PNG", 10, 20, 90, 100);
//           y = 20; // Set Y position after image
//         } catch (error) {
//           console.error("Error loading profile image:", error);
//         }
//       }

//       // Title: Profile Name
//       doc.setFont("helvetica", "bold");
//       doc.setFontSize(18);
//       doc.text(profile.fullName || "N/A", 120, y);
//       y += 20;

//       // Function to add text with pagination support
//       const addText = (label, value, xPos = 110) => {
//         if (value) {
//           let text = `${label}: ${value}`;
//           if (text.length > MAX_CHARACTERS) {
//             text = text.slice(0, MAX_CHARACTERS) + "...";
//           }
//           const splitText = doc.splitTextToSize(text, 130);
//           if (y + splitText.length * 7 > pageHeight) {
//             doc.addPage();
//             y = 10;
//           }
//           doc.text(splitText, xPos, y);
//           y += splitText.length * 7;
//         }
//       };

//       // Add Personal Details
//       doc.setFontSize(14);
//       doc.setFont("helvetica", "bold");
//       doc.text("Personal Details", 110, y);
//       y += 10;
//       doc.setFontSize(12);
//       doc.setFont("helvetica", "normal");
//       addText("Name", profile.fullName, 110);
//       addText("Email", profile.email, 110);
//       addText("Mobile Number", profile.mobileNumber, 110);
//       addText("Date of Birth", profile.dateOfBirth, 110);
//       addText("City", profile.city, 110);
//       addText("Gender", profile.gender, 110);

//       // Add Education and Career
//       y += 10;
//       doc.setFontSize(14);
//       doc.setFont("helvetica", "bold");
//       doc.text("Education and Career", 10, y);
//       y += 8;
//       doc.setFontSize(12);
//       doc.setFont("helvetica", "normal");
//       addText("Education Level", profile.educationLevel, 10);
//       addText("Field", profile.educationField, 10);
//       addText("Occupation", profile.occupation, 10);
//       addText("Annual Income", profile.annualIncome, 10);

//       // Family Information
//       y += 10;
//       doc.setFontSize(14);
//       doc.setFont("helvetica", "bold");
//       doc.text("Family Information", 110, y);
//       y += 8;
//       doc.setFontSize(12);
//       doc.setFont("helvetica", "normal");
//       addText("Father's Name", profile.fatherName, 110);
//       addText("Mother's Name", profile.motherName, 110);

//       // Save PDF
//       doc.save(`${profile.fullName}_profile.pdf`);
//     } catch (error) {
//       console.error("Error generating PDF:", error);
//     }
//   };

//   if (loading) return <p>Loading profile...</p>;
//   if (error) return <p>{error}</p>;

//   return (
//     <div className={styles.profileContainer}>
//       <div className={styles.header}>
//         <div className={styles.actions}>
//           <button onClick={handleDownload} className={styles.downloadButton}>
//             <FaDownload /> PDF
//           </button>
//         </div>
//       </div>

//       <div className={styles.name}>{profile.fullName}</div>
//       <div id="profileContent" className={styles.profileContent}>
//         <div className={styles.main}>
//           <div className={styles.manicard}>
//             <div className={styles.imageSection}>
//               <img
//                 src={profile.profilePhoto || "https://via.placeholder.com/150"}
//                 alt="Profile"
//                 className={styles.profileImage}
//               />
//             </div>
//           </div>
//           <div className={styles.maintext}>
//             <div className={styles.detailsSection}>
//               <h2>Personal Details</h2>
//               <div className={styles.partner}>
//                 <p><strong>Full Name:</strong> {profile.fullName}</p>
//                 <p><strong>Email:</strong> {profile.email}</p>
//                 <p><strong>Mobile Number:</strong> {profile.mobileNumber}</p>
//                 <p><strong>Date of Birth:</strong> {profile.dateOfBirth}</p>
//                 <p><strong>City:</strong> {profile.city}</p>
//                 <p><strong>Gender:</strong> {profile.gender}</p>
//                 <p><strong>Height:</strong> {profile.height}</p>
//                 <p><strong>Weight:</strong> {profile.weight}</p>
//               </div>
//             </div>

//             <div className={styles.detailsSection}>
//               <h2>Education & Career</h2>
//               <p><strong>Education Level:</strong> {profile.educationLevel}</p>
//               <p><strong>Field:</strong> {profile.educationField}</p>
//               <p><strong>Occupation:</strong> {profile.occupation}</p>
//               <p><strong>Annual Income:</strong> {profile.annualIncome}</p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProfileComponent;
