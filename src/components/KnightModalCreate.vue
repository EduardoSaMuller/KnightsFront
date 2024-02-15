<template>
  <div class="modal-overlay" v-if="isOpen" @click="closeModal">
    
    <div class="modal-content" @click.stop>
      <button  @click="closeModal" class="close-btn button-secondary">X</button>
      <KnightCreateForm />
    </div>
  </div>
</template>

<script>
import KnightCreateForm from './KnightCreateForm.vue';

export default {
  components: {
    KnightCreateForm,
  },
  data() {
    return {
      isOpen: false,
    };
  },
  methods: {
    toggleModal() {
      this.isOpen = !this.isOpen;
    },
    closeModal() {
      this.isOpen = false;
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
