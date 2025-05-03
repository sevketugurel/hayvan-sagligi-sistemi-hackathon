import React, { useState } from 'react';
import '../styles/Modal.css';

const AddDiseaseHistoryModal = ({ onClose, onSave }) => {
  const [diseaseHistory, setDiseaseHistory] = useState({
    diseaseName: '',
    diagnosisDate: '',
    endDate: '',
    details: '',
    treatment: '',
    hospitalized: false,
    hospitalizationDays: 0,
    status: 'Devam Ediyor'
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setDiseaseHistory({
        ...diseaseHistory,
        [name]: checked,
        hospitalizationDays: checked ? diseaseHistory.hospitalizationDays : 0
      });
    } else {
      setDiseaseHistory({
        ...diseaseHistory,
        [name]: value
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Generate a unique ID for the new disease history record
    const newDiseaseHistory = {
      ...diseaseHistory,
      id: Date.now(),
      patientName: 'Max' // This would come from the animal context in a real app
    };
    
    onSave(newDiseaseHistory);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="modal-header">
          <h2>Yeni Hastalık Geçmişi Ekle</h2>
          <button className="close-button" onClick={onClose}>×</button>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            <div className="form-group">
              <label htmlFor="diseaseName">Hastalık Adı:</label>
              <input
                type="text"
                id="diseaseName"
                name="diseaseName"
                value={diseaseHistory.diseaseName}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="diagnosisDate">Tanı Tarihi:</label>
              <input
                type="date"
                id="diagnosisDate"
                name="diagnosisDate"
                value={diseaseHistory.diagnosisDate}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="status">Durum:</label>
              <select
                id="status"
                name="status"
                value={diseaseHistory.status}
                onChange={handleChange}
                required
              >
                <option value="Devam Ediyor">Devam Ediyor</option>
                <option value="İyileşti">İyileşti</option>
              </select>
            </div>
            
            {diseaseHistory.status === 'İyileşti' && (
              <div className="form-group">
                <label htmlFor="endDate">İyileşme Tarihi:</label>
                <input
                  type="date"
                  id="endDate"
                  name="endDate"
                  value={diseaseHistory.endDate}
                  onChange={handleChange}
                  required={diseaseHistory.status === 'İyileşti'}
                />
              </div>
            )}
            
            <div className="form-group">
              <label htmlFor="details">Detaylar:</label>
              <textarea
                id="details"
                name="details"
                value={diseaseHistory.details}
                onChange={handleChange}
                rows="3"
                required
              ></textarea>
            </div>
            
            <div className="form-group">
              <label htmlFor="treatment">Tedavi:</label>
              <textarea
                id="treatment"
                name="treatment"
                value={diseaseHistory.treatment}
                onChange={handleChange}
                rows="3"
                required
              ></textarea>
            </div>
            
            <div className="form-group checkbox-group">
              <input
                type="checkbox"
                id="hospitalized"
                name="hospitalized"
                checked={diseaseHistory.hospitalized}
                onChange={handleChange}
              />
              <label htmlFor="hospitalized">Hastanede Yatış</label>
            </div>
            
            {diseaseHistory.hospitalized && (
              <div className="form-group">
                <label htmlFor="hospitalizationDays">Hastanede Kalış Süresi (gün):</label>
                <input
                  type="number"
                  id="hospitalizationDays"
                  name="hospitalizationDays"
                  value={diseaseHistory.hospitalizationDays}
                  onChange={handleChange}
                  min="1"
                  required={diseaseHistory.hospitalized}
                />
              </div>
            )}
          </div>
          
          <div className="modal-footer">
            <button type="button" className="cancel-button" onClick={onClose}>İptal</button>
            <button type="submit" className="save-button">Kaydet</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddDiseaseHistoryModal; 