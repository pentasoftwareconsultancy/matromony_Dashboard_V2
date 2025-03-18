import React, { useState } from 'react';
import Styles from './Payments.module.css';

function Payments() {
  const [payments, setPayments] = useState([
    { id: 1, name: 'User 1', amount: 100, date: '2025-01-10' },
    { id: 2, name: 'User 2', amount: 150, date: '2025-01-12' },
    { id: 3, name: 'User 3', amount: 200, date: '2025-01-14' },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newPayment, setNewPayment] = useState({ name: '', amount: '', date: '' });

  const [selectedPayment, setSelectedPayment] = useState(null); // For popup view details
  const [dropdownPaymentId, setDropdownPaymentId] = useState(null); // Tracks which ellipsis dropdown is open

  const handleAddPayment = () => {
    if (newPayment.name && newPayment.amount && newPayment.date) {
      setPayments([
        ...payments,
        { id: payments.length + 1, ...newPayment },
      ]);
      setIsModalOpen(false);
      setNewPayment({ name: '', amount: '', date: '' });
    } else {
      alert('Please fill in all fields before adding a payment.');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewPayment({ ...newPayment, [name]: value });
  };

  const handleViewDetails = (payment) => {
    setSelectedPayment(payment); // Open the popup with payment details
    setDropdownPaymentId(null); // Close the ellipsis dropdown
  };

  const handleDeletePayment = (id) => {
    setPayments(payments.filter(payment => payment.id !== id));
    setSelectedPayment(null); // Close popup if the payment is deleted
  };

  const toggleDropdown = (id) => {
    setDropdownPaymentId((prevId) => (prevId === id ? null : id)); // Toggle dropdown visibility
  };

  return (
    <div className={Styles.Container}>
      <h1 className={Styles.Title}>Payments</h1>
      <p className={Styles.Description}>
        Manage and view all payment details here. Use the options below to navigate through payment records.
      </p>

      {/* Actions Section */}
      <div className={Styles.Actions}>
        <button className={Styles.Button}>View Payments</button>
        <button className={Styles.Button} onClick={() => setIsModalOpen(true)}>Add Payment</button>
        <button className={Styles.Button}>Generate Report</button>
      </div>

      {/* Payment Records Table */}
      <div className={Styles.PaymentList}>
        <h3>Payment Records</h3>
        <table className={Styles.PaymentTable}>
          <thead>
            <tr>
              <th>User</th>
              <th>Amount</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment) => (
              <tr key={payment.id}>
                <td>{payment.name}</td>
                <td>${payment.amount}</td>
                <td>{payment.date}</td>
                <td>
                  <button
                    className={Styles.EllipsisButton}
                    onClick={() => toggleDropdown(payment.id)}
                  >
                    &#8942;
                  </button>
                  {dropdownPaymentId === payment.id && (
                    <div className={Styles.DropdownMenu}>
                      <button
                        className={Styles.DropdownButton}
                        onClick={() => handleViewDetails(payment)}
                      >
                        View Details
                      </button>
                      <button
                        className={Styles.DropdownButton}
                        onClick={() => handleDeletePayment(payment.id)}
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal for Adding Payment */}
      {isModalOpen && (
        <div className={Styles.Modal}>
          <div className={Styles.ModalContent}>
            <h3>Add New Payment</h3>
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={newPayment.name}
              onChange={handleChange}
            />
            <label>Amount:</label>
            <input
              type="number"
              name="amount"
              value={newPayment.amount}
              onChange={handleChange}
            />
            <label>Date:</label>
            <input
              type="date"
              name="date"
              value={newPayment.date}
              onChange={handleChange}
            />
            <div className={Styles.ModalActions}>
              <button className={Styles.Button} onClick={handleAddPayment}>Add Payment</button>
              <button className={Styles.Button} onClick={() => setIsModalOpen(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* Popup for Viewing Payment Details */}
      {selectedPayment && (
        <div className={Styles.Modal}>
          <div className={Styles.ModalContent}>
            <h3>Payment Details</h3>
            <p><strong>Name:</strong> {selectedPayment.name}</p>
            <p><strong>Amount:</strong> ${selectedPayment.amount}</p>
            <p><strong>Date:</strong> {selectedPayment.date}</p>
            <div className={Styles.ModalActions}>
              <button className={Styles.Button} onClick={() => setSelectedPayment(null)}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Payments;
