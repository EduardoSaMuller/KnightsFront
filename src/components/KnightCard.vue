<template>
  <div
    class="knight-card"
    v-if="knight"
    :style="{ borderColor: getClassColor(knight.classe) }"
  >
    <img :src="getImageSource(knight.classe)" alt="Knight Logo" />
    <h3>{{ knight.name }}, {{ knight.nickname }}</h3>
    <div class="knight-info1">
      <p>Classe: {{ knight.classe }}</p>
      <p>Idade: {{ calculateAge(knight.birthday) }} anos</p>
    </div>
    <div class="knight-info2">
      <p>Qtd de Armas: {{ knight.weapons.length }}</p>
      <p>Ataque {{ calculateAttack(knight) }}</p>
      
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
      <li>Força: {{ knight.attributes.strength }}</li>
      <li>Destreza:{{ knight.attributes.dexterity }}</li>
      <li>Constituição: {{ knight.attributes.constitution }}</li>
      <li>Inteligência: {{ knight.attributes.intelligence }}</li>
      <li>Sabedoria: {{ knight.attributes.wisdom }}</li>
      <li>Carisma: {{ knight.attributes.charisma }}</li>
    </ul>
    <p>Attributo Principal: {{ determineKeyAttribute(knight.class) }}</p>
    <p>Experiência: {{ calculateExperience(knight) }}</p>
    <button @click="openModal">Editar</button>
    <div class="modal" v-if="isModalOpen" @click.self="closeModal">
      <div class="modal-content">
        <span class="close" @click="closeModal">&times;</span>
        <h2>Edit Knight</h2>
        <div>
          <label for="nickname">Nickname:</label>
          <input type="text" id="nickname" v-model="editedNickname" required>
          <button @click="updateKnight">Salvar</button>
        </div>
      </div>
    </div>
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
  getImageSource
} from "@/utils/KnightsData.js";

export default {
  props: {
    knight: Object,
  },
  data() {
    return {
      editedNickname: '',
      isModalOpen: false
    };
  },
  methods: {
    getClassColor(knightClass) {
      return classColors[knightClass] || "#262835";
    },
    calculateAge,
    calculateAttack,
    calculateExperience,
    determineKeyAttribute,
    getImageSource,
    openModal() {
      this.isModalOpen = true;
      this.editedNickname = this.knight.nickname; 
    },
    closeModal() {
      this.isModalOpen = false;
    },
    updateKnight() {
      const updatedKnight = {
        ...this.knight,
        nickname: this.editedNickname
      };
      this.$emit('update-knight', updatedKnight);
      this.closeModal();
    }
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

img{
  max-width: 100px;
  max-height: 100px;
}
</style>
