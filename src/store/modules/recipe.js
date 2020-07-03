import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import router from '@/router';

Vue.use(Vuex);

export const state = {
  recipe: [],
  recipes: [],
  saving: false,
  pageState: "view",
  editableRecipe: [],
  ingredientListOpen: true
}


//update state synchronously 
//**mutations should always be abstracted out and put into actions**
export const mutations = {
  UPDATE_RECIPE(state, recipe) {
    state.recipe = recipe;
  },
  UPDATE_RECIPES(state, recipes) {
    state.recipes = recipes;
  },
  SET_SAVING(state, value) {
    state.saving = value;
  },
  SET_PAGESTATE(state, pageState) {
    state.pageState = pageState;
  },
  SET_EDITABLERECIPE(state, editableRecipe) {
    state.editableRecipe = editableRecipe;
  },
  SET_INGEDIENTLISTOPEN(state, ingredientListOpen) {
    state.ingredientListOpen = ingredientListOpen;
  }
}

// acts like global computed methods
export const getters = {
  recipeCount: state => {
    return state.recipes.length;
  }
}

//asynchronously wrap business logic around mutations. 
export const actions = {
  // state and commit are parts of the context object (state, commit, getters, etc.), recipe is a passed in param/payload
  // updateRecipe({ commit }, recipe) {
  //   commit('UPDATE_RECIPE', recipe)
  // },
  getRecipe({dispatch, commit}, recipeId) {
      axios.get(`http://localhost:5001/api/v1/recipes/${recipeId}`)
      .then(res => {
        commit('UPDATE_RECIPE', res.data);
        return res.data;
      });
  },
  getRecipes({dispatch, commit}) {
      axios.get(`http://localhost:5001/api/v1/recipes/`)
      .then(res => {
        commit('UPDATE_RECIPES', res.data);
        return res.data;
      });
  },
  createNewRecipe({ dispatch, commit }, recipe) {
    commit('SET_SAVING', true);
  
    axios.post(
      `http://localhost:5001/api/v1/recipes/`,
      JSON.stringify(recipe),
      {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(res => {
        let response = res.data;

        commit('UPDATE_RECIPE', response);
        dispatch("getRecipes");
        commit('SET_SAVING', false);
        
        dispatch("startEdit");  
        router.push(`/myrecipes/recipe/${response.recipeId}`);

        return response.recipeId;
      });
  },
  createNewBlankRecipe({ dispatch }) {
    dispatch("createNewRecipe", {});      
  },
  startEdit({ commit, dispatch, rootState, state }) {      
    commit('SET_PAGESTATE', 'edit');

    dispatch("setEditableRecipe", Object.assign({},state.recipe)); 
    // javascript uses assign by reference for objects so it auto links the stupid objects. need to do the below to 
    // copy the values of all enumerable own properties from one or more source objects to a target object  
    // dispatch("setEditableIngredient", rootState.ingredients.ingredients.map(i => ({...i})), {root:true}); 
  },
  updateRecipe({ dispatch, commit }, recipe) {
    commit('SET_SAVING', true);
  
    axios.put(
      `http://localhost:5001/api/v1/recipes/${recipe.recipeId}`,
      JSON.stringify(recipe),
      {
        headers: {
          'Content-Type': 'application/json'
        }
      })
    .then(() => {
      // var addedRecipe = dispatch('getRecipe', recipe.recipeId); // this guarantees accuracy, but is causing flicker
      commit('UPDATE_RECIPE', recipe);
      commit('SET_SAVING', false);
    })
    .then(() => {
      // commit('UPDATE_RECIPE', recipe);
    });
  },
  setSaving({ commit }, value) {
    commit('SET_SAVING', value)
  },
  setPageState({ commit }, pageState) {
    commit('SET_PAGESTATE', pageState)
  },
  setEditableRecipe({ commit }, editableRecipe) {
    commit('SET_EDITABLERECIPE', editableRecipe)
  },
  setIngredientListOpen({ commit }, ingredientListOpen) {
    commit('SET_INGEDIENTLISTOPEN', ingredientListOpen)
  },
}

export const modules = {
}
