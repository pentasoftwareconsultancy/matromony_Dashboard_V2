import React, { useState, useEffect } from 'react';
import Styles from './Customer.module.css';

// Mock data for customers
const mockCustomerData = [
  { id: 1, name: 'John Doe', email: 'john@example.com', status: 'Active' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', status: 'Inactive' },
  { id: 3, name: 'Robert Brown', email: 'robert@example.com', status: 'Active' },
  { id: 4, name: 'Emily Davis', email: 'emily@example.com', status: 'Active' },
];

function Customer() {
  const [customers, setCustomers] = useState([]);
  const [viewPopup, setViewPopup] = useState(false);
  const [editPopup, setEditPopup] = useState(false);
  const [deletePopup, setDeletePopup] = useState(false);
  const [addCustomerForm, setAddCustomerForm] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [dropdownVisible, setDropdownVisible] = useState(null);

  // Form states
  const [newCustomer, setNewCustomer] = useState({
    name: '',
    email: '',
    status: 'Active',
  });

  // Simulate fetching customers
  useEffect(() => {
    setCustomers(mockCustomerData);
  }, []);

  const handleAction = (action, customerId) => {
    const selected = customers.find((customer) => customer.id === customerId);
    setSelectedCustomer(selected);

    switch (action) {
      case 'View':
        setViewPopup(true);
        break;
      case 'Edit':
        setEditPopup(true);
        break;
      case 'Delete':
        setDeletePopup(true);
        break;
      default:
        break;
    }
  };

  const toggleDropdown = (customerId) => {
    setDropdownVisible(dropdownVisible === customerId ? null : customerId);
  };

  const closePopup = () => {
    setViewPopup(false);
    setEditPopup(false);
    setDeletePopup(false);
    setAddCustomerForm(false);
    setSelectedCustomer(null);
    setDropdownVisible(null); // Close dropdown
  };

  const handleAddCustomerChange = (e) => {
    const { name, value } = e.target;
    setNewCustomer((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddCustomerSubmit = (e) => {
    e.preventDefault();
    const newId = customers.length ? Math.max(...customers.map((c) => c.id)) + 1 : 1;
    setCustomers([
      ...customers,
      { id: newId, name: newCustomer.name, email: newCustomer.email, status: newCustomer.status },
    ]);
    closePopup();
  };

  const handleDeleteCustomer = (id) => {
    setCustomers(customers.filter((customer) => customer.id !== id));
    closePopup();
  };

  return (
    <div className={Styles.Container}>
      <div className={Styles.Header}>
        <h2>Customer Management</h2>
        <button onClick={() => setAddCustomerForm(true)} className={Styles.Button}>
          Add Customer
        </button>
      </div>

      {/* Add Customer Form */}
      {addCustomerForm && (
        <div className={Styles.Popup}>
          <div className={Styles.PopupContent}>
            <h3>Add Customer</h3>
            <form onSubmit={handleAddCustomerSubmit}>
              <label>Name:</label>
              <input
                type="text"
                name="name"
                value={newCustomer.name}
                onChange={handleAddCustomerChange}
                required
              />
              <label>Email:</label>
              <input
                type="email"
                name="email"
                value={newCustomer.email}
                onChange={handleAddCustomerChange}
                required
              />
              <label>Status:</label>
              <select
                name="status"
                value={newCustomer.status}
                onChange={handleAddCustomerChange}
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
              <div>
                <button type="submit">Add Customer</button>
                <button type="button" onClick={closePopup}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Customer List Table */}
      <table className={Styles.Table}>
        <thead>
          <tr>
            <th>Sr. No.</th>
            <th>Name</th>
            <th>Email</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer, index) => (
            <tr key={customer.id}>
              <td>{index + 1}</td>
              <td>{customer.name}</td>
              <td>{customer.email}</td>
              <td>{customer.status}</td>
              <td>
                <button
                  className={Styles.EllipsisButton}
                  onClick={() => toggleDropdown(customer.id)}
                >
                  &#8942;
                </button>

                {/* Action Dropdown */}
                {dropdownVisible === customer.id && (
                  <div className={Styles.Dropdown}>
                    <button onClick={() => handleAction('View', customer.id)}>View</button>
                    <button onClick={() => handleAction('Edit', customer.id)}>Edit</button>
                    <button onClick={() => handleAction('Delete', customer.id)}>Delete</button>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* View Popup */}
      {viewPopup && selectedCustomer && (
        <div className={Styles.Popup}>
          <div className={Styles.PopupContent}>
            <h3>View Customer</h3>
            <p><strong>Name:</strong> {selectedCustomer.name}</p>
            <p><strong>Email:</strong> {selectedCustomer.email}</p>
            <p><strong>Status:</strong> {selectedCustomer.status}</p>
            <button onClick={closePopup}>Close</button>
          </div>
        </div>
      )}

      {/* Edit Popup */}
      {editPopup && selectedCustomer && (
        <div className={Styles.Popup}>
          <div className={Styles.PopupContent}>
            <h3>Edit Customer</h3>
            <form>
              <label>Name:</label>
              <input
                type="text"
                defaultValue={selectedCustomer.name}
              />
              <label>Email:</label>
              <input
                type="email"
                defaultValue={selectedCustomer.email}
              />
              <label>Status:</label>
              <select
                defaultValue={selectedCustomer.status}
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
              <div>
                <button type="submit">Save</button>
                <button type="button" onClick={closePopup}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Popup */}
      {deletePopup && selectedCustomer && (
        <div className={Styles.Popup}>
          <div className={Styles.PopupContent}>
            <h3>Delete Customer</h3>
            <p>Are you sure you want to delete the customer "{selectedCustomer.name}"?</p>
            <div>
              <button onClick={() => handleDeleteCustomer(selectedCustomer.id)}>Yes</button>
              <button onClick={closePopup}>No</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Customer;
