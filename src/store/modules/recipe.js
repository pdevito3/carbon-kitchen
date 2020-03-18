import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const state = {
  recipe: [],
  ingredients: [],
  saving: false,
  pageState: "view"
}

//update state synchronously 
//**mutations should always be abstracted out and put into actions**
export const mutations = {
  SET_RECIPE(state, recipe) {
    state.recipe = recipe;
  },
  SET_INGREDIENTS(state, ingredients) {
    state.ingredients = ingredients;
  },
  ADD_INGREDIENT(state, ingredient) {
    state.ingredients.push(ingredient);
  },
  SET_SAVING(state, value) {
    state.saving = value;
  },
  SET_PAGESTATE(state, pageState) {
    state.pageState = pageState;
  }
}

// acts like global computed methods
export const getters = {
  ingredientCount: state => {
    return state.ingredients.length;
  }
}

//asynchronously wrap business logic around mutations. 
export const actions = {
  // state and commit are parts of the context object (state, commit, getters, etc.), recipe is a passed in param/payload
  setRecipe({ commit }, recipe) {
    commit('SET_RECIPE', recipe)
  },
  setIngredients({ commit }, ingredients) {
    commit('SET_INGREDIENTS', ingredients)
  },
  addIngredient({ commit }, ingredient) {
    commit('SET_SAVING', true)

    fetch(`/api/ingredients`, {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(ingredient)
    })
      .then(function (response) {
        return response.json();
      })
      .then(() =>
        commit('ADD_INGREDIENT', ingredient))
      .then(() => commit('SET_SAVING', false)
      )
      .catch(console.log("problem adding ingredient"));
  },
  updateRecipe({ commit }, recipe) {
    commit('SET_SAVING', true);

    //post here

    commit('SET_RECIPE', recipe);
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
