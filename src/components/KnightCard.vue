<template>
  <div
    class="knight-card"
    v-if="knight"
    :style="{ borderColor: getClassColor(knight.classe) }"
  >
    <h2>{{ knight.name }}, {{ knight.nickname }}</h2>
    <p>Classe: {{ knight.classe }} ,</p>
    <p>Idade: {{ calculateAge(knight.birthday)}} anos</p>
    <p>Armas {{ knight.weapons.length }}</p>
    <p>Armas:</p>
    <ul>
      <li v-for="(weapon, index) in knight.weapons" :key="index">
        {{ weapon.name }} (Mod: {{ weapon.mod }}) <span v-if="weapon.equipped">(Equipada)</span>

      </li>
    </ul>
    <p>Ataque {{ calculateAttack(knight) }}</p>
    <p>Atributos:</p>
    <ul>
      <li>Força: {{ knight.attributes.strength }}</li>
      <li>Destreza:{{ knight.attributes.dexterity }}</li>
      <li>Constituição: {{ knight.attributes.constitution }}</li>
      <li>Inteligência: {{ knight.attributes.intelligence }}</li>
      <li>Sabedoria: {{ knight.attributes.wisdom }}</li>
      <li>Carisma: {{ knight.attributes.charisma }}</li>
    </ul>
    <p>Attributo Principal: {{ determineKeyAttribute(knight.class) }}</p>
    <p>Experiência: {{ calculateExperience(knight) }}</p>
  </div>
  <div v-else>
    <!-- Se knight não for encontrado nenhum knight -->
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
} from "@/utils/KnightsData.js";

export default {
  props: {
    knight: Object,
  },
  methods: {
    getClassColor(knightClass) {
      return classColors[knightClass] || "#262835";
    },
    calculateAge,
    calculateAttack,
    calculateExperience,
    determineKeyAttribute,
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
  max-width: 400px;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
  margin: 8px;
  position: relative;
  overflow: hidden;
  border: 2px solid;
}
</style>
