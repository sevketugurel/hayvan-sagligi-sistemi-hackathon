import React, { useState } from 'react';
import '../styles/AddClinicalExamModal.css';

const AddClinicalExamModal = ({ onClose, onSave, veterinerId, veterinerName, randevuId }) => {
  const [formData, setFormData] = useState({
    sikayetler: '',
    anamnez: '',
    bulgular: '',
    birincilTani: '',
    ikincilTani: '',
    islemler: '',
    notlar: '',
    randevuId: randevuId || null
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

    if (!formData.birincilTani) {
      tempErrors.birincilTani = "Birincil tanı zorunludur";
      formIsValid = false;
    }

    if (!formData.sikayetler) {
      tempErrors.sikayetler = "Şikayetler zorunludur";
      formIsValid = false;
    }

    if (!formData.bulgular) {
      tempErrors.bulgular = "Bulgular zorunludur";
      formIsValid = false;
    }

    setErrors(tempErrors);
    return formIsValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Add id and veteriner info
      const newClinicalExam = {
        ...formData,
        id: Date.now(), // Temporary ID
        veterinerId: veterinerId,
        veterinerAdSoyad: veterinerName
      };
      onSave(newClinicalExam);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="clinical-exam-modal">
        <div className="modal-header">
          <h2>Yeni Klinik İnceleme Ekle</h2>
          <button className="close-button" onClick={onClose}>×</button>
        </div>

        <form onSubmit={handleSubmit} className="clinical-exam-form">
          <div className="form-group">
            <label htmlFor="sikayetler">Şikayetler:</label>
            <textarea
              id="sikayetler"
              name="sikayetler"
              value={formData.sikayetler}
              onChange={handleChange}
              placeholder="Hayvanın şikayetleri"
              rows="3"
            />
            {errors.sikayetler && <div className="error-text">{errors.sikayetler}</div>}
          </div>

          <div className="form-group">
            <label htmlFor="anamnez">Anamnez:</label>
            <textarea
              id="anamnez"
              name="anamnez"
              value={formData.anamnez}
              onChange={handleChange}
              placeholder="Anamnez bilgileri"
              rows="3"
            />
          </div>

          <div className="form-group">
            <label htmlFor="bulgular">Bulgular:</label>
            <textarea
              id="bulgular"
              name="bulgular"
              value={formData.bulgular}
              onChange={handleChange}
              placeholder="Klinik bulgular"
              rows="3"
            />
            {errors.bulgular && <div className="error-text">{errors.bulgular}</div>}
          </div>

          <div className="form-group">
            <label htmlFor="birincilTani">Birincil Tanı:</label>
            <input
              type="text"
              id="birincilTani"
              name="birincilTani"
              value={formData.birincilTani}
              onChange={handleChange}
              placeholder="Örn: Böbrek Yetmezliği"
            />
            {errors.birincilTani && <div className="error-text">{errors.birincilTani}</div>}
          </div>

          <div className="form-group">
            <label htmlFor="ikincilTani">İkincil Tanı:</label>
            <input
              type="text"
              id="ikincilTani"
              name="ikincilTani"
              value={formData.ikincilTani}
              onChange={handleChange}
              placeholder="Varsa ikincil tanı"
            />
          </div>

          <div className="form-group">
            <label htmlFor="islemler">Yapılan İşlemler:</label>
            <textarea
              id="islemler"
              name="islemler"
              value={formData.islemler}
              onChange={handleChange}
              placeholder="Uygulanan tedavi ve işlemler"
              rows="3"
            />
          </div>

          <div className="form-group">
            <label htmlFor="notlar">Notlar:</label>
            <textarea
              id="notlar"
              name="notlar"
              value={formData.notlar}
              onChange={handleChange}
              placeholder="Ek notlar"
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

export default AddClinicalExamModal; 