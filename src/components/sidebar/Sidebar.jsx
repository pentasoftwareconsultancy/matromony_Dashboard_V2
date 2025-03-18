import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
// import google from '../../assets/google.png';
// import google from "../image/logo1.jpeg"
import google from "../image/logo.png"
import { BiMale } from "react-icons/bi";
import { BiFemale } from "react-icons/bi";
import Styles from './Sidebar.module.css';
import {
  FiHome,
  FiUser,
  FiList,
  
  FiBox,
  FiShoppingCart,
  FiBarChart2,
  FiMail,
  FiSettings,
  FiLogOut,
  FiChevronLeft,
  FiChevronRight,
  FiChevronDown,
  FiChevronUp,
} from 'react-icons/fi';

const Sidebar = () => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [isServicesDropdownOpen, setIsServicesDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const toggleSidebar = () => setIsExpanded(!isExpanded);

  const handleLogout = () => {
    localStorage.removeItem('userToken');
    sessionStorage.clear();
    navigate('/login');
  };

  const toggleServicesDropdown = () => {
    setIsServicesDropdownOpen(!isServicesDropdownOpen);
  };

  const links = [
    { to: '/', label: 'Dashboard', icon: <FiHome /> },
    // { to: '/customer', label: 'Customer', icon: <FiUser /> },
    { to: '/bridemain', label: 'Bride', icon:<BiFemale /> },
    { to: '/Groommain', label: 'Groom', icon: <BiMale /> },
    { to: '/categories', label: 'Committee Members', icon: <FiList /> },
    
   
    { to: '/analytics', label: 'Analytics', icon: <FiBarChart2 /> },
    // { to: '/mails', label: 'Mails', icon: <FiMail /> },
    // { to: '/settings', label: 'Settings', icon: <FiSettings /> },
  ];

  const servicesLinks = [
    { to: '/event', label: 'Event' },
    { to: '/vendormain', label: 'Vendor' },
    { to: '/blogmain', label: 'Blog' },
  ];

  return (
    <aside
      className={`${Styles.Sidebar} ${isExpanded ? Styles.Expanded : Styles.Collapsed}`}
    >
      <div className={Styles.ToggleButton} onClick={toggleSidebar}>
        {isExpanded ? <FiChevronLeft /> : <FiChevronRight />}
      </div>
      <div className={Styles.Brand}>
        <img src={google} alt="Google Store"  />
      </div>
      <nav className={Styles.Nav}>
        {links.map((link, index) => (
          <NavLink
            key={index}
            to={link.to}
            className={({ isActive }) =>
              `${Styles.Link} ${isActive ? Styles.Active : ''}`
            }
          >
            <span className={Styles.Icon}>{link.icon}</span>
            {isExpanded && <span className={Styles.Label}>{link.label}</span>}
          </NavLink>
        ))}

        {/* Dropdown for Services */}
        <div
          className={`${Styles.Link} ${Styles.Dropdown} ${
            isServicesDropdownOpen ? Styles.Active : ''
          }`}
          onClick={toggleServicesDropdown}
        >
          <span className={Styles.Icon}>
            <FiUser />
          </span>
          {isExpanded && (
            <>
              <span className={Styles.Label}>Services</span>
              <span className={Styles.DropdownIcon}>
                {isServicesDropdownOpen ? <FiChevronUp /> : <FiChevronDown />}
              </span>
            </>
          )}
        </div>
        {isServicesDropdownOpen && isExpanded && (
          <div className={Styles.DropdownContent}>
            {servicesLinks.map((service, index) => (
              <NavLink
                key={index}
                to={service.to}
                className={({ isActive }) =>
                  `${Styles.Link} ${Styles.SubLink} ${
                    isActive ? Styles.Active : ''
                  }`
                }
              >
                <span className={Styles.Label}>{service.label}</span>
              </NavLink>
            ))}
          </div>
        )}
      </nav>
      {/* <button className={`${Styles.Logout} ${Styles.LogoutButton}`} onClick={handleLogout}>
        <FiLogOut className={Styles.LogButton} />
        {isExpanded && <div className={Styles.Text}>Logout</div>}
      </button> */}
    </aside>
  );
};

export default Sidebar;
