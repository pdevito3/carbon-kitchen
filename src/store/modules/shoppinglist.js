import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export const state = {
  shoppingListItems: [],
  addShoppingListItemsModalOpen: false
}

//update state synchronously 
//**mutations should always be abstracted out and put into actions**
export const mutations = {
  UPDATE_SHOPPINGLISTITEMS(state, shoppingListItems) {
    state.shoppingListItems = shoppingListItems;
  },
  TOGGLE_ADDSHOPPINGLISTITEMMODAL(state) {
    state.addShoppingListItemsModalOpen = !state.addShoppingListItemsModalOpen;
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
  getShoppingListItems({commit}) {
      axios.get(`http://localhost:5002/api/v1/shoppingListItems/`)
      .then(res => {
        commit('UPDATE_SHOPPINGLISTITEMS', res.data);
        return res.data;
      });
  },
  AddIngredientsToList({ commit, dispatch }, shoppingListItemsToAdd) {
   shoppingListItemsToAdd.map(async (itemToAdd) => {
      itemToAdd.acquired = false;
      itemToAdd.hidden = false;
      itemToAdd.shoppingListId = 1;
      itemToAdd.category = "TBD via Lookup endpoint";
      axios.post(
        `http://localhost:5002/api/v1/shoppingListItems/`,
        JSON.stringify(itemToAdd),
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }).then(res => {
          dispatch("getShoppingListItems");
        });
    })
  },
  setEditableShoppingListItem({ commit }, editableShoppingListItem) {
    commit('SET_EDITABLESHOPPINGLISTITEM', editableShoppingListItem)
  },
  toggleShoppingListItemModal({ commit }){
    commit('TOGGLE_ADDSHOPPINGLISTITEMMODAL')
  }
}

export const modules = {
}
