import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar';
import '../styles/AnimalDetails.css';

// Import a default profile image
import defaultAnimalImage from '../assets/images/default-animal.png';

const AnimalDetails = () => {
  const { animalId } = useParams();
  const navigate = useNavigate();
  const [animal, setAnimal] = useState(null);
  const [activeSection, setActiveSection] = useState(null);
  const [sectionData, setSectionData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [alerts, setAlerts] = useState([]);
  const [tooltipData, setTooltipData] = useState(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const tooltipRef = useRef(null);
  const [selectedDay, setSelectedDay] = useState(null);
  const [showDayModal, setShowDayModal] = useState(false);

  // Fetch animal details on component mount
  useEffect(() => {
    const fetchAnimalDetails = () => {
      setIsLoading(true);
      setError('');

      // Mock API call (replace with actual API in production)
      setTimeout(() => {
        // Mock data
        const mockAnimal = {
          id: parseInt(animalId),
          name: 'Max',
          age: 3,
          breed: 'Golden Retriever',
          chipNo: '123456789012345',
          species: 'Köpek',
          gender: 'Erkek',
          hospitalStatus: 'Taburcu', // or "Yatılı Tedavi"
          birthDate: '10.05.2020',
          color: 'Sarı',
          weight: '32.5 kg',
          owner: {
            id: 1,
            name: 'Ahmet Yılmaz',
            phone: '05551234567'
          },
          profileImage: null, // In real app, this would be a URL
          alerts: [
            { id: 1, type: 'allergy', severity: 'high', message: 'Tavuk proteinine karşı alerjisi bulunmaktadır!' },
            { id: 2, type: 'vaccine', severity: 'medium', message: 'Kuduz aşısı 15 gün içinde yapılmalıdır.' },
            { id: 3, type: 'chronic', severity: 'medium', message: 'Kronik böbrek yetmezliği - Düzenli kontrol gerekli' },
            { id: 4, type: 'medication', severity: 'low', message: 'Antibiyotik tedavisi devam ediyor (5 gün kaldı).' }
          ]
        };

        setAnimal(mockAnimal);
        setAlerts(mockAnimal.alerts);
        setIsLoading(false);
      }, 1000);
    };

    fetchAnimalDetails();
  }, [animalId]);

  // Function to handle button clicks for different sections
  const handleSectionClick = (section) => {
    setActiveSection(section);
    fetchSectionData(section);
  };

  // Mock function to fetch data for different sections
  const fetchSectionData = (section) => {
    setIsLoading(true);

    // Mock API call for section data
    setTimeout(() => {
      // Different mock data for each section
      const mockData = {
        clinicalExam: [
          { 
            id: 1, 
            date: '10.07.2023', 
            vet: 'Dr. Mehmet Yılmaz', 
            anamnesis: 'Sahibi 3 gündür iştahsızlık ve enerji düşüklüğü olduğunu belirtti.',
            complaints: 'İştahsızlık, halsizlik, aşırı su tüketimi',
            findings: 'Hafif dehidrasyon belirtileri. Solunum ve nabız normal. Ateş yok. Oral mukozada hafif solukluk.',
            primaryDiagnosis: 'Gastroenterit',
            secondaryDiagnosis: 'Dehidrasyon',
            procedures: 'Subkutan sıvı tedavisi, antiemetik enjeksiyon, probiotic verildi.'
          },
          { 
            id: 2, 
            date: '15.08.2023', 
            vet: 'Dr. Ayşe Demir', 
            anamnesis: 'Kontrol muayenesi. Sahibi dün akşamdan itibaren ishal şikayeti olduğunu belirtti.',
            complaints: 'İshal, karın bölgesinde rahatsızlık',
            findings: 'Hafif ishal şikayeti. Dehidrasyon yok. Abdominal bölgede hafif hassasiyet saptandı.',
            primaryDiagnosis: 'Akut Gastrit',
            secondaryDiagnosis: '',
            procedures: 'Diyet önerildi, bağırsak florasını düzenleyici ilaçlar reçete edildi.'
          },
          { 
            id: 3, 
            date: '05.09.2023', 
            vet: 'Dr. Mehmet Yılmaz', 
            anamnesis: 'Yıllık sağlık kontrolü için geldi.',
            complaints: 'Herhangi bir şikayet yok',
            findings: 'Genel sağlık durumu iyi. Ağız içi kontrol yapıldı, diş taşları tespit edildi.',
            primaryDiagnosis: 'Sağlıklı',
            secondaryDiagnosis: 'Diş taşı birikimi',
            procedures: 'Diş taşı temizliği önerildi, sonbahar aşıları yapıldı.'
          }
        ],
        diseaseHistory: [
          { 
            id: 1, 
            patientName: 'Max',
            diseaseName: 'Akut Gastroenterit', 
            diagnosisDate: '05.06.2022',
            endDate: '15.06.2022', 
            details: 'Şiddetli kusma ve ishal ile başvurdu. Kan testlerinde hafif elektrolitik dengesizlik tespit edildi.', 
            treatment: 'Antibiyotik tedavisi (Amoksisilin), diyet düzenlemesi, IV sıvı tedavisi uygulandı.', 
            hospitalized: true,
            hospitalizationDays: 3,
            status: 'İyileşti'
          },
          { 
            id: 2, 
            patientName: 'Max',
            diseaseName: 'Otit', 
            diagnosisDate: '20.03.2023',
            endDate: '25.03.2023', 
            details: 'Sol kulakta kaşıntı ve kızarıklık şikayeti. Kulak salgısı örneği alındı, malassezia tespit edildi.', 
            treatment: 'Kulak damlaları (Gentamisin), oral antibiyotik', 
            hospitalized: false,
            hospitalizationDays: 0,
            status: 'İyileşti'
          },
          { 
            id: 3, 
            patientName: 'Max',
            diseaseName: 'Kronik Böbrek Yetmezliği', 
            diagnosisDate: '10.05.2023',
            endDate: '', 
            details: 'Yaşa bağlı böbrek fonksiyon düşüklüğü. Kan üre ve kreatinin seviyelerinde artış gözlendi.', 
            treatment: 'Özel diyet, periyodik subkutan sıvı tedavisi, fosfat bağlayıcılar', 
            hospitalized: false,
            hospitalizationDays: 0,
            status: 'Devam Ediyor'
          }
        ],
        appointments: [
          { 
            id: 1, 
            date: '2023-10-15', 
            time: '09:30', 
            reason: 'Genel sağlık kontrolü', 
            status: 'Tamamlandı',
            type: 'examination',
            notes: 'Rutin yıllık kontrol'
          },
          { 
            id: 2, 
            date: '2023-10-15', 
            time: '14:15', 
            reason: 'Kuduz Aşısı', 
            status: 'Tamamlandı',
            type: 'vaccine',
            notes: 'Zorunlu aşı, sorunsuz uygulandı'
          },
          { 
            id: 3, 
            date: '2023-10-22', 
            time: '11:00', 
            reason: 'Deri problemleri', 
            status: 'Tamamlandı',
            type: 'examination',
            notes: 'Sağ arka bacakta yoğun kaşıntı şikayeti'
          },
          { 
            id: 4, 
            date: '2023-10-29', 
            time: '16:30', 
            reason: 'Tedavi takibi', 
            status: 'Tamamlandı',
            type: 'treatment',
            notes: 'Deri enfeksiyonu tedavisinin kontrolü'
          },
          { 
            id: 5, 
            date: '2023-11-05', 
            time: '10:45', 
            reason: 'Aşı - Köpek Gençlik Hastalığı', 
            status: 'Tamamlandı',
            type: 'vaccine',
            notes: 'Yıllık aşı tekrarı'
          },
          { 
            id: 6, 
            date: '2023-11-10', 
            time: '13:00', 
            reason: 'Diş kontrolü', 
            status: 'Tamamlandı',
            type: 'examination',
            notes: 'Diş taşı kontrolü ve temizliği'
          },
          { 
            id: 7, 
            date: '2023-11-17', 
            time: '15:30', 
            reason: 'İlaç tedavisi - Final', 
            status: 'Tamamlandı',
            type: 'treatment',
            notes: 'Deri enfeksiyonu tedavisinin son aşaması'
          },
          { 
            id: 8, 
            date: '2023-11-20', 
            time: '11:30', 
            reason: 'Karma Aşı', 
            status: 'Planlandı',
            type: 'vaccine',
            notes: 'Koruyucu karma aşı uygulaması'
          },
          { 
            id: 9, 
            date: '2023-11-25', 
            time: '09:15', 
            reason: 'Kan testi', 
            status: 'Planlandı',
            type: 'treatment',
            notes: 'Rutin kan değerleri kontrolü'
          },
          { 
            id: 10, 
            date: '2023-12-05', 
            time: '14:00', 
            reason: 'Böbrek kontrol muayenesi', 
            status: 'Planlandı',
            type: 'examination',
            notes: 'Kronik rahatsızlık takibi'
          },
          { 
            id: 11, 
            date: '2023-12-12', 
            time: '16:45', 
            reason: 'Ultrason', 
            status: 'Planlandı',
            type: 'treatment',
            notes: 'Abdominal ultrason kontrolü'
          },
          { 
            id: 12, 
            date: '2023-12-15', 
            time: '09:45', 
            reason: '6 aylık kontrol', 
            status: 'Planlandı',
            type: 'examination',
            notes: 'Genel durum değerlendirmesi'
          },
          { 
            id: 13, 
            date: '2023-12-23', 
            time: '10:30', 
            reason: 'Parazit ilacı', 
            status: 'Planlandı',
            type: 'treatment',
            notes: 'Düzenli parazit koruma tedavisi'
          }
        ],
        radiology: [
          { id: 1, date: '15.08.2023', type: 'X-Ray', region: 'Abdomen', findings: 'Normal bulgular', image: 'xray-url.jpg' },
          { id: 2, date: '16.08.2023', type: 'Ultrason', region: 'Abdomen', findings: 'Hafif karaciğer büyümesi', image: 'ultrasound-url.jpg' }
        ],
        labTests: [
          { id: 1, date: '10.08.2023', test: 'Tam Kan Sayımı', results: 'Normal değerler', report: 'report-url.pdf' },
          { id: 2, date: '10.08.2023', test: 'Karaciğer Fonksiyon Testleri', results: 'ALT hafif yüksek', report: 'report-url.pdf' }
        ],
        prescriptions: [
          { id: 1, date: '15.08.2023', medications: ['Amoksisilin 250mg (2x1)', 'Probiyotik (1x1)'], duration: '7 gün' },
          { id: 2, date: '25.03.2023', medications: ['Gentamisin Kulak Damlası (3x1)'], duration: '5 gün' }
        ],
        vaccinations: [
          { id: 1, date: '10.05.2021', vaccine: 'Kuduz Aşısı', nextDue: '10.05.2022', status: 'Tamamlandı' },
          { id: 2, date: '15.06.2022', vaccine: 'Kuduz Aşısı', nextDue: '15.06.2023', status: 'Tamamlandı' },
          { id: 3, date: '20.07.2023', vaccine: 'Kuduz Aşısı', nextDue: '20.07.2024', status: 'Tamamlandı' }
        ],
        allergies: [
          { id: 1, allergen: 'Tavuk proteini', severity: 'Orta', symptoms: 'Kaşıntı, kızarıklık', notes: 'Gıda alerjisi, tavuk içeren mamalardan kaçınılmalı' },
          { id: 2, allergen: 'Polen', severity: 'Hafif', symptoms: 'Hapşırma, gözlerde sulanma', notes: 'Mevsimsel alerji, bahar aylarında belirgin' }
        ],
        necropsy: [],
        notes: [
          { id: 1, date: '15.08.2023', author: 'Dr. Ayşe Demir', content: 'Hasta sahibi düzenli ilaç kullanımı konusunda tekrar bilgilendirildi.' },
          { id: 2, date: '25.09.2023', author: 'Dr. Mehmet Yılmaz', content: 'Yaşına göre iyi durumda. Kilo takibi önerildi.' }
        ]
      };

      setSectionData(mockData[section] || []);
      setIsLoading(false);
    }, 500);
  };

  // Helper functions for calendar
  const getMonthName = (month) => {
    const months = [
      'Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran',
      'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'
    ];
    return months[month];
  };

  const generateCalendarData = () => {
    const today = new Date();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();
    
    const calendarData = [];
    
    // Generate data for previous, current and next month
    for (let monthOffset = 0; monthOffset < 3; monthOffset++) {
      const month = (currentMonth + monthOffset) % 12;
      const year = currentYear + Math.floor((currentMonth + monthOffset) / 12);
      
      const firstDay = new Date(year, month, 1);
      const lastDay = new Date(year, month + 1, 0);
      
      const daysInMonth = lastDay.getDate();
      
      // Adjust for Monday as first day of week (0 = Monday, 6 = Sunday)
      let startingDayOfWeek = firstDay.getDay() - 1;
      if (startingDayOfWeek === -1) startingDayOfWeek = 6; // Sunday becomes last day
      
      const monthData = {
        month,
        year,
        name: getMonthName(month),
        days: []
      };
      
      // Add empty cells for days before the first day of the month
      for (let i = 0; i < startingDayOfWeek; i++) {
        monthData.days.push(null);
      }
      
      // Add days of the month
      for (let day = 1; day <= daysInMonth; day++) {
        const date = new Date(year, month, day);
        const dateString = date.toISOString().split('T')[0]; // Format: YYYY-MM-DD
        
        // Find appointments for this date
        const dayAppointments = sectionData.filter(app => app.date === dateString);
        
        // Count appointment types for this day
        const examCount = dayAppointments.filter(app => app.type === 'examination').length;
        const vaccineCount = dayAppointments.filter(app => app.type === 'vaccine').length;
        const treatmentCount = dayAppointments.filter(app => app.type === 'treatment').length;
        
        monthData.days.push({
          day,
          date: dateString,
          appointments: dayAppointments,
          isToday: date.toDateString() === today.toDateString(),
          counts: {
            examination: examCount,
            vaccine: vaccineCount,
            treatment: treatmentCount,
            total: dayAppointments.length
          }
        });
      }
      
      calendarData.push(monthData);
    }
    
    return calendarData;
  };

  const getAppointmentIcon = (type) => {
    switch (type) {
      case 'examination':
        return '👨‍⚕️';
      case 'vaccine':
        return '💉';
      case 'treatment':
        return '💊';
      default:
        return '📅';
    }
  };

  const getAppointmentColor = (type) => {
    switch (type) {
      case 'examination':
        return 'examination-appointment';
      case 'vaccine':
        return 'vaccine-appointment';
      case 'treatment':
        return 'treatment-appointment';
      default:
        return '';
    }
  };

  const handleAppointmentMouseEnter = (event, appointment) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setTooltipPosition({
      x: rect.left + rect.width + 10,
      y: rect.top
    });
    setTooltipData(appointment);
  };

  const handleAppointmentMouseLeave = () => {
    setTooltipData(null);
  };

  const formatDateString = (dateStr) => {
    const parts = dateStr.split('-');
    return `${parts[2]}.${parts[1]}.${parts[0]}`;
  };

  const handleDayClick = (dayData) => {
    if (dayData && dayData.appointments.length > 0) {
      setSelectedDay(dayData);
      setShowDayModal(true);
    }
  };

  const closeDayModal = () => {
    setShowDayModal(false);
    setSelectedDay(null);
  };

  // Helper function to render section content based on active section
  const renderSectionContent = () => {
    if (!activeSection || !sectionData || sectionData.length === 0) {
      return (
        <div className="welcome-section">
          <h3>Hasta Bilgileri</h3>
          
          {alerts && alerts.length > 0 ? (
            <div className="alert-container">
              <h4>Önemli Bilgiler ve Hatırlatmalar</h4>
              {alerts.map(alert => (
                <div key={alert.id} className={`alert-item alert-${alert.severity}`}>
                  <div className="alert-icon">
                    {alert.type === 'allergy' && '⚠️'}
                    {alert.type === 'vaccine' && '💉'}
                    {alert.type === 'chronic' && '🏥'}
                    {alert.type === 'medication' && '💊'}
                  </div>
                  <div className="alert-message">{alert.message}</div>
                </div>
              ))}
            </div>
          ) : (
            <p className="no-data-message">Lütfen görüntülemek istediğiniz bölümü seçin.</p>
          )}
          
          <div className="tip-container">
            <p>Sol taraftaki menüden ilgili bölümü seçerek detaylı bilgileri görüntüleyebilirsiniz.</p>
          </div>
        </div>
      );
    }

    // Render different content based on active section
    switch (activeSection) {
      case 'clinicalExam':
        return (
          <div className="section-content clinical-exam">
            <h3>Klinik İncelemeler</h3>
            {sectionData.map(exam => (
              <div key={exam.id} className="clinical-exam-item">
                <div className="exam-header">
                  <span className="exam-date">{exam.date}</span>
                  <span className="exam-vet">{exam.vet}</span>
                </div>
                
                <div className="exam-details">
                  <div className="exam-detail-row">
                    <div className="detail-label">Anamnez:</div>
                    <div className="detail-content">{exam.anamnesis}</div>
                  </div>
                  
                  <div className="exam-detail-row">
                    <div className="detail-label">Şikayetler:</div>
                    <div className="detail-content">{exam.complaints}</div>
                  </div>
                  
                  <div className="exam-detail-row">
                    <div className="detail-label">Bulgular:</div>
                    <div className="detail-content">{exam.findings}</div>
                  </div>
                  
                  <div className="exam-diagnoses">
                    <div className="exam-detail-row">
                      <div className="detail-label">Birincil Tanı:</div>
                      <div className="detail-content primary-diagnosis">{exam.primaryDiagnosis}</div>
                    </div>
                    
                    {exam.secondaryDiagnosis && (
                      <div className="exam-detail-row">
                        <div className="detail-label">İkincil Tanı:</div>
                        <div className="detail-content secondary-diagnosis">{exam.secondaryDiagnosis}</div>
                      </div>
                    )}
                  </div>
                  
                  <div className="exam-detail-row">
                    <div className="detail-label">Yapılan İşlemler:</div>
                    <div className="detail-content procedures">{exam.procedures}</div>
                  </div>
                </div>
                
                <div className="exam-actions">
                  <button className="action-btn print-btn">
                    <i className="print-icon">🖨️</i> Yazdır
                  </button>
                  <button className="action-btn detail-btn">
                    <i className="detail-icon">🔍</i> Detaylar
                  </button>
                </div>
              </div>
            ))}
          </div>
        );
      
      case 'diseaseHistory':
        return (
          <div className="section-content disease-history">
            <h3>Hastalık Geçmişi</h3>
            {sectionData.map(disease => (
              <div key={disease.id} className={`disease-item ${disease.status === 'Devam Ediyor' ? 'ongoing-disease' : ''}`}>
                <div className="disease-header">
                  <div className="disease-title">
                    <h4>{disease.diseaseName}</h4>
                    <span className={`disease-status ${disease.status === 'İyileşti' ? 'recovered' : 'ongoing'}`}>
                      {disease.status}
                    </span>
                  </div>
                  <div className="disease-dates">
                    <span className="diagnosis-date">
                      <i className="date-icon">📅</i> Tanı: {disease.diagnosisDate}
                    </span>
                    {disease.endDate && (
                      <span className="end-date">
                        <i className="date-icon">✓</i> İyileşme: {disease.endDate}
                      </span>
                    )}
                  </div>
                </div>
                
                <div className="disease-content">
                  <div className="disease-detail-row">
                    <div className="detail-label">Detaylar:</div>
                    <div className="detail-content">{disease.details}</div>
                  </div>
                  
                  <div className="disease-detail-row">
                    <div className="detail-label">Tedavi:</div>
                    <div className="detail-content">{disease.treatment}</div>
                  </div>
                  
                  <div className="disease-hospitalization">
                    {disease.hospitalized ? (
                      <div className="hospitalization-info">
                        <i className="hospital-icon">🏥</i>
                        <span>Hastanede yatış: <strong>{disease.hospitalizationDays} gün</strong></span>
                      </div>
                    ) : (
                      <div className="hospitalization-info outpatient">
                        <i className="outpatient-icon">🏠</i>
                        <span>Ayakta tedavi edildi</span>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="disease-actions">
                  <button className="action-btn history-btn">
                    <i className="history-icon">📋</i> Tedavi Geçmişi
                  </button>
                  <button className="action-btn lab-btn">
                    <i className="lab-icon">🔬</i> Lab Sonuçları
                  </button>
                </div>
              </div>
            ))}
          </div>
        );
      
      case 'appointments':
        return (
          <div className="section-content appointments">
            <h3>Randevu Takip Sistemi</h3>
            
            <div className="appointments-legend">
              <div className="legend-item">
                <span className="legend-icon examination-icon">👨‍⚕️</span>
                <span className="legend-text">Muayene</span>
              </div>
              <div className="legend-item">
                <span className="legend-icon vaccine-icon">💉</span>
                <span className="legend-text">Aşı</span>
              </div>
              <div className="legend-item">
                <span className="legend-icon treatment-icon">💊</span>
                <span className="legend-text">Tedavi</span>
              </div>
              <div className="legend-item">
                <span className="legend-status completed">Tamamlandı</span>
              </div>
              <div className="legend-item">
                <span className="legend-status planned">Planlandı</span>
              </div>
            </div>
            
            <div className="appointments-container">
              <div className="upcoming-appointments">
                <h4>Yaklaşan Randevular</h4>
                {sectionData.filter(app => app.status === 'Planlandı').length > 0 ? (
                  <div className="appointment-list">
                    {sectionData
                      .filter(app => app.status === 'Planlandı')
                      .sort((a, b) => new Date(a.date) - new Date(b.date))
                      .map(appointment => (
                        <div key={appointment.id} className="appointment-item upcoming">
                          <div className="appointment-date">
                            <div className="appointment-day">
                              {new Date(appointment.date).getDate()}
                            </div>
                            <div className="appointment-month">
                              {getMonthName(new Date(appointment.date).getMonth()).substring(0, 3)}
                            </div>
                          </div>
                          <div className="appointment-details">
                            <div className="appointment-title">
                              <span className={`appointment-type-icon ${getAppointmentColor(appointment.type)}`}>
                                {getAppointmentIcon(appointment.type)}
                              </span>
                              <span className="appointment-reason">{appointment.reason}</span>
                            </div>
                            <div className="appointment-time-status">
                              <span className="appointment-time-display">{appointment.time}</span>
                              <span className={`appointment-status ${appointment.status.toLowerCase()}`}>
                                {appointment.status}
                              </span>
                            </div>
                            {appointment.notes && (
                              <div className="appointment-notes">
                                <span className="appointment-notes-text">{appointment.notes}</span>
                              </div>
                            )}
                          </div>
                          <div className="appointment-actions">
                            <button className="small-action-btn edit-btn" title="Düzenle">
                              <i className="edit-icon">✏️</i>
                            </button>
                            <button className="small-action-btn cancel-btn" title="İptal Et">
                              <i className="cancel-icon">❌</i>
                            </button>
                          </div>
                        </div>
                      ))}
                  </div>
                ) : (
                  <p className="no-data-message">Yaklaşan randevu bulunmamaktadır.</p>
                )}
              </div>
              
              <div className="past-appointments">
                <h4>Geçmiş Randevular</h4>
                {sectionData.filter(app => app.status === 'Tamamlandı').length > 0 ? (
                  <div className="appointment-list">
                    {sectionData
                      .filter(app => app.status === 'Tamamlandı')
                      .sort((a, b) => new Date(b.date) - new Date(a.date)) // Sort descending for past appointments
                      .map(appointment => (
                        <div key={appointment.id} className="appointment-item past">
                          <div className="appointment-date past-date">
                            <div className="appointment-day">
                              {new Date(appointment.date).getDate()}
                            </div>
                            <div className="appointment-month">
                              {getMonthName(new Date(appointment.date).getMonth()).substring(0, 3)}
                            </div>
                          </div>
                          <div className="appointment-details">
                            <div className="appointment-title">
                              <span className={`appointment-type-icon ${getAppointmentColor(appointment.type)}`}>
                                {getAppointmentIcon(appointment.type)}
                              </span>
                              <span className="appointment-reason">{appointment.reason}</span>
                            </div>
                            <div className="appointment-time-status">
                              <span className="appointment-time-display">{appointment.time}</span>
                              <span className={`appointment-status ${appointment.status.toLowerCase()}`}>
                                {appointment.status}
                              </span>
                            </div>
                            {appointment.notes && (
                              <div className="appointment-notes">
                                <span className="appointment-notes-text">{appointment.notes}</span>
                              </div>
                            )}
                          </div>
                          <div className="appointment-actions">
                            <button className="small-action-btn detail-btn" title="Detaylar">
                              <i className="detail-icon">🔍</i>
                            </button>
                            <button className="small-action-btn report-btn" title="Rapor">
                              <i className="report-icon">📋</i>
                            </button>
                          </div>
                        </div>
                      ))}
                  </div>
                ) : (
                  <p className="no-data-message">Geçmiş randevu bulunmamaktadır.</p>
                )}
              </div>
            </div>
            
            {showDayModal && selectedDay && (
              <div className="day-modal-overlay" onClick={closeDayModal}>
                <div className="day-modal-content" onClick={e => e.stopPropagation()}>
                  <div className="day-modal-header">
                    <h3>{formatDateString(selectedDay.date)} Tarihli Randevular</h3>
                    <button className="day-modal-close" onClick={closeDayModal}>×</button>
                  </div>
                  <div className="day-modal-body">
                    {selectedDay.appointments.length > 0 ? (
                      selectedDay.appointments
                        .sort((a, b) => a.time.localeCompare(b.time))
                        .map(app => (
                          <div 
                            key={app.id} 
                            className={`day-modal-appointment ${app.status === 'Tamamlandı' ? 'completed' : 'planned'}`}
                          >
                            <div className={`appointment-type-indicator ${getAppointmentColor(app.type)}`}>
                              <span className="appointment-time">{app.time}</span>
                            </div>
                            <div className="modal-appointment-details">
                              <div className="modal-appointment-title">
                                <span className="appointment-icon">{getAppointmentIcon(app.type)}</span>
                                <h4>{app.reason}</h4>
                              </div>
                              <div className="modal-appointment-info">
                                <span className={`appointment-status ${app.status.toLowerCase()}`}>
                                  {app.status}
                                </span>
                                <span className="appointment-type">
                                  {app.type === 'examination' && 'Muayene'}
                                  {app.type === 'vaccine' && 'Aşı'}
                                  {app.type === 'treatment' && 'Tedavi'}
                                </span>
                              </div>
                              {app.notes && (
                                <div className="modal-appointment-notes">
                                  {app.notes}
                                </div>
                              )}
                            </div>
                            <div className="modal-appointment-actions">
                              <button className="modal-action-btn" title="Düzenle">
                                <i className="edit-icon">✏️</i>
                              </button>
                              <button className="modal-action-btn" title="Detaylar">
                                <i className="details-icon">🔍</i>
                              </button>
                            </div>
                          </div>
                        ))
                    ) : (
                      <p className="no-appointments">Bu tarihte randevu bulunmamaktadır.</p>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      
      case 'radiology':
        return (
          <div className="section-content radiology">
            <h3>Radyolojik Görüntüleme</h3>
            {sectionData.map(imaging => (
              <div key={imaging.id} className="imaging-item">
                <div className="imaging-header">
                  <span className="imaging-date">{imaging.date}</span>
                  <span className="imaging-type">{imaging.type} - {imaging.region}</span>
                </div>
                <div className="imaging-findings">{imaging.findings}</div>
                <div className="imaging-thumbnail">
                  <img src={imaging.image || defaultAnimalImage} alt={`${imaging.type} görüntüsü`} />
                  <button className="view-full-btn">Tam Boyut Görüntüle</button>
                </div>
              </div>
            ))}
          </div>
        );
      
      case 'labTests':
        return (
          <div className="section-content lab-tests">
            <h3>Laboratuvar Testleri</h3>
            {sectionData.map(test => (
              <div key={test.id} className="lab-test-item">
                <div className="test-header">
                  <span className="test-date">{test.date}</span>
                  <span className="test-name">{test.test}</span>
                </div>
                <div className="test-results">{test.results}</div>
                <a href={test.report} className="test-report-link">Raporu Görüntüle</a>
              </div>
            ))}
          </div>
        );
      
      case 'prescriptions':
        return (
          <div className="section-content prescriptions">
            <h3>Reçeteler</h3>
            {sectionData.map(prescription => (
              <div key={prescription.id} className="prescription-item">
                <div className="prescription-header">
                  <span className="prescription-date">{prescription.date}</span>
                  <span className="prescription-duration">{prescription.duration}</span>
                </div>
                <div className="prescription-medications">
                  <ul>
                    {prescription.medications.map((med, index) => (
                      <li key={index}>{med}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        );
      
      case 'vaccinations':
        return (
          <div className="section-content vaccinations">
            <h3>Aşılar</h3>
            {sectionData.map(vaccination => (
              <div key={vaccination.id} className="vaccination-item">
                <div className="vaccination-header">
                  <span className="vaccination-date">{vaccination.date}</span>
                  <span className="vaccination-name">{vaccination.vaccine}</span>
                </div>
                <div className="vaccination-details">
                  <span className="next-due">Gelecek Aşı: {vaccination.nextDue}</span>
                  <span className={`vaccination-status ${vaccination.status.toLowerCase()}`}>{vaccination.status}</span>
                </div>
              </div>
            ))}
          </div>
        );
      
      case 'allergies':
        return (
          <div className="section-content allergies">
            <h3>Alerjiler / Kronik Rahatsızlıklar</h3>
            {sectionData.map(allergy => (
              <div key={allergy.id} className="allergy-item">
                <div className="allergy-header">
                  <span className="allergen-name">{allergy.allergen}</span>
                  <span className={`severity ${allergy.severity.toLowerCase()}`}>{allergy.severity}</span>
                </div>
                <div className="allergy-symptoms">{allergy.symptoms}</div>
                <div className="allergy-notes">{allergy.notes}</div>
              </div>
            ))}
          </div>
        );
      
      case 'necropsy':
        return (
          <div className="section-content necropsy">
            <h3>Nekropsi Bulguları</h3>
            {sectionData.length === 0 ? (
              <p>Nekropsi bulgusu bulunamadı.</p>
            ) : (
              sectionData.map(necropsy => (
                <div key={necropsy.id} className="necropsy-item">
                  <div className="necropsy-header">
                    <span className="necropsy-date">{necropsy.date}</span>
                    <span className="necropsy-vet">{necropsy.vet}</span>
                  </div>
                  <div className="necropsy-findings">{necropsy.findings}</div>
                </div>
              ))
            )}
          </div>
        );
      
      case 'notes':
        return (
          <div className="section-content notes">
            <h3>Notlar</h3>
            {sectionData.map(note => (
              <div key={note.id} className="note-item">
                <div className="note-header">
                  <span className="note-date">{note.date}</span>
                  <span className="note-author">{note.author}</span>
                </div>
                <div className="note-content">{note.content}</div>
              </div>
            ))}
          </div>
        );
      
      default:
        return (
          <div className="no-data-message">
            <p>Seçilen bölüm için veri bulunamadı.</p>
          </div>
        );
    }
  };

  if (isLoading && !animal) {
    return (
      <>
        <NavBar />
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Hayvan bilgileri yükleniyor...</p>
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <NavBar />
        <div className="error-container">
          <h2>Hata</h2>
          <p>{error}</p>
          <button onClick={() => navigate('/vet-dashboard')}>Dashboard'a Dön</button>
        </div>
      </>
    );
  }

  return (
    <>
      <NavBar />
      <div className="animal-details-container">
        <div className="animal-profile-section">
          <div className="profile-left">
            <div className="profile-image-container">
              <img 
                src={animal?.profileImage || defaultAnimalImage} 
                alt={`${animal?.name || 'Hayvan'} profil fotoğrafı`} 
                className="profile-image"
              />
            </div>
          </div>
          
          <div className="profile-right">
            <div className="animal-info">
              <h2 className="animal-name">{animal?.name}</h2>
              <div className="info-grid">
                <div className="info-item">
                  <span className="info-label">Yaş:</span>
                  <span className="info-value">{animal?.age} yaş</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Irk:</span>
                  <span className="info-value">{animal?.breed}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Çip No:</span>
                  <span className="info-value">{animal?.chipNo}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Hospit Durumu:</span>
                  <span className={`info-value ${animal?.hospitalStatus === 'Yatılı Tedavi' ? 'hospitalized' : ''}`}>
                    {animal?.hospitalStatus}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="animal-details-content">
          <div className="details-sidebar">
            <div className="sidebar-buttons">
              <button 
                className={`sidebar-btn ${activeSection === 'clinicalExam' ? 'active' : ''}`}
                onClick={() => handleSectionClick('clinicalExam')}
              >
                Klinik İnceleme
              </button>
              <button 
                className={`sidebar-btn ${activeSection === 'diseaseHistory' ? 'active' : ''}`}
                onClick={() => handleSectionClick('diseaseHistory')}
              >
                Hastalık Geçmişi
              </button>
              <button 
                className={`sidebar-btn ${activeSection === 'appointments' ? 'active' : ''}`}
                onClick={() => handleSectionClick('appointments')}
              >
                Randevu Takip Sistemi
              </button>
              <button 
                className={`sidebar-btn ${activeSection === 'radiology' ? 'active' : ''}`}
                onClick={() => handleSectionClick('radiology')}
              >
                Radyolojik Görüntüleme
              </button>
              <button 
                className={`sidebar-btn ${activeSection === 'labTests' ? 'active' : ''}`}
                onClick={() => handleSectionClick('labTests')}
              >
                Lab Testleri/Sonuçları
              </button>
              <button 
                className={`sidebar-btn ${activeSection === 'prescriptions' ? 'active' : ''}`}
                onClick={() => handleSectionClick('prescriptions')}
              >
                Reçete
              </button>
              <button 
                className={`sidebar-btn ${activeSection === 'vaccinations' ? 'active' : ''}`}
                onClick={() => handleSectionClick('vaccinations')}
              >
                Aşılar
              </button>
              <button 
                className={`sidebar-btn ${activeSection === 'allergies' ? 'active' : ''}`}
                onClick={() => handleSectionClick('allergies')}
              >
                Alerji/Kronik Rahatsızlık
              </button>
              <button 
                className={`sidebar-btn ${activeSection === 'necropsy' ? 'active' : ''}`}
                onClick={() => handleSectionClick('necropsy')}
              >
                Nekropsi Bulguları
              </button>
              <button 
                className={`sidebar-btn ${activeSection === 'notes' ? 'active' : ''}`}
                onClick={() => handleSectionClick('notes')}
              >
                Not
              </button>
            </div>
          </div>
          <div className="details-content">
            {isLoading && activeSection ? (
              <div className="loading-section">
                <div className="loading-spinner"></div>
                <p>Bilgiler yükleniyor...</p>
              </div>
            ) : (
              renderSectionContent()
            )}
          </div>
        </div>

        <div className="back-button-container">
          <button 
            className="back-button" 
            onClick={() => navigate(-1)}
          >
            Geri Dön
          </button>
        </div>
      </div>
    </>
  );
};

export default AnimalDetails; 