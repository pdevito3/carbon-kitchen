<template>
  <!-- still needs @keydown.window.escape="sidebarOpen = false" -->
  <div class="h-screen flex overflow-hidden bg-gray-100">
    <!-- Off-canvas menu for mobile -->
    <div class="md:hidden">
      <div
        @click="closeSidebar()"
        class="fixed inset-0 z-30 bg-gray-600 opacity-0 pointer-events-none transition-opacity ease-linear duration-300"
        :class="{'opacity-75 pointer-events-auto': sidebarOpen, 'opacity-0 pointer-events-none': !sidebarOpen}"
      ></div>

      <!-- 
        this was on class, but I needed to take it off for it to work
      -translate-x-full-->
      <div
        class="fixed inset-y-0 left-0 flex flex-col z-40 max-w-xs w-full pt-5 pb-4 bg-red-800 transform ease-in-out duration-300"
        :class="{'translate-x-0': sidebarOpen, '-translate-x-full': !sidebarOpen}"
      >
        <div class="absolute top-0 right-0 -mr-14 p-1">
          <button
            v-show="sidebarOpen"
            @click="closeSidebar()"
            class="flex items-center justify-center h-12 w-12 rounded-full focus:outline-none focus:bg-gray-600"
          >
            <svg class="h-6 w-6 text-white" stroke="currentColor" fill="none" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div class="flex-shrink-0 flex items-center px-4">
          <img class="h-8 w-auto" src="/img/logos/workflow-logo-on-brand.svg" alt="Workflow" />
        </div>
        <div class="mt-5 flex-1 h-0 overflow-y-auto">
          <nav class="px-2">
            <router-link
              to="/"
              class="group flex items-center px-2 py-2 text-base leading-6 font-medium rounded-md text-white bg-red-900 focus:outline-none focus:bg-red-700 transition ease-in-out duration-150"
            >
              <svg
                class="mr-4 h-6 w-6 text-red-400 group-hover:text-red-300 group-focus:text-red-300 transition ease-in-out duration-150"
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
              Dashboard
            </router-link>
            <router-link
              to="/myrecipes"
              class="mt-1 group flex items-center px-2 py-2 text-base leading-6 font-medium rounded-md text-red-300 hover:text-white hover:bg-red-700 focus:outline-none focus:text-white focus:bg-red-700 transition ease-in-out duration-150"
            >
              <svg
                class="mr-4 h-6 w-6 text-red-400 group-hover:text-red-300 group-focus:text-red-300 transition ease-in-out duration-150"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  fill-rule="evenodd"
                  d="M4 2a2 2 0 00-2 2v11a3 3 0 106 0V4a2 2 0 00-2-2H4zm1 14a1 1 0 100-2 1 1 0 000 2zm5-1.757l4.9-4.9a2 2 0 000-2.828L13.485 5.1a2 2 0 00-2.828 0L10 5.757v8.486zM16 18H9.071l6-6H16a2 2 0 012 2v2a2 2 0 01-2 2z"
                  clip-rule="evenodd"
                />
              </svg>
              Recipes
            </router-link>
          </nav>
        </div>
      </div>
    </div>
    <!-- Static sidebar for desktop -->
    <div class="hidden md:flex md:flex-shrink-0">
      <div class="flex flex-col w-64 bg-red-800 pt-5 pb-4">
        <div class="flex items-center flex-shrink-0 px-4">
          <img class="h-8 w-auto" src="/img/logos/workflow-logo-on-brand.svg" alt="Workflow" />
        </div>
        <div class="mt-5 h-0 flex-1 flex flex-col overflow-y-auto">
          <!-- Sidebar component, swap this element with another sidebar if you like -->
          <nav class="flex-1 px-2 bg-red-800">
            <router-link
              to="/"
              exact-active-class="group flex items-center px-2 py-2 text-sm leading-5 font-medium text-white rounded-md bg-red-900 focus:outline-none focus:bg-red-700 transition ease-in-out duration-150"
              class="mt-1 group flex items-center px-2 py-2 text-sm leading-5 font-medium text-red-300 rounded-md hover:text-white hover:bg-red-700 focus:outline-none focus:text-white focus:bg-red-700 transition ease-in-out duration-150"
            >
              <svg
                class="mr-3 h-6 w-6 text-red-400 group-focus:text-red-300 transition ease-in-out duration-150"
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
              Dashboard
            </router-link>

            <router-link
              to="/myrecipes"
              exact-active-class="group flex items-center px-2 py-2 text-sm leading-5 font-medium text-white rounded-md bg-red-900 focus:outline-none focus:bg-red-700 transition ease-in-out duration-150"
              class="mt-1 group flex items-center justify-between px-2 py-2 text-sm leading-5 font-medium text-red-300 rounded-md hover:text-white hover:bg-red-700 focus:outline-none focus:text-white focus:bg-red-700 transition ease-in-out duration-150"
            >
              <div class="flex">
                <svg
                  class="mr-3 h-6 w-6 text-red-400 group-hover:text-red-300 group-focus:text-red-300 transition ease-in-out duration-150"
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill-rule="evenodd"
                    d="M4 2a2 2 0 00-2 2v11a3 3 0 106 0V4a2 2 0 00-2-2H4zm1 14a1 1 0 100-2 1 1 0 000 2zm5-1.757l4.9-4.9a2 2 0 000-2.828L13.485 5.1a2 2 0 00-2.828 0L10 5.757v8.486zM16 18H9.071l6-6H16a2 2 0 012 2v2a2 2 0 01-2 2z"
                    clip-rule="evenodd"
                  />
                </svg>
                My Recipes
              </div>
              <button
              @click="createNewRecipe()"
                type="button"
                class="sm:w-auto px-2 sm:px-2 py-1 opacity-75 border border-red-300 text-sm leading-5 font-medium rounded-md text-red-700 bg-white hover:text-red-500 hover:border-2 hover:border-red-900 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 active:text-gray-800 active:bg-gray-50 active:text-gray-800 transition duration-150 ease-in-out"
              >
              <svg viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
                <path
                  fill-rule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
                  clip-rule="evenodd"
                />
              </svg>
            </button>
            </router-link>
          </nav>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  props: ["sidebarOpen"],
  data() {
    return {
      // sidebarOpen: false
    };
  },
  computed: {
    // use object spread operator for mapstate with vuex so we can use locally computed properties
    ...mapState({
      recipe: state => state.recipe.recipe,
    }),
  },
  methods: {
    closeSidebar() {
      this.$emit("closeSidebar", false);
    },
    createNewRecipe() {
      this.$store.dispatch("createNewRecipe", {title: "New Recipe"});
    },
  }
};
</script>

<style>
</style>