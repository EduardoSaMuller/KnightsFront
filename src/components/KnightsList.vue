<template>
  <div class="knights-list">
    <knight-card v-for="knight in knights" :key="knight.id" :knight="knight" @open-edit-modal="openKnightModalEdit" />
    
    <!-- Modal de edição -->
    <knight-modal-edit
      v-if="isKnightModalEditOpen"
      :knightDetails="selectedKnightDetails"
      @close-modal="closeKnightModalEdit"
      @update-knight="updateKnight"
    />
  </div>
</template>
<script>
import { getAllKnights,  } from '@/services/KnightService';

export default {
  data() {
    return {
      knights: [],
    };
  },
  mounted() {
    this.fetchKnights();
  },
  methods: {
    async fetchKnights() {
      try {
        const response = await getAllKnights();
        this.knights = response.data;
      } catch (error) {
        console.error('Error fetching knights:', error);
      }
    },
  },
};
</script>

<style scoped>
/* Estilos do componente KnightList */
.knights-list {
  display: flex;
  flex-wrap: wrap;
}
</style>
