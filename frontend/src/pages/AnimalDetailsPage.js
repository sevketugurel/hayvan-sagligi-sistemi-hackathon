import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import NavBar from '../components/NavBar';
import '../styles/AnimalDetailsPage.css';

// Örnek hayvan verileri
const mockAnimalData = {
    id: 123,
    name: 'Max',
    species: 'Köpek',
    breed: 'Golden Retriever',
    age: 3,
    gender: 'Erkek',
    weight: 32,
    owner: 'Ahmet Yılmaz',
    ownerPhone: '(555) 123-4567',
    chipNumber: 'TR12345678',
    lastVisit: '2023-09-15',
    vaccinations: [
        { name: 'Kuduz', date: '2023-05-12', nextDue: '2024-05-12' },
        { name: 'DHPP', date: '2023-02-20', nextDue: '2024-02-20' },
        { name: 'Leptospiroz', date: '2023-03-10', nextDue: '2024-03-10' }
    ],
    medicalHistory: [
        { date: '2023-06-14', diagnosis: 'Orta derecede kulak enfeksiyonu', treatment: 'Antibiyotik tedavisi', notes: 'İki hafta süreyle günde iki kez damla uygulanacak' },
        { date: '2022-11-22', diagnosis: 'Hafif pati yaralanması', treatment: 'Temizleme ve bandaj', notes: 'Bir hafta boyunca aktivitesi kısıtlanmalı' },
        { date: '2022-08-03', diagnosis: 'Yıllık sağlık kontrolü', treatment: 'Rutin aşılar', notes: 'Genel sağlık durumu iyi' }
    ],
    allergies: ['Tavuk proteini'],
    currentMedications: [
        { name: 'Antibiyotik', dosage: '250mg', schedule: 'Günde 2 kez', endDate: '2023-09-25' }
    ]
};

const AnimalDetailsPage = () => {
    const { id } = useParams();
    const [animal, setAnimal] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('overview');

    useEffect(() => {
        // Gerçek uygulamada, bu API'den veri çekecek
        // Şimdilik mock veri kullanıyoruz
        setTimeout(() => {
            setAnimal(mockAnimalData);
            setLoading(false);
        }, 500);
    }, [id]);

    if (loading) {
        return (
            <>
                <NavBar />
                <div className="loading-container">
                    <div className="loading-spinner"></div>
                    <p>Hasta bilgileri yükleniyor...</p>
                </div>
            </>
        );
    }

    return (
        <>
            <NavBar />
            <div className="animal-details-page">
                <div className="animal-header">
                    <div className="animal-info">
                        <h1>{animal.name}</h1>
                        <div className="animal-basic-info">
                            <span>{animal.species}, {animal.breed}</span>
                            <span>{animal.age} yaş, {animal.gender}</span>
                            <span>{animal.weight} kg</span>
                        </div>
                        <div className="animal-owner-info">
                            <span><strong>Sahibi:</strong> {animal.owner}</span>
                            <span><strong>Telefon:</strong> {animal.ownerPhone}</span>
                            <span><strong>Çip No:</strong> {animal.chipNumber}</span>
                            <span><strong>Son Ziyaret:</strong> {animal.lastVisit}</span>
                        </div>
                    </div>
                    <div className="action-buttons">
                        <button className="action-button primary">
                            <i className="fas fa-calendar-plus"></i> Randevu Oluştur
                        </button>
                        <button className="action-button">
                            <i className="fas fa-print"></i> Yazdır
                        </button>
                    </div>
                </div>

                <div className="animal-tabs">
                    <button
                        className={`tab-button ${activeTab === 'overview' ? 'active' : ''}`}
                        onClick={() => setActiveTab('overview')}
                    >
                        Genel Bakış
                    </button>
                    <button
                        className={`tab-button ${activeTab === 'medical' ? 'active' : ''}`}
                        onClick={() => setActiveTab('medical')}
                    >
                        Tıbbi Geçmiş
                    </button>
                    <button
                        className={`tab-button ${activeTab === 'vaccinations' ? 'active' : ''}`}
                        onClick={() => setActiveTab('vaccinations')}
                    >
                        Aşılar
                    </button>
                    <button
                        className={`tab-button ${activeTab === 'prescriptions' ? 'active' : ''}`}
                        onClick={() => setActiveTab('prescriptions')}
                    >
                        Reçeteler
                    </button>
                </div>

                <div className="tab-content">
                    {activeTab === 'overview' && (
                        <div className="overview-tab">
                            <div className="info-panel">
                                <h2>Hasta Bilgileri</h2>
                                <div className="info-row">
                                    <div className="info-group">
                                        <label>Tür</label>
                                        <span>{animal.species}</span>
                                    </div>
                                    <div className="info-group">
                                        <label>Irk</label>
                                        <span>{animal.breed}</span>
                                    </div>
                                    <div className="info-group">
                                        <label>Yaş</label>
                                        <span>{animal.age} yaş</span>
                                    </div>
                                    <div className="info-group">
                                        <label>Cinsiyet</label>
                                        <span>{animal.gender}</span>
                                    </div>
                                    <div className="info-group">
                                        <label>Ağırlık</label>
                                        <span>{animal.weight} kg</span>
                                    </div>
                                    <div className="info-group">
                                        <label>Çip Numarası</label>
                                        <span>{animal.chipNumber}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="info-panel">
                                <h2>Alerjiler</h2>
                                {animal.allergies.length > 0 ? (
                                    <ul className="allergies-list">
                                        {animal.allergies.map((allergy, index) => (
                                            <li key={index} className="allergy-item">{allergy}</li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p>Bilinen alerji bulunmamaktadır.</p>
                                )}
                            </div>

                            <div className="info-panel">
                                <h2>Güncel İlaçlar</h2>
                                {animal.currentMedications.length > 0 ? (
                                    <table className="medications-table">
                                        <thead>
                                            <tr>
                                                <th>İlaç</th>
                                                <th>Doz</th>
                                                <th>Kullanım</th>
                                                <th>Bitiş Tarihi</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {animal.currentMedications.map((medication, index) => (
                                                <tr key={index}>
                                                    <td>{medication.name}</td>
                                                    <td>{medication.dosage}</td>
                                                    <td>{medication.schedule}</td>
                                                    <td>{medication.endDate}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                ) : (
                                    <p>Aktif kullanılan ilaç bulunmamaktadır.</p>
                                )}
                            </div>
                        </div>
                    )}

                    {activeTab === 'medical' && (
                        <div className="medical-tab">
                            <div className="info-panel">
                                <div className="panel-header">
                                    <h2>Tıbbi Geçmiş</h2>
                                    <button className="add-button">
                                        <i className="fas fa-plus"></i> Yeni Kayıt Ekle
                                    </button>
                                </div>

                                {animal.medicalHistory.map((record, index) => (
                                    <div key={index} className="medical-record">
                                        <div className="record-header">
                                            <span className="record-date">{record.date}</span>
                                            <span className="record-diagnosis">{record.diagnosis}</span>
                                        </div>
                                        <div className="record-details">
                                            <p><strong>Tedavi:</strong> {record.treatment}</p>
                                            <p><strong>Notlar:</strong> {record.notes}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {activeTab === 'vaccinations' && (
                        <div className="vaccinations-tab">
                            <div className="info-panel">
                                <div className="panel-header">
                                    <h2>Aşı Kayıtları</h2>
                                    <button className="add-button">
                                        <i className="fas fa-plus"></i> Yeni Aşı Ekle
                                    </button>
                                </div>

                                <table className="vaccinations-table">
                                    <thead>
                                        <tr>
                                            <th>Aşı</th>
                                            <th>Uygulama Tarihi</th>
                                            <th>Geçerlilik Tarihi</th>
                                            <th>Durum</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {animal.vaccinations.map((vaccine, index) => {
                                            const today = new Date();
                                            const dueDate = new Date(vaccine.nextDue);
                                            const isExpired = today > dueDate;
                                            const isExpiringSoon = !isExpired && (dueDate - today) / (1000 * 60 * 60 * 24) < 30;

                                            let status, statusClass;
                                            if (isExpired) {
                                                status = "Süresi Doldu";
                                                statusClass = "expired";
                                            } else if (isExpiringSoon) {
                                                status = "Yaklaşıyor";
                                                statusClass = "expiring-soon";
                                            } else {
                                                status = "Güncel";
                                                statusClass = "current";
                                            }

                                            return (
                                                <tr key={index}>
                                                    <td>{vaccine.name}</td>
                                                    <td>{vaccine.date}</td>
                                                    <td>{vaccine.nextDue}</td>
                                                    <td>
                                                        <span className={`status-badge ${statusClass}`}>
                                                            {status}
                                                        </span>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {activeTab === 'prescriptions' && (
                        <div className="prescriptions-tab">
                            <div className="info-panel">
                                <div className="panel-header">
                                    <h2>Reçeteler</h2>
                                    <button className="add-button">
                                        <i className="fas fa-plus"></i> Yeni Reçete Oluştur
                                    </button>
                                </div>

                                <div className="empty-state">
                                    <i className="fas fa-prescription-bottle"></i>
                                    <p>Henüz kaydedilmiş reçete bulunmamaktadır.</p>
                                    <button className="primary-button">İlk Reçeteyi Oluştur</button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default AnimalDetailsPage; 