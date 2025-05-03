import React from 'react';
import './ClinicTitle.css';

const ClinicTitle = () => {
    const klinik = {
        ad: 'Dostlar Veteriner Kliniği',
        kurulusTarihi: '2010'
    };

    return (
        <div className="clinic-title">
            <h1>{klinik.ad}</h1>
            <p>Kuruluş: {klinik.kurulusTarihi}</p>
        </div>
    );
};

export default ClinicTitle;
