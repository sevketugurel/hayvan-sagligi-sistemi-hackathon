import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/AdvancedSearch.css';

const AdvancedSearch = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useState({
    name: '',
    chipId: '',
    species: '',
    breed: '',
    owner: '',
    ageMin: '',
    ageMax: '',
    gender: '',
    status: ''
  });
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [exportFormat, setExportFormat] = useState('csv');
  const [showExportOptions, setShowExportOptions] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchParams(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setIsSearching(true);
    setHasSearched(true);

    // Mock API call
    setTimeout(() => {
      // Generate mock results based on search params
      const mockResults = generateMockResults(searchParams);
      setSearchResults(mockResults);
      setIsSearching(false);
    }, 1000);
  };

  const handleClear = () => {
    setSearchParams({
      name: '',
      chipId: '',
      species: '',
      breed: '',
      owner: '',
      ageMin: '',
      ageMax: '',
      gender: '',
      status: ''
    });
    setSearchResults([]);
    setHasSearched(false);
  };

  const handleAnimalSelect = (animalId) => {
    navigate(`/animal-details/${animalId}`);
  };

  const toggleExportOptions = () => {
    setShowExportOptions(!showExportOptions);
  };

  const handleExportFormatChange = (e) => {
    setExportFormat(e.target.value);
  };

  const exportResults = () => {
    if (searchResults.length === 0) return;

    if (exportFormat === 'csv') {
      exportAsCSV();
    } else if (exportFormat === 'pdf') {
      exportAsPDF();
    }
  };

  const exportAsCSV = () => {
    // Define the CSV headers
    const headers = [
      'ID',
      'Hasta Adı',
      'Tür',
      'Irk',
      'Sahip',
      'Yaş',
      'Cinsiyet',
      'Durum',
      'Son Ziyaret'
    ];

    // Convert the data to CSV rows
    const csvRows = [];
    
    // Add the headers
    csvRows.push(headers.join(','));
    
    // Add the data rows
    for (const animal of searchResults) {
      const values = [
        animal.id,
        `"${animal.name}"`,
        `"${animal.species}"`,
        `"${animal.breed}"`,
        `"${animal.owner}"`,
        animal.age,
        `"${animal.gender}"`,
        `"${animal.status}"`,
        `"${animal.lastVisit}"`
      ];
      csvRows.push(values.join(','));
    }
    
    // Combine into a CSV string
    const csvString = csvRows.join('\n');
    
    // Create a blob and download link
    const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `hasta_arama_sonuclari_${new Date().toISOString().slice(0, 10)}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const exportAsPDF = () => {
    // In a real application, this would use a library like jsPDF
    // For this demo, we'll just show an alert
    alert('PDF export functionality would be implemented with a library like jsPDF in a real application.');
  };

  // Mock data generation based on search params
  const generateMockResults = (params) => {
    const mockAnimals = [
      {
        id: 1,
        name: 'Max',
        chipId: '123456789012345',
        species: 'Köpek',
        breed: 'Golden Retriever',
        owner: 'Ahmet Yılmaz',
        age: 3,
        gender: 'Erkek',
        status: 'Taburcu',
        lastVisit: '10.07.2023'
      },
      {
        id: 2,
        name: 'Luna',
        chipId: '987654321098765',
        species: 'Kedi',
        breed: 'British Shorthair',
        owner: 'Ayşe Demir',
        age: 5,
        gender: 'Dişi',
        status: 'Taburcu',
        lastVisit: '15.08.2023'
      },
      {
        id: 3,
        name: 'Karamel',
        chipId: '567890123456789',
        species: 'Köpek',
        breed: 'Labrador',
        owner: 'Mehmet Can',
        age: 2,
        gender: 'Erkek',
        status: 'Yatılı Tedavi',
        lastVisit: '22.09.2023'
      },
      {
        id: 4,
        name: 'Pamuk',
        chipId: '345678901234567',
        species: 'Kedi',
        breed: 'Scottish Fold',
        owner: 'Zeynep Yıldız',
        age: 1,
        gender: 'Dişi',
        status: 'Taburcu',
        lastVisit: '05.10.2023'
      },
      {
        id: 5,
        name: 'Rocky',
        chipId: '789012345678901',
        species: 'Köpek',
        breed: 'Alman Çoban Köpeği',
        owner: 'Ali Kaya',
        age: 4,
        gender: 'Erkek',
        status: 'Yatılı Tedavi',
        lastVisit: '18.10.2023'
      }
    ];

    // Filter based on search params
    return mockAnimals.filter(animal => {
      // Name filter
      if (params.name && !animal.name.toLowerCase().includes(params.name.toLowerCase())) {
        return false;
      }
      
      // Chip ID filter
      if (params.chipId && !animal.chipId.includes(params.chipId)) {
        return false;
      }
      
      // Species filter
      if (params.species && animal.species !== params.species) {
        return false;
      }
      
      // Breed filter
      if (params.breed && !animal.breed.toLowerCase().includes(params.breed.toLowerCase())) {
        return false;
      }
      
      // Owner filter
      if (params.owner && !animal.owner.toLowerCase().includes(params.owner.toLowerCase())) {
        return false;
      }
      
      // Age range filter
      if (params.ageMin && animal.age < parseInt(params.ageMin)) {
        return false;
      }
      
      if (params.ageMax && animal.age > parseInt(params.ageMax)) {
        return false;
      }
      
      // Gender filter
      if (params.gender && animal.gender !== params.gender) {
        return false;
      }
      
      // Status filter
      if (params.status && animal.status !== params.status) {
        return false;
      }
      
      return true;
    });
  };

  return (
    <div className="advanced-search-container">
      <div className="search-form-container">
        <h2>Gelişmiş Hasta Arama</h2>
        
        <form className="search-form" onSubmit={handleSearch}>
          <div className="search-row">
            <div className="search-field">
              <label htmlFor="name">Hasta Adı</label>
              <input
                type="text"
                id="name"
                name="name"
                value={searchParams.name}
                onChange={handleInputChange}
                placeholder="Hasta adını girin"
              />
            </div>
            
            <div className="search-field">
              <label htmlFor="chipId">Çip Numarası</label>
              <input
                type="text"
                id="chipId"
                name="chipId"
                value={searchParams.chipId}
                onChange={handleInputChange}
                placeholder="Çip numarasını girin"
              />
            </div>
          </div>
          
          <div className="search-row">
            <div className="search-field">
              <label htmlFor="species">Tür</label>
              <select
                id="species"
                name="species"
                value={searchParams.species}
                onChange={handleInputChange}
              >
                <option value="">Seçiniz</option>
                <option value="Köpek">Köpek</option>
                <option value="Kedi">Kedi</option>
                <option value="Kuş">Kuş</option>
                <option value="Kemirgen">Kemirgen</option>
                <option value="Diğer">Diğer</option>
              </select>
            </div>
            
            <div className="search-field">
              <label htmlFor="breed">Irk</label>
              <input
                type="text"
                id="breed"
                name="breed"
                value={searchParams.breed}
                onChange={handleInputChange}
                placeholder="Irk bilgisini girin"
              />
            </div>
          </div>
          
          <div className="search-row">
            <div className="search-field">
              <label htmlFor="owner">Sahip Adı</label>
              <input
                type="text"
                id="owner"
                name="owner"
                value={searchParams.owner}
                onChange={handleInputChange}
                placeholder="Hasta sahibi adını girin"
              />
            </div>
            
            <div className="search-field age-range">
              <label>Yaş Aralığı</label>
              <div className="age-inputs">
                <input
                  type="number"
                  name="ageMin"
                  value={searchParams.ageMin}
                  onChange={handleInputChange}
                  placeholder="Min"
                  min="0"
                />
                <span>-</span>
                <input
                  type="number"
                  name="ageMax"
                  value={searchParams.ageMax}
                  onChange={handleInputChange}
                  placeholder="Max"
                  min="0"
                />
              </div>
            </div>
          </div>
          
          <div className="search-row">
            <div className="search-field">
              <label htmlFor="gender">Cinsiyet</label>
              <select
                id="gender"
                name="gender"
                value={searchParams.gender}
                onChange={handleInputChange}
              >
                <option value="">Seçiniz</option>
                <option value="Erkek">Erkek</option>
                <option value="Dişi">Dişi</option>
              </select>
            </div>
            
            <div className="search-field">
              <label htmlFor="status">Durum</label>
              <select
                id="status"
                name="status"
                value={searchParams.status}
                onChange={handleInputChange}
              >
                <option value="">Seçiniz</option>
                <option value="Taburcu">Taburcu</option>
                <option value="Yatılı Tedavi">Yatılı Tedavi</option>
              </select>
            </div>
          </div>
          
          <div className="search-actions">
            <button type="button" className="clear-btn" onClick={handleClear}>
              Temizle
            </button>
            <button type="submit" className="search-btn" disabled={isSearching}>
              {isSearching ? 'Aranıyor...' : 'Ara'}
            </button>
          </div>
        </form>
      </div>
      
      <div className="search-results-container">
        <h3>Arama Sonuçları</h3>
        
        {isSearching ? (
          <div className="loading-results">
            <div className="loading-spinner"></div>
            <p>Arama yapılıyor...</p>
          </div>
        ) : (
          <>
            {hasSearched && (
              <div className="results-info">
                <span className="results-count">{searchResults.length} hasta bulundu</span>
                
                {searchResults.length > 0 && (
                  <div className="export-controls">
                    <button 
                      className="export-toggle-btn" 
                      onClick={toggleExportOptions}
                    >
                      Dışa Aktar <span>{showExportOptions ? '▲' : '▼'}</span>
                    </button>
                    
                    {showExportOptions && (
                      <div className="export-options">
                        <div className="export-format-selection">
                          <label>
                            <input 
                              type="radio" 
                              name="exportFormat" 
                              value="csv" 
                              checked={exportFormat === 'csv'}
                              onChange={handleExportFormatChange}
                            />
                            CSV
                          </label>
                          <label>
                            <input 
                              type="radio" 
                              name="exportFormat" 
                              value="pdf" 
                              checked={exportFormat === 'pdf'}
                              onChange={handleExportFormatChange}
                            />
                            PDF
                          </label>
                        </div>
                        <button 
                          className="export-btn" 
                          onClick={exportResults}
                        >
                          {exportFormat.toUpperCase()} olarak indir
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
            
            {searchResults.length > 0 ? (
              <div className="results-table-container">
                <table className="results-table">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Hasta Adı</th>
                      <th>Tür</th>
                      <th>Irk</th>
                      <th>Sahip</th>
                      <th>Yaş</th>
                      <th>Cinsiyet</th>
                      <th>Durum</th>
                      <th>Son Ziyaret</th>
                      <th>İşlemler</th>
                    </tr>
                  </thead>
                  <tbody>
                    {searchResults.map(animal => (
                      <tr key={animal.id} className={animal.status === 'Yatılı Tedavi' ? 'hospitalized-row' : ''}>
                        <td>{animal.id}</td>
                        <td>{animal.name}</td>
                        <td>{animal.species}</td>
                        <td>{animal.breed}</td>
                        <td>{animal.owner}</td>
                        <td>{animal.age}</td>
                        <td>{animal.gender}</td>
                        <td>
                          <span className={`status-badge ${animal.status === 'Yatılı Tedavi' ? 'hospitalized' : 'discharged'}`}>
                            {animal.status}
                          </span>
                        </td>
                        <td>{animal.lastVisit}</td>
                        <td>
                          <button 
                            className="view-details-btn" 
                            onClick={() => handleAnimalSelect(animal.id)}
                          >
                            Detaylar
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              hasSearched && (
                <div className="no-results">
                  <i className="no-results-icon">🔍</i>
                  <p>Aramanıza uygun hasta bulunamadı.</p>
                  <p className="no-results-hint">Farklı arama kriterleri deneyebilirsiniz.</p>
                </div>
              )
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default AdvancedSearch; 