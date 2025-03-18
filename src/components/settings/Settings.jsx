import React, { useState } from "react";
import Styles from "./Settings.module.css";

function Settings() {
  const [theme, setTheme] = useState("light");
  const [email, setEmail] = useState("admin@example.com");
  const [name, setName] = useState("Admin");
  const [activeTab, setActiveTab] = useState("profile");

  const handleThemeChange = (e) => {
    setTheme(e.target.value);
  };

  const handleSaveProfile = () => {
    alert("Profile updated successfully!");
  };

  const handleLogout = () => {
    alert("Logged out successfully!");
    // Implement logout logic here
  };

  return (
    <div className={Styles.Container}>
      <h2>Admin Settings</h2>

      {/* Tabs Navigation */}
      <div className={Styles.Tabs}>
        <button
          className={`${Styles.Tab} ${activeTab === "profile" ? Styles.ActiveTab : ""}`}
          onClick={() => setActiveTab("profile")}
        >
          Profile
        </button>
        <button
          className={`${Styles.Tab} ${activeTab === "users" ? Styles.ActiveTab : ""}`}
          onClick={() => setActiveTab("users")}
        >
          User Management
        </button>
        <button
          className={`${Styles.Tab} ${activeTab === "theme" ? Styles.ActiveTab : ""}`}
          onClick={() => setActiveTab("theme")}
        >
          Theme Settings
        </button>
        <button
          className={`${Styles.Tab} ${activeTab === "security" ? Styles.ActiveTab : ""}`}
          onClick={() => setActiveTab("security")}
        >
          Security
        </button>
        <button
          className={`${Styles.Tab} ${activeTab === "notifications" ? Styles.ActiveTab : ""}`}
          onClick={() => setActiveTab("notifications")}
        >
          Notifications
        </button>
      </div>

      {/* Profile Settings */}
      {activeTab === "profile" && (
        <div className={Styles.Section}>
          <h3 className={Styles.SectionTitle}>Profile Settings</h3>
          <div className={Styles.InputGroup}>
            <label>Name:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={Styles.Input}
            />
          </div>
          <div className={Styles.InputGroup}>
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={Styles.Input}
            />
          </div>
          <button className={Styles.SaveButton} onClick={handleSaveProfile}>
            Save Profile
          </button>
        </div>
      )}

      {/* User Management */}
      {activeTab === "users" && (
        <div className={Styles.Section}>
          <h3 className={Styles.SectionTitle}>User Management</h3>
          <div className={Styles.InputGroup}>
            <label>Manage Roles:</label>
            <select className={Styles.Select}>
              <option value="admin">Admin</option>
              <option value="user">User</option>
              <option value="moderator">Moderator</option>
            </select>
          </div>
          <div className={Styles.InputGroup}>
            <label>Search Users:</label>
            <input type="text" className={Styles.Input} />
          </div>
          <button className={Styles.SaveButton}>Add User</button>
        </div>
      )}

      {/* Theme Settings */}
      {activeTab === "theme" && (
        <div className={Styles.Section}>
          <h3 className={Styles.SectionTitle}>Theme Settings</h3>
          <div className={Styles.InputGroup}>
            <label>Theme:</label>
            <select value={theme} onChange={handleThemeChange} className={Styles.Select}>
              <option value="light">Light Mode</option>
              <option value="dark">Dark Mode</option>
            </select>
          </div>
        </div>
      )}

      {/* Security Settings */}
      {activeTab === "security" && (
        <div className={Styles.Section}>
          <h3 className={Styles.SectionTitle}>Security Settings</h3>
          <div className={Styles.InputGroup}>
            <label>Change Password:</label>
            <input type="password" className={Styles.Input} placeholder="New Password" />
            <input type="password" className={Styles.Input} placeholder="Confirm Password" />
          </div>
          <button className={Styles.SaveButton}>Update Password</button>
        </div>
      )}

      {/* Notifications Settings */}
      {activeTab === "notifications" && (
        <div className={Styles.Section}>
          <h3 className={Styles.SectionTitle}>Notification Settings</h3>
          <div className={Styles.InputGroup}>
            <label>Email Notifications:</label>
            <select className={Styles.Select}>
              <option value="enabled">Enabled</option>
              <option value="disabled">Disabled</option>
            </select>
          </div>
          <div className={Styles.InputGroup}>
            <label>Push Notifications:</label>
            <select className={Styles.Select}>
              <option value="enabled">Enabled</option>
              <option value="disabled">Disabled</option>
            </select>
          </div>
          <button className={Styles.SaveButton}>Save Settings</button>
        </div>
      )}

      {/* Logout Section */}
      <div className={Styles.Section}>
        <h3 className={Styles.SectionTitle}>Logout</h3>
        <button className={Styles.LogoutButton} onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
}

export default Settings;
