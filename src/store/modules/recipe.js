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
  UPDATE_RECIPE(state, recipe) {
    state.recipe = recipe;
  },
  UPDATE_INGREDIENTS(state, ingredients) {
    state.ingredients = ingredients;
  },
  ADD_INGREDIENT(state, ingredient) {
    state.ingredients.push(ingredient);
  },
  DELETE_INGREDIENT(state, ingredientId) {
    let index = state.ingredients.map(i => i.ingredientId).indexOf(ingredientId);

    if (index !== -1) state.ingredients.splice(index, 1);
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
  updateRecipe({ commit }, recipe) {
    commit('UPDATE_RECIPE', recipe)
  },
  updateIngredients({ commit }, ingredients) {
    commit('UPDATE_INGREDIENTS', ingredients)
  },
  getIngredients({dispatch}, recipeId) {
    fetch(`/api/ingredients?recipeId=${recipeId}`)
      .then(res => res.json())
      .then(json => {
        dispatch('updateIngredients', json.ingredients)
      });
  },
  getRecipe({dispatch}, recipeId) {
    fetch(`/api/recipes/${recipeId}`)
      .then(res => res.json())
      .then(json => {
        dispatch('updateRecipe', json.recipe)
      });
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

    fetch(`/api/ingredients/${ingredientId}`, {
      method: 'delete'
    })
      .then(() => {
        commit('DELETE_INGREDIENT', ingredientId)
      })
      .then(() => commit('SET_SAVING', false))
      .catch(console.log("problem deleting ingredient"));
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
