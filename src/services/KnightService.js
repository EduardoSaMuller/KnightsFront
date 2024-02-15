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

function deleteKnight(id) {
  return axios.delete(`${API_URL}/knights/${id}`)
    .then(response => {
      return response.data;
    })
    .catch(error => {
      throw new Error('Erro ao excluir um cavaleiro:', error);
    });
}
async function addKnightToHeroes(knight) {
  try {
    const response = await axios.post(`${API_URL}/knights/heroes`, knight);
    console.log('Cavaleiro adicionado aos heróis com sucesso:', response.data);
    return response.data;
  } catch (error) {
    console.error('Erro ao adicionar cavaleiro aos heróis:', error);
    throw error;
  }
}


export { getAllKnights, getKnightById, updateKnight ,createKnight ,deleteKnight , addKnightToHeroes};
