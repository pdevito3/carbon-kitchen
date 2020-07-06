import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

// https://scotch.io/tutorials/handling-authentication-in-vue-using-vuex
export const state = {
  status: '',
  token: localStorage.getItem('token') || '',
  user : {}
}

//update state synchronously 
//**mutations should always be abstracted out and put into actions**
export const mutations = {
  AUTH_REQUEST(state){
    state.status = 'loading'
  },
  AUTH_SUCCESS(state, token, user){
    state.status = 'success'
    state.token = token
    state.user = user
  },
  AUTH_ERROR(state){
    state.status = 'error'
  },
  LOGOUT(state){
    state.status = ''
    state.token = ''
  },
}

// acts like global computed methods
export const getters = {
  isLoggedIn: state => !!state.token,
  authStatus: state => state.status,
}

//asynchronously wrap business logic around mutations. 
export const actions = {
  login({commit}, user){
    return new Promise((resolve, reject) => {
      commit('AUTH_REQUEST')
      axios({url: 'http://localhost:5000/api/auth/authenticate', data: user, method: 'POST' })
      .then(resp => {
        const token = resp.data.token
        const user = resp.data.user
        localStorage.setItem('token', token)
        
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
        commit('AUTH_SUCCESS', token, user)
        resolve(resp)
      })
      .catch(err => {
        commit('AUTH_ERROR')
        localStorage.removeItem('token')
        reject(err)
      })
    })
  },
  register({commit}, user){
    return new Promise((resolve, reject) => {
      commit('AUTH_REQUEST')
      axios({url: 'http://localhost:5000/register', data: user, method: 'POST' })
      .then(resp => {
        const token = resp.data.token
        const user = resp.data.user
        localStorage.setItem('token', token)
        axios.defaults.headers.common['Authorization'] = token
        commit('AUTH_SUCCESS', token, user)
        resolve(resp)
      })
      .catch(err => {
        commit('AUTH_ERROR', err)
        localStorage.removeItem('token')
        reject(err)
      })
    })
  },
  logout({commit}){
    return new Promise((resolve, reject) => {
      commit('LOGOUT')
      localStorage.removeItem('token')
      delete axios.defaults.headers.common['Authorization']
      resolve()
    })
  }
}

export const modules = {
}
