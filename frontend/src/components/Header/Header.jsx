import React from 'react';
import './Header.css';

const Header = () => {
    const veteriner = {
        ad: 'Ahmet',
        soyad: 'Yılmaz',
        unvan: 'Uzman Veteriner Hekim',
        sicilNo: 'VET-12345'
    };

    const klinik = {
        ad: 'DOSTLAR VETERİNER KLİNİĞİ',
        kurulusTarihi: '2010'
    };

    const konum = {
        sehir: 'İSTANBUL',
        sicaklik: '25 °C',
        havaDurumu: 'GÜNEŞLİ'
    };

    return (
        <header className="header">
            <div className="header-box vet-info-box">
                <p>{veteriner.ad} {veteriner.soyad}</p>
                <p>{veteriner.unvan}</p>
                <p>sicilno:{veteriner.sicilNo}</p>
            </div>

            <div className="header-box clinic-title-box">
                <p>{klinik.ad}</p>
            </div>

            <div className="header-box location-weather-box">
                <p>{konum.sehir}   {konum.sicaklik}</p>
                <p>{konum.havaDurumu}</p>
            </div>
        </header>
    );
};

export default Header;
