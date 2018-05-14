import Vue from 'vue'
import Vuex from 'vuex'

import User from '@/models/User'
import * as MutationTypes from './mutation-types'

Vue.use(Vuex)

const store = new Vuex.Store({
  state : {
    user: User.from(localStorage.token)
  },
  getters: {
    currentUser : state => {
      return state.user
    }
  },
  mutations: {
    [MutationTypes.LOGIN] (state) {
      state.user = User.from(localStorage.token)
    },
    [MutationTypes.LOGOUT] (state) {
      state.user = null
    }    
  },
  actions: {
    login ({ commit }) {
      commit(MutationTypes.LOGIN)
    },
  
    logout ({ commit }) {
      commit(MutationTypes.LOGOUT)
    }    
  }
})

export default store