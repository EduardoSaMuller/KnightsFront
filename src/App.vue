<template>
  <AppHeader title="Knights Challenge"/>
  <div id="app" class="app">
    <div v-if="loading">Carregando...</div>
    
    <div v-else>
      <div v-if="error">{{ error }}</div>
      <div v-else>
        <div v-if="knights.length === 0">Nenhum cavaleiro encontrado.</div>
        <div v-else>
          <button class="button-primary" @click="openCreateModal">Criar Knight</button>
         
          <router-view></router-view>
        </div>
      </div>
    </div>

    <KnightModalCreate ref="modalCreate" />
  </div>
</template> 
<script>

import KnightModalCreate from './components/KnightModalCreate.vue';
import { getAllKnights } from './services/KnightService';
import AppHeader from './components/AppHeader.vue';
export default {
 name: 'App',
  components: {
    AppHeader,
    KnightModalCreate,
  
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
    },
    openEditModal() {
      if (this.$refs.modalEdit) {
        this.$refs.modalEdit.toggleModal();
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
button{
  color: white;
  padding: 8px 16px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
  transition: all 0.5s;
}
.button-primary{
 background-color:  #3d85d8;
}
.button-primary:hover{
  background-color: #1e4c82;
}
.button-secondary{
  background-color: #b60202;
}
.button-secondary:hover{
  background-color: #6d0303;
}
</style>
