import React, { useState } from 'react';
import NavBar from '../components/NavBar';
import '../styles/FarmAnimalsPage.css';

// Örnek veri
const sampleData = {
    buyukbas: [
        {
            id: 1,
            tur: 'İnek',
            irk: 'Holstein',
            ad: 'Benekli',
            kulakNumarasi: 'TR123456789',
            dogumTarihi: '2020-05-15',
            cinsiyet: 'Dişi',
            sonTohumlanmaTarihi: '2023-07-20',
            tahminiDogumTarihi: '2024-04-25',
            anneBabaNo: 'TR987654321/TR123789456',
            sonAsiTarihi: '2023-09-10',
            asiTuru: 'Şap Aşısı',
            kulanilanSperm: 'XYZ123 - Holstein Premium',
            hastalikGecmisi: ['Mastitis (2022-03-15)', 'Ayak Hastalığı (2023-01-10)'],
            kizginlikDonemi: '2023-07-15',
            tirnakBakimZamani: '2023-11-15',
            genomikTest: 'A2A2 Beta-Kazein pozitif, DGAT1 AA',
            verim: '28 litre/gün',
            durum: 'Gebe'
        },
        {
            id: 2,
            tur: 'İnek',
            irk: 'Simental',
            ad: 'Sarıkız',
            kulakNumarasi: 'TR123456790',
            dogumTarihi: '2021-02-10',
            cinsiyet: 'Dişi',
            sonTohumlanmaTarihi: '2023-08-05',
            tahminiDogumTarihi: '2024-05-12',
            anneBabaNo: 'TR123456788/TR123456787',
            sonAsiTarihi: '2023-09-10',
            asiTuru: 'Şap Aşısı',
            kulanilanSperm: 'ABC456 - Simental Elite',
            hastalikGecmisi: ['Buzağılama Zorluğu (2022-08-20)'],
            kizginlikDonemi: '2023-08-01',
            tirnakBakimZamani: '2023-12-01',
            genomikTest: 'Kappa Kazein BB, yüksek peynir verimi',
            verim: '25 litre/gün',
            durum: 'Gebe'
        },
        {
            id: 3,
            tur: 'Boğa',
            irk: 'Angus',
            ad: 'Kara',
            kulakNumarasi: 'TR123456791',
            dogumTarihi: '2020-01-20',
            cinsiyet: 'Erkek',
            sonTohumlanmaTarihi: '-',
            tahminiDogumTarihi: '-',
            anneBabaNo: 'TR123456001/TR123456002',
            sonAsiTarihi: '2023-09-10',
            asiTuru: 'Şap Aşısı',
            kulanilanSperm: '-',
            hastalikGecmisi: [],
            kizginlikDonemi: '-',
            tirnakBakimZamani: '2023-10-15',
            genomikTest: 'Marbling geni pozitif, yüksek et kalitesi',
            verim: '-',
            durum: 'Aktif Damızlık'
        },
        {
            id: 4,
            tur: 'At',
            irk: 'Arap Atı',
            ad: 'Rüzgar',
            kulakNumarasi: 'TR987654321',
            dogumTarihi: '2018-04-12',
            cinsiyet: 'Erkek',
            sonTohumlanmaTarihi: '-',
            tahminiDogumTarihi: '-',
            anneBabaNo: 'TR987654322/TR987654323',
            sonAsiTarihi: '2023-08-15',
            asiTuru: 'Tetanoz',
            kulanilanSperm: '-',
            hastalikGecmisi: ['Kolik (2022-05-20)'],
            kizginlikDonemi: '-',
            tirnakBakimZamani: '2023-09-01',
            genomikTest: 'Hız ve dayanıklılık genleri pozitif',
            verim: '-',
            durum: 'Aktif'
        }
    ],
    kucukbas: [
        {
            id: 101,
            tur: 'Koyun',
            irk: 'Merinos',
            ad: 'Pamuk',
            kulakNumarasi: 'TR223456789',
            dogumTarihi: '2021-11-10',
            cinsiyet: 'Dişi',
            sonTohumlanmaTarihi: '2023-09-15',
            tahminiDogumTarihi: '2024-02-12',
            anneBabaNo: 'TR223456788/TR223456787',
            sonAsiTarihi: '2023-07-20',
            asiTuru: 'Clostridial',
            kulanilanSperm: 'MER123 - Merinos Premium',
            hastalikGecmisi: [],
            kizginlikDonemi: '2023-09-10',
            tirnakBakimZamani: '2023-11-01',
            genomikTest: 'Yüksek yün kalitesi genleri',
            verim: '4.5 kg yün/yıl',
            durum: 'Gebe'
        },
        {
            id: 102,
            tur: 'Keçi',
            irk: 'Saanen',
            ad: 'Beyaz',
            kulakNumarasi: 'TR323456789',
            dogumTarihi: '2022-01-25',
            cinsiyet: 'Dişi',
            sonTohumlanmaTarihi: '2023-08-20',
            tahminiDogumTarihi: '2024-01-15',
            anneBabaNo: 'TR323456788/TR323456787',
            sonAsiTarihi: '2023-07-20',
            asiTuru: 'PPR',
            kulanilanSperm: 'SAA456 - Saanen Elite',
            hastalikGecmisi: ['Paraziter Enfeksiyon (2023-03-10)'],
            kizginlikDonemi: '2023-08-15',
            tirnakBakimZamani: '2023-10-15',
            genomikTest: 'Yüksek süt proteini genleri',
            verim: '3.2 litre/gün',
            durum: 'Gebe'
        },
        {
            id: 103,
            tur: 'Koyun',
            irk: 'Kıvırcık',
            ad: 'Karabaş',
            kulakNumarasi: 'TR423456789',
            dogumTarihi: '2021-10-05',
            cinsiyet: 'Erkek',
            sonTohumlanmaTarihi: '-',
            tahminiDogumTarihi: '-',
            anneBabaNo: 'TR423456788/TR423456787',
            sonAsiTarihi: '2023-07-20',
            asiTuru: 'Clostridial',
            kulanilanSperm: '-',
            hastalikGecmisi: [],
            kizginlikDonemi: '-',
            tirnakBakimZamani: '2023-10-15',
            genomikTest: 'Et kalitesi ve lezzet genleri pozitif',
            verim: '-',
            durum: 'Aktif Damızlık'
        }
    ]
};

const FarmAnimalsPage = () => {
    // State değişkenleri
    const [activeCategory, setActiveCategory] = useState('buyukbas');
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredAnimals, setFilteredAnimals] = useState(sampleData.buyukbas);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showDetailModal, setShowDetailModal] = useState(false);
    const [selectedAnimal, setSelectedAnimal] = useState(null);
    const [newAnimal, setNewAnimal] = useState({
        tur: '',
        irk: '',
        ad: '',
        kulakNumarasi: '',
        dogumTarihi: '',
        cinsiyet: 'Dişi',
        sonTohumlanmaTarihi: '',
        tahminiDogumTarihi: '',
        anneBabaNo: '',
        sonAsiTarihi: '',
        asiTuru: '',
        kulanilanSperm: '',
        hastalikGecmisi: [],
        kizginlikDonemi: '',
        tirnakBakimZamani: '',
        genomikTest: '',
        verim: '',
        durum: 'Aktif'
    });

    // Kategori değişikliğini ele al
    const handleCategoryChange = (category) => {
        setActiveCategory(category);
        setFilteredAnimals(sampleData[category]);
        setSearchTerm('');
    };

    // Arama fonksiyonu
    const handleSearch = (e) => {
        const term = e.target.value.toLowerCase();
        setSearchTerm(term);

        if (term.trim() === '') {
            setFilteredAnimals(sampleData[activeCategory]);
        } else {
            const filtered = sampleData[activeCategory].filter(animal =>
                animal.ad.toLowerCase().includes(term) ||
                animal.kulakNumarasi.toLowerCase().includes(term) ||
                animal.irk.toLowerCase().includes(term) ||
                animal.tur.toLowerCase().includes(term)
            );
            setFilteredAnimals(filtered);
        }
    };

    // Yeni kayıt ekleme yönlendirmesi
    const handleNewRecordRedirect = () => {
        // Kullanıcıya onay mesajı göster
        const confirmResult = window.confirm("Yeni hayvan kaydı oluşturmak istediğinize emin misiniz?");
        
        // Kullanıcı "Evet" derse modal'ı aç
        if (confirmResult) {
            setShowAddModal(true);
            // Arama terimini yeni hayvan adına ön değer olarak ata
            setNewAnimal(prev => ({
                ...prev,
                ad: searchTerm
            }));
        }
    };

    // Form değişikliklerini ele al
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewAnimal(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // Yeni hayvan ekle
    const handleAddAnimal = (e) => {
        e.preventDefault();

        // Gerçek uygulamada API'ye POST isteği yapılacak
        // Şimdilik sadece mevcut verilere ekliyoruz
        const newId = Date.now(); // Benzersiz ID oluştur
        const animalToAdd = {
            ...newAnimal,
            id: newId,
            hastalikGecmisi: [] // Başlangıçta boş hastalık geçmişi
        };

        // Varsayılan değerleri doldur
        if (!animalToAdd.sonTohumlanmaTarihi && animalToAdd.cinsiyet === 'Erkek') {
            animalToAdd.sonTohumlanmaTarihi = '-';
        }
        if (!animalToAdd.tahminiDogumTarihi && animalToAdd.cinsiyet === 'Erkek') {
            animalToAdd.tahminiDogumTarihi = '-';
        }
        if (!animalToAdd.kizginlikDonemi && animalToAdd.cinsiyet === 'Erkek') {
            animalToAdd.kizginlikDonemi = '-';
        }
        if (!animalToAdd.kulanilanSperm && animalToAdd.cinsiyet === 'Erkek') {
            animalToAdd.kulanilanSperm = '-';
        }

        // Mock veriyi güncelle
        sampleData[activeCategory] = [...sampleData[activeCategory], animalToAdd];

        // Filtrelenmiş listeyi güncelle
        setFilteredAnimals([...sampleData[activeCategory]]);

        // Formu sıfırla ve modalı kapat
        setNewAnimal({
            tur: '',
            irk: '',
            ad: '',
            kulakNumarasi: '',
            dogumTarihi: '',
            cinsiyet: 'Dişi',
            sonTohumlanmaTarihi: '',
            tahminiDogumTarihi: '',
            anneBabaNo: '',
            sonAsiTarihi: '',
            asiTuru: '',
            kulanilanSperm: '',
            hastalikGecmisi: [],
            kizginlikDonemi: '',
            tirnakBakimZamani: '',
            genomikTest: '',
            verim: '',
            durum: 'Aktif'
        });

        alert(`${animalToAdd.ad} adlı ${animalToAdd.tur} başarıyla eklenmiştir.`);
        setShowAddModal(false);
    };

    // Detay butonuna basıldığında
    const handleViewDetail = (animal) => {
        setSelectedAnimal(animal);
        setShowDetailModal(true);
    };

    return (
        <>
            <NavBar />
            <div className="farm-animals-page">
                <div className="page-header">
                    <h1>Çiftlik Hayvanları Yönetimi</h1>
                    <div className="header-actions">
                        <div className="search-container">
                            <input
                                type="text"
                                placeholder="Hayvan ara..."
                                value={searchTerm}
                                onChange={handleSearch}
                                className="search-input"
                            />
                            <button className="search-button">
                                <i className="fas fa-search"></i> Ara
                            </button>
                        </div>
                        <button
                            className="add-animal-button"
                            onClick={() => setShowAddModal(true)}
                        >
                            <i className="fas fa-plus"></i> Yeni Hayvan Ekle
                        </button>
                    </div>
                </div>

                <div className="category-tabs">
                    <button
                        className={`category-tab ${activeCategory === 'buyukbas' ? 'active' : ''}`}
                        onClick={() => handleCategoryChange('buyukbas')}
                    >
                        Büyükbaş Hayvanlar
                    </button>
                    <button
                        className={`category-tab ${activeCategory === 'kucukbas' ? 'active' : ''}`}
                        onClick={() => handleCategoryChange('kucukbas')}
                    >
                        Küçükbaş Hayvanlar
                    </button>
                </div>

                <div className="animals-table-container">
                    <table className="animals-table">
                        <thead>
                            <tr>
                                <th>Tür/Irk</th>
                                <th>Kulak No/Ad</th>
                                <th>Doğum Tarihi</th>
                                <th>Cinsiyet</th>
                                <th>Son Tohumlama</th>
                                <th>Tahmini Doğum</th>
                                <th>Son Aşı</th>
                                <th>Hastalık Geçmişi</th>
                                <th>Genomik Test</th>
                                <th>Durum</th>
                                <th>İşlemler</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredAnimals.length > 0 ? (
                                filteredAnimals.map(animal => (
                                    <tr key={animal.id}>
                                        <td>
                                            <div className="animal-type-breed">
                                                <span className="animal-type">{animal.tur}</span>
                                                <span className="animal-breed">{animal.irk}</span>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="animal-id-name">
                                                <span className="animal-id">{animal.kulakNumarasi}</span>
                                                <span className="animal-name">{animal.ad}</span>
                                            </div>
                                        </td>
                                        <td>{animal.dogumTarihi}</td>
                                        <td>{animal.cinsiyet}</td>
                                        <td>{animal.sonTohumlanmaTarihi}</td>
                                        <td>{animal.tahminiDogumTarihi}</td>
                                        <td>
                                            <div className="vaccination-info">
                                                <span>{animal.sonAsiTarihi}</span>
                                                <span className="vaccination-type">{animal.asiTuru}</span>
                                            </div>
                                        </td>
                                        <td>
                                            {animal.hastalikGecmisi.length === 0 ? (
                                                <span className="no-history">Yok</span>
                                            ) : (
                                                <div className="disease-history">
                                                    <span className="disease-count">{animal.hastalikGecmisi.length} kayıt</span>
                                                    <button
                                                        className="view-details-btn"
                                                        onClick={() => handleViewDetail(animal)}
                                                    >
                                                        Detay
                                                    </button>
                                                </div>
                                            )}
                                        </td>
                                        <td>
                                            <div className="genomic-test">
                                                {animal.genomikTest.length > 20
                                                    ? animal.genomikTest.substring(0, 20) + '...'
                                                    : animal.genomikTest}
                                                <button
                                                    className="view-details-btn"
                                                    onClick={() => handleViewDetail(animal)}
                                                >
                                                    Detay
                                                </button>
                                            </div>
                                        </td>
                                        <td>
                                            <span className={`status-badge ${animal.durum.toLowerCase().replace(/\s+/g, '-')}`}>
                                                {animal.durum}
                                            </span>
                                        </td>
                                        <td>
                                            <div className="action-buttons">
                                                <button className="edit-btn">
                                                    <i className="fas fa-edit"></i>
                                                </button>
                                                <button
                                                    className="view-btn"
                                                    onClick={() => handleViewDetail(animal)}
                                                >
                                                    <i className="fas fa-eye"></i>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="11" className="no-results">
                                        <div className="no-results-container">
                                            <p>"{searchTerm}" için uygun hayvan kaydı bulunamadı.</p>
                                            <button
                                                className="new-record-btn"
                                                onClick={handleNewRecordRedirect}
                                            >
                                                Yeni hayvan kaydı oluşturmak ister misiniz?
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Yeni Hayvan Ekleme Modal */}
                {showAddModal && (
                    <div className="modal-overlay" onClick={(e) => {
                        if (e.target.className === 'modal-overlay') {
                            setShowAddModal(false);
                        }
                    }}>
                        <div className="modal-content">
                            <div className="modal-header">
                                <h2>Yeni {activeCategory === 'buyukbas' ? 'Büyükbaş' : 'Küçükbaş'} Hayvan Ekle</h2>
                                <button
                                    className="close-modal-button"
                                    onClick={() => setShowAddModal(false)}
                                >
                                    &times;
                                </button>
                            </div>

                            <form onSubmit={handleAddAnimal} className="add-animal-form">
                                <div className="form-grid">
                                    <div className="form-group">
                                        <label htmlFor="tur">Tür</label>
                                        <input
                                            type="text"
                                            id="tur"
                                            name="tur"
                                            required
                                            value={newAnimal.tur}
                                            onChange={handleInputChange}
                                            placeholder={activeCategory === 'buyukbas' ? 'İnek, Boğa, At, vb.' : 'Koyun, Keçi, vb.'}
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="irk">Irk</label>
                                        <input
                                            type="text"
                                            id="irk"
                                            name="irk"
                                            required
                                            value={newAnimal.irk}
                                            onChange={handleInputChange}
                                            placeholder={activeCategory === 'buyukbas' ? 'Holstein, Simental, vb.' : 'Merinos, Kıvırcık, vb.'}
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="ad">Ad</label>
                                        <input
                                            type="text"
                                            id="ad"
                                            name="ad"
                                            required
                                            value={newAnimal.ad}
                                            onChange={handleInputChange}
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="kulakNumarasi">Kulak Numarası</label>
                                        <input
                                            type="text"
                                            id="kulakNumarasi"
                                            name="kulakNumarasi"
                                            required
                                            value={newAnimal.kulakNumarasi}
                                            onChange={handleInputChange}
                                            placeholder="TR12345678"
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="dogumTarihi">Doğum Tarihi</label>
                                        <input
                                            type="date"
                                            id="dogumTarihi"
                                            name="dogumTarihi"
                                            required
                                            value={newAnimal.dogumTarihi}
                                            onChange={handleInputChange}
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="cinsiyet">Cinsiyet</label>
                                        <select
                                            id="cinsiyet"
                                            name="cinsiyet"
                                            required
                                            value={newAnimal.cinsiyet}
                                            onChange={handleInputChange}
                                        >
                                            <option value="Dişi">Dişi</option>
                                            <option value="Erkek">Erkek</option>
                                        </select>
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="sonTohumlanmaTarihi">Son Tohumlama Tarihi</label>
                                        <input
                                            type="date"
                                            id="sonTohumlanmaTarihi"
                                            name="sonTohumlanmaTarihi"
                                            value={newAnimal.sonTohumlanmaTarihi}
                                            onChange={handleInputChange}
                                            disabled={newAnimal.cinsiyet === 'Erkek'}
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="tahminiDogumTarihi">Tahmini Doğum Tarihi</label>
                                        <input
                                            type="date"
                                            id="tahminiDogumTarihi"
                                            name="tahminiDogumTarihi"
                                            value={newAnimal.tahminiDogumTarihi}
                                            onChange={handleInputChange}
                                            disabled={newAnimal.cinsiyet === 'Erkek'}
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="anneBabaNo">Anne/Baba No</label>
                                        <input
                                            type="text"
                                            id="anneBabaNo"
                                            name="anneBabaNo"
                                            value={newAnimal.anneBabaNo}
                                            onChange={handleInputChange}
                                            placeholder="TR12345678/TR87654321"
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="sonAsiTarihi">Son Aşı Tarihi</label>
                                        <input
                                            type="date"
                                            id="sonAsiTarihi"
                                            name="sonAsiTarihi"
                                            value={newAnimal.sonAsiTarihi}
                                            onChange={handleInputChange}
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="asiTuru">Aşı Türü</label>
                                        <input
                                            type="text"
                                            id="asiTuru"
                                            name="asiTuru"
                                            value={newAnimal.asiTuru}
                                            onChange={handleInputChange}
                                            placeholder={activeCategory === 'buyukbas' ? 'Şap Aşısı, vb.' : 'Clostridial, PPR, vb.'}
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="kulanilanSperm">Kullanılan Sperm</label>
                                        <input
                                            type="text"
                                            id="kulanilanSperm"
                                            name="kulanilanSperm"
                                            value={newAnimal.kulanilanSperm}
                                            onChange={handleInputChange}
                                            disabled={newAnimal.cinsiyet === 'Erkek'}
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="kizginlikDonemi">Kızgınlık Dönemi</label>
                                        <input
                                            type="date"
                                            id="kizginlikDonemi"
                                            name="kizginlikDonemi"
                                            value={newAnimal.kizginlikDonemi}
                                            onChange={handleInputChange}
                                            disabled={newAnimal.cinsiyet === 'Erkek'}
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="tirnakBakimZamani">Tırnak Bakım Zamanı</label>
                                        <input
                                            type="date"
                                            id="tirnakBakimZamani"
                                            name="tirnakBakimZamani"
                                            value={newAnimal.tirnakBakimZamani}
                                            onChange={handleInputChange}
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="genomikTest">Genomik Test Sonucu</label>
                                        <textarea
                                            id="genomikTest"
                                            name="genomikTest"
                                            value={newAnimal.genomikTest}
                                            onChange={handleInputChange}
                                            rows="2"
                                        ></textarea>
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="verim">Verim</label>
                                        <input
                                            type="text"
                                            id="verim"
                                            name="verim"
                                            value={newAnimal.verim}
                                            onChange={handleInputChange}
                                            placeholder={activeCategory === 'buyukbas' ? '25 litre/gün' : '4 kg yün/yıl'}
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="durum">Durum</label>
                                        <select
                                            id="durum"
                                            name="durum"
                                            required
                                            value={newAnimal.durum}
                                            onChange={handleInputChange}
                                        >
                                            <option value="Aktif">Aktif</option>
                                            <option value="Gebe">Gebe</option>
                                            <option value="Aktif Damızlık">Aktif Damızlık</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="form-actions">
                                    <button
                                        type="button"
                                        className="cancel-button"
                                        onClick={() => setShowAddModal(false)}
                                    >
                                        İptal
                                    </button>
                                    <button type="submit" className="submit-button">
                                        Kaydet
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

                {/* Hayvan Detay Modal */}
                {showDetailModal && selectedAnimal && (
                    <div className="modal-overlay" onClick={(e) => {
                        if (e.target.className === 'modal-overlay') {
                            setShowDetailModal(false);
                        }
                    }}>
                        <div className="modal-content detail-modal">
                            <div className="modal-header">
                                <h2>{selectedAnimal.ad} - {selectedAnimal.kulakNumarasi}</h2>
                                <button
                                    className="close-modal-button"
                                    onClick={() => setShowDetailModal(false)}
                                >
                                    &times;
                                </button>
                            </div>

                            <div className="animal-detail-content">
                                <div className="detail-section">
                                    <h3>Temel Bilgiler</h3>
                                    <div className="detail-grid">
                                        <div className="detail-item">
                                            <span className="detail-label">Tür:</span>
                                            <span className="detail-value">{selectedAnimal.tur}</span>
                                        </div>
                                        <div className="detail-item">
                                            <span className="detail-label">Irk:</span>
                                            <span className="detail-value">{selectedAnimal.irk}</span>
                                        </div>
                                        <div className="detail-item">
                                            <span className="detail-label">Cinsiyet:</span>
                                            <span className="detail-value">{selectedAnimal.cinsiyet}</span>
                                        </div>
                                        <div className="detail-item">
                                            <span className="detail-label">Doğum Tarihi:</span>
                                            <span className="detail-value">{selectedAnimal.dogumTarihi}</span>
                                        </div>
                                        <div className="detail-item">
                                            <span className="detail-label">Anne/Baba No:</span>
                                            <span className="detail-value">{selectedAnimal.anneBabaNo || '-'}</span>
                                        </div>
                                        <div className="detail-item">
                                            <span className="detail-label">Durum:</span>
                                            <span className={`status-badge ${selectedAnimal.durum.toLowerCase().replace(/\s+/g, '-')}`}>
                                                {selectedAnimal.durum}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="detail-section">
                                    <h3>Üreme Bilgileri</h3>
                                    <div className="detail-grid">
                                        <div className="detail-item">
                                            <span className="detail-label">Son Tohumlama:</span>
                                            <span className="detail-value">{selectedAnimal.sonTohumlanmaTarihi || '-'}</span>
                                        </div>
                                        <div className="detail-item">
                                            <span className="detail-label">Tahmini Doğum:</span>
                                            <span className="detail-value">{selectedAnimal.tahminiDogumTarihi || '-'}</span>
                                        </div>
                                        <div className="detail-item">
                                            <span className="detail-label">Kızgınlık Dönemi:</span>
                                            <span className="detail-value">{selectedAnimal.kizginlikDonemi || '-'}</span>
                                        </div>
                                        <div className="detail-item">
                                            <span className="detail-label">Kullanılan Sperm:</span>
                                            <span className="detail-value">{selectedAnimal.kulanilanSperm || '-'}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="detail-section">
                                    <h3>Sağlık Bilgileri</h3>
                                    <div className="detail-grid">
                                        <div className="detail-item">
                                            <span className="detail-label">Son Aşı Tarihi:</span>
                                            <span className="detail-value">{selectedAnimal.sonAsiTarihi || '-'}</span>
                                        </div>
                                        <div className="detail-item">
                                            <span className="detail-label">Aşı Türü:</span>
                                            <span className="detail-value">{selectedAnimal.asiTuru || '-'}</span>
                                        </div>
                                        <div className="detail-item">
                                            <span className="detail-label">Tırnak Bakım Zamanı:</span>
                                            <span className="detail-value">{selectedAnimal.tirnakBakimZamani || '-'}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="detail-section">
                                    <h3>Hastalık Geçmişi</h3>
                                    {selectedAnimal.hastalikGecmisi && selectedAnimal.hastalikGecmisi.length > 0 ? (
                                        <ul className="disease-history-list">
                                            {selectedAnimal.hastalikGecmisi.map((disease, index) => (
                                                <li key={index} className="disease-item">{disease}</li>
                                            ))}
                                        </ul>
                                    ) : (
                                        <p className="no-data">Hastalık geçmişi bulunmamaktadır.</p>
                                    )}
                                </div>

                                <div className="detail-section">
                                    <h3>Genomik Test Sonucu</h3>
                                    <p className="genomic-test-result">{selectedAnimal.genomikTest || 'Genomik test sonucu bulunmamaktadır.'}</p>
                                </div>

                                <div className="detail-section">
                                    <h3>Verim Bilgisi</h3>
                                    <p className="yield-info">{selectedAnimal.verim || 'Verim bilgisi bulunmamaktadır.'}</p>
                                </div>
                            </div>

                            <div className="modal-footer">
                                <button
                                    className="cancel-button"
                                    onClick={() => setShowDetailModal(false)}
                                >
                                    Kapat
                                </button>
                                <button className="edit-detail-button">
                                    <i className="fas fa-edit"></i> Düzenle
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default FarmAnimalsPage; 