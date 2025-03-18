import React, { useState } from "react";
import Styles from "./Orders.module.css";

function Orders() {
  const [orders, setOrders] = useState([
    {
      id: 1,
      customer: "John Doe",
      product: "Google Pixel 7",
      quantity: 1,
      price: 699,
      date: "2025-01-07",
      status: "Delivered",
    },
    {
      id: 2,
      customer: "Jane Smith",
      product: "Google Pixel Buds",
      quantity: 2,
      price: 398,
      date: "2025-01-06",
      status: "Pending",
    },
    {
      id: 3,
      customer: "Alice Brown",
      product: "Google Nest Hub",
      quantity: 1,
      price: 129,
      date: "2025-01-05",
      status: "Shipped",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [action, setAction] = useState("");  // Track which action is selected
  const [isDropdownOpen, setIsDropdownOpen] = useState(null); // Track open dropdown for each order

  const handleStatusChange = (orderId, newStatus) => {
    setOrders(
      orders.map((order) =>
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );
  };

  const handleDropdownToggle = (orderId) => {
    setIsDropdownOpen(isDropdownOpen === orderId ? null : orderId); // Toggle dropdown for this order
  };

  const handleModalOpen = (order, actionType) => {
    setSelectedOrder(order);
    setAction(actionType);
    setIsModalOpen(true);
    setIsDropdownOpen(null); // Close dropdown after selection
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedOrder(null);
    setAction("");
  };

  const handleAction = () => {
    if (action === "delete") {
      setOrders(orders.filter(order => order.id !== selectedOrder.id));
    }
    handleModalClose();
  };

  const filteredOrders = orders.filter(
    (order) =>
      order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.product.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={Styles.Container}>
      {/* Header */}
      <div className={Styles.Header}>
        <h2>Orders</h2>
        <input
          type="text"
          placeholder="Search orders"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={Styles.SearchInput}
        />
      </div>

      {/* Orders Table */}
      <div className={Styles.TableContainer}>
        <table className={Styles.Table}>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Product</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Order Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((order) => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.customer}</td>
                <td>{order.product}</td>
                <td>{order.quantity}</td>
                <td>${order.price}</td>
                <td>{order.date}</td>
                <td>{order.status}</td>
                <td>
                  {/* Ellipsis Button to Show Dropdown */}
                  <button
                    className={Styles.EllipsisButton}
                    onClick={() => handleDropdownToggle(order.id)}
                  >
                    &#8942;
                  </button>

                  {/* Dropdown Menu */}
                  {isDropdownOpen === order.id && (
                    <div className={Styles.DropdownMenu}>
                      <button
                        className={Styles.DropdownItem}
                        onClick={() => handleModalOpen(order, "view")}
                      >
                        View Details
                      </button>
                      <button
                        className={Styles.DropdownItem}
                        onClick={() => handleModalOpen(order, "edit")}
                      >
                        Edit Order
                      </button>
                      <button
                        className={Styles.DropdownItem}
                        onClick={() => handleModalOpen(order, "delete")}
                      >
                        Delete Order
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal Popup */}
      {isModalOpen && selectedOrder && (
        <div className={Styles.Modal}>
          <div className={Styles.ModalContent}>
            <h3>Order {selectedOrder.id} Actions</h3>
            <p>Customer: {selectedOrder.customer}</p>
            <p>Product: {selectedOrder.product}</p>
            <p>Status: {selectedOrder.status}</p>

            <div className={Styles.ModalActions}>
              {action === "view" && <p>Here you can view more details of the order.</p>}
              {action === "edit" && <p>Edit the order details here.</p>}
              {action === "delete" && (
                <p>Are you sure you want to delete this order?</p>
              )}
              <button className={Styles.Button} onClick={handleAction}>
                {action === "delete" ? "Confirm Delete" : "Proceed"}
              </button>
              <button className={Styles.Button} onClick={handleModalClose}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Orders;
