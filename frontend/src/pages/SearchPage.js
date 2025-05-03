import React from 'react';
import NavBar from '../components/NavBar';
import AdvancedSearch from '../components/AdvancedSearch';
import '../styles/SearchPage.css';

const SearchPage = () => {
  return (
    <>
      <NavBar />
      <div className="search-page">
        <div className="search-page-header">
          <h1>Hasta Arama</h1>
          <p>Hasta kayıtlarını kolayca arayın ve filtreleyin</p>
        </div>
        
        <AdvancedSearch />
        
        <div className="search-page-help">
          <div className="help-card">
            <div className="help-icon">🔍</div>
            <div className="help-content">
              <h3>Arama İpuçları</h3>
              <ul>
                <li>Daha doğru sonuçlar için tam hasta adı kullanın</li>
                <li>Çip numarası ile arama en kesin sonucu verir</li>
                <li>Arama filtrelerini kombine ederek sonuçları daraltın</li>
                <li>Yaş aralığı kullanarak belirli yaş grubundaki hastaları bulun</li>
              </ul>
            </div>
          </div>
          
          <div className="help-card">
            <div className="help-icon">⚡</div>
            <div className="help-content">
              <h3>Hızlı Erişim</h3>
              <ul>
                <li>Yatılı hastaları hızlıca görüntülemek için durum filtresini kullanın</li>
                <li>Son ziyaretler sütunundaki tarih bilgisiyle yakın zamanda gelen hastaları takip edin</li>
                <li>Hasta detaylarına direkt erişim için "Detaylar" butonunu kullanın</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchPage; 