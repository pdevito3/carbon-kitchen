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
  DELETE_INGREDIENT(state, ingredientId) {
    let index = state.ingredients.map(e => e.ingredientId).indexOf(ingredientId);

    if (index !== -1) state.ingredients.splice(index, 1);

    // state.ingredients.splice(state.ingredients.findIndex(state.ingredients, function (ingredient) {
    //   return ingredient.ingredientId === ingredientId;
    // }), 1);
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
      .then((response) => {
        response.ingredient.ingredientId = response.ingredient.id; //mirage uses 'id' for primary key
        commit('ADD_INGREDIENT', response.ingredient);
      })
      .then(() => commit('SET_SAVING', false)
      )
      .catch(console.log("problem adding ingredient"));
  },
  deleteIngredient({ commit }, ingredientId) {
    commit('SET_SAVING', true)

    console.log('deleteid:', ingredientId);
    fetch(`/api/ingredients/${ingredientId}`, {
      method: 'delete'
    })
      .then(() => {
        commit('DELETE_INGREDIENT', ingredientId)
      })
      .then(() => commit('SET_SAVING', false)
      )
      .catch(console.log("problem deleting ingredient"));
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
