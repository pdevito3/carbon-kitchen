import Vue from 'vue';
import Vuex from 'vuex';
import * as recipe from '@/store/modules/recipe'
import * as ingredients from '@/store/modules/ingredients'
import * as shoppinglist from '@/store/modules/shoppinglist'

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    recipe,
    ingredients,
    shoppinglist
  },
  state: {
  },
});
