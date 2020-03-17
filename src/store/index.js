import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    recipe: [],
    ingredients: []
  },
  //update state
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
  actions: {
  },
  modules: {
  },
});
