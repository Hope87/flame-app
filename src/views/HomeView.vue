<template>
  <div class="greetings">
    <h1 class="green">Flame</h1>

    <nav>
      <RouterLink to="/peoples">Peoples</RouterLink>
      <RouterLink to="/favorites">Favorites</RouterLink>
    </nav>

  </div>
</template>



<script setup lang="ts">
import { RouterLink } from 'vue-router'

</script>



<style scoped>


.greetings {
  display: flex;
  align-items: center;
  justify-content: space-around;
}

.green {
  font-weight: 500;
  font-size: 2.6rem;
  position: relative;
}

nav {
  text-align: left;
  font-size: 1rem;

  padding: 1rem 0;
}

nav a {
  margin-right: 2rem;
}
</style>
