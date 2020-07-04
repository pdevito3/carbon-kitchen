<template>
  <div class="flex">
    <span class="shadow-sm rounded-md">
      <router-link
        to="/myrecipes"
        type="button"
        class="inline-flex items-center px-3 sm:px-4 py-2 border border-gray-300 text-sm leading-5 font-medium rounded-md text-gray-700 bg-white hover:text-gray-500 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 active:text-gray-800 active:bg-gray-50 active:text-gray-800 transition duration-150 ease-in-out"
      >
        <ChevronLeft class="h-5 w-5 text-gray-500" />
        <p class="hidden sm:block sm:pl-2 md:hidden lg:block">Back</p>
      </router-link>
    </span>

    <span v-if="pageState=='view'" class="ml-1 sm:ml-2 md:ml-1 lg:ml-2 shadow-sm rounded-md">
      <button
        @click="editRecipe()"
        type="button"
        class="inline-flex items-center px-3 sm:px-4 py-2 border border-gray-300 text-sm leading-5 font-medium rounded-md text-gray-700 bg-white hover:text-gray-500 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 active:text-gray-800 active:bg-gray-50 active:text-gray-800 transition duration-150 ease-in-out"
      >
        <PencilAlt class="h-5 w-5 text-gray-500 fill-current" />
        <p class="hidden sm:block sm:pl-2 md:hidden lg:block">Edit</p>
      </button>
    </span>

    <span v-if="pageState=='edit'" class="ml-1 sm:ml-2 md:ml-1 lg:ml-2 shadow-sm rounded-l-md">
      <button
        @click="saveRecipe()"
        type="button"
        class="inline-flex items-center px-3 sm:px-4 py-2 border border-gray-300 text-sm leading-5 font-medium rounded-l-md text-gray-700 bg-white hover:text-gray-500 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 active:text-gray-800 active:bg-gray-50 active:text-gray-800 transition duration-150 ease-in-out"
      >
        <Save class ="h-5 w-5 fill-current" />
        <p v-if="this.saving" class="hidden sm:block sm:pl-2 md:hidden lg:block">Saving...</p>
        <p v-else class="hidden sm:block sm:pl-2 md:hidden lg:block">Save</p>
      </button>
    </span>

    <span v-if="pageState=='edit'" class="shadow-sm rounded-r-md">
      <button
        @click="cancelUpdate()"
        type="button"
        class="-ml-px inline-flex items-center px-3 sm:px-4 py-2 border border-gray-300 text-sm leading-5 font-medium rounded-r-md text-gray-700 bg-white hover:text-gray-500 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 active:text-gray-800 active:bg-gray-50 active:text-gray-800 transition duration-150 ease-in-out"
      >
        <XCircle class="h-5 w-5 text-gray-500 fill-current" />
        <p class="hidden sm:block sm:pl-2 md:hidden lg:block">Cancel</p>
      </button>
    </span>

    <span class="ml-1 sm:ml-2 md:ml-1 lg:ml-2 shadow-sm rounded-md">
      <button
        type="button"
        class="inline-flex items-center px-3 sm:px-4 py-2 border border-gray-300 text-sm leading-5 font-medium rounded-md text-gray-700 bg-white hover:text-gray-500 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 active:text-gray-800 active:bg-gray-50 active:text-gray-800 transition duration-150 ease-in-out"
        :class="pageState != 'view' ? 'opacity-50 cursor-not-allowed' : ''"
      >
        <Calendar class="h-5 w-5 text-gray-500" />
        <p class="hidden sm:block sm:pl-2 md:hidden lg:block">Plan</p>
      </button>
    </span>

    <span class="ml-1 sm:ml-2 md:ml-1 lg:ml-2 shadow-sm rounded-md">
      <button
        @click="openIngredientList()"
        type="button"
        class="inline-flex items-center px-3 sm:px-4 py-2 border border-gray-300 text-sm leading-5 font-medium rounded-md text-gray-700 bg-white hover:text-gray-500 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 active:text-gray-800 active:bg-gray-50 active:text-gray-800 transition duration-150 ease-in-out"
        :class="pageState != 'view' ? 'opacity-50 cursor-not-allowed' : ''"
      >
        <ClipboardList class="h-5 w-5 text-gray-500" />
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
        <ChevronDown class="-mr-1 ml-2 h-5 w-5 text-gray-500" />
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
          class="z-10 origin-top-right absolute right-0 mt-2 -mr-1 w-48 rounded-md shadow-lg"
        >
          <div class="py-1 rounded-md bg-white shadow-xs">
            <a
              href="#"
              class="flex justify-left px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition duration-150 ease-in-out"
            >
            <PencilAlt class="-ml-1 mr-2 h-5 w-5 text-gray-500" />Edit
            </a>
            <a
              href="#"
              class="flex justify-left px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition duration-150 ease-in-out"
            >              
              <ClipboardList class="-ml-1 mr-2 h-5 w-5 text-gray-500" />Plan
            </a>
          </div>
        </div>
      </transition>
    </span>
  </div>
</template>

<script>
import { mapState } from "vuex";
import PencilAlt from 'heroicons/solid/pencil-alt.svg';
import XCircle from 'heroicons/solid/x-circle.svg';
import ChevronLeft from 'heroicons/solid/chevron-left.svg';
import ChevronDown from 'heroicons/solid/chevron-down.svg';
import Calendar from 'heroicons/outline/calendar.svg';
import ClipboardList from 'heroicons/outline/clipboard-list.svg';
import Save from '@fortawesome/fontawesome-free/svgs/regular/save.svg'

export default {
  components: {
    PencilAlt,
    XCircle,
    ChevronLeft,
    ChevronDown,
    Calendar,
    ClipboardList,
    Save
  },
  data() {
    return {
      open: false
    };
  },
  computed: {
    // use object spread operator for mapstate with vuex so we can use locally computed properties
    ...mapState({
      pageState: state => state.recipe.pageState,
      saving: state => state.recipe.saving
    })
  },
  methods: {
    setPageState(pageState) {
      this.$store.dispatch("setPageState", pageState);
    },
    emitRecipeAction(state) {
      this.$emit("emitRecipeAction", state);
    },
    cancelUpdate() {
      // this.setPageState("view");
      this.emitRecipeAction("cancel");
    },
    saveRecipe() {
      this.emitRecipeAction("save");
    },
    editRecipe() {
      this.emitRecipeAction("edit");
    },
    openIngredientList() {
      this.emitRecipeAction("openIngredientList");
    },
  },
  created() {
    // this.pageState = pageStateProp;
  }
};
</script>

<style>
</style>