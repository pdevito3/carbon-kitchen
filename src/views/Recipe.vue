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
          <h2
            class="pt-2 text-xl font-bold leading-7 text-gray-900 md:pt-0 md:text-2xl md:leading-9 md:truncate"
          >Ingredients</h2>

          <form class="px-0 sm:px-2" v-if="pageState=='edit'">
            <div v-for="ingredient in ingredients" :key="ingredient.ingredientId">
              <ingredient-record :ingredient="ingredient" />
            </div>
            <div class="mt-2">
              <button
                @click="addIngredient()"
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
                  <div>{{ingredient.notes}}</div>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <div class="w-full md:w-1/2 px-2">
          <h2
            class="pt-2 text-xl font-bold leading-7 text-gray-900 md:pt-0 md:text-2xl md:leading-9 md:truncate"
          >Directions</h2>
          <div class="h-full" v-if="pageState=='edit'">
            <label for="directions" class="sr-only">Directions</label>
            <textarea
              rows="16"
              id="directions"
              v-model="editableRecipe.directions"
              class="h-full mt-1 form-textarea block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5 py-2 px-2 lg:py-1 rounded-md shadow-sm resize-none"
            />
          </div>
          <div v-else class="whitespace-pre-wrap">{{recipe.directions}}</div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import RecipeActions from "@/components/recipe/RecipeActions.vue";
import IngredientRecord from "@/components/recipe/IngredientRecord.vue";
import { mapState } from "vuex";

export default {
  components: {
    RecipeActions,
    IngredientRecord
  },
  data() {
    return {
      open: false,
      editableRecipe: null
    };
  },

  created() {
    let id = this.$route.params.id;

    this.getRecipe(id);
    this.getIngredients(id);
  },
  computed: {
    // use object spread operator for mapstate with vuex so we can use locally computed properties
    ...mapState({
      recipe: state => state.recipe.recipe,
      ingredients: state => state.recipe.ingredients,
      pageState: state => state.recipe.pageState
    })
  },
  methods: {
    getLinkHost(url) {
      return new URL(url).host;
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
          this.setPageState("edit");
          return "edit";
        case "cancel":
          this.cancelRecipe();
        case "save":
          this.saveRecipe();
      }
    },
    getRecipe(id) {
      fetch(`/api/recipes/${id}`)
      .then(res => res.json())
      .then(json => {
        this.updateRecipe(json.recipe);
      })
    },
    getIngredients(id) {
      fetch(`/api/ingredients?recipeId=${id}`)
          .then(res => res.json())
          .then(json => {
            this.updateIngredients(json.ingredients);
          });
    },
    updateRecipe(recipe) {
      this.$store.dispatch("updateRecipe", recipe);

			// javascript uses assign by reference for objects so it auto links the stupid objects. need to do the below to 
			// copy the values of all enumerable own properties from one or more source objects to a target object
      this.editableRecipe = Object.assign({},recipe); 
    },
    updateIngredients(ingredients) {
      this.$store.dispatch("updateIngredients", ingredients);
    },
    undoIngredient() {
      this.$store.dispatch("undoIngredient", ingredients);
    },
    setPageState(pageState) {
      this.$store.dispatch("setPageState", pageState);
    },
    cancelRecipe() {
      this.editableRecipe = this.recipe;
      
      this.setPageState("view");
    },
    saveRecipe() {
      // this.$store.dispatch("setSaving", true);

      this.$store.dispatch("updateRecipe", this.editableRecipe);
        this.updateRecipe(this.editableRecipe); // load the recipe again for good measure
      this.setPageState("view");

      // this.$store.dispatch("setSaving", false);
    },
    addIngredient() {
      this.$store.dispatch("addIngredient", []);
    }
  }
};
</script>

<style>
</style>