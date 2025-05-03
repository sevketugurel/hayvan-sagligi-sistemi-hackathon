import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar';
import '../styles/VetDashboard.css';
import SearchModal from '../components/SearchModal';

const VetDashboard = () => {
  const [showSearchModal, setShowSearchModal] = useState(false);
  const navigate = useNavigate();

  const openSearchModal = () => {
    setShowSearchModal(true);
  };

  const closeSearchModal = () => {
    setShowSearchModal(false);
  };

  const handleSearchResult = (result) => {
    if (result.type === 'animal') {
      // Redirect directly to animal details
      navigate(`/animal-details/${result.id}`);
    } else if (result.type === 'owner') {
      // Show owner's animals list
      navigate(`/owner-animals/${result.id}`);
    }
    closeSearchModal();
  };

  return (
    <>
      <NavBar />
      <div className="dashboard-page">
        <div className="dashboard-container">
          <h1>Veteriner Dashboard</h1>
          
          <div className="dashboard-actions">
            <button 
              className="search-button" 
              onClick={openSearchModal}
            >
              <i className="search-icon">🔍</i>
              Sorgula
            </button>
            {/* Other dashboard actions can be added here */}
          </div>

          <div className="dashboard-content">
            <p>Hoş geldiniz! Hasta kaydını sorgulamak için "Sorgula" butonunu kullanabilirsiniz.</p>
            {/* Other dashboard content */}
          </div>

          {showSearchModal && (
            <SearchModal 
              onClose={closeSearchModal} 
              onSearchResult={handleSearchResult}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default VetDashboard; 