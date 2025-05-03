import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar';
import AddVaccineModal from '../components/AddVaccineModal';
import '../styles/Vaccinations.css';

const Vaccines = () => {
  const navigate = useNavigate();
  const [vaccinations, setVaccinations] = useState([]);
  const [filteredVaccinations, setFilteredVaccinations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);

  useEffect(() => {
    // Fetch vaccinations data
    const fetchVaccinations = async () => {
      setIsLoading(true);
      try {
        // Mock data for demonstration
        const mockVaccinations = [
          {
            id: 1,
            date: '15.09.2023',
            status: 'Tamamlandı',
            vaccine: 'Kuduz Aşısı',
            nextDueDate: '15.09.2024',
            administeredBy: 'Dr. Mehmet Yılmaz',
            veterinaryClinic: 'Hayat Veteriner Kliniği',
            notes: 'Sonraki sene tekrarlanacak'
          },
          {
            id: 2,
            date: '10.08.2023',
            status: 'Tamamlandı',
            vaccine: 'Parvovirüs + Distemper Kombine Aşı',
            nextDueDate: '10.08.2024',
            administeredBy: 'Dr. Ayşe Demir',
            veterinaryClinic: 'Hayat Veteriner Kliniği',
            notes: 'Hafif iştahsızlık görülebilir'
          },
          {
            id: 3,
            status: 'Planlandı',
            date: '25.10.2023',
            vaccine: 'Leptospiroz Aşısı',
            administeredBy: 'Dr. Mehmet Yılmaz',
            veterinaryClinic: 'Hayat Veteriner Kliniği',
            notes: 'İkinci doz'
          },
          {
            id: 4,
            status: 'Planlandı',
            date: '15.11.2023',
            vaccine: 'Kennel Cough Aşısı',
            administeredBy: 'Dr. Ayşe Demir',
            veterinaryClinic: 'Hayat Veteriner Kliniği'
          }
        ];

        // Sort by date (most recent first)
        const sortedVaccinations = [...mockVaccinations].sort((a, b) => {
          const dateA = new Date(a.date.split('.').reverse().join('-'));
          const dateB = new Date(b.date.split('.').reverse().join('-'));
          return dateB - dateA;
        });

        setVaccinations(sortedVaccinations);
        setFilteredVaccinations(sortedVaccinations);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching vaccinations:', error);
        setError('Aşı bilgileri yüklenirken bir hata oluştu.');
        setIsLoading(false);
      }
    };

    fetchVaccinations();
  }, []);

  // Filter vaccinations based on active filter
  useEffect(() => {
    if (activeFilter === 'all') {
      setFilteredVaccinations(vaccinations);
    } else if (activeFilter === 'completed') {
      setFilteredVaccinations(vaccinations.filter(v => v.status === 'Tamamlandı'));
    } else if (activeFilter === 'planned') {
      setFilteredVaccinations(vaccinations.filter(v => v.status === 'Planlandı'));
    }
  }, [activeFilter, vaccinations]);

  // Handle filter button click
  const handleFilterClick = (filter) => {
    setActiveFilter(filter);
  };

  // Navigate back to previous page
  const handleGoBack = () => {
    navigate(-1);
  };

  // Handle adding a new vaccine
  const handleAddVaccine = (newVaccine) => {
    // Format date to DD.MM.YYYY
    const formatDate = (dateString) => {
      const date = new Date(dateString);
      return `${String(date.getDate()).padStart(2, '0')}.${String(date.getMonth() + 1).padStart(2, '0')}.${date.getFullYear()}`;
    };

    const formattedVaccine = {
      ...newVaccine,
      date: formatDate(newVaccine.date),
      nextDueDate: newVaccine.nextDueDate ? formatDate(newVaccine.nextDueDate) : ''
    };

    const updatedVaccinations = [formattedVaccine, ...vaccinations];
    
    // Sort by date (most recent first)
    const sortedVaccinations = [...updatedVaccinations].sort((a, b) => {
      const dateA = new Date(a.date.split('.').reverse().join('-'));
      const dateB = new Date(b.date.split('.').reverse().join('-'));
      return dateB - dateA;
    });

    setVaccinations(sortedVaccinations);
    setShowAddModal(false);
  };

  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Aşı bilgileri yükleniyor...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <p className="error-message">{error}</p>
        <button className="retry-btn" onClick={() => window.location.reload()}>
          Tekrar Dene
        </button>
      </div>
    );
  }

  return (
    <div className="vaccines-page">
      <NavBar />
      <div className="vaccines-content">
        <div className="vaccines-header">
          <div className="header-title-container">
            <h2>Aşı Takip Sistemi</h2>
            <button 
              className="add-vaccine-button" 
              onClick={() => setShowAddModal(true)}
            >
              <i className="add-icon">➕</i> Yeni Aşı Ekle
            </button>
          </div>
          <div className="filters-container">
            <button 
              className={`filter-btn ${activeFilter === 'all' ? 'active' : ''}`}
              onClick={() => handleFilterClick('all')}
            >
              Tümü
            </button>
            <button 
              className={`filter-btn ${activeFilter === 'completed' ? 'active' : ''}`}
              onClick={() => handleFilterClick('completed')}
            >
              Tamamlanan
            </button>
            <button 
              className={`filter-btn ${activeFilter === 'planned' ? 'active' : ''}`}
              onClick={() => handleFilterClick('planned')}
            >
              Planlanan
            </button>
          </div>
        </div>

        <div className="vaccinations-container">
          {filteredVaccinations.length > 0 ? (
            filteredVaccinations.map(vaccination => (
              <div key={vaccination.id} className={`vaccination-card ${vaccination.status === 'Tamamlandı' ? 'completed' : 'planned'}`}>
                <div className="vaccination-header">
                  <div className="vaccination-date-container">
                    <i className="date-icon">📅</i>
                    <span className="vaccination-date">{vaccination.date}</span>
                  </div>
                  <span className={`vaccination-status-badge ${vaccination.status === 'Tamamlandı' ? 'completed-badge' : 'upcoming-badge'}`}>
                    {vaccination.status}
                  </span>
                </div>
                
                <div className="vaccination-content">
                  <h4>Aşı Bilgileri</h4>
                  <div className="vaccination-items">
                    <div className="vaccination-item">
                      <div className="item-icon">💉</div>
                      <div className="item-name">{vaccination.vaccine}</div>
                    </div>
                    
                    <div className="vaccination-item">
                      <div className="item-icon">👨‍⚕️</div>
                      <div className="item-name">{vaccination.administeredBy}</div>
                    </div>
                    
                    <div className="vaccination-item">
                      <div className="item-icon">🏥</div>
                      <div className="item-name">{vaccination.veterinaryClinic}</div>
                    </div>
                    
                    {vaccination.nextDueDate && (
                      <div className="vaccination-item">
                        <div className="item-icon">⏰</div>
                        <div className="item-name">Sonraki: {vaccination.nextDueDate}</div>
                      </div>
                    )}
                    
                    {vaccination.notes && (
                      <div className="vaccination-item">
                        <div className="item-icon">📝</div>
                        <div className="item-name">{vaccination.notes}</div>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="vaccination-actions">
                  <button className="action-btn yazdır-btn">
                    <i className="print-icon">🖨️</i> Yazdır
                  </button>
                  <button className="action-btn detaylar-btn">
                    <i className="details-icon">🔍</i> Detaylar
                  </button>
                  {vaccination.status !== 'Tamamlandı' && (
                    <button className="action-btn yenile-btn">
                      <i className="renew-icon">✅</i> Tamamlandı
                    </button>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="no-vaccinations">
              <i className="no-data-icon">💉</i>
              <p>Seçili filtreye uygun aşı bulunmamaktadır.</p>
            </div>
          )}
        </div>
        
        <div className="back-button-container">
          <button className="back-button" onClick={handleGoBack}>
            <i className="back-icon">←</i> Geri Dön
          </button>
        </div>
      </div>

      {/* Floating action button for adding new vaccines */}
      <button 
        className="add-vaccine-fab" 
        onClick={() => setShowAddModal(true)}
        title="Yeni Aşı Ekle"
      >
        ➕
      </button>

      {showAddModal && (
        <AddVaccineModal 
          onClose={() => setShowAddModal(false)} 
          onSave={handleAddVaccine} 
        />
      )}
    </div>
  );
};

export default Vaccines; 