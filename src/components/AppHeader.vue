<template>
  <header class="app-header">
    <div class="logo">
      <img src="@/assets/logo.png" alt="Logo" />
    </div>

    <div class="title">
      <h1>{{ title }}</h1>
    </div>

    <div><h2>Eduardo S Muller</h2></div>
  </header>
</template>

<script>
export default {
  name: "AppHeader", 
  props: {
    title: {
      type: String,
      required: true,
    },
  },
};
</script>

<style scoped>
.app-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  background-color: white;
  color: black;
  font-weight: 600;
}

.logo img {
  max-width: 160px;
}

</style>
