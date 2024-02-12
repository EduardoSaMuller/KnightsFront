<template>
  <div class="modal" v-if="isModalOpen" @click.self="closeModal">
    <div class="modal-content">
      <span class="close" @click="closeModal">&times;</span>
      <h2>Edit Knight</h2>
      <div v-if="knightDetails">
        <label for="nickname">Nickname:</label>
        <input type="text" id="nickname" v-model="editedNickname" required>
        <button @click="updateKnight">Save</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    knightDetails: Object
  },
  data() {
    return {
      editedNickname: ''
    };
  },
  computed: {
    isModalOpen() {
      return !!this.knightDetails;
    }
  },
  methods: {
    closeModal() {
      this.$emit('close-modal');
    },
    updateKnight() {
      const updatedKnight = {
        ...this.knightDetails,
        nickname: this.editedNickname
      };
      this.$emit('update-knight', updatedKnight);
      this.editedNickname = '';
      this.closeModal();
    }
  }
};
</script>

<style scoped>
/* Estilos do modal aqui */
</style>
