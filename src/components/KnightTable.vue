<template>
  <div>
    <input type="text" v-model="searchTerm" placeholder="Pesquisar..." />
    <table>
      <thead>
        <tr>
          <th>Nome</th>
          <th>NickName</th>
          <th>Idade</th>
          <th>Armas</th>
          <th>Atributo</th>
          <th>Ataque</th>
          <th>Exp</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="!dataLoaded">
          <td colspan="8">Carregando...</td>
        </tr>
        <tr v-else-if="filteredKnights && filteredKnights.length === 0">
          <td colspan="8">Nenhum cavaleiro encontrado.</td>
        </tr>
        <tr v-else v-for="knight in filteredKnights" :key="knight._id">
          <td>{{ capitalizeFirstLetters(knight.name) }}</td>
          <td>{{ capitalizeFirstLetters(knight.nickname) }}</td>
          <td>{{ calculateAge(knight.birthday) }} anos</td>
          <td>{{ knight.weapons ? knight.weapons.length : 0 }}</td>
          <td>{{ determineKeyAttribute(knight.classe) }}</td>
          <td>{{ calculateAttack(knight) }}</td>
          <td>{{ calculateExperience(knight) }}</td>
          <td>
            <button class="button-primary" @click="editKnight(knight._id)">
              Editar
            </button>
            <button class="button-secondary" @click="deleteKnight(knight._id)">
              Excluir
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <!-- Adicionando o componente de edição de cavaleiros -->
    <KnightEditForm
      :knight="selectedKnight"
      :knightId="selectedKnight._id"
      v-if="showEditModal"
      @knight-updated="updateKnightInList"
    />
  </div>
</template>

<script>
import {
  calculateAge,
  calculateAttack,
  calculateExperience,
  determineKeyAttribute,
} from "@/utils/KnightsData.js";
import {
  getAllKnights,
  deleteKnight,
  getKnightById,
  addKnightToHeroes,
} from "@/services/KnightService"; // Certifique-se de importar a função getKnightById
import KnightEditForm from "./KnightEditForm.vue"; // Importando o componente de edição de cavaleiros

export default {
  components: {
    KnightEditForm, // Registrando o componente de edição de cavaleiros
  },
  props: {
    items: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      knights: [],
      dataLoaded: false,
      searchTerm: "",
      showEditModal: false,
      selectedKnight: null,
    };
  },
  mounted() {
    this.fetchKnights();
  },
  computed: {
    filteredKnights() {
      let filtered = this.knights;
      if (this.searchTerm) {
        const term = this.searchTerm.toLowerCase();
        filtered = filtered.filter((knight) => {
          return knight.name.toLowerCase().includes(term);
        });
      }
      return this.sortKnights(filtered);
    },
    computedProperty() {
      return this.items.length;
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
      return sentence
        .split(" ")
        .map((word) => this.capitalizeFirstLetter(word))
        .join(" ");
    },
    async fetchKnights() {
      try {
        const response = await getAllKnights();
        if (response && response.data) {
          // Filtrar os cavaleiros que não são heróis
          this.knights = response.data.filter(knight => !knight.heroes);
          this.dataLoaded = true;
        } else {
          console.error("Erro ao buscar cavaleiros: os dados da resposta estão vazios");
        }
      } catch (error) {
        console.error("Erro ao buscar cavaleiros:", error);
      }
    },
    async deleteKnight(knightId) {
      try {
        // Enviar solicitação para definir heroes como true
        const knightToUpdate = this.knights.find((knight) => knight._id === knightId);
        knightToUpdate.heroes = true;
        await addKnightToHeroes(knightToUpdate);
        console.log("Cavaleiro atualizado para herói com sucesso.");

        // Excluir o cavaleiro do servidor
        await deleteKnight(knightId);
        console.log("Cavaleiro excluído com sucesso do servidor.");

        // Remover o cavaleiro da lista local
        this.knights = this.knights.filter((knight) => knight._id !== knightId);
        console.log("Cavaleiro removido da lista local.");
      } catch (error) {
        console.error("Erro ao excluir o cavaleiro:", error);
      }
    },
    async editKnight(knightId) {
      this.selectedKnight = await this.loadKnightData(knightId);
      console.log("tem bagulho aqui ", this.selectedKnight);
      this.showEditModal = true;
    },
    async updateKnightInList(updatedKnightData) {
      // Atualizar os dados do cavaleiro na lista após a edição
      const index = this.knights.findIndex(
        (knight) => knight._id === updatedKnightData._id
      );
      if (index !== -1) {
        this.knights.splice(index, 1, updatedKnightData);
      }
      this.showEditModal = false; // Fechar o modal de edição
    },
    async loadKnightData(knightId) {
      try {
        // Verifica se o ID do cavaleiro é válido
        if (!knightId) {
          throw new Error('ID do cavaleiro inválido');
        }

        // Faz a solicitação para obter os dados do cavaleiro
        const response = await getKnightById(knightId);
        
        // Verifica se os dados foram retornados com sucesso
        if (response && response.data) {
          return response.data;
        } else {
          throw new Error('Dados do cavaleiro não foram recebidos corretamente');
        }
      } catch (error) {
        // Registra informações detalhadas sobre o erro
        console.error("Erro ao carregar os dados do cavaleiro:", error);
        throw error; // Propaga o erro para quem chamou esta função
      }
    },
    sortKnights(knights) {
      return knights.sort((a, b) => a.name.localeCompare(b.name));
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

td,
th {
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
button{
    margin: 0 5px
  }
</style>
