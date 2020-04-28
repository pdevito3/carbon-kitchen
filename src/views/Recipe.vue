<template>
  <div class="-mt-4 sm:-mt-0">
    <div class="border-b-2 border-gray-300 py-2">
      <div class="h-full flex-col md:flex md:flex-row md:justify-between md:items-start">
        <div class="order-1 md:order-2">
          <img
            class="w-full h-56 md:h-72 md:w-72 lg:w-96 lg:h-64 object-cover rounded-lg"
            :src="recipe.imageLink"
            alt="Recipe Image"
          />
        </div>

        <div
          class="order-2 flex flex-col flex-1 px-2 h-full md:h-72 lg:h-64 md:flex-col md:justify-between md:order-1 md:w-1/2 lg:w-3/4"
        >
          <div class="flex-1 min-w-0">
            <div v-if="pageState=='edit'">
              <label for="title" class="sr-only">title</label>
              <input
                id="title"
                v-model="editableRecipe.title"
                class="form-input block w-full sm:text-sm sm:leading-5 py-2 px-2 mt-1 lg:py-1 rounded-md truncate shadow-sm"
              />
            </div>
            <h1
              v-else
              class="pt-2 text-2xl font-bold leading-7 text-gray-900 truncate md:pt-0 md:text-3xl md:leading-9 md:break-words"
            >{{recipe.title}}</h1>
            <div v-if="pageState=='edit'">
              <label for="recipeSourceLink" class="sr-only">recipe source link</label>
              <input
                id="recipeSourceLink"
                v-model="editableRecipe.recipeSourceLink"
                class="form-input block w-full sm:text-sm sm:leading-5 py-2 px-2 mt-2 lg:py-1 rounded-md truncate shadow-sm"
              />
            </div>
            <a v-else class="mt-2 pt-1 flex items-center hover:underline cursor-pointer">
              <svg
                class="flex-shrink-0 h-5 w-5 text-gray-500 group-hover:text-gray-500 group-focus:text-gray-600 transition ease-in-out duration-150"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M3 12l9-9 9 9M5 10v10a1 1 0 001 1h3a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1h3a1 1 0 001-1V10M9 21h6"
                />
              </svg>

              <a
                :href="recipe.recipeSourceLink"
                target="_blank"
                class="text-sm pl-1"
              >{{getLinkHost(recipe.recipeSourceLink)}}</a>
            </a>
            <div v-if="pageState=='edit'">
              <label
                for="description"
                class="mt-3 block font-medium leading-5 text-gray-700"
              >Description</label>
              <textarea
                rows="3"
                id="description"
                v-model="editableRecipe.description"
                class="h-28 md:h-24 mt-1 form-textarea block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5 py-2 px-2 lg:py-1 rounded-md shadow-sm resize-none"
              />
            </div>
            <p
              v-else
              class="mt-3 text-sm leading-5 overflow-y-auto max-h-24 md:max-h-32"
            >{{recipe.description}}</p>
          </div>
          <recipe-actions class="mt-3 lg:mt-2" @emitRecipeAction="performRecipeAction" />
        </div>
      </div>
    </div>

    <div class="mt-2">
      <div class="flex flex-col md:flex-row w-full">
        <div class="w-full md:w-1/2 px-2">
        <div class="flex justify-between items-center">
          <h2
            class="pt-2 text-xl font-bold leading-7 text-gray-900 md:pt-0 md:text-2xl md:leading-9 md:truncate"
          >Ingredients</h2>

           <span class="p-3px inline-flex bg-gray-200 border rounded-md" v-if="pageState=='edit'">
            <button 
              @click="ingredientView = LISTVIEW" 
              class="px-2 py-1 rounded focus:outline-none"
              :class="ingredientView == LISTVIEW ? 'bg-white shadow' : ''">
              <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24"><path d="M4 6h16M4 10h16M4 14h16M4 18h16"></path></svg>
            </button>
            
            <button 
              @click="ingredientView = BATCHVIEW" 
              class="px-2 py-1 rounded focus:outline-none"
              :class="ingredientView == BATCHVIEW ? 'bg-white shadow' : ''">
              <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24"><path d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path></svg>
            </button>
          </span>
        </div>

        <!-- list view -->
        <form class="mt-1 px-0 sm:px-2" v-if="pageState=='edit' && ingredientView == LISTVIEW">
          <div class="" v-for="ingredient in editableIngredients" :key="ingredient.ingredientId">
            <ingredient-record :ingredient="ingredient" @removeIngredient="removeIngredient" />
          </div>
          <div class="mt-2">
            <button
              @click="addEditableIngredient()"
              type="button"
              class="w-full sm:w-auto flex items-center justify-center inline-flex items-center px-3 sm:px-4 py-2 border border-gray-300 text-sm leading-5 font-medium rounded-md text-gray-700 bg-white hover:text-gray-500 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 active:text-gray-800 active:bg-gray-50 active:text-gray-800 transition duration-150 ease-in-out"
            >
              <svg viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
                <path
                  fill-rule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
                  clip-rule="evenodd"
                />
              </svg>
              <p class="pl-2">Add Ingredient</p>
            </button>
          </div>
        </form>

        <!-- batch view -->
        <form class="px-0 sm:px-2" v-if="pageState=='edit' && ingredientView == BATCHVIEW">
          <div class="mt-2 sm:col-span-2">
            <!-- <div class="max-w-lg flex rounded-md shadow-sm">
              <textarea
              rows="16"
              id="batchIngredients"
              v-model="batchCalc"
              class="mt-1 form-textarea block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5 py-2 px-2 lg:py-1 rounded-md shadow-sm resize-none"
            />
            </div> -->
            <!-- <p class="mt-2 text-sm text-gray-500">Format[Amount] [Unit] [Ingredient] ([Notes])</p> -->
          </div>
        </form>

        <ul v-if="pageState=='view'" class="pt-2">
          <li
            v-for="ingredient in ingredients"
            :key="ingredient.ingredientId"
            class="px-2 odd:bg-gray-200"
          >
            <div class="grid grid-cols-10 gap-1">
              <div class="py-2 lg:py-1 col-span-1">{{ingredient.amount}}</div>
              <div class="py-2 lg:py-1 col-span-3 lg:col-span-2">{{ingredient.unit}}</div>
              <div class="py-2 lg:py-1 col-span-6 lg:col-span-7">
                <div>{{ingredient.ingredient}}</div>
                <!-- <div class="text-sm text-gray-900 italic">{{ingredient.notes}}</div> -->
                <div>{{ingredient.name}}</div>
                <!-- <div class="text-sm text-gray-900 italic">{{ingredient.notes}}</div> -->
              </div>
            </div>
          </li>
        </ul>
        </div>
        <div class="w-full md:w-1/2 px-2">
          <h2
            class="pt-2 text-xl font-bold leading-7 text-gray-900 md:pt-0 md:text-2xl md:leading-9 md:truncate"
          >Directions</h2>
          <div class="h-full pt-2" v-if="pageState=='edit'">
            <label for="directions" class="sr-only">Directions</label>
            <textarea
              rows="16"
              id="directions"
              v-model="this.editableRecipe.directions"
              class="mt-1 form-textarea block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5 py-2 px-2 lg:py-1 rounded-md shadow-sm resize-none"
            />
          </div>
          <div v-else class="whitespace-pre-wrap">{{this.recipe.directions}}</div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import RecipeActions from "@/components/recipe/RecipeActions.vue";
import IngredientRecord from "@/components/recipe/IngredientRecord.vue";
import { mapState } from "vuex";
import axios from 'axios';

const listView = 'list';
const batchView = 'batch';

export default {
  components: {
    RecipeActions,
    IngredientRecord
  },
  data() {
    return {
      open: false,
      editableRecipe: null,
      editableIngredients: null,
      ingredientView: listView
    };
  },

  created() {
    let id = this.$route.params.id;

    this.getRecipe(id);
    this.getIngredients(id);

    this.LISTVIEW = listView;
    this.BATCHVIEW = batchView;
  },
  computed: {
    // use object spread operator for mapstate with vuex so we can use locally computed properties
    ...mapState({
      recipe: state => state.recipe.recipe,
      ingredients: state => state.ingredients.ingredients,
      pageState: state => state.recipe.pageState
    }),
    // batchCalc: {
      // // getter
      // get: function () {
      //   let amountArr = this.editableIngredients.map(i => i.amount);
      //   let unitArr = this.editableIngredients.map(i => i.unit);
      //   let ingredientArr = this.editableIngredients.map(i => i.ingredient);
      //   let noteArr = this.editableIngredients.map(i => i.notes);

      //   let newArray = amountArr.map(function(value, index) {
      //     return `${value} ${unitArr[index]} ${ingredientArr[index]} (${noteArr[index]})`;
      //   });
        
      //   return newArray.join("\n")
      // },
      // // setter
      // set: function (ingredientsString) {
      //   this.editableIngredients = [];
      //   let stringArr = ingredientsString.split('\n')

      //   stringArr.forEach(eachIngredient => {
      //     let amount = eachIngredient.substr(0, eachIngredient.indexOf(" "));
      //     eachIngredient = eachIngredient.splice(eachIngredient.indexOf(" "), 1);
      //     console.log("eachIngredient")

      //     this.editableIngredients.push(
      //       {
      //         recipeId: this.recipe.recipeId
      //         , amount: amount
      //         , unit: "tablespoon" // eachIngredient.substr(getPosition(eachIngredient," ",2), eachIngredient.indexOf(" "))
      //         , ingredient: "pepper"
      //         // , notes: ""
      //       }
      //     )});
      // },      
    // }
  },
  methods: {
    getLinkHost(url) {
      if(url != null){
        return new URL(url).host;
      }
    },
    performRecipeAction(action) {
      const pageStates = {
        View: "view",
        Edit: "edit"
      };

      switch (action) {
        case "view":
          this.setPageState("view");
          return "view";
        case "edit":
          this.startEdit();
          return "edit";
        case "cancel":
          this.cancelEdit();
          return "cancel";
        case "save":
          this.saveRecipe();
          return "save";
      }
    },
    startEdit() {      
      this.setPageState("edit");

      this.editableRecipe = Object.assign({},this.recipe); 
      // javascript uses assign by reference for objects so it auto links the stupid objects. need to do the below to 
			// copy the values of all enumerable own properties from one or more source objects to a target object
      this.editableIngredients = this.ingredients.map(i => ({...i})); //this also works ingredients.map(o=>Object.assign({},o)) or [...ingredients.map(o=>Object.assign({},o))]
    },
    cancelEdit() {
      this.editableRecipe = this.recipe;
      this.editableIngredients = this.ingredients;
      
      this.setPageState("view");
    },
    saveRecipe() {
      this.updateRecipe(this.editableRecipe); 
      this.updateIngredients(this.recipe.recipeId, this.editableIngredients); 

      this.setPageState("view");
    },
    getRecipe(id) {
      this.$store.dispatch("getRecipe", id);
    },
    updateRecipe(recipe) {
      this.$store.dispatch("updateRecipe", recipe);
    },
    getIngredients(id) {
      this.$store.dispatch("getIngredients", id, this.editableIngredients);
    },
    updateIngredients(recipeId, ingredients) {
      this.$store.dispatch("updateIngredients", { recipeId, ingredients} );
    },
    setPageState(pageState) {
      this.$store.dispatch("setPageState", pageState);
    },
    addEditableIngredient() {
      this.editableIngredients.push({recipeId: this.recipe.recipeId});
    },
    removeIngredient(ingredientId) {
      var removeIndex = this.editableIngredients.map(function(ingredient) { return ingredient.ingredientId; }).indexOf(ingredientId);
      
      // remove object
      this.editableIngredients.splice(removeIndex, 1);
    }
  }
};
</script>

<style>
</style>
