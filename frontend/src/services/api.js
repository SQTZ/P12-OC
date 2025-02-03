import axios from 'axios';

const BASE_URL = 'http://localhost:3000';

// Création d'une instance axios avec la configuration de base
const api = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

/**
 * Récupère les informations principales de l'utilisateur
 * @param {number} userId 
 * @returns {Promise}
 */
export const getUserMainData = async (userId) => {
    try {
        const response = await api.get(`/user/${userId}`);
        return response.data.data;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
};

/**
 * Récupère l'activité quotidienne de l'utilisateur
 * @param {number} userId 
 * @returns {Promise}
 */
export const getUserActivity = async (userId) => {
    try {
        const response = await api.get(`/user/${userId}/activity`);
        return response.data.data;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
};

/**
 * Récupère la durée moyenne des sessions de l'utilisateur
 * @param {number} userId 
 * @returns {Promise}
 */
export const getUserAverageSessions = async (userId) => {
    try {
        const response = await api.get(`/user/${userId}/average-sessions`);
        return response.data.data;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
};

/**
 * Récupère les performances de l'utilisateur
 * @param {number} userId 
 * @returns {Promise}
 */
export const getUserPerformance = async (userId) => {
    try {
        const response = await api.get(`/user/${userId}/performance`);
        return response.data.data;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}; 