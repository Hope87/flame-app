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
        <tr>
          <td>{{ currentPerson?.name }}</td>
          <td>{{ currentPerson?.height }}</td>
          <td>{{ currentPerson?.mass }}</td>
          <td>{{ currentPerson?.hair_color }}</td>
          <td>
              <Button v-if="btn" title="add" color="green" @click="addFavoritePerson(currentPerson)" />
          </td>
        </tr>
      </tbody>
    </v-table>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router'
import axiosClient from '../axiosClient'
import Button from '@/UI/Button.vue'
import { useStore } from 'vuex'
import type { IPeoples, IData } from '@/types/types';


const store = useStore()
const favoritePerson = computed(() => store.state.favoritePerson)

const route = useRoute()

const currentPerson = ref()
const btn = ref(true)

onMounted(() => {
  const id = route.params.id
  
  axiosClient.get(`people/${id}`).then(({ data }: IData) => currentPerson.value = data).then(() => {
    const favoritePeople = favoritePerson.value.find((el: IPeoples) => el.name === currentPerson.value.name)

    if (favoritePeople) {
      btn.value = false
    }
  })
})

const addFavoritePerson = (people: IPeoples) => {
  const favoritePeople = favoritePerson.value.find((el: IPeoples) => el.id === people.id)

  if (!favoritePeople) {
    store.commit('setFavoritePerson', people)
  }
}

</script>

<style lang="scss" scoped></style>