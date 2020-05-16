<template>
  <div>
    <div class="flex justify-between max-w-7xl mx-auto px-4 md:px-8">
      <h1 class="text-2xl font-semibold text-gray-900">My Recipes</h1>
        <button
          @click="createNewRecipe()"
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
          <p class="pl-2">Add Recipe</p>
        </button>
    </div>
    <div class="mt-5 bg-white shadow overflow-hidden sm:rounded-md md:mx-8">

      <div 
        class="px-8 py-12 text-gray-400 rounded-lg border-4 shadow-lg" 
        v-if="this.recipes.length <= 0">
        <div class="flex justify-center items-center">
          <svg class="w-16 h-16 stroke-current" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" stroke="currentColor" viewBox="0 0 24 24">
            <path d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"></path>
          </svg>
          <p class="text-lg font-semibold pl-4">
            It looks like you don't have any recipes at the moment. Try and add your first recipe!
          </p>
        </div>
      </div>

      <ul>
        <li v-for="recipe in this.recipes" :key="recipe.recipeId" class>
          <recipe-list-card
            :title="recipe.title"
            :recipeSourceLink="recipe.recipeSourceLink"
            :imageLink="recipe.imageLink"
            :recipeId="recipe.recipeId"
            :description="recipe.description"
          />
        </li>
      </ul>
    </div>

    <!-- this could be the grid version -->

    <!-- <div class="px-4 mt-5 grid sm:grid-cols-2 sm:gap-2">
      <div class="sm:mt-0 sm:w-72 sm:flex-shrink-0">
        <div>
          <div class="relative pb-5/6">
            <img
              src="https://images.unsplash.com/photo-1471231681582-352356ab45a0?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=crop&amp;w=800&amp;q=80"
              alt
              class="absolute inset-0 h-full w-full rounded-t-md shadow-md object-cover"
            />
          </div>
          <div class="relative">
            <div class="bg-white rounded-b-md px-4 py-4 shadow-lg"></div>
          </div>
        </div>
      </div>
    </div>-->
  </div>
</template>

<script>
import RecipeListCard from "@/components/RecipeListCard";
import { mapState } from "vuex";

export default {
  components: {
    RecipeListCard
  },
  data() {
    return {};
  },
  created() {
    this.getRecipes()
    console.log(this.recipeCount)
  },
  computed: {
    // use object spread operator for mapstate with vuex so we can use locally computed properties
    ...mapState({
      recipes: state => state.recipe.recipes,
      recipeCount: state => state.recipe.recipeCount,
    }),
  },
  methods: {
    getRecipes() {
      this.$store.dispatch("getRecipes");
    },
    createNewRecipe() {
      this.$store.dispatch("createNewBlankRecipe");
    },
  }
}
</script>

<style>
</style>