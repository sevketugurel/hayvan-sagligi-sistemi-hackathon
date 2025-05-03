import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar';
import '../styles/NewPatient.css';

const NewPatient = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        ownerInfo: {
            name: '',
            tcNo: '',
            phone: '',
            email: '',
            address: ''
        },
        animalInfo: {
            name: '',
            type: '',
            breed: '',
            age: '',
            gender: '',
            chipNo: ''
        }
    });

    const handleChange = (section, field, value) => {
        setFormData({
            ...formData,
            [section]: {
                ...formData[section],
                [field]: value
            }
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Burada API'ye form verileri gönderilecek
        console.log("Form verileri:", formData);
        alert("Hasta kaydı başarıyla oluşturuldu!");
        navigate('/veteriner-dashboard');
    };

    return (
        <div className="new-patient-container">
            <NavBar />
            <div className="new-patient-content">
                <h1>Yeni Hasta Kaydı</h1>
                
                <form onSubmit={handleSubmit}>
                    <div className="form-section">
                        <h2>Sahip Bilgileri</h2>
                        <div className="form-group">
                            <label htmlFor="ownerName">Ad Soyad</label>
                            <input 
                                type="text" 
                                id="ownerName" 
                                value={formData.ownerInfo.name}
                                onChange={(e) => handleChange('ownerInfo', 'name', e.target.value)}
                                required 
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="tcNo">T.C. Kimlik No</label>
                            <input 
                                type="text" 
                                id="tcNo" 
                                value={formData.ownerInfo.tcNo}
                                onChange={(e) => handleChange('ownerInfo', 'tcNo', e.target.value)}
                                required 
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="phone">Telefon</label>
                            <input 
                                type="tel" 
                                id="phone" 
                                value={formData.ownerInfo.phone}
                                onChange={(e) => handleChange('ownerInfo', 'phone', e.target.value)}
                                required 
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">E-posta</label>
                            <input 
                                type="email" 
                                id="email" 
                                value={formData.ownerInfo.email}
                                onChange={(e) => handleChange('ownerInfo', 'email', e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="address">Adres</label>
                            <textarea 
                                id="address" 
                                value={formData.ownerInfo.address}
                                onChange={(e) => handleChange('ownerInfo', 'address', e.target.value)}
                                required 
                            />
                        </div>
                    </div>

                    <div className="form-section">
                        <h2>Hayvan Bilgileri</h2>
                        <div className="form-group">
                            <label htmlFor="animalName">Hayvan Adı</label>
                            <input 
                                type="text" 
                                id="animalName" 
                                value={formData.animalInfo.name}
                                onChange={(e) => handleChange('animalInfo', 'name', e.target.value)}
                                required 
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="animalType">Türü</label>
                            <select 
                                id="animalType" 
                                value={formData.animalInfo.type}
                                onChange={(e) => handleChange('animalInfo', 'type', e.target.value)}
                                required
                            >
                                <option value="">Seçiniz</option>
                                <option value="Kedi">Kedi</option>
                                <option value="Köpek">Köpek</option>
                                <option value="Kuş">Kuş</option>
                                <option value="Kemirgen">Kemirgen</option>
                                <option value="Diğer">Diğer</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="breed">Irk</label>
                            <input 
                                type="text" 
                                id="breed" 
                                value={formData.animalInfo.breed}
                                onChange={(e) => handleChange('animalInfo', 'breed', e.target.value)}
                                required 
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="age">Yaş</label>
                            <input 
                                type="number" 
                                id="age" 
                                min="0"
                                value={formData.animalInfo.age}
                                onChange={(e) => handleChange('animalInfo', 'age', e.target.value)}
                                required 
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="gender">Cinsiyet</label>
                            <select 
                                id="gender" 
                                value={formData.animalInfo.gender}
                                onChange={(e) => handleChange('animalInfo', 'gender', e.target.value)}
                                required
                            >
                                <option value="">Seçiniz</option>
                                <option value="Erkek">Erkek</option>
                                <option value="Dişi">Dişi</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="chipNo">Çip/Küpe No</label>
                            <input 
                                type="text" 
                                id="chipNo" 
                                value={formData.animalInfo.chipNo}
                                onChange={(e) => handleChange('animalInfo', 'chipNo', e.target.value)}
                                required 
                            />
                        </div>
                    </div>

                    <div className="form-actions">
                        <button type="button" className="cancel-button" onClick={() => navigate('/veteriner-dashboard')}>
                            İptal
                        </button>
                        <button type="submit" className="save-button">
                            Kaydet
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default NewPatient; 