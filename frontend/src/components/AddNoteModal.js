import React, { useState } from 'react';
import '../styles/AddVaccineModal.css'; // Reusing the same CSS for now

const AddNoteModal = ({ onClose, onSave }) => {
  const [formData, setFormData] = useState({
    content: '',
    author: '',
    date: new Date().toISOString().split('T')[0], // Today's date as default
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

    if (!formData.content) {
      tempErrors.content = "Not içeriği zorunludur";
      formIsValid = false;
    }

    if (!formData.author) {
      tempErrors.author = "Hekim adı zorunludur";
      formIsValid = false;
    }

    if (!formData.date) {
      tempErrors.date = "Tarih zorunludur";
      formIsValid = false;
    }

    setErrors(tempErrors);
    return formIsValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Create the new note object
      const newNote = {
        ...formData,
        id: Date.now() // Generate a temporary ID
      };
      
      onSave(newNote);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="add-vaccine-modal note-modal">
        <div className="modal-header">
          <h2>Yeni Not Ekle</h2>
          <button className="close-button" onClick={onClose}>×</button>
        </div>

        <form onSubmit={handleSubmit} className="add-vaccine-form">
          <div className="form-group">
            <label htmlFor="author">Hekim:</label>
            <input
              type="text"
              id="author"
              name="author"
              value={formData.author}
              onChange={handleChange}
              placeholder="Örn: Dr. Mehmet Yılmaz"
            />
            {errors.author && <div className="error-text">{errors.author}</div>}
          </div>

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
            <label htmlFor="content">Not İçeriği:</label>
            <textarea
              id="content"
              name="content"
              value={formData.content}
              onChange={handleChange}
              placeholder="Not içeriğini girin..."
              rows="6"
            />
            {errors.content && <div className="error-text">{errors.content}</div>}
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

export default AddNoteModal; 