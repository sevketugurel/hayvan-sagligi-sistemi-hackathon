import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar';
import '../styles/AnimalDetails.css';
import '../styles/LabTests.css';
import '../styles/Prescriptions.css';
import AddVaccineModal from '../components/AddVaccineModal';
import AddConditionModal from '../components/AddConditionModal';
import AddClinicalExamModal from '../components/AddClinicalExamModal';
import AddDiseaseHistoryModal from '../components/AddDiseaseHistoryModal';
import AddNoteModal from '../components/AddNoteModal';
import MedicationWarningModal from '../components/MedicationWarningModal';
import { checkMedicationRisksForBreed } from '../utils/medicationRisks';

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
  const [activeImagingType, setActiveImagingType] = useState('');
  const [expandedTests, setExpandedTests] = useState({});
  const [showNewPrescriptionModal, setShowNewPrescriptionModal] = useState(false);
  const [showNewVaccineModal, setShowNewVaccineModal] = useState(false);
  const [showNewConditionModal, setShowNewConditionModal] = useState(false);
  const [showNewClinicalExamModal, setShowNewClinicalExamModal] = useState(false);
  const [showNewDiseaseHistoryModal, setShowNewDiseaseHistoryModal] = useState(false);
  const [showAddNoteModal, setShowAddNoteModal] = useState(false);
  const [showMedicationWarningModal, setShowMedicationWarningModal] = useState(false);
  const [medicationRisks, setMedicationRisks] = useState([]);
  const [pendingPrescription, setPendingPrescription] = useState(null);
  const [newPrescription, setNewPrescription] = useState({
    medications: [""],
    duration: "",
    prescribedBy: "",
    veterinaryClinic: "Hayat Veteriner Kliniği"
  });
  const [expandedSections, setExpandedSections] = useState({});
  const [clinicalExams, setClinicalExams] = useState([]);
  const [medicalHistory, setMedicalHistory] = useState([]);
  const [vaccinations, setVaccinations] = useState([]);

  // Toggle test category expansion
  const toggleTestCategory = (category) => {
    setExpandedTests(prev => ({
      ...prev,
      [category]: !prev[category]
    }));
  };

  // Toggle section expansion
  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  // Fetch animal details on component mount
  useEffect(() => {
    const fetchAnimalDetails = () => {
      setIsLoading(true);
      setError('');

      // Mock API call (replace with actual API in production)
      setTimeout(() => {
        // Define animal data for all available animals in the mock database
        const mockAnimals = {
          // Max (ID: 1)
          1: {
            id: 1,
            name: 'Max',
            age: 3,
            breed: 'Golden Retriever',
            chipNo: '123456789012345',
            species: 'Köpek',
            gender: 'Erkek',
            neutered: true,
            hospitalStatus: 'Taburcu',
            birthDate: '10.05.2020',
            color: 'Sarı',
            weight: '32.5 kg',
            height: '60 cm',
            owner: {
              id: 1,
              name: 'Ahmet Yılmaz',
              phone: '05551234567'
            },
            profileImage: '/assets/profile-photos/max.jpeg',
            alerts: [
              { id: 1, type: 'allergy', severity: 'high', message: 'Tavuk proteinine karşı alerjisi bulunmaktadır!' },
              { id: 2, type: 'vaccine', severity: 'medium', message: 'Kuduz aşısı 15 gün içinde yapılmalıdır.' },
              { id: 3, type: 'chronic', severity: 'medium', message: 'Kronik böbrek yetmezliği - Düzenli kontrol gerekli' },
              { id: 4, type: 'medication', severity: 'low', message: 'Antibiyotik tedavisi devam ediyor (5 gün kaldı).' }
            ]
          },
          // Luna (ID: 2)
          2: {
            id: 2,
            name: 'Luna',
            age: 2,
            breed: 'British Shorthair',
            chipNo: '987654321098765',
            species: 'Kedi',
            gender: 'Dişi',
            neutered: true,
            hospitalStatus: 'Taburcu',
            birthDate: '15.07.2021',
            color: 'Bej ve Kahverengi',
            weight: '4.2 kg',
            height: '28 cm',
            owner: {
              id: 2,
              name: 'Ayşe Demir',
              phone: '05559876543'
            },
            profileImage: '/assets/profile-photos/default-cat.jpeg',
            alerts: [
              { id: 1, type: 'allergy', severity: 'medium', message: 'Balık proteinine karşı hafif alerjisi var.' },
              { id: 2, type: 'chronic', severity: 'low', message: 'Hafif astım - Stres durumlarında gözlemleyin' },
              { id: 3, type: 'vaccine', severity: 'high', message: 'Karma aşı zamanı geldi!' }
            ]
          },
          // Pamuk (ID: 3)
          3: {
            id: 3,
            name: 'Pamuk',
            age: 5,
            breed: 'Scottish Fold',
            chipNo: '567891234567890',
            species: 'Kedi',
            gender: 'Erkek',
            neutered: false,
            hospitalStatus: 'Yatılı Tedavi',
            birthDate: '20.03.2018',
            color: 'Beyaz',
            weight: '4.8 kg',
            height: '30 cm',
            owner: {
              id: 3,
              name: 'Mehmet Kaya',
              phone: '05553456789'
            },
            profileImage: '/assets/profile-photos/default-cat.jpeg',
            alerts: [
              { id: 1, type: 'medication', severity: 'high', message: 'İdrar yolu enfeksiyonu tedavisi devam ediyor (3 gün kaldı)' },
              { id: 2, type: 'chronic', severity: 'medium', message: 'Diş taşı sorunu - Diş temizliği gerekli' },
              { id: 3, type: 'allergy', severity: 'low', message: 'Bazı temizlik ürünlerine karşı cilt hassasiyeti mevcut' }
            ]
          },
          // Karamel (ID: 4)
          4: {
            id: 4,
            name: 'Karamel',
            age: 2,
            breed: 'Labrador',
            chipNo: '567890123456789',
            species: 'Köpek',
            gender: 'Erkek',
            neutered: true,
            hospitalStatus: 'Yatılı Tedavi',
            birthDate: '15.04.2021',
            color: 'Kahverengi',
            weight: '28.5 kg',
            height: '56 cm',
            owner: {
              id: 4,
              name: 'Mehmet Can',
              phone: '05551234569'
            },
            profileImage: '/assets/profile-photos/default-dog.jpeg',
            alerts: [
              { id: 1, type: 'medication', severity: 'high', message: 'Cerrahi operasyon sonrası antibiyotik tedavisi devam etmekte' },
              { id: 2, type: 'chronic', severity: 'medium', message: 'Diz bağı sorunu - Dikkatli hareket etmeli' }
            ]
          },
          // Rocky (ID: 5)
          5: {
            id: 5,
            name: 'Rocky',
            age: 4,
            breed: 'Alman Çoban Köpeği',
            chipNo: '789012345678901',
            species: 'Köpek',
            gender: 'Erkek',
            neutered: false,
            hospitalStatus: 'Yatılı Tedavi',
            birthDate: '10.02.2019',
            color: 'Siyah/Kahverengi',
            weight: '35.0 kg',
            height: '65 cm',
            owner: {
              id: 5,
              name: 'Ali Kaya',
              phone: '05551234570'
            },
            profileImage: '/assets/profile-photos/default-dog.jpeg',
            alerts: [
              { id: 1, type: 'medication', severity: 'high', message: 'Kalça displazisi tedavisi sürüyor - Anti-enflamatuar ilaçlar devam ediyor' },
              { id: 2, type: 'chronic', severity: 'high', message: 'Kalça displazisi - Yoğun egzersizden kaçınmalı' }
            ]
          }
        };

        // Get the animal data based on the ID from the URL
        const animalData = mockAnimals[parseInt(animalId)];

        if (animalData) {
          setAnimal(animalData);
          setAlerts(animalData.alerts);
          setIsLoading(false);
        } else {
          setError('Hasta bulunamadı. Lütfen geçerli bir hasta seçin.');
          setIsLoading(false);
        }
      }, 1000);
    };

    fetchAnimalDetails();
  }, [animalId]);

  // Effect to set active imaging type when radiology section data changes
  useEffect(() => {
    if (activeSection === 'radiology' && sectionData && sectionData.length > 0) {
      // Group imaging records by type
      const groupedImaging = sectionData.reduce((groups, image) => {
        const type = image.type;
        if (!groups[type]) {
          groups[type] = [];
        }
        groups[type].push(image);
        return groups;
      }, {});
      
      // Get unique imaging types
      const imagingTypes = Object.keys(groupedImaging);
      
      // Set default active imaging type if needed
      if (imagingTypes.length > 0 && (!activeImagingType || !imagingTypes.includes(activeImagingType))) {
        setActiveImagingType(imagingTypes[0]);
      }
    }
  }, [activeSection, sectionData, activeImagingType]);

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
            treatment: 'IV sıvı tedavisi, 7 gün antibiyotik, probiyotik takviyesi',
            notes: 'Bir hafta sonra kontrol önerildi.'
          },
          { 
            id: animalId === '2' ? 2 : animalId === '3' ? 3 : animalId === '4' ? 4 : animalId === '5' ? 5 : 2, 
            date: animalId === '2' ? '05.05.2023' : 
                  animalId === '3' ? '12.06.2023' : 
                  animalId === '4' ? '22.09.2023' : 
                  animalId === '5' ? '18.10.2023' : 
                  '25.05.2023', 
            vet: animalId === '2' ? 'Dr. Ayşe Kaya' : 
                 animalId === '3' ? 'Dr. Hasan Demir' : 
                 animalId === '4' ? 'Dr. Mehmet Yılmaz' : 
                 animalId === '5' ? 'Dr. Ali Demir' : 
                 'Dr. Ayşe Kaya', 
            anamnesis: animalId === '2' ? 'Sahibi kedinin son günlerde çok kaşındığını belirtti.' : 
                       animalId === '3' ? 'İdrar yaparken zorlanma ve sık idrara çıkma şikayeti.' : 
                       animalId === '4' ? 'Arka bacakta topallama ve ağrı şikayeti.' : 
                       animalId === '5' ? 'Kalça bölgesinde ağrı, hareketlerde zorluk, kilo kaybı.' : 
                       'Sol ön bacakta aksama',
            complaints: animalId === '2' ? 'Aşırı kaşınma, tüy dökülmesi' : 
                        animalId === '3' ? 'Sık idrara çıkma, idrarda kan görülmesi' : 
                        animalId === '4' ? 'Arka bacakta topallama, aktivite azalması' : 
                        animalId === '5' ? 'Hareketlerde zorluk, kalça bölgesinde ağrı, iştahsızlık' : 
                        'Sol ön bacakta ağrı ve aksama',
            findings: animalId === '2' ? 'Boyun ve sırt bölgesinde dermatit. Cilt tahrişi ve kızarıklık mevcut.' : 
                      animalId === '3' ? 'Karın bölgesinde hafif hassasiyet. İdrar tetkikinde kan hücreleri pozitif.' : 
                      animalId === '4' ? 'Sağ arka bacakta şişlik ve hassasiyet. Radyografide diz bağında hasar tespit edildi.' : 
                      animalId === '5' ? 'Kalça ekleminde hareket kısıtlılığı, radyografide kalça displazisi bulguları.' : 
                      'Sol ön bacakta şişme ve hassasiyet. Radyografide kemik çatlağı tespit edildi.',
            primaryDiagnosis: animalId === '2' ? 'Alerjik Dermatit' : 
                             animalId === '3' ? 'İdrar Yolu Enfeksiyonu' : 
                             animalId === '4' ? 'Ön Çapraz Bağ Yırtığı' : 
                             animalId === '5' ? 'Kalça Displazisi' : 
                             'Radius kemiğinde çatlak',
            secondaryDiagnosis: animalId === '2' ? 'Pire Alerjisi' : 
                               animalId === '3' ? 'Sistit' : 
                               animalId === '4' ? 'Menisküs Hasarı' : 
                               animalId === '5' ? 'Osteoartrit' : 
                               'Yumuşak doku travması',
            treatment: animalId === '2' ? 'Antihistaminik tedavi, topikal krem, parazit kontrolü' : 
                      animalId === '3' ? 'Antibiyotik tedavisi (14 gün), bol su tüketimi, özel diyet' : 
                      animalId === '4' ? 'Anti-enflamatuar tedavi, aktivite kısıtlaması, cerrahi operasyon planlanması' : 
                      animalId === '5' ? 'Anti-enflamatuar tedavi, kilo kontrolü, kıkırdak destekleyici takviyeler' : 
                      'Bandaj, 4 hafta aktivite kısıtlaması, ağrı kesici',
            notes: animalId === '2' ? 'Hipoalerjenik mama önerildi. İki hafta sonra kontrol.' : 
                  animalId === '3' ? 'Tedavinin 7. gününde kontrol önerildi. İdrar kültürü yapıldı.' : 
                  animalId === '4' ? 'Cerrahi müdahale için planlama yapıldı. Antibiyotik tedavisi başlandı.' : 
                  animalId === '5' ? 'İleri tedavi seçenekleri konuşuldu. Fizik tedavi planlandı.' : 
                  'İyileşme süreci 4-6 hafta sürebilir.'
          }
        ],
        medicalHistory: [
          { 
            id: 1, 
            date: '10.07.2023', 
            diagnosis: 'Gastroenterit', 
            treatment: 'IV sıvı, antibiyotik, probiyotik',
            outcome: 'İyileşme'
          },
          { 
            id: 2, 
            date: animalId === '2' ? '05.05.2023' : 
                  animalId === '3' ? '12.06.2023' : 
                  animalId === '4' ? '22.09.2023' : 
                  animalId === '5' ? '18.10.2023' : 
                  '25.05.2023', 
            diagnosis: animalId === '2' ? 'Alerjik Dermatit' : 
                      animalId === '3' ? 'İdrar Yolu Enfeksiyonu' : 
                      animalId === '4' ? 'Ön Çapraz Bağ Yırtığı' : 
                      animalId === '5' ? 'Kalça Displazisi' : 
                      'Radius kemiğinde çatlak', 
            treatment: animalId === '2' ? 'Antihistaminik, topikal krem' : 
                      animalId === '3' ? 'Antibiyotik, özel diyet' : 
                      animalId === '4' ? 'Anti-enflamatuar, cerrahi' : 
                      animalId === '5' ? 'Anti-enflamatuar, kilo kontrolü' : 
                      'Bandaj, aktivite kısıtlaması',
            outcome: animalId === '2' ? 'İyileşme sürecinde' : 
                    animalId === '3' ? 'Tedavi devam ediyor' : 
                    animalId === '4' ? 'Cerrahi sonrası iyileşme sürecinde' : 
                    animalId === '5' ? 'Tedavi devam ediyor' : 
                    'İyileşme'
          },
          { 
            id: 3, 
            date: animalId === '2' ? '10.12.2022' : 
                  animalId === '3' ? '05.01.2023' : 
                  animalId === '4' ? '15.07.2022' : 
                  animalId === '5' ? '20.05.2022' : 
                  '10.01.2023', 
            diagnosis: animalId === '2' ? 'Hafif Astım' : 
                      animalId === '3' ? 'Diş Taşı' : 
                      animalId === '4' ? 'Kulak İltihabı' : 
                      animalId === '5' ? 'Deri Enfeksiyonu' : 
                      'Kulak İltihabı', 
            treatment: animalId === '2' ? 'Kortikosteroid inhalasyon' : 
                      animalId === '3' ? 'Diş temizliği önerisi' : 
                      animalId === '4' ? 'Antibiyotik damla' : 
                      animalId === '5' ? 'Antibiyotik, topikal krem' : 
                      'Antibiyotik damla, temizlik',
            outcome: animalId === '2' ? 'Kontrol altında' : 
                    animalId === '3' ? 'Tedavi planlandı' : 
                    animalId === '4' ? 'İyileşme' : 
                    animalId === '5' ? 'İyileşme' : 
                    'İyileşme'
          }
        ],
        vaccinations: [
          { 
            id: 1, 
            date: '15.03.2023', 
            vaccine: animalId === '2' || animalId === '3' ? 'Karma Aşı (FVRCP)' : 'Karma Aşı (DHPP)', 
            brand: animalId === '2' || animalId === '3' ? 'Felocell' : 'Nobivac', 
            nextDueDate: '15.03.2024',
            appliedBy: 'Dr. Mehmet Yılmaz'
          },
          { 
            id: 2, 
            date: '15.03.2022', 
            vaccine: animalId === '2' || animalId === '3' ? 'Karma Aşı (FVRCP)' : 'Karma Aşı (DHPP)', 
            brand: animalId === '2' || animalId === '3' ? 'Felocell' : 'Nobivac', 
            nextDueDate: '15.03.2023',
            appliedBy: 'Dr. Ayşe Kaya'
          },
          { 
            id: 3, 
            date: '20.04.2022', 
            vaccine: 'Kuduz Aşısı', 
            brand: 'Rabisin', 
            nextDueDate: animalId === '1' ? '05.05.2023' : '20.04.2023',
            appliedBy: 'Dr. Hasan Demir'
          }
        ],
        // Additional mock data for other sections
      };

      // Set the data based on the section
      if (section === 'clinicalExam') {
        setClinicalExams(mockData.clinicalExam);
      } else if (section === 'medicalHistory') {
        setMedicalHistory(mockData.medicalHistory);
      } else if (section === 'vaccinations') {
        setVaccinations(mockData.vaccinations);
      }
      // ... similarly for other sections

      setIsLoading(false);
    }, 800);
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
            <div className="section-header-with-button">
              <h3>Klinik İncelemeler</h3>
              <button 
                className="add-new-button"
                onClick={() => setShowNewClinicalExamModal(true)}
              >
                <span className="add-icon">+</span> Yeni İnceleme Ekle
              </button>
            </div>
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
            <div className="section-header-with-button">
              <h3>Hastalık Geçmişi</h3>
              <button 
                className="add-new-button"
                onClick={() => setShowNewDiseaseHistoryModal(true)}
              >
                <i className="add-icon">+</i> Yeni Hastalık Geçmişi
              </button>
            </div>
            
            <div className="disease-content-wrapper">
              <div className="disease-list">
                {sectionData.map(disease => (
                  <div 
                    id={`disease-${disease.id}`}
                    key={disease.id} 
                    className={`disease-item ${disease.status === 'Devam Ediyor' ? 'ongoing-disease' : ''}`}
                  >
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
              
              <div className="timeline-wrapper">
                <div className="timeline-line"></div>
                
                {sectionData
                  .sort((a, b) => new Date(a.diagnosisDate.split('.').reverse().join('-')) - new Date(b.diagnosisDate.split('.').reverse().join('-')))
                  .map((disease, index) => (
                    <div 
                      key={disease.id}
                      className="timeline-node"
                      style={{ 
                        top: `${10 + (index * 120)}px`,
                        '--node-index': index 
                      }}
                      onClick={() => document.getElementById(`disease-${disease.id}`).scrollIntoView({ behavior: 'smooth' })}
                    >
                      <div className={`timeline-marker ${disease.status === 'Devam Ediyor' ? 'marker-ongoing' : 'marker-complete'}`}></div>
                      <div className="timeline-node-label">{disease.diseaseName}</div>
                      <div className="timeline-node-date">{disease.diagnosisDate}</div>
                    </div>
                  ))
                }
              </div>
            </div>
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
        // Group imaging records by type
        const groupedImaging = sectionData.reduce((groups, image) => {
          const type = image.type;
          if (!groups[type]) {
            groups[type] = [];
          }
          groups[type].push(image);
          return groups;
        }, {});
        
        // Get unique imaging types
        const imagingTypes = Object.keys(groupedImaging);
        
        // Set active imaging type if needed (moved useEffect logic to direct conditional)
        if (imagingTypes.length > 0 && (!activeImagingType || !imagingTypes.includes(activeImagingType))) {
          // Using setTimeout to avoid state updates during render
          setTimeout(() => {
            setActiveImagingType(imagingTypes[0]);
          }, 0);
        }
        
        return (
          <div className="section-content radiology">
            <h3>Radyolojik Görüntüleme</h3>
            
            <div className="imaging-tabs">
              {imagingTypes.map(type => (
                <button 
                  key={type}
                  className={`imaging-tab-btn ${type === activeImagingType ? 'active' : ''}`}
                  onClick={() => setActiveImagingType(type)}
                >
                  {type}
                </button>
              ))}
            </div>
            
            <div className="imaging-content">
              {activeImagingType && groupedImaging[activeImagingType]?.map(imaging => (
                <div key={imaging.id} className="imaging-item">
                  <div className="imaging-header">
                    <span className="imaging-date">{imaging.date}</span>
                    <span className="imaging-region">{imaging.region}</span>
                  </div>
                  
                  <div className="imaging-container">
                    <div className="imaging-details">
                      <div className="imaging-findings">
                        <h4>Bulgular</h4>
                        <p>{imaging.findings}</p>
                      </div>
                      
                      {imaging.notes && (
                        <div className="imaging-notes">
                          <h4>Notlar</h4>
                          <p>{imaging.notes}</p>
                        </div>
                      )}
                      
                      <div className="imaging-actions">
                        <button className="action-btn download-btn">
                          <i className="download-icon">⬇️</i> İndir
                        </button>
                        <button className="action-btn print-btn">
                          <i className="print-icon">🖨️</i> Yazdır
                        </button>
                      </div>
                    </div>
                    
                    <div className="imaging-thumbnail">
                      <img src={imaging.image || defaultAnimalImage} alt={`${imaging.type} görüntüsü`} />
                      <button className="view-full-btn">Tam Boyut Görüntüle</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      
      case 'labTests':
        return (
          <div className="section-content lab-tests">
            <h3>Laboratuvar Testleri</h3>
            
            <div className="lab-test-categories">
              <div className={`lab-test-category hemogram ${expandedTests.hemogram ? '' : 'collapsed'}`}>
                <h4 onClick={() => toggleTestCategory('hemogram')}>
                  Hemogram Sonuçları
                </h4>
                <div className="lab-test-category-content">
                  <div className="lab-test-grid">
                    <div className="lab-test-param">
                      <span className="param-name">RBC:</span>
                      <span className="param-value">5.5 x10^6/μL</span>
                      <span className="param-range">4.8-6.5 x10^6/μL</span>
                    </div>
                    <div className="lab-test-param">
                      <span className="param-name">HGB:</span>
                      <span className="param-value">15.2 g/dL</span>
                      <span className="param-range">13.5-17.5 g/dL</span>
                    </div>
                    <div className="lab-test-param">
                      <span className="param-name">WBC:</span>
                      <span className="param-value">8.4 x10^3/μL</span>
                      <span className="param-range">5.5-12.5 x10^3/μL</span>
                    </div>
                    <div className="lab-test-param">
                      <span className="param-name">HCT:</span>
                      <span className="param-value">42%</span>
                      <span className="param-range">37-52%</span>
                    </div>
                    <div className="lab-test-param">
                      <span className="param-name">PCV:</span>
                      <span className="param-value">42%</span>
                      <span className="param-range">37-52%</span>
                    </div>
                    <div className="lab-test-param">
                      <span className="param-name">MCH:</span>
                      <span className="param-value">27.5 pg</span>
                      <span className="param-range">26-34 pg</span>
                    </div>
                    <div className="lab-test-param">
                      <span className="param-name">MCHC:</span>
                      <span className="param-value">34.2 g/dL</span>
                      <span className="param-range">32-36 g/dL</span>
                    </div>
                    <div className="lab-test-param">
                      <span className="param-name">PLT:</span>
                      <span className="param-value">250 x10^3/μL</span>
                      <span className="param-range">150-400 x10^3/μL</span>
                    </div>
                    <div className="lab-test-param">
                      <span className="param-name">MPV:</span>
                      <span className="param-value">10.2 fL</span>
                      <span className="param-range">8.0-12.0 fL</span>
                    </div>
                    <div className="lab-test-param">
                      <span className="param-name">PCT:</span>
                      <span className="param-value">0.27%</span>
                      <span className="param-range">0.15-0.40%</span>
                    </div>
                    <div className="lab-test-param">
                      <span className="param-name">EO:</span>
                      <span className="param-value">3%</span>
                      <span className="param-range">1-5%</span>
                    </div>
                    <div className="lab-test-param">
                      <span className="param-name">MONO:</span>
                      <span className="param-value">4%</span>
                      <span className="param-range">2-8%</span>
                    </div>
                    <div className="lab-test-param">
                      <span className="param-name">NEU:</span>
                      <span className="param-value">62%</span>
                      <span className="param-range">50-70%</span>
                    </div>
                    <div className="lab-test-param">
                      <span className="param-name">LYM:</span>
                      <span className="param-value">31%</span>
                      <span className="param-range">25-35%</span>
                    </div>
                  </div>
                  <div className="lab-test-date">Test Tarihi: 10.08.2023</div>
                </div>
              </div>
              
              <div className={`lab-test-category biochemistry ${expandedTests.biochemistry ? '' : 'collapsed'}`}>
                <h4 onClick={() => toggleTestCategory('biochemistry')}>
                  Biyokimya Sonuçları
                </h4>
                <div className="lab-test-category-content">
                  <div className="lab-test-grid">
                    <div className="lab-test-param">
                      <span className="param-name">ALT:</span>
                      <span className="param-value"><span className="abnormal-high">75 U/L</span></span>
                      <span className="param-range">10-55 U/L</span>
                    </div>
                    <div className="lab-test-param">
                      <span className="param-name">AST:</span>
                      <span className="param-value">42 U/L</span>
                      <span className="param-range">10-50 U/L</span>
                    </div>
                    <div className="lab-test-param">
                      <span className="param-name">ALP:</span>
                      <span className="param-value">90 U/L</span>
                      <span className="param-range">20-150 U/L</span>
                    </div>
                    <div className="lab-test-param">
                      <span className="param-name">GGT:</span>
                      <span className="param-value">8 U/L</span>
                      <span className="param-range">0-10 U/L</span>
                    </div>
                    <div className="lab-test-param">
                      <span className="param-name">TBIL:</span>
                      <span className="param-value">0.5 mg/dL</span>
                      <span className="param-range">0.1-0.6 mg/dL</span>
                    </div>
                    <div className="lab-test-param">
                      <span className="param-name">DBIL:</span>
                      <span className="param-value">0.2 mg/dL</span>
                      <span className="param-range">0.0-0.3 mg/dL</span>
                    </div>
                    <div className="lab-test-param">
                      <span className="param-name">ÜRE:</span>
                      <span className="param-value">32 mg/dL</span>
                      <span className="param-range">15-40 mg/dL</span>
                    </div>
                    <div className="lab-test-param">
                      <span className="param-name">KREATİNİN:</span>
                      <span className="param-value">1.1 mg/dL</span>
                      <span className="param-range">0.5-1.5 mg/dL</span>
                    </div>
                    <div className="lab-test-param">
                      <span className="param-name">SDMA:</span>
                      <span className="param-value">12 μg/dL</span>
                      <span className="param-range">0-14 μg/dL</span>
                    </div>
                    <div className="lab-test-param">
                      <span className="param-name">Glukoz:</span>
                      <span className="param-value">95 mg/dL</span>
                      <span className="param-range">70-110 mg/dL</span>
                    </div>
                    <div className="lab-test-param">
                      <span className="param-name">Laktat:</span>
                      <span className="param-value">1.8 mmol/L</span>
                      <span className="param-range">0.5-2.0 mmol/L</span>
                    </div>
                    <div className="lab-test-param">
                      <span className="param-name">Trigliserid:</span>
                      <span className="param-value">80 mg/dL</span>
                      <span className="param-range">20-150 mg/dL</span>
                    </div>
                    <div className="lab-test-param">
                      <span className="param-name">Total Protein:</span>
                      <span className="param-value">6.5 g/dL</span>
                      <span className="param-range">5.5-7.5 g/dL</span>
                    </div>
                    <div className="lab-test-param">
                      <span className="param-name">Albümin:</span>
                      <span className="param-value">3.2 g/dL</span>
                      <span className="param-range">2.7-3.8 g/dL</span>
                    </div>
                    <div className="lab-test-param">
                      <span className="param-name">Globülin:</span>
                      <span className="param-value">3.3 g/dL</span>
                      <span className="param-range">2.8-3.8 g/dL</span>
                    </div>
                    <div className="lab-test-param">
                      <span className="param-name">Na:</span>
                      <span className="param-value">145 mmol/L</span>
                      <span className="param-range">138-150 mmol/L</span>
                    </div>
                    <div className="lab-test-param">
                      <span className="param-name">K:</span>
                      <span className="param-value">4.2 mmol/L</span>
                      <span className="param-range">3.5-5.0 mmol/L</span>
                    </div>
                    <div className="lab-test-param">
                      <span className="param-name">Cl:</span>
                      <span className="param-value">105 mmol/L</span>
                      <span className="param-range">98-110 mmol/L</span>
                    </div>
                    <div className="lab-test-param">
                      <span className="param-name">P:</span>
                      <span className="param-value">3.8 mg/dL</span>
                      <span className="param-range">2.5-5.0 mg/dL</span>
                    </div>
                    <div className="lab-test-param">
                      <span className="param-name">Mg:</span>
                      <span className="param-value">2.1 mg/dL</span>
                      <span className="param-range">1.7-2.5 mg/dL</span>
                    </div>
                    <div className="lab-test-param">
                      <span className="param-name">Amilaz:</span>
                      <span className="param-value">450 U/L</span>
                      <span className="param-range">200-800 U/L</span>
                    </div>
                    <div className="lab-test-param">
                      <span className="param-name">Lipaz:</span>
                      <span className="param-value">120 U/L</span>
                      <span className="param-range">50-250 U/L</span>
                    </div>
                    <div className="lab-test-param">
                      <span className="param-name">TLI:</span>
                      <span className="param-value">28 μg/L</span>
                      <span className="param-range">8.5-35 μg/L</span>
                    </div>
                    <div className="lab-test-param">
                      <span className="param-name">PLI:</span>
                      <span className="param-value">195 μg/L</span>
                      <span className="param-range">0-200 μg/L</span>
                    </div>
                  </div>
                  <div className="lab-test-date">Test Tarihi: 10.08.2023</div>
                </div>
              </div>

              <div className={`lab-test-category urine ${expandedTests.urine ? '' : 'collapsed'}`}>
                <h4 onClick={() => toggleTestCategory('urine')}>
                  İdrar Analizi
                </h4>
                <div className="lab-test-category-content">
                  <div className={`lab-test-subcategory ${expandedTests.urinePhysical ? '' : 'collapsed'}`}>
                    <h5 onClick={() => toggleTestCategory('urinePhysical')}>Fiziksel Analiz</h5>
                    <div className="lab-test-subcategory-content">
                      <div className="lab-test-grid">
                        <div className="lab-test-param">
                          <span className="param-name">Renk:</span>
                          <span className="param-value">Sarı</span>
                          <span className="param-range">Sarı-Amber</span>
                        </div>
                        <div className="lab-test-param">
                          <span className="param-name">Koku:</span>
                          <span className="param-value">Normal</span>
                          <span className="param-range">-</span>
                        </div>
                        <div className="lab-test-param">
                          <span className="param-name">Yoğunluk:</span>
                          <span className="param-value">1.020</span>
                          <span className="param-range">1.015-1.045</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className={`lab-test-subcategory ${expandedTests.urineChemical ? '' : 'collapsed'}`}>
                    <h5 onClick={() => toggleTestCategory('urineChemical')}>Kimyasal Analiz</h5>
                    <div className="lab-test-subcategory-content">
                      <div className="lab-test-grid">
                        <div className="lab-test-param">
                          <span className="param-name">pH:</span>
                          <span className="param-value">6.5</span>
                          <span className="param-range">5.5-7.0</span>
                        </div>
                        <div className="lab-test-param">
                          <span className="param-name">Protein:</span>
                          <span className="param-value">Negatif</span>
                          <span className="param-range">Negatif</span>
                        </div>
                        <div className="lab-test-param">
                          <span className="param-name">Glukoz:</span>
                          <span className="param-value">Negatif</span>
                          <span className="param-range">Negatif</span>
                        </div>
                        <div className="lab-test-param">
                          <span className="param-name">Keton:</span>
                          <span className="param-value">Negatif</span>
                          <span className="param-range">Negatif</span>
                        </div>
                        <div className="lab-test-param">
                          <span className="param-name">Bilirubin:</span>
                          <span className="param-value">Negatif</span>
                          <span className="param-range">Negatif</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className={`lab-test-subcategory ${expandedTests.urineMicroscopic ? '' : 'collapsed'}`}>
                    <h5 onClick={() => toggleTestCategory('urineMicroscopic')}>Mikroskobik Analiz</h5>
                    <div className="lab-test-subcategory-content">
                      <div className="lab-test-grid">
                        <div className="lab-test-param">
                          <span className="param-name">Eritrosit:</span>
                          <span className="param-value">0-2 /HPF</span>
                          <span className="param-range">0-5 /HPF</span>
                        </div>
                        <div className="lab-test-param">
                          <span className="param-name">Lökosit:</span>
                          <span className="param-value">0-3 /HPF</span>
                          <span className="param-range">0-5 /HPF</span>
                        </div>
                        <div className="lab-test-param">
                          <span className="param-name">Kristal:</span>
                          <span className="param-value">Yok</span>
                          <span className="param-range">-</span>
                        </div>
                        <div className="lab-test-param">
                          <span className="param-name">Epitel Hücresi:</span>
                          <span className="param-value">Nadir</span>
                          <span className="param-range">-</span>
                        </div>
                        <div className="lab-test-param">
                          <span className="param-name">Bakteriyel Varlık:</span>
                          <span className="param-value">Yok</span>
                          <span className="param-range">-</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="lab-test-date">Test Tarihi: 15.08.2023</div>
                </div>
              </div>

              <div className={`lab-test-category feces ${expandedTests.feces ? '' : 'collapsed'}`}>
                <h4 onClick={() => toggleTestCategory('feces')}>
                  Dışkı Analizleri
                </h4>
                <div className="lab-test-category-content">
                  <div className="lab-test-grid">
                    <div className="lab-test-param">
                      <span className="param-name">Parazit Yumurtası:</span>
                      <span className="param-value">Negatif</span>
                      <span className="param-range">-</span>
                    </div>
                    <div className="lab-test-param">
                      <span className="param-name">Parazit Larvası:</span>
                      <span className="param-value">Negatif</span>
                      <span className="param-range">-</span>
                    </div>
                    <div className="lab-test-param">
                      <span className="param-name">Protozoon Varlığı:</span>
                      <span className="param-value">Negatif</span>
                      <span className="param-range">-</span>
                    </div>
                    <div className="lab-test-param">
                      <span className="param-name">Flotasyon Sonucu:</span>
                      <span className="param-value">Negatif</span>
                      <span className="param-range">-</span>
                    </div>
                    <div className="lab-test-param">
                      <span className="param-name">Sedimentasyon Sonucu:</span>
                      <span className="param-value">Normal</span>
                      <span className="param-range">-</span>
                    </div>
                    <div className="lab-test-param">
                      <span className="param-name">Giardia:</span>
                      <span className="param-value">Negatif</span>
                      <span className="param-range">Negatif</span>
                    </div>
                    <div className="lab-test-param">
                      <span className="param-name">Rotavirüs:</span>
                      <span className="param-value">Negatif</span>
                      <span className="param-range">Negatif</span>
                    </div>
                    <div className="lab-test-param">
                      <span className="param-name">Coronavirüs:</span>
                      <span className="param-value">Negatif</span>
                      <span className="param-range">Negatif</span>
                    </div>
                    <div className="lab-test-param">
                      <span className="param-name">E. Coli Test Kiti:</span>
                      <span className="param-value">Negatif</span>
                      <span className="param-range">Negatif</span>
                    </div>
                    <div className="lab-test-param wide">
                      <span className="param-name">Direkt Smear Sonucu:</span>
                      <span className="param-value">Normal mikrofloraya ait mikroorganizmalar gözlendi.</span>
                      <span className="param-range">-</span>
                    </div>
                  </div>
                  <div className="lab-test-date">Test Tarihi: 16.08.2023</div>
                </div>
              </div>
              
              <div className={`lab-test-category serology ${expandedTests.serology ? '' : 'collapsed'}`}>
                <h4 onClick={() => toggleTestCategory('serology')}>
                  Serolojik Testler
                </h4>
                <div className="lab-test-category-content">
                  <div className="lab-test-grid">
                    <div className="lab-test-param wide">
                      <span className="param-name">ELISA:</span>
                      <span className="param-value">Negatif (Leishmania)</span>
                      <span className="param-range">Negatif</span>
                    </div>
                    <div className="lab-test-param wide">
                      <span className="param-name">IFAT:</span>
                      <span className="param-value">Negatif (Ehrlichia)</span>
                      <span className="param-range">Negatif</span>
                    </div>
                    <div className="lab-test-param wide">
                      <span className="param-name">Aglütinasyon:</span>
                      <span className="param-value">Negatif (Brucella)</span>
                      <span className="param-range">Negatif</span>
                    </div>
                    <div className="lab-test-param wide">
                      <span className="param-name">Presipitasyon:</span>
                      <span className="param-value">Negatif</span>
                      <span className="param-range">Negatif</span>
                    </div>
                  </div>
                  <div className="lab-test-date">Test Tarihi: 20.08.2023</div>
                </div>
              </div>
              
              <div className={`lab-test-category microbiology ${expandedTests.microbiology ? '' : 'collapsed'}`}>
                <h4 onClick={() => toggleTestCategory('microbiology')}>
                  Mikrobiyolojik Kültür
                </h4>
                <div className="lab-test-category-content">
                  <div className="lab-test-grid">
                    <div className="lab-test-param wide">
                      <span className="param-name">Mac Conkey:</span>
                      <span className="param-value">Üreme yok</span>
                      <span className="param-range">-</span>
                    </div>
                    <div className="lab-test-param wide">
                      <span className="param-name">Blood Agar:</span>
                      <span className="param-value">Normal deri flora bakterileri izole edildi</span>
                      <span className="param-range">-</span>
                    </div>
                  </div>
                  <div className="lab-test-date">Test Tarihi: 25.08.2023</div>
                </div>
              </div>
              
              <div className={`lab-test-category molecular ${expandedTests.molecular ? '' : 'collapsed'}`}>
                <h4 onClick={() => toggleTestCategory('molecular')}>
                  Moleküler Tanı
                </h4>
                <div className="lab-test-category-content">
                  <div className="lab-test-grid">
                    <div className="lab-test-param wide">
                      <span className="param-name">PCR:</span>
                      <span className="param-value">Negatif (Parvovirüs)</span>
                      <span className="param-range">Negatif</span>
                    </div>
                    <div className="lab-test-param wide">
                      <span className="param-name">RT-PCR:</span>
                      <span className="param-value">Negatif (Distemper)</span>
                      <span className="param-range">Negatif</span>
                    </div>
                  </div>
                  <div className="lab-test-date">Test Tarihi: 25.08.2023</div>
                </div>
              </div>
              
              <div className={`lab-test-category cytology ${expandedTests.cytology ? '' : 'collapsed'}`}>
                <h4 onClick={() => toggleTestCategory('cytology')}>
                  Sitoloji ve Histopatoloji
                </h4>
                <div className="lab-test-category-content">
                  <div className={`lab-test-subcategory ${expandedTests.cytologyResults ? '' : 'collapsed'}`}>
                    <h5 onClick={() => toggleTestCategory('cytologyResults')}>Sitoloji</h5>
                    <div className="lab-test-subcategory-content">
                      <div className="lab-test-grid">
                        <div className="lab-test-param wide">
                          <span className="param-name">Aspirat (Kutanöz):</span>
                          <span className="param-value">Herhangi bir malignite/enfeksiyon bulgusuna rastlanmadı. Normal deri hücreleri gözlendi.</span>
                          <span className="param-range">-</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className={`lab-test-subcategory ${expandedTests.histologyResults ? '' : 'collapsed'}`}>
                    <h5 onClick={() => toggleTestCategory('histologyResults')}>Histopatoloji</h5>
                    <div className="lab-test-subcategory-content">
                      <div className="lab-test-param wide">
                        <span className="param-name">Biyopsi (Deri):</span>
                        <span className="param-value">İnceleme sonucu herhangi bir patolojik bulguya rastlanmadı.</span>
                        <span className="param-range">-</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="cytology-images">
                    <div className="cytology-image">
                      <img src={defaultAnimalImage} alt="Sitoloji görüntüsü" />
                      <div className="image-caption">Aspirat sitolojisi - 25.08.2023</div>
                    </div>
                    <div className="cytology-image">
                      <img src={defaultAnimalImage} alt="Histopatoloji görüntüsü" />
                      <div className="image-caption">Histopatoloji - 25.08.2023</div>
                    </div>
                  </div>
                  <div className="lab-test-date">Test Tarihi: 25.08.2023</div>
                </div>
              </div>
              
              <div className={`lab-test-category hormone ${expandedTests.hormone ? '' : 'collapsed'}`}>
                <h4 onClick={() => toggleTestCategory('hormone')}>
                  Hormon Testleri
                </h4>
                <div className="lab-test-category-content">
                  <div className="lab-test-grid">
                    <div className="lab-test-param">
                      <span className="param-name">T3:</span>
                      <span className="param-value">1.2 nmol/L</span>
                      <span className="param-range">0.8-2.1 nmol/L</span>
                    </div>
                    <div className="lab-test-param">
                      <span className="param-name">T4:</span>
                      <span className="param-value">32 nmol/L</span>
                      <span className="param-range">15-45 nmol/L</span>
                    </div>
                    <div className="lab-test-param">
                      <span className="param-name">TSH:</span>
                      <span className="param-value">0.3 ng/mL</span>
                      <span className="param-range">0.1-0.5 ng/mL</span>
                    </div>
                    <div className="lab-test-param">
                      <span className="param-name">Kortizol:</span>
                      <span className="param-value">4.2 μg/dL</span>
                      <span className="param-range">1.0-6.0 μg/dL</span>
                    </div>
                    <div className="lab-test-param">
                      <span className="param-name">Östradiol:</span>
                      <span className="param-value">25 pg/mL</span>
                      <span className="param-range">Erkek: &lt;30 pg/mL</span>
                    </div>
                    <div className="lab-test-param">
                      <span className="param-name">Progesteron:</span>
                      <span className="param-value">0.5 ng/mL</span>
                      <span className="param-range">Erkek: &lt;1.0 ng/mL</span>
                    </div>
                  </div>
                  <div className="lab-test-date">Test Tarihi: 01.09.2023</div>
                </div>
              </div>
              
              <div className={`lab-test-category biopsy ${expandedTests.biopsy ? '' : 'collapsed'}`}>
                <h4 onClick={() => toggleTestCategory('biopsy')}>
                  Biyopsi Sonuçları
                </h4>
                <div className="lab-test-category-content">
                  <div className="lab-test-grid">
                    <div className="lab-test-param wide">
                      <span className="param-name">İnsizyonel biyopsi:</span>
                      <span className="param-value">Negatif - Normal doku örneği</span>
                      <span className="param-range">-</span>
                    </div>
                    <div className="lab-test-param wide">
                      <span className="param-name">Ekzisyonel biyopsi:</span>
                      <span className="param-value">Yapılmadı</span>
                      <span className="param-range">-</span>
                    </div>
                    <div className="lab-test-param wide">
                      <span className="param-name">İnce iğne aspirasyon biyopsisi (FNA):</span>
                      <span className="param-value">Normal hücre örneği, malignite bulgusu yok</span>
                      <span className="param-range">-</span>
                    </div>
                    <div className="lab-test-param wide">
                      <span className="param-name">Trukat (core) biyopsi:</span>
                      <span className="param-value">Yapılmadı</span>
                      <span className="param-range">-</span>
                    </div>
                    <div className="lab-test-param wide">
                      <span className="param-name">Punch biyopsi:</span>
                      <span className="param-value">Yapılmadı</span>
                      <span className="param-range">-</span>
                    </div>
                    <div className="lab-test-param wide">
                      <span className="param-name">Endoskopik biyopsi:</span>
                      <span className="param-value">Yapılmadı</span>
                      <span className="param-range">-</span>
                    </div>
                    <div className="lab-test-param wide">
                      <span className="param-name">Laparoskopik biyopsi:</span>
                      <span className="param-value">Yapılmadı</span>
                      <span className="param-range">-</span>
                    </div>
                    <div className="lab-test-param wide">
                      <span className="param-name">Kemik iliği biyopsisi:</span>
                      <span className="param-value">Yapılmadı</span>
                      <span className="param-range">-</span>
                    </div>
                    <div className="lab-test-param wide">
                      <span className="param-name">Sürüntü (brush) biyopsi:</span>
                      <span className="param-value">Yapılmadı</span>
                      <span className="param-range">-</span>
                    </div>
                    <div className="lab-test-param wide">
                      <span className="param-name">Trepan biyopsi:</span>
                      <span className="param-value">Yapılmadı</span>
                      <span className="param-range">-</span>
                    </div>
                    <div className="lab-test-param wide">
                      <span className="param-name">Küretaj biyopsisi:</span>
                      <span className="param-value">Yapılmadı</span>
                      <span className="param-range">-</span>
                    </div>
                    <div className="lab-test-param wide">
                      <span className="param-name">Sitobrush biyopsisi:</span>
                      <span className="param-value">Yapılmadı</span>
                      <span className="param-range">-</span>
                    </div>
                    <div className="lab-test-param wide">
                      <span className="param-name">Açık cerrahi biyopsi:</span>
                      <span className="param-value">Yapılmadı</span>
                      <span className="param-range">-</span>
                    </div>
                    <div className="lab-test-param wide">
                      <span className="param-name">Transrektal biyopsi:</span>
                      <span className="param-value">Yapılmadı</span>
                      <span className="param-range">-</span>
                    </div>
                    <div className="lab-test-param wide">
                      <span className="param-name">Transabdominal biyopsi:</span>
                      <span className="param-value">Yapılmadı</span>
                      <span className="param-range">-</span>
                    </div>
                    <div className="lab-test-param wide">
                      <span className="param-name">İntraoperatif biyopsi:</span>
                      <span className="param-value">Yapılmadı</span>
                      <span className="param-range">-</span>
                    </div>
                    <div className="lab-test-param wide">
                      <span className="param-name">Bukkal biyopsi:</span>
                      <span className="param-value">Yapılmadı</span>
                      <span className="param-range">-</span>
                    </div>
                    <div className="lab-test-param wide">
                      <span className="param-name">Deri biyopsisi:</span>
                      <span className="param-value">Normal deri dokusu, patolojik bulgu yok</span>
                      <span className="param-range">-</span>
                    </div>
                    <div className="lab-test-param wide">
                      <span className="param-name">Kas biyopsisi:</span>
                      <span className="param-value">Yapılmadı</span>
                      <span className="param-range">-</span>
                    </div>
                    <div className="lab-test-param wide">
                      <span className="param-name">Lenf nodu biyopsisi:</span>
                      <span className="param-value">Yapılmadı</span>
                      <span className="param-range">-</span>
                    </div>
                  </div>
                  <div className="lab-test-date">Test Tarihi: 05.09.2023</div>
                </div>
              </div>
            </div>
            
            <div className="test-actions">
              <button className="action-btn print-report">
                <i className="print-icon">🖨️</i> Tüm Raporu Yazdır
              </button>
              <button className="action-btn export-report">
                <i className="export-icon">⬇️</i> PDF Olarak İndir
              </button>
              <button className="action-btn add-new-test">
                <i className="add-icon">➕</i> Yeni Test Ekle
              </button>
            </div>
          </div>
        );
      
      case 'prescriptions':
        return (
          <div className="section-content prescriptions">
            <div className="section-header-with-button">
              <h3>Geçmiş Reçeteler</h3>
              <button className="add-new-button" onClick={() => setShowNewPrescriptionModal(true)}>
                <i className="add-icon">➕</i> Yeni Reçete Ekle
              </button>
            </div>
            <div className="prescriptions-container">
              {sectionData.map(prescription => (
                <div key={prescription.id} className="prescription-card">
                  <div className="prescription-header">
                    <div className="prescription-date-container">
                      <i className="prescription-icon">📋</i>
                      <span className="prescription-date">{prescription.date}</span>
                    </div>
                    <span className="prescription-duration">
                      <i className="duration-icon">⏱️</i> {prescription.duration}
                    </span>
                  </div>
                  
                  <div className="prescription-content">
                    <h4>İlaçlar</h4>
                    <div className="medications-list">
                      {prescription.medications.map((med, index) => (
                        <div key={index} className="medication-item">
                          <i className="medication-icon">{
                            med.toLowerCase().includes('tablet') ? '💊' : 
                            med.toLowerCase().includes('şurup') ? '🧪' :
                            med.toLowerCase().includes('damla') ? '💧' : 
                            med.toLowerCase().includes('enjeksiyon') ? '💉' : 
                            med.toLowerCase().includes('krem') ? '🧴' : '💊'
                          }</i>
                          <span className="medication-name">{med}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="prescription-actions">
                    <button className="prescription-btn print-btn">
                      <i className="print-icon">🖨️</i> Yazdır
                    </button>
                    <button className="prescription-btn details-btn">
                      <i className="details-icon">🔍</i> Detaylar
                    </button>
                    <button className="prescription-btn copy-btn">
                      <i className="copy-icon">📋</i> Kopyala
                    </button>
                    <button className="prescription-btn renew-btn">
                      <i className="renew-icon">🔄</i> Yenile
                    </button>
                  </div>
                </div>
              ))}
            </div>
            
            {sectionData.length === 0 && (
              <div className="no-prescriptions">
                <i className="no-data-icon">📋</i>
                <p>Kayıtlı reçete bulunmamaktadır.</p>
              </div>
            )}

            {/* Yeni Reçete Ekleme Modal */}
            {showNewPrescriptionModal && (
              <div className="modal-overlay">
                <div className="modal-content prescription-modal">
                  <div className="modal-header">
                    <h3>Yeni Reçete Ekle</h3>
                    <button className="close-modal-btn" onClick={() => setShowNewPrescriptionModal(false)}>✖</button>
                  </div>
                  <div className="modal-body">
                    <div className="form-group">
                      <label>Tedavi Süresi:</label>
                      <input 
                        type="text" 
                        placeholder="Örn: 7 gün" 
                        value={newPrescription.duration}
                        onChange={(e) => setNewPrescription({...newPrescription, duration: e.target.value})}
                      />
                    </div>
                    <div className="form-group">
                      <label>Hekim:</label>
                      <input 
                        type="text" 
                        placeholder="Reçeteyi yazan hekim" 
                        value={newPrescription.prescribedBy}
                        onChange={(e) => setNewPrescription({...newPrescription, prescribedBy: e.target.value})}
                      />
                    </div>
                    
                    <div className="form-group">
                      <label>İlaçlar:</label>
                      {newPrescription.medications.map((med, index) => (
                        <div key={index} className="medication-input-group">
                          <input
                            type="text"
                            placeholder="Örn: Amoksisilin 250mg Tablet (2x1)"
                            value={med}
                            onChange={(e) => {
                              const updatedMeds = [...newPrescription.medications];
                              updatedMeds[index] = e.target.value;
                              setNewPrescription({...newPrescription, medications: updatedMeds});
                            }}
                          />
                          {index === newPrescription.medications.length - 1 ? (
                            <button 
                              className="add-item-btn" 
                              onClick={() => setNewPrescription({
                                ...newPrescription, 
                                medications: [...newPrescription.medications, ""]
                              })}
                            >
                              <i>➕</i>
                            </button>
                          ) : (
                            <button 
                              className="remove-item-btn" 
                              onClick={() => {
                                const updatedMeds = [...newPrescription.medications];
                                updatedMeds.splice(index, 1);
                                setNewPrescription({...newPrescription, medications: updatedMeds});
                              }}
                            >
                              <i>✖</i>
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="modal-footer">
                    <button className="cancel-btn" onClick={() => setShowNewPrescriptionModal(false)}>İptal</button>
                    <button className="save-btn" onClick={handleAddPrescription}>Kaydet</button>
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      
      case 'vaccinations':
        // Planlanmış ve tamamlanmış aşıları ayır
        const plannedVaccinations = sectionData.filter(vacc => vacc.status !== 'Tamamlandı');
        const completedVaccinations = sectionData.filter(vacc => vacc.status === 'Tamamlandı');
        
        // Sıralamayı tarih bazında yap
        completedVaccinations.sort((a, b) => new Date(b.date.split('.').reverse().join('-')) - new Date(a.date.split('.').reverse().join('-')));
        plannedVaccinations.sort((a, b) => new Date(a.nextDue.split('.').reverse().join('-')) - new Date(b.nextDue.split('.').reverse().join('-')));
        
        // Tüm aşıları birleştir, planlanmışlar önce gelsin
        const orderedVaccinations = [...plannedVaccinations, ...completedVaccinations];
        
        return (
          <div className="section-content vaccinations">
            <div className="vaccinations-header">
              <h3>Aşı Takip Sistemi</h3>
              <button 
                className="add-vaccine-button" 
                onClick={() => setShowNewVaccineModal(true)}
              >
                <i className="add-icon">➕</i> Yeni Aşı Ekle
              </button>
            </div>
            
            <div className="vaccinations-container">
              {orderedVaccinations.map(vaccination => (
                <div key={vaccination.id} className={`vaccination-card ${vaccination.status === 'Tamamlandı' ? 'completed' : 'planned'}`}>
                  <div className="vaccination-header">
                    <div className="vaccination-date-container">
                      <div className="date-icon">📋</div>
                      <div className="vaccination-date">
                        {vaccination.status === 'Tamamlandı' 
                          ? vaccination.date 
                          : vaccination.nextDue}
                      </div>
                    </div>
                    <div className="vaccination-duration">
                      <div className="duration-icon">⏱️</div>
                      <div className="duration-text">
                        {vaccination.status === 'Tamamlandı' 
                          ? 'Geçerlilik: 1 yıl'
                          : 'Planlanmış'}
                      </div>
                    </div>
                  </div>
                  
                  <div className="vaccination-content">
                    <h4>Aşılar</h4>
                    <div className="vaccination-items">
                      <div className="vaccination-item">
                        <div className="item-icon">💉</div>
                        <div className="item-name">{vaccination.vaccine}</div>
                      </div>
                      {vaccination.notes && (
                        <div className="vaccination-item">
                          <div className="item-icon">📝</div>
                          <div className="item-name">{vaccination.notes}</div>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="vaccination-actions">
                    <button className="action-btn yazdır-btn">
                      <div className="action-icon">🖨️</div>
                      <div className="action-text">Yazdır</div>
                    </button>
                    <button className="action-btn detaylar-btn">
                      <div className="action-icon">🔍</div>
                      <div className="action-text">Detaylar</div>
                    </button>
                    {vaccination.status !== 'Tamamlandı' && (
                      <button className="action-btn yenile-btn">
                        <div className="action-icon">🔄</div>
                        <div className="action-text">Randevu Al</div>
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
            
            {sectionData.length === 0 && (
              <div className="no-prescriptions">
                <i className="no-data-icon">⚠️</i>
                <p>Kayıtlı alerji veya kronik rahatsızlık bulunmamaktadır.</p>
              </div>
            )}
            
            {showNewConditionModal && (
              <AddConditionModal 
                onClose={() => setShowNewConditionModal(false)} 
                onSave={handleAddCondition} 
              />
            )}
          </div>
        );
      
      case 'necropsy':
        return (
          <div className="section-content necropsy">
            <h3>Nekropsi Bulguları</h3>
            <div className="necropsy-info-container">
              <div className="necropsy-info-section">
                <div className="necropsy-info-header">
                  <h4>RAPOR BİLGİLERİ</h4>
                </div>
                <div className="necropsy-info-content">
                  <div className="necropsy-info-item">
                    <span className="info-label">RAPOR NO:</span>
                    <span className="info-value">
                      {sectionData.length > 0 && sectionData[0].report ? 
                        sectionData[0].report.reportNo : '2025-NEK-0040'}
                    </span>
                  </div>
                  <div className="necropsy-info-item">
                    <span className="info-label">TARİH:</span>
                    <span className="info-value">
                      {sectionData.length > 0 && sectionData[0].report ? 
                        sectionData[0].report.date : '03.05.2035'}
                    </span>
                  </div>
                  <div className="necropsy-info-item">
                    <span className="info-label">NEKROPSİ YAPAN HEKİM:</span>
                    <span className="info-value">
                      {sectionData.length > 0 && sectionData[0].report ? 
                        sectionData[0].report.performer : 'MERT ÖZÇELİK'}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="necropsy-info-section">
                <div className="necropsy-info-header">
                  <h4>HAYVANA AİT BİLGİLER</h4>
                </div>
                <div className="necropsy-info-content">
                  <div className="necropsy-info-item">
                    <span className="info-label">TÜR:</span>
                    <span className="info-value">
                      {sectionData.length > 0 && sectionData[0].animal ? 
                        sectionData[0].animal.species : 'KEDİ'}
                    </span>
                  </div>
                  <div className="necropsy-info-item">
                    <span className="info-label">IRK:</span>
                    <span className="info-value">
                      {sectionData.length > 0 && sectionData[0].animal ? 
                        sectionData[0].animal.breed : 'AKKARAMAN'}
                    </span>
                  </div>
                  <div className="necropsy-info-item">
                    <span className="info-label">YAŞ:</span>
                    <span className="info-value">
                      {sectionData.length > 0 && sectionData[0].animal ? 
                        sectionData[0].animal.age : '8'}
                    </span>
                  </div>
                  <div className="necropsy-info-item">
                    <span className="info-label">TANIMLAMA:</span>
                    <span className="info-value">
                      {sectionData.length > 0 && sectionData[0].animal ? 
                        sectionData[0].animal.identification : 'ÇİP NO: 987654321098765'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="necropsy-assessment-sections">
              <div className="necropsy-section">
                <div 
                  className="necropsy-section-header" 
                  onClick={() => toggleSection('generalCondition')}
                >
                  <h4>1. GENEL DURUM KRİTERLERİ</h4>
                  <span className="toggle-icon">{expandedSections.generalCondition ? '▼' : '►'}</span>
                </div>
                <div className={`necropsy-section-content ${expandedSections.generalCondition ? 'expanded' : 'collapsed'}`}>
                  <div className="necropsy-criteria-item">
                    <span className="criteria-label">VÜCUT KONDİSYONU:</span>
                    <span className="criteria-value">Normal</span>
                  </div>
                  <div className="necropsy-criteria-item">
                    <span className="criteria-label">HİDRATASYON DURUMU:</span>
                    <span className="criteria-value">Hafif dehidrasyon (cilt elastikiyeti azalmış, göz çöküklüğü yok)</span>
                  </div>
                  <div className="necropsy-criteria-item">
                    <span className="criteria-label">ÖLÜM ŞEKLİ:</span>
                    <span className="criteria-value">Doğal, kronik</span>
                  </div>
                  <div className="necropsy-criteria-item">
                    <span className="criteria-label">KADAVRA DURUMU:</span>
                    <span className="criteria-value">Rigor mortis şekillenmiş, minimal otoliz başlangıcı</span>
                  </div>
                </div>
              </div>
              
              <div className="necropsy-section">
                <div 
                  className="necropsy-section-header"
                  onClick={() => toggleSection('externalExam')}
                >
                  <h4>2. DIŞ MUAYENE KRİTERLERİ</h4>
                  <span className="toggle-icon">{expandedSections.externalExam ? '▼' : '►'}</span>
                </div>
                <div className={`necropsy-section-content ${expandedSections.externalExam ? 'expanded' : 'collapsed'}`}>
                  <div className="necropsy-criteria-item">
                    <span className="criteria-label">CİLT VE TÜY DURUMU:</span>
                    <span className="criteria-value">Tüylerde matlaşma ve dökülme, sırtta 3x4 cm çaplı ülseratif lezyon</span>
                  </div>
                  <div className="necropsy-criteria-item">
                    <span className="criteria-label">DOĞAL DELİKLER:</span>
                    <span className="criteria-value">Burun deliklerinde seröz akıntı, anüs çevresinde kuruma</span>
                  </div>
                  <div className="necropsy-criteria-item">
                    <span className="criteria-label">ANORMAL YAPILAR:</span>
                    <span className="criteria-value">Sol arka ekstremitede 2x3 cm çaplı sert kitle (muhtemel tümör)</span>
                  </div>
                </div>
              </div>
              
              <div className="necropsy-section">
                <div 
                  className="necropsy-section-header"
                  onClick={() => toggleSection('internalExam')}
                >
                  <h4>3. İÇ ORGAN KRİTERLERİ (MAKROSKOPİK)</h4>
                  <span className="toggle-icon">{expandedSections.internalExam ? '▼' : '►'}</span>
                </div>
                <div className={`necropsy-section-content ${expandedSections.internalExam ? 'expanded' : 'collapsed'}`}>
                  <div className="necropsy-criteria-group">
                    <div className="criteria-group-header">Kardiyovasküler Sistem</div>
                    <div className="necropsy-criteria-item">
                      <span className="criteria-label">Kalp büyüklüğü:</span>
                      <span className="criteria-value">Normal</span>
                    </div>
                    <div className="necropsy-criteria-item">
                      <span className="criteria-label">Kapak yapısı, pıhtı varlığı:</span>
                      <span className="criteria-value">Mitral kapakta fibrotik kalınlaşma, sol ventrikülde post-mortem pıhtı</span>
                    </div>
                    <div className="necropsy-criteria-item">
                      <span className="criteria-label">Perikard sıvısı:</span>
                      <span className="criteria-value">Hafif artmış (8 ml, berrak)</span>
                    </div>
                  </div>
                  
                  <div className="necropsy-criteria-group">
                    <div className="criteria-group-header">Solunum Sistemi</div>
                    <div className="necropsy-criteria-item">
                      <span className="criteria-label">Akciğerlerin renk ve kıvamı:</span>
                      <span className="criteria-value">Bazal bölgelerde koyu kırmızı, ödemli, kranial loblar amfizematöz</span>
                    </div>
                    <div className="necropsy-criteria-item">
                      <span className="criteria-label">Trakeal mukus varlığı:</span>
                      <span className="criteria-value">Köpüklü eksüdat mevcut</span>
                    </div>
                  </div>
                  
                  <div className="necropsy-criteria-group">
                    <div className="criteria-group-header">Sinir Sistemi</div>
                    <div className="necropsy-criteria-item">
                      <span className="criteria-label">Beyin ödemi, kanama:</span>
                      <span className="criteria-value">Hafif ödem, kanama yok</span>
                    </div>
                    <div className="necropsy-criteria-item">
                      <span className="criteria-label">Meninkslerde kalınlaşma:</span>
                      <span className="criteria-value">Yok</span>
                    </div>
                    <div className="necropsy-criteria-item">
                      <span className="criteria-label">Spinal kordda lezyon:</span>
                      <span className="criteria-value">Saptanmadı</span>
                    </div>
                  </div>
                  
                  <div className="necropsy-criteria-group">
                    <div className="criteria-group-header">Karaciğer, Dalak, Böbrek</div>
                    <div className="necropsy-criteria-item">
                      <span className="criteria-label">Karaciğer:</span>
                      <span className="criteria-value">Büyümüş, düzensiz yüzey, kesit yüzünde sarımsı alanlar (nekroz), kıvam sertleşmiş</span>
                    </div>
                    <div className="necropsy-criteria-item">
                      <span className="criteria-label">Dalak:</span>
                      <span className="criteria-value">Normal büyüklük, foliküller belirgin</span>
                    </div>
                    <div className="necropsy-criteria-item">
                      <span className="criteria-label">Böbrek:</span>
                      <span className="criteria-value">Soluk, korteks-medulla sınırı belirsiz, kapsül yapışık</span>
                    </div>
                  </div>
                  
                  <div className="necropsy-criteria-group">
                    <div className="criteria-group-header">Sindirim Sistemi</div>
                    <div className="necropsy-criteria-item">
                      <span className="criteria-label">Mide içeriği:</span>
                      <span className="criteria-value">Az miktarda sıvı, koyu yeşil</span>
                    </div>
                    <div className="necropsy-criteria-item">
                      <span className="criteria-label">Barsak:</span>
                      <span className="criteria-value">İnce barsaklarda mukozal hiperemi, ülserasyon yok</span>
                    </div>
                    <div className="necropsy-criteria-item">
                      <span className="criteria-label">Gaz birikimi:</span>
                      <span className="criteria-value">Kolonda orta derecede gaz birikimi</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="necropsy-section">
                <div 
                  className="necropsy-section-header"
                  onClick={() => toggleSection('microscopicFindings')}
                >
                  <h4>4. SİSTEM / ORGAN MİKROSKOBİK BULGULAR</h4>
                  <span className="toggle-icon">{expandedSections.microscopicFindings ? '▼' : '►'}</span>
                </div>
                <div className={`necropsy-section-content ${expandedSections.microscopicFindings ? 'expanded' : 'collapsed'}`}>
                  <div className="necropsy-criteria-item">
                    <span className="criteria-label">Karaciğer:</span>
                    <span className="criteria-value">Hücre içi yağlanma (steatoz), hepatosit nekrozu, portal inflamasyon</span>
                  </div>
                  <div className="necropsy-criteria-item">
                    <span className="criteria-label">Akciğer:</span>
                    <span className="criteria-value">Alveollerde ödem, konjesyon, makrofaj birikimi, pnömonik alanlar</span>
                  </div>
                  <div className="necropsy-criteria-item">
                    <span className="criteria-label">Böbrek:</span>
                    <span className="criteria-value">Glomerül dejenerasyonu, tübüler nekroz, interstisyel lenfosit infiltrasyonu</span>
                  </div>
                  <div className="necropsy-criteria-item">
                    <span className="criteria-label">Kalp:</span>
                    <span className="criteria-value">Miyosit nekrozu, fibrozis, enfarkt alanı</span>
                  </div>
                  <div className="necropsy-criteria-item">
                    <span className="criteria-label">Barsak:</span>
                    <span className="criteria-value">Villus atrofisi, kript hiperplazisi, epitel hücre nekrozu</span>
                  </div>
                  <div className="necropsy-criteria-item">
                    <span className="criteria-label">Dalak:</span>
                    <span className="criteria-value">Lenfoid doku atrofisi, hiperplazi, hemosiderin birikimi</span>
                  </div>
                  <div className="necropsy-criteria-item">
                    <span className="criteria-label">Beyin:</span>
                    <span className="criteria-value">Nöron nekrozu, mikrogliyozis, demiyelinizasyon, perivasküler ödem</span>
                  </div>
                  <div className="necropsy-criteria-item">
                    <span className="criteria-label">Lenf nodu:</span>
                    <span className="criteria-value">Foliküler hiperplazi, nekrotik odaklar, granülomatöz inflamasyon</span>
                  </div>
                  <div className="necropsy-criteria-item">
                    <span className="criteria-label">Tümör:</span>
                    <span className="criteria-value">Hücre atipi, mitotik indeks, invazyon derinliği</span>
                  </div>
                </div>
              </div>
              
              <div className="necropsy-section">
                <div 
                  className="necropsy-section-header"
                  onClick={() => toggleSection('labCriteria')}
                >
                  <h4>5. LABARATUVAR TABANLI KRİTERLER</h4>
                  <span className="toggle-icon">{expandedSections.labCriteria ? '▼' : '►'}</span>
                </div>
                <div className={`necropsy-section-content ${expandedSections.labCriteria ? 'expanded' : 'collapsed'}`}>
                  <div className="necropsy-criteria-item">
                    <span className="criteria-label">HİSTOPATOLOJİK İNCELEME SONUCU:</span>
                    <span className="criteria-value">Hücre yapısı normal, nekroz alanları mevcut, orta şiddette inflamasyon</span>
                  </div>
                  <div className="necropsy-criteria-item">
                    <span className="criteria-label">BAKTERİYOLOJİK KÜLTÜR SONUCU:</span>
                    <span className="criteria-value">E. coli enfeksiyonu tespit edildi, antibiyogram sonucu beta-laktam direnci mevcut</span>
                  </div>
                  <div className="necropsy-criteria-item">
                    <span className="criteria-label">TOKSİKOLOJİK ANALİZ SONUCU:</span>
                    <span className="criteria-value">Organofosfatlı pestisit kalıntısı tespit edilmedi, ağır metal (kurşun, cıva) negatif</span>
                  </div>
                  <div className="necropsy-criteria-item">
                    <span className="criteria-label">PARAZİTOLOJİK İNCELEME SONUCU:</span>
                    <span className="criteria-value">İç parazit (Toxocara canis) pozitif, dış parazit negatif</span>
                  </div>
                  <div className="necropsy-criteria-item">
                    <span className="criteria-label">İMMÜNOHİSTOKİMYA/PCR SONUCU:</span>
                    <span className="criteria-value">Parvovirüs pozitif, kuduz negatif</span>
                  </div>
                </div>
              </div>
              
              <div className="necropsy-section">
                <div 
                  className="necropsy-section-header"
                  onClick={() => toggleSection('clinicalEpidemiologicalCriteria')}
                >
                  <h4>6. KLİNİK VE EPİDEMİYOLOJİK KRİTERLER</h4>
                  <span className="toggle-icon">{expandedSections.clinicalEpidemiologicalCriteria ? '▼' : '►'}</span>
                </div>
                <div className={`necropsy-section-content ${expandedSections.clinicalEpidemiologicalCriteria ? 'expanded' : 'collapsed'}`}>
                  <div className="necropsy-criteria-item">
                    <span className="criteria-label">ÖNCEKİ TEDAVİLER VE KLİNİK BULGULAR:</span>
                    <span className="criteria-value">Ölümden 3 gün önce dehidrasyon, ishal, kusma belirtileri gözlenmiş. Sıvı tedavisi ve antibiyotik (Amoksisilin) uygulanmış.</span>
                  </div>
                  <div className="necropsy-criteria-item">
                    <span className="criteria-label">ÇEVRESEL KOŞULLAR:</span>
                    <span className="criteria-value">Barınak koşulları yeterli, havalandırma iyi, aşırı sıcak hava dalgası etkisi mevcut (35°C üstü), yeterli beslenme koşulları</span>
                  </div>
                  <div className="necropsy-criteria-item">
                    <span className="criteria-label">SÜRÜDE BAŞKA ÖLÜM VAR MI:</span>
                    <span className="criteria-value">Son 1 hafta içinde aynı barınakta 2 ölüm vakası daha bildirilmiş, benzer klinik belirtilerle</span>
                  </div>
                </div>
              </div>
              
              <div className="necropsy-section">
                <div 
                  className="necropsy-section-header"
                  onClick={() => toggleSection('additionalSystemFindings')}
                >
                  <h4>7. SİNDİRİM VE ÜREME SİSTEMİ EK BULGULAR</h4>
                  <span className="toggle-icon">{expandedSections.additionalSystemFindings ? '▼' : '►'}</span>
                </div>
                <div className={`necropsy-section-content ${expandedSections.additionalSystemFindings ? 'expanded' : 'collapsed'}`}>
                  <div className="necropsy-criteria-item">
                    <span className="criteria-label">MİDE İÇERİĞİ:</span>
                    <span className="criteria-value">Az miktarda sıvı, kötü koku, yabancı cisim yok</span>
                  </div>
                  <div className="necropsy-criteria-item">
                    <span className="criteria-label">BARSAKTA ÜLSER, PARAZİT:</span>
                    <span className="criteria-value">İnce barsak mukozasında multifokal ülseratif alanlar, lümen içinde erişkin Toxocara (10-15 adet)</span>
                  </div>
                  <div className="necropsy-criteria-item">
                    <span className="criteria-label">BÖBREKTE ÖDEM, NEKROZ:</span>
                    <span className="criteria-value">Kortekste multifokal nekroz odakları, medullada ödem, hemorajik alanlar</span>
                  </div>
                  <div className="necropsy-criteria-item">
                    <span className="criteria-label">ÜREME SİSTEMİ:</span>
                    <span className="criteria-value">Nongebe, uterus normal boyut ve görünümde, ovaryumlar kistik değişiklik göstermiyor, tümör bulgusu yok</span>
                  </div>
                </div>
              </div>
              
              <div className="necropsy-section">
                <div 
                  className="necropsy-section-header"
                  onClick={() => toggleSection('samplesTaken')}
                >
                  <h4>8. ALINAN NUMUNELER (VARSA)</h4>
                  <span className="toggle-icon">{expandedSections.samplesTaken ? '▼' : '►'}</span>
                </div>
                <div className={`necropsy-section-content ${expandedSections.samplesTaken ? 'expanded' : 'collapsed'}`}>
                  <div className="necropsy-criteria-item">
                    <span className="criteria-label">KARACİĞER:</span>
                    <span className="criteria-value">HİSTOPATOLOJİ (SAKLAMA ŞEKLİ %10 FORMALİN)</span>
                  </div>
                  <div className="necropsy-criteria-item">
                    <span className="criteria-label">MİDE İÇERİĞİ:</span>
                    <span className="criteria-value">TOKSİKOLOJİK ANALİZ (SOĞUK ZİNCİR)</span>
                  </div>
                  <div className="necropsy-criteria-item">
                    <span className="criteria-label">BARSAK İÇERİĞİ:</span>
                    <span className="criteria-value">PARAZİT (DİREKT TAZE NUMUNE)</span>
                  </div>
                </div>
              </div>
              
              <div className="necropsy-section">
                <div 
                  className="necropsy-section-header"
                  onClick={() => toggleSection('additionalInfo')}
                >
                  <h4>9. EK BİLGİLER</h4>
                  <span className="toggle-icon">{expandedSections.additionalInfo ? '▼' : '►'}</span>
                </div>
                <div className={`necropsy-section-content ${expandedSections.additionalInfo ? 'expanded' : 'collapsed'}`}>
                  <div className="necropsy-criteria-item">
                    <span className="criteria-label">ÖLÜM TARİHİ VE SAATİ (TAHMİNİ):</span>
                    <span className="criteria-value">02.05.2035, 22:00-24:00 arası</span>
                  </div>
                  <div className="necropsy-criteria-item">
                    <span className="criteria-label">SAHİPLİ-SAHİPSİZ:</span>
                    <span className="criteria-value">SAHİPLİ</span>
                  </div>
                  <div className="necropsy-criteria-item">
                    <span className="criteria-label">KLİNİK GEÇMİŞİ:</span>
                    <span className="criteria-value">Son bir haftadır ishal ve iştahsızlık şikayeti mevcut. İki gün önce kliniğe getirilmiş, sıvı ve antibiyotik tedavisi uygulanmış, takipte iyileşme gözlenmediği bildirilmiş.</span>
                  </div>
                  <div className="necropsy-criteria-item">
                    <span className="criteria-label">AŞI/PARAZİT BİLGİSİ:</span>
                    <span className="criteria-value">Karma aşı üç ay önce yapılmış, kuduz aşısı güncel, düzenli parazit uygulaması var.</span>
                  </div>
                </div>
              </div>
              
              <div className="necropsy-section">
                <div 
                  className="necropsy-section-header"
                  onClick={() => toggleSection('conclusion')}
                >
                  <h4>10. SONUÇ: ÖLÜM NEDENİ DEĞERLENDİRME</h4>
                  <span className="toggle-icon">{expandedSections.conclusion ? '▼' : '►'}</span>
                </div>
                <div className={`necropsy-section-content ${expandedSections.conclusion ? 'expanded' : 'collapsed'}`}>
                  <div className="necropsy-criteria-item conclusion-text">
                    <p>"Yapılan makroskopik ve mikroskobik inceleme sonucunda, hayvanın sindirim sisteminde yaygın parazit enfestasyonu ve parvovirüs enfeksiyonu bulgularına rastlanmıştır. Karaciğer ve böbrekte belirgin nekroz odakları tespit edilmiştir. Ayrıca, ince barsakta multifokal ülseratif lezyonlar gözlenmiştir.</p>
                    <p>Hayvanın ölüm nedeni, parvovirüs enfeksiyonuna bağlı gelişen şiddetli dehidrasyon, elektrolit dengesizliği ve sekonder bakteriyel enfeksiyon (E. coli) olarak değerlendirilmiştir. İç parazit yükünün (Toxocara canis) hastalık tablosunu ağırlaştırdığı düşünülmektedir.</p>
                    <p>Barınakta son hafta içinde benzer klinik belirtilerle kaydedilen diğer ölüm vakalarının da aynı enfeksiyöz etkene bağlı olabileceği düşünülmektedir. Bu nedenle, sürü sağlığı açısından barınaktaki diğer hayvanların aşılama ve parazit kontrolü önerilmektedir. Enfeksiyonun zoonotik potansiyeli düşüktür, ancak Toxocara enfestasyonu için insan teması açısından dikkatli olunmalıdır.</p>
                    <p>Vakanın klinik ve epidemiyolojik özellikleri göz önüne alındığında, ihmal veya travma bulgusuna rastlanmamıştır. Barınak koşullarında gözlenen aşırı sıcak hava koşullarının (35°C üstü) hastalık tablosunun şiddetini artırabileceği değerlendirilmiştir."</p>
                  </div>
                </div>
              </div>
              
              <div className="necropsy-section vet-info-section">
                <div 
                  className="vet-info-header"
                  onClick={() => toggleSection('vetInfo')}
                >
                  <h4>VETERİNER HEKİM BİLGİLERİ</h4>
                  <span className="toggle-icon">{expandedSections.vetInfo ? '▼' : '►'}</span>
                </div>
                <div className={`necropsy-section-content ${expandedSections.vetInfo ? 'expanded' : 'collapsed'}`}>
                  <div className="vet-info-item">
                    <span className="info-label">AD SOYAD:</span>
                    <span className="info-value">Dr. Mert ÖZÇELİK</span>
                  </div>
                  <div className="vet-info-item">
                    <span className="info-label">KLİNİK/FAKÜLTE/KURUM:</span>
                    <span className="info-value">Hayvan Sağlığı Araştırma Merkezi</span>
                  </div>
                  <div className="vet-info-item signature-item">
                    <span className="info-label">İMZA:</span>
                    <span className="signature-placeholder">___________________</span>
                  </div>
                </div>
              </div>
              
              {sectionData.length > 0 && (
                <div className="necropsy-section">
                  <div 
                    className="necropsy-section-header"
                    onClick={() => toggleSection('findings')}
                  >
                    <h4>BULGULAR</h4>
                    <span className="toggle-icon">{expandedSections.findings ? '▼' : '►'}</span>
                  </div>
                  <div className={`necropsy-section-content ${expandedSections.findings ? 'expanded' : 'collapsed'}`}>
                    {sectionData.map(necropsy => (
                      <div key={necropsy.id} className="necropsy-item">
                        <div className="necropsy-header">
                          <span className="necropsy-date">{necropsy.date}</span>
                          <span className="necropsy-vet">{necropsy.vet}</span>
                        </div>
                        <div className="necropsy-findings">{necropsy.findings}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            {sectionData.length === 0 && (
              <div className="necropsy-findings-container">
                <p>Nekropsi bulgusu bulunamadı.</p>
              </div>
            )}
          </div>
        );
      
      case 'notes':
        return (
          <div className="section-content notes">
            <div className="section-header-with-button">
              <h3>Notlar</h3>
              <button className="add-button" onClick={() => setShowAddNoteModal(true)}>
                <i className="add-icon">➕</i> Yeni Not Ekle
              </button>
            </div>
            <div className="prescriptions-container">
              {sectionData.map(note => (
                <div key={note.id} className="prescription-card note-card">
                  <div className="prescription-header">
                    <div className="prescription-date-container">
                      <i className="prescription-icon">📝</i>
                      <span className="prescription-date">{note.date}</span>
                    </div>
                    <span className="prescription-duration">
                      <i className="duration-icon">👨‍⚕️</i> {note.author}
                    </span>
                  </div>
                  
                  <div className="prescription-content">
                    <h4>Not İçeriği</h4>
                    <div className="medication-item notes-item">
                      <i className="medication-icon">📋</i>
                      <span className="medication-name">{note.content}</span>
                    </div>
                  </div>
                  
                  <div className="prescription-actions">
                    <button className="prescription-btn print-btn">
                      <i className="print-icon">🖨️</i> Yazdır
                    </button>
                    <button className="prescription-btn details-btn">
                      <i className="details-icon">🔍</i> Detaylar
                    </button>
                    <button className="prescription-btn copy-btn">
                      <i className="copy-icon">📋</i> Kopyala
                    </button>
                    <button className="prescription-btn renew-btn">
                      <i className="renew-icon">✏️</i> Düzenle
                    </button>
                  </div>
                </div>
              ))}
            </div>
            
            {sectionData.length === 0 && (
              <div className="no-prescriptions">
                <i className="no-data-icon">📝</i>
                <p>Kayıtlı not bulunmamaktadır.</p>
              </div>
            )}
            
            {showAddNoteModal && (
              <AddNoteModal
                onClose={() => setShowAddNoteModal(false)}
                onSave={handleAddNote}
              />
            )}
          </div>
        );
      
      case 'pathology':
        return (
          <div className="section-content pathology">
            <h3>Patoloji Bulguları</h3>
            <div className="necropsy-info-container">
              <div className="necropsy-info-section">
                <div className="necropsy-info-header">
                  <h4>RAPOR BİLGİLERİ</h4>
                </div>
                <div className="necropsy-info-content">
                  <div className="necropsy-info-item">
                    <span className="info-label">RAPOR NO:</span>
                    <span className="info-value">
                      {sectionData.length > 0 && sectionData[0].report ? 
                        sectionData[0].report.reportNo : '2025-PAT-0142'}
                    </span>
                  </div>
                  <div className="necropsy-info-item">
                    <span className="info-label">TARİH:</span>
                    <span className="info-value">
                      {sectionData.length > 0 && sectionData[0].report ? 
                        sectionData[0].report.date : '24.08.2035'}
                    </span>
                  </div>
                  <div className="necropsy-info-item">
                    <span className="info-label">PATOLOJİ UZMAN HEKİM:</span>
                    <span className="info-value">
                      {sectionData.length > 0 && sectionData[0].report ? 
                        sectionData[0].report.performer : 'AHMET YILDIZ'}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="necropsy-info-section">
                <div className="necropsy-info-header">
                  <h4>ÖRNEK BİLGİLERİ</h4>
                </div>
                <div className="necropsy-info-content">
                  <div className="necropsy-info-item">
                    <span className="info-label">ÖRNEK TİPİ:</span>
                    <span className="info-value">
                      {sectionData.length > 0 && sectionData[0].sample ? 
                        sectionData[0].sample.type : 'DOKU BİYOPSİSİ'}
                    </span>
                  </div>
                  <div className="necropsy-info-item">
                    <span className="info-label">ALINDIĞI YER:</span>
                    <span className="info-value">
                      {sectionData.length > 0 && sectionData[0].sample ? 
                        sectionData[0].sample.location : 'DERİ - SOL ÖN BACAK'}
                    </span>
                  </div>
                  <div className="necropsy-info-item">
                    <span className="info-label">ÖRNEK NUMARASI:</span>
                    <span className="info-value">
                      {sectionData.length > 0 && sectionData[0].sample ? 
                        sectionData[0].sample.sampleNumber : 'S-2025-742'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="necropsy-assessment-sections">
              <div className="necropsy-section">
                <div 
                  className="necropsy-section-header" 
                  onClick={() => toggleSection('microscopicFindings')}
                >
                  <h4>MİKROSKOBİK BULGULAR</h4>
                  <span className="toggle-icon">{expandedSections.microscopicFindings ? '▼' : '►'}</span>
                </div>
                <div className={`necropsy-section-content ${expandedSections.microscopicFindings ? 'expanded' : 'collapsed'}`}>
                  <div className="necropsy-criteria-group">
                    <div className="criteria-group-header">1. DOKU BÜTÜNLÜĞÜ VE HİSTOLOJİK YAPI</div>
                    <div className="necropsy-criteria-item">
                      <span className="criteria-label">Doku düzeni:</span>
                      <span className="criteria-value">İyi diferansiye dermis ve epidermis dokuları, doku bütünlüğü korunmuş</span>
                    </div>
                    <div className="necropsy-criteria-item">
                      <span className="criteria-label">Epitel hücrelerin yapısı ve dizilişi:</span>
                      <span className="criteria-value">Epidermiste normal sıralı çok katlı keratinize epitel, yer yer düzensiz dizilim</span>
                    </div>
                    <div className="necropsy-criteria-item">
                      <span className="criteria-label">Organın tabakaları:</span>
                      <span className="criteria-value">Epidermis, dermis ve subkutan dokular belirgin, dermis içerisinde nodüler kitle mevcut</span>
                    </div>
                  </div>
                  
                  <div className="necropsy-criteria-group">
                    <div className="criteria-group-header">2. HÜCRESEL DEĞİŞİKLİKLER</div>
                    <div className="necropsy-criteria-item">
                      <span className="criteria-label">Nekroz:</span>
                      <span className="criteria-value">Tümöral dokuda minimal koagülasyon nekrozu odakları mevcut</span>
                    </div>
                    <div className="necropsy-criteria-item">
                      <span className="criteria-label">Apoptoz:</span>
                      <span className="criteria-value">Belirgin apoptotik hücreler gözlenmedi</span>
                    </div>
                    <div className="necropsy-criteria-item">
                      <span className="criteria-label">Dejenerasyon:</span>
                      <span className="criteria-value">Tümör periferinde hafif hidropic dejenerasyon</span>
                    </div>
                    <div className="necropsy-criteria-item">
                      <span className="criteria-label">Hiperplazi/hipertrofi/atrofi:</span>
                      <span className="criteria-value">Neoplastik hücrelerde fokal hiperplastik değişiklikler</span>
                    </div>
                  </div>
                  
                  <div className="necropsy-criteria-group">
                    <div className="criteria-group-header">3. İNFLAMATUAR YANITIN DEĞERLENDİRİLMESİ</div>
                    <div className="necropsy-criteria-item">
                      <span className="criteria-label">Akut/kronik:</span>
                      <span className="criteria-value">Kronik inflamatuar yanıt</span>
                    </div>
                    <div className="necropsy-criteria-item">
                      <span className="criteria-label">Yayılım:</span>
                      <span className="criteria-value">Lokal, tümör periferinde sınırlı</span>
                    </div>
                    <div className="necropsy-criteria-item">
                      <span className="criteria-label">İçerik:</span>
                      <span className="criteria-value">Seröz eksüdatif</span>
                    </div>
                    <div className="necropsy-criteria-item">
                      <span className="criteria-label">Granülom varlığı:</span>
                      <span className="criteria-value">Granülom yapıları gözlenmedi</span>
                    </div>
                    <div className="necropsy-criteria-item">
                      <span className="criteria-label">Yangının şiddeti:</span>
                      <span className="criteria-value">Hafif</span>
                    </div>
                  </div>
                  
                  <div className="necropsy-criteria-group">
                    <div className="criteria-group-header">4. ETKENLERİN SAPTANMASI</div>
                    <div className="necropsy-criteria-item">
                      <span className="criteria-label">Bakteri, virüs, mantar, parazit varlığı:</span>
                      <span className="criteria-value">Saptanmadı</span>
                    </div>
                    <div className="necropsy-criteria-item">
                      <span className="criteria-label">Giemsa, Ziehl-Neelsen, PAS boyama:</span>
                      <span className="criteria-value">PAS boyama ile fungal etken negatif</span>
                    </div>
                    <div className="necropsy-criteria-item">
                      <span className="criteria-label">İmmunohistokimyasal boyalar:</span>
                      <span className="criteria-value">Vimentin (+), Desmin (+), SMA (+), S-100 (-), CD34 (-)</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="necropsy-section">
                <div 
                  className="necropsy-section-header"
                  onClick={() => toggleSection('macroscopicMicroscopicFindings')}
                >
                  <h4>MAKROSKOBİK VE MİKROSKOBİK BULGULAR</h4>
                  <span className="toggle-icon">{expandedSections.macroscopicMicroscopicFindings ? '▼' : '►'}</span>
                </div>
                <div className={`necropsy-section-content ${expandedSections.macroscopicMicroscopicFindings ? 'expanded' : 'collapsed'}`}>
                  <div className="necropsy-criteria-group">
                    <div className="criteria-group-header">1. NEOPLAZİNİN DEĞERLENDİRİLMESİ</div>
                    <div className="necropsy-criteria-item">
                      <span className="criteria-label">Tümör tipi:</span>
                      <span className="criteria-value">Mezenkimal orjinli, düz kas hücrelerinden kaynaklanan neoplazi</span>
                    </div>
                    <div className="necropsy-criteria-item">
                      <span className="criteria-label">Malignite:</span>
                      <span className="criteria-value">Düşük dereceli malign (mitoz 1-2/10 BBA, minimal hücresel atipi, düşük invazyon potansiyeli)</span>
                    </div>
                    <div className="necropsy-criteria-item">
                      <span className="criteria-label">Metastaz durumu:</span>
                      <span className="criteria-value">Vasküler veya lenfatik invazyon gözlenmedi</span>
                    </div>
                    <div className="necropsy-criteria-item">
                      <span className="criteria-label">İmmunohistokimyasal profil:</span>
                      <span className="criteria-value">Vimentin, SMA ve Desmin ile pozitif reaksiyon (düz kas orjinini desteklemekte)</span>
                    </div>
                  </div>
                  
                  <div className="necropsy-criteria-group">
                    <div className="criteria-group-header">2. VASKÜLER VE BAĞ DOKUSU DEĞİŞİKLİKLERİ</div>
                    <div className="necropsy-criteria-item">
                      <span className="criteria-label">Hemorajiler:</span>
                      <span className="criteria-value">Tümör dokusunda fokal hemorajik alanlar</span>
                    </div>
                    <div className="necropsy-criteria-item">
                      <span className="criteria-label">Tromboz veya emboli:</span>
                      <span className="criteria-value">Saptanmadı</span>
                    </div>
                    <div className="necropsy-criteria-item">
                      <span className="criteria-label">Fibrozis:</span>
                      <span className="criteria-value">Tümörde yoğun kollajenöz stroma, orta derecede fibrozis</span>
                    </div>
                    <div className="necropsy-criteria-item">
                      <span className="criteria-label">Ödem varlığı:</span>
                      <span className="criteria-value">Çevre dokularda hafif ödem</span>
                    </div>
                    <div className="necropsy-criteria-item">
                      <span className="criteria-label">Skar dokusu oluşumu:</span>
                      <span className="criteria-value">Belirgin skar dokusu gözlenmedi</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="necropsy-section">
                <div 
                  className="necropsy-section-header"
                  onClick={() => toggleSection('conclusion')}
                >
                  <h4>SONUÇ</h4>
                  <span className="toggle-icon">{expandedSections.conclusion ? '▼' : '►'}</span>
                </div>
                <div className={`necropsy-section-content ${expandedSections.conclusion ? 'expanded' : 'collapsed'}`}>
                  <div className="necropsy-criteria-item conclusion-text">
                    <p>"Dermiste iyi sınırlı, kapsüllü yapıda, yoğun kollajenöz stroma içerisinde iğsi hücrelerin düzensiz demetler oluşturduğu neoplastik doku gözlenmiştir."</p>
                    <p>"Neoplastik hücreler, hafif pleomorfik, eozinofilik sitoplazmalı, oval-iğsi nükleuslu olup, mitotik aktivite düşüktür (1-2/10 BBA)."</p>
                    <p>"İmmunohistokimyasal incelemede neoplastik hücreler vimentin, SMA ve desmin ile pozitif, S-100 ve CD34 ile negatif boyanma göstermektedir."</p>
                    <p>"Tümör dokusu cerrahi sınırlar dışında kalmış olup, vasküler ya da lenfatik invazyon gözlenmemiştir."</p>
                    <p>"Patolojik tanı: DÜŞÜK DERECELİ KUTANÖZ LEİOMYOSARKOM"</p>
                  </div>
                </div>
              </div>
              
              <div className="necropsy-section vet-info-section">
                <div 
                  className="vet-info-header"
                  onClick={() => toggleSection('vetInfo')}
                >
                  <h4>PATOLOJİ UZMAN HEKİM BİLGİLERİ</h4>
                  <span className="toggle-icon">{expandedSections.vetInfo ? '▼' : '►'}</span>
                </div>
                <div className={`necropsy-section-content ${expandedSections.vetInfo ? 'expanded' : 'collapsed'}`}>
                  <div className="vet-info-item">
                    <span className="info-label">AD SOYAD:</span>
                    <span className="info-value">Dr. Ahmet YILDIZ</span>
                  </div>
                  <div className="vet-info-item">
                    <span className="info-label">KLİNİK/FAKÜLTE/KURUM:</span>
                    <span className="info-value">Veteriner Patoloji Laboratuvarı</span>
                  </div>
                  <div className="vet-info-item signature-item">
                    <span className="info-label">İMZA:</span>
                    <span className="signature-placeholder">___________________</span>
                  </div>
                </div>
              </div>
            </div>
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

  // Handle adding a new prescription with risk check
  const handleAddPrescription = () => {
    // Validate form inputs
    if (newPrescription.medications.some(med => !med) || !newPrescription.duration || !newPrescription.prescribedBy) {
      alert("Lütfen tüm alanları doldurun.");
      return;
    }

    // Filter out any empty medication entries (shouldn't happen due to validation but just in case)
    const filteredMedications = newPrescription.medications.filter(med => med.trim() !== "");

    // Check for medication risks based on the animal breed
    if (animal && animal.breed) {
      const risks = checkMedicationRisksForBreed(filteredMedications, animal.breed);
      
      // If risks found, show warning modal
      if (risks.length > 0) {
        setMedicationRisks(risks);
        
        // Create pending prescription and show warning
        const today = new Date();
        const formattedDate = `${today.getDate().toString().padStart(2, '0')}.${(today.getMonth() + 1).toString().padStart(2, '0')}.${today.getFullYear()}`;
        
        setPendingPrescription({
          id: Date.now(),
          date: formattedDate,
          medications: filteredMedications,
          duration: newPrescription.duration,
          prescribedBy: newPrescription.prescribedBy,
          veterinaryClinic: newPrescription.veterinaryClinic
        });
        
        setShowMedicationWarningModal(true);
        return;
      }
    }
    
    // If no risks, proceed with creating prescription
    savePrescription(filteredMedications);
  };

  // Function to actually save the prescription after risk assessment
  const savePrescription = (medications) => {
    // Get current date in DD.MM.YYYY format
    const today = new Date();
    const formattedDate = `${today.getDate().toString().padStart(2, '0')}.${(today.getMonth() + 1).toString().padStart(2, '0')}.${today.getFullYear()}`;
    
    // Create new prescription object
    const newPrescriptionObj = {
      id: Date.now(), // Generate a unique ID using timestamp
      date: formattedDate,
      medications: medications,
      duration: newPrescription.duration,
      prescribedBy: newPrescription.prescribedBy,
      veterinaryClinic: newPrescription.veterinaryClinic
    };
    
    // Add the new prescription to sectionData
    setSectionData([newPrescriptionObj, ...sectionData]);
    
    // Reset form and close modal
    setNewPrescription({
      medications: [""],
      duration: "",
      prescribedBy: "",
      veterinaryClinic: "Hayat Veteriner Kliniği"
    });
    setShowNewPrescriptionModal(false);
  };

  // Handle continuing with a risky prescription
  const handleContinueWithRiskyPrescription = () => {
    if (pendingPrescription) {
      // Add the prescription despite warnings
      setSectionData([pendingPrescription, ...sectionData]);
      
      // Reset states
      setPendingPrescription(null);
      setMedicationRisks([]);
      setShowMedicationWarningModal(false);
      
      // Reset form and close modal
      setNewPrescription({
        medications: [""],
        duration: "",
        prescribedBy: "",
        veterinaryClinic: "Hayat Veteriner Kliniği"
      });
      setShowNewPrescriptionModal(false);
    }
  };

  // Handle canceling a risky prescription
  const handleCancelRiskyPrescription = () => {
    // Close warning modal but keep prescription modal open for editing
    setShowMedicationWarningModal(false);
    setPendingPrescription(null);
    setMedicationRisks([]);
  };

  // Handle adding a new vaccine
  const handleAddVaccine = (newVaccine) => {
    // Format date to DD.MM.YYYY
    const formatDate = (dateString) => {
      const date = new Date(dateString);
      return `${String(date.getDate()).padStart(2, '0')}.${String(date.getMonth() + 1).padStart(2, '0')}.${date.getFullYear()}`;
    };

    const formattedVaccine = {
      ...newVaccine,
      id: Date.now(), // Generate a temporary ID
      date: formatDate(newVaccine.date),
      nextDue: newVaccine.nextDueDate ? formatDate(newVaccine.nextDueDate) : '',
      status: newVaccine.status
    };

    // Update the section data with the new vaccination
    const updatedVaccinations = [formattedVaccine, ...sectionData];
    setSectionData(updatedVaccinations);
    setShowNewVaccineModal(false);
  };

  const handleAddCondition = (newCondition) => {
    // In a real app, you would send this data to your backend API
    console.log('New condition added:', newCondition);
    
    // For demo purposes, we'll just add it to the local state
    setSectionData([newCondition, ...sectionData]);
    
    // Close the modal
    setShowNewConditionModal(false);
  };
  
  const handleAddClinicalExam = (newExam) => {
    // In a real app, you would send this data to your backend API
    console.log('New clinical exam added:', newExam);
    
    // Map backend fields to frontend fields
    const formattedExam = {
      id: newExam.id,
      date: new Date().toLocaleDateString('tr-TR', {day: '2-digit', month: '2-digit', year: 'numeric'}),
      vet: newExam.veterinerAdSoyad || "Dr. Mehmet Yılmaz",
      anamnesis: newExam.anamnez,
      complaints: newExam.sikayetler,
      findings: newExam.bulgular,
      primaryDiagnosis: newExam.birincilTani,
      secondaryDiagnosis: newExam.ikincilTani,
      procedures: newExam.islemler
    };
    
    // For demo purposes, we'll just add it to the local state
    setSectionData([formattedExam, ...sectionData]);
    
    // Close the modal
    setShowNewClinicalExamModal(false);
  };

  const handleAddDiseaseHistory = (newDiseaseHistory) => {
    // In a real app, you would send this data to your backend API
    console.log('New disease history added:', newDiseaseHistory);
    
    // Format the disease history data
    const formattedDiseaseHistory = {
      ...newDiseaseHistory,
      diagnosisDate: new Date(newDiseaseHistory.diagnosisDate).toLocaleDateString('tr-TR', {day: '2-digit', month: '2-digit', year: 'numeric'}),
      endDate: newDiseaseHistory.endDate ? new Date(newDiseaseHistory.endDate).toLocaleDateString('tr-TR', {day: '2-digit', month: '2-digit', year: 'numeric'}) : ''
    };
    
    // For demo purposes, we'll just add it to the local state
    setSectionData([formattedDiseaseHistory, ...sectionData]);
    
    // Close the modal
    setShowNewDiseaseHistoryModal(false);
  };

  const handleAddNote = (newNote) => {
    // Format the note date to display format
    const formattedNote = {
      ...newNote,
      date: newNote.date.split('-').reverse().join('.')
    };
    
    // Add the new note to the sectionData
    setSectionData([formattedNote, ...sectionData]);
    
    // Close the modal
    setShowAddNoteModal(false);
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
                  <span className="info-label">Cinsiyet:</span>
                  <span className="info-value">{animal?.gender}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Kısırlık Durumu:</span>
                  <span className="info-value">{animal?.neutered ? 'Kısırlaştırılmış' : 'Kısırlaştırılmamış'}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Boy:</span>
                  <span className="info-value">{animal?.height}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Kilo:</span>
                  <span className="info-value">{animal?.weight}</span>
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
                className={`sidebar-btn ${activeSection === 'pathology' ? 'active' : ''}`}
                onClick={() => handleSectionClick('pathology')}
              >
                Patoloji Bulguları
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

      {/* Modals */}
      {showNewClinicalExamModal && (
        <AddClinicalExamModal
          onClose={() => setShowNewClinicalExamModal(false)}
          onSave={handleAddClinicalExam}
          veterinerId={1} // Mock veteriner ID
          veterinerName="Dr. Mehmet Yılmaz" // Mock veteriner name
          randevuId={null} // This would be provided if adding from a randevu
        />
      )}

      {showNewDiseaseHistoryModal && (
        <AddDiseaseHistoryModal
          onClose={() => setShowNewDiseaseHistoryModal(false)}
          onSave={handleAddDiseaseHistory}
        />
      )}
      
      {/* Medication Warning Modal */}
      {showMedicationWarningModal && (
        <MedicationWarningModal
          risks={medicationRisks}
          onClose={() => setShowMedicationWarningModal(false)}
          onContinue={handleContinueWithRiskyPrescription}
          onCancel={handleCancelRiskyPrescription}
        />
      )}
    </>
  );
};

export default AnimalDetails; 