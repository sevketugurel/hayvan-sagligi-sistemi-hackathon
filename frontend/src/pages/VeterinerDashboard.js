import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/VeterinerDashboard.css';


const VeterinerDashboard = () => {
    // Auth context'ten logout fonksiyonunu alıyoruz
    const { logout } = useAuth();
    const navigate = useNavigate();

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

    return (
        <div className="veteriner-dashboard">
            {/* Header */}
            <div className="dashboard-header">
                <div className="header-box vet-info-box">
                    <div className="vet-info-content">
                        <p className="vet-name">{veteriner.ad} {veteriner.soyad}</p>
                        <p className="vet-title">{veteriner.unvan}</p>
                        <p className="vet-id">Sicil No: {veteriner.sicilNo}</p>
                    </div>
                    <button className="logout-button" onClick={handleLogout}>
                        Çıkış Yap
                    </button>
                </div>

                <div className="header-box clinic-title-box">
                    <p className="clinic-title">Dostlar Veteriner Kliniği</p>
                </div>

                <div className="header-box location-weather-box">
                    <p className="location">İstanbul 25 °C</p>
                    <p className="weather">Güneşli</p>
                </div>
            </div>

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

                {/* Orta Panel - Arama */}
                <div className="panel center-panel">
                    <h2>Arama</h2>
                    <div className="search-options">
                        <button className="search-option active">Çip/Küpe No</button>
                        <button className="search-option">TC No</button>
                        <button className="search-option">Ad Soyad</button>
                    </div>

                    <div className="search-bar">
                        <input type="text" placeholder="Arama yapın..." />
                        <button className="search-button">Ara</button>
                    </div>

                    <div className="appointments-section">
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
    );
};

export default VeterinerDashboard;
