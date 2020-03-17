<template>
  <div class="flex">
    <span class="shadow-sm rounded-md">
      <router-link
        to="/myrecipes"
        type="button"
        class="inline-flex items-center px-3 sm:px-4 py-2 border border-gray-300 text-sm leading-5 font-medium rounded-md text-gray-700 bg-white hover:text-gray-500 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 active:text-gray-800 active:bg-gray-50 active:text-gray-800 transition duration-150 ease-in-out"
      >
        <svg class="h-5 w-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
          <path
            fill-rule="evenodd"
            d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
            clip-rule="evenodd"
          />
        </svg>
        <p class="hidden sm:block sm:pl-2 md:hidden lg:block">Back</p>
      </router-link>
    </span>

    <span v-if="pageState=='view'" class="ml-1 sm:ml-2 md:ml-1 lg:ml-2 shadow-sm rounded-md">
      <button
        @click="emitRecipeAction('edit')"
        type="button"
        class="inline-flex items-center px-3 sm:px-4 py-2 border border-gray-300 text-sm leading-5 font-medium rounded-md text-gray-700 bg-white hover:text-gray-500 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 active:text-gray-800 active:bg-gray-50 active:text-gray-800 transition duration-150 ease-in-out"
      >
        <svg class="h-5 w-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
          <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
          <path
            fill-rule="evenodd"
            d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
            clip-rule="evenodd"
          />
        </svg>
        <p class="hidden sm:block sm:pl-2 md:hidden lg:block">Edit</p>
      </button>
    </span>

    <span v-if="pageState=='edit'" class="ml-1 sm:ml-2 md:ml-1 lg:ml-2 shadow-sm rounded-l-md">
      <button
        @click="saveRecipe()"
        type="button"
        class="inline-flex items-center px-3 sm:px-4 py-2 border border-gray-300 text-sm leading-5 font-medium rounded-l-md text-gray-700 bg-white hover:text-gray-500 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 active:text-gray-800 active:bg-gray-50 active:text-gray-800 transition duration-150 ease-in-out"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 448 512"
          class="h-5 w-5"
          fill="currentColor"
        >
          <path
            fill="currentColor"
            d="M433.941 129.941l-83.882-83.882A48 48 0 0 0 316.118 32H48C21.49 32 0 53.49 0 80v352c0 26.51 21.49 48 48 48h352c26.51 0 48-21.49 48-48V163.882a48 48 0 0 0-14.059-33.941zM272 80v80H144V80h128zm122 352H54a6 6 0 0 1-6-6V86a6 6 0 0 1 6-6h42v104c0 13.255 10.745 24 24 24h176c13.255 0 24-10.745 24-24V83.882l78.243 78.243a6 6 0 0 1 1.757 4.243V426a6 6 0 0 1-6 6zM224 232c-48.523 0-88 39.477-88 88s39.477 88 88 88 88-39.477 88-88-39.477-88-88-88zm0 128c-22.056 0-40-17.944-40-40s17.944-40 40-40 40 17.944 40 40-17.944 40-40 40z"
            class
          />
        </svg>
        <p v-if="saving" class="hidden sm:block sm:pl-2 md:hidden lg:block">Saving...</p>
        <p v-else class="hidden sm:block sm:pl-2 md:hidden lg:block">Save</p>
      </button>
    </span>

    <span v-if="pageState=='edit'" class="shadow-sm rounded-r-md">
      <button
        @click="cancelUpdate()"
        type="button"
        class="-ml-px inline-flex items-center px-3 sm:px-4 py-2 border border-gray-300 text-sm leading-5 font-medium rounded-r-md text-gray-700 bg-white hover:text-gray-500 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 active:text-gray-800 active:bg-gray-50 active:text-gray-800 transition duration-150 ease-in-out"
      >
        <svg class="h-5 w-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
          <path
            fill-rule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
            clip-rule="evenodd"
          />
        </svg>
        <p class="hidden sm:block sm:pl-2 md:hidden lg:block">Cancel</p>
      </button>
    </span>

    <span class="ml-1 sm:ml-2 md:ml-1 lg:ml-2 shadow-sm rounded-md">
      <button
        type="button"
        class="inline-flex items-center px-3 sm:px-4 py-2 border border-gray-300 text-sm leading-5 font-medium rounded-md text-gray-700 bg-white hover:text-gray-500 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 active:text-gray-800 active:bg-gray-50 active:text-gray-800 transition duration-150 ease-in-out"
        :class="pageState != 'view' ? 'opacity-50 cursor-not-allowed' : ''"
      >
        <svg class="h-5 w-5 text-gray-500" stroke="currentColor" fill="none" viewBox="0 0 24 24">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
        <p class="hidden sm:block sm:pl-2 md:hidden lg:block">Plan</p>
      </button>
    </span>

    <span class="ml-1 sm:ml-2 md:ml-1 lg:ml-2 shadow-sm rounded-md">
      <button
        type="button"
        class="inline-flex items-center px-3 sm:px-4 py-2 border border-gray-300 text-sm leading-5 font-medium rounded-md text-gray-700 bg-white hover:text-gray-500 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 active:text-gray-800 active:bg-gray-50 active:text-gray-800 transition duration-150 ease-in-out"
        :class="pageState != 'view' ? 'opacity-50 cursor-not-allowed' : ''"
      >
        <svg class="h-5 w-5 text-gray-500" stroke="currentColor" fill="none" viewBox="0 0 24 24">
          <path
            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
        <p class="hidden sm:block sm:pl-2 md:hidden lg:block">Shop</p>
      </button>
    </span>

    <span
      class="ml-1 sm:ml-2 md:ml-1 lg:ml-2 relative shadow-sm rounded-md sm:hidden md:block lg:hidden"
    >
      <button
        @click="open = !open"
        type="button"
        class="inline-flex items-center px-4 py-2 border border-gray-300 text-sm leading-5 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:shadow-outline focus:border-blue-300 transition duration-150 ease-in-out"
      >
        More
        <svg class="-mr-1 ml-2 h-5 w-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
          <path
            fill-rule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clip-rule="evenodd"
          />
        </svg>
      </button>

      <transition
        enter-active-class="transition ease-out duration-200"
        enter-class="transform opacity-0 scale-95"
        enter-to-class="transform opacity-100 scale-100"
        leave-active-class="transition ease-in duration-75"
        leave-class="transform opacity-100 scale-100"
        leave-to-class="transform opacity-0 scale-95"
      >
        <div
          v-show="open"
          class="origin-top-right absolute right-0 mt-2 -mr-1 w-48 rounded-md shadow-lg"
        >
          <div class="py-1 rounded-md bg-white shadow-xs">
            <a
              href="#"
              class="flex justify-left block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition duration-150 ease-in-out"
            >
              <svg
                class="-ml-1 mr-2 h-5 w-5 text-gray-500"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"
                />
              </svg>
              Edit
            </a>
            <a
              href="#"
              class="flex justify-left block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition duration-150 ease-in-out"
            >
              <svg
                class="-ml-1 mr-2 h-5 w-5 text-gray-500"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>Plan
            </a>
          </div>
        </div>
      </transition>
    </span>
  </div>
</template>

<script>
export default {
  props: ["pageStateProp"],
  components: {},
  data() {
    return {
      open: false,
      pageState: "view",
      saving: false
    };
  },
  methods: {
    emitRecipeAction(state) {
      this.pageState = state;

      this.$emit("emitRecipeAction", state);
    },
    cancelUpdate() {
      this.emitRecipeAction("view");
    },
    saveRecipe() {
      this.saving = true;

      //simulate pause
      this.simulateSave();
      this.saving = false;

      this.emitRecipeAction("view");
    },
    simulateSave() {
      const date = Date.now();
      let currentDate = null;
      do {
        currentDate = Date.now();
      } while (currentDate - date < 1000);
    }
  },
  created() {
    this.pageState = pageStateProp;
  }
};
</script>

<style>
</style>