<template>
  <div class="grid grid-cols-11 gap-1">
    <label for="amount" class="sr-only">amount</label>
    <input
      id="amount"
      v-model="ingredient.amount"
      class="form-input block w-full sm:text-sm sm:leading-5 py-2 px-2 mt-1 lg:py-1 col-span-1 rounded-md truncate shadow-sm"
    />
    <label for="unit" class="sr-only">unit</label>
    <input
      id="unit"
      v-model="ingredient.unit"
      class="form-input block w-full sm:text-sm sm:leading-5 py-2 px-2 mt-1 lg:py-1 col-span-3 lg:col-span-2 rounded-md truncate shadow-sm"
    />
    <label for="ingredient" class="sr-only">ingredient</label>
    <input
      id="ingredient"
      v-model="ingredient.ingredient"
      class="form-input block w-full sm:text-sm sm:leading-5 py-2 px-2 mt-1 lg:py-1 col-span-3 rounded-md truncate shadow-sm"
    />
    <label for="notes" class="sr-only">notes</label>
    <input
      id="notes"
      v-model="ingredient.notes"
      class="form-input block w-full sm:text-sm sm:leading-5 py-2 px-2 mt-1 lg:py-1 col-span-3 rounded-md truncate shadow-sm"
    />
    <button
      @click="deleteIngredient(ingredient.ingredientId)"
      type="button"
      class="col-span-1 inline-flex items-center justify-center text-gray-500 rounded hover:text-gray-500 focus:shadow-outline-blue focus:border-blue-300 active:text-gray-800 active:bg-gray-50 active:text-gray-800 transition duration-150 ease-in-out"
    >
      <svg viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
        <path
          fill-rule="evenodd"
          d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
          clip-rule="evenodd"
        />
      </svg>
    </button>
  </div>
</template>

<script>
export default {
  props: ["ingredient"],
  methods: {
    deleteIngredient(ingredientId) {
      console.log(ingredientId);
      this.$store.dispatch("deleteIngredient", ingredientId);
    }
  }
};
</script>

<style>
</style>