<template>
  <div>
    <span class="relative z-0 inline-flex shadow-sm">
      <button
        type="button"
        class="relative inline-flex items-center pl-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-700 hover:text-gray-500 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150"
      >
        <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
          <path
            fill-rule="evenodd"
            d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
            clip-rule="evenodd"
          />
        </svg>
        <span class="pl-2 pr-4">Back</span>
      </button>
      <button
        type="button"
        class="-ml-px relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-700 hover:text-gray-500 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          class="w-6 h-6 icon-shopping-cart"
        >
          <path
            class="fill-current text-gray-300"
            d="M7 4h14a1 1 0 0 1 .9 1.45l-4 8a1 1 0 0 1-.9.55H7a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1z"
          />
          <path
            class="fill-current text-gray-800"
            d="M17.73 19a2 2 0 1 1-3.46 0H8.73a2 2 0 1 1-3.42-.08A3 3 0 0 1 5 13.17V4H3a1 1 0 1 1 0-2h3a1 1 0 0 1 1 1v10h11a1 1 0 0 1 0 2H6a1 1 0 0 0 0 2h12a1 1 0 0 1 0 2h-.27z"
          />
        </svg>
        <span class="pl-2">Add to Shopping List</span>
      </button>
      <button
        type="button"
        class="-ml-px relative inline-flex items-center px-4 py-2 rounded-r-md border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-700 hover:text-gray-500 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          class="w-6 h-6 icon-folder-add"
        >
          <path
            class="fill-current text-gray-300"
            d="M4 4h7l2 2h7a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6c0-1.1.9-2 2-2z"
          />
          <rect width="20" height="12" x="2" y="8" class="fill-current text-gray-800" rx="2" />
          <path
            class="fill-current text-gray-300"
            d="M13 13h2a1 1 0 0 1 0 2h-2v2a1 1 0 0 1-2 0v-2H9a1 1 0 0 1 0-2h2v-2a1 1 0 0 1 2 0v2z"
          />
        </svg>
        <span class="pl-2">Add to Meal Plan</span>
      </button>
    </span>

    <div class="pt-5">
      <img class="h-64 w-56 object-cover" :src="this.recipe.imageLink" alt="Recipe Image" />
      {{this.recipe}}
    </div>
  </div>
</template>


<script>
export default {
  components: {},
  data() {
    return {
      recipe: []
    };
  },

  created() {
    let id = this.$route.params.id;

    fetch(`/api/recipes/${id}`)
      .then(res => res.json())
      .then(json => {
        this.recipe = json.recipe;
      });
  }
};
</script>

<style>
</style>