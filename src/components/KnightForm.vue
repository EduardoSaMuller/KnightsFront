<template>
  <div>
    <h1>Create Knight</h1>
    <form @submit.prevent="createKnight">
      <!-- Campos do formulário para criar um novo cavaleiro -->
      <button type="submit">Salvar</button>
    </form>
  </div>
</template>

<script>
import KnightService from '@/services/KnightService';

export default {
  data() {
    return {
      formData: {
        name: '',
        nickname: '',
        birthday: '',
        class: '',
        strength: 0,
        dexterity: 0,
        constitution: 0,
        intelligence: 0,
        wisdom: 0,
        charisma: 0
      }
    };
  },
  methods: {
    async createKnight() {
      try {
        const response = await KnightService.createKnight(this.formData);
        console.log('New knight created:', response.data);
        this.resetForm(); // Limpa o formulário após a criação
      } catch (error) {
        console.error('Error creating knight:', error);
      }
    },
    resetForm() {
      this.formData = {
        name: '',
        nickname: '',
        birthday: '',
        classe: '',
        strength: 0,
        dexterity: 0,
        constitution: 0,
        intelligence: 0,
        wisdom: 0,
        charisma: 0
      };
    }
  }
};
</script>

<style>
/* Estilos do formulário aqui */
</style>
