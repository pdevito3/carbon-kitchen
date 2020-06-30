import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export const state = {
  nonAquiredShoppingListItems: [],
  aquiredShoppingListItems: [],
  addShoppingListItemsModalOpen: false
}

//update state synchronously 
//**mutations should always be abstracted out and put into actions**
export const mutations = {
  UPDATE_NONACQUIRED_SHOPPINGLISTITEMS(state, shoppingListItems) {
    state.nonAquiredShoppingListItems = shoppingListItems;
  },
  UPDATE_ACQUIRED_SHOPPINGLISTITEMS(state, shoppingListItems) {
    state.aquiredShoppingListItems = shoppingListItems;
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
  getNonAcquiredShoppingListItems({commit}) {
      axios.get(`http://localhost:5002/api/v1/shoppingListItems/?filters=acquired==false, hidden==false`)
      .then(res => {
        commit('UPDATE_NONACQUIRED_SHOPPINGLISTITEMS', res.data);
        return res.data;
      });
  },
  getAcquiredShoppingListItems({commit}) {
      axios.get(`http://localhost:5002/api/v1/shoppingListItems/?filters=acquired==true, hidden==false&sortorder=name`)
      .then(res => {
        commit('UPDATE_ACQUIRED_SHOPPINGLISTITEMS', res.data);
        return res.data;
      });
  },
  toggleShoppingListItemModal({ commit }){
    commit('TOGGLE_ADDSHOPPINGLISTITEMMODAL')
  },
  toggleItemAcquisition({ dispatch }, { itemId, acquired }) {
    let patchDoc = [{ "op": "replace", "path": "/acquired", "value": acquired}] ;
    
    axios.patch(
      `http://localhost:5002/api/v1/shoppingListItems/${itemId}`,
      JSON.stringify(patchDoc),
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(res => {
        dispatch("getAcquiredShoppingListItems");
        dispatch("getNonAcquiredShoppingListItems");
      });
    
  },
  setEditableShoppingListItem({ commit }, editableShoppingListItem) {
    commit('SET_EDITABLESHOPPINGLISTITEM', editableShoppingListItem)
  },
  addIngredientsToList({ commit, dispatch }, shoppingListItemsToAdd) {
    shoppingListItemsToAdd.map(async (itemToAdd) => {
      itemToAdd.acquired = false;
      itemToAdd.hidden = false;
      itemToAdd.shoppingListId = 1;
      itemToAdd.category = "Unknown";
      axios.post(
        `http://localhost:5002/api/v1/shoppingListItems/`,
        JSON.stringify(itemToAdd),
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }).then(res => {
          dispatch("getAcquiredShoppingListItems");
          dispatch("getNonAcquiredShoppingListItems");
        });
    })
  }
}

export const modules = {
}
