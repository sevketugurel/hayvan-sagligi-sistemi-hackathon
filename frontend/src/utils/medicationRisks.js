// Hayvan ırkı ve ilaç risklerini içeren veri
const breedMedicationRisks = [
  {
    medication: "Albendazol",
    breed: "Angora Keçisi",
    warning: "Gebelikte (ilk trimester) malformasyon riski taşır"
  },
  {
    medication: "PGF2alfa",
    breed: "Scottish Fold",
    warning: "Gebelikte düşük riski oluşturabilir"
  },
  {
    medication: "Flunixin meglumine",
    breed: "Scottish Fold",
    warning: "Dehidre hayvanlarda dikkatli kullanılmalı"
  },
  {
    medication: "Meloksikam",
    breed: "Collie",
    warning: "Karaciğer yetmezliği olanlarda dikkatli kullanılmalı"
  },
  {
    medication: "Flunixin meglumine",
    breed: "Quarter Horse",
    warning: "Laminitis tetiklenebilir"
  },
  {
    medication: "Ketoprofen",
    breed: "Doberman",
    warning: "Ülser riski taşır"
  },
  {
    medication: "Enrofloxacin",
    breed: "Scottish Fold",
    warning: "Retina hasarı riski"
  },
  {
    medication: "Tilmikozin",
    breed: "Angora Keçisi",
    warning: "SC uygulama ani ölüme neden olabilir"
  }
];

/**
 * Verilen ilacın belirli hayvan ırkı için risk taşıyıp taşımadığını kontrol eder
 * @param {string} medicationName - İlaç adı
 * @param {string} animalBreed - Hayvan ırkı
 * @returns {Object|null} - Risk varsa {medication, breed, warning} objesi, yoksa null
 */
export const checkMedicationRiskForBreed = (medicationName, animalBreed) => {
  if (!medicationName || !animalBreed) return null;

  // İlaç adı ve ırk adını küçük harfe çevirip arama yapalım
  const normalizedMedicationName = medicationName.toLowerCase();
  const normalizedBreed = animalBreed.toLowerCase();

  // Tüm riskleri kontrol et
  for (const risk of breedMedicationRisks) {
    // İlacın adı, verilen ilacın içinde geçiyorsa ve ırk eşleşiyorsa riski döndür
    if (
      normalizedMedicationName.includes(risk.medication.toLowerCase()) &&
      normalizedBreed.includes(risk.breed.toLowerCase())
    ) {
      return risk;
    }
  }

  return null;
};

/**
 * Bir dizi ilaç için riskleri kontrol eder
 * @param {string[]} medications - İlaç isimleri dizisi
 * @param {string} animalBreed - Hayvan ırkı
 * @returns {Array} - Risk taşıyan ilaçların risk bilgilerini içeren dizi
 */
export const checkMedicationRisksForBreed = (medications, animalBreed) => {
  if (!medications || !medications.length || !animalBreed) return [];

  const risks = [];

  for (const med of medications) {
    const risk = checkMedicationRiskForBreed(med, animalBreed);
    if (risk) {
      risks.push({
        ...risk,
        enteredMedicationName: med
      });
    }
  }

  return risks;
};

export default breedMedicationRisks; 