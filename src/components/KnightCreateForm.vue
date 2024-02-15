<template>
  <div class="container">
    <h1>Criar Knight</h1>
    <form @submit.prevent="createKnight">
      <div class="knight-content">
        <div class="did-floating-label-content">
          <input
            type="text"
            id="name"
            v-model="formData.name"
            class="did-floating-input"
            required
          />
          <label for="name" class="did-floating-label">Nome:</label>
        </div>
        <div class="did-floating-label-content">
          <input
            type="text"
            id="nickname"
            v-model="formData.nickname"
            class="did-floating-input"
            required
          />
          <label for="nickname" class="did-floating-label">Nickname:</label>
        </div>
        <div class="did-floating-label-content">
          <label for="class" class="did-floating-label select-label"
            >Classe:</label
          >
          <select
            id="class"
            v-model="formData.classe"
            class="did-floating-select"
            required
          >
            <option value=""></option>
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
        <div class="did-floating-label-content">
          <input
            type="date"
            id="birthday"
            v-model="formData.birthday"
            class="did-floating-input"
            required
          />
          <label for="birthday" class="did-floating-label"
            >Data de Nascimento:</label
          >
        </div>
        <div >
          <h4>Armas:</h4>
          <div class="weapon-content" v-for="(weapon, index) in formData.weapons" :key="index">
            <div class="did-floating-label-content">
              <input
                type="text"
                v-model="weapon.name"
                id="weaponName"
                class="did-floating-input"
                required
              />
              <label for="weaponName" class="did-floating-label">
                Nome da arma
              </label>
            </div>
            <div class="did-floating-label-content">
              <label for="attr-weapon" class="did-floating-label select-label"
                >Atributo da Arma</label
              >
              <select
                id="attr-weapon"
                v-model="weapon.attr"
                class="did-floating-select"
                required
              >
                <option value=""></option>
                <option
                  v-for="attribute in formData.availableAttributes"
                  :key="attribute"
                  :value="attribute"
                >
                  {{ attribute }}
                </option>
              </select>
            </div>
            <div class="did-floating-label-content">
              <input
                type="number"
                id="weapons"
                class="did-floating-input"
                min="-3"
                max="3"
                required
              />
              <label for="weapons" class="did-floating-label"
                >Mod. da Arma:</label
              >
            </div>
            <div class="did-floating-label-content weapon-select">
              <label>
                Equipada
                <input
                  type="radio"
                  :value="index"
                  v-model="formData.equippedWeaponIndex"
                />
              </label>
              <button
                type="button"
                class="button-secondary"
                @click="removeWeapon(index)"
              >
                Remover
              </button>
            </div>
          </div>
          <button type="button" class="button-primary" @click="addWeapon">
            Adicionar Arma
          </button>
        </div>
      </div>
      <div class="knight-content">
        <div class="did-floating-label-content">
          <input
            type="number"
            id="strength"
            v-model.number="formData.attributes.strength"
            class="did-floating-input"
            min="0"
            max="30"
            required
          />
          <label for="strength" class="did-floating-label">Strength:</label>
        </div>
        <div class="did-floating-label-content">
          <input
            type="number"
            id="dexterity"
            v-model.number="formData.attributes.dexterity"
            class="did-floating-input"
            min="0"
            max="30"
            required
          />
          <label for="dexterity" class="did-floating-label">Dexterity:</label>
        </div>
        <div class="did-floating-label-content">
          <input
            type="number"
            id="constitution"
            v-model.number="formData.attributes.constitution"
            class="did-floating-input"
            min="0"
            max="30"
            required
          />
          <label for="constitution" class="did-floating-label"
            >Constitution:</label
          >
        </div>
        <div class="did-floating-label-content">
          <input
            type="number"
            id="intelligence"
            v-model.number="formData.attributes.intelligence"
            class="did-floating-input"
            min="0"
            max="30"
            required
          />
          <label for="intelligence" class="did-floating-label"
            >Intelligence:</label
          >
        </div>
        <div class="did-floating-label-content">
          <input
            type="number"
            id="wisdom"
            v-model.number="formData.attributes.wisdom"
            class="did-floating-input"
            min="0"
            max="30"
            required
          />
          <label for="wisdom" class="did-floating-label">Wisdom:</label>
        </div>
        <div class="did-floating-label-content">
          <input
            type="number"
            id="charisma"
            v-model.number="formData.attributes.charisma"
            class="did-floating-input"
            min="0"
            max="30"
            required
          />
          <label for="charisma" class="did-floating-label">Charisma:</label>
        </div>
      </div>
      <button class="button-primary btn-save" type="submit">Salvar</button>
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
    async createKnight() {
      if (
        this.formData.name &&
        this.formData.nickname &&
        this.formData.birthday &&
        this.formData.classe &&
        Object.values(this.formData.attributes).every((value) => value !== 0)
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

<style scoped>
.container {
  width: 430px;
  padding: 20px;
  margin: 0 auto;
  font-family: "Inter", sans-serif;
}

.did-floating-label-content {
  position: relative;
  margin-bottom: 20px;
  width: 175px;
  margin: 5px 10px;
}

.did-floating-label {
  color: #1e4c82;
  font-size: 13px;
  font-weight: normal;
  position: absolute;
  pointer-events: none;
  left: 20px;
  top: 11px;
  padding: 0 5px;
  background: #fff;
  transition: 0.2s ease all;
}

.did-floating-input,
.did-floating-select {
  font-size: 12px;
  display: block;
  width: 100%;
  height: 36px;
  padding: 0 20px;
  background: #fff;
  color: #323840;
  border: 1px solid #3d85d8;
  border-radius: 4px;
  box-sizing: border-box;
}
.select-label {
  top: -6px;
}

.did-floating-input:focus {
  outline: none;
}


.did-floating-input:not(:placeholder-shown) ~ .did-floating-label,
.did-floating-select:not([value=""]):valid ~ .did-floating-label {
  top: -8px;
  font-size: 13px;
}

h1 {
  text-align: center;
}
form {
  display: flex;
  flex-wrap: wrap;
  max-height: 600px;
  overflow-y: auto;
}
div.content {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
}
.knight-content {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  margin-top: 15px;
}
.btn-save {
  width: 100%;
  margin-top: 25px;
}

.weapon-content{
  display: flex;
  flex-wrap: wrap;
}
.weapon-button button{
  margin-left: 10px;
}
.weapon-select{
  display: flex;
  justify-content: center;
  align-items: center;
}
.weapon-select input{
  margin-left: 25px;
}
h4{
  margin-left: 10px;
}
</style>
