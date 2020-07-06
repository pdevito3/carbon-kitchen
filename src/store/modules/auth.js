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
  AUTH_SUCCESS_TOKEN(state, token){
    state.token = token
  },
  AUTH_SUCCESS_USER(state, user){
    state.user = user
  },
  AUTH_SUCCESS_STATUS(state, status){
    state.status = status
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
  login({commit, dispatch}, user){
    return new Promise((resolve, reject) => {
      commit('AUTH_REQUEST');
      axios({url: 'http://localhost:5000/api/auth/authenticate', data: user, method: 'POST' })
      .then(resp => {
        const token = resp.data.token;
        const user = resp.data.user;
        localStorage.setItem('token', token);
        
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        dispatch("authSuccess", { token, user }); 
        resolve(resp);
      })
      .catch(err => {
        commit('AUTH_ERROR');
        localStorage.removeItem('token');
        reject(err);
      })
    })
  },
  authSuccess({ commit }, {token ,user}){
    commit('AUTH_SUCCESS_STATUS', 'success');
    commit('AUTH_SUCCESS_TOKEN', token);
    commit('AUTH_SUCCESS_USER', user);
  },
  register({ commit, dispatch }, user){
    return new Promise((resolve, reject) => {
      commit('AUTH_REQUEST');
      axios({url: 'http://localhost:5000/register', data: user, method: 'POST' })
      .then(resp => {
        const token = resp.data.token;
        const user = resp.data.user;
        localStorage.setItem('token', token);
        axios.defaults.headers.common['Authorization'] = token;

        dispatch("authSuccess", { token, user }); 
        resolve(resp);
      })
      .catch(err => {
        commit('AUTH_ERROR', err)
        localStorage.removeItem('token')
        reject(err)
      })
    })
  },
  logout({ commit }){
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
