import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar';
import '../styles/Medications.css';

const Medications = () => {
    const navigate = useNavigate();
    const [medications, setMedications] = useState([]);
    const [filteredMedications, setFilteredMedications] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');
    const [activeTab, setActiveTab] = useState('stock');
    const [searchQuery, setSearchQuery] = useState('');
    const [filterAnimalType, setFilterAnimalType] = useState('all');
    const [filterBreed, setFilterBreed] = useState('all');
    const [showAddModal, setShowAddModal] = useState(false);
    const [selectedAnimalInfo, setSelectedAnimalInfo] = useState(null);
    const [lowStockNotifications, setLowStockNotifications] = useState([]);

    // Hayvan türleri ve ırkları
    const breedsByAnimalType = {
        'Köpek': ['Golden Retriever', 'Labrador', 'Alman Çoban Köpeği', 'Bulldog', 'Terrier', 'Diğer'],
        'Kedi': ['Siyam', 'Persian', 'Scottish Fold', 'British Shorthair', 'Tekir', 'Diğer'],
        'Küçükbaş': ['Merinos', 'Kıvırcık', 'Akkaraman', 'İvesi', 'Sakız', 'Diğer'],
        'Büyükbaş': ['Holstein', 'Simental', 'Montofon', 'Angus', 'Jersey', 'Diğer']
    };

    useEffect(() => {
        // İlaç verilerini getir
        const fetchMedications = async () => {
            setIsLoading(true);
            try {
                // Demo veri
                const mockMedications = [
                    {
                        id: 1,
                        activeIngredient: 'Enrofloxacin',
                        brandName: 'Enrofil',
                        stockAmount: 15,
                        manufacturer: 'VetPharm',
                        expiryDate: '2025-03-15',
                        dosage: '2.5 mg/kg',
                        animalTypes: ['Kedi', 'Köpek', 'İnek', 'Keçi', 'At'],
                        usageArea: 'Solunum yolu enfeksiyonları, metritis, mastitis',
                        administrationRoute: 'IM',
                        contraindications: 'Kedilerde retina hasarı riski nedeniyle dikkatli kullanılmalı.',
                        price: 250,
                        notes: 'Geniş spektrumlu antibiyotik'
                    },
                    {
                        id: 2,
                        activeIngredient: 'Florfenikol',
                        brandName: 'FlorinVet',
                        stockAmount: 8,
                        manufacturer: 'AnimalCare',
                        expiryDate: '2024-11-25',
                        dosage: '20 mg/kg',
                        animalTypes: ['Kedi', 'Köpek', 'İnek'],
                        usageArea: 'Solunum yolu enfeksiyonları',
                        administrationRoute: 'IM',
                        contraindications: 'Üreme dönemindeki hayvanlarda kullanılmamalı.',
                        price: 180,
                        notes: 'Broad spectrum antibiyotik'
                    },
                    {
                        id: 3,
                        activeIngredient: 'Amoksisilin+Klavulanik Asit',
                        brandName: 'Synulox',
                        stockAmount: 28,
                        manufacturer: 'PetVax',
                        expiryDate: '2024-10-12',
                        dosage: '12.5-25 mg/kg',
                        animalTypes: ['Kedi', 'Köpek'],
                        usageArea: 'Yumuşak doku enfeksiyonları, üriner sistem enfeksiyonları',
                        administrationRoute: 'Oral',
                        contraindications: 'Penisilin alerjisi olan hayvanlarda kullanılmamalı.',
                        price: 190,
                        notes: 'Günde iki kez kullanım'
                    },
                    {
                        id: 4,
                        activeIngredient: 'Sefaleksin',
                        brandName: 'CefaTabs',
                        stockAmount: 20,
                        manufacturer: 'MedAnimal',
                        expiryDate: '2025-01-20',
                        dosage: '15-30 mg/kg',
                        animalTypes: ['Kedi', 'Köpek'],
                        usageArea: 'Deri enfeksiyonları, üriner sistem enfeksiyonları',
                        administrationRoute: 'Oral',
                        contraindications: 'Sefalosporin alerjisi olan hayvanlarda kullanılmamalı.',
                        price: 210,
                        notes: 'Günde 1-2 defa'
                    },
                    {
                        id: 5,
                        activeIngredient: 'Meloksikam',
                        brandName: 'MeloPain',
                        stockAmount: 5,
                        manufacturer: 'VetBioTech',
                        expiryDate: '2024-12-28',
                        dosage: '0.2 mg/kg ilk gün, sonra 0.1 mg/kg',
                        animalTypes: ['Kedi', 'Köpek'],
                        usageArea: 'Ağrı ve yangı tedavisi',
                        administrationRoute: 'SC, Oral',
                        contraindications: 'Gebelikte, böbrek/karaciğer yetmezliğinde, gastrik ülserde kullanılmamalı.',
                        price: 150,
                        notes: 'NSAID'
                    },
                    {
                        id: 6,
                        activeIngredient: 'Ketoprofen',
                        brandName: 'KetoVet',
                        stockAmount: 12,
                        manufacturer: 'AnimalPlus',
                        expiryDate: '2025-02-05',
                        dosage: '2 mg/kg',
                        animalTypes: ['Köpek', 'At', 'Büyükbaş'],
                        usageArea: 'Ağrı, ateş ve yangı kontrolü',
                        administrationRoute: 'IM, IV',
                        contraindications: 'Gastrik ülseri olan hayvanlarda dikkatli kullanılmalı.',
                        price: 160,
                        notes: 'NSAID'
                    },
                    {
                        id: 7,
                        activeIngredient: 'Deksametazon',
                        brandName: 'DexaVet',
                        stockAmount: 18,
                        manufacturer: 'MedAnimal',
                        expiryDate: '2024-09-30',
                        dosage: '0.5-2 mg/kg',
                        animalTypes: ['Kedi', 'Köpek', 'At', 'Büyükbaş', 'Küçükbaş'],
                        usageArea: 'Şok, inflamatuar ve alerjik durumlar',
                        administrationRoute: 'IM, IV, SC',
                        contraindications: 'Diyabet, sistemik mantar enfeksiyonları, viral enfeksiyonlarda dikkatli kullanılmalı.',
                        price: 120,
                        notes: 'Kortikosteroid'
                    },
                    {
                        id: 8,
                        activeIngredient: 'İvermektin',
                        brandName: 'ParaStop',
                        stockAmount: 25,
                        manufacturer: 'VetPharm',
                        expiryDate: '2025-04-18',
                        dosage: '0.2-0.4 mg/kg',
                        animalTypes: ['Köpek', 'Büyükbaş', 'Küçükbaş', 'At'],
                        usageArea: 'İç ve dış parazit tedavisi',
                        administrationRoute: 'SC, Oral',
                        contraindications: 'Collie ve benzeri ırklarda kan-beyin bariyerini geçebilir, dikkatli kullanılmalı.',
                        price: 220,
                        notes: 'Geniş spektrumlu antiparaziter'
                    },
                    {
                        id: 9,
                        activeIngredient: 'Oksitosin',
                        brandName: 'OxyVet',
                        stockAmount: 10,
                        manufacturer: 'AnimalCare',
                        expiryDate: '2024-08-12',
                        dosage: '0.25-0.5 IU/kg',
                        animalTypes: ['Kedi', 'Köpek', 'İnek', 'Keçi'],
                        usageArea: 'Doğum, plasentanın atılması, postpartum kanama',
                        administrationRoute: 'IM, IV',
                        contraindications: 'Distosi varlığında kullanılmamalı.',
                        price: 180,
                        notes: 'Hormon'
                    },
                    {
                        id: 10,
                        activeIngredient: 'Atropin Sülfat',
                        brandName: 'AtroMed',
                        stockAmount: 8,
                        manufacturer: 'VetBioTech',
                        expiryDate: '2024-10-25',
                        dosage: '0.04 mg/kg',
                        animalTypes: ['Kedi', 'Köpek', 'At'],
                        usageArea: 'Bradikardi, organofosfat zehirlenmesi, anestezi öncesi',
                        administrationRoute: 'IM, IV, SC',
                        contraindications: 'Glokom, taşikardi, üriner retansiyonda kullanılmamalı.',
                        price: 140,
                        notes: 'Antikolinerjik'
                    }
                ];

                setMedications(mockMedications);
                setFilteredMedications(mockMedications);

                // Stok kontrolü yap ve bildirim oluştur
                const lowStockItems = mockMedications.filter(med => med.stockAmount < 10);
                if (lowStockItems.length > 0) {
                    const notifications = lowStockItems.map(med => ({
                        id: med.id,
                        message: `${med.activeIngredient} (${med.brandName}) stok seviyesi kritik: ${med.stockAmount} adet kaldı!`,
                        date: new Date().toLocaleDateString()
                    }));
                    setLowStockNotifications(notifications);

                    // Bildirim sistemine gönder (mock işlem)
                    console.log("Düşük stok bildirimleri:", notifications);
                }

                setIsLoading(false);
            } catch (error) {
                console.error('İlaç bilgileri yüklenirken hata:', error);
                setError('İlaç bilgileri yüklenirken bir hata oluştu.');
                setIsLoading(false);
            }
        };

        fetchMedications();
    }, []);

    // Arama ve filtreleme
    useEffect(() => {
        if (medications.length === 0) return;

        let filtered = [...medications];

        // Arama sorgusuna göre filtrele
        if (searchQuery.trim() !== '') {
            const query = searchQuery.toLowerCase();
            filtered = filtered.filter(med =>
                med.activeIngredient.toLowerCase().includes(query) ||
                med.brandName.toLowerCase().includes(query) ||
                med.usageArea.toLowerCase().includes(query)
            );
        }

        // Hayvan türüne göre filtrele
        if (filterAnimalType !== 'all') {
            filtered = filtered.filter(med =>
                med.animalTypes.includes(filterAnimalType)
            );
        }

        setFilteredMedications(filtered);
    }, [searchQuery, filterAnimalType, medications]);

    // Hayvan türüne göre ilaç bilgisi göster
    const showAnimalMedicationInfo = (animalType) => {
        setSelectedAnimalInfo({
            animalType,
            medications: medications.filter(med => med.animalTypes.includes(animalType))
        });
    };

    // Stok durumuna göre renk sınıfı belirle
    const getStockStatusClass = (amount) => {
        if (amount < 10) return 'low-stock';
        if (amount < 20) return 'medium-stock';
        return 'good-stock';
    };

    // Yeni ilaç ekleme fonksiyonu
    const [newMedication, setNewMedication] = useState({
        activeIngredient: '',
        brandName: '',
        stockAmount: 0,
        manufacturer: '',
        expiryDate: '',
        dosage: '',
        animalTypes: [],
        usageArea: '',
        administrationRoute: '',
        contraindications: '',
        price: 0,
        notes: ''
    });

    // Form alanlarını güncelleme
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewMedication({
            ...newMedication,
            [name]: value
        });
    };

    // Çoklu seçim alanlarını güncelleme
    const handleMultiSelect = (name, value) => {
        if (name === 'animalTypes') {
            const updatedTypes = [...newMedication.animalTypes];
            if (updatedTypes.includes(value)) {
                const index = updatedTypes.indexOf(value);
                updatedTypes.splice(index, 1);
            } else {
                updatedTypes.push(value);
            }
            setNewMedication({
                ...newMedication,
                animalTypes: updatedTypes
            });
        }
    };

    // Yeni ilaç kaydetme işlemi
    const handleSaveMedication = () => {
        // Form doğrulama
        if (!newMedication.activeIngredient || !newMedication.brandName || !newMedication.manufacturer) {
            alert('Lütfen gerekli alanları doldurun: Etken Madde, Marka Adı ve Üretici');
            return;
        }

        // Yeni ID oluştur
        const newId = Math.max(...medications.map(m => m.id), 0) + 1;

        // Yeni ilaç nesnesi
        const medicationToAdd = {
            ...newMedication,
            id: newId,
            stockAmount: parseInt(newMedication.stockAmount),
            price: parseInt(newMedication.price)
        };

        // Mevcut ilaçlara ekle
        const updatedMedications = [...medications, medicationToAdd];
        setMedications(updatedMedications);
        setFilteredMedications(updatedMedications);

        // Stok kontrolü
        if (medicationToAdd.stockAmount < 10) {
            const newNotification = {
                id: medicationToAdd.id,
                message: `${medicationToAdd.activeIngredient} (${medicationToAdd.brandName}) stok seviyesi kritik: ${medicationToAdd.stockAmount} adet kaldı!`,
                date: new Date().toLocaleDateString()
            };
            setLowStockNotifications([...lowStockNotifications, newNotification]);
        }

        // Modalı kapat ve formu sıfırla
        setShowAddModal(false);
        setNewMedication({
            activeIngredient: '',
            brandName: '',
            stockAmount: 0,
            manufacturer: '',
            expiryDate: '',
            dosage: '',
            animalTypes: [],
            usageArea: '',
            administrationRoute: '',
            contraindications: '',
            price: 0,
            notes: ''
        });
    };

    if (isLoading) {
        return (
            <div className="loading-container">
                <div className="loading-spinner"></div>
                <p>İlaç bilgileri yükleniyor...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="error-container">
                <p className="error-message">{error}</p>
                <button className="retry-btn" onClick={() => window.location.reload()}>
                    Tekrar Dene
                </button>
            </div>
        );
    }

    return (
        <div className="medications-page">
            <NavBar />
            <div className="medications-content">
                <div className="medications-header">
                    <div className="header-title-container">
                        <h2>İlaç Yönetim Sistemi</h2>
                        <button
                            className="add-medication-button"
                            onClick={() => setShowAddModal(true)}
                        >
                            <i className="fas fa-plus"></i> Yeni İlaç Ekle
                        </button>
                    </div>

                    <div className="tab-container">
                        <button
                            className={`tab-btn ${activeTab === 'stock' ? 'active' : ''}`}
                            onClick={() => setActiveTab('stock')}
                        >
                            İlaç Stok Bilgisi
                        </button>
                        <button
                            className={`tab-btn ${activeTab === 'usage' ? 'active' : ''}`}
                            onClick={() => {
                                setActiveTab('usage');
                                if (filterAnimalType !== 'all') {
                                    showAnimalMedicationInfo(filterAnimalType);
                                }
                            }}
                        >
                            İlaç Uygulama Rehberi
                        </button>
                        <button
                            className={`tab-btn ${activeTab === 'notifications' ? 'active' : ''}`}
                            onClick={() => setActiveTab('notifications')}
                        >
                            Stok Bildirimleri
                            {lowStockNotifications.length > 0 && (
                                <span className="notification-badge">{lowStockNotifications.length}</span>
                            )}
                        </button>
                    </div>
                </div>

                {/* Düşük stok bildirimleri */}
                {activeTab === 'notifications' && (
                    <div className="notifications-section">
                        <h3>Stok Bildirim Merkezi</h3>
                        {lowStockNotifications.length > 0 ? (
                            <div className="notifications-list">
                                {lowStockNotifications.map(notification => (
                                    <div key={notification.id} className="notification-item">
                                        <div className="notification-icon">
                                            <i className="fas fa-exclamation-triangle"></i>
                                        </div>
                                        <div className="notification-content">
                                            <p className="notification-message">{notification.message}</p>
                                            <span className="notification-time">{notification.date}</span>
                                        </div>
                                        <button className="order-button">Sipariş Ver</button>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="no-notifications">Kritik stok seviyesinde ilaç bulunmamaktadır.</p>
                        )}
                    </div>
                )}

                {/* İlaç Stok Bilgisi */}
                {activeTab === 'stock' && (
                    <div className="stock-section">
                        <div className="filter-container">
                            <div className="search-box">
                                <input
                                    type="text"
                                    placeholder="İlaç adı veya etken madde ara..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                                <button className="search-button">
                                    <i className="fas fa-search"></i>
                                </button>
                            </div>
                            <div className="filter-options">
                                <select
                                    value={filterAnimalType}
                                    onChange={(e) => setFilterAnimalType(e.target.value)}
                                >
                                    <option value="all">Tüm Hayvan Türleri</option>
                                    <option value="Kedi">Kedi</option>
                                    <option value="Köpek">Köpek</option>
                                    <option value="Büyükbaş">Büyükbaş</option>
                                    <option value="Küçükbaş">Küçükbaş</option>
                                    <option value="At">At</option>
                                </select>
                            </div>
                        </div>

                        <div className="stock-table-container">
                            <table className="stock-table">
                                <thead>
                                    <tr>
                                        <th>Etken Madde</th>
                                        <th>Ticari İsim</th>
                                        <th>Hayvan Türü</th>
                                        <th>Kullanım Alanı</th>
                                        <th>Uygulama Yolu</th>
                                        <th>Doz Miktarı</th>
                                        <th>Stok Miktarı</th>
                                        <th>Son Kullanma Tarihi</th>
                                        <th>İşlemler</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredMedications.length > 0 ? (
                                        filteredMedications.map(med => (
                                            <tr key={med.id}>
                                                <td>{med.activeIngredient}</td>
                                                <td>{med.brandName}</td>
                                                <td>{med.animalTypes.join(', ')}</td>
                                                <td>{med.usageArea}</td>
                                                <td>{med.administrationRoute}</td>
                                                <td>{med.dosage}</td>
                                                <td className={getStockStatusClass(med.stockAmount)}>
                                                    {med.stockAmount} {med.stockAmount < 10 && <i className="fas fa-exclamation-triangle"></i>}
                                                </td>
                                                <td>{med.expiryDate}</td>
                                                <td>
                                                    <button className="action-button edit">
                                                        <i className="fas fa-edit"></i>
                                                    </button>
                                                    <button className="action-button view">
                                                        <i className="fas fa-eye"></i>
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="9" className="no-results">Arama kriterlerine uygun ilaç bulunamadı</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {/* İlaç Uygulama Rehberi */}
                {activeTab === 'usage' && (
                    <div className="usage-section">
                        <div className="animal-selector">
                            <div className="selector-header">
                                <h3>Hayvan Türü Seçin</h3>
                            </div>
                            <div className="animal-buttons">
                                <button
                                    className={`animal-button ${filterAnimalType === 'Kedi' ? 'active' : ''}`}
                                    onClick={() => {
                                        setFilterAnimalType('Kedi');
                                        showAnimalMedicationInfo('Kedi');
                                    }}
                                >
                                    <i className="fas fa-cat"></i> Kedi
                                </button>
                                <button
                                    className={`animal-button ${filterAnimalType === 'Köpek' ? 'active' : ''}`}
                                    onClick={() => {
                                        setFilterAnimalType('Köpek');
                                        showAnimalMedicationInfo('Köpek');
                                    }}
                                >
                                    <i className="fas fa-dog"></i> Köpek
                                </button>
                                <button
                                    className={`animal-button ${filterAnimalType === 'Büyükbaş' ? 'active' : ''}`}
                                    onClick={() => {
                                        setFilterAnimalType('Büyükbaş');
                                        showAnimalMedicationInfo('Büyükbaş');
                                    }}
                                >
                                    <i className="fas fa-horse"></i> Büyükbaş
                                </button>
                                <button
                                    className={`animal-button ${filterAnimalType === 'Küçükbaş' ? 'active' : ''}`}
                                    onClick={() => {
                                        setFilterAnimalType('Küçükbaş');
                                        showAnimalMedicationInfo('Küçükbaş');
                                    }}
                                >
                                    <i className="fas fa-sheep"></i> Küçükbaş
                                </button>
                            </div>
                        </div>

                        {selectedAnimalInfo && (
                            <div className="animal-medication-info">
                                <h3>{selectedAnimalInfo.animalType} İçin Uygun İlaçlar</h3>

                                <table className="medication-table">
                                    <thead>
                                        <tr>
                                            <th>Etken Madde</th>
                                            <th>Hayvan Türü</th>
                                            <th>Kullanım Alanı</th>
                                            <th>Uygulama Yolu</th>
                                            <th>Doz Miktarı</th>
                                            <th>Kontrendikasyon</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {selectedAnimalInfo.medications.length > 0 ? (
                                            selectedAnimalInfo.medications.map(med => (
                                                <tr key={med.id}>
                                                    <td>{med.activeIngredient}</td>
                                                    <td>{selectedAnimalInfo.animalType}</td>
                                                    <td>{med.usageArea}</td>
                                                    <td>{med.administrationRoute}</td>
                                                    <td>{med.dosage}</td>
                                                    <td>{med.contraindications}</td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="6" className="no-results">
                                                    {selectedAnimalInfo.animalType} için uygun ilaç bulunmamaktadır
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* Yeni İlaç Ekleme Modal */}
            {showAddModal && (
                <div className="modal-overlay">
                    <div className="modal-container">
                        <div className="modal-header">
                            <h3>Yeni İlaç Ekle</h3>
                            <button className="close-button" onClick={() => setShowAddModal(false)}>
                                <i className="fas fa-times"></i>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="form-row">
                                <div className="form-group">
                                    <label>Etken Madde</label>
                                    <input
                                        type="text"
                                        name="activeIngredient"
                                        value={newMedication.activeIngredient}
                                        onChange={handleInputChange}
                                        placeholder="Etken madde adını girin"
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Marka Adı</label>
                                    <input
                                        type="text"
                                        name="brandName"
                                        value={newMedication.brandName}
                                        onChange={handleInputChange}
                                        placeholder="İlacın marka adını girin"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label>Üretici</label>
                                    <input
                                        type="text"
                                        name="manufacturer"
                                        value={newMedication.manufacturer}
                                        onChange={handleInputChange}
                                        placeholder="Üretici firma adını girin"
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Stok Miktarı</label>
                                    <input
                                        type="number"
                                        name="stockAmount"
                                        value={newMedication.stockAmount}
                                        onChange={handleInputChange}
                                        min="0"
                                    />
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label>Son Kullanma Tarihi</label>
                                    <input
                                        type="date"
                                        name="expiryDate"
                                        value={newMedication.expiryDate}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Doz Bilgisi</label>
                                    <input
                                        type="text"
                                        name="dosage"
                                        value={newMedication.dosage}
                                        onChange={handleInputChange}
                                        placeholder="Örn: 2.5 mg/kg"
                                    />
                                </div>
                            </div>

                            <div className="form-group">
                                <label>Hayvan Türleri</label>
                                <div className="checkbox-group">
                                    {['Köpek', 'Kedi', 'Büyükbaş', 'Küçükbaş', 'At'].map(type => (
                                        <label key={type} className="checkbox-label">
                                            <input
                                                type="checkbox"
                                                checked={newMedication.animalTypes.includes(type)}
                                                onChange={() => handleMultiSelect('animalTypes', type)}
                                            />
                                            {type}
                                        </label>
                                    ))}
                                </div>
                            </div>

                            <div className="form-group">
                                <label>Kullanım Alanı</label>
                                <textarea
                                    name="usageArea"
                                    value={newMedication.usageArea}
                                    onChange={handleInputChange}
                                    placeholder="İlacın kullanım endikasyonlarını girin"
                                    rows="2"
                                ></textarea>
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label>Uygulama Yolu</label>
                                    <input
                                        type="text"
                                        name="administrationRoute"
                                        value={newMedication.administrationRoute}
                                        onChange={handleInputChange}
                                        placeholder="Örn: IM, IV, Oral"
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Fiyat (TL)</label>
                                    <input
                                        type="number"
                                        name="price"
                                        value={newMedication.price}
                                        onChange={handleInputChange}
                                        min="0"
                                    />
                                </div>
                            </div>

                            <div className="form-group">
                                <label>Kontrendikasyonlar</label>
                                <textarea
                                    name="contraindications"
                                    value={newMedication.contraindications}
                                    onChange={handleInputChange}
                                    placeholder="İlacın kontrendikasyonlarını ve uyarılarını girin"
                                    rows="2"
                                ></textarea>
                            </div>

                            <div className="form-group">
                                <label>Notlar</label>
                                <textarea
                                    name="notes"
                                    value={newMedication.notes}
                                    onChange={handleInputChange}
                                    placeholder="İlaç ile ilgili önemli notları buraya yazın"
                                    rows="2"
                                ></textarea>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button className="cancel-button" onClick={() => setShowAddModal(false)}>İptal</button>
                            <button className="save-button" onClick={handleSaveMedication}>Kaydet</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Medications; 