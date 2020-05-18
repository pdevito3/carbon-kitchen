<template>
  <div> 
    <div v-show="open" class="fixed bottom-0 inset-x-0 px-4 pb-6 sm:inset-0 sm:p-0 sm:flex sm:items-center sm:justify-center">
      <div v-show="open" x-description="Background overlay, show/hide based on modal state." 
        x-transition:enter="ease-out duration-300" 
        x-transition:enter-start="opacity-0" 
        x-transition:enter-end="opacity-100" 
        x-transition:leave="ease-in duration-200" 
        x-transition:leave-start="opacity-100" 
        x-transition:leave-end="opacity-0" class="fixed inset-0 transition-opacity">
        <div @click="toggleModal(false)" class="absolute inset-0 bg-gray-500 opacity-75"></div>
      </div>

      <div v-show="open" x-description="Modal panel, show/hide based on modal state." 
        x-transition:enter="ease-out duration-300" 
        x-transition:enter-start="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95" 
        x-transition:enter-end="opacity-100 translate-y-0 sm:scale-100" 
        x-transition:leave="ease-in duration-200" 
        x-transition:leave-start="opacity-100 translate-y-0 sm:scale-100" 
        x-transition:leave-end="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95" class="bg-white rounded-lg px-4 pt-5 pb-4 overflow-hidden shadow-xl transform transition-all sm:max-w-sm sm:w-full sm:p-6" role="dialog" aria-modal="true" aria-labelledby="modal-headline">
        <div>
          <div class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
            <svg class="h-6 w-6 text-green-600" stroke="currentColor" fill="none" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
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
        <div class="mt-5 sm:mt-6">
          <span class="flex w-full rounded-md shadow-sm">
            <button @click="toggleModal(false)" type="button" class="inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 bg-indigo-600 text-base leading-6 font-medium text-white shadow-sm hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo transition ease-in-out duration-150 sm:text-sm sm:leading-5">
              Go back to dashboard
            </button>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import IngredientRecord from "@/components/recipe/IngredientRecord.vue";

export default {
  props: ["open"],
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
      this.ingredientList.push({name: ""});
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