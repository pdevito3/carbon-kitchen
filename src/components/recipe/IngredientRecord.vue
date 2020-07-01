<template>
  <div class="grid grid-cols-16 gap-1">
    <label for="amount" class="sr-only">amount</label>
    <input
      id="amount"
      ref="amount"
      placeholder="1" 
      v-model="ingredient.amount"
      class="col-span-2 py-2 px-2 mt-1 form-input block w-full sm:text-sm sm:leading-5 lg:py-1 rounded-md truncate shadow-sm"
    />
    <label for="unit" class="sr-only">unit</label>
    <input
      id="unit"
      ref="unit"
      placeholder="cup" 
      v-model="ingredient.unit"
      class="col-span-5 py-2 px-2 mt-1 form-input block w-full sm:text-sm sm:leading-5 lg:py-1 rounded-md truncate shadow-sm"
    />
    <label for="name" class="sr-only">name</label>
    <input
      id="name"
      ref="name"
      placeholder="all purpose flour" 
      v-model="ingredient.name"
      @keyup.enter="enterPressed()"
      class="col-span-8 py-2 px-2 mt-1 form-input block w-full sm:text-sm sm:leading-5 lg:py-1 rounded-md truncate shadow-sm"
    />
    <button
      @click="removeIngredient(ingredient)"
      type="button"
      class="col-span-1 inline-flex items-center justify-center text-gray-500 rounded hover:text-gray-500 focus:shadow-outline-blue focus:border-blue-300 active:text-gray-800 active:bg-gray-50 active:text-gray-800 transition duration-150 ease-in-out"
    >
      <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" >
        <path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
      </svg>
    </button>
  </div>
</template>

<script>
import isEmpty from "lodash/isEmpty"

export default {
  props: ["ingredient", "id"],
  computed: {
    rowEmpty() {
      return isEmpty(this.ingredient);
    }
  },
  methods: {
    removeIngredient() {
      this.$emit("removeIngredient", this.id);
    },
    enterPressed() {
      this.$emit("enterPressed", this.rowEmpty);
    },
  }
};
</script>

<style>
</style>
