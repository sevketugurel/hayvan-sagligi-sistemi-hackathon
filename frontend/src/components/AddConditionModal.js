import React, { useState } from 'react';
import '../styles/AddVaccineModal.css'; // Reusing the same CSS for now

const AddConditionModal = ({ onClose, onSave }) => {
  const [formData, setFormData] = useState({
    type: 'allergy',
    allergen: '',
    severity: 'Hafif',
    symptoms: '',
    diagnosisDate: '',
    diagnosedBy: '',
    status: 'Aktif',
    treatments: [''],
    notes: ''
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleTreatmentChange = (index, value) => {
    const updatedTreatments = [...formData.treatments];
    updatedTreatments[index] = value;
    setFormData({
      ...formData,
      treatments: updatedTreatments
    });
  };

  const addTreatment = () => {
    setFormData({
      ...formData,
      treatments: [...formData.treatments, '']
    });
  };

  const removeTreatment = (index) => {
    const updatedTreatments = [...formData.treatments];
    updatedTreatments.splice(index, 1);
    setFormData({
      ...formData,
      treatments: updatedTreatments
    });
  };

  const validateForm = () => {
    let tempErrors = {};
    let formIsValid = true;

    if (!formData.allergen) {
      tempErrors.allergen = formData.type === 'allergy' ? "Alerjen adı zorunludur" : "Rahatsızlık adı zorunludur";
      formIsValid = false;
    }

    if (!formData.diagnosisDate) {
      tempErrors.diagnosisDate = "Tanı tarihi zorunludur";
      formIsValid = false;
    }

    if (!formData.diagnosedBy) {
      tempErrors.diagnosedBy = "Tanı koyan hekim zorunludur";
      formIsValid = false;
    }

    if (!formData.symptoms) {
      tempErrors.symptoms = "Belirtiler zorunludur";
      formIsValid = false;
    }

    setErrors(tempErrors);
    return formIsValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Filter empty treatments
      const filteredTreatments = formData.treatments.filter(treatment => treatment.trim() !== '');
      
      // Create the new condition object
      const newCondition = {
        ...formData,
        treatments: filteredTreatments,
        id: Date.now() // Generate a temporary ID
      };
      
      onSave(newCondition);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="add-vaccine-modal condition-modal">
        <div className="modal-header">
          <h2>Yeni {formData.type === 'allergy' ? 'Alerji' : 'Kronik Rahatsızlık'} Ekle</h2>
          <button className="close-button" onClick={onClose}>×</button>
        </div>

        <form onSubmit={handleSubmit} className="add-vaccine-form">
          <div className="form-group">
            <label htmlFor="type">Durum Tipi:</label>
            <select
              id="type"
              name="type"
              value={formData.type}
              onChange={handleChange}
            >
              <option value="allergy">Alerji</option>
              <option value="chronic">Kronik Rahatsızlık</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="allergen">
              {formData.type === 'allergy' ? 'Alerjen:' : 'Rahatsızlık Adı:'}
            </label>
            <input
              type="text"
              id="allergen"
              name="allergen"
              value={formData.allergen}
              onChange={handleChange}
              placeholder={formData.type === 'allergy' ? 'Örn: Tavuk proteini' : 'Örn: Kronik Böbrek Yetmezliği'}
            />
            {errors.allergen && <div className="error-text">{errors.allergen}</div>}
          </div>

          <div className="form-group">
            <label htmlFor="severity">Şiddet:</label>
            <select
              id="severity"
              name="severity"
              value={formData.severity}
              onChange={handleChange}
            >
              <option value="Hafif">Hafif</option>
              <option value="Orta">Orta</option>
              <option value="Ciddi">Ciddi</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="symptoms">Belirtiler:</label>
            <textarea
              id="symptoms"
              name="symptoms"
              value={formData.symptoms}
              onChange={handleChange}
              placeholder="Belirtileri girin..."
              rows="2"
            />
            {errors.symptoms && <div className="error-text">{errors.symptoms}</div>}
          </div>

          <div className="form-group">
            <label htmlFor="diagnosisDate">Tanı Tarihi:</label>
            <input
              type="date"
              id="diagnosisDate"
              name="diagnosisDate"
              value={formData.diagnosisDate}
              onChange={handleChange}
            />
            {errors.diagnosisDate && <div className="error-text">{errors.diagnosisDate}</div>}
          </div>

          <div className="form-group">
            <label htmlFor="diagnosedBy">Tanı Koyan Hekim:</label>
            <input
              type="text"
              id="diagnosedBy"
              name="diagnosedBy"
              value={formData.diagnosedBy}
              onChange={handleChange}
              placeholder="Örn: Dr. Mehmet Yılmaz"
            />
            {errors.diagnosedBy && <div className="error-text">{errors.diagnosedBy}</div>}
          </div>

          <div className="form-group">
            <label htmlFor="status">Durum:</label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
            >
              <option value="Aktif">Aktif</option>
              <option value="Aktif - Takip Altında">Aktif - Takip Altında</option>
              <option value="Aktif - Tedavi Altında">Aktif - Tedavi Altında</option>
              <option value="İyileşti">İyileşti</option>
              <option value="Mevsimsel">Mevsimsel</option>
            </select>
          </div>

          <div className="form-group treatments-group">
            <label>Tedavi:</label>
            {formData.treatments.map((treatment, index) => (
              <div key={index} className="treatment-input-container">
                <input
                  type="text"
                  value={treatment}
                  onChange={(e) => handleTreatmentChange(index, e.target.value)}
                  placeholder="Örn: Hipoalerjenik diyet"
                />
                <button 
                  type="button" 
                  className="remove-treatment-btn"
                  onClick={() => removeTreatment(index)}
                  disabled={formData.treatments.length === 1}
                >
                  -
                </button>
              </div>
            ))}
            <button 
              type="button" 
              className="add-treatment-btn"
              onClick={addTreatment}
            >
              + Tedavi Ekle
            </button>
          </div>

          <div className="form-group">
            <label htmlFor="notes">Notlar:</label>
            <textarea
              id="notes"
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              placeholder="Ek notlar..."
              rows="3"
            />
          </div>

          <div className="form-actions">
            <button type="button" className="cancel-btn" onClick={onClose}>İptal</button>
            <button type="submit" className="save-btn">Kaydet</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddConditionModal; 