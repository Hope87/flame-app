<template>
  <v-btn :style="{ backgroundColor: color, color: 'white' }">
    {{ title }}
  </v-btn>
</template>

<script setup lang="ts">

defineProps({
  title: String,
  color: String,
})


</script>

<style scoped></style>