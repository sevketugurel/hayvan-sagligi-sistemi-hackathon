import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar';
import '../styles/OwnerAnimals.css';

const OwnerAnimals = () => {
  const { ownerId } = useParams();
  const navigate = useNavigate();
  const [owner, setOwner] = useState(null);
  const [animals, setAnimals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    // Mock API call to fetch owner details and their animals
    const fetchOwnerAnimals = () => {
      setIsLoading(true);
      setError('');

      // Mock data (in real app, this would be an API call)
      setTimeout(() => {
        const mockOwner = {
          id: parseInt(ownerId),
          name: 'Ahmet Yılmaz',
          phone: '05551234567',
          email: 'ahmet.yilmaz@example.com',
          tcNo: '12345678901',
          address: 'Atatürk Mah. Cumhuriyet Cad. No:123 Ankara'
        };

        const mockAnimals = [
          {
            id: 101,
            name: 'Max',
            species: 'Köpek',
            breed: 'Golden Retriever',
            age: 3,
            gender: 'Erkek',
            chipNo: '123456789012345',
            lastVisit: '12.05.2023'
          },
          {
            id: 102,
            name: 'Luna',
            species: 'Kedi',
            breed: 'British Shorthair',
            age: 2,
            gender: 'Dişi',
            chipNo: '987654321098765',
            lastVisit: '25.06.2023'
          }
        ];

        setOwner(mockOwner);
        setAnimals(mockAnimals);
        setIsLoading(false);
      }, 1000);
    };

    fetchOwnerAnimals();
  }, [ownerId]);

  const handleAnimalSelect = (animalId) => {
    navigate(`/animal-details/${animalId}`);
  };

  if (isLoading) {
    return (
      <>
        <NavBar />
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Bilgiler yükleniyor...</p>
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <NavBar />
        <div className="error-container">
          <h2>Hata</h2>
          <p>{error}</p>
          <button onClick={() => navigate('/vet-dashboard')}>Dashboard'a Dön</button>
        </div>
      </>
    );
  }

  return (
    <>
      <NavBar />
      <div className="owner-animals-page">
        <div className="owner-animals-container">
          <div className="owner-info-section">
            <h1>{owner.name} - Hayvanları</h1>
            <div className="owner-details">
              <p><strong>Telefon:</strong> {owner.phone}</p>
              <p><strong>E-posta:</strong> {owner.email}</p>
              <p><strong>T.C. No:</strong> {owner.tcNo}</p>
              <p><strong>Adres:</strong> {owner.address}</p>
            </div>
          </div>

          <div className="animals-list-section">
            <h2>Hayvanlar</h2>
            {animals.length === 0 ? (
              <p className="no-animals">Bu kişiye ait hayvan kaydı bulunmamaktadır.</p>
            ) : (
              <div className="animals-grid">
                {animals.map(animal => (
                  <div 
                    key={animal.id} 
                    className="animal-card"
                    onClick={() => handleAnimalSelect(animal.id)}
                  >
                    <div className="animal-card-header">
                      <h3>{animal.name}</h3>
                      <span className="animal-type">{animal.species}</span>
                    </div>
                    <div className="animal-card-body">
                      <p><strong>Irk:</strong> {animal.breed}</p>
                      <p><strong>Yaş:</strong> {animal.age}</p>
                      <p><strong>Cinsiyet:</strong> {animal.gender}</p>
                      <p><strong>Çip No:</strong> {animal.chipNo}</p>
                      <p><strong>Son Ziyaret:</strong> {animal.lastVisit}</p>
                    </div>
                    <div className="animal-card-footer">
                      <button className="view-details-btn">Detayları Görüntüle</button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="back-button-container">
            <button 
              className="back-button" 
              onClick={() => navigate('/vet-dashboard')}
            >
              Geri Dön
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default OwnerAnimals; 