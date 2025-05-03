import React, { useState } from 'react';
import '../styles/AddVaccineModal.css';

const AddVaccineModal = ({ onClose, onSave }) => {
  const [formData, setFormData] = useState({
    date: '',
    vaccine: '',
    administeredBy: '',
    veterinaryClinic: '',
    nextDueDate: '',
    notes: '',
    status: 'Tamamlandı'
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const validateForm = () => {
    let tempErrors = {};
    let formIsValid = true;

    if (!formData.date) {
      tempErrors.date = "Tarih zorunludur";
      formIsValid = false;
    }

    if (!formData.vaccine) {
      tempErrors.vaccine = "Aşı adı zorunludur";
      formIsValid = false;
    }

    if (!formData.administeredBy) {
      tempErrors.administeredBy = "Hekim adı zorunludur";
      formIsValid = false;
    }

    if (!formData.veterinaryClinic) {
      tempErrors.veterinaryClinic = "Klinik adı zorunludur";
      formIsValid = false;
    }

    setErrors(tempErrors);
    return formIsValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Add id and format the date properly if needed
      const newVaccine = {
        ...formData,
        id: Date.now() // Generate a temporary ID
      };
      onSave(newVaccine);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="add-vaccine-modal">
        <div className="modal-header">
          <h2>Yeni Aşı Ekle</h2>
          <button className="close-button" onClick={onClose}>×</button>
        </div>

        <form onSubmit={handleSubmit} className="add-vaccine-form">
          <div className="form-group">
            <label htmlFor="date">Tarih:</label>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
            />
            {errors.date && <div className="error-text">{errors.date}</div>}
          </div>

          <div className="form-group">
            <label htmlFor="vaccine">Aşı Adı:</label>
            <input
              type="text"
              id="vaccine"
              name="vaccine"
              value={formData.vaccine}
              onChange={handleChange}
              placeholder="Örn: Kuduz Aşısı"
            />
            {errors.vaccine && <div className="error-text">{errors.vaccine}</div>}
          </div>

          <div className="form-group">
            <label htmlFor="administeredBy">Uygulayan Hekim:</label>
            <input
              type="text"
              id="administeredBy"
              name="administeredBy"
              value={formData.administeredBy}
              onChange={handleChange}
              placeholder="Örn: Dr. Ahmet Yılmaz"
            />
            {errors.administeredBy && <div className="error-text">{errors.administeredBy}</div>}
          </div>

          <div className="form-group">
            <label htmlFor="veterinaryClinic">Veteriner Kliniği:</label>
            <input
              type="text"
              id="veterinaryClinic"
              name="veterinaryClinic"
              value={formData.veterinaryClinic}
              onChange={handleChange}
              placeholder="Örn: Hayat Veteriner Kliniği"
            />
            {errors.veterinaryClinic && <div className="error-text">{errors.veterinaryClinic}</div>}
          </div>

          <div className="form-group">
            <label htmlFor="nextDueDate">Sonraki Tarih:</label>
            <input
              type="date"
              id="nextDueDate"
              name="nextDueDate"
              value={formData.nextDueDate}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="notes">Notlar:</label>
            <textarea
              id="notes"
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              placeholder="Aşı ile ilgili notlar..."
              rows="3"
            />
          </div>

          <div className="form-group">
            <label htmlFor="status">Durum:</label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
            >
              <option value="Tamamlandı">Tamamlandı</option>
              <option value="Planlandı">Planlandı</option>
            </select>
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

export default AddVaccineModal; 