import React from 'react';

const DiseaseOutbreakList = ({ outbreaks, onOutbreakClick, onAddOutbreak, style }) => {
  // Status colors for different outbreak statuses
  const statusColors = {
    'aktif': '#f44336',
    'kontrol altında': '#ff9800',
    'azalıyor': '#4caf50'
  };

  // Merge the default styles with any provided styles
  const containerStyle = {
    maxHeight: '300px',
    overflowY: 'auto',
    padding: '10px',
    background: '#f8f9fa',
    borderRadius: '8px',
    ...style  // This will override any matching properties from above
  };

  return (
    <div className="disease-outbreak-list" style={containerStyle}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '15px'
      }}>
        <h3 style={{ margin: '0', fontSize: '16px' }}>Aktif Salgın Hastalıklar</h3>
        {onAddOutbreak && (
          <button
            onClick={onAddOutbreak}
            style={{
              backgroundColor: '#28a745',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              padding: '6px 12px',
              cursor: 'pointer',
              fontSize: '13px',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <span style={{ fontSize: '14px' }}>+</span> Yeni Vaka Ekle
          </button>
        )}
      </div>

      {outbreaks.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '20px', color: '#666' }}>
          Şu anda aktif salgın hastalık bulunmamaktadır.
        </div>
      ) : (
        <div>
          {outbreaks.map(outbreak => (
            <div
              key={outbreak.id}
              onClick={() => onOutbreakClick(outbreak)}
              style={{
                padding: '10px',
                marginBottom: '8px',
                borderRadius: '6px',
                background: 'white',
                boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                cursor: 'pointer',
                transition: 'background 0.2s',
                borderLeft: `4px solid ${statusColors[outbreak.status] || '#999'}`
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = '#f1f1f1'}
              onMouseLeave={(e) => e.currentTarget.style.background = 'white'}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <div style={{ fontWeight: 'bold', marginBottom: '4px' }}>{outbreak.diseaseName}</div>
                  <div style={{ fontSize: '13px', color: '#555' }}>
                    <span style={{ marginRight: '10px' }}>{outbreak.animalType}</span>
                    <span title="Vaka Sayısı" style={{
                      background: '#eee',
                      padding: '2px 6px',
                      borderRadius: '4px',
                      fontSize: '12px'
                    }}>
                      {outbreak.count} vaka
                    </span>
                  </div>
                </div>
                <div>
                  <div style={{
                    display: 'inline-block',
                    fontSize: '12px',
                    padding: '3px 8px',
                    borderRadius: '12px',
                    color: 'white',
                    background: statusColors[outbreak.status] || '#999'
                  }}>
                    {outbreak.status}
                  </div>
                </div>
              </div>
              <div style={{ fontSize: '13px', marginTop: '8px', color: '#666' }}>
                <div>Tarih: {outbreak.date}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DiseaseOutbreakList; 