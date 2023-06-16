import { createStore } from 'vuex'
import axiosClient from '../axiosClient';
import type { IPeoples, IData } from '../types/types';



export interface State {
    peoples: IPeoples[]
    favoritePerson: IPeoples[]
    searchedPeoples: IPeoples[]
  }

  export const store = createStore<State>({
    state: {
      peoples: [],
      favoritePerson: [],
      searchedPeoples: []
    },
    mutations: {
      setPeoples (state: State, results: IPeoples[]) {
          state.peoples = results.map((result) => {
            
            return {...result, id: result.url.split('/', 6).pop()}
          })
        },
        setFavoritePerson (state: State, person: IPeoples) {
          state.favoritePerson.push(person)
        },
        deleteFavoritePerson (state: State, id: string) {
          state.favoritePerson = state.favoritePerson.filter(el => el.id !== id)
        },
        searchedPeoples (state: State, results: IPeoples[]) {
          state.searchedPeoples = results.map((result) => {
            return {...result, id: result.url.split('/', 6).pop()}
          })
        },
      },
      actions: {
        getPeoples ({commit}: any) {
          axiosClient.get('people').then(({data}: IData) => {
            commit('setPeoples', data.results)
          })
        },
        searchPeoples ({commit}: any, letter: string){
          axiosClient.get(`/people/?search=${letter}`).then(({data}: IData) => {
            commit('searchedPeoples', data.results)
          })
        }
      }
  })