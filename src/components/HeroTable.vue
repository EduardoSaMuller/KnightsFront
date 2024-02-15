<template>
    <div>
      <input type="text" v-model="searchTerm" placeholder="Pesquisar...">
      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Idade</th>
            <th>Armas</th>
            <th>Atributo</th>
            <th>Ataque</th>
            <th>Exp</th>
            <th>Herói</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="!dataLoaded">
            <td colspan="7">Carregando...</td>
          </tr>
          <tr v-else-if="filteredHeroes && filteredHeroes.length === 0">
            <td colspan="7">Nenhum herói encontrado.</td>
          </tr>
          <tr v-else v-for="hero in filteredHeroes" :key="hero._id">
            <td>{{ capitalizeFirstLetters(hero.name) }}</td>
            <td>{{ calculateAge(hero.birthday) }} anos</td>
            <td>{{ hero.weapons ? hero.weapons.length : 0 }}</td>
            <td>{{ determineKeyAttribute(hero.classe) }}</td>
            <td>{{ calculateAttack(hero) }}</td>
            <td>{{ calculateExperience(hero) }}</td>
            <td>
<input type="checkbox" :checked="hero.heroes"  class="selected-checkbox">            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script>
  import { calculateAge, calculateAttack, calculateExperience, determineKeyAttribute } from "@/utils/KnightsData.js";
  import { getAllKnights } from '@/services/KnightService'; // Certifique-se de importar a função getAllKnights
  
  export default {
    data() {
      return {
        heroes: [],
        dataLoaded: false,
        searchTerm: '',
      };
    },
    mounted() {
      this.fetchHeroes();
    },
    computed: {
      filteredHeroes() {
        let filtered = this.heroes;
        if (this.searchTerm) {
          const term = this.searchTerm.toLowerCase();
          filtered = filtered.filter(hero => {
            return hero.name.toLowerCase().includes(term);
          });
        }
        return filtered;
      },
    },
    methods: {
      calculateAge,
      calculateAttack,
      calculateExperience,
      determineKeyAttribute,
      capitalizeFirstLetter(word) {
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
      },
      capitalizeFirstLetters(sentence) {
        return sentence.split(' ').map(word => this.capitalizeFirstLetter(word)).join(' ');
      },
      async fetchHeroes() {
        try {
          const response = await getAllKnights();
          if (response && response.data) {
            this.heroes = response.data.filter(hero => hero.heroes === true);
            this.dataLoaded = true;
          } else {
            console.error('Erro ao buscar heróis: os dados da resposta estão vazios');
          }
        } catch (error) {
          console.error('Erro ao buscar heróis:', error);
        }
      },
    },
  };
  </script>
  
  <style scoped>
  table {
    font-family: arial, sans-serif;
    border-collapse: collapse;
    width: 100%;
  }
  
  td, th {
    border: 1px solid #dddddd;
    text-align: left;
    padding: 8px;
    text-align: center;
  }
  
  th,
  tr {
    background-color: white;
  }
  
  tr:nth-child(even) {
    background-color: #dddddd;
  }
  
  .pagination {
    text-align: right;
    margin-top: 16px;
  }
  
  span {
    margin: 0 5px;
  }
  .selected-checkbox {
  color: blue; /* Altera a cor do checkbox selecionado para azul */
}
  </style>
  