import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

// https://scotch.io/tutorials/handling-authentication-in-vue-using-vuex
export const state = {
  status: localStorage.status.replace('"','').replace(/'/g, ''),
  user : {token: localStorage.tokenlife.replace('"','').replace(/'/g, '').replace(/(?:\r\n|\r|\n)/g, '')}
}

//update state synchronously 
//**mutations should always be abstracted out and put into actions**
export const mutations = {
  AUTH_REQUEST(state){
    state.status = 'loading'
  },
  AUTH_SUCCESS_TOKEN(state, token){
    state.user.token = token
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
    state.user.token = ''
  },
}

// acts like global computed methods
export const getters = {
  isLoggedIn: state => state.user.token.length > 2,
  authStatus: state => state.status,
  user: state => state.user,
}

//asynchronously wrap business logic around mutations. 
export const actions = {
  login({commit, dispatch}, user){
    return new Promise((resolve, reject) => {
      commit('AUTH_REQUEST');
      axios({url: 'http://localhost:5000/api/auth/authenticate', data: user, method: 'POST' })
      .then(resp => {
        const user = resp.data;
        // localStorage.setItem('token', user.token);
        
        axios.defaults.headers.common['Authorization'] = `Bearer ${user.token}`;
        dispatch("authSuccess", { user }); 
        resolve(resp);
      })
      .catch(err => {
        commit('AUTH_ERROR');
        localStorage.removeItem('token');
        reject(err);
      })
    })
  },
  authSuccess({ commit }, {user}){
    commit('AUTH_SUCCESS_STATUS', 'success');
    commit('AUTH_SUCCESS_TOKEN', user.token);
    commit('AUTH_SUCCESS_USER', user);
  },
  register({ commit, dispatch }, user){
    return new Promise((resolve, reject) => {
      commit('AUTH_REQUEST');
      axios({url: 'http://localhost:5000/register', data: user, method: 'POST' })
      .then(resp => {
        const user = resp.data.user;
        axios.defaults.headers.common['Authorization'] = user.token;

        dispatch("authSuccess", { user }); 
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
      window.localStorage.clear();
    })
  }
}

export const modules = {
}
