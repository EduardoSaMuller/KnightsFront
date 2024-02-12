<template>
  <div class="knights-list">
  <knight-card v-for="knight in filteredKnights" :key="knight.id" :knight="knight" @open-edit-modal="openKnightModalEdit" />
  </div>
 
</template>
<script>
import { getAllKnights } from '@/services/KnightService';
import KnightCard from './KnightCard.vue';

export default {
  components: {
      KnightCard,
  },
  data() {
    return {
      knights: [],
      searchTerm: '',
      sortBy: 'name',
      dataLoaded: false
    };
  },
  computed: {
    filteredKnights() {
      let filtered = this.knights;
      if (this.searchTerm) {
        const term = this.searchTerm.toLowerCase();
        filtered = filtered.filter(knight => {
          return (
            knight.name.toLowerCase().includes(term) ||
            knight.nickname.toLowerCase().includes(term) ||
            knight.classe.toLowerCase().includes(term)
          );
        });
      }
      return this.sortKnights(filtered);
    }
  },
  mounted() {
    this.fetchKnights();
  },
  methods: {
    async fetchKnights() {
      try {
        const response = await getAllKnights();
        if (response && response.data) {
          this.knights = response.data;
          this.dataLoaded = true;
        } else {
          console.error('Error fetching knights: Response data is empty');
        }
      } catch (error) {
        console.error('Error fetching knights:', error);
      }
    },
    sortKnights(knights) {
      if (!knights || !Array.isArray(knights) || knights.length === 0) {
        return [];
      }

      switch (this.sortBy) {
        case 'name':
          return knights.sort((a, b) => a.name.localeCompare(b.name));
        case 'class':
          return knights.sort((a, b) => a.classe.localeCompare(b.classe));
        case 'experience':
          return knights.sort((a, b) => this.calculateExperience(a) - this.calculateExperience(b));
        default:
          return knights;
      }
    },
    calculateExperience(knight) {
      const age = new Date().getFullYear() - new Date(knight.birthday).getFullYear();
      return age >= 7 ? Math.floor((age - 7) * Math.pow(22, 1.45)) : 0;
    }
  }
};
</script>

<style scoped>

.knights-list {
  display: flex;
  flex-wrap: wrap;
}
</style>
