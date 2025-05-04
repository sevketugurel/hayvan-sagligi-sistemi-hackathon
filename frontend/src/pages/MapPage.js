import React, { useState } from 'react';
import TurkeyMap from '../components/TurkeyMap';

const MapPage = () => {
  const [selectedRegions, setSelectedRegions] = useState([]);
  const [lastSelectedRegion, setLastSelectedRegion] = useState(null);

  const handleMapClick = (event) => {
    // Haritada tıklanan bir şehir varsa
    if (event.features && event.features.length > 0) {
      const feature = event.features[0];
      const regionName = feature.properties.name;
      
      // Zaten seçiliyse kaldır, değilse ekle
      if (selectedRegions.includes(regionName)) {
        setSelectedRegions(selectedRegions.filter(r => r !== regionName));
        setLastSelectedRegion(null);
      } else {
        setSelectedRegions([...selectedRegions, regionName]);
        setLastSelectedRegion({
          name: regionName,
          id: feature.properties.id,
          coordinates: feature.geometry.coordinates
        });
      }
    }
  };

  return (
    <div className="map-page-container" style={{ padding: '20px' }}>
      <h1>Türkiye Hayvan Sağlığı Haritası</h1>
      
      <div className="map-controls" style={{ marginBottom: '20px' }}>
        <p>Harita üzerindeki şehirlere tıklayarak seçim yapabilirsiniz.</p>
        <button 
          onClick={() => {
            setSelectedRegions([]);
            setLastSelectedRegion(null);
          }} 
          disabled={selectedRegions.length === 0}
          style={{
            padding: '8px 16px',
            backgroundColor: '#f44336',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: selectedRegions.length === 0 ? 'not-allowed' : 'pointer',
            opacity: selectedRegions.length === 0 ? 0.6 : 1
          }}
        >
          Seçimleri Temizle
        </button>
      </div>
      
      <div className="map-container" style={{ border: '1px solid #ddd', borderRadius: '8px', overflow: 'hidden' }}>
        <TurkeyMap
          onClick={handleMapClick}
          selectedRegions={selectedRegions}
          highlightColor="#F7455D"
        />
      </div>
      
      {selectedRegions.length > 0 && (
        <div className="selected-regions" style={{ marginTop: '20px' }}>
          <h2>Seçilen Bölgeler</h2>
          <ul style={{ padding: '0', listStyle: 'none' }}>
            {selectedRegions.map(region => (
              <li 
                key={region}
                style={{
                  display: 'inline-block',
                  padding: '8px 16px',
                  margin: '4px',
                  backgroundColor: '#e0e0e0',
                  borderRadius: '20px',
                  cursor: 'pointer'
                }}
                onClick={() => {
                  setSelectedRegions(selectedRegions.filter(r => r !== region));
                  if (lastSelectedRegion && lastSelectedRegion.name === region) {
                    setLastSelectedRegion(null);
                  }
                }}
              >
                {region} <span style={{ marginLeft: '4px' }}>×</span>
              </li>
            ))}
          </ul>
        </div>
      )}
      
      {lastSelectedRegion && (
        <div className="region-details" style={{ marginTop: '20px', padding: '16px', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
          <h2>Seçilen Son Bölge Bilgileri</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
            <div>
              <p><strong>Bölge Adı:</strong> {lastSelectedRegion.name}</p>
              <p><strong>Bölge ID:</strong> {lastSelectedRegion.id}</p>
              <p><strong>Koordinatlar:</strong> {lastSelectedRegion.coordinates.join(', ')}</p>
            </div>
            <div>
              <h3>Hayvan Sağlık İstatistikleri (Örnek)</h3>
              <ul>
                <li>Veteriner Sayısı: 123</li>
                <li>Klinik Sayısı: 45</li>
                <li>Kayıtlı Hayvan Sayısı: 12,568</li>
                <li>Aşılama Oranı: %78</li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MapPage; 