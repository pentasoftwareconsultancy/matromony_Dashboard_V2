import React, { useContext, useState } from "react";
import { ThemeContext } from "../../utils/ThemeContext";
import Styles from "./Navbar.module.css";
import { FiSearch, FiBell, FiMail, FiUser, FiMenu } from "react-icons/fi";
import Data from "../../service/Data";
import { Link } from "react-router-dom";

function Navbar() {
  const { mode, changeMode } = useContext(ThemeContext);
  const [notificationsCount] = useState(3);
  const [mailsCount] = useState(5);
  const [profileDropdown, setProfileDropdown] = useState(false);
  const [mobileNavActive, setMobileNavActive] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const handleModeChange = (e) => {
    const selectedMode = e.target.value;
    if (selectedMode === Data.themeOptions.light || selectedMode === Data.themeOptions.dark) {
      changeMode(selectedMode);
      document.body.setAttribute("data-bg", "");
    } else {
      changeMode(Data.themeOptions.light);
      document.body.setAttribute("data-bg", selectedMode);
    }
  };

  const toggleProfileDropdown = () => {
    setProfileDropdown(!profileDropdown);
    setMobileNavActive(false); // Close mobile nav if open
  };

  const handleProfileAction = (action) => {
    if (action === "logout") {
      console.log("Logging out...");
    }
    setProfileDropdown(false);
  };

  const toggleMobileNav = () => {
    setMobileNavActive(!mobileNavActive);
    setProfileDropdown(false); // Close profile dropdown if open
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchSubmit = () => {
    console.log("Global Search Term: ", searchTerm);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearchSubmit();
    }
  };

  return (
    <nav className={Styles.Container}>
      <div className={Styles.Text}>
        <h5>{Data.navbar.welcomeMessage}</h5>
      </div>

      <div className={Styles.Search}>
        <FiSearch className={Styles.SearchIcon} onClick={handleSearchSubmit} />
        <input
          type="search"
          placeholder={Data.navbar.searchPlaceholder}
          value={searchTerm}
          onChange={handleSearchChange}
          onKeyPress={handleKeyPress}
        />
      </div>

      <div className={Styles.Icons}>
        <div className={Styles.IconWrapper}>
          <Link to="/Notification">
            <FiBell className={Styles.Icon} />
          </Link>
          {notificationsCount > 0 && <span className={Styles.Badge}>{notificationsCount}</span>}
        </div>
        <div className={Styles.IconWrapper}>
          <Link to="/mails">
            <FiMail className={Styles.Icon} />
          </Link>
          {mailsCount > 0 && <span className={Styles.Badge}>{mailsCount}</span>}
        </div>
      </div>

      <div className={Styles.ThemeSelector}>
        <select className={Styles.ThemeDropdown} value={mode} onChange={handleModeChange}>
          <optgroup label="Modes">
            <option value={Data.themeOptions.light}>{Data.navbar.theme.lightMode}</option>
            <option value={Data.themeOptions.dark}>{Data.navbar.theme.darkMode}</option>
          </optgroup>
          <optgroup label={Data.navbar.theme.backgroundOptions}>
            <option value={Data.themeOptions.nature}>{Data.navbar.theme.nature}</option>
            <option value={Data.themeOptions.abstract}>{Data.navbar.theme.abstract}</option>
            <option value={Data.themeOptions.space}>{Data.navbar.theme.space}</option>
          </optgroup>
        </select>
      </div>

      <div className={Styles.Profile} onClick={toggleProfileDropdown}>
        <FiUser className={Styles.Icon} />
        <span className={Styles.ProfileName}>{Data.navbar.profileName}</span>
        {profileDropdown && (
          <div className={Styles.ProfileDropdown}>
            <ul>
              <li onClick={() => handleProfileAction("profile")}>Profile</li>
              <li onClick={() => handleProfileAction("settings")}>Settings</li>
              <li onClick={() => handleProfileAction("accounts")}>Account</li>
              <li onClick={() => handleProfileAction("notifications")}>Notifications</li>
              <li onClick={() => handleProfileAction("logout")}>Logout</li>
            </ul>
          </div>
        )}
      </div>

      <div className={Styles.MenuToggle} onClick={toggleMobileNav}>
        <FiMenu />
      </div>

      <div className={`${Styles.MobileNav} ${mobileNavActive ? Styles.active : ""}`}>
        <div className={Styles.MobileNavItem}>
          <div className={Styles.Search}>
            <FiSearch className={Styles.SearchIcon} onClick={handleSearchSubmit} />
            <input
              type="search"
              placeholder={Data.navbar.searchPlaceholder}
              value={searchTerm}
              onChange={handleSearchChange}
              onKeyPress={handleKeyPress}
            />
          </div>
        </div>
        <div className={Styles.MobileNavItem}>
          <Link to="/Notification" onClick={toggleMobileNav}>
            Notifications ({notificationsCount})
          </Link>
        </div>
        <div className={Styles.MobileNavItem}>
          <Link to="/mails" onClick={toggleMobileNav}>
            Mails ({mailsCount})
          </Link>
        </div>
        <div className={Styles.MobileNavItem}>
          <select className={Styles.ThemeDropdown} value={mode} onChange={handleModeChange}>
            <optgroup label="Modes">
              <option value={Data.themeOptions.light}>{Data.navbar.theme.lightMode}</option>
              <option value={Data.themeOptions.dark}>{Data.navbar.theme.darkMode}</option>
            </optgroup>
            <optgroup label={Data.navbar.theme.backgroundOptions}>
              <option value={Data.themeOptions.nature}>{Data.navbar.theme.nature}</option>
              <option value={Data.themeOptions.abstract}>{Data.navbar.theme.abstract}</option>
              <option value={Data.themeOptions.space}>{Data.navbar.theme.space}</option>
            </optgroup>
          </select>
        </div>
        <div className={Styles.MobileNavItem} onClick={() => handleProfileAction("profile")}>
          Profile
        </div>
        <div className={Styles.MobileNavItem} onClick={() => handleProfileAction("settings")}>
          Settings
        </div>
        <div className={Styles.MobileNavItem} onClick={() => handleProfileAction("logout")}>
          Logout
        </div>
      </div>
    </nav>
  );
}

export default Navbar;