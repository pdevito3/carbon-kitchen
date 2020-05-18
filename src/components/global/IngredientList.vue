<template>
  <div> 
    <div class="mt-3 sm:mt-5">
      <form class="mt-1 px-0 sm:px-2">
        <ingredient-record 
          v-for="(ingredient, index) in ingredientList" 
          :index="index"
          :key="index"
          :id="index"
          :ingredient="ingredient" 
          @removeIngredient="removeIngredient" />
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
    </div>
  </div>
</template>

<script>
import IngredientRecord from "@/components/recipe/IngredientRecord.vue";

export default {
  components: {
    IngredientRecord
  },
  data() {
    return {
      ingredientList: [{}]
    };
  },
  methods: {
    addIngredient() {
      this.ingredientList.push();
      // this.$emit("toggleModal", displayModal);
    },
    removeIngredient(ingredientIndex) {
      this.ingredientList.splice(ingredientIndex, 1);
    }
  }
}
</script>

<style>

</style>