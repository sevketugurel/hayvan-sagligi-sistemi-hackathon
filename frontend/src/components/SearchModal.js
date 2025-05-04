import React, { useState } from 'react';
import '../styles/SearchModal.css';

const SearchModal = ({ onClose, onSearchResult }) => {
  const [activeTab, setActiveTab] = useState('owner');
  const [ownerName, setOwnerName] = useState('');
  const [ownerPhone, setOwnerPhone] = useState('');
  const [ownerTcNo, setOwnerTcNo] = useState('');
  const [animalChipNo, setAnimalChipNo] = useState('');
  const [animalName, setAnimalName] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleOwnerSearch = (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Validate inputs
    if (!ownerName && !ownerPhone && !ownerTcNo) {
      setError('Lütfen en az bir arama kriteri giriniz.');
      setIsLoading(false);
      return;
    }

    // Mock API call for owner search
    setTimeout(() => {
      // Mock response data
      const mockOwnerResults = [
        {
          id: 1,
          type: 'owner',
          name: 'Ahmet Yılmaz',
          phone: '05551234567',
          tcNo: '12345678901',
          animals: [
            { id: 101, name: 'Max', species: 'Köpek', breed: 'Golden Retriever' },
            { id: 102, name: 'Luna', species: 'Kedi', breed: 'British Shorthair' }
          ]
        },
        {
          id: 2,
          type: 'owner',
          name: 'Ayşe Demir',
          phone: '05559876543',
          tcNo: '98765432109',
          animals: [
            { id: 103, name: 'Boncuk', species: 'Kedi', breed: 'Tekir' }
          ]
        }
      ];

      setSearchResults(mockOwnerResults);
      setIsLoading(false);
    }, 1000);
  };

  const handleAnimalSearch = (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Validate inputs
    if (!animalChipNo && !animalName) {
      setError('Lütfen çip numarası veya hayvan adı giriniz.');
      setIsLoading(false);
      return;
    }

    // Mock API call for animal search
    setTimeout(() => {
      // Mock response data
      const mockAnimalResults = [
        {
          id: 1,
          type: 'animal',
          name: 'Max',
          chipNo: '123456789012345',
          species: 'Köpek',
          breed: 'Golden Retriever',
          age: 3,
          owner: {
            id: 1,
            name: 'Ahmet Yılmaz'
          }
        },
        {
          id: 2,
          type: 'animal',
          name: 'Luna',
          chipNo: '987654321098765',
          species: 'Kedi',
          breed: 'British Shorthair',
          age: 2,
          owner: {
            id: 2,
            name: 'Ayşe Demir'
          }
        },
        {
          id: 3,
          type: 'animal',
          name: 'Pamuk',
          chipNo: '567891234567890',
          species: 'Kedi',
          breed: 'Scottish Fold',
          age: 5,
          owner: {
            id: 3,
            name: 'Mehmet Kaya'
          }
        },
        {
          id: 4,
          type: 'animal',
          name: 'Karamel',
          chipNo: '567890123456789',
          species: 'Köpek',
          breed: 'Labrador',
          age: 2,
          owner: {
            id: 4,
            name: 'Mehmet Can'
          }
        },
        {
          id: 5,
          type: 'animal',
          name: 'Rocky',
          chipNo: '789012345678901',
          species: 'Köpek',
          breed: 'Alman Çoban Köpeği',
          age: 4,
          owner: {
            id: 5,
            name: 'Ali Kaya'
          }
        }
      ].filter(animal => {
        // Filter based on user input (case insensitive)
        if (animalName && !animal.name.toLowerCase().includes(animalName.toLowerCase())) {
          return false;
        }
        if (animalChipNo && !animal.chipNo.includes(animalChipNo)) {
          return false;
        }
        return true;
      });

      setSearchResults(mockAnimalResults);
      setIsLoading(false);
    }, 1000);
  };

  const handleResultSelect = (result) => {
    onSearchResult(result);
  };

  const handleOwnerSelect = (owner) => {
    if (owner.animals.length === 1) {
      // If owner has only one animal, redirect directly to animal details
      onSearchResult({
        type: 'animal',
        id: owner.animals[0].id
      });
    } else {
      // If owner has multiple animals, show the owner's animals list
      onSearchResult({
        type: 'owner',
        id: owner.id
      });
    }
  };

  return (
    <div className="modal-overlay">
      <div className="search-modal">
        <div className="modal-header">
          <h2>Hasta Sorgulama</h2>
          <button className="close-button" onClick={onClose}>×</button>
        </div>

        <div className="search-tabs">
          <button 
            className={`tab-btn ${activeTab === 'owner' ? 'active' : ''}`}
            onClick={() => setActiveTab('owner')}
          >
            Hayvan Sahibi Bilgileri ile Sorgulama
          </button>
          <button 
            className={`tab-btn ${activeTab === 'animal' ? 'active' : ''}`}
            onClick={() => setActiveTab('animal')}
          >
            Hayvan Bilgileri ile Sorgulama
          </button>
        </div>

        <div className="search-content">
          {activeTab === 'owner' ? (
            <form onSubmit={handleOwnerSearch}>
              <div className="form-group">
                <label>Hayvan Sahibi Adı:</label>
                <input 
                  type="text" 
                  value={ownerName}
                  onChange={(e) => setOwnerName(e.target.value)}
                  placeholder="Hayvan sahibinin adını giriniz"
                />
              </div>
              
              <div className="form-group">
                <label>Telefon Numarası:</label>
                <input 
                  type="text" 
                  value={ownerPhone}
                  onChange={(e) => setOwnerPhone(e.target.value)}
                  placeholder="05XX XXX XXXX"
                />
              </div>
              
              <div className="form-group">
                <label>T.C. Kimlik Numarası:</label>
                <input 
                  type="text" 
                  value={ownerTcNo}
                  onChange={(e) => setOwnerTcNo(e.target.value)}
                  placeholder="11 haneli T.C. Kimlik No"
                />
              </div>
              
              <button type="submit" className="search-submit-btn" disabled={isLoading}>
                {isLoading ? 'Sorgulanıyor...' : 'Sorgula'}
              </button>
            </form>
          ) : (
            <form onSubmit={handleAnimalSearch}>
              <div className="form-group">
                <label>Çip Numarası:</label>
                <input 
                  type="text" 
                  value={animalChipNo}
                  onChange={(e) => setAnimalChipNo(e.target.value)}
                  placeholder="15 haneli çip numarası"
                />
              </div>
              
              <div className="form-group">
                <label>Hayvan Adı:</label>
                <input 
                  type="text" 
                  value={animalName}
                  onChange={(e) => setAnimalName(e.target.value)}
                  placeholder="Hayvanın adını giriniz"
                />
              </div>
              
              <button type="submit" className="search-submit-btn" disabled={isLoading}>
                {isLoading ? 'Sorgulanıyor...' : 'Sorgula'}
              </button>
            </form>
          )}

          {error && <div className="error-message">{error}</div>}

          {searchResults.length > 0 && (
            <div className="search-results">
              <h3>Arama Sonuçları:</h3>
              <ul className="results-list">
                {searchResults.map(result => (
                  <li key={result.id} className="result-item">
                    {result.type === 'owner' ? (
                      <div className="owner-result" onClick={() => handleOwnerSelect(result)}>
                        <div className="result-title">{result.name}</div>
                        <div className="result-details">
                          <span>Tel: {result.phone}</span>
                          <span>Hayvan Sayısı: {result.animals.length}</span>
                        </div>
                        <div className="result-animals">
                          Hayvanlar: {result.animals.map(animal => animal.name).join(', ')}
                        </div>
                      </div>
                    ) : (
                      <div className="animal-result" onClick={() => handleResultSelect(result)}>
                        <div className="result-title">{result.name}</div>
                        <div className="result-details">
                          <span>Tür: {result.species}</span>
                          <span>Irk: {result.breed}</span>
                          <span>Yaş: {result.age}</span>
                        </div>
                        <div className="result-owner">
                          Sahibi: {result.owner.name}
                        </div>
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchModal; 