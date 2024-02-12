<template>
  <div class="modal-overlay" v-if="isOpen" @click="closeModal">
    <div class="modal-content" @click.stop>
      <button @click="closeModal" class="close-btn">Fechar modal</button>
      <div class="modal-header">
        <h2>Edit Knight</h2>
      </div>
      <div class="modal-body">
        <label for="nickname">Nickname:</label>
        <input type="text" id="nickname" v-model="editedNickname" required>
      </div>
      <div class="modal-footer">
        <button @click="updateKnight">Salvar</button>
      </div>
    </div>
  </div>
</template>

<script>
import { updateKnight } from '@/services/KnightService';
export default {
  props: {
    knight: Object
  },
  data() {
    return {
      isOpen: false,
      editedNickname: ''
    };
  },
  methods: {
    toggleModal() {
      this.isOpen = !this.isOpen;
    },
    closeModal() {
      this.isOpen = false;
    },
    editKnight() {
    const updatedKnightData = {
      id: this.knightDetails.id,
      nickname: this.editedNickname
    };
    updateKnight(updatedKnightData)
      .then(() => {
        console.log('Cavaleiro atualizado com sucesso!');
        this.closeModal();
      })
      .catch(error => {
        console.error('Erro ao atualizar cavaleiro:', error);
      });
  }
  }
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background-color: white;
  padding: 20px;
  border-radius: 5px;
  position: relative;
  width: 400px; 
}

.close-btn {
  cursor: pointer;
  position: absolute;
  top: 10px;
  right: 10px;
}

.modal-header {
  text-align: center;
  margin-bottom: 20px;
}

.modal-footer {
  text-align: center;
  margin-top: 20px;
}

.modal-footer button {
  background-color: #1976d2;
  color: white;
  padding: 8px 16px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.modal-footer button:hover {
  background-color: #2c84db;
}
</style>
