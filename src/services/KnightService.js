// KnightService.js

import axios from 'axios';

const API_URL = 'http://localhost:3000';

function getAllKnights() {
  return axios.get(`${API_URL}/knights`);
}

function getKnightById(id) {
  return axios.get(`${API_URL}/knights/${id}`);
}

function updateKnight(id, knightData) {
  return axios.put(`${API_URL}/knights/${id}`, knightData);
}

// Exportando as funções
export { getAllKnights, getKnightById, updateKnight };
