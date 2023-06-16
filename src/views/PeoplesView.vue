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
        <tr v-for="people in peoples" :key="people.id">
          <td style="cursor: pointer;">{{ people.name }}</td>
          <td>{{ people.height }}</td>
          <td>{{ people.mass }}</td>
          <td>{{ people.hair_color }}</td>
          <td>
            <Button :title="!checkFavoritePerson(people) ? 'add' : 'delete'" :color="!checkFavoritePerson(people) ? 'green' : 'red'" @click="addFavoritePerson(people)" />
          </td>
        </tr>
      </tbody>
    </v-table>
    <div>
      <input type="text" v-model="input"  placeholder="Search person..." />
      <div v-if="input.length">
        <div class="item person" v-for="el in searchedPeoples" :key="el.name">
        <router-link :to="{name: 'currentPeople', params: {id: el.id}}">{{ el.name }}</router-link>
      </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { IPeoples } from '@/types/types';
import { computed, onMounted, ref } from 'vue';
import { useStore } from 'vuex'
import Button from '@/UI/Button.vue';
import { watch } from 'vue';


const store = useStore()
const peoples = computed(() => store.state.peoples)
const favoritePerson = computed(() => store.state.favoritePerson)
const searchedPeoples = computed(() => store.state.searchedPeoples)
const input = ref("");


onMounted(() => {
  store.dispatch('getPeoples')
})

watch(input, (newInput) => {
 store.dispatch('searchPeoples', newInput)
})

const addFavoritePerson = (people: IPeoples) => {
  const favoritePeople = checkFavoritePerson(people)

  if (!favoritePeople) {
    store.commit('setFavoritePerson', people)
  } else {
    store.commit('deleteFavoritePerson', people.id)
  }
}

const checkFavoritePerson = (people: IPeoples) => {
 return favoritePerson.value.find((el: IPeoples) => el.id === people.id)
}

</script>

<style scoped>
input {
  display: block;
  width: 350px;
  margin: 20px 0;
  padding: 10px 45px;
  background: white url("assets/search-icon.svg") no-repeat 15px center;
  background-size: 15px 15px;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
    rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
}

.item {
  width: 350px;
  margin: 10px 0;
  padding: 10px 20px;
  color: white;
  border-radius: 5px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 3px 0px,
    rgba(0, 0, 0, 0.06) 0px 1px 2px 0px;
}

.person {
  background-color: black;
  cursor: pointer;
}
</style>
