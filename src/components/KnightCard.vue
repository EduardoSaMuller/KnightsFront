<template>
  <div class="knight-card" v-if="knight" :style="{ borderColor: getClassColor(knight.classe) }">
    <img :src="getImageSource(knight.classe)" alt="Knight Logo" />
     <h3>{{ capitalizeFirstLetters(knight.name) }}, {{ capitalizeFirstLetters(knight.nickname) }}</h3>
    <div class="knight-info1">
      <p>Classe: {{ capitalizeFirstLetter(knight.classe) }}</p>
      <p>Idade: {{ calculateAge(knight.birthday) }} anos</p>
    </div>
    <div class="knight-info2">
      <p>Qtd de Armas: {{ knight.weapons.length }}</p>
      <p>Ataque: {{ calculateAttack(knight) }}</p>
    </div>
    <p>Armas:</p>
    <ul>
      <li v-for="(weapon, index) in knight.weapons" :key="index">
        {{ weapon.name }} (Mod: {{ weapon.mod }})
        <span v-if="weapon.equipped">(Equipada)</span>
      </li>
    </ul>
    <p>Atributos:</p>
    <ul>
      <li>For: {{ knight.attributes.strength }}</li>
      <li>Des:{{ knight.attributes.dexterity }}</li>
      <li>Cons: {{ knight.attributes.constitution }}</li>
      <li>Int: {{ knight.attributes.intelligence }}</li>
      <li>Sab: {{ knight.attributes.wisdom }}</li>
      <li>Car: {{ knight.attributes.charisma }}</li>
    </ul>
    <p>Atributo Principal: {{ determineKeyAttribute(knight.classe) }}</p>
    <p>Experiência: {{ calculateExperience(knight) }}</p>
    <button class="button-primary" @click="openModal(knight)">Editar</button>
  </div>

  <div v-else>
    <!-- Se nenhum cavaleiro for encontrado -->
    Cavaleiro não encontrado.
  </div>
</template>

<script>
import {
  calculateAge,
  classColors,
  calculateAttack,
  calculateExperience,
  determineKeyAttribute,
  getImageSource
} from "@/utils/KnightsData.js";

export default {
  props: {
    knight: Object,
  },
  methods: {
    calculateAge,
    calculateAttack,
    calculateExperience,
    determineKeyAttribute,
    getImageSource,
    openModal(knight) {
      this.$emit('open-edit-modal', knight);
    },
    capitalizeFirstLetter(word) {
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    },
    capitalizeFirstLetters(sentence) {
      return sentence.split(' ').map(word => this.capitalizeFirstLetter(word)).join(' ');
    }, getClassColor(knightClass) {
      return classColors[knightClass] || "#262835";
    },
  },
};
</script>

<style lang="scss" scoped>
/* Estilos do componente KnightCard */
.knight-card {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width:330px;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
  margin: 8px;
  position: relative;
  overflow: hidden;
  border: 5px solid;
  background-color: white;
  font-weight: bold;
}

img {
  max-width: 100px;
  max-height: 100px;
}
</style>
