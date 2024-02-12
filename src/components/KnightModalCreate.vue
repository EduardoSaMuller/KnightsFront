<template>
  <div class="modal-overlay" v-if="isOpen" @click="closeModal">
    
    <div class="modal-content" @click.stop>
      <button @click="closeModal" class="close-btn">Fechar modal</button>
      <knight-form />
    </div>
  </div>
</template>

<script>
import KnightForm from './KnightForm.vue';

export default {
  components: {
    KnightForm,
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
}

.close-btn {
  cursor: pointer;
  position: absolute;
  top: 10px;
  right: 10px;
}
</style>
