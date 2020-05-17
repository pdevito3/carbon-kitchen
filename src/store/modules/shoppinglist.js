import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import router from '@/router';

Vue.use(Vuex);

export const state = {
  shoppingListItem: [],
  shoppingListItems: [],
}

//update state synchronously 
//**mutations should always be abstracted out and put into actions**
export const mutations = {
  UPDATE_SHOPPINGLISTITEM(state, shoppingListItem) {
    state.shoppingListItem = shoppingListItem;
  },
  UPDATE_SHOPPINGLISTITEMS(state, shoppingListItems) {
    state.shoppingListItems = shoppingListItems;
  },
}

// acts like global computed methods
export const getters = {
  shoppingListItemCount: state => {
    return state.shoppingListItems.length;
  }
}

//asynchronously wrap business logic around mutations. 
export const actions = {
  getShoppingListItem({dispatch, commit}, shoppingListItemId) {
      axios.get(`http://localhost:5002/api/v1/shoppingListItems/${shoppingListItemId}`)
      .then(res => {
        commit('UPDATE_SHOPPINGLISTITEM', res.data);
        return res.data;
      });
  },
  getShoppingListItems({dispatch, commit}) {
      axios.get(`http://localhost:5002/api/v1/shoppingListItems/`)
      .then(res => {
        commit('UPDATE_SHOPPINGLISTITEMS', res.data);
        return res.data;
      });
  },
  createNewShoppingListItem({ dispatch, commit }, shoppingListItem) {
    axios.post(
      `http://localhost:5002/api/v1/shoppingListItems/`,
      JSON.stringify(shoppingListItem),
      {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(res => {
        let response = res.data;

        commit('UPDATE_SHOPPINGLISTITEM', response);
        dispatch("getShoppingListItems");
        
        dispatch("startEdit");  
        router.push(`/myshoppingListItems/shoppingListItem/${response.shoppingListItemId}`);

        return response.shoppingListItemId;
      });
  },
  createNewBlankShoppingListItem({ dispatch }) {
    dispatch("createNewShoppingListItem", {});      
  },
  startEdit({ commit, dispatch, rootState, state }) {  
    dispatch("setEditableShoppingListItem", Object.assign({},state.shoppingListItem)); 
  },
  updateShoppingListItem({ dispatch, commit }, shoppingListItem) {  
    axios.put(
      `http://localhost:5002/api/v1/shoppingListItems/${shoppingListItem.shoppingListItemId}`,
      JSON.stringify(shoppingListItem),
      {
        headers: {
          'Content-Type': 'application/json'
        }
      })
    .then(() => {
      // var addedShoppingListItem = dispatch('getShoppingListItem', shoppingListItem.shoppingListItemId); // this guarantees accuracy, but is causing flicker
      commit('UPDATE_SHOPPINGLISTITEM', shoppingListItem);
      commit('SET_SAVING', false);
    });
  },
  setEditableShoppingListItem({ commit }, editableShoppingListItem) {
    commit('SET_EDITABLESHOPPINGLISTITEM', editableShoppingListItem)
  },
}

export const modules = {
}
