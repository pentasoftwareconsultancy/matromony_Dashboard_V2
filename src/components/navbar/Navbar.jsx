import React, { useContext, useState } from 'react';
import { ThemeContext } from '../../utils/ThemeContext';
import Styles from './Navbar.module.css';
import { FiSearch, FiBell, FiMail, FiUser } from 'react-icons/fi';
import Data from '../../service/Data';
import { Link } from 'react-router-dom';

function Navbar() {
  const { mode, changeMode } = useContext(ThemeContext);
  const [notificationsCount, setNotificationsCount] = useState(3);
  const [mailsCount, setMailsCount] = useState(5);
  const [profileDropdown, setProfileDropdown] = useState(false);
  const [mobileNavActive, setMobileNavActive] = useState(false);
  const [searchTerm, setSearchTerm] = useState(''); // State to hold search term

  const handleModeChange = (e) => {
    const selectedMode = e.target.value;
    if (selectedMode === Data.themeOptions.light || selectedMode === Data.themeOptions.dark) {
      changeMode(selectedMode);
      document.body.setAttribute('data-bg', '');
    } else {
      changeMode(Data.themeOptions.light);
      document.body.setAttribute('data-bg', selectedMode);
    }
  };

  const toggleProfileDropdown = () => {
    setProfileDropdown(!profileDropdown);
  };

  const handleProfileAction = (action) => {
    if (action === 'logout') {
      console.log('Logging out...');
    }
    setProfileDropdown(false);
  };

  const toggleMobileNav = () => {
    setMobileNavActive(!mobileNavActive);
  };

  // Handle search term change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Trigger search on submit or Enter key press
  const handleSearchSubmit = () => {
    console.log('Global Search Term: ', searchTerm);
    // You can call a global search function here to search across all data on the page
  };

  // Handle pressing Enter key for search
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearchSubmit();
    }
  };

  return (
    <div className={Styles.Container}>
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
          onKeyPress={handleKeyPress} // Trigger search on Enter key press
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
          <FiMail className={Styles.Icon} />
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
              <li onClick={() => handleProfileAction('profile')}>Profile</li>
              <li onClick={() => handleProfileAction('settings')}>Settings</li>
              <li onClick={() => handleProfileAction('accounts')}>Account</li>
              <li onClick={() => handleProfileAction('notifications')}>Notifications</li>
              <li onClick={() => handleProfileAction('logout')}>Logout</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;
