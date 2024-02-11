<template>
  <div id="app">
    <header>
      <!-- Seu cabeçalho aqui -->
    </header>
    <main>
      <KnightsList />
    </main>
    <footer>
      <!-- Seu rodapé aqui -->
    </footer>
  </div>
</template>

<script>
import KnightsList from './components/KnightsList.vue';

export default {
  components: {
    KnightsList
  }
};
</script>

<style>
/* Estilos globais ou do componente App */
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
  /* Estilos do cabeçalho */
}

main {
  flex: 1;
  padding: 20px;
}

footer {
  /* Estilos do rodapé */
}
</style>
