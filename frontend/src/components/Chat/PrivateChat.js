import React, { useState, useEffect } from 'react';

const PrivateChat = ({ onClose }) => {
    // Aktif sohbet state'i
    const [activeChat, setActiveChat] = useState(null);

    // Seçili il state'i
    const [selectedRegion, setSelectedRegion] = useState('Tüm İller');

    // Son konuşulan kişiler listesi
    const [recentChats, setRecentChats] = useState([
        { id: 1, name: 'Dr. Ayşe Demir', clinic: 'Patiler Veteriner Kliniği', location: 'İstanbul', lastMessage: 'Tabi, hangi tür vaka?', timestamp: '14:35', unread: 2 },
        { id: 2, name: 'Dr. Mehmet Yılmaz', clinic: 'Hayat Veteriner Kliniği', location: 'Ankara', lastMessage: 'Röntgen sonuçlarını gönderebilir misiniz?', timestamp: '12:20', unread: 0 },
        { id: 3, name: 'Dr. Zeynep Kaya', clinic: 'Dostlar Veteriner Kliniği', location: 'İzmir', lastMessage: 'Teşekkürler, yarın görüşmek üzere.', timestamp: 'Dün', unread: 0 },
        { id: 4, name: 'Dr. Ali Öztürk', clinic: 'Pati Veteriner Merkezi', location: 'Bursa', lastMessage: 'Antibiyotik tedavisine devam edilmeli.', timestamp: 'Dün', unread: 1 },
        { id: 5, name: 'Dr. Elif Yıldız', clinic: 'Sevimli Dostlar Kliniği', location: 'Antalya', lastMessage: 'Bu durum için en iyi seçenek cerrahi olabilir.', timestamp: '23.05', unread: 0 },
    ]);

    // Bölgesel veteriner listesi
    const [regionalVets, setRegionalVets] = useState([
        { id: 101, name: 'Dr. Canan Aksoy', specialty: 'Küçük Hayvan Cerrahisi', clinic: 'Merkez Veteriner Kliniği', location: 'İstanbul', status: 'online' },
        { id: 102, name: 'Dr. Baran Demir', specialty: 'Ortopedi', clinic: 'Sağlıklı Patiler', location: 'İstanbul', status: 'online' },
        { id: 103, name: 'Dr. Deniz Yılmaz', specialty: 'Kardiyoloji', clinic: 'Kalp Veteriner Merkezi', location: 'Ankara', status: 'offline' },
        { id: 104, name: 'Dr. Selin Çelik', specialty: 'Dermatoloji', clinic: 'Dost Veteriner Kliniği', location: 'İzmir', status: 'online' },
        { id: 105, name: 'Dr. Cem Kaya', specialty: 'Oftalmoloji', clinic: 'Göz Veteriner Merkezi', location: 'Antalya', status: 'offline' },
        { id: 106, name: 'Dr. Gül Şahin', specialty: 'Nöroloji', clinic: 'Sinir Veteriner Kliniği', location: 'Bursa', status: 'online' },
        { id: 107, name: 'Dr. Murat Öz', specialty: 'Onkoloji', clinic: 'Umut Veteriner Merkezi', location: 'Adana', status: 'offline' },
        { id: 108, name: 'Dr. Aylin Demir', specialty: 'Dahiliye', clinic: 'İç Hastalıklar Merkezi', location: 'Konya', status: 'online' },
    ]);

    // İl listesi
    const cities = ['Tüm İller', 'Adana', 'Ankara', 'Antalya', 'Bursa', 'İstanbul', 'İzmir', 'Konya', 'Trabzon', 'Van'];

    // Filtrelenmiş veteriner listesi
    const filteredVets = selectedRegion === 'Tüm İller'
        ? regionalVets
        : regionalVets.filter(vet => vet.location === selectedRegion);

    // Sohbet mesajları
    const [chatMessages, setChatMessages] = useState({});

    // Yeni mesaj girdisi
    const [newMessage, setNewMessage] = useState('');

    // Sohbet mesajlarını yükle
    useEffect(() => {
        // Gerçek uygulamada API'den çekilecek
        setChatMessages({
            1: [
                { id: 1, sender: 'Dr. Ahmet Yılmaz', text: 'Merhaba, yeni bir vaka hakkında danışmak istiyorum.', timestamp: '14:30', isCurrentUser: true },
                { id: 2, sender: 'Dr. Ayşe Demir', text: 'Tabi, hangi tür vaka?', timestamp: '14:35', isCurrentUser: false },
            ],
            2: [
                { id: 1, sender: 'Dr. Ahmet Yılmaz', text: 'İyi günler, bir köpekte kemik kırığı var.', timestamp: '12:15', isCurrentUser: true },
                { id: 2, sender: 'Dr. Mehmet Yılmaz', text: 'Röntgen sonuçlarını gönderebilir misiniz?', timestamp: '12:20', isCurrentUser: false },
            ],
        });
    }, []);

    // Mesaj gönderme işlevi
    const handleSendMessage = () => {
        if (!newMessage.trim() || !activeChat) return;

        // Yeni mesaj objesi
        const newMsg = {
            id: (chatMessages[activeChat] || []).length + 1,
            sender: 'Dr. Ahmet Yılmaz',
            text: newMessage,
            timestamp: new Date().toLocaleTimeString().substring(0, 5),
            isCurrentUser: true,
        };

        // Mesajları güncelle
        setChatMessages(prev => ({
            ...prev,
            [activeChat]: [...(prev[activeChat] || []), newMsg],
        }));

        // Son mesajları güncelle
        setRecentChats(prev =>
            prev.map(chat =>
                chat.id === activeChat
                    ? { ...chat, lastMessage: newMessage, timestamp: 'Şimdi', unread: 0 }
                    : chat
            ).sort((a, b) => (a.id === activeChat ? -1 : b.id === activeChat ? 1 : 0))
        );

        // Input alanını temizle
        setNewMessage('');
    };

    // Enter tuşuyla mesaj gönderme
    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSendMessage();
        }
    };

    // Yeni sohbet başlatma fonksiyonu
    const startNewChat = (vetId) => {
        // Seçilen veteriner
        const selectedVet = regionalVets.find(vet => vet.id === vetId);

        // Bu kişiyle daha önce sohbet edilmiş mi?
        const existingChat = recentChats.find(chat => chat.name === selectedVet.name);

        if (existingChat) {
            // Var olan sohbeti aktif yap
            setActiveChat(existingChat.id);
        } else {
            // Yeni sohbet oluştur
            const newChatId = Math.max(...recentChats.map(c => c.id)) + 1;

            // Son mesajlar listesine ekle
            setRecentChats([
                {
                    id: newChatId,
                    name: selectedVet.name,
                    clinic: selectedVet.clinic,
                    location: selectedVet.location,
                    lastMessage: 'Henüz mesaj yok',
                    timestamp: 'Şimdi',
                    unread: 0
                },
                ...recentChats
            ]);

            // Yeni sohbeti aktif yap
            setActiveChat(newChatId);

            // Boş bir sohbet başlat
            setChatMessages(prev => ({
                ...prev,
                [newChatId]: [],
            }));
        }
    };

    return (
        <div className="private-chat-container">
            <div className="private-chat-header">
                <h2>Özel Sohbet</h2>
                <button className="close-button" onClick={onClose}>✕</button>
            </div>

            <div className="private-chat-content">
                {/* Sol Panel - Son Sohbetler */}
                <div className="recent-chats-panel">
                    <div className="panel-header">
                        <h3>Son Sohbetler</h3>
                    </div>

                    <div className="chats-list">
                        {recentChats.map(chat => (
                            <div
                                key={chat.id}
                                className={`chat-item ${activeChat === chat.id ? 'active' : ''}`}
                                onClick={() => setActiveChat(chat.id)}
                            >
                                <div className="chat-avatar">
                                    {chat.name.charAt(0)}
                                </div>
                                <div className="chat-details">
                                    <div className="chat-header">
                                        <span className="chat-name">{chat.name}</span>
                                        <span className="chat-time">{chat.timestamp}</span>
                                    </div>
                                    <div className="chat-subheader">
                                        <span className="chat-clinic">{chat.clinic}</span>
                                        <span className="chat-location">{chat.location}</span>
                                    </div>
                                    <div className="chat-message-preview">
                                        <p>{chat.lastMessage}</p>
                                        {chat.unread > 0 && <span className="unread-badge">{chat.unread}</span>}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Sağ Panel - Ya aktif sohbet ya da bölgesel veterinerler */}
                <div className="right-panel">
                    {activeChat ? (
                        /* Aktif Sohbet Görünümü */
                        <div className="active-chat-panel">
                            <div className="panel-header">
                                <div className="chat-with-info">
                                    <h3>{recentChats.find(c => c.id === activeChat)?.name}</h3>
                                    <p>{recentChats.find(c => c.id === activeChat)?.clinic} - {recentChats.find(c => c.id === activeChat)?.location}</p>
                                </div>
                                <button className="back-button" onClick={() => setActiveChat(null)}>
                                    Tüm Veterinerler
                                </button>
                            </div>

                            <div className="chat-messages-container">
                                {(chatMessages[activeChat] || []).map(msg => (
                                    <div
                                        key={msg.id}
                                        className={`chat-message ${msg.isCurrentUser ? 'current-user' : 'other-user'}`}
                                    >
                                        <div className="message-content">
                                            <p className="message-text">{msg.text}</p>
                                            <span className="message-time">{msg.timestamp}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="chat-input-area">
                                <input
                                    type="text"
                                    placeholder="Mesajınızı yazın..."
                                    value={newMessage}
                                    onChange={(e) => setNewMessage(e.target.value)}
                                    onKeyPress={handleKeyPress}
                                />
                                <button onClick={handleSendMessage}>Gönder</button>
                            </div>
                        </div>
                    ) : (
                        /* Bölgesel Veterinerler Görünümü */
                        <div className="regional-vets-panel">
                            <div className="panel-header">
                                <h3>Bölgesel Veterinerler</h3>
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

                            <div className="vets-grid">
                                {filteredVets.map(vet => (
                                    <div
                                        key={vet.id}
                                        className="vet-card"
                                        onClick={() => startNewChat(vet.id)}
                                    >
                                        <div className="vet-avatar">
                                            {vet.name.charAt(0)}
                                            <span className={`status-indicator ${vet.status}`}></span>
                                        </div>
                                        <div className="vet-info">
                                            <h4>{vet.name}</h4>
                                            <p className="vet-specialty">{vet.specialty}</p>
                                            <p className="vet-clinic">{vet.clinic}</p>
                                            <p className="vet-location">{vet.location}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PrivateChat;
