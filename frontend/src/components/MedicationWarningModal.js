import React from 'react';
import '../styles/MedicationWarningModal.css';

/**
 * İlaç risk uyarı modalı
 * @param {Object} props - Component props
 * @param {Array} props.risks - Risk bilgilerini içeren dizi [{medication, breed, warning, enteredMedicationName}]
 * @param {function} props.onClose - Modal kapatma fonksiyonu
 * @param {function} props.onContinue - Devam et butonu fonksiyonu
 * @param {function} props.onCancel - İptal et butonu fonksiyonu
 */
const MedicationWarningModal = ({ risks, onClose, onContinue, onCancel }) => {
  if (!risks || risks.length === 0) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content warning-modal">
        <div className="modal-header warning-header">
          <h3>
            <i className="warning-icon">⚠️</i> İlaç Kullanım Uyarısı
          </h3>
          <button className="close-modal-btn" onClick={onClose}>✖</button>
        </div>
        
        <div className="modal-body">
          <div className="warning-message">
            <p>Aşağıdaki ilaçlar, bu hayvanın ırkı için risk oluşturabilir:</p>
          </div>
          
          <div className="risks-container">
            {risks.map((risk, index) => (
              <div key={index} className="risk-item">
                <div className="risk-header">
                  <span className="medication-name">{risk.enteredMedicationName}</span>
                  <span className="risk-breed"> - {risk.breed}</span>
                </div>
                <div className="risk-warning">
                  <i className="warning-detail-icon">🔍</i>
                  <span>{risk.warning}</span>
                </div>
              </div>
            ))}
          </div>
          
          <div className="warning-note">
            <p>
              <strong>Not:</strong> Bu ilaçlar, belirtilen risk faktörleri nedeniyle bu hayvan ırkında dikkatli kullanılmalıdır.
              Devam etmeden önce riski değerlendirin.
            </p>
          </div>
        </div>
        
        <div className="modal-footer">
          <button className="cancel-btn" onClick={onCancel}>
            Reçeteyi Düzenle
          </button>
          <button className="continue-btn" onClick={onContinue}>
            Riski Kabul Et ve Devam Et
          </button>
        </div>
      </div>
    </div>
  );
};

export default MedicationWarningModal; 