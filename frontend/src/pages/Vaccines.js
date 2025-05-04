import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar';
import '../styles/Vaccinations.css';

const Vaccines = () => {
  const navigate = useNavigate();
  const [vaccines, setVaccines] = useState([]);
  const [filteredVaccines, setFilteredVaccines] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('stock');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterAnimalType, setFilterAnimalType] = useState('all');
  const [filterBreed, setFilterBreed] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedAnimalInfo, setSelectedAnimalInfo] = useState(null);
  const [lowStockNotifications, setLowStockNotifications] = useState([]);

  // Hayvan türüne göre ırkları tanımlama
  const breedsByAnimalType = {
    'Köpek': ['Golden Retriever', 'Labrador', 'Alman Çoban Köpeği', 'Bulldog', 'Terrier', 'Diğer'],
    'Kedi': ['Siyam', 'Persian', 'Scottish Fold', 'British Shorthair', 'Tekir', 'Diğer'],
    'Küçükbaş': ['Merinos', 'Kıvırcık', 'Akkaraman', 'İvesi', 'Sakız', 'Diğer'],
    'Büyükbaş': ['Holstein', 'Simental', 'Montofon', 'Angus', 'Jersey', 'Diğer']
  };

  useEffect(() => {
    // Aşı verilerini getir
    const fetchVaccines = async () => {
      setIsLoading(true);
      try {
        // Demo veri
        const mockVaccines = [
          {
            id: 1,
            name: 'Kuduz Aşısı',
            stockAmount: 6,
            manufacturer: 'VetBioTech',
            expiryDate: '2024-11-15',
            minimalAge: 3,
            dosage: '1 ml',
            animalTypes: ['Köpek', 'Kedi'],
            applicableBreeds: ['Tüm ırklar'],
            protectsAgainst: ['Kuduz Virüsü'],
            sideEffects: 'Hafif ateş, enjeksiyon bölgesinde hassasiyet',
            price: 180,
            notes: 'Yıllık tekrarı gereklidir'
          },
          {
            id: 2,
            name: 'Parvovirüs Aşısı',
            stockAmount: 3,
            manufacturer: 'PetVax',
            expiryDate: '2024-09-20',
            minimalAge: 2,
            dosage: '0.5 ml',
            animalTypes: ['Köpek'],
            applicableBreeds: ['Golden Retriever', 'Labrador', 'Alman Çoban Köpeği', 'Diğer'],
            protectsAgainst: ['Parvovirüs'],
            sideEffects: 'İştahsızlık, letarji',
            price: 220,
            notes: 'Yavru köpekler için yaşamsal öneme sahiptir'
          },
          {
            id: 3,
            name: 'FeLV Aşısı',
            stockAmount: 15,
            manufacturer: 'CatHealth',
            expiryDate: '2025-01-10',
            minimalAge: 2,
            dosage: '1 ml',
            animalTypes: ['Kedi'],
            applicableBreeds: ['Siyam', 'Persian', 'Scottish Fold', 'Diğer'],
            protectsAgainst: ['Feline Lösemi Virüsü'],
            sideEffects: 'Enjeksiyon bölgesinde şişlik, ateş',
            price: 250,
            notes: 'Dış mekana çıkan kediler için önerilir'
          },
          {
            id: 4,
            name: 'Bordetella Aşısı',
            stockAmount: 32,
            manufacturer: 'VetBioTech',
            expiryDate: '2024-10-05',
            minimalAge: 4,
            dosage: '0.5 ml',
            animalTypes: ['Köpek'],
            applicableBreeds: ['Tüm ırklar'],
            protectsAgainst: ['Kennel Cough', 'Bordetella Bronchiseptica'],
            sideEffects: 'Hafif öksürük',
            price: 160,
            notes: 'Barınak veya otel ortamına girecek köpekler için önerilir'
          },
          {
            id: 5,
            name: 'Karma Aşı (DHPP)',
            stockAmount: 38,
            manufacturer: 'PetVax',
            expiryDate: '2024-12-22',
            minimalAge: 2,
            dosage: '1 ml',
            animalTypes: ['Köpek'],
            applicableBreeds: ['Tüm ırklar'],
            protectsAgainst: ['Distemper', 'Hepatit', 'Parvovirüs', 'Parainfluenza'],
            sideEffects: 'Ateş, iştahsızlık',
            price: 280,
            notes: 'Temel koruyucu aşılardan biridir'
          },
          {
            id: 6,
            name: 'FVRCP Aşısı',
            stockAmount: 22,
            manufacturer: 'CatHealth',
            expiryDate: '2025-02-18',
            minimalAge: 2,
            dosage: '1 ml',
            animalTypes: ['Kedi'],
            applicableBreeds: ['Tüm ırklar'],
            protectsAgainst: ['Feline Viral Rhinotracheitis', 'Calicivirus', 'Panleukopenia'],
            sideEffects: 'Geçici ateş, halsizlik',
            price: 240,
            notes: 'Temel kedi aşılarından biridir'
          },
          {
            id: 7,
            name: 'Leptospiroz Aşısı',
            stockAmount: 4,
            manufacturer: 'VetBioTech',
            expiryDate: '2024-11-30',
            minimalAge: 4,
            dosage: '1 ml',
            animalTypes: ['Köpek'],
            applicableBreeds: ['Golden Retriever', 'Bulldog', 'Diğer'],
            protectsAgainst: ['Leptospira Bakterileri'],
            sideEffects: 'Ateş, hassasiyet',
            price: 200,
            notes: 'Risk altındaki köpekler için önerilir'
          },
          {
            id: 8,
            name: 'FIP Aşısı',
            stockAmount: 5,
            manufacturer: 'CatHealth',
            expiryDate: '2024-08-15',
            minimalAge: 4,
            dosage: '0.5 ml',
            animalTypes: ['Kedi'],
            applicableBreeds: ['Siyam', 'Persian', 'Diğer'],
            protectsAgainst: ['Feline Infectious Peritonitis'],
            sideEffects: 'Enjeksiyon bölgesinde ağrı, ateş',
            price: 320,
            notes: 'Sınırlı etkinlik, risk altındaki kediler için'
          },
          {
            id: 9,
            name: 'Şap Aşısı',
            stockAmount: 60,
            manufacturer: 'AgriVet',
            expiryDate: '2025-03-10',
            minimalAge: 3,
            dosage: '2 ml',
            animalTypes: ['Büyükbaş', 'Küçükbaş'],
            applicableBreeds: ['Tüm ırklar'],
            protectsAgainst: ['Şap (FMD)'],
            sideEffects: 'Enjeksiyon bölgesinde şişlik',
            price: 150,
            notes: '3-6 ay arası; 4 hafta sonra pekiştir; 6 ayda bir'
          },
          {
            id: 10,
            name: 'Koksidiyoz Aşısı',
            stockAmount: 25,
            manufacturer: 'RuralVax',
            expiryDate: '2024-12-05',
            minimalAge: 0,
            dosage: '1 ml',
            animalTypes: ['Küçükbaş'],
            applicableBreeds: ['Merinos', 'Kıvırcık', 'Diğer'],
            protectsAgainst: ['Koksidiyoz'],
            sideEffects: 'Nadiren hafif ateş',
            price: 190,
            notes: '1 gün; damızlıkta periyodik'
          },
          {
            id: 11,
            name: 'Brucella Aşısı',
            stockAmount: 42,
            manufacturer: 'AgriVet',
            expiryDate: '2025-02-25',
            minimalAge: 3,
            dosage: '2 ml',
            animalTypes: ['Küçükbaş'],
            applicableBreeds: ['Tüm ırklar'],
            protectsAgainst: ['Bruselloz (zoonoz)'],
            sideEffects: 'Enjeksiyon bölgesinde ağrı',
            price: 220,
            notes: '3-8 ay (dişi buzağılar); tek doz'
          },
          {
            id: 12,
            name: 'Tetanoz Aşısı',
            stockAmount: 38,
            manufacturer: 'RuralVax',
            expiryDate: '2025-01-18',
            minimalAge: 1,
            dosage: '2 ml',
            animalTypes: ['Büyükbaş', 'Küçükbaş'],
            applicableBreeds: ['Tüm ırklar'],
            protectsAgainst: ['Tetanoz'],
            sideEffects: 'Enjeksiyon bölgesinde hassasiyet',
            price: 180,
            notes: '1-2 ay; 4 hafta sonra pekiştir; yıllık'
          },
          {
            id: 13,
            name: 'Mavi Dil Aşısı',
            stockAmount: 30,
            manufacturer: 'AgriVet',
            expiryDate: '2025-02-28',
            minimalAge: 3,
            dosage: '1 ml',
            animalTypes: ['Küçükbaş'],
            applicableBreeds: ['Merinos', 'Kıvırcık', 'Akkaraman', 'İvesi'],
            protectsAgainst: ['Bluetongue'],
            sideEffects: 'Nadir alerjik reaksiyonlar',
            price: 195,
            notes: 'Sezon öncesi; yıllık'
          },
          {
            id: 14,
            name: 'Sheep Pox Aşısı',
            stockAmount: 45,
            manufacturer: 'RuralVax',
            expiryDate: '2024-11-22',
            minimalAge: 2,
            dosage: '1 ml',
            animalTypes: ['Küçükbaş'],
            applicableBreeds: ['Tüm ırklar'],
            protectsAgainst: ['Sheep pox'],
            sideEffects: 'Lokal reaksiyonlar',
            price: 160,
            notes: '2-4 ay; yıllık'
          },
          {
            id: 15,
            name: 'Lamb Coccidiosis Aşısı',
            stockAmount: 28,
            manufacturer: 'AgriVet',
            expiryDate: '2024-10-15',
            minimalAge: 0,
            dosage: '0.5 ml',
            animalTypes: ['Küçükbaş'],
            applicableBreeds: ['Kıvırcık', 'Sakız', 'Diğer'],
            protectsAgainst: ['Coccidia'],
            sideEffects: 'Minimal',
            price: 210,
            notes: '1-2 hafta; tek doz; yıllık'
          }
        ];

        setVaccines(mockVaccines);
        setFilteredVaccines(mockVaccines);

        // Stok kontrolü yap ve bildirim oluştur
        const lowStockItems = mockVaccines.filter(vaccine => vaccine.stockAmount < 10);
        if (lowStockItems.length > 0) {
          const notifications = lowStockItems.map(vaccine => ({
            id: vaccine.id,
            message: `${vaccine.name} stok seviyesi kritik: ${vaccine.stockAmount} adet kaldı!`,
            date: new Date().toLocaleDateString()
          }));
          setLowStockNotifications(notifications);

          // Bildirim sistemine gönder (mock işlem)
          console.log("Düşük aşı stok bildirimleri:", notifications);
        }

        setIsLoading(false);
      } catch (error) {
        console.error('Aşı bilgileri yüklenirken hata:', error);
        setError('Aşı bilgileri yüklenirken bir hata oluştu.');
        setIsLoading(false);
      }
    };

    fetchVaccines();
  }, []);

  // Filtreleme işlevselliği
  useEffect(() => {
    let result = [...vaccines];

    // Arama sorgusuna göre filtrele
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        vaccine =>
          vaccine.name.toLowerCase().includes(query) ||
          vaccine.manufacturer.toLowerCase().includes(query) ||
          vaccine.protectsAgainst.some(disease => disease.toLowerCase().includes(query))
      );
    }

    // Hayvan türüne göre filtrele
    if (filterAnimalType !== 'all') {
      result = result.filter(
        vaccine => vaccine.animalTypes.includes(filterAnimalType)
      );
    }

    // Irka göre filtrele
    if (filterBreed !== 'all') {
      result = result.filter(
        vaccine => vaccine.applicableBreeds.includes('Tüm ırklar') || vaccine.applicableBreeds.includes(filterBreed)
      );
    }

    setFilteredVaccines(result);
  }, [searchQuery, filterAnimalType, filterBreed, vaccines]);

  // Hayvan türü değiştiğinde ırk filtresini sıfırla
  useEffect(() => {
    setFilterBreed('all');
  }, [filterAnimalType]);

  // Hayvan türüne göre bilgileri göster
  const showAnimalVaccineInfo = (animalType) => {
    if (animalType === 'Küçükbaş') {
      setSelectedAnimalInfo({
        type: 'Koyun',
        vaccines: [
          { name: 'Şap Aşısı', disease: 'Şap (FMD)', timing: '3–6 ay; 4 hafta sonra pekiştir; 6 ayda bir' },
          { name: 'Koksidiyoz Aşısı', disease: 'Koksidiyoz', timing: '1 gün; damızlıkta periyodik' },
          { name: 'Brucella Aşısı', disease: 'Bruselloz (zoonoz)', timing: '3–8 ay (dişi buzağılar); tek doz' },
          { name: 'Tetanoz Aşısı', disease: 'Tetanoz', timing: '1–2 ay; 4 hafta sonra pekiştir; yıllık' },
          { name: 'Mavi Dil Aşısı', disease: 'Bluetongue', timing: 'Sezon öncesi; yıllık' },
          { name: 'Sheep Pox Aşısı', disease: 'Sheep pox', timing: '2–4 ay; yıllık' },
          { name: 'Lamb Coccidiosis Aşısı', disease: 'Coccidia', timing: '1–2 hafta; tek doz; yıllık' }
        ]
      });
    } else if (animalType === 'Büyükbaş') {
      setSelectedAnimalInfo({
        type: 'Sığır',
        vaccines: [
          { name: 'Şap Aşısı', disease: 'Şap (FMD)', timing: '2–4 ay; 4 hafta sonra pekiştir; 6 ayda bir' },
          { name: 'IBR Aşısı', disease: 'Infectious Bovine Rhinotracheitis', timing: '3 ay; yıllık' },
          { name: 'BVD Aşısı', disease: 'Bovine Viral Diarrhea', timing: '6–8 ay; yıllık' },
          { name: 'Şarbon Aşısı', disease: 'Şarbon (Anthrax)', timing: '6 ay üzeri; yıllık' },
          { name: 'Mastitis Aşısı', disease: 'Mastitis', timing: 'Gebeliğin son döneminde; yıllık' }
        ]
      });
    } else {
      setSelectedAnimalInfo(null);
    }
  };

  // Renk kodlaması için stok durumu yardımcı fonksiyonu
  const getStockStatus = (amount) => {
    if (amount <= 5) return 'critical';
    if (amount <= 15) return 'low';
    return 'normal';
  };

  // Stok durumuna göre renk sınıfı belirle
  const getStockStatusClass = (amount) => {
    if (amount < 10) return 'low-stock';
    if (amount < 20) return 'medium-stock';
    return 'good-stock';
  };

  // Yeni aşı ekleme fonksiyonu
  const [newVaccine, setNewVaccine] = useState({
    name: '',
    manufacturer: '',
    stockAmount: 0,
    expiryDate: '',
    minimalAge: 0,
    dosage: '',
    animalTypes: [],
    applicableBreeds: [],
    protectsAgainst: [],
    sideEffects: '',
    price: 0,
    notes: ''
  });

  // Form alanlarını güncelleme
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewVaccine({
      ...newVaccine,
      [name]: value
    });
  };

  // Çoklu seçim alanlarını güncelleme
  const handleMultiSelect = (name, value) => {
    if (name === 'animalTypes') {
      const updatedTypes = [...newVaccine.animalTypes];
      if (updatedTypes.includes(value)) {
        const index = updatedTypes.indexOf(value);
        updatedTypes.splice(index, 1);
      } else {
        updatedTypes.push(value);
      }
      setNewVaccine({
        ...newVaccine,
        animalTypes: updatedTypes
      });
    } else if (name === 'protectsAgainst') {
      setNewVaccine({
        ...newVaccine,
        protectsAgainst: value.split(',').map(item => item.trim()).filter(item => item !== '')
      });
    }
  };

  // Yeni aşı kaydetme işlemi
  const handleSaveVaccine = () => {
    // Form doğrulama
    if (!newVaccine.name || !newVaccine.manufacturer || newVaccine.animalTypes.length === 0) {
      alert('Lütfen gerekli alanları doldurun: Aşı Adı, Üretici ve Hayvan Türleri');
      return;
    }

    // Yeni ID oluştur
    const newId = Math.max(...vaccines.map(v => v.id), 0) + 1;

    // Yeni aşı nesnesi
    const vaccineToAdd = {
      ...newVaccine,
      id: newId,
      stockAmount: parseInt(newVaccine.stockAmount),
      minimalAge: parseInt(newVaccine.minimalAge),
      price: parseInt(newVaccine.price)
    };

    // Mevcut aşılara ekle
    const updatedVaccines = [...vaccines, vaccineToAdd];
    setVaccines(updatedVaccines);
    setFilteredVaccines(updatedVaccines);

    // Stok kontrolü
    if (vaccineToAdd.stockAmount < 10) {
      const newNotification = {
        id: vaccineToAdd.id,
        message: `${vaccineToAdd.name} stok seviyesi kritik: ${vaccineToAdd.stockAmount} adet kaldı!`,
        date: new Date().toLocaleDateString()
      };
      setLowStockNotifications([...lowStockNotifications, newNotification]);
    }

    // Modalı kapat ve formu sıfırla
    setShowAddModal(false);
    setNewVaccine({
      name: '',
      manufacturer: '',
      stockAmount: 0,
      expiryDate: '',
      minimalAge: 0,
      dosage: '',
      animalTypes: [],
      applicableBreeds: [],
      protectsAgainst: [],
      sideEffects: '',
      price: 0,
      notes: ''
    });
  };

  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Aşı bilgileri yükleniyor...</p>
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
    <div className="vaccines-page">
      <NavBar />
      <div className="vaccines-content">
        <div className="vaccines-header">
          <div className="header-title-container">
            <h2>Aşı Yönetim Sistemi</h2>
            <button
              className="add-vaccine-button"
              onClick={() => setShowAddModal(true)}
            >
              <i className="fas fa-plus"></i> Yeni Aşı Ekle
            </button>
          </div>

          <div className="tab-container">
            <button
              className={`tab-btn ${activeTab === 'stock' ? 'active' : ''}`}
              onClick={() => setActiveTab('stock')}
            >
              Aşı Stok Bilgisi
            </button>
            <button
              className={`tab-btn ${activeTab === 'usage' ? 'active' : ''}`}
              onClick={() => {
                setActiveTab('usage');
                if (filterAnimalType !== 'all') {
                  showAnimalVaccineInfo(filterAnimalType);
                }
              }}
            >
              Aşı Uygulama Rehberi
            </button>
            <button
              className={`tab-btn ${activeTab === 'history' ? 'active' : ''}`}
              onClick={() => setActiveTab('history')}
            >
              Aşı Geçmişi
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

          {/* Arama ve filtreleme bölümünü sadece stok bildirimleri sekmesi aktif değilse göster */}
          {activeTab !== 'notifications' && (
            <div className="filters-section">
              <div className="search-container">
                <input
                  type="text"
                  placeholder="Aşı adı, üretici veya hastalık ara..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="search-input"
                />
                <button className="search-btn">
                  <i className="fas fa-search"></i>
                </button>
              </div>

              <div className="filter-group">
                <div className="animal-filter">
                  <label>Hayvan Türü:</label>
                  <select
                    value={filterAnimalType}
                    onChange={(e) => {
                      setFilterAnimalType(e.target.value);
                      if (activeTab === 'usage') {
                        showAnimalVaccineInfo(e.target.value);
                      }
                    }}
                    className="animal-select"
                  >
                    <option value="all">Tümü</option>
                    <option value="Köpek">Köpek</option>
                    <option value="Kedi">Kedi</option>
                    <option value="Küçükbaş">Küçükbaş</option>
                    <option value="Büyükbaş">Büyükbaş</option>
                  </select>
                </div>

                {filterAnimalType !== 'all' && breedsByAnimalType[filterAnimalType] && (
                  <div className="breed-filter">
                    <label>Irk:</label>
                    <select
                      value={filterBreed}
                      onChange={(e) => setFilterBreed(e.target.value)}
                      className="breed-select"
                    >
                      <option value="all">Tüm Irklar</option>
                      {breedsByAnimalType[filterAnimalType].map(breed => (
                        <option key={breed} value={breed}>{breed}</option>
                      ))}
                    </select>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Aşı Stok Bilgisi */}
        {activeTab === 'stock' && (
          <div className="stock-section">
            <div className="filter-container">
              {/* ... existing filter content ... */}
            </div>

            <table className="vaccine-table">
              <thead>
                <tr>
                  <th>Aşı Adı</th>
                  <th>Üretici</th>
                  <th>Uygun Türler</th>
                  <th>Son Kullanma</th>
                  <th>Doz</th>
                  <th>Koruma</th>
                  <th>Stok Durumu</th>
                  <th>İşlemler</th>
                </tr>
              </thead>
              <tbody>
                {filteredVaccines.length > 0 ? (
                  filteredVaccines.map(vaccine => (
                    <tr key={vaccine.id}>
                      <td>{vaccine.name}</td>
                      <td>{vaccine.manufacturer}</td>
                      <td>{vaccine.animalTypes.join(', ')}</td>
                      <td>{vaccine.expiryDate}</td>
                      <td>{vaccine.dosage}</td>
                      <td>{vaccine.protectsAgainst.join(', ')}</td>
                      <td className={getStockStatusClass(vaccine.stockAmount)}>
                        {vaccine.stockAmount} {vaccine.stockAmount < 10 &&
                          <i className="fas fa-exclamation-triangle" title="Kritik stok seviyesi!"></i>
                        }
                      </td>
                      <td>
                        <button className="action-button view" title="Detay Görüntüle">
                          <i className="fas fa-eye"></i>
                        </button>
                        <button className="action-button edit" title="Düzenle">
                          <i className="fas fa-edit"></i>
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8" className="no-results">Arama kriterlerine uygun aşı bulunamadı</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'usage' && (
          <div className="vaccine-usage-container">
            {selectedAnimalInfo && (
              <div className="animal-vaccine-guide">
                <div className="animal-type-header">
                  <img
                    src={`/assets/images/${selectedAnimalInfo.type.toLowerCase()}-icon.png`}
                    alt={selectedAnimalInfo.type}
                    className="animal-icon"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.style.display = 'none';
                    }}
                  />
                  <h3>{selectedAnimalInfo.type}</h3>
                </div>
                <table className="vaccine-schedule-table">
                  <thead>
                    <tr>
                      <th>Aşı Adı</th>
                      <th>Koruduğu Hastalık</th>
                      <th>Uygulama Zamanı / Yaş</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedAnimalInfo.vaccines.map((vaccine, index) => (
                      <tr key={index}>
                        <td>{vaccine.name}</td>
                        <td>{vaccine.disease}</td>
                        <td>{vaccine.timing}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            <table className="vaccine-table">
              <thead>
                <tr>
                  <th>Aşı Adı</th>
                  <th>Koruma Sağladığı Hastalıklar</th>
                  <th>Uygun Türler</th>
                  <th>Uygun Irklar</th>
                  <th>Minimum Yaş</th>
                  <th>Doz</th>
                  <th>Yan Etkiler</th>
                  <th>Notlar</th>
                </tr>
              </thead>
              <tbody>
                {filteredVaccines.length > 0 ? (
                  filteredVaccines.map(vaccine => (
                    <tr key={vaccine.id}>
                      <td>{vaccine.name}</td>
                      <td>{vaccine.protectsAgainst.join(', ')}</td>
                      <td>{vaccine.animalTypes.join(', ')}</td>
                      <td>{vaccine.applicableBreeds.includes('Tüm ırklar')
                        ? 'Tüm ırklar'
                        : vaccine.applicableBreeds.join(', ')}</td>
                      <td>{vaccine.minimalAge} {vaccine.minimalAge === 0 ? 'gün' : 'ay'}</td>
                      <td>{vaccine.dosage}</td>
                      <td>{vaccine.sideEffects}</td>
                      <td>{vaccine.notes}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8" className="no-results">Arama kriterlerine uygun aşı bulunamadı</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'history' && (
          <div className="vaccine-history-container">
            <p className="coming-soon">Aşı uygulama geçmişi için istatistikler yakında eklenecektir.</p>
            <div className="info-message">
              <i className="fas fa-info-circle"></i>
              <span>Burada hangi hastaya hangi aşıların uygulandığı, aşı başarı oranları ve istatistiksel veriler gösterilecektir.</span>
            </div>
          </div>
        )}

        {activeTab === 'notifications' && (
          <div className="notifications-section">
            <h3>Aşı Stok Bildirim Merkezi</h3>
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
              <p className="no-notifications">Kritik stok seviyesinde aşı bulunmamaktadır.</p>
            )}
          </div>
        )}
      </div>

      {/* Yeni Aşı Ekleme Modal */}
      {showAddModal && (
        <div className="modal-overlay">
          <div className="modal-container">
            <div className="modal-header">
              <h3>Yeni Aşı Ekle</h3>
              <button className="close-button" onClick={() => setShowAddModal(false)}>
                <i className="fas fa-times"></i>
              </button>
            </div>
            <div className="modal-body">
              <div className="form-row">
                <div className="form-group">
                  <label>Aşı Adı</label>
                  <input
                    type="text"
                    name="name"
                    value={newVaccine.name}
                    onChange={handleInputChange}
                    placeholder="Aşı adını girin"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Üretici</label>
                  <input
                    type="text"
                    name="manufacturer"
                    value={newVaccine.manufacturer}
                    onChange={handleInputChange}
                    placeholder="Üretici firma adını girin"
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Stok Miktarı</label>
                  <input
                    type="number"
                    name="stockAmount"
                    value={newVaccine.stockAmount}
                    onChange={handleInputChange}
                    min="0"
                  />
                </div>
                <div className="form-group">
                  <label>Son Kullanma Tarihi</label>
                  <input
                    type="date"
                    name="expiryDate"
                    value={newVaccine.expiryDate}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Minimum Yaş (ay)</label>
                  <input
                    type="number"
                    name="minimalAge"
                    value={newVaccine.minimalAge}
                    onChange={handleInputChange}
                    min="0"
                  />
                </div>
                <div className="form-group">
                  <label>Doz</label>
                  <input
                    type="text"
                    name="dosage"
                    value={newVaccine.dosage}
                    onChange={handleInputChange}
                    placeholder="Örn: 1 ml"
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Hayvan Türleri</label>
                <div className="checkbox-group">
                  {['Köpek', 'Kedi', 'Küçükbaş', 'Büyükbaş'].map(type => (
                    <label key={type} className="checkbox-label">
                      <input
                        type="checkbox"
                        checked={newVaccine.animalTypes.includes(type)}
                        onChange={() => handleMultiSelect('animalTypes', type)}
                      />
                      {type}
                    </label>
                  ))}
                </div>
              </div>

              <div className="form-group">
                <label>Koruduğu Hastalıklar (virgülle ayırın)</label>
                <textarea
                  name="protectsAgainst"
                  value={newVaccine.protectsAgainst.join(', ')}
                  onChange={(e) => handleMultiSelect('protectsAgainst', e.target.value)}
                  placeholder="Örn: Kuduz Virüsü, Parvovirüs"
                  rows="2"
                ></textarea>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Yan Etkiler</label>
                  <input
                    type="text"
                    name="sideEffects"
                    value={newVaccine.sideEffects}
                    onChange={handleInputChange}
                    placeholder="Yan etkileri girin"
                  />
                </div>
                <div className="form-group">
                  <label>Fiyat (TL)</label>
                  <input
                    type="number"
                    name="price"
                    value={newVaccine.price}
                    onChange={handleInputChange}
                    min="0"
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Notlar</label>
                <textarea
                  name="notes"
                  value={newVaccine.notes}
                  onChange={handleInputChange}
                  placeholder="Aşı ile ilgili önemli notları buraya yazın"
                  rows="2"
                ></textarea>
              </div>
            </div>
            <div className="modal-footer">
              <button className="cancel-button" onClick={() => setShowAddModal(false)}>İptal</button>
              <button className="save-button" onClick={handleSaveVaccine}>Kaydet</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Vaccines; 