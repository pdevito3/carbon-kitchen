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
    setRecipe(recipe) {
      state.recipe = recipe;
    },
    setIngredients(ingredients) {
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
