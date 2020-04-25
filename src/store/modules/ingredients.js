import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios'

Vue.use(Vuex);

export const state = {
  ingredients: [],
}


//update state synchronously 
//**mutations should always be abstracted out and put into actions**
export const mutations = {
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
  updateIngredients({ commit }, ingredients) {
    commit('SET_SAVING', true);

    // for (let ingredient = 0; ingredient < ingredients.length; ingredient++) {
    //   fetch(`/ingredients/${ingredient.ingredientId}`, {
    //     method: 'put',
    //     headers: {
    //       'Accept': 'application/json',
    //       'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify(ingredient)
    //   })
    // }

    commit('UPDATE_INGREDIENTS', ingredients)
    commit('SET_SAVING', false);
  },
  getIngredients({dispatch, commit}, recipeId) {
    axios.get(`http://localhost:5000/api/v1/ingredients?recipeId=${recipeId}`)
    .then(res => {
      commit('UPDATE_INGREDIENTS', res.data);
    });
  },
  addIngredient({ commit }, ingredient) {
    commit('SET_SAVING', true)
    
    fetch(`/ingredients`, {
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

    fetch(`/ingredients/${ingredientId}`, {
      method: 'delete'
    })
      .then(() => {
        commit('DELETE_INGREDIENT', ingredientId)
      })
      .then(() => commit('SET_SAVING', false))
      .catch(console.log("problem deleting ingredient"));
  },
}

export const modules = {
}
