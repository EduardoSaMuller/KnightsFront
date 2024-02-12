<template>
  <div>
    <h1>Criar Knight</h1>
    <form @submit.prevent="createKnight">
      <div>
        <label for="name">Nome:</label>
        <input type="text" id="name" v-model="formData.name" />
      </div>
      <div>
        <label for="nickname">Nickname:</label>
        <input type="text" id="nickname" v-model="formData.nickname" />
      </div>
      <div>
        <label for="birthday">Data de Nascimento:</label>
        <input type="date" id="birthday" v-model="formData.birthday" />
      </div>
      <div>
        <label for="class">Classe:</label>
        <select id="class" v-model="formData.classe">
          <option value="">Selecione uma classe</option>
          <option value="artificer">Artificer</option>
          <option value="barbarian">Barbarian</option>
          <option value="bard">Bard</option>
          <option value="bloodHunter">Blood Hunter</option>
          <option value="cleric">Cleric</option>
          <option value="druid">Druid</option>
          <option value="fighter">Fighter</option>
          <option value="monk">Monk</option>
          <option value="paladin">Paladin</option>
          <option value="ranger">Ranger</option>
          <option value="rogue">Rogue</option>
          <option value="sorcerer">Sorcerer</option>
          <option value="warlock">Warlock</option>
          <option value="wizard">Wizard</option>
        </select>
      </div>
      <div>
        <label for="weapons">Armas:</label>
        <div v-for="(weapon, index) in formData.weapons" :key="index">
          <input type="text" v-model="weapon.name" placeholder="Nome da arma" />
            <select v-model="weapon.attr">
            <option value="">Atributo da arma</option>
            <option
              v-for="attribute in formData.availableAttributes"
              :key="attribute"
              :value="attribute"
            >
              {{ attribute }}
            </option>
          </select>

          <label for="weapons">Mod. da Arma:</label>
          <input
            type="number"
            min="-3"
            max="3"
          />

          <label>
            <input
              type="radio"
              :value="index"
              v-model="formData.equippedWeaponIndex"
            />
            Equipada
          </label>
          <button type="button" @click="removeWeapon(index)">Remover</button>
        </div>
        <button type="button" @click="addWeapon">Adicionar Arma</button>
      </div>

      <div>
        <label for="strength">Strength:</label>
        <input
          type="number"
          id="strength"
          v-model.number="formData.attributes.strength"
          min="0"
          max="30"
        />
      </div>
      <div>
        <label for="dexterity">Dexterity:</label>
        <input
          type="number"
          id="dexterity"
          v-model.number="formData.attributes.dexterity"
          min="0"
          max="30"
        />
      </div>
      <div>
        <label for="constitution">Constitution:</label>
        <input
          type="number"
          id="constitution"
          v-model.number="formData.attributes.constitution"
          min="0"
          max="30"
        />
      </div>
      <div>
        <label for="intelligence">Intelligence:</label>
        <input
          type="number"
          id="intelligence"
          v-model.number="formData.attributes.intelligence"
          min="0"
          max="30"
        />
      </div>
      <div>
        <label for="wisdom">Wisdom:</label>
        <input
          type="number"
          id="wisdom"
          v-model.number="formData.attributes.wisdom"
          min="0"
          max="30"
        />
      </div>
      <div>
        <label for="charisma">Charisma:</label>
        <input
          type="number"
          id="charisma"
          v-model.number="formData.attributes.charisma"
          min="0"
          max="30"
        />
      </div>
      <button type="submit">Salvar</button>
    </form>
  </div>
</template>

<script>
import { createKnight } from "@/services/KnightService";

export default {
  data() {
    return {
      formData: {
        name: "",
        nickname: "",
        birthday: "",
        classe: "",
        weapons: [{ name: "", equipped: false, mod: 0, attr: "" }],
        equippedWeaponIndex: null,
        attributes: {
          strength: 0,
          dexterity: 0,
          constitution: 0,
          intelligence: 0,
          wisdom: 0,
          charisma: 0,
        },
        keyAttribute: "",
        availableAttributes: [
          "strength",
          "dexterity",
          "constitution",
          "intelligence",
          "wisdom",
          "charisma",
        ],
      },
    };
  },
  methods: {
    getKeyAttribute(knightClass) {
      switch (knightClass) {
        case "bard":
        case "sorcerer":
        case "warlock":
          return "charisma";
        case "druid":
        case "cleric":
          return "wisdom";
        case "fighter":
        case "paladin":
        case "barbarian":
        case "bloodHunter":
          return "strength";
        case "rogue":
        case "ranger":
          return "dexterity";
        case "wizard":
        case "artificer":
          return "intelligence";
        default:
          return "strength";
      }
    },
    async createKnight() {

  if (
    this.formData.name &&
    this.formData.nickname &&
    this.formData.birthday &&
    this.formData.classe &&
    Object.values(this.formData.attributes).every(value => value !== 0)
  ) {
    try {
      const response = await createKnight(this.formData);
      console.log("New knight created:", response);
      this.resetForm();
      window.location.reload(); 
    } catch (error) {
      console.error("Error creating knight:", error);
    }
  } else {
    alert("Por favor, preencha todos os campos obrigatórios.");
  }
},
    resetForm() {
      this.formData = {
        name: "",
        nickname: "",
        birthday: "",
        classe: "",
        weapons: [{ name: "", equipped: false, mod: 0, attr: "" }],
        equippedWeaponIndex: null,
        attributes: {
          strength: 0,
          dexterity: 0,
          constitution: 0,
          intelligence: 0,
          wisdom: 0,
          charisma: 0,
        },
        keyAttribute: "",
        availableAttributes: [
          "strength",
          "dexterity",
          "constitution",
          "intelligence",
          "wisdom",
          "charisma",
        ],
      };
    },
    addWeapon() {
      this.formData.weapons.push({ name: "", equipped: false });
    },
    removeWeapon(index) {
      if (this.formData.equippedWeaponIndex === index) {
        this.formData.equippedWeaponIndex = null;
      }
      this.formData.weapons.splice(index, 1);
    },
  },
  watch: {
    "formData.classe": {
      handler(newVal) {
        this.formData.keyAttribute = this.getKeyAttribute(newVal);
      },
      immediate: true,
    },
  },
  mounted() {
    this.formData.keyAttribute = this.getKeyAttribute(this.formData.classe);
  },
};
</script>

<style>
/* Estilos do formulário aqui */
</style>
