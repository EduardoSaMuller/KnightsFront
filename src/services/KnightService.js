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
  console.log(knightData);
  return axios.put(`${API_URL}/knights/${id}`, knightData)
    .then(response => {
      console.log(response.data);
      return response.data;
    })
    .catch(error => {
      console.error('Erro ao atualizar um cavaleiro:', error);
      throw new Error('Erro ao atualizar um cavaleiro:', error);
    });
}

function createKnight(knightData) {
  return axios.post(`${API_URL}/knights`, knightData)
    .then(response => {
      return response.data;
    })
    .catch(error => {
      throw new Error('Erro ao criar um cavaleiro:', error);
    });
}




// Exportando as funções
export { getAllKnights, getKnightById, updateKnight ,createKnight };
