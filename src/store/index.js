import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    recipe: [],
    ingredients: []
  },
  //update state synchronously 
  //**mutations should always be abstracted out and put into actions**
  mutations: {
    SET_RECIPE(state, recipe) {
      state.recipe = recipe;
    },
    SET_INGREDIENTS(state, ingredients) {
      state.ingredients = ingredients;
    }
  },
  // acts like global computed methods
  getters: {
    ingredientCount: state => {
      return state.ingredients.length;
    }
  },
  //asynchronously wrap business logic around mutations. 
  actions: {
    // state and commit are parts of the context object (state, commit, getters, etc.), recipe is a passed in param/payload
    setRecipe({ commit }, recipe) {
      commit('SET_RECIPE', recipe)
    },
    setIngredients({ commit }, ingredients) {
      commit('SET_INGREDIENTS', ingredients)
    },
    updateRecipe({ commit }, recipe) {
      commit('SET_RECIPE', recipe)
    },
  },
  modules: {
  },
});
