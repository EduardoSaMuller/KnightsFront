<template>
  <div>
    <div class="modal-overlay" v-if="isOpen" @click="closeModal">
      <div class="modal-content" @click.stop>
        <button @click="closeModal" class="close-btn button-secondary">X</button>
        <div class="container">
          <h1>Editar Knight</h1>
          <form @submit.prevent="updateKnight">
            <div class="knight-content">
              <div class="did-floating-label-content">
                <input
                  type="text"
                  id="name"
                  :value="formData.name"
                  class="did-floating-input"
                  readonly
                  disabled
                />
                <label for="name" class="did-floating-label">Nome:</label>
              </div>
              <div class="did-floating-label-content">
                <input
                  type="text"
                  id="nickname"
                  v-model="formData.nickname"
                  class="did-floating-input"
                />
                <label for="nickname" class="did-floating-label">Nickname:</label>
              </div>
            </div>
            <button class="button-primary btn-save">Salvar</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getKnightById, updateKnight } from "@/services/KnightService";

export default {
  props: {
    knightId: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      formData: { attributes: {} },
      nickname: '',
      isOpen: false,
      selectedKnight: null,
    };
  },
  mounted() {
    this.loadKnightData();
  },
  methods: {
    async loadKnightData() {
      try {
        const knightData = await getKnightById(this.knightId);
        this.formData = knightData.data;
        console.log(this.formData, 'eitcha');
      } catch (error) {
        console.error("Erro ao carregar os dados do Knight:", error);
      }
    },
    async updateKnight() {
      try {
        const response = await updateKnight(this.formData._id, this.formData);
        console.log("Knight atualizado:", response);
        // Lógica para redirecionar ou mostrar uma mensagem de sucesso
      } catch (error) {
        console.error("Erro ao atualizar o Knight:", error);
        // Lógica para lidar com o erro
      }
    },
    toggleModal() {
      this.isOpen = !this.isOpen;
    },
    closeModal() {
      this.isOpen = false;
    },
  },
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.8); /* Fundo branco com opacidade */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999; /* z-index maior para estar na frente dos outros elementos */
}

.modal-content {
  background-color: white;
  padding: 20px;
  border-radius: 5px;
  position: relative;
}

.close-btn {
  cursor: pointer;
  position: absolute;
  top: 10px;
  right: 10px;
}
</style>
