import Vue from 'vue';
import Vuex from 'vuex';
import * as recipe from '@/store/modules/recipe'

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    recipe
  },
  state: {
    recipe: [],
    ingredients: []
  },
});
