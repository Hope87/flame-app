<template>
    <div>
      <div style="margin-bottom: 20px;">
      <router-link to="/">Home</router-link>
    </div>
        <v-table>
      <thead>
        <tr>
          <th class="text-left">
            Name
          </th>
          <th class="text-left">
            Height
          </th>
          <th class="text-left">
            Mass
          </th>
          <th class="text-left">
            Hair Color
          </th>
          <th class="text-left">
            Favorite person
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="person in favoritePerson" :key="person.id">
          <td style="cursor: pointer;">{{ person.name }}</td>
          <td>{{ person.height }}</td>
          <td>{{ person.mass }}</td>
          <td>{{ person.hair_color }}</td>
          <td>
            <Button title="delete" color="green" @click="deleteFavoritePerson(person.id)"/>
          </td>
        </tr>
      </tbody>
    </v-table>
    </div>
</template>

<script setup lang="ts">
import Button from '@/UI/Button.vue'
import { computed } from 'vue';
import { useStore } from 'vuex'

const store = useStore()

const favoritePerson = computed(() => store.state.favoritePerson)

const deleteFavoritePerson = (id: string) => {
    store.commit('deleteFavoritePerson', id)
}

</script>

<style scoped>

</style>