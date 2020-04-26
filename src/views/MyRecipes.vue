<template>
  <div>
    <div class="max-w-7xl mx-auto px-4 md:px-8">
      <h1 class="text-2xl font-semibold text-gray-900">My Recipes</h1>
    </div>

    <div class="mt-5 bg-white shadow overflow-hidden sm:rounded-md md:mx-8">
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
  },
  computed: {
    // use object spread operator for mapstate with vuex so we can use locally computed properties
    ...mapState({
      recipes: state => state.recipe.recipes,
    }),
  },
  methods: {
    getRecipes() {
      this.$store.dispatch("getRecipes");
    },
  }
}
</script>

<style>
</style>