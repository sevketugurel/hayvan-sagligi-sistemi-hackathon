import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './TurkeyDiseaseMap.css';

// Leaflet ikon hatası için düzeltme
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

// Harita ikon sorunu düzeltmesi
const DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

const TurkeyDiseaseMap = ({ diseaseOutbreaks = [], onRegionClick }) => {
  // Harita için DOM referansı
  const mapRef = useRef(null);
  // Leaflet harita instance'ı
  const mapInstanceRef = useRef(null);
  // Tüm marker'ları tutacak bir layer grubu
  const markersLayerRef = useRef(null);

  // Hastalık durumlarına göre renkler
  const statusColors = {
    'aktif': '#f44336',
    'kontrol altında': '#ff9800',
    'azalıyor': '#4caf50',
    'default': '#3388ff'
  };

  // Marker büyüklüğünü vaka sayısına göre hesapla (min 8, max 25)
  const calculateRadius = (count) => {
    if (!count) return 8;
    return Math.min(Math.max(count / 2, 8), 25);
  };

  // Haritayı bir kere oluştur
  useEffect(() => {
    if (mapRef.current && !mapInstanceRef.current) {
      // Harita oluştur
      const map = L.map(mapRef.current).setView([39.50, 35.24], 6);
      
      // Harita katmanını ekle
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(map);
      
      // Tıklama olayını dinle
      map.on('click', (e) => {
        if (onRegionClick) {
          onRegionClick({
            name: 'Seçilen Bölge',
            coordinates: [e.latlng.lat, e.latlng.lng]
          });
        }
      });
      
      // Marker'lar için bir layer grubu oluştur
      markersLayerRef.current = L.layerGroup().addTo(map);
      
      // Haritayı referansta sakla
      mapInstanceRef.current = map;
    }
    
    // Komponent unmount edildiğinde haritayı temizle
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [onRegionClick]);

  // Hastalık verisi değiştiğinde marker'ları güncelle
  useEffect(() => {
    // Eğer harita yoksa çık
    if (!mapInstanceRef.current || !markersLayerRef.current) return;
    
    // Tüm mevcut marker'ları temizle
    markersLayerRef.current.clearLayers();
    
    // Hastalık verisi varsa marker'ları ekle
    if (diseaseOutbreaks && diseaseOutbreaks.length > 0) {
      diseaseOutbreaks.forEach(outbreak => {
        // Marker rengi
        const color = statusColors[outbreak.status] || statusColors.default;
        
        // Dairesel marker ekle
        const circle = L.circleMarker(
          // Leaflet [lat, lng] sırası kullanır
          [outbreak.coordinates[1], outbreak.coordinates[0]], 
          {
            radius: calculateRadius(outbreak.count),
            fillColor: color,
            color: color,
            weight: 1,
            opacity: 1,
            fillOpacity: 0.8
          }
        );
        
        // Popup içeriği
        const popupContent = `
          <div class="leaflet-popup-custom">
            <h3>${outbreak.diseaseName}</h3>
            <p><strong>Hayvan Türü:</strong> ${outbreak.animalType}</p>
            <p><strong>Vaka Sayısı:</strong> ${outbreak.count}</p>
            <p><strong>Durum:</strong> ${outbreak.status}</p>
            <p><strong>Tarih:</strong> ${outbreak.date}</p>
            <p>${outbreak.details}</p>
          </div>
        `;
        
        // Tooltip içeriği
        const tooltipContent = `
          <div>
            <strong>${outbreak.diseaseName}</strong><br />
            ${outbreak.animalType}: ${outbreak.count} vaka<br />
            Durum: ${outbreak.status}
          </div>
        `;
        
        // Popup ve tooltip ekle
        circle.bindPopup(popupContent);
        circle.bindTooltip(tooltipContent);
        
        // Marker'ı layer grubuna ekle
        circle.addTo(markersLayerRef.current);
      });
    }
  }, [diseaseOutbreaks, statusColors]);

  return (
    <div className="turkey-disease-map-container">
      <div 
        ref={mapRef} 
        style={{ width: '100%', height: '400px', borderRadius: '8px' }}
      ></div>
      
      <div className="map-legend">
        <strong>Salgın Hastalık Haritası</strong>
      </div>
    </div>
  );
};

export default TurkeyDiseaseMap; 