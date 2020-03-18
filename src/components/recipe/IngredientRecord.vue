<template>
  <div class="grid grid-cols-10 gap-1">
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
      class="form-input block w-full sm:text-sm sm:leading-5 py-2 px-2 mt-1 lg:py-1 col-span-3 lg:col-span-3 rounded-md truncate shadow-sm"
    />
    <label for="notes" class="sr-only">notes</label>
    <input
      id="notes"
      v-model="ingredient.notes"
      class="form-input block w-full sm:text-sm sm:leading-5 py-2 px-2 mt-1 lg:py-1 col-span-3 lg:col-span-3 rounded-md truncate shadow-sm"
    />
  </div>
</template>

<script>
export default {
  props: ["ingredient"]
};
</script>

<style>
</style>