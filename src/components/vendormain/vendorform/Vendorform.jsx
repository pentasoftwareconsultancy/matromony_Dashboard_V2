import React, { useState } from 'react';
import axios from 'axios';
import styles from './VendorForm.module.css'; // CSS module import

const VendorForm = () => {
  const [vendorData, setVendorData] = useState({
    title: '',
    name: '',
    email: '',
    phone: '',
    address: '',
    services: [],
    profilePic: [],
    galleryImages: [
      { title: '', description: '', image: null, feedback: '' },
    ],
    description: '',
    isVerified: false,
    ratings: 0,
  });

  const [successMessage, setSuccessMessage] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setVendorData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleGalleryImageChange = (e, index, field) => {
    const { value } = e.target;
    const updatedGalleryImages = [...vendorData.galleryImages];
    updatedGalleryImages[index][field] = value;
    setVendorData({ ...vendorData, galleryImages: updatedGalleryImages });
  };

  const handleFileChange = (e, fieldName, index = null) => {
    const file = e.target.files[0];
    if (file) {
      if (index !== null) {
        const updatedGalleryImages = [...vendorData.galleryImages];
        updatedGalleryImages[index].image = file;
        setVendorData({ ...vendorData, galleryImages: updatedGalleryImages });
      } else {
        setVendorData({ ...vendorData, [fieldName]: [file] });
      }
    }
  };

  const handleAddGalleryImage = () => {
    setVendorData((prevData) => ({
      ...prevData,
      galleryImages: [
        ...prevData.galleryImages,
        { title: '', description: '', image: null, feedback: '' },
      ],
    }));
  };

  const handleRemoveGalleryImage = (index) => {
    const updatedGalleryImages = vendorData.galleryImages.filter((_, i) => i !== index);
    setVendorData({ ...vendorData, galleryImages: updatedGalleryImages });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', vendorData.title);
    formData.append('name', vendorData.name);
    formData.append('email', vendorData.email);
    formData.append('phone', vendorData.phone);
    formData.append('address', vendorData.address);
    formData.append('services', vendorData.services.join(','));
    formData.append('description', vendorData.description);
    formData.append('isVerified', vendorData.isVerified);
    formData.append('ratings', vendorData.ratings);

    if (vendorData.profilePic[0]) {
      formData.append('profilePicUrl', vendorData.profilePic[0]);
    }

    vendorData.galleryImages.forEach((galleryImage, index) => {
      if (galleryImage.image) {
        formData.append(`galleryImages[${index}][image]`, galleryImage.image);
      }
      if (galleryImage.title) {
        formData.append(`galleryImages[${index}][title]`, galleryImage.title);
      }
      if (galleryImage.description) {
        formData.append(`galleryImages[${index}][description]`, galleryImage.description);
      }
      if (galleryImage.feedback) {
        formData.append(`galleryImages[${index}][feedback]`, galleryImage.feedback);
      }
    });

    try {
      const response = await axios.post('http://localhost:8000/api/v1/vendors/create', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Vendor created:', response.data);
      setSuccessMessage(true); // Set success message state to true after successful submission
      setTimeout(() => setSuccessMessage(false), 3000); // Hide success message after 3 seconds
    } catch (error) {
      console.error('Error creating vendor:', error);
    }
  };

  const handleServiceChange = (e) => {
    const { value, checked } = e.target;
    setVendorData((prevData) => {
      let updatedServices = [...prevData.services];
      if (checked) {
        updatedServices.push(value); // Add service if checked
      } else {
        updatedServices = updatedServices.filter(service => service !== value); // Remove service if unchecked
      }
      return { ...prevData, services: updatedServices };
    });
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.main}>
        {/* Vendor Title */}
        <div className={styles.inputGroup}>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            name="title"
            value={vendorData.title}
            onChange={handleInputChange}
            placeholder="Title"
          />
        </div>

        {/* Vendor Name */}
        <div className={styles.inputGroup}>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            value={vendorData.name}
            onChange={handleInputChange}
            required
            placeholder="Vendor Name"
          />
        </div>

        {/* Vendor Email */}
        <div className={styles.inputGroup}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            value={vendorData.email}
            onChange={handleInputChange}
            required
            placeholder="Vendor Email"
          />
        </div>

        {/* Vendor Phone */}
        <div className={styles.inputGroup}>
          <label htmlFor="phone">Phone</label>
          <input
            type="text"
            name="phone"
            value={vendorData.phone}
            onChange={handleInputChange}
            required
            placeholder="Vendor Phone"
          />
        </div>

        {/* Vendor Address */}
        <div className={styles.inputGroup}>
          <label htmlFor="address">Address</label>
          <input
            type="text"
            name="address"
            value={vendorData.address}
            onChange={handleInputChange}
            required
            placeholder="Vendor Address"
          />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="address">Description</label>
          <input
            type="text"
            name="description"
            value={vendorData.description}
            onChange={handleInputChange}
            required
            placeholder="description"
          />
        </div>
       
        {/* Vendor Services */}
        <div className={styles.inputGroup}>
          <label htmlFor="services">Services</label>
          <div className={styles.checkboxGroup}>
            <label>
              <input
                type="checkbox"
                name="services"
                value="Catering"
                checked={vendorData.services.includes('Catering')}
                onChange={handleServiceChange}
              />
              Catering
            </label>
            <label>
              <input
                type="checkbox"
                name="services"
                value="Photography"
                checked={vendorData.services.includes('Photography')}
                onChange={handleServiceChange}
              />
              Photography
            </label>
            <label>
              <input
                type="checkbox"
                name="services"
                value="Decoration"
                checked={vendorData.services.includes('Decoration')}
                onChange={handleServiceChange}
              />
              Decoration
            </label>
            <label>
              <input
                type="checkbox"
                name="services"
                value="DJ"
                checked={vendorData.services.includes('DJ')}
                onChange={handleServiceChange}
              />
              DJ
            </label>
            <label>
              <input
                type="checkbox"
                name="services"
                value="Makeup"
                checked={vendorData.services.includes('Makeup')}
                onChange={handleServiceChange}
              />
              Makeup
            </label>
            <label>
              <input
                type="checkbox"
                name="services"
                value="Other"
                checked={vendorData.services.includes('Other')}
                onChange={handleServiceChange}
              />
              Other
            </label>
          </div>
        </div>

        {/* Profile Picture */}
        <div className={styles.inputGroup}>
          <label htmlFor="profilePicUrl">Profile Picture</label>
          <input type="file" onChange={(e) => handleFileChange(e, 'profilePic')} />
        </div>

        {/* Vendor Ratings */}
        <div className={styles.inputGroup}>
          <label htmlFor="ratings">Ratings</label>
          <input
            type="number"
            name="ratings"
            value={vendorData.ratings}
            onChange={handleInputChange}
            min="0"
            max="5"
            step="0.1"
            placeholder="Ratings (0-5)"
          />
        </div>

        {/* Verified Status */}
        <div className={styles.inputGroup}>
          <label htmlFor="isVerified">Verified</label>
          <input
            type="checkbox"
            name="isVerified"
            checked={vendorData.isVerified}
            onChange={() =>
              setVendorData((prevData) => ({ ...prevData, isVerified: !prevData.isVerified }))}
          />
        </div>
      </div>

      {/* Gallery Images */}
      <div className={styles.inputGroup}>
        <label>Gallery Images</label>
        <div className={styles.addgallery}>
          {vendorData.galleryImages.map((image, index) => (
            <div key={index}>
              <input type="file" onChange={(e) => handleFileChange(e, 'galleryImages', index)} />
              <input
                type="text"
                value={image.title}
                onChange={(e) => handleGalleryImageChange(e, index, 'title')}
                placeholder="Image Title"
                className={styles.file}
              />
              <input
                type="text"
                value={image.description}
                onChange={(e) => handleGalleryImageChange(e, index, 'description')}
                placeholder="Image Description"
                className={styles.file}
              />
              <input
                type="text"
                value={image.feedback}
                onChange={(e) => handleGalleryImageChange(e, index, 'feedback')}
                placeholder="Feedback"
              />
              <button
                type="button"
                className={styles.removeButton}
                onClick={() => handleRemoveGalleryImage(index)}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
        <button type="button" onClick={handleAddGalleryImage}>
          Add Gallery Image
        </button>
      </div>

      {/* Submit Button */}
      <button className={styles.submitButton} type="submit">
        Submit Vendor
      </button>

      {/* Success Message Popup */}
      {successMessage && (
        <div className={styles.successPopup}>
          <p>Vendor successfully created!</p>
        </div>
      )}
    </form>
  );
};

export default VendorForm;
