import React, { useState } from 'react';
import '../styles/AddClinicalExamModal.css';

const AddClinicalExamModal = ({ onClose, onAdd, animalId }) => {
  const [formData, setFormData] = useState({
    anamnesis: '',
    complaints: '',
    findings: '',
    primaryDiagnosis: '',
    secondaryDiagnosis: '',
    procedures: '',
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
          <h3>Yeni Klinik İnceleme Ekle</h3>
          <button className="close-modal-btn" onClick={onClose}>×</button>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            <div className="form-group mb-3">
              <label htmlFor="anamnesis" className="form-label">Anamnez</label>
              <textarea
                id="anamnesis"
                name="anamnesis"
                className="form-control"
                value={formData.anamnesis}
                onChange={handleChange}
                rows="3"
                required
              />
            </div>
            
            <div className="form-group mb-3">
              <label htmlFor="complaints" className="form-label">Şikayetler</label>
              <textarea
                id="complaints"
                name="complaints"
                className="form-control"
                value={formData.complaints}
                onChange={handleChange}
                rows="3"
                required
              />
            </div>
            
            <div className="form-group mb-3">
              <label htmlFor="findings" className="form-label">Bulgular</label>
              <textarea
                id="findings"
                name="findings"
                className="form-control"
                value={formData.findings}
                onChange={handleChange}
                rows="3"
                required
              />
            </div>
            
            <div className="form-group mb-3">
              <label htmlFor="primaryDiagnosis" className="form-label">Birincil Tanı</label>
              <input
                type="text"
                id="primaryDiagnosis"
                name="primaryDiagnosis"
                className="form-control"
                value={formData.primaryDiagnosis}
                onChange={handleChange}
              />
            </div>
            
            <div className="form-group mb-3">
              <label htmlFor="secondaryDiagnosis" className="form-label">İkincil Tanı</label>
              <input
                type="text"
                id="secondaryDiagnosis"
                name="secondaryDiagnosis"
                className="form-control"
                value={formData.secondaryDiagnosis}
                onChange={handleChange}
              />
            </div>
            
            <div className="form-group mb-3">
              <label htmlFor="procedures" className="form-label">Yapılan İşlemler</label>
              <textarea
                id="procedures"
                name="procedures"
                className="form-control"
                value={formData.procedures}
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

export default AddClinicalExamModal; 