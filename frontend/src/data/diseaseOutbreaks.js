// Sample disease outbreak data for Turkey
// Coordinates are in [longitude, latitude] format

const diseaseOutbreaks = [
  {
    id: 1,
    diseaseName: "Şap Hastalığı",
    animalType: "Sığır",
    coordinates: [39.1, 38.4], // Elazığ
    intensity: 0.8,
    count: 35,
    details: "Elazığ çevresinde sığırlarda görülen şap hastalığı vakası",
    date: "2023-10-15",
    status: "aktif"
  },
  {
    id: 2,
    diseaseName: "Kuş Gribi",
    animalType: "Kümes Hayvanları",
    coordinates: [30.7, 36.9], // Antalya
    intensity: 0.6,
    count: 22,
    details: "Antalya bölgesinde kümes hayvanlarında görülen kuş gribi vakaları",
    date: "2023-11-02",
    status: "aktif"
  },
  {
    id: 3,
    diseaseName: "Kuduz",
    animalType: "Köpek",
    coordinates: [43.3, 38.5], // Van
    intensity: 0.5,
    count: 8,
    details: "Van bölgesinde sahipsiz köpeklerde tespit edilen kuduz vakaları",
    date: "2023-09-28",
    status: "kontrol altında"
  },
  {
    id: 4,
    diseaseName: "Brucellosis",
    animalType: "Koyun",
    coordinates: [34.8, 38.7], // Kayseri
    intensity: 0.7,
    count: 29,
    details: "Kayseri ilinde koyunlarda görülen Brucellosis vakaları",
    date: "2023-10-05",
    status: "aktif"
  },
  {
    id: 5,
    diseaseName: "Mavi Dil",
    animalType: "Koyun",
    coordinates: [27.1, 38.4], // İzmir
    intensity: 0.4,
    count: 15,
    details: "İzmir çevresinde koyunlarda görülen Mavi Dil hastalığı",
    date: "2023-11-12",
    status: "azalıyor"
  },
  {
    id: 6,
    diseaseName: "Şap Hastalığı",
    animalType: "Sığır",
    coordinates: [42.1, 40.2], // Erzurum
    intensity: 0.6,
    count: 19,
    details: "Erzurum bölgesinde sığırlarda şap hastalığı vakaları",
    date: "2023-10-22",
    status: "aktif"
  },
  {
    id: 7,
    diseaseName: "Tüberküloz",
    animalType: "Sığır",
    coordinates: [32.5, 37.9], // Konya
    intensity: 0.5,
    count: 12,
    details: "Konya'da sığırlarda tespit edilen tüberküloz",
    date: "2023-09-15",
    status: "kontrol altında"
  },
  {
    id: 8,
    diseaseName: "Newcastle",
    animalType: "Kanatlı Hayvanlar",
    coordinates: [28.9, 41.0], // İstanbul
    intensity: 0.7,
    count: 48,
    details: "İstanbul'da kanatlı hayvanlarda görülen Newcastle hastalığı",
    date: "2023-11-05",
    status: "aktif"
  },
  {
    id: 9,
    diseaseName: "Anaplazmozis",
    animalType: "Sığır",
    coordinates: [35.3, 37.0], // Adana
    intensity: 0.4,
    count: 10,
    details: "Adana'da sığırlarda görülen Anaplazmozis vakaları",
    date: "2023-10-10",
    status: "azalıyor"
  },
  {
    id: 10,
    diseaseName: "Şap Hastalığı",
    animalType: "Koyun",
    coordinates: [38.3, 37.8], // Malatya
    intensity: 0.6,
    count: 25,
    details: "Malatya'da koyunlarda görülen şap hastalığı vakaları",
    date: "2023-11-01",
    status: "aktif"
  }
];

export default diseaseOutbreaks; 