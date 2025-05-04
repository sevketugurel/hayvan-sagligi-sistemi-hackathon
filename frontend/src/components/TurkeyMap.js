import React, { useState, useCallback } from 'react';
import { Map, NavigationControl, Source, Layer, Marker, Popup } from 'react-map-gl/mapbox';
import 'mapbox-gl/dist/mapbox-gl.css';
import turkeyGeoJson from '../data/turkey.json';

// Mapbox token - use environment variable if available, otherwise fallback to demo token
// !!! ÖNEMLİ: Gerçek uygulamalarda bu token .env dosyasında saklanmalıdır
const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_TOKEN || 
  'pk.eyJ1IjoiZGVtby11c2VyIiwiYSI6ImNsMWloeXE3czA5eGgzam8xYnZnbnJ4a2QifQ.AbjlXQGbX-jQ0XjY_nNMfw';

const TurkeyMap = ({ onClick, selectedRegions = [], highlightColor = '#F7455D' }) => {
  // Türkiye haritası için görünüm ayarları
  const [viewState, setViewState] = useState({
    longitude: 35.24,
    latitude: 39.50,
    zoom: 5
  });
  
  // Popup için durum değişkenleri
  const [popupInfo, setPopupInfo] = useState(null);
  
  // Şehirleri GeoJSON'dan çıkart
  const cities = turkeyGeoJson.features.filter(feature => 
    feature.geometry.type === 'Point'
  );

  // Türkiye il sınırları için katman stili
  const turkeyLayerStyle = {
    id: 'turkey-fill',
    type: 'fill',
    paint: {
      'fill-color': [
        'case',
        ['boolean', ['in', ['get', 'name'], ['literal', selectedRegions]], false],
        highlightColor,
        '#ACDCF2' // varsayılan renk
      ],
      'fill-opacity': 0.7
    }
  };

  // Türkiye il sınırları için outline stili
  const turkeyOutlineStyle = {
    id: 'turkey-outline',
    type: 'line',
    paint: {
      'line-color': '#333',
      'line-width': 1
    }
  };
  
  // Harita üzerindeki bir lokasyona tıklandığında
  const onMapClick = useCallback((event) => {
    // Tıklama noktasındaki bölge bilgisini kontrol et
    if (onClick) {
      onClick(event);
    }
  }, [onClick]);
  
  // Şehir marker tıklaması için handler
  const handleMarkerClick = useCallback((city) => {
    setPopupInfo(city);
  }, []);

  return (
    <div style={{ width: '100%', height: '500px', position: 'relative' }}>
      <Map
        {...viewState}
        onMove={evt => setViewState(evt.viewState)}
        style={{ width: '100%', height: '100%', borderRadius: '8px' }}
        mapStyle="mapbox://styles/mapbox/light-v11"
        mapboxAccessToken={MAPBOX_TOKEN}
        onClick={onMapClick}
        attributionControl={false}
        interactive={true}
      >
        <NavigationControl position="top-right" />
        
        {/* Türkiye ana haritası */}
        <Source id="turkey-data" type="geojson" data={turkeyGeoJson}>
          <Layer {...turkeyLayerStyle} />
          <Layer {...turkeyOutlineStyle} />
        </Source>
        
        {/* Şehir marker'ları */}
        {cities.map((city) => (
          <Marker
            key={city.properties.id}
            longitude={city.geometry.coordinates[0]}
            latitude={city.geometry.coordinates[1]}
            onClick={() => handleMarkerClick(city)}
          >
            <div style={{ 
              width: '12px', 
              height: '12px', 
              backgroundColor: selectedRegions.includes(city.properties.name) ? highlightColor : '#1A73E8',
              borderRadius: '50%', 
              cursor: 'pointer',
              border: '2px solid white',
              boxShadow: '0 0 4px rgba(0,0,0,0.3)'
            }} />
          </Marker>
        ))}
        
        {/* Şehir etiketleri için katman */}
        <Source
          id="city-labels"
          type="geojson"
          data={{
            type: 'FeatureCollection',
            features: cities
          }}
        >
          <Layer
            id="city-labels-layer"
            type="symbol"
            paint={{
              'text-color': '#333',
              'text-halo-color': '#fff',
              'text-halo-width': 1.5
            }}
            layout={{
              'text-field': ['get', 'name'],
              'text-font': ['Open Sans Bold'],
              'text-offset': [0, -2],
              'text-size': 12,
              'text-allow-overlap': false,
              'text-ignore-placement': false
            }}
          />
        </Source>
        
        {/* Seçili şehir için popup */}
        {popupInfo && (
          <Popup
            longitude={popupInfo.geometry.coordinates[0]}
            latitude={popupInfo.geometry.coordinates[1]}
            anchor="bottom"
            closeOnClick={false}
            onClose={() => setPopupInfo(null)}
            closeButton={true}
          >
            <div style={{ padding: '8px', maxWidth: '300px' }}>
              <h3 style={{ margin: '0 0 8px 0' }}>{popupInfo.properties.name}</h3>
              <p style={{ margin: '0' }}>ID: {popupInfo.properties.id}</p>
              <p style={{ margin: '8px 0 0 0' }}>
                <button 
                  style={{
                    padding: '4px 12px',
                    backgroundColor: '#1A73E8',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer'
                  }}
                  onClick={() => {
                    if (onClick) {
                      onClick({ 
                        features: [popupInfo],
                        lngLat: { 
                          lng: popupInfo.geometry.coordinates[0], 
                          lat: popupInfo.geometry.coordinates[1] 
                        }
                      });
                    }
                    setPopupInfo(null);
                  }}
                >
                  Bu Şehri Seç
                </button>
              </p>
            </div>
          </Popup>
        )}
      </Map>
      <div style={{ 
        position: 'absolute', 
        bottom: '10px', 
        right: '10px', 
        background: 'rgba(255,255,255,0.8)', 
        padding: '5px', 
        borderRadius: '3px',
        fontSize: '12px'
      }}>
        Hayvan Sağlığı Sistemi Haritası 
      </div>
    </div>
  );
};

export default TurkeyMap; 