import axios from 'axios';

const API_URL = 'http://localhost:8080/api/klinik-inceleme';

class KlinikIncelemeService {
    getAllIncelemeler() {
        return axios.get(API_URL);
    }

    getIncelemeById(id) {
        return axios.get(`${API_URL}/${id}`);
    }

    getIncelemelerByHayvanId(hayvanId) {
        return axios.get(`${API_URL}/hayvan/${hayvanId}`);
    }

    getIncelemelerByVeterinerId(veterinerId) {
        return axios.get(`${API_URL}/veteriner/${veterinerId}`);
    }

    getIncelemelerByDateRange(startDate, endDate) {
        return axios.get(`${API_URL}/date-range`, {
            params: {
                startDate,
                endDate
            }
        });
    }

    createInceleme(incelemeData) {
        return axios.post(API_URL, incelemeData);
    }

    updateInceleme(id, incelemeData) {
        return axios.put(`${API_URL}/${id}`, incelemeData);
    }

    deleteInceleme(id) {
        return axios.delete(`${API_URL}/${id}`);
    }
}

export default new KlinikIncelemeService(); 