<template>
  <div id="app">
    <header>
    </header>
    <main>
      <KnightsList :knights="knights"/>
      <KnightForm @form-submitted="addKnight"/>
    </main>
    <footer>
    </footer>
  </div>
</template>

<script>
import KnightsList from './components/KnightsList.vue';
import KnightForm from './components/KnightForm.vue';

export default {
 
  components: {
    KnightsList,
    KnightForm
  },
  mounted() {
    const knightsFromLocalStorage = JSON.parse(localStorage.getItem('knights')) || [];
    this.knights = knightsFromLocalStorage;
  },
  methods: {
    addKnight(newKnight) {
      this.knights.push(newKnight);
      localStorage.setItem('knights', JSON.stringify(this.knights));
    }
  }
};
</script>

<style>

body {
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 0;
}

#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

header {

}

main {
  flex: 1;
  padding: 20px;
}

footer {
 
}
</style>
