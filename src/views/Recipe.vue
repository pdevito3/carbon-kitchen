<template>
  <div class="-mt-4 sm:-mt-0">
    <div class="border-b-2 border-gray-300 py-2">
      <div class="h-full flex-col md:flex md:flex-row md:justify-between md:items-start">
        <div class="order-1 md:order-2">
          <span v-if="recipe.imageLink">
            <img
              alt="Recipe Image"
              class="w-full h-56 md:h-72 md:w-72 lg:w-96 lg:h-64 object-cover rounded-lg"
              :src="recipe.imageLink"
              @error="(() => recipe.imageLink = null)"
            />
          </span>
          <span v-else>
            <img
              alt="Recipe Image"
              class="w-full h-56 md:h-72 md:w-72 lg:w-96 lg:h-64 object-cover rounded-lg"
              src="@/assets/images/recipe-placeholder.jpg"
            />
          </span>
        </div>

        <div
          class="order-2 flex flex-col flex-1 px-2 h-full md:h-72 lg:h-64 md:flex-col md:justify-between md:order-1 md:w-1/2 lg:w-3/4"
        >
          <div class="flex-1 min-w-0">
            <div v-if="pageState=='edit'">
              <div class="mt-1 relative rounded-md shadow-sm">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Flag class="flex-shrink-0 h-5 w-5 text-gray-500 group-hover:text-gray-500 group-focus:text-gray-600 transition ease-in-out duration-150" />
                </div>
                <label for="title" class="sr-only">title</label>
                <input
                  id="title"
                  v-model="editableRecipe.title"
                  class="form-input block w-full pl-10 sm:text-sm sm:leading-5 py-2 mt-1 lg:py-1"
                  placeholder="The Best Recipe Ever"
                />
              </div>
            </div>
            <h1
              v-else
              class="pt-2 text-2xl font-bold leading-7 text-gray-900 truncate md:pt-0 md:text-3xl md:leading-9 md:break-words"
            >{{recipe.title}}</h1>
            <div v-if="pageState=='edit'">
              <div class="mt-1 relative rounded-md shadow-sm">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Home
                    class="flex-shrink-0 h-5 w-5 text-gray-500 group-hover:text-gray-500 group-focus:text-gray-600 transition ease-in-out duration-150"
                  />
                </div>
                <label for="recipeSourceLink" class="sr-only">recipe source link</label>
                <input
                  id="recipeSourceLink"
                  v-model="editableRecipe.recipeSourceLink"
                  class="form-input block w-full pl-10 sm:text-sm sm:leading-5 py-2 mt-1 lg:py-1"
                  placeholder="https://www.allrecipes.com"
                />
              </div>
            </div>
            <a
              v-else
              :href="recipe.recipeSourceLink"
              target="_blank"
              class="mt-2 pt-1 flex items-center hover:underline cursor-pointer"
            >
              <Home
                class="flex-shrink-0 h-5 w-5 text-gray-500 group-hover:text-gray-500 group-focus:text-gray-600 transition ease-in-out duration-150"
              />
              <p
                class="pl-2 text-sm w-64 sm:w-154 truncate"
              >{{getLinkHost(recipe.recipeSourceLink)}}</p>
            </a>
            <div v-if="pageState=='edit'">
              <label
                for="description"
                class="mt-3 block font-medium leading-5 text-gray-700"
              >Description</label>
              <textarea
                rows="3"
                id="description"
                placeholder="Put whatever description you'd like to have for your recipe here."
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
            <div class="space-x-4 flex items-center">
              <h2
                class="pt-2 text-xl font-bold leading-7 text-gray-900 md:pt-0 md:text-2xl md:leading-9 md:truncate"
              >Ingredients</h2>
              <div v-if="pageState=='view'" class="mt-1 relative rounded-md shadow-sm">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg class="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      d="M2 11C2 10.4477 2.44772 10 3 10H5C5.55228 10 6 10.4477 6 11V16C6 16.5523 5.55228 17 5 17H3C2.44772 17 2 16.5523 2 16V11Z"
                      fill="#4B5563"
                    />
                    <path
                      d="M8 7C8 6.44772 8.44772 6 9 6H11C11.5523 6 12 6.44772 12 7V16C12 16.5523 11.5523 17 11 17H9C8.44772 17 8 16.5523 8 16V7Z"
                      fill="#4B5563"
                    />
                    <path
                      d="M14 4C14 3.44772 14.4477 3 15 3H17C17.5523 3 18 3.44772 18 4V16C18 16.5523 17.5523 17 17 17H15C14.4477 17 14 16.5523 14 16V4Z"
                      fill="#4B5563"
                    />
                  </svg>
                </div>
                <input
                  v-model="scale"
                  id="scale"
                  class="form-input block w-20 pl-10 sm:text-sm sm:leading-5"
                />
              </div>
            </div>

            <span class="p-3px inline-flex bg-gray-200 border rounded-md" v-if="pageState=='edit'">
              <button
                @click="ingredientView = LISTVIEW"
                class="px-2 py-1 rounded focus:outline-none"
                :class="ingredientView == LISTVIEW ? 'bg-white shadow' : ''"
              >
                <svg
                  class="w-5 h-5 text-gray-600"
                  fill="none"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  viewBox="0 0 24 24"
                >
                  <path d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                </svg>
              </button>

              <button
                @click="ingredientView = BATCHVIEW"
                class="px-2 py-1 rounded focus:outline-none"
                :class="ingredientView == BATCHVIEW ? 'bg-white shadow' : ''"
              >
                <svg
                  class="w-5 h-5 text-gray-600"
                  fill="none"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                  />
                </svg>
              </button>
            </span>
          </div>

          <!-- list view -->
          <form class="mt-1 px-0 sm:px-2" v-if="pageState=='edit' && ingredientView == LISTVIEW">
            <ingredient-record
              v-for="(ingredient, index) in editableIngredients"
              :index="index"
              :key="index"
              :id="index"
              :ingredient="ingredient"
              ref="editableIngredients"
              @enterPressed="enterPressed"
              @removeIngredient="removeIngredient"
            />
            <div class="mt-2">
              <button
                @click="addEditableIngredient()"
                type="button"
                class="w-full sm:w-auto flex items-center justify-center px-3 sm:px-4 py-2 border border-gray-300 text-sm leading-5 font-medium rounded-md text-gray-700 bg-white hover:text-gray-500 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 active:text-gray-800 active:bg-gray-50 active:text-gray-800 transition duration-150 ease-in-out"
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
              <div class="max-w-lg flex rounded-md shadow-sm">
                <textarea
                  rows="16"
                  id="batchIngredients"
                  v-model="batchCalc"
                  class="mt-1 form-textarea block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5 py-2 px-2 lg:py-1 rounded-md shadow-sm resize-none"
                />
              </div>
              <p class="mt-2 text-sm text-gray-500 font-semibold">New line between items</p>
              <p class="mt-px text-sm text-gray-500">1 cup basil</p>
              <p class="mt-px text-sm text-gray-500">1 basil leaf</p>
              <p class="mt-px text-sm text-gray-500">1 package pasta</p>
              <p class="mt-px text-sm text-gray-500">16 oz pasta</p>
              <p class="mt-px text-sm text-gray-500">16oz pasta</p>
              <p class="mt-px text-sm text-gray-500">1 chicken breast</p>
            </div>
          </form>

          <ul v-if="pageState=='view'" class="pt-2">
            <li
              v-for="ingredient in scalableIngredients"
              :key="ingredient.ingredientId"
              class="px-2 odd:bg-gray-200"
            >
              <div class="grid grid-cols-10 gap-1">
                <div class="py-2 lg:py-1 col-span-1">{{ingredient.amount}}</div>
                <div class="py-2 lg:py-1 col-span-3 lg:col-span-2">{{ingredient.unit}}</div>
                <div class="py-2 lg:py-1 col-span-6 lg:col-span-7">{{ingredient.name}}</div>
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
              placeholder="First do this, then do that, and finally, add just a bit of the other thing."
              v-model="editableRecipe.directions"
              class="mt-1 form-textarea block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5 py-2 px-2 lg:py-1 rounded-md shadow-sm resize-none"
            />
          </div>
          <div v-else class="whitespace-pre-wrap">{{this.recipe.directions}}</div>
        </div>
      </div>
    </div>
    <select-ingredients :ingredients="ingredients" />
  </div>
</template>


<script>
import RecipeActions from "@/components/recipe/RecipeActions.vue";
import IngredientRecord from "@/components/recipe/IngredientRecord.vue";
import SelectIngredients from "@/components/recipe/SelectIngredients.vue";
import Home from "heroicons/outline/home.svg";
import Flag from "heroicons/outline/flag.svg";
import { mapState } from "vuex";
import { fraction } from "mathjs";

const listView = "list";
const batchView = "batch";

export default {
  components: {
    RecipeActions,
    SelectIngredients,
    IngredientRecord,
    Home,
    Flag
  },
  data() {
    return {
      id: this.$route.params.id,
      editableIngredients: [],
      ingredientView: listView,
      scale: 1
    };
  },
  created() {
    this.getRecipe(this.id);
    this.getIngredients(this.id);
    this.editableIngredients = this.ingredients;

    this.LISTVIEW = listView;
    this.BATCHVIEW = batchView;
  },
  computed: {
    // use object spread operator for mapstate with vuex so we can use locally computed properties
    ...mapState({
      recipe: state => state.recipe.recipe,
      editableRecipe: state => state.recipe.editableRecipe,
      ingredients: state => state.ingredients.ingredients,
      pageState: state => state.recipe.pageState
    }),
    scalableIngredients() {
      let scaleVal = this.scale;

      try {
        if (fraction(scaleVal) > 0) {
          let scalable = this.ingredients.map(i => ({ ...i }));

          scalable.forEach(ingredient => {
            ingredient.amount =
              (ingredient.amount * Math.round(fraction(scaleVal) * 1000)) /
              1000;
          });
          return scalable;
        } else {
          return this.ingredients;
        }
      } catch (error) {
        return this.ingredients;
      }
    },
    batchCalc: {
      // getter
      get: function() {
        let amountArr = this.editableIngredients.map(i => i.amount ?? "");
        let unitArr = this.editableIngredients.map(i => i.unit ?? "");
        let ingredientArr = this.editableIngredients.map(i => i.name ?? "");

        let newArray = amountArr.map(function(value, index) {
          return `${value} ${unitArr[index]} ${ingredientArr[index]}`.trim();
        });

        return newArray.join("\r");
      },
      // setter
      set: function(ingredientsString) {
        // this.editableIngredients = [];
        // let stringArr = ingredientsString.split('\n')
        // stringArr.forEach(eachIngredient => {
        //   let splitIngredient = eachIngredient.splice(' ');
        //   if(splitIngredient.length == 1)
        //     this.editableIngredients.push({
        //       recipeId: this.recipe.recipeId
        //       , name: eachIngredient
        //     });
        //   else {
        //     // if i can convert split[0] to a decimal, then make that amount
        //       // add a condition eventually to account for something like 16oz pasta where it can recognize units and put a space there
        //     // if the second string == cup, package, handful, tsp, teaspoon, t, T, tbsp, pint, oz, etc. then make that a unit
        //     // make the rest of it the name
        //   }
        //   let amount = eachIngredient.substr(0, eachIngredient.indexOf(" "));
        //   eachIngredient = eachIngredient.splice(eachIngredient.indexOf(" "), 1);
        //   console.log("eachIngredient")
        //   this.editableIngredients.push(
        //     {
        //       recipeId: this.recipe.recipeId
        //       , amount: amount
        //       , unit: "tablespoon" // eachIngredient.substr(getPosition(eachIngredient," ",2), eachIngredient.indexOf(" "))
        //       , ingredient: "pepper"
        //     }
        //   )});
      }
    }
  },
  methods: {
    getLinkHost(url) {
      try {
        if (url != null) {
          return new URL(url).host;
        }
      } catch (_) {
        return url;
      }
    },
    performRecipeAction(action) {
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
        case "openIngredientList":
          this.openIngredientList();
      }
    },
    startEdit() {
      this.$store.dispatch("startEdit");

      this.editableIngredients = this.ingredients.map(i => ({ ...i })); //this also works ingredients.map(o=>Object.assign({},o)) or [...ingredients.map(o=>Object.assign({},o))]
    },
    cancelEdit() {
      this.$store.dispatch("setEditableRecipe", this.recipe);
      this.editableIngredients = this.ingredients;
      this.scale = 1; // reset to 1 to eliminate 'cancel' not reverting page view state

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
      this.$store.dispatch("updateIngredients", { recipeId, ingredients });
    },
    setPageState(pageState) {
      this.$store.dispatch("setPageState", pageState);
    },
    addEditableIngredient() {
      this.editableIngredients.push({ recipeId: this.recipe.recipeId });
      this.selectIngredientRow();
    },
    removeIngredient(ingredientIndex) {
      this.editableIngredients.splice(ingredientIndex, 1);
    },
    selectIngredientRow() {
      // this is code dup from ingredientlist.vue, need to consolodate and import
      let maxKey = this.editableIngredients.length - 1;
      this.$nextTick(() =>
        this.$refs.editableIngredients[maxKey].$refs.amount.focus()
      );
    },
    enterPressed(rowIsEmpty) {
      // this is code dup from ingredientlist.vue, need to consolodate and import
      if (rowIsEmpty) {
        this.$emit("enterPressed");
      } else {
        this.addEditableIngredient();
      }
    },
    openIngredientList() {
      //make sure ingredients list is set in store
      this.getIngredients(this.id);

      this.$store.dispatch("setIngredientListOpen", true);
    }
  }
};
</script>

<style>
</style>
