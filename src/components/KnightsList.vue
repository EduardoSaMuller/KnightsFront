<template>
    <div class="knights-list">
      <knight-card v-for="knight in knightsData" :key="knight.id" :knightId="knight.id" />
    </div>
</template>
<script>
import KnightCard from './KnightCard.vue';
import { knightsData } from '../utils/KnightsData.js';

export default {
  components: {
    KnightCard
  },
  data() {
    return {
      knightsData: knightsData
    };
  }
};
</script>

<style scoped>
/* Estilos do componente KnightList */
.knights-list {
  display: flex;
  flex-wrap: wrap;
}
</style>