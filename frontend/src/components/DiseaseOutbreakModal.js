import React from 'react';

const DiseaseOutbreakModal = ({ outbreak, onClose }) => {
  if (!outbreak) return null;
  
  // Status colors for different outbreak statuses
  const statusColors = {
    'aktif': '#f44336',
    'kontrol altında': '#ff9800',
    'azalıyor': '#4caf50'
  };
  
  return (
    <div className="modal-overlay" onClick={onClose} style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000
    }}>
      <div className="modal-content" onClick={e => e.stopPropagation()} style={{
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '8px',
        minWidth: '450px',
        maxWidth: '600px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
      }}>
        <div className="modal-header" style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '15px',
          borderBottom: '1px solid #eee',
          paddingBottom: '10px'
        }}>
          <h2 style={{ margin: 0, color: '#333' }}>{outbreak.diseaseName}</h2>
          <button onClick={onClose} style={{
            background: 'transparent',
            border: 'none',
            fontSize: '22px',
            cursor: 'pointer',
            color: '#999'
          }}>×</button>
        </div>
        
        <div className="modal-body">
          <div style={{ marginBottom: '20px' }}>
            <div style={{
              display: 'inline-block',
              padding: '5px 10px',
              borderRadius: '15px',
              color: 'white',
              background: statusColors[outbreak.status] || '#999',
              marginBottom: '10px'
            }}>
              {outbreak.status}
            </div>
            
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <tbody>
                <tr>
                  <td style={{ padding: '8px 0', fontWeight: 'bold', width: '120px' }}>Hayvan Türü:</td>
                  <td style={{ padding: '8px 0' }}>{outbreak.animalType}</td>
                </tr>
                <tr>
                  <td style={{ padding: '8px 0', fontWeight: 'bold' }}>Vaka Sayısı:</td>
                  <td style={{ padding: '8px 0' }}>{outbreak.count}</td>
                </tr>
                <tr>
                  <td style={{ padding: '8px 0', fontWeight: 'bold' }}>Tarih:</td>
                  <td style={{ padding: '8px 0' }}>{outbreak.date}</td>
                </tr>
                <tr>
                  <td style={{ padding: '8px 0', fontWeight: 'bold' }}>Koordinatlar:</td>
                  <td style={{ padding: '8px 0' }}>{outbreak.coordinates.join(', ')}</td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <div style={{ background: '#f8f9fa', padding: '15px', borderRadius: '6px' }}>
            <h4 style={{ margin: '0 0 10px 0' }}>Detaylı Bilgi</h4>
            <p style={{ margin: 0, lineHeight: '1.5' }}>{outbreak.details}</p>
          </div>
          
          <div style={{ marginTop: '20px' }}>
            <h4 style={{ margin: '0 0 10px 0' }}>Önerilen Önlemler</h4>
            <ul style={{ paddingLeft: '20px', margin: 0 }}>
              <li style={{ marginBottom: '5px' }}>Hastalık görülen bölgelerdeki hayvan hareketlerinin kısıtlanması</li>
              <li style={{ marginBottom: '5px' }}>Hayvan sahiplerinin düzenli olarak veteriner kontrollerini yaptırmaları</li>
              <li style={{ marginBottom: '5px' }}>Enfekte hayvanların izole edilmesi</li>
              <li style={{ marginBottom: '5px' }}>Çiftlik ve barınak dezenfeksiyonu</li>
              <li style={{ marginBottom: '5px' }}>Rutin sağlık taramalarının yapılması</li>
            </ul>
          </div>
        </div>
        
        <div className="modal-footer" style={{
          marginTop: '20px',
          display: 'flex',
          justifyContent: 'flex-end',
          borderTop: '1px solid #eee',
          paddingTop: '15px'
        }}>
          <button onClick={onClose} style={{
            padding: '8px 16px',
            background: '#6c757d',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            marginRight: '10px'
          }}>Kapat</button>
          <button style={{
            padding: '8px 16px',
            background: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}>Rapor Oluştur</button>
        </div>
      </div>
    </div>
  );
};

export default DiseaseOutbreakModal; 