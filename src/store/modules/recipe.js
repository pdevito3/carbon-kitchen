import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const state = {
  recipe: [],
  saving: false,
  pageState: "view"
}


//update state synchronously 
//**mutations should always be abstracted out and put into actions**
export const mutations = {
  UPDATE_RECIPE(state, recipe) {
    state.recipe = recipe;
  },
  SET_SAVING(state, value) {
    state.saving = value;
  },
  SET_PAGESTATE(state, pageState) {
    state.pageState = pageState;
  }
}

// acts like global computed methods
export const getters = {}

//asynchronously wrap business logic around mutations. 
export const actions = {
  // state and commit are parts of the context object (state, commit, getters, etc.), recipe is a passed in param/payload
  // updateRecipe({ commit }, recipe) {
  //   commit('UPDATE_RECIPE', recipe)
  // },
  getRecipe({dispatch}, recipeId) {
    fetch(`/api/recipes/${recipeId}`)
      .then(res => res.json())
      .then(json => {
        dispatch('updateRecipe', json.recipe)
      });
  },
  updateRecipe({ commit }, recipe) {
    commit('SET_SAVING', true);

    fetch(`/api/recipes/${recipe.recipeId}`, {
      method: 'put',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(recipe)
    })

    commit('UPDATE_RECIPE', recipe);
    commit('SET_SAVING', false);
  },
  setSaving({ commit }, value) {
    commit('SET_SAVING', value)
  },
  setPageState({ commit }, pageState) {
    commit('SET_PAGESTATE', pageState)
  },
}

export const modules = {
}
