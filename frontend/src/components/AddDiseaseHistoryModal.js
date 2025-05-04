import React, { useState } from 'react';
import '../styles/Modal.css';

const AddDiseaseHistoryModal = ({ onClose, onAdd, animalId }) => {
  const [formData, setFormData] = useState({
    diseaseName: '',
    diagnosisDate: new Date().toISOString().split('T')[0],
    recoveryDate: '',
    severity: 'orta',
    description: '',
    notes: '',
    veterinerId: 1
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd(formData);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h3>Yeni Hastalık Kaydı Ekle</h3>
          <button className="close-modal-btn" onClick={onClose}>×</button>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            <div className="form-group mb-3">
              <label htmlFor="diseaseName" className="form-label">Hastalık Adı</label>
              <input
                type="text"
                id="diseaseName"
                name="diseaseName"
                className="form-control"
                value={formData.diseaseName}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="form-group mb-3">
              <label htmlFor="diagnosisDate" className="form-label">Tanı Tarihi</label>
              <input
                type="date"
                id="diagnosisDate"
                name="diagnosisDate"
                className="form-control"
                value={formData.diagnosisDate}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="form-group mb-3">
              <label htmlFor="recoveryDate" className="form-label">İyileşme Tarihi (Eğer iyileştiyse)</label>
              <input
                type="date"
                id="recoveryDate"
                name="recoveryDate"
                className="form-control"
                value={formData.recoveryDate}
                onChange={handleChange}
              />
            </div>
            
            <div className="form-group mb-3">
              <label htmlFor="severity" className="form-label">Şiddet</label>
              <select
                id="severity"
                name="severity"
                className="form-control"
                value={formData.severity}
                onChange={handleChange}
                required
              >
                <option value="hafif">Hafif</option>
                <option value="orta">Orta</option>
                <option value="ciddi">Ciddi</option>
              </select>
            </div>
            
            <div className="form-group mb-3">
              <label htmlFor="description" className="form-label">Açıklama</label>
              <textarea
                id="description"
                name="description"
                className="form-control"
                value={formData.description}
                onChange={handleChange}
                rows="3"
                required
              />
            </div>
            
            <div className="form-group mb-3">
              <label htmlFor="notes" className="form-label">Notlar</label>
              <textarea
                id="notes"
                name="notes"
                className="form-control"
                value={formData.notes}
                onChange={handleChange}
                rows="3"
              />
            </div>
          </div>
          
          <div className="modal-footer">
            <button type="button" className="cancel-btn" onClick={onClose}>İptal</button>
            <button type="submit" className="save-btn">Kaydet</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddDiseaseHistoryModal; 