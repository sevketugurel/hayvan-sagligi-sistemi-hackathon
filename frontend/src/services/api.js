import axios from 'axios';

const API_URL = 'http://localhost:8080/api';

// Hayvan (Animal) API calls
export const getHayvanById = async (hayvanId) => {
  try {
    const response = await axios.get(`${API_URL}/hayvanlar/${hayvanId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching animal details:', error);
    throw error;
  }
};

// KlinikInceleme (Clinical Examination) API calls
export const getKlinikIncelemeByHayvanId = async (hayvanId) => {
  try {
    const response = await axios.get(`${API_URL}/klinik-incelemeler/hayvan/${hayvanId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching clinical examinations:', error);
    throw error;
  }
};

export const createKlinikInceleme = async (klinikIncelemeData) => {
  try {
    const response = await axios.post(`${API_URL}/klinik-incelemeler`, klinikIncelemeData);
    return response.data;
  } catch (error) {
    console.error('Error creating clinical examination:', error);
    throw error;
  }
};

// HastalikGecmisi (Disease History) API calls
export const getHastalikGecmisiByHayvanId = async (hayvanId) => {
  try {
    const response = await axios.get(`${API_URL}/hastalik-gecmisi/hayvan/${hayvanId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching disease history:', error);
    throw error;
  }
};

// Randevu (Appointment) API calls
export const getRandevuByHayvanId = async (hayvanId) => {
  try {
    const response = await axios.get(`${API_URL}/randevular/hayvan/${hayvanId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching appointments:', error);
    throw error;
  }
};

// RadyolojikGoruntuleme API calls
export const getRadyolojikGoruntulemeByHayvanId = async (hayvanId) => {
  try {
    const response = await axios.get(`${API_URL}/radyolojik-goruntuleme/hayvan/${hayvanId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching radiological imaging:', error);
    throw error;
  }
};

// LabTestleri API calls
export const getLabTestleriByHayvanId = async (hayvanId) => {
  try {
    const response = await axios.get(`${API_URL}/lab-testleri/hayvan/${hayvanId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching lab tests:', error);
    throw error;
  }
};

// LabTestDetaylari API calls
export const getLabTestDetaylariByTestId = async (testId) => {
  try {
    const response = await axios.get(`${API_URL}/lab-test-detaylari/test/${testId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching lab test details:', error);
    throw error;
  }
};

// Recete (Prescription) API calls
export const getReceteByHayvanId = async (hayvanId) => {
  try {
    const response = await axios.get(`${API_URL}/receteler/hayvan/${hayvanId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching prescriptions:', error);
    throw error;
  }
};

// ReceteIlaclari API calls
export const getReceteIlaclariByReceteId = async (receteId) => {
  try {
    const response = await axios.get(`${API_URL}/recete-ilaclari/recete/${receteId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching prescription medications:', error);
    throw error;
  }
};

// Asi (Vaccination) API calls
export const getAsiByHayvanId = async (hayvanId) => {
  try {
    const response = await axios.get(`${API_URL}/asilar/hayvan/${hayvanId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching vaccinations:', error);
    throw error;
  }
};

// AlerjiKronik API calls
export const getAlerjiKronikByHayvanId = async (hayvanId) => {
  try {
    const response = await axios.get(`${API_URL}/alerji-kronik/hayvan/${hayvanId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching allergies and chronic conditions:', error);
    throw error;
  }
};

// AlerjiKronikTedavi API calls
export const getAlerjiKronikTedaviByAlerjiId = async (alerjiId) => {
  try {
    const response = await axios.get(`${API_URL}/alerji-kronik-tedavi/alerji/${alerjiId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching allergy/chronic condition treatments:', error);
    throw error;
  }
};

// PatolojikBulgular API calls
export const getPatolojikBulgularByHayvanId = async (hayvanId) => {
  try {
    const response = await axios.get(`${API_URL}/patolojik-bulgular/hayvan/${hayvanId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching pathological findings:', error);
    throw error;
  }
};

// NekropsiBulgular API calls
export const getNekropsiBulgularByHayvanId = async (hayvanId) => {
  try {
    const response = await axios.get(`${API_URL}/nekropsi-bulgular/hayvan/${hayvanId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching necropsy findings:', error);
    throw error;
  }
};

// Notlar API calls
export const getNotlarByHayvanId = async (hayvanId) => {
  try {
    const response = await axios.get(`${API_URL}/notlar/hayvan/${hayvanId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching notes:', error);
    throw error;
  }
};

// Create a common function to get all data for a hayvan
export const getHayvanAllData = async (hayvanId) => {
  try {
    const [
      hayvanDetails,
      klinikIncelemeler,
      hastalikGecmisi,
      randevular,
      radyolojikGoruntulemeler,
      labTestleri,
      receteler,
      asilar,
      alerjiKronikler,
      patolojikBulgular,
      nekropsiBulgular,
      notlar
    ] = await Promise.all([
      getHayvanById(hayvanId),
      getKlinikIncelemeByHayvanId(hayvanId),
      getHastalikGecmisiByHayvanId(hayvanId),
      getRandevuByHayvanId(hayvanId),
      getRadyolojikGoruntulemeByHayvanId(hayvanId),
      getLabTestleriByHayvanId(hayvanId),
      getReceteByHayvanId(hayvanId),
      getAsiByHayvanId(hayvanId),
      getAlerjiKronikByHayvanId(hayvanId),
      getPatolojikBulgularByHayvanId(hayvanId),
      getNekropsiBulgularByHayvanId(hayvanId),
      getNotlarByHayvanId(hayvanId)
    ]);

    return {
      hayvanDetails,
      klinikIncelemeler,
      hastalikGecmisi,
      randevular,
      radyolojikGoruntulemeler,
      labTestleri,
      receteler,
      asilar,
      alerjiKronikler,
      patolojikBulgular,
      nekropsiBulgular,
      notlar
    };
  } catch (error) {
    console.error('Error fetching all data for hayvan:', error);
    throw error;
  }
}; 