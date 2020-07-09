<template>
  <div class="h-screen flex overflow-hidden bg-gray-100" @keydown.escape="closeSidebar()">
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
            <XSvg class="h-6 w-6 text-white" />
          </button>
        </div>
        <div class="flex-shrink-0 flex items-center px-4">
          <img class="h-8 w-auto" src="/img/logos/workflow-logo-on-brand.svg" alt="Workflow" />
        </div>
        <div class="mt-5 flex-1 h-0 overflow-y-auto">
          <nav class="px-2">
            <router-link
              @click.native="closeSidebar"
              to="/myrecipes"
              :class="path == '/' || path == '/myrecipes' 
              ? 'group flex items-center px-2 py-2 text-base leading-6 font-medium rounded-md text-white bg-red-900 focus:outline-none focus:bg-red-700 transition ease-in-out duration-150' 
              :'mt-1 group flex items-center px-2 py-2 text-base leading-6 font-medium rounded-md text-red-300 hover:text-white hover:bg-red-700 focus:outline-none focus:text-white focus:bg-red-700 transition ease-in-out duration-150'"
            >
              <ColorSwatch class="mr-4 h-6 w-6 text-red-400 group-hover:text-red-300 group-focus:text-red-300 transition ease-in-out duration-150" />
              Recipes
            </router-link>
            <button 
              @click="createNewRecipe()"
              type="button"
              class="ml-6 w-full mt-1 group flex items-center px-2 py-2 text-base leading-6 font-medium rounded-md text-red-300 hover:text-white hover:bg-red-700 focus:outline-none focus:text-white focus:bg-red-700 transition ease-in-out duration-150">
                <PlusCircle class="mr-4 h-6 w-6 text-red-400 group-hover:text-red-300 group-focus:text-red-300 transition ease-in-out duration-150"/>
                Add Recipe
            </button>
            <router-link
              @click.native="closeSidebar"
              to="/shoppinglist"
              exact-active-class="group flex items-center px-2 py-2 text-base leading-6 font-medium rounded-md text-white bg-red-900 focus:outline-none focus:bg-red-700 transition ease-in-out duration-150"
              class="mt-1 group flex items-center px-2 py-2 text-base leading-6 font-medium rounded-md text-red-300 hover:text-white hover:bg-red-700 focus:outline-none focus:text-white focus:bg-red-700 transition ease-in-out duration-150"
            >
              <ShoppingCart class="mr-4 h-6 w-6 text-red-400 group-hover:text-red-300 group-focus:text-red-300 transition ease-in-out duration-150" />
              Shopping List
            </router-link>
            <button 
              @click="toggleAddShoppingListItemsModal()"
              type="button"
              class="ml-6 w-full mt-1 group flex items-center px-2 py-2 text-base leading-6 font-medium rounded-md text-red-300 hover:text-white hover:bg-red-700 focus:outline-none focus:text-white focus:bg-red-700 transition ease-in-out duration-150">
                <PlusCircle class="mr-4 h-5 w-5 text-red-400 group-hover:text-red-300 group-focus:text-red-300 transition ease-in-out duration-150"/>
                Add Items
            </button>
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
              to="/myrecipes"
              :class="path == '/' || path == '/myrecipes' 
              ? 'group flex items-center justify-between px-2 py-2 text-sm leading-5 font-medium text-white rounded-md bg-red-900 focus:outline-none focus:bg-red-700 transition ease-in-out duration-150' 
              : 'mt-1 group flex items-center justify-between px-2 py-2 text-sm leading-5 font-medium text-red-300 rounded-md hover:text-white hover:bg-red-700 focus:outline-none focus:text-white focus:bg-red-700 transition ease-in-out duration-150'"
            >
              <div class="flex">
                <ColorSwatch class="mr-3 h-6 w-6 text-red-400 group-hover:text-red-300 group-focus:text-red-300 transition ease-in-out duration-150" />
                My Recipes
              </div>
              <button
                @click="createNewRecipe()"
                  type="button"
                  class="sm:w-auto px-1 py-1 border border-red-300 text-sm leading-5 font-medium rounded-full text-red-700 bg-gray-200 hover:text-red-500 hover:border-2 hover:border-red-900 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 active:text-gray-800 active:bg-gray-50 active:text-gray-800 transition duration-150 ease-in-out"
                >
                <PlusCircle  class="w-5 h-5" />
              </button>
            </router-link>

            <router-link
              to="/shoppinglist"
              exact-active-class="group flex items-center px-2 py-2 text-sm leading-5 font-medium text-white rounded-md bg-red-900 focus:outline-none focus:bg-red-700 transition ease-in-out duration-150"
              class="mt-1 group flex items-center justify-between px-2 py-2 text-sm leading-5 font-medium text-red-300 rounded-md hover:text-white hover:bg-red-700 focus:outline-none focus:text-white focus:bg-red-700 transition ease-in-out duration-150"
            >
              <div class="flex">
                <ShoppingCart class="mr-3 h-6 w-6 text-red-400 group-hover:text-red-300 group-focus:text-red-300 transition ease-in-out duration-150"/>
                Shopping List
              </div>
              <button
                @click="toggleAddShoppingListItemsModal()" 
                  type="button"
                  class="sm:w-auto px-1 py-1 border border-red-300 text-sm leading-5 font-medium rounded-full text-red-700 bg-gray-200 hover:text-red-500 hover:border-2 hover:border-red-900 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 active:text-gray-800 active:bg-gray-50 active:text-gray-800 transition duration-150 ease-in-out"
                >
                  <PlusCircle  class="w-5 h-5" />
              </button>
            </router-link>
          </nav>
        </div>
      </div>
    </div>    
  </div>
</template>

<script>
import XSvg from 'heroicons/outline/x.svg';
import Home from 'heroicons/outline/home.svg';
import ColorSwatch from 'heroicons/outline/color-swatch.svg';
import PlusCircle from 'heroicons/outline/plus-circle.svg'
import ShoppingCart from 'heroicons/outline/shopping-cart.svg'
import { mapState } from "vuex";
import AddShoppingListItems from "@/components/shoppinglist/AddShoppingListItems.vue";

export default {
  props: ["sidebarOpen"],
  components: {
    AddShoppingListItems,
    XSvg,
    Home,
    ColorSwatch,
    PlusCircle,
    ShoppingCart,
  },
  data() {
    return {
      // sidebarOpen: false
    };
  },
  computed: {
    // use object spread operator for mapstate with vuex so we can use locally computed properties
    ...mapState({
      recipe: state => state.recipe.recipe,
      addShoppingListItemsModalOpen: state => state.shoppinglist.addShoppingListItemsModalOpen,
    }),
    path() {
      return this.$route.fullPath;
    }
  },
  methods: {
    closeSidebar() {
      this.$emit("closeSidebar", false);
    },
    createNewRecipe() {
      this.$store.dispatch("createNewBlankRecipe");
      this.$emit("closeSidebar", false);
    },
    toggleAddShoppingListItemsModal() {
      this.$store.dispatch("toggleShoppingListItemModal");    
      this.$emit("closeSidebar", false);  
    },
  }
};
</script>

<style>
</style>