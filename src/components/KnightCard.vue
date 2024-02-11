<template>
    <div class="knight-card" :style="{ backgroundColor: getClassColor(knight.class)}" @mouseover="darkenColor" @mouseleave="resetColor">
        <!-- <img :src="knight.imageUrl" :alt="knight.name"> -->
        <h2>{{ knight.name }}</h2>
        <p>Nickname: {{ knight.nickname }}</p>
        <p>Class: {{ knight.class }} </p>
        <p>Birthday: {{ knight.birthday }}</p>
        <p>Weapon: {{ knight.weapons.name }}</p>
        <p>Attributes:</p>
        <ul>
            <li>Strength: {{ knight.attributes.strength }}</li>
            <li>Dexterity:{{ knight.attributes.dexterity }}</li>
            <li>Constitution: {{ knight.attributes.constitution }}</li>
            <li>Intelligence: {{ knight.attributes.intelligence }}</li>
            <li>Wisdom: {{ knight.attributes.wisdom }}</li>
            <li>Charisma: {{ knight.attributes.charisma }}</li>
        </ul>
       
        <p>Key Attribute: {{ determineKeyAttribute(knight.class) }}</p>
        <p>Attack: {{ calculateAttack(knight) }}</p>
        <p>Experience: {{ calculateExperience(knight) }}</p>
    </div>
    
</template>

<script>
import {knightsData, classColors, calculateAttack,calculateExperience, determineKeyAttribute} from '@/utils/KnightsData.js';

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
        },
        calculateAttack,
        calculateExperience,
        determineKeyAttribute
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