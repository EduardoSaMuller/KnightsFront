<template>
    <div class="knights-list">
      <knight-card v-for="knight in knightsData" :key="knight.id" :knightId="knight.id" />
    </div>
    <ul>
      <li v-for="(knight, index) in knights" :key="index">
        {{ knight.name }} - {{ knight.class }} 
      </li>
    </ul>
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
      knightsData: knightsData,
      knights: []
    };
  },
  mounted() {
    // Recuperar os knights armazenados no localStorage quando o componente é montado
    this.knights = JSON.parse(localStorage.getItem('knights')) || [];
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