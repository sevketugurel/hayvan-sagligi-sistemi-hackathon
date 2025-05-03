import React, { useState, useEffect } from 'react';
import './LocationWeather.css';

const LocationWeather = () => {
    const [weather, setWeather] = useState({
        temperature: '25°C',
        condition: 'Güneşli',
        location: 'İstanbul, Kadıköy'
    });

    // Gerçek uygulamada API'den veri çekilecek

    return (
        <div className="location-weather">
            <div className="location">
                <h3>Konum</h3>
                <p>{weather.location}</p>
            </div>
            <div className="weather">
                <h3>Hava Durumu</h3>
                <p>{weather.temperature} - {weather.condition}</p>
            </div>
        </div>
    );
};

export default LocationWeather;
