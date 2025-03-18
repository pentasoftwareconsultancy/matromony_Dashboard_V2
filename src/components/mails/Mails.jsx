import React, { useState } from 'react';
import Data from '../../service/Data';
import Styles from './Mails.module.css';

function Mails() {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('date');

  // Filter mails based on search term
  const filteredMails = Data.mails.filter(
    (mail) =>
      mail.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      mail.sender.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Sort mails based on selected criteria
  const sortedMails = filteredMails.sort((a, b) => {
    if (sortBy === 'date') {
      return new Date(b.date) - new Date(a.date); // Sort by date (newest first)
    } else if (sortBy === 'sender') {
      return a.sender.localeCompare(b.sender); // Sort by sender alphabetically
    }
    return 0;
  });

  return (
    <div className={Styles.Container}>
      {/* Header Section */}
      <div className={Styles.Header}>
        <h2>Mails</h2>
        <p>Manage your incoming mails here.</p>
      </div>

      {/* Search Bar */}
      <div className={Styles.SearchBar}>
        <input
          type="text"
          placeholder="Search by subject or sender"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Sorting Options */}
      <div className={Styles.Sorting}>
        <label>Sort by:</label>
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="date">Date</option>
          <option value="sender">Sender</option>
        </select>
      </div>

      {/* Mails List */}
      <div className={Styles.MailList}>
        {sortedMails.map((mail) => (
          <div key={mail.id} className={Styles.MailItem}>
            <div className={Styles.MailSubject}>{mail.subject}</div>
            <div className={Styles.MailSender}>From: {mail.sender}</div>
            <div className={Styles.MailDate}>Date: {new Date(mail.date).toLocaleDateString()}</div>
            <div className={Styles.MailDetails}>
              <button className={Styles.ViewButton}>View Details</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Mails;
