<template>
    <div class="knight-card" :style="{ backgroundColor: getClassColor(knight.class)}" @mouseover="darkenColor" @mouseleave="resetColor">
        <img :src="knight.imageUrl" :alt="knight.name">
        <h2>{{ knight.name }}</h2>
        <p> Age: {{ knight.age }}</p>
        <p> Weapons: {{ knight.weapons }}</p>
        <p> Attribute: {{ knight.attribute }}</p>
        <p> Attack: {{ knight.attack }}</p>
        <p> Exp: {{ knight.exp }}</p>
    </div>
</template>

<script>
import {knightsData, classColors} from '@/utils/KnightsData.js';

 export default {
    props: {
       knightId: Number,
    },
    computed: {
        knight(){
            return knightsData.find(knight => knight.id ===this.knightId)
        }
    },
    methods: {
        getClassColor(knightClass){
            return classColors[knightClass] || '#262835'
        }
    }
 }
</script>

<style lang="scss" scoped>
.knight-card {
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
  padding: 20px;
  margin: 8px ;
  position: relative;
  overflow: hidden;
  
  &:hover{
    cursor: pointer;
  }
}
</style>