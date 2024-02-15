<template>
    <div class="container">
      <h1>Editar Knight</h1>
      <form @submit.prevent="updateKnight">
        <div class="knight-content">
          <div class="did-floating-label-content">
            <input
              type="text"
              id="name"
              :value="formData.name"
              class="did-floating-input"
              readonly
              disabled
            />
            <label for="name" class="did-floating-label">Nome:</label>
          </div>
          <div class="did-floating-label-content">
            <input
              type="text"
              id="nickname"
              v-model="formData.nickname"
              class="did-floating-input"
            />
            <label for="nickname" class="did-floating-label">Nickname:</label>
          </div>         
        </div>
        
        <button class="button-primary btn-save">Salvar</button>
      </form>
    </div>
  </template>
  
  <script>
import { getKnightById, updateKnight } from "@/services/KnightService";

export default {
  props: {
    knightId: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      formData: { attributes: {} },
      nickname: ''
    };
  },
  methods: {
    async loadKnightData() {
      try {
        const knightData = await getKnightById(this.knightId);
        this.formData = knightData.data;
        console.log(this.formData, 'eitcha');
      } catch (error) {
        console.error("Erro ao carregar os dados do Knight:", error);
      }
    },
    async updateKnight() {
      try {
        const response = await updateKnight(this.formData._id, this.formData);
        console.log("Knight atualizado:", response);
        window.location.reload();
      } catch (error) {
        console.error("Erro ao atualizar o Knight:", error);
       
      }
    },
    addWeapon() {
      this.formData.weapons.push({ name: "", equipped: false });
    },
    removeWeapon(index) {
      if (this.formData.equippedWeaponIndex === index) {
        this.formData.equippedWeaponIndex = null;
      }
      this.formData.weapons.splice(index, 1);
    }
  },
  mounted() {
    this.loadKnightData();
  }
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
  