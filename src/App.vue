<template>
  <div class="app">
    <div v-if="loading">Carregando...</div>
    <div v-else>
      <div v-if="error">{{ error }}</div>
      <div v-else>
        <div v-if="knights.length === 0">Nenhum cavaleiro encontrado.</div>
        <div v-else>
          <div v-for="knight in knights" :key="knight.id">
            <knight-card :knight="knight" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import KnightCard from './components/KnightCard.vue';
import { getAllKnights } from './services/KnightService';

export default {
  components: {
    KnightCard
  },
  data() {
    return {
      knights: [],
      loading: false,
      error: null
    };
  },
  mounted() {
    this.fetchKnights();
  },
  methods: {
    fetchKnights() {
      this.loading = true;
      getAllKnights()
        .then(response => {
          this.knights = response.data;
          console.log('Dados dos cavaleiros:', this.knights); // Verificar os dados recebidos
        })
        .catch(error => {
          this.error = 'Erro ao buscar os cavaleiros: ' + error.message;
          console.error('Erro ao buscar os cavaleiros:', error);
        })
        .finally(() => {
          this.loading = false;
        });
    }
  }
};
</script>

<style>
.app {
  font-family: Arial, sans-serif;
  padding: 20px;
}
</style>
