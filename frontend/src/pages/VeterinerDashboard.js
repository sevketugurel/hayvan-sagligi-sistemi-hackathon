import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/VeterinerDashboard.css';
import NavBar from '../components/NavBar';

const VeterinerDashboard = () => {
    // Auth context'ten logout fonksiyonunu alıyoruz
    const { logout } = useAuth();
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');
    const [searchType, setSearchType] = useState('chipNo'); // chipNo, tcNo, ownerName, animalName
    const [searchResults, setSearchResults] = useState(null);

    // Çıkış işlemini gerçekleştirecek fonksiyon
    const handleLogout = () => {
        logout();  // Auth context'teki logout fonksiyonunu çağır
        navigate('/login');  // Login sayfasına yönlendir
    };

    const veteriner = {
        ad: 'Ahmet',
        soyad: 'Yılmaz',
        unvan: 'Uzman Veteriner Hekim',
        sicilNo: 'VET-12345'
    };

    // Kullanıcı adı ve mesaj state'leri ekliyoruz
    const [currentUser, setCurrentUser] = useState("Dr. Ahmet Yılmaz");
    const [newMessage, setNewMessage] = useState("");

    // Mesajlar state'i
    const [messages, setMessages] = useState([
        { id: 1, sender: "Dr. Ahmet Yılmaz", text: "Merhaba, yeni bir vaka hakkında danışmak istiyorum.", isCurrentUser: true },
        { id: 2, sender: "Dr. Ayşe Demir", text: "Tabi, hangi tür vaka?", isCurrentUser: false },
        { id: 3, sender: "Dr. Ahmet Yılmaz", text: "4 yaşında bir golden retriever, son birkaç gündür iştahsız ve halsiz. Kan tahlillerinde bazı değerler yüksek çıktı.", isCurrentUser: true },
        { id: 4, sender: "Dr. Ayşe Demir", text: "Hangi değerler yüksek? Karaciğer enzimleri mi?", isCurrentUser: false },
        { id: 5, sender: "Dr. Ahmet Yılmaz", text: "Evet, ALT ve ALP değerleri normalin çok üzerinde. Ayrıca lökosit sayısı da artmış durumda.", isCurrentUser: true },
        { id: 6, sender: "Dr. Ayşe Demir", text: "Ultrason yaptınız mı? Karaciğerde bir problem olabilir.", isCurrentUser: false },
        { id: 7, sender: "Dr. Ahmet Yılmaz", text: "Hayır, henüz yapmadım. Yarın sabah planlıyordum. Sizce hepatit olabilir mi?", isCurrentUser: true },
        { id: 8, sender: "Dr. Ayşe Demir", text: "Olabilir, ancak leptospiroz da olabilir. Son zamanlarda temas ettiği diğer hayvanlar var mı?", isCurrentUser: false },
        { id: 9, sender: "Dr. Ahmet Yılmaz", text: "Sahibi birkaç gün önce parkta başka köpeklerle oynamasına izin verdiğini söyledi. Leptospiroz için test yapmalıyım.", isCurrentUser: true },
        { id: 10, sender: "Dr. Ayşe Demir", text: "İyi olur. Ayrıca, tedavi olarak antibiyotik başlatmayı ve destekleyici sıvı tedavisi vermeyi düşünebilirsiniz.", isCurrentUser: false },
    ]);

    // Özel sohbet modu state'i
    const [privateMode, setPrivateMode] = useState(false);

    // Özel sohbet mesajları veritabanı
    const [chatDatabase, setChatDatabase] = useState({
        1: [ // Dr. Ayşe Demir ile olan sohbet
            { id: 1, sender: "Dr. Ahmet Yılmaz", text: "Merhaba, konsültasyon rica ediyorum.", timestamp: "14:30", isCurrentUser: true },
            { id: 2, sender: "Dr. Ayşe Demir", text: "Tabi, hangi hasta için?", timestamp: "14:35", isCurrentUser: false },
        ]
    });

    // Özel sohbet için state'ler
    const [selectedRegion, setSelectedRegion] = useState('Tüm İller');
    const [activeChat, setActiveChat] = useState(null);
    const [activeChatMessages, setActiveChatMessages] = useState([]);
    const [privateChatNewMessage, setPrivateChatNewMessage] = useState("");

    // Son konuşulan kişiler listesi
    const [recentChats, setRecentChats] = useState([
        { id: 1, name: 'Dr. Ayşe Demir', specialty: 'Oftalmoloji', clinic: 'Göz Veteriner Merkezi', location: 'Antalya', status: 'online', lastMessage: 'Tabi...', timestamp: '14:35', unread: 0 }
    ]);

    // Bölgesel veteriner listesi
    const [regionalVets, setRegionalVets] = useState([
        { id: 101, name: 'Dr. Baran Demir', specialty: 'Ortopedi', clinic: 'Sağlıklı Patiler', location: 'İstanbul', status: 'online' },
        { id: 102, name: 'Dr. Deniz Yılmaz', specialty: 'Kardiyoloji', clinic: 'Kalp Veteriner Merkezi', location: 'Ankara', status: 'offline' },
        { id: 103, name: 'Dr. Selin Çelik', specialty: 'Dermatoloji', clinic: 'Dost Veteriner Kliniği', location: 'Ankara', status: 'online' },
    ]);

    // İl listesi
    const cities = ['Tüm İller', 'Adana', 'Ankara', 'Antalya', 'Bursa', 'İstanbul', 'İzmir', 'Konya', 'Trabzon', 'Van'];

    // Filtrelenmiş veteriner listesi
    const filteredVets = selectedRegion === 'Tüm İller'
        ? regionalVets
        : regionalVets.filter(vet => vet.location === selectedRegion);

    // Mesaj listesi referansı - otomatik kaydırma için
    const messageListRef = useRef(null);
    const privateChatMessagesRef = useRef(null);

    // Yeni state ekleyelim - geçici sohbetler için
    const [tempActiveChat, setTempActiveChat] = useState(null);
    const [tempActiveChatInfo, setTempActiveChatInfo] = useState(null);

    // Gelecek randevular için eklenen örnek veri
    const [upcomingAppointments, setUpcomingAppointments] = useState([
        {
            id: 1,
            date: "15.05.2023",
            time: "14:30",
            ownerName: "Ahmet Kaya",
            petName: "Boncuk",
            petType: "Kedi",
            chipNumber: "900124001234567",
            reason: "Yıllık Kontrol"
        },
        {
            id: 2,
            date: "16.05.2023",
            time: "10:15",
            ownerName: "Mehmet Yılmaz",
            petName: "Max",
            petType: "Köpek",
            chipNumber: "900124001234890",
            reason: "Kuduz Aşısı"
        },
        {
            id: 3,
            date: "17.05.2023",
            time: "16:45",
            ownerName: "Ayşe Demir",
            petName: "Pamuk",
            petType: "Kedi",
            chipNumber: "900124001235612",
            reason: "Karma Aşı"
        },
        {
            id: 4,
            date: "20.05.2023",
            time: "09:00",
            ownerName: "Elif Yıldız",
            petName: "Karabaş",
            petType: "Köpek",
            chipNumber: "900124001237845",
            reason: "Parazit Tedavisi"
        },
    ]);

    // Özel sohbet başlatma veya var olan sohbeti açma
    const startOrOpenChat = (vet) => {
        // Daha önce sohbet edilmiş mi kontrol et
        const existingChat = recentChats.find(chat => chat.name === vet.name);

        if (existingChat) {
            // Var olan sohbeti aç
            setActiveChat(existingChat.id);
            setActiveChatMessages(chatDatabase[existingChat.id] || []);
        } else {
            // Geçici sohbet oluştur
            const newChatId = Date.now(); // Benzersiz ID

            // Geçici sohbet bilgilerini sakla
            setTempActiveChat(newChatId);
            setTempActiveChatInfo({
                id: newChatId,
                name: vet.name,
                specialty: vet.specialty,
                clinic: vet.clinic,
                location: vet.location,
                status: vet.status
            });

            // Aktif sohbeti ayarla
            setActiveChat(newChatId);
            setActiveChatMessages([]);
        }
    };

    // Özel sohbette mesaj gönderme
    const sendPrivateMessage = () => {
        if (!privateChatNewMessage.trim() || !activeChat) return;

        // Yeni mesaj objesi
        const newMsg = {
            id: activeChatMessages.length + 1,
            sender: "Dr. Ahmet Yılmaz",
            text: privateChatNewMessage,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            isCurrentUser: true
        };

        // Aktivite mesajlarını güncelle
        const updatedMessages = [...activeChatMessages, newMsg];
        setActiveChatMessages(updatedMessages);

        // Veritabanını güncelle
        setChatDatabase(prev => ({
            ...prev,
            [activeChat]: updatedMessages
        }));

        // Eğer geçici sohbet ise ve ilk mesaj gönderiliyorsa, son sohbetlere ekle
        if (tempActiveChat === activeChat) {
            const newChat = {
                ...tempActiveChatInfo,
                lastMessage: privateChatNewMessage.length > 15
                    ? privateChatNewMessage.substring(0, 15) + '...'
                    : privateChatNewMessage,
                timestamp: 'Şimdi',
                unread: 0
            };

            setRecentChats([newChat, ...recentChats]);
            setTempActiveChat(null);
            setTempActiveChatInfo(null);
        } else {
            // Son sohbetleri güncelle
            setRecentChats(prev =>
                prev.map(chat =>
                    chat.id === activeChat
                        ? {
                            ...chat,
                            lastMessage: privateChatNewMessage.length > 15
                                ? privateChatNewMessage.substring(0, 15) + '...'
                                : privateChatNewMessage,
                            timestamp: 'Şimdi'
                        }
                        : chat
                )
            );
        }

        // Input alanını temizle
        setPrivateChatNewMessage("");
    };

    // Enter tuşu ile mesaj gönderme
    const handlePrivateKeyPress = (e) => {
        if (e.key === 'Enter') {
            sendPrivateMessage();
        }
    };

    // Normal sohbet mesaj gönderme
    const handleSendMessage = () => {
        if (newMessage.trim() === "") return;

        const newMsg = {
            id: messages.length + 1,
            sender: "Dr. Ahmet Yılmaz",
            text: newMessage,
            isCurrentUser: true,
        };

        setMessages([...messages, newMsg]);
        setNewMessage("");
    };

    // Enter tuşuna basınca mesaj gönderme
    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSendMessage();
        }
    };

    // Aktif sohbet değiştiğinde mesajları güncelle
    useEffect(() => {
        if (activeChat) {
            setActiveChatMessages(chatDatabase[activeChat] || []);
        }
    }, [activeChat, chatDatabase]);

    // Sohbette yeni mesaj olduğunda otomatik kaydırma
    useEffect(() => {
        if (messageListRef.current) {
            messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
        }

        if (privateChatMessagesRef.current) {
            privateChatMessagesRef.current.scrollTop = privateChatMessagesRef.current.scrollHeight;
        }
    }, [messages, activeChatMessages]);

    // Sohbet görünümüne dönme
    const backToVetList = () => {
        // Eğer geçici bir sohbet ise ve mesaj gönderilmemişse, temizle
        if (tempActiveChat === activeChat) {
            setTempActiveChat(null);
            setTempActiveChatInfo(null);
        }

        setActiveChat(null);
    };

    // Özel sohbetten çıkma
    const closePrivateChat = () => {
        // Eğer geçici bir sohbet ise ve mesaj gönderilmemişse, temizle
        if (tempActiveChat === activeChat) {
            setTempActiveChat(null);
            setTempActiveChatInfo(null);
        }

        setPrivateMode(false);
        setActiveChat(null);
    };

    // Örnek veri - gerçek uygulamada API'den gelecek
    const sampleOwners = [
        {
            id: 1,
            name: 'Ahmet Yılmaz',
            tcNo: '12345678901',
            phone: '05551234567',
            email: 'ahmet.yilmaz@example.com',
            address: 'Atatürk Mah. Cumhuriyet Cad. No:123 Ankara',
            animals: [
                {
                    id: 101,
                    name: 'Max',
                    type: 'Köpek',
                    breed: 'Golden Retriever',
                    age: 3,
                    gender: 'Erkek',
                    chipNo: '123456789012345',
                    lastVisit: '12.05.2023'
                },
                {
                    id: 102,
                    name: 'Luna',
                    type: 'Kedi',
                    breed: 'British Shorthair',
                    age: 2,
                    gender: 'Dişi',
                    chipNo: '987654321098765',
                    lastVisit: '25.06.2023'
                }
            ]
        },
        {
            id: 2,
            name: 'Mehmet Demir',
            tcNo: '23456789012',
            phone: '05442345678',
            email: 'mehmet.demir@example.com',
            address: 'Bahçelievler Mah. İstiklal Cad. No:45 İstanbul',
            animals: [
                {
                    id: 201,
                    name: 'Karabaş',
                    type: 'Köpek',
                    breed: 'Kangal',
                    age: 5,
                    gender: 'Erkek',
                    chipNo: '234567890123456',
                    lastVisit: '05.04.2023'
                }
            ]
        },
        {
            id: 3,
            name: 'Ayşe Çelik',
            tcNo: '34567890123',
            phone: '05331234567',
            email: 'ayse.celik@example.com',
            address: 'Üniversite Mah. Cumhuriyet Cad. No:78 İzmir',
            animals: [
                {
                    id: 301,
                    name: 'Pamuk',
                    type: 'Kedi',
                    breed: 'Tekir',
                    age: 1,
                    gender: 'Dişi',
                    chipNo: '345678901234567',
                    lastVisit: '22.06.2023'
                },
                {
                    id: 302,
                    name: 'Limon',
                    type: 'Kuş',
                    breed: 'Muhabbet Kuşu',
                    age: 2,
                    gender: 'Erkek',
                    chipNo: '456789012345678',
                    lastVisit: '30.05.2023'
                },
                {
                    id: 303,
                    name: 'Boncuk',
                    type: 'Kedi',
                    breed: 'Siyam',
                    age: 3,
                    gender: 'Dişi',
                    chipNo: '567890123456789',
                    lastVisit: '15.06.2023'
                }
            ]
        }
    ];

    // Hayvan bilgilerini tutmak için yeni bir state ekliyoruz
    const [animalResults, setAnimalResults] = useState(null);

    // Arama işlemi fonksiyonunu güncelliyoruz
    const handleSearch = (e) => {
        e.preventDefault();

        if (!searchQuery.trim()) {
            alert('Lütfen bir arama kriteri girin');
            return;
        }

        // Sonuçları temizle
        setSearchResults(null);
        setAnimalResults(null);

        // Gerçek uygulamada bu kısım API çağrısı olacak
        let result = null;
        let animalResult = null;

        switch (searchType) {
            case 'chipNo':
                // Çip numarasına göre ara (TAM EŞLEŞME)
                const animalsWithChip = [];
                sampleOwners.forEach(owner => {
                    owner.animals.forEach(animal => {
                        if (animal.chipNo === searchQuery) { // includes() yerine === kullanıyoruz (tam eşleşme için)
                            animalsWithChip.push({
                                ...animal,
                                owner: {
                                    id: owner.id,
                                    name: owner.name,
                                    phone: owner.phone,
                                    email: owner.email,
                                    tcNo: owner.tcNo,
                                    address: owner.address
                                }
                            });
                        }
                    });
                });

                if (animalsWithChip.length > 0) {
                    animalResult = animalsWithChip[0]; // İlk eşleşen hayvanı al
                    setAnimalResults(animalResult);
                }
                break;

            case 'tcNo':
                // TC numarasına göre ara
                result = sampleOwners.find(owner =>
                    owner.tcNo.includes(searchQuery)
                );
                if (result) {
                    setSearchResults(result);
                }
                break;

            case 'ownerName':
                // Sahip adına göre ara
                result = sampleOwners.find(owner =>
                    owner.name.toLowerCase().includes(searchQuery.toLowerCase())
                );
                if (result) {
                    setSearchResults(result);
                }
                break;

            case 'animalName':
                // Hayvan adına göre ara (TAM EŞLEŞME)
                const animalsWithName = [];
                sampleOwners.forEach(owner => {
                    owner.animals.forEach(animal => {
                        if (animal.name.toLowerCase() === searchQuery.toLowerCase()) { // includes() yerine === kullanıyoruz (tam eşleşme için)
                            animalsWithName.push({
                                ...animal,
                                owner: {
                                    id: owner.id,
                                    name: owner.name,
                                    phone: owner.phone,
                                    email: owner.email,
                                    tcNo: owner.tcNo,
                                    address: owner.address
                                }
                            });
                        }
                    });
                });

                if (animalsWithName.length > 0) {
                    animalResult = animalsWithName[0]; // İlk eşleşen hayvanı al
                    setAnimalResults(animalResult);
                }
                break;

            default:
                result = null;
        }

        if (!result && !animalResult) {
            const searchTypeText = {
                'chipNo': 'çip numarasına',
                'tcNo': 'TC kimlik numarasına',
                'ownerName': 'sahip adına',
                'animalName': 'hayvan adına'
            };
            alert(`Girdiğiniz ${searchTypeText[searchType]} sahip kayıt bulunamadı!`);
        }
    };

    // İlk renderda arama kısmına odaklan
    const searchInputRef = useRef(null);
    useEffect(() => {
        if (searchInputRef.current) {
            searchInputRef.current.focus();
        }
    }, []);

    return (
        <div className="veteriner-dashboard-container">
            <NavBar />

            <div className="dashboard-content">
                {!searchResults && !animalResults ? (
                    <>
                        <div className="panels-container">
                            {/* İçerik Panelleri */}
                            <div className="panels-container">
                                {/* Sol Panel - Gelecek Randevular ve diğer bilgiler */}
                                <div className="panel left-panel">
                                    <div className="panel-section">
                                        <h2>Klinikte Kalan Hayvanlar</h2>
                                        <div className="scrollable-content">
                                            <div className="animal-item">
                                                <div className="animal-info">
                                                    <p>Pamuk (Kedi) - Oda 104</p>
                                                    <p className="animal-detail">İlaç Tedavisi</p>
                                                </div>
                                                <span className="status-color yellow"></span>
                                            </div>
                                            <div className="animal-item">
                                                <div className="animal-info">
                                                    <p>Max (Köpek) - Oda 105</p>
                                                    <p className="animal-detail">Yoğun Bakım</p>
                                                </div>
                                                <span className="status-color red"></span>
                                            </div>
                                            <div className="animal-item">
                                                <div className="animal-info">
                                                    <p>Boncuk (Kedi) - Oda 106</p>
                                                    <p className="animal-detail">Kısırlaştırma Sonrası</p>
                                                </div>
                                                <span className="status-color yellow"></span>
                                            </div>
                                            <div className="animal-item">
                                                <div className="animal-info">
                                                    <p>Karabaş (Köpek) - Oda 107</p>
                                                    <p className="animal-detail">Pansiyon</p>
                                                </div>
                                                <span className="status-color green"></span>
                                            </div>
                                            <div className="animal-item">
                                                <div className="animal-info">
                                                    <p>Minnoş (Kedi) - Oda 108</p>
                                                    <p className="animal-detail">Diş Tedavisi</p>
                                                </div>
                                                <span className="status-color yellow"></span>
                                            </div>
                                            <div className="status-footer">
                                                <span className="status-indicator-small yellow"></span>
                                                <span className="status-text">Tedavi Görenler</span>
                                                <span className="status-indicator-small green"></span>
                                                <span className="status-text">Pansiyon</span>
                                                <span className="status-indicator-small red"></span>
                                                <span className="status-text">Durumu Kritik Hastalar</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="panel-section">
                                        <h2>Hasta Geçmişi</h2>
                                        <div className="scrollable-content">
                                            <div className="item">
                                                <p>Pamuk - 12.05.2023 - Aşı</p>
                                            </div>
                                            <div className="item">
                                                <p>Duman - 11.05.2023 - Kontrol</p>
                                            </div>
                                            <div className="item">
                                                <p>Şanslı - 10.05.2023 - Tedavi</p>
                                            </div>
                                            <div className="item">
                                                <p>Max - 09.05.2023 - Kuduz Aşısı</p>
                                            </div>
                                            <div className="item">
                                                <p>Boncuk - 08.05.2023 - Kısırlaştırma</p>
                                            </div>
                                            <div className="item">
                                                <p>Pamuk - 05.05.2023 - Karma Aşı</p>
                                            </div>
                                            <div className="item">
                                                <p>Minnoş - 03.05.2023 - Diş Tedavisi</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Orta Panel - Arama ve Gelecek Randevular */}
                                <div className="panel center-panel">
                                    {/* Arama kutusunu buraya taşıyoruz */}
                                    <div className="center-search-section">
                                        <form onSubmit={handleSearch}>
                                            <div className="search-options">
                                                <button
                                                    type="button"
                                                    className={`search-option ${searchType === 'chipNo' ? 'active' : ''}`}
                                                    onClick={() => setSearchType('chipNo')}
                                                >
                                                    Çip/Küpe No
                                                </button>
                                                <button
                                                    type="button"
                                                    className={`search-option ${searchType === 'tcNo' ? 'active' : ''}`}
                                                    onClick={() => setSearchType('tcNo')}
                                                >
                                                    TC No
                                                </button>
                                                <button
                                                    type="button"
                                                    className={`search-option ${searchType === 'ownerName' ? 'active' : ''}`}
                                                    onClick={() => setSearchType('ownerName')}
                                                >
                                                    Ad Soyad
                                                </button>
                                                <button
                                                    type="button"
                                                    className={`search-option ${searchType === 'animalName' ? 'active' : ''}`}
                                                    onClick={() => setSearchType('animalName')}
                                                >
                                                    Hayvan Adı
                                                </button>
                                            </div>

                                            <div className="search-bar">
                                                <input
                                                    type="text"
                                                    placeholder={`${searchType === 'chipNo' ? 'Çip/Küpe numarasını girin...' :
                                                        searchType === 'tcNo' ? 'TC kimlik numarasını girin...' :
                                                            searchType === 'ownerName' ? 'Sahip adını girin...' :
                                                                'Hayvan adını girin...'
                                                        }`}
                                                    value={searchQuery}
                                                    onChange={(e) => setSearchQuery(e.target.value)}
                                                    ref={searchInputRef}
                                                />
                                                <button type="submit" className="search-button">Ara</button>
                                            </div>
                                        </form>
                                    </div>

                                    <h3>Gelecek Randevular</h3>
                                    <div className="appointments-list">
                                        {upcomingAppointments.map(appointment => (
                                            <div key={appointment.id} className="appointment-item">
                                                <div className="appointment-date">
                                                    <span className="date">{appointment.date}</span>
                                                    <span className="time">{appointment.time}</span>
                                                </div>
                                                <div className="appointment-info">
                                                    <p className="appointment-pet">{appointment.petName} ({appointment.petType})</p>
                                                    <p className="appointment-owner">Sahip: {appointment.ownerName}</p>
                                                    <p className="appointment-chip">Çip No: {appointment.chipNumber}</p>
                                                    <p className="appointment-reason">{appointment.reason}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Sağ Panel - Veteriner Sohbet */}
                                <div className="panel right-panel">
                                    {privateMode ? (
                                        /* Özel Sohbet Modu */
                                        <div className="private-chat-panel">
                                            <div className="private-chat-header">
                                                <h3>Özel Sohbet</h3>
                                                <button
                                                    className="close-private-chat"
                                                    onClick={closePrivateChat}
                                                >
                                                    ×
                                                </button>
                                            </div>

                                            <div className="private-chat-content">
                                                {activeChat ? (
                                                    /* Aktif Sohbet Ekranı */
                                                    <div className="active-chat-view">
                                                        <div className="active-chat-header">
                                                            <button className="back-button" onClick={backToVetList}>
                                                                &lt;
                                                            </button>
                                                            <div className="chat-partner-info">
                                                                <h4>{recentChats.find(c => c.id === activeChat)?.name}</h4>
                                                                <p>
                                                                    {recentChats.find(c => c.id === activeChat)?.clinic} - {recentChats.find(c => c.id === activeChat)?.location}
                                                                </p>
                                                            </div>
                                                        </div>

                                                        <div className="active-chat-messages" ref={privateChatMessagesRef}>
                                                            {activeChatMessages.length > 0 ? (
                                                                activeChatMessages.map(msg => (
                                                                    <div
                                                                        key={msg.id}
                                                                        className={`private-message ${msg.isCurrentUser ? 'current-user' : 'other-user'}`}
                                                                    >
                                                                        <div className="message-content">
                                                                            <p className="message-text">{msg.text}</p>
                                                                            <span className="message-time">{msg.timestamp}</span>
                                                                        </div>
                                                                    </div>
                                                                ))
                                                            ) : (
                                                                <div className="no-messages">
                                                                    <p>Henüz mesaj yok. Sohbeti başlatmak için bir mesaj gönderin.</p>
                                                                </div>
                                                            )}
                                                        </div>

                                                        <div className="active-chat-input">
                                                            <input
                                                                type="text"
                                                                placeholder="Mesajınızı yazın..."
                                                                value={privateChatNewMessage}
                                                                onChange={(e) => setPrivateChatNewMessage(e.target.value)}
                                                                onKeyPress={handlePrivateKeyPress}
                                                            />
                                                            <button onClick={sendPrivateMessage}>Gönder</button>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    /* Bölünmüş Görünüm */
                                                    <div className="split-view">
                                                        {/* Sol taraf - Son Sohbetler */}
                                                        <div className="split-left">
                                                            <div className="split-header">
                                                                <h4>Son Sohbetler</h4>
                                                            </div>
                                                            <div className="split-content">
                                                                {recentChats.length > 0 ? (
                                                                    recentChats.map(chat => (
                                                                        <div
                                                                            key={chat.id}
                                                                            className="chat-item"
                                                                            onClick={() => setActiveChat(chat.id)}
                                                                        >
                                                                            <div className="chat-avatar">
                                                                                {chat.name.charAt(0)}
                                                                                <span className={`status-indicator ${chat.status}`}></span>
                                                                            </div>
                                                                            <div className="chat-info">
                                                                                <div className="chat-name">{chat.name}</div>
                                                                                <div className="chat-message">{chat.lastMessage}</div>
                                                                                <div className="chat-details">
                                                                                    <div>{chat.clinic}</div>
                                                                                    <div>{chat.location}</div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    ))
                                                                ) : (
                                                                    <div className="empty-message">
                                                                        <p>Henüz aktif bir sohbet bulunmuyor.</p>
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </div>

                                                        {/* Sağ taraf - Bölgesel Veterinerler */}
                                                        <div className="split-right">
                                                            <div className="split-header with-select">
                                                                <h4>Bölgesel Veterinerler</h4>
                                                                <select
                                                                    value={selectedRegion}
                                                                    onChange={(e) => setSelectedRegion(e.target.value)}
                                                                    className="region-selector"
                                                                >
                                                                    {cities.map(city => (
                                                                        <option key={city} value={city}>{city}</option>
                                                                    ))}
                                                                </select>
                                                            </div>
                                                            <div className="split-content">
                                                                {filteredVets.map(vet => (
                                                                    <div
                                                                        key={vet.id}
                                                                        className="vet-item"
                                                                        onClick={() => startOrOpenChat(vet)}
                                                                    >
                                                                        <div className="vet-avatar">
                                                                            {vet.name.charAt(0)}
                                                                            <span className={`status-indicator ${vet.status}`}></span>
                                                                        </div>
                                                                        <div className="vet-info">
                                                                            <div className="vet-name">{vet.name}</div>
                                                                            <div className="vet-specialty">{vet.specialty}</div>
                                                                            <div className="vet-clinic">{vet.clinic}</div>
                                                                            <div className="vet-location">{vet.location}</div>
                                                                        </div>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    ) : (
                                        /* Normal Sohbet Modu */
                                        <>
                                            <h2>Veteriner Sohbet</h2>

                                            {/* Chat mesajları */}
                                            <div className="scrollable-content chat-messages" ref={messageListRef}>
                                                {messages.map(msg => (
                                                    <div
                                                        key={msg.id}
                                                        className={`chat-message ${msg.isCurrentUser ? 'current-user' : 'other-user'}`}
                                                    >
                                                        {/* Sadece diğer kullanıcıların mesajlarında gönderen adını göster */}
                                                        {!msg.isCurrentUser && <p className="sender">{msg.sender}</p>}

                                                        {/* Mesaj metni */}
                                                        <p className="message-text">{msg.text}</p>

                                                        {/* Mesaj zamanı */}
                                                        <span className="message-time">14:30</span>
                                                    </div>
                                                ))}
                                            </div>

                                            {/* Mesaj yazma alanı */}
                                            <div className="chat-input-container">
                                                <input
                                                    type="text"
                                                    placeholder="Mesajınızı yazın..."
                                                    className="chat-input"
                                                    value={newMessage}
                                                    onChange={(e) => setNewMessage(e.target.value)}
                                                    onKeyPress={handleKeyPress}
                                                />
                                                <button
                                                    className="send-button"
                                                    onClick={handleSendMessage}
                                                >
                                                    Gönder
                                                </button>
                                            </div>

                                            {/* Özel sohbet butonu */}
                                            <button
                                                className="private-chat-button"
                                                onClick={() => setPrivateMode(true)}
                                            >
                                                Özel Sohbet
                                            </button>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    </>
                ) : animalResults ? (
                    // Hayvan bilgileri görünümü
                    <div className="search-results-view">
                        <h2>Hayvan Bilgileri</h2>

                        <div className="animal-detail-card">
                            <div className="animal-header">
                                <h3>{animalResults.name}</h3>
                                <span className="animal-type">{animalResults.type}</span>
                            </div>

                            <div className="animal-detail-content">
                                <div className="animal-info-section">
                                    <h4>Hayvan Bilgileri</h4>
                                    <div className="info-grid">
                                        <div className="info-item">
                                            <span className="info-label">Irk:</span>
                                            <span>{animalResults.breed}</span>
                                        </div>
                                        <div className="info-item">
                                            <span className="info-label">Yaş:</span>
                                            <span>{animalResults.age}</span>
                                        </div>
                                        <div className="info-item">
                                            <span className="info-label">Cinsiyet:</span>
                                            <span>{animalResults.gender}</span>
                                        </div>
                                        <div className="info-item">
                                            <span className="info-label">Çip No:</span>
                                            <span>{animalResults.chipNo}</span>
                                        </div>
                                        <div className="info-item">
                                            <span className="info-label">Son Ziyaret:</span>
                                            <span>{animalResults.lastVisit}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="owner-info-section">
                                    <h4>Sahip Bilgileri</h4>
                                    <div className="info-grid">
                                        <div className="info-item">
                                            <span className="info-label">Ad Soyad:</span>
                                            <span>{animalResults.owner.name}</span>
                                        </div>
                                        <div className="info-item">
                                            <span className="info-label">Telefon:</span>
                                            <span>{animalResults.owner.phone}</span>
                                        </div>
                                        <div className="info-item">
                                            <span className="info-label">E-posta:</span>
                                            <span>{animalResults.owner.email}</span>
                                        </div>
                                        <div className="info-item">
                                            <span className="info-label">T.C. No:</span>
                                            <span>{animalResults.owner.tcNo}</span>
                                        </div>
                                        <div className="info-item">
                                            <span className="info-label">Adres:</span>
                                            <span>{animalResults.owner.address}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="animal-actions">
                                <button
                                    className="details-button"
                                    onClick={() => navigate(`/animal-details/${animalResults.id}`)}
                                >
                                    Detayları Görüntüle
                                </button>
                                <button
                                    className="back-button"
                                    onClick={() => setAnimalResults(null)}
                                >
                                    Geri Dön
                                </button>
                            </div>
                        </div>
                    </div>
                ) : (
                    // Sahip bilgileri görünümü
                    <div className="search-results-view">
                        <h2>{searchResults.name} - Hayvanları</h2>

                        <div className="owner-info-grid">
                            <div className="info-item">
                                <span className="info-label">Telefon:</span>
                                <span>{searchResults.phone}</span>
                            </div>
                            <div className="info-item">
                                <span className="info-label">E-posta:</span>
                                <span>{searchResults.email}</span>
                            </div>
                            <div className="info-item">
                                <span className="info-label">T.C. No:</span>
                                <span>{searchResults.tcNo}</span>
                            </div>
                            <div className="info-item">
                                <span className="info-label">Adres:</span>
                                <span>{searchResults.address}</span>
                            </div>
                        </div>

                        <h3>Hayvanlar</h3>
                        <div className="animals-grid">
                            {searchResults.animals.map(animal => (
                                <div key={animal.id} className="animal-card">
                                    <div className="animal-header">
                                        <h4>{animal.name}</h4>
                                        <span className="animal-type">{animal.type}</span>
                                    </div>

                                    <div className="animal-info">
                                        <div className="info-row">
                                            <span className="info-label">Irk:</span>
                                            <span>{animal.breed}</span>
                                        </div>
                                        <div className="info-row">
                                            <span className="info-label">Yaş:</span>
                                            <span>{animal.age}</span>
                                        </div>
                                        <div className="info-row">
                                            <span className="info-label">Cinsiyet:</span>
                                            <span>{animal.gender}</span>
                                        </div>
                                        <div className="info-row">
                                            <span className="info-label">Çip No:</span>
                                            <span>{animal.chipNo}</span>
                                        </div>
                                        <div className="info-row">
                                            <span className="info-label">Son Ziyaret:</span>
                                            <span>{animal.lastVisit}</span>
                                        </div>
                                    </div>

                                    <button
                                        className="details-button"
                                        onClick={() => navigate(`/animal-details/${animal.id}`)}
                                    >
                                        Detayları Görüntüle
                                    </button>
                                </div>
                            ))}
                        </div>

                        <button
                            className="back-button"
                            onClick={() => setSearchResults(null)}
                        >
                            Geri Dön
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default VeterinerDashboard;
