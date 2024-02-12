<template>
  <AppHeader title="Knights Challenge"/>
  <div class="app">
    <div v-if="loading">Carregando...</div>
    <div v-else>
      <div v-if="error">{{ error }}</div>
      <div v-else>
        <div v-if="knights.length === 0">Nenhum cavaleiro encontrado.</div>
        <div v-else>
          <KnightList/>
        </div>
      </div>
    </div> 
    <button @click="openCreateModal">Criar Knight</button>
    <KnightModalCreate ref="modalCreate" />
  </div>
</template> 
<script>

import KnightModalCreate from './components/KnightModalCreate.vue';
import { getAllKnights } from './services/KnightService';
import KnightList from './components/KnightList.vue';
import AppHeader from './components/AppHeader.vue';
export default {
  components: {
    AppHeader,
    
    KnightModalCreate,
    KnightList
  },
  data() {
    return {
      knights: [],
      loading: false,
      error: null,
      showCreateModal: false,
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
    },
    openCreateModal() {
      if (this.$refs.modalCreate) {
        this.$refs.modalCreate.toggleModal();
      } else {
        console.error("$refs.modalCreate não está definido. Verifique se o componente KnightModalCreate está corretamente referenciado com ref='modalCreate'.");
      }
    }
  }
};
</script>

<style>
.app {
  font-family: Arial, sans-serif;
  padding: 20px;
  background-color:  #8e8e8e;
}
</style>
