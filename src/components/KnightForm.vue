<template>
  <form @submit.prevent="submitForm">
    <label>Name:</label>
    <input type="text" v-model="formData.name" required />
    <label>Nickname:</label>
    <input type="text" v-model="formData.nickname" required />
    <label>Birthday:</label>
    <input type="date" v-model="formData.birthday" required />
    <label>Class:</label>
    <select v-model="formData.class" required>
      <option value="artificer">Artificer</option>
      <option value="bard">Bard</option>
      <option value="barbarian">Barbarian</option>
      <option value="bloodhunter">Bloodhunter</option>
      <option value="cleric">Cleric</option>
      <option value="druid">Druid</option>
      <option value="fighter">Fighter</option>
      <option value="paladin">Paladin</option>
      <option value="ranger">Ranger</option>
      <option value="rogue">Rogue</option>
      <option value="sorcerer">Sorcerer</option>
      <option value="warlock">Warlock</option>
      <option value="wizard">Wizard</option>
    </select>
    <label>Attributes: </label>
    <label>Strength:</label>
    <input
      type="number"
      v-model="formData.attributes.strength"
      :min="0"
      :max="20"
      required
    />
    <label>Dexterity:</label>
    <input
      type="number"
      v-model="formData.attributes.dexterity"
      :min="0"
      :max="20"
      required
    />
    <label>Constitution:</label>
    <input
      type="number"
      v-model="formData.attributes.constitution"
      :min="0"
      :max="20"
      required
    />
    <label>Intelligence:</label>
    <input
      type="number"
      v-model="formData.attributes.intelligence"
      :min="0"
      :max="20"
      required
    />
    <label>Wisdom:</label>
    <input
      type="number"
      v-model="formData.attributes.wisdom"
      :min="0"
      :max="20"
      required
    />
    <label>Charisma:</label>
    <input
      type="number"
      v-model="formData.attributes.charisma"
      :min="0"
      :max="20"
      required
    />
    <label>Key Attribute:</label>
    <input type="text" v-model="formData.keyAttribute" :readonly="true" />
    <button type="submit">Save</button>
  </form>
</template>

<script>
import { determineKeyAttribute } from "@/utils/KnightsData.js";

export default {
  data() {
    return {
      formData: {
        name: "",
        nickname: "",
        birthday: "",
        class: "",
        keyAttribute: "",
        attributes: {
          strength: 10,
          dexterity: 10,
          constitution: 10,
          intelligence: 10,
          wisdom: 10,
          charisma: 10,
        },
      },
    };
  },
  methods: {
    updateKeyAttribute() {
      this.formData.keyAttribute = determineKeyAttribute(this.formData.class);
    },
    submitForm() {
      const newKnight = this.formData;
      const knightsFromLocalStorage =
        JSON.parse(localStorage.getItem("knights")) || [];
      knightsFromLocalStorage.push(newKnight);
      localStorage.setItem("knights", JSON.stringify(knightsFromLocalStorage));

      this.$emit("form-submitted", newKnight);
      console.log(this.formData);
    },
    created() {
      this.formData.attributes.strength =
        this.formData.attributes.strength || 10;
    },
    resetForm() {
      this.formData.attributes.strength = null;
    },
  },
  watch: {
    "formData.class": "updateKeyAttribute",
  },
};
</script>

<style scoped></style>
